import { useEffect } from "react";
import { useCart } from "../context/CartContext";

const OrderSuccess = () => {
  const { clearCartAfterOrder } = useCart();

  useEffect(() => {
    clearCartAfterOrder(); // ✅ ONLY HERE
  }, []);

  return <h2>Order Placed Successfully 🎉</h2>;
};

export default OrderSuccess;
