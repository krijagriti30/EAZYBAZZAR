import {
  Box,
  Heading,
  Text,
  SimpleGrid,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
} from "@chakra-ui/react";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";

const FAQ_DATA = {
  "My Account": [
    {
      q: "How do I login to my EasyBazzar account?",
      a: "Click on the login icon, enter your registered email and password. Use 'Forgot Password' if needed.",
    },
    {
      q: "I am not able to login to my account.",
      a: "Ensure your credentials are correct and check your internet connection. Try resetting your password.",
    },
    {
      q: "Why is my account locked?",
      a: "Your account may be locked due to multiple failed login attempts. Please reset your password or contact support.",
    },
  ],

  "Orders & Delivery": [
    {
      q: "How can I track my order?",
      a: "Go to Dashboard → Orders → Track Order to view real-time status.",
    },
    {
      q: "Can I change my delivery address?",
      a: "Address changes are allowed only before the order is shipped.",
    },
  ],

  "Returns & Refunds": [
    {
      q: "What is your return policy?",
      a: "Items can be returned within 7 days of delivery.",
    },
    {
      q: "When will I receive my refund?",
      a: "Refunds are processed within 3–5 working days after pickup.",
    },
  ],

  "Payments & Checkout": [
    {
      q: "What payment methods are supported?",
      a: "We support UPI, Debit/Credit Cards, Net Banking and Cash on Delivery.",
    },
    {
      q: "Is Cash on Delivery available?",
      a: "COD is available for selected pin codes only.",
    },
  ],

  "Offers & Coupons": [
    {
      q: "How do I apply a coupon?",
      a: "You can apply coupons on the checkout page before placing your order.",
    },
    {
      q: "Why is my coupon not working?",
      a: "Coupons may have expired or may not apply to selected products.",
    },
  ],

  "Cancellation Issues": [
    {
      q: "How do I cancel my order?",
      a: "Go to Orders → Select Order → Cancel Order (if not shipped).",
    },
    {
      q: "Why was my order cancelled by EasyBazzar?",
      a: "Orders may be cancelled due to stock or payment issues.",
    },
  ],
};

const Help = () => {
  const { user } = useAuth();
  const [activeTopic, setActiveTopic] = useState("My Account");

  const firstName =
    user?.displayName || user?.email?.split("@")[0] || "User";

  return (
    <Box maxW="1000px" mx="auto" p={6}>
      {/* HEADER */}
      <Heading size="lg" mb={2}>
        Help & Support
      </Heading>
      <Text color="gray.600" mb={6}>
        Hi {firstName}, how can we help you?
      </Text>

      {/* TOPIC CARDS */}
      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4} mb={10}>
        {Object.keys(FAQ_DATA).map((topic) => (
          <Box
            key={topic}
            p={4}
            border="1px solid"
            borderColor={activeTopic === topic ? "purple.400" : "gray.200"}
            borderRadius="lg"
            bg={activeTopic === topic ? "purple.50" : "white"}
            fontWeight="500"
            cursor="pointer"
            onClick={() => setActiveTopic(topic)}
            _hover={{ bg: "gray.50" }}
          >
            {topic}
          </Box>
        ))}
      </SimpleGrid>

      {/* FAQ SECTION */}
      <Heading size="md" mb={4}>
        {activeTopic}
      </Heading>

      <Accordion allowToggle>
        {FAQ_DATA[activeTopic].map((item, index) => (
          <AccordionItem key={index}>
            <AccordionButton>
              <Box flex="1" textAlign="left">
                {item.q}
              </Box>
              <AccordionIcon />
            </AccordionButton>
            <AccordionPanel pb={4} color="gray.600">
              {item.a}
            </AccordionPanel>
          </AccordionItem>
        ))}
      </Accordion>

      {/* CONTACT SUPPORT */}
      <Box mt={10} p={4} bg="gray.50" borderRadius="md">
        <Text fontWeight="500">Still need help?</Text>
        <Text color="gray.600">
          Email us at{" "}
          <Text as="span" color="purple.600" fontWeight="600">
            support@easybazzar.com
          </Text>
        </Text>
      </Box>
    </Box>
  );
};

export default Help;
