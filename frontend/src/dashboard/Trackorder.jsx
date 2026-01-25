import React, { useState } from "react";
import { Box, Input, Button, Text } from "@chakra-ui/react";

const Trackorder = () => {
  const [orderId, setOrderId] = useState("");

  const handleTrack = () => {
    alert("Tracking order: " + orderId);
  };

  return (
    <Box>
      <Text fontSize="24px" mb={4}>Track Order</Text>

      <Input
        placeholder="Enter Order ID"
        value={orderId}
        onChange={(e) => setOrderId(e.target.value)}
        mb={3}
      />

      <Button onClick={handleTrack}>Track</Button>
    </Box>
  );
};

export default Trackorder;
