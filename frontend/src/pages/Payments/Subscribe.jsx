import {
  Box,
  Button,
  Container,
  Heading,
  Text,
  VStack,
} from "@chakra-ui/react";
import React from "react";

const Subscribe = () => {
  return (
    <Container minH={"90vh"} p={16}>
      <Heading my={8} textAlign={"center"} letterSpacing={'2px'}> 
        Subscription
      </Heading>

      <VStack
        boxShadow={"lg"}
        alignItems={"stretch"}
        borderRadius={"lg"}
        spacing={0}
      >
        <Box bg={"blue.900"} p={4} css={{ borderRadius: "8px 8px 0 0" }}>
          <Text>Pro Pack - ₹499</Text>
        </Box>
        <Box p={4} bg={"blue.800"}>
          <VStack textAlign={"center"} px={8} mt={4} spacing={8}>
            <Text>Join Pro Pack and get access to all content.</Text>
            <Heading size={"md"}>₹499 Only</Heading>
          </VStack>

          <Button w={"full"} my={8} colorScheme="blue">
            Buy Now
          </Button>
        </Box>

        <Box bg={"blue.900"} p={4} css={{ borderRadius: "0 0 8px 8px" }} textAlign={'center'}>
          <Heading size={"sm"} textTransform={"uppercase"}>
            100% refund at cancellation
          </Heading>
          <Text size={"xs"}>Terms & Conditions Apply</Text>
        </Box>
      </VStack>
    </Container>
  );
};

export default Subscribe;
