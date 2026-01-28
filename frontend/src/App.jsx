import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

// PAGES
import Home from "./pages/Home";
import CollectionPage from "./pages/CollectionPage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import ProductDetails from "./pages/ProductDetails";
import CartPage from "./pages/CartPage";
import Wishlist from "./pages/Wishlist";
import PlaceOrder from "./pages/PlaceOrder";
import OrderSuccess from "./pages/OrderSuccess";
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";

// AUTH
import ProtectedRoute from "./components/ProtectedRoute";

// DASHBOARD
import Dashboard from "./dashboard/Dashboard";
import ProfilePage from "./dashboard/Profile";
import Orders from "./dashboard/Orders";
import OrderDetails from "./dashboard/OrderDetails";
import Trackorder from "./dashboard/Trackorder";
import Help from "./dashboard/Help";
import EGiftCards from "./dashboard/GiftCards";
import SavedAddresses from "./dashboard/SavedAddresses";
import PaymentManagement from "./dashboard/PaymentManagement";
import ProfileDetails from "./dashboard/ProfileDetails";

// CSS
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function App() {
  return (
    <>
      <Navbar />

      <Routes>
        {/* ================= PUBLIC ROUTES ================= */}
        <Route path="/" element={<Home />} />
        <Route path="/collection" element={<CollectionPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />

        <Route
          path="/product-details/:productId"
          element={<ProductDetails />}
        />

        {/* ================= CART & WISHLIST ================= */}
        {/* Cart → allowed without login */}
        <Route path="/cart" element={<CartPage />} />

        {/* Wishlist → page itself checks login (Myntra style) */}
        <Route path="/wishlist" element={<Wishlist />} />

        {/* Checkout → login enforced inside CartPage */}
        <Route path="/placeorder" element={<PlaceOrder />} />

        <Route
          path="/order-success/:orderId"
          element={<OrderSuccess />}
        />

        {/* ================= AUTH ================= */}
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/login" element={<LoginPage />} />

        {/* ================= DASHBOARD (PROTECTED) ================= */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        >
          <Route index element={<ProfilePage />} />
          <Route path="profile" element={<ProfilePage />} />

          {/* Optional: dashboard cart view */}
          <Route path="cart" element={<CartPage />} />

          <Route path="orders" element={<Orders />} />
          <Route
            path="orders/:orderId"
            element={<OrderDetails />}
          />

          <Route path="trackorder" element={<Trackorder />} />
          <Route path="help" element={<Help />} />
          <Route path="gift-cards" element={<EGiftCards />} />
          <Route path="savedaddress" element={<SavedAddresses />} />
          <Route path="profiledetails" element={<ProfileDetails />} />
          <Route path="payment" element={<PaymentManagement />} />
        </Route>
      </Routes>

      <Footer />
    </>
  );
}

export default App;
