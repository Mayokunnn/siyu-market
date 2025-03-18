import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useUser } from "../context/Usercontext";
import Spinner from "../component/Spinner";
import PriceDisplay from "./PriceDisplay";

function StoreDetailPage() {
  const { id } = useParams();
  const [storeDetails, setStoreDetails] = useState(null);
  const [storeProducts, setStoreProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { addToCart, updateCartQuantity, cart } = useUser();
  const apiUrl = import.meta.env.VITE_API_URL;

  const getCartQuantity = (id) => {
    const item = cart.find((product) => product.id === id);
    return item ? item.quantity : 0;
  };

  const truncateText = (text, limit) => {
    if (text.length > limit) {
      return text.substring(0, limit) + "...";
    }
    return text;
  };

  useEffect(() => {
    const fetchStoreDetails = async () => {
      try {
        const response = await fetch(`${apiUrl}/store/${id}`);
        if (response.ok) {
          const data = await response.json();
          setStoreDetails(data.data);

          const storeName = data.data.name;
          await fetchStoreProducts(storeName);
        } else {
          console.error("Error fetching store details:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching store details:", error);
      } finally {
        setLoading(false);
      }
    };

    const fetchStoreProducts = async (storeName) => {
      try {
        const response = await fetch(
          `${apiUrl}/product/all?store=${storeName}`
        );
        if (response.ok) {
          const data = await response.json();
          setStoreProducts(data.data || []);
        } else {
          console.error("Error fetching store products:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching store products:", error);
      }
    };

    fetchStoreDetails();
  }, [id]);

  if (loading) {
    return <Spinner />;
  }

  if (!storeDetails) {
    return <p className="text-center mt-8 text-red-500">Store not found.</p>;
  }

  return (
    <div className="p-8">
      <div className="bg-white p-6 rounded shadow-lg mb-8">
        <div className="flex items-center gap-6">
          <img
            src={storeDetails.image_url || "https://via.placeholder.com/150"}
            alt={storeDetails.name}
            className="w-32 h-32 object-cover rounded-full"
          />
          <div>
            <h1 className="text-2xl font-bold">{storeDetails.name}</h1>
            <p className="text-gray-500">{storeDetails.description}</p>
            <p className="text-gray-700 mt-2">
              Email:{" "}
              <a
                href={`mailto:${storeDetails.email}`}
                className="text-blue-500"
              >
                {storeDetails.email}
              </a>
            </p>
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-bold mb-4">
          Products from {storeDetails.name}
        </h2>
        {storeProducts.length === 0 ? (
          <p className="text-gray-500">
            No products available from this store.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {storeProducts.map((product) => {
              const quantity = getCartQuantity(product.id);
              return (
                <div
                  key={product.id}
                  className="bg-white p-4 rounded-lg shadow hover:shadow-lg transition"
                >
                  <Link to={`/product/${product.id}`}>
                    <img
                      src={
                        product.image_url || "https://via.placeholder.com/150"
                      }
                      alt={product.name}
                      className="w-full h-[150px] object-contain cursor-pointer rounded"
                    />
                  </Link>
                  <div className="mt-4">
                    <h3 className="text-lg font-semibold">
                      <Link
                        to={`/product/${product.id}`}
                        className="hover:underline"
                      >
                        {truncateText(product.name, 30)}
                      </Link>
                    </h3>
                    <p className="text-gray-500 text-sm capitalize">
                      {truncateText(product.category, 25)}
                    </p>
                    <p className="text-gray-700 mt-2 capitalize">
                      {truncateText(product.description, 35)}
                    </p>
                    <div className="flex items-center justify-between mt-4">
                      <span className="text-xl font-semibold text-black">
                        <PriceDisplay price={product.discounted_price} />
                      </span>
                      <span className="text-sm text-gray-500">
                        {product.stock} items available
                      </span>
                    </div>
                  </div>
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
      </div>
    </div>
  );
}

export default StoreDetailPage;
