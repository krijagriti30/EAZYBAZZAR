// src/pages/OrderSuccess.jsx
import React, { useEffect, useState } from "react";
import { Box, Heading, Text, Button, VStack } from "@chakra-ui/react";
import { useParams, useNavigate } from "react-router-dom";

const OrderSuccess = () => {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    try {
      const raw = localStorage.getItem("orders") || "[]";
      const arr = JSON.parse(raw);
      const o = arr.find((x) => x.id === orderId);

      // Debug log to verify what's being loaded
      console.log("[OrderSuccess] loaded order:", o);

      setOrder(o || null);
    } catch (err) {
      console.error("[OrderSuccess] Error loading order:", err);
      setOrder(null);
    }
  }, [orderId]);

  if (!order) {
    return (
      <Box p={8}>
        <Heading size="md">Order not found</Heading>
        <Text mt={2}>Maybe the order was not saved. Try again.</Text>
        <Button mt={4} onClick={() => navigate("/")}>
          Back to home
        </Button>
      </Box>
    );
  }

  return (
    <Box p={8}>
      <Heading size="md">Thank you — order placed!</Heading>
      <Text mt={2}>Order ID: {order.id}</Text>
      <Text mt={4}>Status: {order.status}</Text>

      <VStack align="stretch" spacing={2} mt={6} maxW="600px">
        {order.items.map((it, idx) => (
          <Box key={idx} borderBottom="1px solid #eee" py={2}>
            <Text fontWeight="bold">{it.name}</Text>
            <Text fontSize="sm">
              {it.selectedSize ? `Size: ${it.selectedSize} — ` : ""}
              {it.quantity} × ₹{it.price}
            </Text>
          </Box>
        ))}
      </VStack>

      <Button mt={6} onClick={() => navigate("/")}>
        Continue shopping
      </Button>
    </Box>
  );
};

export default OrderSuccess;
