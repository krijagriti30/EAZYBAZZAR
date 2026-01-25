import {
  Box,
  Text,
  Avatar,
  VStack,
  HStack,
  SimpleGrid,
  Divider,
  Icon,
} from "@chakra-ui/react";
import {
  FiShoppingBag,
  FiHeart,
  FiHelpCircle,
  FiMapPin,
  FiUser,
  FiCreditCard,
  FiGift,
  FiRefreshCw,
} from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProfilePage = () => {
  const navigate = useNavigate();
  const { user } = useAuth(); // ✅ Firebase user

  const MenuItem = ({ icon, label, subLabel, path }) => (
    <HStack
      py={3}
      px={3}
      justify="space-between"
      cursor="pointer"
      _hover={{ bg: "gray.50" }}
      onClick={() => navigate(path)}
    >
      <HStack spacing={3}>
        <Icon as={icon} boxSize={5} color="gray.600" />
        <Box>
          <Text fontWeight="500">{label}</Text>
          {subLabel && (
            <Text fontSize="sm" color="gray.500">
              {subLabel}
            </Text>
          )}
        </Box>
      </HStack>
      <Text color="gray.400">›</Text>
    </HStack>
  );

  return (
    <Box maxW="700px" mx="auto" p={4}>
      {/* USER INFO */}
      <HStack spacing={4} mb={6}>
        <Avatar size="lg" name={user?.displayName || user?.email} />
        <Box>
          <Text fontSize="lg" fontWeight="600">
            {user?.displayName || "User"}
          </Text>
          <Text color="gray.500">
            {user?.phoneNumber || user?.email}
          </Text>
        </Box>
      </HStack>

      {/* QUICK ACTIONS */}
      <SimpleGrid columns={3} spacing={4} mb={6}>
        <Box
          border="1px solid"
          borderColor="gray.200"
          borderRadius="md"
          p={4}
          textAlign="center"
          cursor="pointer"
          _hover={{ bg: "gray.50" }}
          onClick={() => navigate("/dashboard/orders")}
        >
          <Icon as={FiShoppingBag} boxSize={6} mb={2} />
          <Text fontSize="sm">Your Orders</Text>
        </Box>

        <Box
          border="1px solid"
          borderColor="gray.200"
          borderRadius="md"
          p={4}
          textAlign="center"
          cursor="pointer"
          _hover={{ bg: "gray.50" }}
          onClick={() => navigate("/dashboard/help")}
        >
          <Icon as={FiHelpCircle} boxSize={6} mb={2} />
          <Text fontSize="sm">Help</Text>
        </Box>

        <Box
          border="1px solid"
          borderColor="gray.200"
          borderRadius="md"
          p={4}
          textAlign="center"
          cursor="pointer"
          _hover={{ bg: "gray.50" }}
        >
          <Icon as={FiHeart} boxSize={6} mb={2} />
          <Text fontSize="sm">Wishlist</Text>
        </Box>
      </SimpleGrid>

      {/* MENU LIST */}
      <VStack
        spacing={0}
        border="1px solid"
        borderColor="gray.200"
        borderRadius="md"
        align="stretch"
      >
        <MenuItem
          icon={FiRefreshCw}
          label="Your Refunds"
          path="/dashboard/orders"
        />
        <Divider />

        <MenuItem
          icon={FiGift}
          label="E-Gift Cards"
          path="/dashboard/gift-cards"
        />
        <Divider />

        <MenuItem
          icon={FiMapPin}
          label="Saved Addresses"
          subLabel="Manage addresses"
          path="/dashboard/addresses"
        />
        <Divider />

        <MenuItem
          icon={FiUser}
          label="Profile Details"
          path="/dashboard/profile-details"
        />
        <Divider />

        <MenuItem
          icon={FiCreditCard}
          label="Payment Management"
          path="/dashboard/payments"
        />
      </VStack>
    </Box>
  );
};

export default ProfilePage;
