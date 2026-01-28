import { useState } from "react";
import {
  Box,
  Flex,
  Input,
  Button,
  Text,
  Link,
  VStack,
  HStack,
  useToast,
  SimpleGrid,
} from "@chakra-ui/react";

const Footer = () => {
  const [email, setEmail] = useState("");
  const toast = useToast();

  const handleSubscribe = () => {
    if (!email) {
      toast({
        title: "Please enter your email.",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    console.log("Subscribed email:", email);
    toast({
      title: "Subscription successful!",
      description: `Thank you for subscribing with ${email}`,
      status: "success",
      duration: 3000,
      isClosable: true,
    });
    setEmail("");
  };

  return (
    <Box bg="white" pt={24} pb={16} px={{ base: 4, md: 16 }}>
      {/* Subscription Section */}
      <Box textAlign="center" mb={24}>
        <Text fontSize="2xl" fontWeight="bold" mb={4}>
          Subscribe now & get 20% off
        </Text>
        <Text color="gray.600" maxW="600px" mx="auto" mb={6}>
          Join our EasyBazaar community and get exclusive updates, offers, and
          style inspiration delivered straight to your inbox.
        </Text>
        <Flex maxW="500px" mx="auto">
          <Input
            placeholder="Enter your email"
            borderRightRadius="0"
            size="lg"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Button
            colorScheme="pink"
            borderLeftRadius="0"
            size="lg"
            onClick={handleSubscribe}
          >
            Subscribe
          </Button>
        </Flex>
      </Box>

      {/* Why Choose EasyBazaar Section */}
      <Box textAlign="center" mb={16}>
        <Text fontSize="2xl" fontWeight="bold" mb={6}>
          Why Choose EasyBazaar
        </Text>
        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={10} maxW="900px" mx="auto">
          <Box>
            <Text fontWeight="bold" mb={2}>
              Wide Selection
            </Text>
            <Text color="gray.600" fontSize="sm">
              Thousands of products across multiple categories to meet all your shopping needs.
            </Text>
          </Box>
          <Box>
            <Text fontWeight="bold" mb={2}>
              Fast Delivery
            </Text>
            <Text color="gray.600" fontSize="sm">
              Quick and reliable delivery so you get your order when you need it.
            </Text>
          </Box>
          <Box>
            <Text fontWeight="bold" mb={2}>
              Great Deals
            </Text>
            <Text color="gray.600" fontSize="sm">
              Exclusive offers and discounts available for all our customers.
            </Text>
          </Box>
        </SimpleGrid>
      </Box>

      {/* Footer Main Section: Logo Left, Get in Touch Right */}
      <Flex
        direction={{ base: "column", md: "row" }}
        justify="space-between"
        align={{ base: "flex-start", md: "flex-start" }}
        maxW="1200px"
        mx="auto"
        columnGap={40}
        rowGap={16}
      >
        {/* Left section: Logo and description */}
        <Box flex="1" w="100%" maxW="400px" mb={{ base: 8, md: 0 }}>
          <Text fontSize="2xl" fontWeight="bold" mb={4}>
            EasyBazaar<span style={{ color: "#d53f8c" }}>.</span>
          </Text>
          <Text color="gray.600" fontSize="sm" lineHeight="tall">
            At EasyBazaar, we make shopping simple, fast, and enjoyable. Discover a wide range of products, exclusive deals, and seamless delivery. Our mission is to provide the best online shopping experience for everyone.
          </Text>
        </Box>

        {/* Right section: Get in touch */}
        <Box flex="1" w="100%" minW="220px">
          <Text fontSize="lg" fontWeight="bold" mb={4}>
            GET IN TOUCH
          </Text>
          <VStack align={{ base: "flex-start", md: "flex-end" }} spacing={4}>
            <Link href="mailto:contact@easybazaar.com">contact@easybazaar.com</Link>
            {/* Add social links here if needed */}
          </VStack>
        </Box>
      </Flex>

      {/* Bottom copyright */}
      <HStack justify="center" mt={16}>
        <Text fontSize="m" color="black" textAlign="center">
          THANK YOU FOR VISITING EASYBAZAAR
        </Text>
      </HStack>
    </Box>
  );
};

export default Footer;
