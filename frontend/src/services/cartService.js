import { doc, setDoc, increment } from "firebase/firestore";
import { db } from "../firebaseConfig";

export const addToCart = async (uid, product) => {
  const ref = doc(db, "users", uid, "cart", product.id);

  await setDoc(
    ref,
    {
      title: product.title,
      price: product.price,
      image: product.image,
      selectedSize: product.selectedSize || null,
      quantity: increment(1),
      addedAt: new Date(),
    },
    { merge: true }
  );
};
