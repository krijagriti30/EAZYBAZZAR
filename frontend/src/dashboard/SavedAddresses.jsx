import { Box, Heading, Text, Button } from "@chakra-ui/react";

const SavedAddresses = () => {
  return (
    <Box>
      <Heading size="md" mb={4}>Saved Addresses</Heading>
      <Text>No address saved yet.</Text>
      <Button mt={3}>Add New Address</Button>
    </Box>
  );
};

export default SavedAddresses;
