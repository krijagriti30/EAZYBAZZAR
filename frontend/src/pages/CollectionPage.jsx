import {
  Box,
  Checkbox,
  CheckboxGroup,
  Flex,
  Heading,
  Image,
  Input,
  Select,
  SimpleGrid,
  Stack,
  Text,
  VStack,
  IconButton,
} from "@chakra-ui/react";
import { useState } from "react";
import { SearchIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";

// Import products directly from assets.js
import { products as allProducts } from "../assets/frontend_assets/assets.js";

const CollectionPage = () => {
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [sortOption, setSortOption] = useState("relevant");
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  // Filter + sort logic
  const filteredProducts = allProducts
    .filter((product) => {
      const matchCategory = selectedCategories.length
        ? selectedCategories.includes(product.category)
        : true;
      const matchType = selectedTypes.length
        ? selectedTypes.includes(product.subCategory)
        : true;
      const matchSearch = product.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      return matchCategory && matchType && matchSearch;
    })
    .sort((a, b) => {
      if (sortOption === "lowToHigh") return a.price - b.price;
      if (sortOption === "highToLow") return b.price - a.price;
      return 0;
    });

  const handleOpenDetails = (product) => {
    navigate(`/product-details/${product._id}`, { state: { product } });
  };

  return (
    <Flex direction={{ base: "column", md: "row" }} p={6} gap={6}>
      {/* Sidebar Filters */}
      <Box minW="200px">
        <Heading size="sm" mb={4} fontFamily="'Poppins', sans-serif">
          Filters
        </Heading>

        <Box mb={6}>
          <Heading size="xs" mb={2} fontFamily="'Poppins', sans-serif">
            Categories
          </Heading>
          <CheckboxGroup
            value={selectedCategories}
            onChange={setSelectedCategories}
          >
            <Stack direction="column">
              <Checkbox value="Men">Men</Checkbox>
              <Checkbox value="Women">Women</Checkbox>
              <Checkbox value="Kids">Kids</Checkbox>
            </Stack>
          </CheckboxGroup>
        </Box>

        <Box>
          <Heading size="xs" mb={2} fontFamily="'Poppins', sans-serif">
            Type
          </Heading>
          <CheckboxGroup value={selectedTypes} onChange={setSelectedTypes}>
            <Stack direction="column">
              <Checkbox value="Topwear">Topwear</Checkbox>
              <Checkbox value="Bottomwear">Bottomwear</Checkbox>
              <Checkbox value="Winterwear">Winterwear</Checkbox>
            </Stack>
          </CheckboxGroup>
        </Box>
      </Box>

      {/* Main Content */}
      <Box flex="1">
        <Flex justify="space-between" align="center" mb={4} gap={4} wrap="wrap">
          <Heading size="md" fontFamily="'Poppins', sans-serif">
            All Collections
          </Heading>

          <Flex align="center" gap={2}>
            <Input
              placeholder="Search items..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              maxW="300px"
            />
            <IconButton icon={<SearchIcon />} aria-label="Search" />
          </Flex>

          <Select
            maxW="200px"
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
          >
            <option value="relevant">Sort by: Relevant</option>
            <option value="lowToHigh">Price: Low to High</option>
            <option value="highToLow">Price: High to Low</option>
          </Select>
        </Flex>

        <SimpleGrid columns={{ base: 2, md: 3, lg: 4 }} spacing={6}>
          {filteredProducts.map((product) => (
            <Box
              key={product._id}
              overflow="hidden"
              p={4}
              transition="transform 0.4s ease"
              _hover={{ transform: "scale(1.05)", cursor: "pointer" }}
              onClick={() => handleOpenDetails(product)}
            >
              <Image
                src={product.image[0]} // first image from array
                alt={product.name}
                mb={3}
                w="100%"
                h="200px"
                objectFit="cover"
              />
              <VStack align="start" spacing={1}>
                <Text fontWeight="medium">{product.name}</Text>
                <Text fontWeight="light">${product.price}</Text>
              </VStack>
            </Box>
          ))}
        </SimpleGrid>
      </Box>
    </Flex>
  );
};

export default CollectionPage;
