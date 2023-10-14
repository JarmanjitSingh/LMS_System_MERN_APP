import { Button, Container, VStack } from "@chakra-ui/react";
import Lottie from "lottie-react";
import React from "react";
import animationData from "../../assets/docs/paymentfail.json";
import { Link } from "react-router-dom";
import { BsQuestionCircleFill } from "react-icons/bs";

const PaymentFail = () => {
  return (
    <Container py={16} h={"85vh"}>
      <VStack>
        <Lottie animationData={animationData} style={{ height: "400px" }} />
        <Link to={"/subscribe"}>
          <Button mt={8} colorScheme="blue" variant={"outline"}>
            Try Again{" "}
            <BsQuestionCircleFill size={24} style={{ marginLeft: "10px" }} />
          </Button>
        </Link>
      </VStack>
    </Container>
  );
};

export default PaymentFail;
