import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/Usercontext";
import PriceDisplay from "../component/PriceDisplay";
import { toast } from "sonner";
import Spinner from "../component/Spinner";
import Loader from "../component/Loader";

const Checkout = () => {
  const { cart, user, logout } = useUser();
  const [loading, setLoading] = useState(false);
  const [cartDetails, setCartDetails] = useState(null);
  const [formData, setFormData] = useState({ hall: "", room_number: "", name: "", email: "" });
  const apiUrl = import.meta.env.VITE_API_URL;
  sessionStorage.setItem("fromCart", "false");

  useEffect(() => {
    const fetchCartDetails = async () => {
      try {
        const userToken = user?.data?.access_token;
        if (!userToken) {
          throw new Error("You must be logged in to checkout.");
        }

        // Fetch cart details from the backend
        const response = await fetch(`${apiUrl}/cart`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${userToken}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch cart details.");
        }

        const data = await response.json();

        const normalizedCart = {
          id: data.cart?.id || cart?.cart?.id, 
          items: data.cart?.items || cart?.cart?.items || [],
          total_price: data.cart?.total_price || cart?.cart?.total_price || "0.00",
          delivery_fee: data.cart?.delivery_fee || 500,
        };

        setCartDetails(normalizedCart);
      } catch (error) {
        console.error("Error fetching cart details:", error);
      }
    };

    fetchCartDetails();
  }, [cart, user]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCheckout = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const userToken = user?.data?.access_token;
      if (!userToken) {
        throw new Error("You must be logged in to checkout.");
      }

      const response = await fetch(`${apiUrl}/order/checkout`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userToken}`,
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to checkout.");
      }

      const data = await response.json();
      if (data.transaction_detail?.status && data.transaction_detail.data?.checkout_url) {
        window.location.href = data.transaction_detail.data.checkout_url;
      } else {
        throw new Error("Payment authorization failed. Please try again.");
      }
      localStorage.setItem("cart", "[]");
      sessionStorage.setItem("fromCart", "false");
    } catch (error) {
      console.error("Checkout error:", error);
      toast.error(error.message || "Something went wrong during checkout.");
    } finally {
      setLoading(false);
    }
  };

  if (!cartDetails) {
    return <Spinner />; 
  }

  return (
    <div className="m-4 p-4 space-y-4">
      <div className="py-5 bg-blue-800 text-center">
        <h1 className="text-3xl sm:text-4xl font-bold text-white">
          Checkout
        </h1>
      </div>
      <div className="grid grid-rows-2 lg:grid-cols-[60%_40%] gap-4">
        <form onSubmit={handleCheckout} className="bg-white p-4 shadow rounded">
          <div className="flex flex-col md:flex-row  md:gap-4 md:items-center">
            <label className="block mb-2">Name:</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-2 border rounded mb-4"
            />
            <label className="block mb-2">Email:</label>
            <input
              type="text"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-2 border rounded mb-4"
            />
          </div>
          <label className="block mb-2">Hall:</label>
          <input
            type="text"
            name="hall"
            value={formData.hall}
            onChange={handleChange}
            className="w-full p-2 border rounded mb-4"
            required
          />
          <label className="block mb-2">Room Number:</label>
          <input
            type="text"
            name="room_number"
            value={formData.room_number}
            onChange={handleChange}
            className="w-full p-2 border rounded mb-4"
            required
          />
          <button
            type="submit"
            className="w-full bg-black text-white p-2 rounded hover:bg-gray-700"
          >
            {loading ? <Loader/>  : "Checkout"}
          </button>
        </form>
        {cartDetails && (
          <div className="bg-gray-100 p-4 rounded shadow">
            <h2 className="text-lg font-bold mb-2">Order Summary</h2>
            {cartDetails.items.map((item) => (
              <div key={item.id} className="flex justify-between border-b py-2">
                <span className="ellipsis truncate max-w-1/2">
                  {item.product.name}
                </span>
                <span className="flex gap-3">
                  (x{item.quantity}) <PriceDisplay price={+item.total_price} />
                </span>
              </div>
            ))}
            <div className="flex justify-between font-bold mt-4">
              <span>Delivery fee</span>
              <span>
                <PriceDisplay price={+cartDetails.delivery_fee || 0} />
              </span>
            </div>
            <div className="flex justify-between font-bold mt-4">
              <span>Total</span>
              <span>
                <PriceDisplay
                  price={+cartDetails.total_price + cartDetails.delivery_fee}
                />
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Checkout;