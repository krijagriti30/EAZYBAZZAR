// src/pages/ContactPage.jsx
import React from "react";
import {
  Box,
  Flex,
  Heading,
  Text,
  Image,
  Divider,
  Highlight,
  Stack,
  Button,
} from "@chakra-ui/react";
import ContactImg from "../assets/frontend_assets/contact_img.png";

const ContactPage = () => {
  return (
    <Box px={{ base: 6, md: 20 }} py={10} fontFamily="Arial, sans-serif">
      {/* ======= CONTACT US ======= */}
      <Stack spacing={1} textAlign="center" mb={10}>
        <Heading as="h2" size="lg" fontWeight="semibold">
          CONTACT{" "}
          <Highlight query="US" styles={{ color: "black", fontWeight: "bold" }}>
            US
          </Highlight>
        </Heading>
        <Divider borderColor="black" w="80px" mx="auto" borderWidth="1.5px" />
      </Stack>

      <Flex
        direction={{ base: "column", md: "row" }}
        align="flex-start"
        gap={10}
      >
        {/* Image */}
        <Box flex="1">
          <Image
            src={ContactImg}
            alt="Contact Us"
            borderRadius="md"
            maxW="500px"
            w="100%"
          />
        </Box>

        {/* Contact Info */}
        <Box flex="1" color="gray.700" fontSize="md" lineHeight="tall">
          <Heading as="h4" size="md" fontWeight="bold" mb={2}>
            Our Store
          </Heading>
          <Text mb={4}>
            23 MG Road, Brigade Gateway <br />
            Bengaluru, Karnataka 560055, India
          </Text>
          <Text mb={1}>Tel: +91 98765 43210</Text>
          <Text mb={5}>Email: care@foreverindia.com</Text>

          <Heading as="h4" size="md" fontWeight="bold" mb={2}>
            Careers at Forever
          </Heading>
          <Text mb={4}>
            Join our passionate team and help us redefine online shopping in
            India.
          </Text>
          <Button
            variant="outline"
            borderColor="black"
            color="black"
            _hover={{ bg: "black", color: "white" }}
          >
            Explore Jobs
          </Button>
        </Box>
      </Flex>
    </Box>
  );
};

export default ContactPage;
