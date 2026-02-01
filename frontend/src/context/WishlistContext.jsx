// src/context/WishlistContext.jsx
import { createContext, useContext } from "react";
import { doc, setDoc, deleteDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";
import { useAuth } from "./AuthContext";

const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const { user } = useAuth();

  const addToWishlist = async (product) => {
    if (!user?.uid) {
      return { success: false, message: "Please login first" };
    }

    try {
      await setDoc(
        doc(db, "users", user.uid, "wishlist", product._id),
        {
          productId: product._id,
          title: product.name || product.title,
          price: product.price,
          image: Array.isArray(product.image)
            ? product.image[0]
            : product.image,
          createdAt: Date.now(),
        }
      );

      return { success: true };
    } catch (error) {
      console.error(error);
      return { success: false, message: "Failed to add wishlist" };
    }
  };

  const removeFromWishlist = async (productId) => {
    if (!user?.uid) return;

    await deleteDoc(doc(db, "users", user.uid, "wishlist", productId));
  };

  return (
    <WishlistContext.Provider value={{ addToWishlist, removeFromWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => useContext(WishlistContext);
