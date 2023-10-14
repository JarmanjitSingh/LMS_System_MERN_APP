import { Button, Container, VStack } from "@chakra-ui/react";
import Lottie from "lottie-react";
import React from "react";
import animationData from "../assets/docs/notfoundanimation.json";
import { Link } from "react-router-dom";
import { RiArrowGoBackLine } from "react-icons/ri";

const NotFound = () => {
  return (
    <Container py={16} h={"80vh"}>
      <VStack>
            <Lottie animationData={animationData} />
            <Link to={"/"}>
            <Button colorScheme="blue" variant={'outline'}>Go To Home <RiArrowGoBackLine size={24} style={{marginLeft: "10px"}} /></Button>
            </Link>
      </VStack>
    </Container>
  );
};

export default NotFound;
