import { Box, Button, Container, Heading, Text, VStack } from "@chakra-ui/react";
import React from "react";
import { RiCheckboxCircleFill } from "react-icons/ri";
import { Link } from "react-router-dom";

const PaymentSuccess = () => {
  return (
    <Container
     h={"90vh"} p={16}>
      <Heading textAlign={"center"} mb={8}>
        You Have Pro Pack
      </Heading>

      <VStack
        boxShadow={"2xl"}
        alignItems={"center"}
        borderRadius={"lg"}
        pb={"16"}
        bg={'blue.800'}
      >
        <Box
          w={"full"}
          bg={"blue.900"}
          p={4}
          css={{ borderRadius: "8px 8px 0 0" }}
        >
          <Text>Payment Success</Text>
        </Box>

        <Box p={4}>
          <VStack textAlign={"center"} px={8} mt={4} spacing={8}>
            <Text>
              Congratulations you're a pro member. You have access to premium
              content
            </Text>
            <Heading size={'4xl'}>
                <RiCheckboxCircleFill />
            </Heading>
          </VStack>
        </Box>

        <Link to={"/profile"}>
            <Button colorScheme="blue">Go To Profile</Button>
        </Link>

        <Heading size={'xs'}>Reference: 123df5edd7845d</Heading>
      </VStack>
    </Container>
  );
};

export default PaymentSuccess;
