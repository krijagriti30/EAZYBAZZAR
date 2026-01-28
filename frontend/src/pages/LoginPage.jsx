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
import { db } from "../firebaseConfig";
import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // 1️⃣ Firebase Auth login
      const res = await login(email, password);
      const user = res.user;

      // 2️⃣ Firestore user document reference
      const userRef = doc(db, "users", user.uid);
      const snap = await getDoc(userRef);

      // 3️⃣ If user doc does NOT exist → create it
      if (!snap.exists()) {
        await setDoc(userRef, {
          email: user.email,
          role: "user",
          createdAt: serverTimestamp(),
        });
      }

      // 4️⃣ Get fresh user data
      const finalSnap = await getDoc(userRef);
      const userData = finalSnap.data();

      // 5️⃣ Role-based navigation (future-ready)
      if (userData?.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/");
      }

    } catch (err) {
      console.error("Login error:", err);
      setError(err.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      maxW="420px"
      mx="auto"
      mt="120px"
      textAlign="center"
      fontFamily="'Playfair Display', serif"
    >
      <Heading mb={10} fontWeight="400" fontSize="36px">
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
          <ChakraLink as={Link} to="/signup">
            Create account
          </ChakraLink>
        </Flex>

        <Button
          type="submit"
          bg="black"
          color="white"
          fontWeight="400"
          borderRadius="0"
          px={8}
          py={6}
          fontSize="16px"
          isLoading={loading}
          _hover={{ bg: "blackAlpha.800" }}
        >
          Sign In
        </Button>
      </form>
    </Box>
  );
}
