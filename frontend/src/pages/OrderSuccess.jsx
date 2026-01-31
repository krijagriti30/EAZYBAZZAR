import React, { useEffect, useState } from "react";
import {
  Box,
  Heading,
  Text,
  VStack,
  Divider,
  SimpleGrid,
  Button,
} from "@chakra-ui/react";
import { useLocation, useNavigate } from "react-router-dom";

const OrderSuccess = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    if (location.state) {
      setOrder(location.state);
    }
  }, [location]);

  // 🔒 Guard
  if (!order || !order.deliveryInfo) {
    return (
      <Box maxW="600px" mx="auto" py={10} textAlign="center">
        <Heading fontSize="xl">No Order Found</Heading>
        <Text mt={2}>Please place an order first.</Text>
        <Button mt={4} onClick={() => navigate("/")}>
          Go Home
        </Button>
      </Box>
    );
  }

  const {
    orderId,
    items = [],
    total = 0,
    paymentMethod = "",
    deliveryInfo = {},
  } = order;

  return (
    <Box maxW="900px" mx="auto" py={10} px={4}>
      <Heading color="green.500" mb={4}>
        🎉 Order Placed Successfully!
      </Heading>

      <Text mb={6}>
        Order ID: <b>{orderId}</b>
      </Text>

      <Heading fontSize="18px" mb={3}>
        Delivery Details
      </Heading>

      <SimpleGrid columns={2} spacing={3} mb={6}>
        <Text>
          <b>Name:</b> {deliveryInfo?.firstName || ""}{" "}
          {deliveryInfo?.lastName || ""}
        </Text>
        <Text>
          <b>Email:</b> {deliveryInfo?.email || ""}
        </Text>
        <Text>
          <b>Phone:</b> {deliveryInfo?.phone || ""}
        </Text>
        <Text>
          <b>Address:</b> {deliveryInfo?.street || ""}
        </Text>
      </SimpleGrid>

      <Divider mb={4} />

      <Heading fontSize="18px" mb={3}>
        Order Items
      </Heading>

      <VStack align="stretch" spacing={3} mb={6}>
        {items.map((item, index) => (
          <Box key={index} display="flex" justifyContent="space-between">
            <Text>
              {item.title} × {item.quantity}
            </Text>
            <Text>₹{item.price * item.quantity}</Text>
          </Box>
        ))}
      </VStack>

      <Divider mb={4} />

      <Text>
        <b>Payment Method:</b> {paymentMethod?.toUpperCase()}
      </Text>
      <Text fontSize="lg" fontWeight="bold" mt={2}>
        Total Paid: ₹{total}
      </Text>

      <Button mt={6} colorScheme="blackAlpha" onClick={() => navigate("/")}>
        Continue Shopping
      </Button>
    </Box>
  );
};

export default OrderSuccess;
