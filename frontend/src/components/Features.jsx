import { Box, SimpleGrid, Text, VStack } from "@chakra-ui/react";
import { FaSync, FaHeadset } from "react-icons/fa";
import { MdCheckCircle } from "react-icons/md";

const features = [
  { icon: <FaSync size="30" />, title: "Easy Exchange Policy", desc: "We offer hassle free exchange policy" },
  { icon: <MdCheckCircle size="30" />, title: "7 Days Return Policy", desc: "We provide 7 days free return policy" },
  { icon: <FaHeadset size="30" />, title: "Best customer support", desc: "We provide 24/7 customer support" }
];

const Features = () => {
  return (
    <SimpleGrid columns={3} spacing={10} py={10} textAlign="center">
      {features.map((f, i) => (
        <VStack key={i} spacing={3}>
          {f.icon}
          <Text fontWeight="bold">{f.title}</Text>
          <Text color="gray.500">{f.desc}</Text>
        </VStack>
      ))}
    </SimpleGrid>
  );
};

export default Features;
