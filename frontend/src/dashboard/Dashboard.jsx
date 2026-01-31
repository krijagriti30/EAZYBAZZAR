import React, { useEffect, useState } from "react";
import { Outlet, NavLink, useNavigate } from "react-router-dom";
import {
  Box,
  Flex,
  Text,
  Button,
  VStack,
  Spinner,
} from "@chakra-ui/react";
import { useAuth } from "../context/AuthContext";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";

const Dashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  // 🔹 Fetch user profile from Firestore
  useEffect(() => {
    if (!user) return;

    const fetchProfile = async () => {
      const ref = doc(db, "users", user.uid);
      const snap = await getDoc(ref);

      if (snap.exists()) {
        setProfile(snap.data());
      }
      setLoading(false);
    };

    fetchProfile();
  }, [user]);

  const linkStyle = ({ isActive }) => ({
    display: "block",
    padding: "10px 12px",
    borderRadius: "6px",
    fontWeight: "500",
    background: isActive ? "#E9D8FD" : "transparent",
    color: isActive ? "#6B46C1" : "#2D3748",
    textDecoration: "none",
  });

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  if (loading) {
    return (
      <Flex minH="100vh" align="center" justify="center">
        <Spinner />
      </Flex>
    );
  }

  return (
    <Flex minH="100vh">
      {/* ================= SIDEBAR ================= */}
      <Box
        w="260px"
        bg="gray.100"
        p={5}
        borderRight="1px solid"
        borderColor="gray.200"
      >
        {/* USER INFO */}
        <Box mb={8}>
          <Text fontSize="m" color="black" fontWeight="600" >
            Hello,
          </Text>

          <Text fontWeight="600" noOfLines={1}>
            {profile?.name || "User"}
          </Text>

          
        </Box>

        {/* NAV LINKS */}
        <VStack align="stretch" spacing={1}>
          <NavLink to="profile" style={linkStyle}>👤 Profile</NavLink>
          <NavLink to="cart" style={linkStyle}>🛒 Cart</NavLink>
          <NavLink to="orders" style={linkStyle}>📦 Orders</NavLink>
          <NavLink to="trackorder" style={linkStyle}>🚚 Track Order</NavLink>
          <NavLink to="wishlist" style={linkStyle}> ❤️ Wishlist</NavLink>
          <NavLink to="Setting" style={linkStyle}>⚙️ Settings</NavLink>
          
        </VStack>

        {/* LOGOUT */}
        <Button
          mt={8}
          colorScheme="red"
          width="100%"
          onClick={handleLogout}
        >
          Logout
        </Button>
      </Box>

      {/* ================= CONTENT ================= */}
      <Box flex="1" p={6} bg="white">
        <Outlet />
      </Box>
    </Flex>
  );
};

export default Dashboard;
