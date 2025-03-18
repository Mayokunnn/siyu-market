import React, { createContext, useContext, useState, useEffect } from "react";
import { toast } from "sonner";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [cart, setCart] = useState([]);
  const [orderHistory, setOrderHistory] = useState([]);
  const apiUrl = import.meta.env.VITE_API_URL;

 const login = async ({ email, password }, navigate) => {
   try {
     const response = await fetch(`${apiUrl}/users/auth/login`, {
       method: "POST",
       headers: {
         "Content-Type": "application/json",
       },
       body: JSON.stringify({ email, password }),
     });

     if (!response.ok) {
       const errorData = await response.json();
       throw new Error(errorData.message || "Something went wrong");
     }

     const data = await response.json();
     setUser(data);
     localStorage.setItem("user", JSON.stringify(data));
     toast.success("Login successful", {
       id: 2,
     });

     const searchParams = new URLSearchParams(window.location.search);
     const nextPath = searchParams.get("next");

     nextPath ? navigate("/" + nextPath) : navigate("/")
   } catch (err) {
     throw err;
   }
 };

  const logout = () => {
    setUser(null);
    setOrderHistory([]);
    localStorage.removeItem("user");
    toast("You are logged out", {
      id: 1
    })
  };

  const placeOrder = () => {
    const order = {
      id: Date.now(),
      items: cart,
      date: new Date().toISOString(),
    };
    setOrderHistory((prevHistory) => [order, ...prevHistory]);
    setCart([]);
  };


  const updateCartQuantity = (id, quantity) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === id ? { ...item, quantity: Math.max(0, quantity) } : item
      )
    );
  };
  
  
  const addToCart = (product) => {
    setCart((prev) => {
      // Ensure prev is always an array
      const currentCart = Array.isArray(prev) ? prev : [];
      
      const existingProduct = currentCart.find((item) => item.id === product.id);
      if (existingProduct) {
        return currentCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + product.quantity }
            : item
        );
      } else {
        toast.success("Added to cart", { id: product.id });
        return [
          ...currentCart,
          {
            ...product,
            quantity: product.quantity,
            price: product.price,
            image: product.image,
          },
        ];
      }
    });
  };

  const removeFromCart = (itemId) => {
    setCart((prev) => prev.filter((item) => item.id !== itemId));
  };

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      try {
        const parsedCart = JSON.parse(storedCart);
        if (Array.isArray(parsedCart)) {
          setCart(parsedCart);
        } else {
          setCart([]); // Reset to empty array if parsedCart is not an array
        }
      } catch (error) {
        console.error("Failed to parse cart from localStorage:", error);
        setCart([]); // Reset to empty array if parsing fails
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  return (
    <UserContext.Provider
      value={{
        user,
        login,
        logout,
        cart,
        setCart,
        placeOrder,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        orderHistory,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};


export const useUser = () => useContext(UserContext);
