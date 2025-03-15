import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUser } from "../context/Usercontext";
import minus from "../assets/icon-minus.svg";
import add from "../assets/icon-plus.svg";
import del from "../assets/icon-delete.svg";
import back from "../assets/icon-back.svg";
import PriceDisplay from "../component/PriceDisplay";
import { toast } from "sonner";

const Cart = () => {
  const navigate = useNavigate();
  const apiUrl = import.meta.env.VITE_API_URL;
  const { cart, setCart, removeFromCart, user, logout } = useUser();
  const [quantities, setQuantities] = useState(() => {
    return cart.reduce((acc, item) => {
      acc[item.id] = item.quantity || 1;
      return acc;
    }, {});
  });
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    setQuantities((prev) => {
      const updatedQuantities = { ...prev };
      cart.forEach((item) => {
        if (!updatedQuantities[item.id]) {
          updatedQuantities[item.id] = item.quantity || 1;
        }
      });
      return updatedQuantities;
    });
  }, [cart]);

  useEffect(() => {
    const updatedCart = cart.map((item) => ({
      ...item,
      quantity: quantities[item.id] || 1,
    }));
    if (JSON.stringify(updatedCart) !== JSON.stringify(cart)) {
      setCart(updatedCart);
      localStorage.setItem("cart", JSON.stringify(updatedCart));
    }
  }, [quantities, setCart]);

  const handleIncrease = (id) => {
    setQuantities((prev) => ({ ...prev, [id]: (prev[id] || 1) + 1 }));
  };

  const handleDecrease = (id) => {
    setQuantities((prev) => ({
      ...prev,
      [id]: Math.max(1, (prev[id] || 1) - 1),
    }));
  };

  const handleRemove = (id) => {
    removeFromCart(id);
    setQuantities((prev) => {
      const { [id]: _, ...remaining } = prev;
      return remaining;
    });
  };

  const totalPrice = cart.reduce(
    (acc, item) => acc + item.price * (quantities[item.id] || 1),
    0
  );

  const formatPrice = (price) => {
    return new Intl.NumberFormat().format(price);
  };

  const handleCheckout = async () => {
    try {
      const userToken = user?.data.access_token;
      if (!userToken) {
        throw new Error("You must be logged in to checkout.");
      }

      const itemsToSend = cart.map((item) => ({
        id: item.id,
        quantity: quantities[item.id] || 1,
      }));

      const response = await fetch(
        `${apiUrl}/add`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${userToken}`,
          },
          body: JSON.stringify({ items: itemsToSend }),
        }
      );
      if (!response.ok) {
        const errorData = await response.json();

        console.error("Error response from server:", errorData);
        throw new Error(errorData.code || "Failed to checkout.");
      }

      const data = await response.json();
      localStorage.setItem("cart", JSON.stringify(data));
      navigate("/checkout");
      sessionStorage.setItem("fromCart", "true");
    } catch (error) {
      console.log(error)
      navigate("/login");
      toast.error("Failed to checkout");
    }
  };


  return (
    <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
      <div className="py-10">
        <div className="py-5 bg-blue-800 text-center">
          <h1 className="text-3xl sm:text-4xl font-bold text-white">
            Shopping Cart
          </h1>
        </div>
        <div className="bg-white rounded p-4">
          {cart.length > 0 ? (
            <div>
              <div className="w-full overflow-x-auto">
                <table className="w-full border-collapse text-left text-sm md:text-base">
                  <thead>
                    <tr className="w-full bg-gray-50">
                      <th className="py-3 px-4 border-b font-medium">
                        Product
                      </th>
                      <th className="py-3 px-4 border-b font-medium">Price</th>
                      <th className="py-3 px-4 border-b font-medium">
                        Quantity
                      </th>
                      <th className="py-3 px-4 border-b font-medium">
                        Subtotal
                      </th>
                      <th className="py-3 px-4 border-b font-medium">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {cart.map((item) => (
                      <tr
                        key={item.id}
                        className="align-center border-b hover:bg-gray-50 transition-colors"
                      >
                        <td className="py-4 px-4 w-48  flex items-center gap-3">
                          <img
                            src={item.image || ""}
                            alt={item.name}
                            className="w-12 h-12 md:w-16 md:h-16 object-contain"
                          />
                          <span className="text-sm md:text-base">
                            {item.name}
                          </span>
                        </td>
                        <td className="py-4 px-4 ">
                          <PriceDisplay price={item.price} />
                        </td>
                        <td className="py-4 px-4 ">
                          <div className="flex items-center justify-between bg-gray-100 p-2 w-20 md:w-24 rounded-lg text-sm">
                            <button
                              onClick={() => handleDecrease(item.id)}
                              className="p-1 hover:bg-gray-200 cursor-pointer rounded"
                            >
                              <img
                                src={minus}
                                alt="Decrease"
                                className="w-4 h-2"
                              />
                            </button>
                            <span>{quantities[item.id]}</span>
                            <button
                              onClick={() => handleIncrease(item.id)}
                              className="p-1 hover:bg-gray-200 cursor-pointer rounded"
                            >
                              <img
                                src={add}
                                alt="Increase"
                                className="w-4 h-4"
                              />
                            </button>
                          </div>
                        </td>
                        <td className="py-4 px-4 border-b">
                          <PriceDisplay
                            price={item.price * (quantities[item.id] || 1)}
                          />
                        </td>
                        <td className="py-4 px-4 border-b">
                          <button
                            onClick={() => handleRemove(item.id)}
                            className="p-1 hover:bg-gray-200 rounded"
                          >
                            <img src={del} alt="Delete" className="w-5 h-5" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="mt-4 flex flex-col sm:flex-row justify-between">
                <Link
                  to="/products"
                  className="text-sm text-blue-800 flex items-center gap-2"
                >
                  <img src={back} alt="Back" className="w-5 h-5" />
                  Continue Shopping
                </Link>
                <div className="text-right">
                  <p className="text-lg font-semibold">
                    Total: &#8358;{formatPrice(totalPrice)}
                  </p>
                  <button
                    className="mt-2 bg-blue-800 text-white cursor-pointer px-4 py-2 rounded"
                    onClick={() => setShowModal(true)}
                  >
                    Checkout
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <p className="text-center">Your cart is empty.</p>
          )}
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg max-w-lg w-full">
            <h2 className="text-xl font-bold mb-4">Order Summary</h2>
            <ul className="space-y-4">
              {cart.map((item) => (
                <li key={item.id} className="flex justify-between">
                  <span>
                    {item.name} <strong>(x{item.quantity})</strong>
                  </span>
                  <span>
                    <strong>
                      <PriceDisplay price={item.price * item.quantity} />
                    </strong>
                  </span>
                </li>
              ))}
            </ul>
            <div className="mt-4 font-bold text-lg">
              Total: <PriceDisplay price={totalPrice} />
            </div>
            <div className="mt-6 flex justify-end space-x-4">
              <button
                className="bg-gray-500 text-white px-4 py-2 rounded"
                onClick={() => setShowModal(false)}
              >
                Close
              </button>
              <button
                className="bg-blue-800 text-white cursor-pointer px-4 py-2 rounded"
                onClick={handleCheckout}
              >
                {"Proceed to Checkout"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
