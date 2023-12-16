import {
  Box,
  Button,
  Container,
  Heading,
  Text,
  VStack,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { server } from "../../main";
import { buySubscription } from "../../reduxToolkit/api_functions/subscription";
import toast from "react-hot-toast";
import { clearError } from "../../reduxToolkit/slices/subscriptionSlice";
import { clearError as clearCourseError } from "../../reduxToolkit/slices/courseSlice";

const Subscribe = ({user}) => {
  const dispatch = useDispatch();
  const [key, setKey] = useState("");

  const { loading, error, subscriptionId } = useSelector((state) => state.subscription);
  const {  error: courseError  } = useSelector((state) => state.course);

  const handleSubscription = async () => {
    const { data } = await axios.get(`${server}/razorpaykey`);
    setKey(data.key);

    buySubscription(dispatch);
  };

  useEffect(()=>{
    if(error){
      toast.error(error)
      dispatch(clearError())
    }
    if(courseError){
      toast.error(courseError)
      dispatch(clearCourseError())
    }

    if(subscriptionId){
      //before this please add script in the index.html from razorpay docs of node js and build integration from callback function

      const openPopUp = ()=>{
        const options = {
          key,
          name: "codeBlu",
          description: "Get access to all premium content.",
          image: "https://s3.amazonaws.com/cdn.codeblu.io/website/img_footer/footerlogo.svg",
          subscription_id: subscriptionId,
          callback_url: `${server}/paymentverification`,
          prefill: {
            name: user.name,
            email: user.email,
            contact: ""
          },
          notes: {
            address: "codeBlu private limited"
          },
          theme: "#3399cc"

        }

        const razor = new window.Razorpay(options);
        razor.open();
      }
      openPopUp()
    }
  }, [dispatch, error, user.name, user.email, key, subscriptionId, courseError])


  return (
    <Container minH={"90vh"} p={16}>
      <Heading my={8} textAlign={"center"} letterSpacing={"2px"}>
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

          <Button
            w={"full"}
            my={8}
            colorScheme="blue"
            onClick={handleSubscription}
            isLoading={loading}
          >
            Buy Now
          </Button>
        </Box>

        <Box
          bg={"blue.900"}
          p={4}
          css={{ borderRadius: "0 0 8px 8px" }}
          textAlign={"center"}
        >
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
