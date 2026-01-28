import React, { createContext, useContext, useEffect, useState } from "react";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";
import { useAuth } from "./AuthContext";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const { user } = useAuth();
  const [cartItems, setCartItems] = useState([]);

  // ================= LOAD CART =================
  useEffect(() => {
    const loadCart = async () => {
      if (!user) {
        const localCart = JSON.parse(localStorage.getItem("cart")) || [];
        setCartItems(localCart);
        return;
      }

      try {
        const cartRef = doc(db, "users", user.uid, "cart", "data"); // ✅ correct path
        const snap = await getDoc(cartRef);

        if (snap.exists()) {
          setCartItems(snap.data().items || []);
        } else {
          setCartItems([]);
        }
      } catch (err) {
        console.error("Load cart failed:", err);
      }
    };

    loadCart();
  }, [user]);

  // ================= SAVE CART =================
  const saveCart = async (items) => {
    if (!user) {
      localStorage.setItem("cart", JSON.stringify(items));
      return;
    }

    try {
      await setDoc(doc(db, "users", user.uid, "cart", "data"), { items }); // ✅ correct path
    } catch (err) {
      console.error("Save cart failed:", err);
    }
  };

  // ================= CART FUNCTIONS =================
  const addToCart = (product) => {
    setCartItems((prev) => {
      const existing = prev.find(
        (item) =>
          item._id === product._id && item.selectedSize === product.selectedSize
      );

      const updated = existing
        ? prev.map((item) =>
            item._id === product._id && item.selectedSize === product.selectedSize
              ? { ...item, quantity: item.quantity + product.quantity }
              : item
          )
        : [...prev, product];

      saveCart(updated);
      return updated;
    });
  };

  const removeFromCart = (id, size) => {
    const updated = cartItems.filter(
      (item) => !(item._id === id && item.selectedSize === size)
    );
    setCartItems(updated);
    saveCart(updated);
  };

  const increaseQuantity = (id, size) => {
    const updated = cartItems.map((item) =>
      item._id === id && item.selectedSize === size
        ? { ...item, quantity: item.quantity + 1 }
        : item
    );
    setCartItems(updated);
    saveCart(updated);
  };

  const decreaseQuantity = (id, size) => {
    const updated = cartItems.map((item) =>
      item._id === id && item.selectedSize === size
        ? { ...item, quantity: item.quantity - 1 }
        : item
    );
    setCartItems(updated);
    saveCart(updated);
  };

  const clearCartAfterOrder = async () => {
    setCartItems([]);
    if (!user) {
      localStorage.removeItem("cart");
      return;
    }

    await setDoc(doc(db, "users", user.uid, "cart", "data"), { items: [] });
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        increaseQuantity,
        decreaseQuantity,
        clearCartAfterOrder,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
