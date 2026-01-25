import {
  Box,
  Heading,
  Text,
  SimpleGrid,
  Image,
  Button,
  Badge,
} from "@chakra-ui/react";
import birthday from "../assets/giftcards/birthday.jpg";
import wedding from "../assets/giftcards/wedding.jpg";
import festival from "../assets/giftcards/festival.jpg";
import thankyou from "../assets/giftcards/thankyou.jpg";
import anniversary from "../assets/giftcards/anniversary.jpg";
import love from "../assets/giftcards/love.jpg";
import congrats from "../assets/giftcards/congrats.jpg";
import special from "../assets/giftcards/special.jpg";


const giftCards = [
  { title: "Birthday Gift Card", price: "₹500 – ₹5000", img: birthday },
  { title: "Wedding Gift Card", price: "₹1000 – ₹10000", img: wedding },
  { title: "Festival Gift Card", price: "₹500 – ₹8000", img: festival },
  { title: "Thank You Card", price: "₹300 – ₹3000", img: thankyou },
  { title: "Anniversary Card", price: "₹1000 – ₹7000", img: anniversary },
  { title: "Love Gift Card", price: "₹500 – ₹6000", img: love },
  { title: "Congratulations Card", price: "₹800 – ₹9000", img: congrats },
  { title: "Special Moments", price: "₹1000 – ₹12000", img: special },
];


const EGiftCards = () => {
  return (
    <Box p={6}>
      {/* HEADER */}
      <Heading size="lg" mb={2} color="black">
        E-Gift Cards
      </Heading>
      <Text color="gray.600" mb={4}>
        Choose from our curated digital gift cards 💝
      </Text>

      {/* COMPACT GRID */}
      <SimpleGrid columns={{ base: 2, md: 3, lg: 4 }} spacing={5}>
        {giftCards.map((card, index) => (
          <Box
            key={index}
            bg="white"
            borderRadius="lg"
            boxShadow="sm"
            overflow="hidden"
            _hover={{
              transform: "translateY(-4px)",
              boxShadow: "md",
            }}
            transition="0.25s ease"
          >
            {/* SMALLER IMAGE */}
            <Image
              src={card.img}
              alt={card.title}
              h="120px"
              w="100%"
              objectFit="cover"
            />

            {/* CONTENT */}
            <Box p={3}>
              <Badge colorScheme="pink" fontSize="10px" mb={1}>
                Gift
              </Badge>

              <Text fontWeight="600" fontSize="sm" noOfLines={1}>
                {card.title}
              </Text>

              <Text fontSize="xs" color="gray.500" mb={2}>
                {card.price}
              </Text>

              <Button
                size="sm"
                w="full"
                bg="pink.500"
                color="white"
                _hover={{ bg: "pink.600" }}
              >
                Buy
              </Button>
            </Box>
          </Box>
        ))}
      </SimpleGrid>
    </Box>
  );
};

export default EGiftCards;
