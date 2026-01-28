import React from "react";
import {
  Box,
  Heading,
  Text,
  Input,
  Textarea,
  Button,
  Stack,
  Divider,
} from "@chakra-ui/react";

const ContactPage = () => {
  return (
    <Box
      minH="80vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
      bg="pink.50"
      px={4}
    >
      {/* Contact Form Card */}
      <Box
        bg="white"
        p={{ base: 6, md: 10 }}
        borderRadius="2xl"
        boxShadow="xl"
        maxW="450px"
        w="100%"
      >
        {/* Heading */}
        <Heading textAlign="center" size="lg" mb={2}>
          Contact{" "}
          <Text as="span" color="pink.500">
            Us
          </Text>
        </Heading>

        <Text textAlign="center" color="gray.500" mb={6}>
          We’d love to hear from you 💗
        </Text>

        <Divider mb={6} borderColor="pink.300" />

        {/* Form */}
        <Stack spacing={4}>
          <Input
            placeholder="Your Name"
            focusBorderColor="pink.400"
          />
          <Input
            type="email"
            placeholder="Your Email"
            focusBorderColor="pink.400"
          />
          <Textarea
            placeholder="Your Message"
            rows={4}
            focusBorderColor="pink.400"
          />

          <Button
            bg="pink.500"
            color="white"
            size="lg"
            _hover={{ bg: "pink.600" }}
          >
            Send Message
          </Button>
        </Stack>

        {/* Support Email */}
        <Text
          mt={6}
          fontSize="sm"
          textAlign="center"
          color="gray.500"
        >
          💌 support@easybazaar.com
        </Text>
      </Box>
    </Box>
  );
};

export default ContactPage;
