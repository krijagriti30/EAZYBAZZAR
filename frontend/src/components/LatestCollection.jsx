import { Box, Image, SimpleGrid, Text, Stack, Heading } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { products } from "../assets/frontend_assets/assets.js";

const LatestCollection = () => {
  // Pick products marked as latest
  const latestProducts = products.filter((item) => item.latest === true);

  return (
    <Box py={16} px={{ base: 4, md: 12 }} bg="white">
      <Stack align="center" spacing={4} mb={10}>
        <Heading
          fontSize={{ base: "2xl", md: "3xl" }}
          textTransform="uppercase"
          fontWeight="medium"
          letterSpacing="wide"
        >
          Latest{" "}
          <Text as="span" borderBottom="2px solid black">
            Collections
          </Text>
        </Heading>
      </Stack>

      <Text
        textAlign="center"
        color="gray.500"
        mb={8}
        fontFamily="'Poppins', sans-serif"
      >
        Discover our newest arrivals—perfect styles for every season and mood.
      </Text>

      <SimpleGrid columns={[2, 2, 4]} spacing={6}>
        {latestProducts.map((product, index) => (
          <Link
            key={product._id || index}
            to={`/product-details/${product._id}`}
            state={{ product }}
            style={{ textDecoration: "none" }}
          >
            <Box
              borderRadius="md"
              overflow="hidden"
              boxShadow="md"
              transition="transform 0.3s"
              _hover={{ transform: "scale(1.03)", cursor: "pointer" }}
              bg="white"
              textAlign="center"
            >
              <Box
                height="200px"
                display="flex"
                alignItems="center"
                justifyContent="center"
                overflow="hidden"
              >
                <Image
                  src={product.image}
                  alt={product.name}
                  objectFit="cover"
                  width="100%"
                  height="100%"
                  transition="transform 0.4s ease"
                  _hover={{ transform: "scale(1.1)" }}
                />
              </Box>
              <Box p={4}>
                <Text fontFamily="'Poppins', sans-serif">{product.name}</Text>
                <Text fontWeight="bold" fontFamily="'Poppins', sans-serif">
                  ${product.price}
                </Text>
              </Box>
            </Box>
          </Link>
        ))}
      </SimpleGrid>
    </Box>
  );
};

export default LatestCollection;
