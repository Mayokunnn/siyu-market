import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { useUser } from "../context/Usercontext";
import PriceDisplay from "./PriceDisplay";

const ProductDetail = () => {
  const { id } = useParams();
  const { addToCart, cart } = useUser();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const apiUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`${apiUrl}/product/${id}`);
        const result = await response.json();
        if (result && result.data && result.data.details) {
          setProduct(result.data.details);
        } else {
          setError("Product not found");
        }
      } catch (err) {
        setError("Error fetching product");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleIncrement = () => {
    if (product && quantity < product.stock) setQuantity(quantity + 1);
  };

  const handleDecrement = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.discounted_price,
      image: product.image_url,
      quantity: quantity,
    });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="w-16 h-16 border-4 border-t-4 border-blue-800 border-solid rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-red-600 text-lg">{error}</p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-2 gap-8">
      <div className="flex justify-center items-center">
        <img
          src={
            product.image_url ||
            "https://via.placeholder.com/400x400?text=No+Image"
          }
          alt={product.name}
          className="w-[400px] h-[400px] rounded-lg shadow-md object-contain"
        />
      </div>

      <div>
        <h1 className="text-2xl font-bold mb-2">{product.name}</h1>
        <div className="flex items-center mb-1">
          <span
            className={`${
              product.stock > 0 ? "text-green-600" : "text-red-600"
            } font-medium`}
          >
            {product.stock > 0 ? "In Stock" : "Out of Stock"}
          </span>
        </div>
        <Link to={`/store/${product.store}`} className="underline">
          View Store
        </Link>

        <div className="text-3xl font-semibold mb-4">
          {/* NGN {product.discounted_price} */}
          <PriceDisplay price={product.discounted_price} />
        </div>

        <p className="text-gray-700 mb-6">{product.description}</p>

        <div className="mb-4">
          <p className="font-medium">
            Category:{" "}
            <span className="text-gray-500 capitalize">{product.category}</span>
          </p>
        </div>

        <div className="mb-6 flex items-center space-x-4">
          <button
            onClick={handleDecrement}
            className="w-8 h-8 bg-gray-200 rounded cursor-pointer flex justify-center items-center text-lg font-bold"
            disabled={product.stock === 0}
          >
            -
          </button>
          <span className="text-lg">{quantity}</span>
          <button
            onClick={handleIncrement}
            className="w-8 h-8 bg-gray-200 cursor-pointer rounded flex justify-center items-center text-lg font-bold"
            disabled={product.stock === 0 || quantity === product.stock}
          >
            +
          </button>
        </div>

        <div className="mb-4">
          <button
            onClick={handleAddToCart}
            className={`px-6 py-2 ${
              product.stock === 0
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-black hover:bg-gray-700"
            } text-white rounded`}
            disabled={product.stock === 0}
          >
            Add to Cart
          </button>
        </div>

        <div className="mt-6">
          <div className="border-b pb-4 mb-4">
            <p className="font-medium">Delivery</p>
            <p className="text-gray-500 text-sm">
              Enter your postal code for Delivery Availability
            </p>
          </div>
          <div>
            <p className="font-medium">Return Policy</p>
            <p className="text-gray-500 text-sm">
              Free 7 Days Delivery Returns.{" "}
              <span className="underline">Details</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
