import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";

import App from "./App.jsx";

// CONTEXTS
import { ShopProvider } from "./context/ShopContext";
import { CartProvider } from "./context/CartContext";
import { AuthProvider } from "./context/AuthContext";
import { WishlistProvider } from "./context/WishlistContext";
import { OrderProvider } from "./context/OrderContext";

// Firebase init
import "./firebaseConfig.js";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <ChakraProvider>
        <AuthProvider>
          <ShopProvider>
            <CartProvider>
              <WishlistProvider>
                {/* ✅ REQUIRED FOR ORDERS */}
                <OrderProvider>
                  <App />
                </OrderProvider>
              </WishlistProvider>
            </CartProvider>
          </ShopProvider>
        </AuthProvider>
      </ChakraProvider>
    </BrowserRouter>
  </React.StrictMode>
);
