import { createContext, useContext } from "react";
import { db } from "../firebaseConfig";
import { useAuth } from "./AuthContext";
import {
  addDoc,
  collection,
  serverTimestamp,
  getDocs,
  query,
  orderBy,
} from "firebase/firestore";

const OrderContext = createContext();

export const OrderProvider = ({ children }) => {
  const { user } = useAuth();

  // ✅ PLACE ORDER
  const placeOrder = async ({
    items,
    address,
    paymentMethod,
    subtotal,
    shippingFee,
    total,
  }) => {
    if (!user) throw new Error("User not logged in");

    const docRef = await addDoc(
      collection(db, "users", user.uid, "orders"),
      {
        userId: user.uid,
        items,
        address,
        paymentMethod,
        subtotal,
        shippingFee,
        total,
        status: "placed",
        createdAt: serverTimestamp(),
      }
    );

    return docRef.id;
  };

  // ✅ GET USER ORDERS
  const getOrders = async () => {
    if (!user) return [];

    const q = query(
      collection(db, "users", user.uid, "orders"),
      orderBy("createdAt", "desc")
    );

    const snapshot = await getDocs(q);

    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  };

  return (
    <OrderContext.Provider value={{ placeOrder, getOrders }}>
      {children}
    </OrderContext.Provider>
  );
};

export const useOrder = () => useContext(OrderContext);
