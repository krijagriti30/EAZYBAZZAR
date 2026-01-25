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
import { useNavigate, useLocation } from "react-router-dom";

const CartPage = () => {
  const { cartItems, removeFromCart, increaseQuantity, decreaseQuantity } =
    useCart();
  const navigate = useNavigate();
  const location = useLocation();

  const shippingFee = 10;
  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  const total = subtotal + shippingFee;

  const isPlaceOrderPage = location.pathname === "/placeorder";

  return (
    <Box px={{ base: 4, md: 12 }} py={8} minH="80vh">
      {/* Header */}
      <Text fontSize="lg" mb={1} textTransform="uppercase">
        Your Cart
      </Text>
      <Divider mb={6} borderColor="black" />

      {cartItems.length === 0 ? (
        <Text>Your cart is empty</Text>
      ) : (
        <>
          {/* Cart Items */}
          <VStack align="stretch" spacing={4} mb={isPlaceOrderPage ? 4 : 20}>
            {cartItems.map((item) => (
              <Flex
                key={`${item.id}-${item.selectedSize}`}
                borderBottomWidth="1px"
                pb={4}
                align="center"
              >
                {/* Product Info */}
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
                    <Text>{item.name}</Text>
                    <Text fontSize="sm" color="gray.600">
                      ${item.price}
                    </Text>
                  </Box>
                </Flex>

                {/* Size */}
                <Box w="60px" textAlign="center">
                  <Text>{item.selectedSize}</Text>
                </Box>

                {/* Quantity Controls */}
                <HStack w="80px" justify="center">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() =>
                      decreaseQuantity(item.id, item.selectedSize)
                    }
                    isDisabled={item.quantity <= 1}
                  >
                    −
                  </Button>
                  <Text>{item.quantity}</Text>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() =>
                      increaseQuantity(item.id, item.selectedSize)
                    }
                  >
                    +
                  </Button>
                </HStack>

                {/* Remove */}
                <Box w="50px" textAlign="center">
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() =>
                      removeFromCart(item.id, item.selectedSize)
                    }
                  >
                    🗑
                  </Button>
                </Box>
              </Flex>
            ))}
          </VStack>

          {/* Fixed Cart Totals Box - show only if cart has items & not on placeorder page */}
          {!isPlaceOrderPage && cartItems.length > 0 && (
            <Box
              position="fixed"
              bottom="0"
              right="0"
              bg="white"
              borderTopWidth="1px"
              borderLeftWidth="1px"
              p={4}
              w={{ base: "100%", md: "300px" }}
              boxShadow="md"
              zIndex="1000"
            >
              <Text fontSize="lg" mb={1} textTransform="uppercase">
                Cart Totals
              </Text>
              <Divider mb={4} borderColor="black" />

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
  size="sm"
  w="full"
  _hover={{ bg: "gray.800" }}
  onClick={() => {
    console.log("[CartPage] proceed to checkout clicked, cartItems:", cartItems);
    navigate("/placeorder");
  }}
>
  Proceed to Checkout
</Button>
 
            </Box>
          )}
        </>
      )}
    </Box>
  );
};

export default CartPage;
