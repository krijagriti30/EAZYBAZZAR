import React, { useEffect, useState } from "react";
import {
  Box,
  Text,
  VStack,
  HStack,
  Image,
  Divider,
  Badge,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { db } from "../firebaseConfig";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { useAuth } from "../context/AuthContext";

const Orders = () => {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        if (!user) return;

        const q = query(
          collection(db, "orders", user.uid, "orders"),
          orderBy("createdAt", "desc")
        );

        const snapshot = await getDocs(q);

        const ordersData = snapshot.docs.map((doc) => ({
          id: doc.id,            // ✅ FIX
          ...doc.data(),
        }));

        setOrders(ordersData);
      } catch (error) {
        console.error("Failed to fetch orders", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [user]);

  if (loading) return <Text>Loading orders...</Text>;

  return (
    <Box p={6}>
      <Text fontSize="2xl" mb={6} fontWeight="600">
        My Orders
      </Text>

      {orders.length === 0 ? (
        <Text>No orders placed yet</Text>
      ) : (
        <VStack spacing={6} align="stretch">
          {orders.map((order) => (
            <Box
              key={order.id}
              p={5}
              border="1px solid #e2e8f0"
              borderRadius="md"
              bg="white"
              cursor="pointer"
              _hover={{ shadow: "md", bg: "gray.50" }}
              onClick={() =>
                navigate(`/dashboard/orders/${order.id}`)
              }
            >
              {/* HEADER */}
              <HStack justify="space-between">
                <Text fontWeight="600">
                  Order ID: {order.id}
                </Text>

                <Badge colorScheme="green" textTransform="capitalize">
                  {order.status || "placed"}
                </Badge>
              </HStack>

              <Divider my={3} />

              {/* PRODUCTS */}
              <VStack spacing={4} align="stretch">
                {order.items?.map((item, index) => (
                  <HStack key={index} spacing={4}>
                    <Image
                      src={item.image || "/placeholder.png"}
                      alt={item.title}
                      boxSize="80px"
                      objectFit="cover"
                      borderRadius="md"
                    />

                    <Box>
                      <Text fontWeight="500">
                        {item.title}
                      </Text>
                      <Text fontSize="sm">
                        Qty: {item.quantity}
                      </Text>
                      <Text fontSize="sm">
                        ₹{item.price}
                      </Text>
                    </Box>
                  </HStack>
                ))}
              </VStack>

              <Divider my={3} />

              {/* TOTAL + DATE */}
              <HStack justify="space-between">
                <Text fontWeight="600">
                  Total: ₹{order.total}
                </Text>

                <Text fontSize="sm" color="gray.500">
                  {order.createdAt?.seconds
                    ? new Date(
                        order.createdAt.seconds * 1000
                      ).toLocaleString()
                    : ""}
                </Text>
              </HStack>
            </Box>
          ))}
        </VStack>
      )}
    </Box>
  );
};

export default Orders;
