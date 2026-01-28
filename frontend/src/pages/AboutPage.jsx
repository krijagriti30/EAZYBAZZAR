// src/pages/About.jsx
import React from "react";
import {
  Box,
  Flex,
  Heading,
  Image,
  Text,
  Divider,
  Stack,
  Highlight,
  SimpleGrid,
} from "@chakra-ui/react";
import AboutImg from "../assets/frontend_assets/aboutus.jpg";

const About = () => {
  return (
    <Box px={{ base: 6, md: 24 }} py={{ base: 10, md: 16 }}>
      {/* ===== ABOUT US HEADER ===== */}
      <Stack spacing={2} textAlign="center" mb={14}>
        <Heading fontSize={{ base: "xl", md: "2xl" }} fontWeight="semibold">
          ABOUT{" "}
          <Highlight query="US" styles={{ fontWeight: "bold" }}>
            US
          </Highlight>
        </Heading>
        <Divider borderColor="black" w="60px" mx="auto" borderWidth="2px" />
      </Stack>

      {/* ===== IMAGE + CONTENT ===== */}
      <Flex
        direction={{ base: "column", md: "row" }}
        gap={{ base: 10, md: 14 }}
        align="stretch"
        mb={20}
      >
        {/* Image */}
        <Box flex="1">
          <Image
            src={AboutImg}
            alt="EasyBazzar lifestyle products"
            borderRadius="lg"
            w="100%"
            h={{ base: "auto", md: "100%" }}
            maxH="520px"
            objectFit="cover"
          />
        </Box>

        {/* Content */}
        <Box
          flex="1"
          color="gray.700"
          fontSize="md"
          lineHeight="1.9"
          display="flex"
          flexDirection="column"
          justifyContent="center"
        >
          <Text mb={5}>
            <strong>EasyBazzar</strong> was built with a simple goal — to make
            online shopping easier, smarter, and more reliable for everyone.
            What started as a small idea has grown into a trusted e-commerce
            platform offering a wide range of carefully selected products.
          </Text>

          <Text mb={5}>
            We work closely with verified sellers and brands to ensure every
            product meets our standards of quality, value, and authenticity.
            From fashion and beauty to electronics and everyday essentials,
            EasyBazzar is designed to fit every lifestyle.
          </Text>

          <Heading as="h4" fontSize="lg" fontWeight="bold" mb={2}>
            Our Mission
          </Heading>

          <Text>
            Our mission is to provide customers with freedom of choice while
            delivering a smooth, secure, and enjoyable shopping experience.
            From browsing to doorstep delivery, EasyBazzar is committed to
            excellence at every step.
          </Text>
        </Box>
      </Flex>

      {/* ===== WHY CHOOSE US ===== */}
      <Stack spacing={2} mb={10}>
        <Heading fontSize="lg" fontWeight="semibold">
          WHY{" "}
          <Highlight query="CHOOSE US" styles={{ fontWeight: "bold" }}>
            CHOOSE US
          </Highlight>
        </Heading>
        <Divider borderColor="black" w="80px" borderWidth="2px" />
      </Stack>

      <SimpleGrid columns={{ base: 1, md: 3 }} spacing={8}>
        {[
          {
            title: "Quality You Can Trust",
            desc: "Each product on EasyBazzar is reviewed to ensure quality, durability, and value for money.",
          },
          {
            title: "Easy & Secure Shopping",
            desc: "Our user-friendly platform makes browsing, ordering, and payment smooth and hassle-free.",
          },
          {
            title: "Customer-First Support",
            desc: "We prioritize customer satisfaction with responsive support and reliable service.",
          },
        ].map((item, index) => (
          <Box
            key={index}
            p={6}
            border="1px solid"
            borderColor="gray.200"
            borderRadius="lg"
            _hover={{
              boxShadow: "lg",
              transform: "translateY(-6px)",
            }}
            transition="all 0.3s ease"
          >
            <Text fontWeight="bold" mb={3}>
              {item.title}
            </Text>
            <Text color="gray.600">{item.desc}</Text>
          </Box>
        ))}
      </SimpleGrid>
    </Box>
  );
};

export default About;
