import React, { useState, useEffect } from "react";
import Spinner from "./Spinner";
import { useNavigate, Link } from "react-router-dom";
import { useUser } from "../context/Usercontext";
import PriceDisplay from "./PriceDisplay";

function ProductGrid() {
  const apiUrl = import.meta.env.VITE_API_URL;
  const [products, setProducts] = useState([]);
  const [randomProducts, setRandomProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { addToCart, removeFromCart, cart, updateCartQuantity } = useUser();

  const getRandomItems = (array, count) => {
    const shuffled = [...array].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  };

  useEffect(() => {
    fetch(`${apiUrl}/product/all`)
      .then((response) => response.json())
      .then((data) => {
        setProducts(data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (products.length > 0) {
      setRandomProducts(getRandomItems(products, 8));
    }
  }, [products]);

  const getCartQuantity = (id) => {
    const item = cart?.find((product) => product.id === id);
    return item ? item.quantity : 0;
  };

  return (
    <div className="p-8">
      {loading ? (
        <Spinner />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {randomProducts.map((product) => {
            const quantity = getCartQuantity(product.id);

            return (
              <div
                key={product.id}
                className="bg-white p-4 h-full flex flex-col justify-between rounded-lg shadow hover:shadow-lg transition"
              >
                <Link to={`/product/${product.id}`}>
                  <img
                    src={product.image_url}
                    alt={product.name}
                    className="w-full h-[150px] object-contain cursor-pointer rounded"
                  />
                </Link>
                <div className="mt-4 flex flex-col h-full">
                  <h3 className="text-lg font-semibold">
                    <Link
                      to={`/product/${product.id}`}
                      className="hover:underline"
                    >
                      {product.name}
                    </Link>
                  </h3>
                  <p className="text-gray-500 text-sm capitalize">
                    {product.category}
                  </p>
                  <p className="text-gray-700 mt-2 capitalize">
                    {product.description}
                  </p>
                  <div className="flex items-center justify-between mt-4">
                    <span className="text-xl font-semibold text-black">
                      <PriceDisplay price={product.discounted_price} />
                    </span>
                    <span className="text-sm text-gray-500">
                      {product.stock > 0 ? product.stock : "No"} items available
                    </span>
                  </div>
                </div>

                {/* Conditional Button UI */}
                {quantity > 0 ? (
                  <div className="flex items-center justify-between mt-4 bg-gray-200 rounded p-2">
                    <button
                      onClick={() =>
                        updateCartQuantity(product.id, quantity - 1)
                      }
                      className="bg-gray-500 text-white px-3 py-1 rounded hover:bg-gray-700"
                    >
                      -
                    </button>
                    <span className="font-semibold">{quantity}</span>
                    <button
                      onClick={() =>
                        quantity < product.stock &&
                        updateCartQuantity(product.id, quantity + 1)
                      }
                      className={`bg-gray-500 text-white px-3 py-1 rounded ${
                        quantity < product.stock
                          ? "hover:bg-gray-700"
                          : "cursor-not-allowed opacity-50"
                      }`}
                    >
                      +
                    </button>
                  </div>
                ) : +product.stock > 0 ? (
                  <button
                    onClick={() =>
                      addToCart({
                        id: product.id,
                        name: product.name,
                        price: product.discounted_price,
                        image: product.image_url,
                        quantity: 1,
                      })
                    }
                    className={`w-full mt-4 bg-black text-white py-2 capitalize rounded ${
                      +product.stock > 0
                        ? "hover:bg-gray-500 cursor-pointer"
                        : "cursor-not-allowed"
                    } transition`}
                  >
                    Add to Cart
                  </button>
                ) : (
                  <button
                    disabled={true}
                    className={`w-full mt-4 bg-black text-white py-2 capitalize rounded opacity-70 cursor-not-allowed transition`}
                  >
                    Out of Stock
                  </button>
                )}
              </div>
            );
          })}
        </div>
      )}

      <div className="text-center mt-8">
        <button
          className="rounded-[4px] px-[48px] py-[16px] mx-auto bg-black text-white hover:bg-gray-500 transition duration-300"
          onClick={() => navigate("/products")}
        >
          View All Products
        </button>
      </div>
    </div>
  );
}

export default ProductGrid;
