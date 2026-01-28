import {
  Box,
  Text,
  SimpleGrid,
  Image,
  Button,
  Spinner,
  Flex,
  IconButton,
} from "@chakra-ui/react";
import { CloseIcon } from "@chakra-ui/icons";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../firebaseConfig";
import { useAuth } from "../context/AuthContext";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useWishlist } from "../context/WishlistContext";
import { useCart } from "../context/CartContext";

const Wishlist = () => {
  const { user } = useAuth();
  const { removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  /* ================= LOAD WISHLIST ================= */
  useEffect(() => {
    if (!user?.uid) {
      setItems([]);
      setLoading(false);
      return;
    }

    const wishlistRef = collection(db, "users", user.uid, "wishlist");

    const unsub = onSnapshot(
      wishlistRef,
      (snapshot) => {
        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setItems(data);
        setLoading(false);
      },
      () => setLoading(false)
    );

    return () => unsub();
  }, [user]);

  /* ================= MOVE TO BAG ================= */
  const handleMoveToBag = (item) => {
    addToCart({
      ...item,
      quantity: 1,
    });

    removeFromWishlist(item.id);
  };

  /* ================= REMOVE ================= */
  const handleRemove = (id) => {
    removeFromWishlist(id);
  };

  /* ================= NOT LOGGED IN ================= */
  if (!user?.uid) {
    return (
      <Flex direction="column" align="center" mt={20}>
        <Text fontSize="2xl" mb={3}>
          Please login to view your wishlist ❤️
        </Text>
        <Button colorScheme="pink" onClick={() => navigate("/login")}>
          Login
        </Button>
      </Flex>
    );
  }

  /* ================= LOADING ================= */
  if (loading) {
    return (
      <Flex justify="center" mt={20}>
        <Spinner size="xl" color="pink.500" />
      </Flex>
    );
  }

  /* ================= EMPTY ================= */
  if (items.length === 0) {
    return (
      <Flex direction="column" align="center" mt={20}>
        <Text fontSize="2xl" mb={4}>
          Your wishlist is empty 💔
        </Text>
        <Button
          colorScheme="pink"
          variant="outline"
          onClick={() => navigate("/collection")}
        >
          Continue Shopping
        </Button>
      </Flex>
    );
  }

  /* ================= UI ================= */
  return (
    <Box px={{ base: 4, md: 10 }} py={8}>
      <Text fontSize="2xl" mb={6} fontWeight="bold">
        My Wishlist {items.length} items
      </Text>

      <SimpleGrid columns={[1, 2, 3, 4]} spacing={20}>
        {items.map((item) => (
          <Box
            key={item.id}
            borderWidth="1px"
            borderRadius="md"
            overflow="hidden"
            position="relative"
          >
            {/* ❌ CROSS BUTTON */}
            <IconButton
              icon={<CloseIcon />}
              size="sm"
              position="absolute"
              top="6px"
              right="6px"
              bg="white"
              borderRadius="full"
              onClick={() => handleRemove(item.id)}
            />

            {/* IMAGE */}
            <Image
              src={Array.isArray(item.image) ? item.image[0] : item.image}
              alt={item.title}
              cursor="pointer"
              onClick={() =>
                navigate(`/product/${item.productId}`, {
                  state: { product: item },
                })
              }
            />

            {/* DETAILS */}
            <Box p={4}>
              <Text fontWeight="semibold" isTruncated>
                {item.title}
              </Text>

              <Flex gap={2} align="center" mt={1}>
                <Text fontWeight="bold">₹{item.price}</Text>
                {item.originalPrice && (
                  <Text as="s" color="gray.500" fontSize="sm">
                    ₹{item.originalPrice}
                  </Text>
                )}
              </Flex>
            </Box>

            {/* MOVE TO BAG */}
            <Button
              w="100%"
              borderTopRadius="0"
              colorScheme="pink"
              variant="ghost"
              fontWeight="bold"
              onClick={() => handleMoveToBag(item)}
            >
              MOVE TO BAG
            </Button>
          </Box>
        ))}
      </SimpleGrid>
    </Box>
  );
};

export default Wishlist;
