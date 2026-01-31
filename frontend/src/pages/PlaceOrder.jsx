import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Flex,
  Grid,
  Heading,
  Input,
  SimpleGrid,
  Text,
  Image,
  HStack,
  Circle,
  useToast,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { razorpay_logo, stripe_logo } from "../assets/frontend_assets/assets";
import { useCart } from "../context/CartContext";
import { useOrder } from "../context/OrderContext";
import { useAuth } from "../context/AuthContext";

const paymentMethods = [
  { id: "stripe", label: "Stripe (later)", logo: stripe_logo },
  { id: "razorpay", label: "Razorpay (later)", logo: razorpay_logo },
  { id: "cod", label: "Cash on Delivery", logo: null },
];

const PlaceOrder = () => {
  const navigate = useNavigate();
  const toast = useToast();

  const { cartItems, clearCart } = useCart();
  const { placeOrder } = useOrder();
  const { user } = useAuth();

  const [payment, setPayment] = useState("cod");
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    phone: "",
  });

  const shippingFee = 10;

  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const total = subtotal + shippingFee;

  // 🚫 No cart → redirect
  useEffect(() => {
    if (cartItems.length === 0) {
      navigate("/cart");
    }
  }, [cartItems, navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePlaceOrder = async () => {
    const { firstName, lastName, email, street, phone } = formData;

    if (!firstName || !lastName || !email || !street || !phone) {
      toast({
        title: "All fields are required",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    if (!user) {
      toast({
        title: "Please login first",
        status: "error",
      });
      navigate("/login");
      return;
    }

    try {
      setLoading(true);

      // ✅ SAVE ORDER TO FIRESTORE
      const orderId = await placeOrder({
        items: cartItems,
        address: formData,
        paymentMethod: payment,
        subtotal,
        shippingFee,
        total,
      });

      // optional: clear cart after order
      if (clearCart) clearCart();

      // ✅ GO TO SUCCESS PAGE
      navigate("/ordersuccess", {
  state: {
    orderId,
    items: cartItems,
    total,
    paymentMethod: payment,
    deliveryInfo: formData,
  },
});

    } catch (error) {
      console.error("Order failed:", error);
      toast({
        title: "Failed to place order",
        status: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box maxW="1100px" mx="auto" py={8} px={4}>
      <Grid templateColumns={{ base: "1fr", md: "1.6fr 1fr" }} gap={16}>
        {/* LEFT */}
        <Box>
          <Heading mb={4} fontSize="18px">
            Delivery Information
          </Heading>

          <SimpleGrid columns={2} spacing={3} mb={3}>
            <Input
              size="sm"
              placeholder="First name"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
            />
            <Input
              size="sm"
              placeholder="Last name"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
            />
          </SimpleGrid>

          <Input
            size="sm"
            placeholder="Email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            mb={3}
          />

          <Input
            size="sm"
            placeholder="Street"
            name="street"
            value={formData.street}
            onChange={handleChange}
            mb={3}
          />

          <Input
            size="sm"
            placeholder="Phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            mb={3}
          />
        </Box>

        {/* RIGHT */}
        <Box fontSize="14px">
          <Heading mb={4} fontSize="18px">
            Cart Totals
          </Heading>

          <Flex justify="space-between">
            <Text>Subtotal</Text>
            <Text>₹{subtotal}</Text>
          </Flex>

          <Flex justify="space-between">
            <Text>Shipping</Text>
            <Text>₹{shippingFee}</Text>
          </Flex>

          <Flex justify="space-between" fontWeight="bold" my={4}>
            <Text>Total</Text>
            <Text>₹{total}</Text>
          </Flex>

          <Heading mb={3} fontSize="18px">
            Payment Method
          </Heading>

          <HStack spacing={5} mb={4}>
            {paymentMethods.map((pm) => (
              <Flex
                key={pm.id}
                align="center"
                gap={2}
                cursor="pointer"
                onClick={() => setPayment(pm.id)}
              >
                <Circle
                  size="16px"
                  border="2px solid black"
                  bg={payment === pm.id ? "black" : "transparent"}
                />
                {pm.logo ? (
                  <Image src={pm.logo} h="20px" />
                ) : (
                  <Text>{pm.label}</Text>
                )}
              </Flex>
            ))}
          </HStack>

          <Button
            bg="black"
            color="white"
            w="full"
            isLoading={loading}
            onClick={handlePlaceOrder}
          >
            PLACE ORDER
          </Button>
        </Box>
      </Grid>
    </Box>
  );
};

export default PlaceOrder;
