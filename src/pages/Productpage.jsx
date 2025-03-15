import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useUser } from "../context/Usercontext";
import Spinner from "../component/Spinner";
import PriceDisplay from "../component/PriceDisplay";

function Productpage() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const { addToCart, updateCartQuantity, cart} = useUser();

  const getCartQuantity = (id) => {
    const item = cartArray.find((product) => product.id === id);
    return item ? item.quantity : 0;
  };

  const truncateText = (text, limit) => {
    if (text.length > limit) {
      return text.substring(0, limit) + "...";
    }
    return text;
  };

  useEffect(() => {
    fetch("https://siyumarket-backend.vercel.app/product/all")
      .then((response) => response.json())
      .then((data) => {
        const productData = data.data;
        setProducts(productData);
        setFilteredProducts(productData);

        const uniqueCategories = ["All", ...new Set(productData.map((p) => p.category))];
        setCategories(uniqueCategories);

        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
        setLoading(false);
      });
  }, []);

  const handleSearch = async (query) => {
    setSearchQuery(query);
    if (query.trim() === "") {
      setFilteredProducts(products);
      return;
    }

    try {
      const response = await fetch(
        `https://siyumarket-backend.vercel.app/product/search?q=${query}`,
        { method: "POST" }
      );
      if (response.ok) {
        const data = await response.json();
        setFilteredProducts(data.result || []);
        console.log("Search done");
      } else {
        console.error("Search failed:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
  };
  useEffect(() => {
    const filtered = products.filter((p) => {
      const matchesCategory =
        selectedCategory === "All" || p.category === selectedCategory;
      return matchesCategory;
    });

    if (searchQuery.trim() === "") {
      setFilteredProducts(filtered);
    }
  }, [selectedCategory, products, searchQuery]);

  return (
    <div className="p-8">
      {loading ? (
        <Spinner />
      ) : (
        <>
          <div className="mb-6 flex flex-wrap items-center gap-4">
            <div>
              <label htmlFor="categoryFilter" className="mr-4 px-1 font-medium">
                Filter by Category:
              </label>
              <select
                id="categoryFilter"
                className="border rounded capitalize px-2 py-2"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-center">
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
                className="border rounded px-3 py-2 w-64"
              />
              <button
                onClick={() => handleSearch(searchQuery)}
                className="ml-2 bg-black cursor-pointer text-white px-4 py-2 rounded hover:bg-gray-700"
              >
                Search
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {filteredProducts.map((product) => {
              const quantity = getCartQuantity(product.id);
              return (<div
                key={product.id}
                className="bg-white p-4 rounded-lg h-full flex flex-col justify-between shadow hover:shadow-lg transition"
              >
                <Link to={`/product/${product.id}`}>
                  <img
                    src={product.image_url}
                    alt={product.name}
                    className="w-full h-[150px] object-contain cursor-pointer rounded"
                  />
                </Link>
                <div className="mt-4">
                  <h3 className="text-lg font-semibold capitalize">
                    <Link to={`/product/${product.id}`} className="hover:underline">
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
                      onClick={() => updateCartQuantity(product.id, quantity - 1)}
                      className="bg-gray-500 text-white px-3 py-1 rounded hover:bg-gray-700"
                    >
                      -
                    </button>
                    <span className="font-semibold">{quantity}</span>
                    <button
                      onClick={() => updateCartQuantity(product.id, quantity + 1)}
                      className="bg-gray-500 text-white px-3 py-1 rounded hover:bg-gray-700"
                    >
                      +
                    </button>
                  </div>
                ) :
                  +product.stock > 0  ? <button
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
                      +product.stock > 0 ? "hover:bg-gray-500 cursor-pointer" : "cursor-not-allowed"
                    } transition`}
                  >Add to Cart
                  </button> : <button
                  disabled={true}
                  className={`w-full mt-4 bg-black text-white py-2 capitalize rounded opacity-70 cursor-not-allowed transition`}
                >
                   Out of Stock
                </button>}
              </div>)
        })}
          </div>
        </>
      )}
    </div>
  );
}

export default Productpage;
