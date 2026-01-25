// src/pages/PlaceOrder.jsx
import React, { useState } from "react";
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
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { razorpay_logo, stripe_logo } from "../assets/frontend_assets/assets";

const paymentMethods = [
  { id: "stripe", label: "Later on use COD for now", logo: stripe_logo },
  { id: "razorpay", label: "Later on use COD for now", logo: razorpay_logo },
  { id: "cod", label: "Cash on Delivery", logo: null },
];

const PlaceOrder = () => {
  const [payment, setPayment] = useState("cod");
  const navigate = useNavigate();

  const handlePlaceOrder = () => {
    navigate("/ordersuccess");
  };

  return (
    <Box maxW="1100px" mx="auto" py={8} px={4}>
      <Grid templateColumns="1.6fr 1fr" gap={16}>
        {/* LEFT COLUMN - Delivery Info */}
        <Box>
          <Heading
            as="h3"
            mb={4}
            fontWeight="bold"
            fontSize="18px"
            textTransform="uppercase"
          >
            Delivery Information
          </Heading>

          <SimpleGrid columns={2} spacing={3} mb={3}>
            <Input size="sm" placeholder="First name" />
            <Input size="sm" placeholder="Last name" />
          </SimpleGrid>
          <Input size="sm" placeholder="Email address" mb={3} />
          <Input size="sm" placeholder="Street" mb={3} />
          <SimpleGrid columns={2} spacing={3} mb={3}>
            <Input size="sm" placeholder="City" />
            <Input size="sm" placeholder="State" />
          </SimpleGrid>
          <SimpleGrid columns={2} spacing={3} mb={3}>
            <Input size="sm" placeholder="Zipcode" />
            <Input size="sm" placeholder="Country" />
          </SimpleGrid>
          <Input size="sm" placeholder="Phone" mb={3} />
        </Box>

        {/* RIGHT COLUMN - Cart Totals */}
        <Box fontSize="14px">
          <Heading
            as="h3"
            mb={4}
            fontWeight="bold"
            fontSize="18px"
            textTransform="uppercase"
          >
            Cart Totals
          </Heading>

          <Flex justify="space-between" mb={1}>
            <Text>Subtotal</Text>
            <Text>$76.00</Text>
          </Flex>
          <Flex justify="space-between" mb={1}>
            <Text>Shipping Fee</Text>
            <Text>$10.00</Text>
          </Flex>
          <Box borderBottom="1px solid" borderColor="gray.300" mb={1} />
          <Flex justify="space-between" mb={6} fontWeight="bold">
            <Text>Total</Text>
            <Text>$86.00</Text>
          </Flex>

          {/* Payment Method */}
          <Heading
            as="h4"
            mb={3}
            fontWeight="bold"
            fontSize="18px"
            textTransform="uppercase"
          >
            Payment Method
          </Heading>

          <HStack spacing={5} mb={4} align="center">
            {paymentMethods.map((pm) => (
              <Flex
                key={pm.id}
                align="center"
                cursor="pointer"
                onClick={() => setPayment(pm.id)}
                gap={2}
              >
                <Circle
                  size="16px"
                  border="2px solid"
                  borderColor="black"
                  bg={payment === pm.id ? "black" : "transparent"}
                />
                {pm.logo ? (
                  <Image src={pm.logo} alt={pm.id} h="20px" />
                ) : (
                  <Text>{pm.label}</Text>
                )}
              </Flex>
            ))}
          </HStack>

          {payment !== "cod" && (
            <Text mb={4} fontSize="13px" color="gray.600">
              {paymentMethods.find((pm) => pm.id === payment)?.label}
            </Text>
          )}

          {/* Place Order Button */}
          <Button
            bg="black"
            color="white"
            w="full"
            py={5}
            fontSize="sm"
            _hover={{ bg: "black" }}
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
