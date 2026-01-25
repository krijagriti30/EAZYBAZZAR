// src/pages/LoginPage.jsx
import React, { useState } from "react";
import {
  Box,
  Heading,
  Input,
  FormControl,
  Button,
  Text,
  Flex,
  Link as ChakraLink,
} from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = async (e) => {
    e?.preventDefault();
    setError("");
    setLoading(true);
    try {
      await login(email, password);
      navigate("/");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      maxW="420px" // Matches reference page width
      mx="auto"
      mt="120px"
      textAlign="center"
      fontFamily="'Playfair Display', serif"
    >
      <Heading
        mb={10}
        fontWeight="400"
        fontSize="36px" // Bigger like the reference
        letterSpacing="0"
      >
        Login —
      </Heading>

      {error && (
        <Text color="red.500" mb={4} fontSize="sm">
          {error}
        </Text>
      )}

      <form onSubmit={handleLogin}>
        <FormControl mb={4}>
          <Input
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            size="lg"
            borderRadius="0"
            border="1px solid black"
            fontSize="16px"
            _placeholder={{ color: "gray.400" }}
            _focus={{ borderColor: "black", boxShadow: "none" }}
          />
        </FormControl>

        <FormControl mb={2}>
          <Input
            placeholder="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            size="lg"
            borderRadius="0"
            border="1px solid black"
            fontSize="16px"
            _placeholder={{ color: "gray.400" }}
            _focus={{ borderColor: "black", boxShadow: "none" }}
          />
        </FormControl>

        <Flex justifyContent="space-between" mb={6} fontSize="14px">
          <ChakraLink as={Link} to="/forgot-password">
            Forgot your password?
          </ChakraLink>
          <ChakraLink as={Link} to="/signup">
            Create account
          </ChakraLink>
        </Flex>

        <Button
          type="submit"
          bg="black"
          color="white"
          fontWeight="400"
          _hover={{ bg: "blackAlpha.800" }}
          borderRadius="0"
          px={8}
          py={6}
          fontSize="16px"
          isLoading={loading}
        >
          Sign In
        </Button>
      </form>
    </Box>
  );
}
