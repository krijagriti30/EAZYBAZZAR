import { Box, Heading, Text } from "@chakra-ui/react";
import { useAuth } from "../context/AuthContext";

const ProfileDetails = () => {
  const { user } = useAuth();

  return (
    <Box>
      <Heading size="md" mb={4}>Profile Details</Heading>
      <Text>Email: {user?.email}</Text>
      <Text>User ID: {user?.uid}</Text>
    </Box>
  );
};

export default ProfileDetails;
