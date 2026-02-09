import { Box, Image, SimpleGrid, Text, Stack, Heading, Badge } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { products } from "../assets/frontend_assets/assets.js";

const BestSellers = () => {
  // Get latest 10 bestsellers
  const latestBestSellers = [...products]    // [...]=> copy array (dont mutate original )
    .filter(product => product.bestseller)
    .reverse()                            // newest first
    .slice(0, 10);                        // only first 10 products 
// slice()=> used to extract a portion of an array without modifying the original  

  return (
    <Box py={16} px={{ base: 4, md: 12 }} bg="white">
      <Stack align="center" spacing={4} mb={10}>
        <Heading
          fontSize={{ base: "2xl", md: "3xl" }}
          textTransform="uppercase"
          fontWeight="medium"
          letterSpacing="wide"
        >
          Best <Text as="span" borderBottom="2px solid black">Sellers</Text>
        </Heading>
      </Stack>

      <Text
        textAlign="center"
        color="gray.500"
        mb={8}
        fontFamily="'Poppins', sans-serif"
      >
        Discover our most loved styles, handpicked by thousands of happy customers.
      </Text>

      <SimpleGrid columns={[2, 3, 5]} spacing={6}>
        {latestBestSellers.map((product, index) => (
          <Link 
            key={product._id || index}
            to={`/product-details/${product._id}`} 
            state={{ product }}
            style={{ height: "100%" }}
          >
            <Box
              borderRadius="md"
              overflow="hidden"
              boxShadow="md"
              transition="transform 0.3s"
              _hover={{ transform: "scale(1.03)" }}
              bg="white"
              textAlign="center"
              position="relative"
              height="100%" 
              display="flex"
              flexDirection="column"
            >
              {/* Best Seller Tag */}
              {product.bestseller && (
                <Badge
                  position="absolute"
                  top={2}
                  left={2}
                  colorScheme="yellow"
                  fontSize="0.8em"
                  px={2}
                  py={1}
                  borderRadius="md"
                  boxShadow="sm"
                >
                  Best Seller
                </Badge>
              )}

              {/* Fixed Image Container */}
              <Box
                height="250px"
                minHeight="250px"
                display="flex"
                alignItems="center"
                justifyContent="center"
                overflow="hidden"
              >
                <Image
                  src={Array.isArray(product.image) ? product.image[0] : product.image}
                  alt={product.name}
                  objectFit="cover"
                  width="100%"
                  height="100%"
                  transition="transform 0.4s ease"
                  _hover={{ transform: "scale(1.1)" }}
                />
              </Box>

              {/* Fixed Text Container */}
              <Box p={4} flex="1" display="flex" flexDirection="column" justifyContent="space-between">
                <Text 
                  fontFamily="'Poppins', sans-serif"
                  noOfLines={2} // keeps it consistent
                  height="40px" // fixed height
                >
                  {product.name}
                </Text>
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

export default BestSellers;
