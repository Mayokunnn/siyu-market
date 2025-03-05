import React, { createContext, useContext, useState, useEffect } from "react";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [cart, setCart] = useState([]);
  const [orderHistory, setOrderHistory] = useState([]);

  const login = async ({ email, password }, navigate) => {
    try {
      const response = await fetch(
        "https://siyumarket-backend.vercel.app/users/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Something went wrong");
      }

      const data = await response.json();
      setUser(data);
      localStorage.setItem("user", JSON.stringify(data));

      navigate("/");
    } catch (err) {
      throw err;
    }
  };

  const logout = () => {
    setUser(null);
    setCart([]);
    setOrderHistory([]);
    localStorage.removeItem("user");
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

  
  const addToCart = (product) => {
    setCart((prev) => {
      const existingProduct = prev.find((item) => item.id === product.id);
      if (existingProduct) {

        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + product.quantity } 
            : item
        );
      } else {
        return [
          ...prev,
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
      setCart(JSON.parse(storedCart));
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
        orderHistory,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};


export const useUser = () => useContext(UserContext);
