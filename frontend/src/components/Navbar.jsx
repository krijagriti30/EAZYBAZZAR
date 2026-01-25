// src/components/Navbar.jsx
import {
  Box,
  Flex,
  Link as ChakraLink,
  Button,
} from "@chakra-ui/react";
import { FaUser, FaShoppingBag } from "react-icons/fa";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { cartItems } = useCart();
  const { isLoggedIn, logout } = useAuth();
  const navigate = useNavigate();

  const menuItems = [
    { label: "HOME", href: "/" },
    { label: "COLLECTION", href: "/collection" },
    { label: "ABOUT", href: "/about" },
    { label: "CONTACT", href: "/contact" },
  ];

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/");
    } catch (err) {
      console.error("Logout error", err);
    }
  };

  return (
    <Flex
      justify="space-between"
      align="center"
      px={10}
      py={4}
      bg="white"
      boxShadow="sm"
    >
      {/* Logo */}
      <Box fontWeight="bold" fontSize="2xl">
        FOREVER<span style={{ color: "hotpink" }}>.</span>
      </Box>

      {/* Nav Links */}
      <Flex gap={8}>
        {menuItems.map((item) => (
          <ChakraLink
            as={RouterLink}
            to={item.href}
            key={item.label}
            fontSize="sm"
            fontWeight="medium"
            textTransform="uppercase"
            color="black"
            _hover={{ transform: "translateY(-2px)", textDecoration: "none" }}
          >
            {item.label}
          </ChakraLink>
        ))}
      </Flex>

      {/* Right Icons */}
      <Flex gap={4} align="center">
        {/* Auth: Login or Logout */}
        {isLoggedIn ? (
          <Button size="sm" colorScheme="pink" variant="solid" onClick={handleLogout}>
            Logout
          </Button>
        ) : (
          <ChakraLink as={RouterLink} to="/login">
            <FaUser size={20} style={{ cursor: "pointer" }} />
          </ChakraLink>
        )}

        {/* Cart Icon with Count */}
        <ChakraLink as={RouterLink} to="/cart" position="relative">
          <FaShoppingBag size={20} style={{ cursor: "pointer" }} />
          {cartItems && cartItems.length > 0 && (
            <Box
              position="absolute"
              top="-6px"
              right="-8px"
              bg="hotpink"
              color="white"
              fontSize="xs"
              px="2"
              borderRadius="full"
            >
              {cartItems.length}
            </Box>
          )}
        </ChakraLink>
      </Flex>
    </Flex>
  );
};

export default Navbar;
