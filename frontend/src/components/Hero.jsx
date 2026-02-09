import { Box, Text, Heading, Button, Container } from "@chakra-ui/react";
import Slider from "react-slick";

// Import images from local folder
import img1 from "../assets/frontend_assets/home_img1.avif";
import img2 from "../assets/frontend_assets/home_img2.avif";
import img3 from "../assets/frontend_assets/home_img3.avif";
import img4 from "../assets/frontend_assets/home_img4.avif";
import img5 from "../assets/frontend_assets/home_img5.avif";

const images = [img1, img2, img3, img4, img5];

const Hero = () => {
  const settings = {      
    dots: false,           //  no navigation dot
    infinite: true,        //  tansition speed 
    speed: 400,            //  tansition speed 
    autoplay: true,        //  auto slide 
    autoplaySpeed: 2000,   //  every 2 s
    slidesToShow: 1,       //  1 image at a time 
    slidesToScroll: 1,     //
    arrows: false,         //  no arrows
    fade: true,            //smooth fade instead of slide 
  };

  return (
    <Box position="relative" h={{ base: "70vh", md: "60vh" }} overflow="hidden">
      {/* Background Slider */}
      <Box position="absolute" top="0" left="0" w="100%" h="100%" zIndex="0">
        <Slider {...settings}>
          {images.map((src, index) => (    //loop through images         // each image become full screen 
            <Box
              key={index}
              bgImage={`url(${src})`}
              bgSize="cover"
              bgPosition="center"
              bgRepeat="no-repeat"
              w="100%"
              h={{ base: "70vh", md: "60vh" }}
            />
          ))}
        </Slider>
      </Box>

      {/* Dark Overlay */}   
      <Box
        position="absolute"
        top="0"
        left="0"
        w="100%"
        h="100%"
        bg="blackAlpha.600"
        zIndex="1"
      />

      {/* Text Area */}
      <Container
        position="relative"
        zIndex="2"
        maxW="container.xl"
        h="100%"
        display="flex"
        alignItems="center"
      >
        <Box color="white" maxW="600px" textAlign={{ base: "center", md: "left" }}>
          

          <Heading
            fontSize={{ base: "2.5xl", md: "4xl" }}
            fontWeight="extrabold"
            lineHeight="short"
            mb={4}
          >
            Discover the
            <Text as="span" color="pink.400">
              Latest Arrivals
            </Text>
          </Heading>

          <Text
            fontSize={{ base: "md", md: "lg" }}
            mb={6}
            color="gray.200"
            fontFamily="'Poppins', sans-serif"
          >
            Upgrade your wardrobe with fresh, trendy, and exclusive styles you
            won’t find anywhere else.
          </Text>

          <Button             // call to action button
            size="lg"
            colorScheme="pink"
            px={10}
            borderRadius="full"
            fontWeight="bold"
            _hover={{ bg: "pink.600", transform: "scale(1.05)" }}
            transition="all 0.3s ease"
          >
            Shop Now
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default Hero;
