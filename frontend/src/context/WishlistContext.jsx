import { createContext, useContext } from "react";
import { doc, setDoc, deleteDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";
import { useAuth } from "./AuthContext";

const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const { user } = useAuth();

  /* ================= ADD TO WISHLIST ================= */
  const addToWishlist = async (product) => {
    if (!user?.uid) {
      console.error("User not logged in");
      return;
    }

    try {
      await setDoc(
        doc(db, "users", user.uid, "wishlist", product._id), // ✅ fixed typo
        {
          productId: product._id,
          title: product.title || product.name,
          price: product.price,
          image: product.image,
          createdAt: Date.now(),
        }
      );
    } catch (error) {
      console.error("Add to wishlist failed:", error);
    }
  };

  /* ================= REMOVE FROM WISHLIST ================= */
  const removeFromWishlist = async (productId) => {
    if (!user?.uid) {
      console.error("User not logged in");
      return;
    }

    try {
      await deleteDoc(
        doc(db, "users", user.uid, "wishlist", productId) // ✅ fixed collection path and param
      );
    } catch (error) {
      console.error("Remove from wishlist failed:", error);
    }
  };

  return (
    <WishlistContext.Provider value={{ addToWishlist, removeFromWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => useContext(WishlistContext);
