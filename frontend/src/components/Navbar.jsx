import {
  Box,
  Flex,
  Link as ChakraLink,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Text,
  Badge,
} from "@chakra-ui/react";
import { FaUser, FaShoppingBag, FaHeart } from "react-icons/fa";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { cartItems } = useCart();
  const { isLoggedIn, logout, user } = useAuth();
  const navigate = useNavigate();

  const menuItems = [
    { label: "HOME", href: "/" },
    { label: "COLLECTION", href: "/collection" },
    { label: "ABOUT", href: "/about" },
    { label: "CONTACT", href: "/contact" },
  ];

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  return (
    <Flex
      justify="space-between"
      align="center"
      px={{ base: 6, md: 12 }}
      py={4}
      bg="rgba(255,255,255,0.9)"
      backdropFilter="blur(8px)"
      boxShadow="md"
      position="sticky"
      top="0"
      zIndex="1000"
    >
      {/* LOGO */}
      <Box fontWeight="bold" fontSize="2xl" letterSpacing="wide">
        EASYBAZZAR
        <Box as="span" color="pink.500">
          .
        </Box>
      </Box>

      {/* NAV LINKS */}
      <Flex gap={8}>
        {menuItems.map((item) => (
          <ChakraLink
            key={item.label}
            as={RouterLink}
            to={item.href}
            fontSize="sm"
            fontWeight="semibold"
            textTransform="uppercase"
            color="gray.700"
            position="relative"
            _after={{
              content: '""',
              position: "absolute",
              width: "0%",
              height: "2px",
              bottom: "-4px",
              left: "0",
              bg: "pink.500",
              transition: "0.3s",
            }}
            _hover={{
              color: "pink.500",
              textDecoration: "none",
              _after: { width: "100%" },
            }}
          >
            {item.label}
          </ChakraLink>
        ))}
      </Flex>

      {/* RIGHT SECTION */}
      <Flex gap={6} align="center">
        {/* PROFILE MENU */}
        <Menu>
          <MenuButton>
            <Box
              p={2}
              borderRadius="full"
              _hover={{ bg: "pink.50" }}
              transition="0.2s"
            >
              <FaUser size={18} />
            </Box>
          </MenuButton>

          <MenuList minW="240px" p={4} borderRadius="xl" boxShadow="xl">
            {!isLoggedIn ? (
              <>
                <Text fontWeight="bold">Welcome 👋</Text>
                <Text fontSize="sm" color="gray.500" mb={3}>
                  Access account & manage orders
                </Text>

                <Button
                  colorScheme="pink"
                  size="sm"
                  width="100%"
                  mb={3}
                  onClick={() => navigate("/login")}
                >
                  LOGIN / SIGNUP
                </Button>

                <MenuItem onClick={() => navigate("/login")}>
                  Orders
                </MenuItem>
                <MenuItem onClick={() => navigate("/login")}>
                  Wishlist
                </MenuItem>
              </>
            ) : (
              <>
                <Text fontWeight="bold" mb={2}>
                  Hello {user?.email || "User"} 👋
                </Text>

                <MenuItem onClick={() => navigate("/dashboard/profile")}>
                  My Profile
                </MenuItem>
                <MenuItem onClick={() => navigate("/dashboard/orders")}>
                  Orders
                </MenuItem>
                <MenuItem onClick={() => navigate("/wishlist")}>
                  Wishlist
                </MenuItem>
                <MenuItem color="red.500" onClick={handleLogout}>
                  Logout
                </MenuItem>
              </>
            )}
          </MenuList>
        </Menu>

        {/* WISHLIST ICON */}
        <ChakraLink
          as={RouterLink}
          to={isLoggedIn ? "/wishlist" : "/login"}
          position="relative"
        >
          <Box
            p={2}
            borderRadius="full"
            _hover={{ bg: "pink.50", color: "pink.500" }}
            transition="0.2s"
          >
            <FaHeart size={18} />
          </Box>
        </ChakraLink>

        {/* CART ICON */}
        <ChakraLink as={RouterLink} to="/cart" position="relative">
          <Box
            p={2}
            borderRadius="full"
            _hover={{ bg: "pink.50" }}
            transition="0.2s"
          >
            <FaShoppingBag size={18} />
          </Box>

          {cartItems?.length > 0 && (
            <Badge
              position="absolute"
              top="-4px"
              right="-4px"
              bg="pink.500"
              color="white"
              borderRadius="full"
              fontSize="0.7rem"
              px={2}
            >
              {cartItems.length}
            </Badge>
          )}
        </ChakraLink>
      </Flex>
    </Flex>
  );
};

export default Navbar;
