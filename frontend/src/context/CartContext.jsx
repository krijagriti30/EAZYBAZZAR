// src/context/CartContext.js
import React, { createContext, useState, useContext, useEffect } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    try {
      const raw = localStorage.getItem("cart");
      return raw ? JSON.parse(raw) : [];
    } catch (e) {
      console.warn("Failed to read cart from localStorage", e);
      return [];
    }
  });

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem("cart", JSON.stringify(cartItems));
    } catch (e) {
      console.warn("Failed to write cart to localStorage", e);
    }
  }, [cartItems]);

  // Add new product or update quantity if exists
  const addToCart = (item) => {
    const id = item._id ?? item.id;
    const selectedSize = item.selectedSize ?? null;
    const qtyToAdd = item.quantity ?? 1;

    setCartItems((prev) => {
      const existing = prev.find(
        (i) => i.id === id && (i.selectedSize ?? null) === selectedSize
      );
      if (existing) {
        return prev.map((i) =>
          i.id === id && (i.selectedSize ?? null) === selectedSize
            ? { ...i, quantity: (i.quantity ?? 1) + qtyToAdd }
            : i
        );
      }
      const normalized = { ...item, id, quantity: qtyToAdd };
      delete normalized._id;
      return [...prev, normalized];
    });
  };

  // Remove item completely
  const removeFromCart = (id, selectedSize = null) => {
    setCartItems((prev) =>
      prev.filter(
        (i) =>
          !(
            i.id === id &&
            (selectedSize == null || i.selectedSize === selectedSize)
          )
      )
    );
  };

  // Increase quantity
  const increaseQuantity = (id, selectedSize = null) => {
    setCartItems((prev) =>
      prev.map((i) =>
        i.id === id && (i.selectedSize ?? null) === selectedSize
          ? { ...i, quantity: (i.quantity ?? 1) + 1 }
          : i
      )
    );
  };

  // Decrease quantity (minimum 1)
  const decreaseQuantity = (id, selectedSize = null) => {
    setCartItems((prev) =>
      prev.map((i) =>
        i.id === id && (i.selectedSize ?? null) === selectedSize
          ? { ...i, quantity: Math.max((i.quantity ?? 1) - 1, 1) }
          : i
      )
    );
  };

  // Clear entire cart
  const clearCart = () => setCartItems([]);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        clearCart,
        increaseQuantity,
        decreaseQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
