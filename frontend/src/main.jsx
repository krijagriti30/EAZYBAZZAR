import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import App from "./App.jsx";
import { ShopProvider } from "./context/ShopContext";
import { CartProvider } from "./context/CartContext";
import { AuthProvider } from "./context/AuthContext";

// Firebase init
import "./firebaseConfig.js";

import { WishlistProvider } from "./context/WishlistContext";

ReactDOM.createRoot(document.getElementById("root")).render(

    <BrowserRouter>
      <ChakraProvider>
        <AuthProvider>
          <ShopProvider>
            <CartProvider>
              <WishlistProvider>
              <App />
              </WishlistProvider>
            </CartProvider>
          </ShopProvider>
        </AuthProvider>
      </ChakraProvider>
    </BrowserRouter>

);
