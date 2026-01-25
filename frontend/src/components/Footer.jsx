import { Box, Flex, Input, Button, Text, Link, VStack, HStack } from "@chakra-ui/react";

const Footer = () => {
  return (
    <Box bg="white" pt={24} pb={16} px={{ base: 4, md: 16 }}>
      {/* Subscription Section */}
      <Box textAlign="center" mb={24}>
        <Text fontSize="2xl" fontWeight="bold" mb={4}>
          Subscribe now & get 20% off
        </Text>
        <Text color="gray.600" maxW="600px" mx="auto" mb={6}>
          Join our FOREVER community and get exclusive updates, offers, and style inspiration delivered straight to your inbox.
        </Text>
        <Flex maxW="500px" mx="auto">
          <Input placeholder="Enter your email" borderRightRadius="0" size="lg" />
          <Button colorScheme="blackAlpha" borderLeftRadius="0" size="lg">
            Subscribe
          </Button>
        </Flex>
      </Box>

      {/* Footer Sections */}
      <Flex
        direction={{ base: "column", md: "row" }}
        justify="space-between"
        align="flex-start"
        maxW="1200px"
        mx="auto"
        columnGap={{ base: 0, md: 20 }}  // generous horizontal spacing
        rowGap={16}                      // generous vertical spacing on mobile
        mb={16}
      >
        {/* Left section: Logo and description */}
        <Box flex="1" w="100%" maxW="400px">
          <Text fontSize="2xl" fontWeight="bold" mb={4}>
            FOREVER<span style={{ color: "#d53f8c" }}>.</span>
          </Text>
          <Text color="gray.600" fontSize="sm" lineHeight="tall">
            At FOREVER, we believe in timeless fashion and sustainable choices. Our mission is to bring premium quality clothing and accessories that stand the test of time. Established in 1990, FOREVER has grown into a global brand loved by millions.
          </Text>
        </Box>

        {/* Middle section: Company links */}
        <Box flex="1" w="100%" minW="180px">
          <Text fontSize="lg" fontWeight="bold" mb={4}>
            COMPANY
          </Text>
          <VStack align="flex-start" spacing={4}>
            <Link href="#">Home</Link>
            <Link href="#">About us</Link>
            <Link href="#">Delivery</Link>
            <Link href="#">Privacy policy</Link>
          </VStack>
        </Box>

        {/* Right section: Get in touch */}
        <Box flex="1" w="100%" minW="220px">
          <Text fontSize="lg" fontWeight="bold" mb={4}>
            GET IN TOUCH
          </Text>
          <VStack align="flex-start" spacing={4}>
            <Text>+91 98765 43210</Text>
            <Link href="mailto:contact@foreveryou.com">contact@foreveryou.com</Link>
          </VStack>
        </Box>
      </Flex>

      {/* Bottom copyright */}
      <HStack justify="center" mt={8}>
        <Text fontSize="sm" color="gray.500" textAlign="center">
          Copyright 2025 &copy; forever.com All Rights Reserved.
        </Text>
      </HStack>
    </Box>
  );
};

export default Footer;
