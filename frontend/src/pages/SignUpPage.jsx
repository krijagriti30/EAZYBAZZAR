// src/pages/SignUpPage.jsx
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
import { db } from "../firebaseConfig";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";

export default function SignUpPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { signup } = useAuth();

  const handleSignUp = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (!name || !email || !password) {
      setError("All fields are required");
      setLoading_pkt(false);
      return;
    }

    try {
      // 1️⃣ Firebase Auth signup
      const res = await signup(email, password);
      const user = res.user;

      // 2️⃣ Create Firestore user document
      await setDoc(doc(db, "users", user.uid), {
        name: name,
        email: user.email,
        role: "user",
        createdAt: serverTimestamp(),
      });

      console.log("User created in Firestore:", user.uid);

      alert("Signup successful");
      navigate("/login");
    } catch (err) {
      console.error("Signup error:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      maxW="420px"
      mx="auto"
      mt="100px"
      textAlign="center"
      fontFamily="'Playfair Display', serif"
    >
      <Heading
        mb={10}
        fontWeight="400"
        fontSize="28px"
        letterSpacing="0.5px"
        borderBottom="1px solid #d9d9d9"
        display="inline-block"
        pb={1}
      >
        Sign Up —
      </Heading>

      {error && (
        <Text color="red.500" mb={4} fontSize="sm">
          {error}
        </Text>
      )}

      <form onSubmit={handleSignUp}>
        <FormControl mb={4}>
          <Input
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            size="lg"
            borderRadius="0"
            border="1px solid black"
            _focus={{ borderColor: "black", boxShadow: "none" }}
          />
        </FormControl>

        <FormControl mb={4}>
          <Input
            placeholder="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            size="lg"
            borderRadius="0"
            border="1px solid black"
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
            _focus={{ borderColor: "black", boxShadow: "none" }}
          />
        </FormControl>

        <Flex justifyContent="space-between" mb={6} fontSize="14px">
          <ChakraLink as={Link} to="/forgot-password">
            Forgot your password?
          </ChakraLink>
          <ChakraLink as={Link} to="/login">
            Login Here
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
          isLoading={loading}
        >
          Sign Up
        </Button>
      </form>
    </Box>
  );
}
