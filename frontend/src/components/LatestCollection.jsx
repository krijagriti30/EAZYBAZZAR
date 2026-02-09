import { Box, Image, SimpleGrid, Text, Stack, Heading } from "@chakra-ui/react";
import { Link } from "react-router-dom";     // used for page navigation (clicking a product -> goes to product details page)
import { products } from "../assets/frontend_assets/assets.js";

const LatestCollection = () => {
  // Pick products marked as latest
  const latestProducts = products.filter((item) => item.latest === true);    //loops through all products , keeps only those marked as latest , creates a new array 
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
        {latestProducts.map ((product, index) => (     // loops through latestProducts array , creates one card per products , product -> current product object , index -> fallback key 
          <Link                                        //clicking card navigates to product details page 
            key={product._id || index}                // unique key for react 
            to={`/product-details/${product._id}`}    // route path (dynamic)
            state={{ product }}                       // passes product data to next page 
            style={{ textDecoration: "none" }}        // removes underline 
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
                display="flex"           // keeps all cards same size
                alignItems="center"
                justifyContent="center"
                overflow="hidden"
              >
                <Image
                  src={product.image}    // product image url
                  alt={product.name}
                  objectFit="cover"       // crop image nicely
                  width="100%"            // full width 
                  height="100%"          // full height
                  transition="transform 0.4s ease"      // smooth zoom
                  _hover={{ transform: "scale(1.1)" }}   // image zoom on hover
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
