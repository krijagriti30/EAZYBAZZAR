import React, { createContext, useState, useEffect } from "react";
import { products as staticProducts } from "../assets/frontend_assets/assets"; // adjust path if needed

// ✅ Named export
export const ShopContext = createContext();

export const ShopProvider = ({ children }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Instead of fetching from API, load from local products file
    setProducts(staticProducts);
  }, []);

  // ✅ Helper: get single product by id
  const getProductById = (id) => {
    return products.find((p) => p._id === id);
  };

  // ✅ Helper: get related products (same category, exclude itself)
  const getRelatedProducts = (product) => {
    if (!product) return [];
    return products.filter(
      (p) => p.category === product.category && p._id !== product._id
    );
  };

  return (
    <ShopContext.Provider value={{ products, getProductById, getRelatedProducts }}>
      {children}
    </ShopContext.Provider>
  );
};
