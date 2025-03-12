import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/Usercontext";
import PriceDisplay from "../component/PriceDisplay";
import { toast } from "sonner";
import { colgroup } from "framer-motion/client";

const Checkout = () => {
    const navigate = useNavigate();
    const { cart, getCartDetails , user} = useUser();
    const [loading, setLoading] = useState(true);
    const [cartDetails, setCartDetails] = useState(null);
    const [formData, setFormData] = useState({ hall: "", room_number: "" });

    useEffect(() => {
        fetch("https://siyumarket-backend.vercel.app/cart/")
            .then(res => res.json())
            .then((data) =>{ setCartDetails(data.cart); console.log(data)})

            .catch(error => {
                console.error("Error fetching cart details:", error);
                setLoading(false);
            });
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleCheckout = async (e) => {
        e.preventDefault(); // Prevent default form submission
    
        try {
            const userToken = user?.data?.access_token;
            if (!userToken) {
                throw new Error("You must be logged in to checkout.");
            }
    
            const response = await fetch("https://siyumarket-backend.vercel.app/order/checkout", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${userToken}`,
                },
                body: JSON.stringify(formData),
            });
    
            if (!response.ok) {
                const errorData = await response.json();
                console.error("Error response from server:", errorData);
                throw new Error(errorData.message || "Failed to checkout.");
            }
    
            const data = await response.json();
            console.log("Checkout Success:", data);
            toast("Order placed successfully!");
    
            localStorage.setItem("cart", "[]");
            navigate("/")
    
        } catch (error) {
            console.error("Checkout error:", error);
            toast.error(error.message || "Something went wrong during checkout.");
        }
    };
    

    return (
        <div className="m-4 p-4">
            <h1 className="text-xl font-semibold mb-4">Room Address</h1>
            <div className="grid grid-cols-[60%_40%] gap-4">
                <form onSubmit={handleCheckout} className="bg-white p-4 shadow rounded">
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
                    <button type="submit" className="w-full bg-black text-white p-2 rounded hover:bg-gray-700">
                        Checkout
                    </button>
                </form>
                {cartDetails && (
        <div className="bg-gray-100 p-4 rounded shadow">
          <h2 className="text-lg font-bold mb-2">Order Summary</h2>
          {cartDetails.items.map((item) => (
            <div key={item.id} className="flex justify-between border-b py-2">
              <span>{item.product.name} (x{item.quantity})</span>
              <span><PriceDisplay price={item.total_price} /></span>
            </div>
          ))}
          <div className="flex justify-between font-bold mt-4">
            <span>Total</span>
            <span><PriceDisplay price={cartDetails.total_price} /></span>
          </div>
        </div>
      )}
            </div>
        </div>
    );
};

export default Checkout;
