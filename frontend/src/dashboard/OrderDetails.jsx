import React, { useEffect, useState } from "react";
import {
  Box,
  Text,
  Image,
  VStack,
  Divider,
  Badge,
  Button,
  HStack,
} from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";
import { useAuth } from "../context/AuthContext";
import { generateInvoice } from "../utils/generateInvoice";

const OrderDetails = () => {
  const { orderId } = useParams();
  const { user } = useAuth();

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user || !orderId) return;

    const fetchOrder = async () => {
      try {
        const ref = doc(
          db,
          "users",
          user.uid,
          "orders",
          orderId
        );

        const snap = await getDoc(ref);

        if (snap.exists()) {
          setOrder(snap.data());
        }
      } catch (error) {
        console.error("Failed to fetch order:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [orderId, user]);

  if (loading) return <Text p={6}>Loading order...</Text>;
  if (!order) return <Text p={6}>Order not found</Text>;

  return (
    <Box p={6} bg="white" minH="100vh">
      {/* HEADER */}
      <HStack justify="space-between" mb={4}>
        <Box>
          <Text fontSize="2xl" fontWeight="bold">
            Order Details
          </Text>
          <Text fontSize="sm" color="gray.500">
            Order ID: {orderId}
          </Text>
        </Box>

        <Button
          colorScheme="blue"
          onClick={() => generateInvoice(order, orderId)}
        >
          Download Invoice PDF
        </Button>
      </HStack>

      <Badge colorScheme="green" mb={4}>
        {order.status}
      </Badge>

      <Divider mb={6} />

      {/* PRODUCTS */}
      <VStack align="stretch" spacing={5}>
        {order.items.map((item, index) => (
          <Box
            key={index}
            display="flex"
            gap={4}
            bg="white"
            p={4}
            borderRadius="md"
          >
            <Image
              src={item.image}
              alt={item.title}
              boxSize="100px"
              objectFit="cover"
              borderRadius="md"
            />
            <Box>
              <Text fontWeight="600">{item.title}</Text>
              <Text fontSize="sm">Qty: {item.quantity}</Text>
              <Text fontSize="sm">₹{item.price}</Text>
            </Box>
          </Box>
        ))}
      </VStack>

      <Divider my={6} />

      {/* ADDRESS */}
      <Box bg="white" p={4} borderRadius="md" mb={6}>
        <Text fontWeight="600" mb={2}>
          Delivery Address
        </Text>
        <Text>
          {order.address.firstName} {order.address.lastName}
        </Text>
        <Text>{order.address.street}</Text>
        <Text>
          {order.address.city}, {order.address.state}
        </Text>
        <Text>{order.address.zipcode}</Text>
        <Text>Phone: {order.address.phone}</Text>
      </Box>

      {/* PAYMENT & PRICE */}
      <Box bg="white" p={4} borderRadius="md">
        <Text mb={2}>
          <b>Payment Method:</b> {order.paymentMethod}
        </Text>

        <Divider my={2} />

        <Text>Subtotal: ₹{order.subtotal}</Text>
        <Text>Shipping: ₹{order.shippingFee}</Text>
        <Text fontWeight="bold" mt={1}>
          Total: ₹{order.total}
        </Text>
      </Box>
    </Box>
  );
};

export default OrderDetails;
