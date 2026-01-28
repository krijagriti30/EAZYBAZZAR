import React from "react";
import {
  Box,
  Flex,
  Image,
  Text,
  Button,
  Divider,
  VStack,
  HStack,
} from "@chakra-ui/react";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const CartPage = () => {
  const {
    cartItems,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
  } = useCart();

  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();

  const shippingFee = 10;

  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const total = subtotal + shippingFee;

  /* ================= CHECKOUT ================= */
  const handleCheckout = () => {
    if (!isLoggedIn) {
      navigate("/login", { state: { from: "/cart" } });
      return;
    }

    navigate("/placeorder");
  };

  return (
    <Box px={{ base: 4, md: 12 }} py={8} minH="80vh">
      <Text fontSize="lg" mb={1} textTransform="uppercase">
        Your Cart
      </Text>
      <Divider mb={6} borderColor="black" />

      {cartItems.length === 0 ? (
        <Text>Your cart is empty</Text>
      ) : (
        <>
          {/* CART ITEMS */}
          <VStack align="stretch" spacing={4} mb={10}>
            {cartItems.map((item) => (
              <Flex
                key={`${item._id}-${item.selectedSize}`}
                borderBottomWidth="1px"
                pb={4}
                align="center"
              >
                {/* PRODUCT */}
                <Flex align="center" gap={4} flex="2">
                  <Image
                    src={
                      Array.isArray(item.image) ? item.image[0] : item.image
                    }
                    alt={item.name}
                    boxSize="70px"
                    objectFit="cover"
                  />
                  <Box>
                    <Text fontWeight="500">{item.name}</Text>
                    <Text fontSize="sm" color="gray.600">
                      ${item.price}
                    </Text>
                  </Box>
                </Flex>

                {/* SIZE */}
                <Box w="70px" textAlign="center">
                  <Text fontSize="sm">Size</Text>
                  <Text fontWeight="500">{item.selectedSize}</Text>
                </Box>

                {/* QUANTITY */}
                <HStack w="100px" justify="center">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() =>
                      decreaseQuantity(item._id, item.selectedSize)
                    }
                  >
                    −
                  </Button>

                  <Text>{item.quantity}</Text>

                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() =>
                      increaseQuantity(item._id, item.selectedSize)
                    }
                  >
                    +
                  </Button>
                </HStack>

                {/* REMOVE */}
                <Box w="60px" textAlign="center">
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() =>
                      removeFromCart(item._id, item.selectedSize)
                    }
                  >
                    🗑
                  </Button>
                </Box>
              </Flex>
            ))}
          </VStack>

          {/* SUMMARY */}
          <Box maxW="400px" ml="auto">
            <Divider mb={4} />

            <Flex justify="space-between" mb={2}>
              <Text>Subtotal</Text>
              <Text>${subtotal.toFixed(2)}</Text>
            </Flex>

            <Flex justify="space-between" mb={2}>
              <Text>Shipping Fee</Text>
              <Text>${shippingFee.toFixed(2)}</Text>
            </Flex>

            <Divider my={3} />

            <Flex
              justify="space-between"
              fontWeight="bold"
              fontSize="lg"
              mb={4}
            >
              <Text>Total</Text>
              <Text>${total.toFixed(2)}</Text>
            </Flex>

            <Button
              bg="black"
              color="white"
              w="full"
              _hover={{ bg: "gray.800" }}
              onClick={handleCheckout}
            >
              {isLoggedIn ? "Proceed to Checkout" : "Login to Checkout"}
            </Button>
          </Box>
        </>
      )}
    </Box>
  );
};

export default CartPage;
