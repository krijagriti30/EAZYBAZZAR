import React, { createContext, useContext, useEffect, useState } from "react";
import {
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { collection, onSnapshot } from "firebase/firestore";
import { auth, db } from "../firebaseConfig";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [wishlistCount, setWishlistCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let unsubscribeWishlist = null;

    const unsubAuth = onAuthStateChanged(auth, (u) => {
      setUser(u);

      if (u) {
        // ✅ Correct Firestore path
        const wishlistRef = collection(db, "users", u.uid, "wishlist");

        unsubscribeWishlist = onSnapshot(
          wishlistRef,
          (snapshot) => {
            setWishlistCount(snapshot.size); // Realtime count of wishlist
          },
          (error) => {
            console.error("Wishlist listener error:", error);
          }
        );
      } else {
        setWishlistCount(0);
        if (unsubscribeWishlist) unsubscribeWishlist();
      }

      setLoading(false);
    });

    return () => {
      unsubAuth();
      if (unsubscribeWishlist) unsubscribeWishlist();
    };
  }, []);

  // ================= AUTH FUNCTIONS =================
  const signup = (email, password) =>
    createUserWithEmailAndPassword(auth, email, password);

  const login = (email, password) =>
    signInWithEmailAndPassword(auth, email, password);

  const logout = () => signOut(auth);

  const googleSignIn = () => {
    const provider = new GoogleAuthProvider();
    return signInWithPopup(auth, provider);
  };

  const value = {
    user,
    isLoggedIn: !!user,
    loading,
    wishlistCount,
    signup,
    login,
    logout,
    googleSignIn,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
