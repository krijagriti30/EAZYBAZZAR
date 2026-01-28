import React, { createContext, useContext, useEffect, useState } from "react";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";
import { useAuth } from "./AuthContext";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const { user } = useAuth();
  const [cartItems, setCartItems] = useState([]);

  /* ================= LOAD CART ================= */
  useEffect(() => {
  const loadCart = async () => {
    const localCart = JSON.parse(localStorage.getItem("cart")) || [];

    // 👤 NOT LOGGED IN → use local cart only
    if (!user) {
      setCartItems(localCart);
      return;
    }

    try {
      const cartRef = doc(db, "users", user.uid, "cart", "data");
      const snap = await getDoc(cartRef);

      const firebaseCart = snap.exists() ? snap.data().items || [] : [];

      // 🔀 MERGE LOCAL + FIREBASE
      const mergedCart = [...firebaseCart];

      localCart.forEach((localItem) => {
        const existing = mergedCart.find(
          (item) =>
            item._id === localItem._id &&
            item.selectedSize === localItem.selectedSize
        );

        if (existing) {
          existing.quantity += localItem.quantity;
        } else {
          mergedCart.push(localItem);
        }
      });

      // 💾 SAVE MERGED CART TO FIREBASE
      await setDoc(cartRef, { items: mergedCart });

      // 🧹 CLEAR LOCAL CART
      localStorage.removeItem("cart");

      setCartItems(mergedCart);
    } catch (err) {
      console.error("Cart merge failed:", err);
    }
  };

  loadCart();
}, [user]);


  /* ================= SAVE CART ================= */
  const saveCart = async (items) => {
    if (!user) {
      localStorage.setItem("cart", JSON.stringify(items));
      return;
    }

    try {
      await setDoc(doc(db, "users", user.uid, "cart", "data"), {
        items,
      });
    } catch (err) {
      console.error("Save cart failed:", err);
    }
  };

  /* ================= ADD TO CART ================= */
  const addToCart = (product) => {
    setCartItems((prev) => {
      const existing = prev.find(
        (item) =>
          item._id === product._id &&
          item.selectedSize === product.selectedSize
      );

      let updated;

      if (existing) {
        updated = prev.map((item) =>
          item._id === product._id &&
          item.selectedSize === product.selectedSize
            ? { ...item, quantity: item.quantity + product.quantity }
            : item
        );
      } else {
        updated = [...prev, product];
      }

      saveCart(updated);
      return updated;
    });
  };

  /* ================= REMOVE ================= */
  const removeFromCart = (id, size) => {
    const updated = cartItems.filter(
      (item) => !(item._id === id && item.selectedSize === size)
    );
    setCartItems(updated);
    saveCart(updated);
  };

  /* ================= INCREASE ================= */
  const increaseQuantity = (id, size) => {
    const updated = cartItems.map((item) =>
      item._id === id && item.selectedSize === size
        ? { ...item, quantity: item.quantity + 1 }
        : item
    );
    setCartItems(updated);
    saveCart(updated);
  };

  /* ================= DECREASE ================= */
  const decreaseQuantity = (id, size) => {
    const updated = cartItems
      .map((item) =>
        item._id === id && item.selectedSize === size
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
      .filter((item) => item.quantity > 0);

    setCartItems(updated);
    saveCart(updated);
  };

  /* ================= CLEAR AFTER ORDER ================= */
  const clearCartAfterOrder = async () => {
    setCartItems([]);

    if (!user) {
      localStorage.removeItem("cart");
      return;
    }

    await setDoc(doc(db, "users", user.uid, "cart", "data"), {
      items: [],
    });
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
