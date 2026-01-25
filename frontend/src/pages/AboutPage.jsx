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
import AboutImg from "../assets/frontend_assets/About_img.jpg";

const About = () => {
  return (
    <Box px={{ base: 6, md: 20 }} py={10} fontFamily="Arial, sans-serif">
      {/* ======= ABOUT US ======= */}
      <Stack spacing={1} textAlign="center" mb={10}>
        <Heading as="h2" size="lg" fontWeight="semibold">
          ABOUT{" "}
          <Highlight query="US" styles={{ color: "black", fontWeight: "bold" }}>
            US
          </Highlight>
        </Heading>
        <Divider borderColor="black" w="60px" mx="auto" borderWidth="1.5px" />
      </Stack>

      <Flex
        direction={{ base: "column", md: "row" }}
        align="center"
        gap={10}
        mb={20}
      >
        {/* Image */}
        <Box flex="1" display="flex" justifyContent="center">
          <Image
            src={AboutImg}
            alt="About Us"
            borderRadius="md"
            maxW="500px"
            w="100%"
            objectFit="cover"
          />
        </Box>

        {/* Text */}
        <Box flex="1" color="gray.700" fontSize="md" lineHeight="tall">
          <Text mb={5}>
            Forever started with a simple vision: to make shopping more
            intuitive, enjoyable, and accessible for everyone. What began as an
            idea to connect customers with a variety of products has evolved
            into a trusted platform that offers a carefully chosen selection
            across multiple categories.
          </Text>

          <Text mb={5}>
            Over the years, we’ve built partnerships with reliable brands and
            suppliers, ensuring that each item in our store meets our standards
            for quality and value. From fashion and beauty to electronics and
            home essentials, our collection is designed to meet the needs of
            every lifestyle.
          </Text>

          <Heading as="h4" size="md" fontWeight="bold" mb={2}>
            Our Mission
          </Heading>

          <Text>
            Our mission is to give customers freedom of choice while making the
            shopping process effortless and trustworthy. From browsing to
            delivery, we’re committed to providing a smooth, reliable experience
            that goes beyond expectations.
          </Text>
        </Box>
      </Flex>

      {/* ======= WHY CHOOSE US ======= */}
      <Stack spacing={1} mb={8}>
        <Heading as="h3" size="md" fontWeight="semibold">
          WHY{" "}
          <Highlight
            query="CHOOSE US"
            styles={{ color: "black", fontWeight: "bold" }}
          >
            CHOOSE US
          </Highlight>
        </Heading>
        <Divider borderColor="black" w="80px" borderWidth="1.5px" />
      </Stack>

      <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6} mb={20}>
        {[
          {
            title: "Quality Assurance:",
            desc: "Every product is handpicked and checked to ensure it meets our strict quality benchmarks.",
          },
          {
            title: "Convenience:",
            desc: "With our easy-to-use interface and streamlined ordering system, shopping is stress-free and simple.",
          },
          {
            title: "Exceptional Customer Service:",
            desc: "Our dedicated team is always ready to help, ensuring your satisfaction at every step of the journey.",
          },
        ].map((item, index) => (
          <Box
            key={index}
            p={6}
            border="1px solid"
            borderColor="gray.200"
            borderRadius="md"
            transition="all 0.3s ease"
            _hover={{
              transform: "translateY(-5px)",
              boxShadow: "lg",
              borderColor: "blackAlpha.300",
            }}
          >
            <Text fontWeight="bold" mb={2}>
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
