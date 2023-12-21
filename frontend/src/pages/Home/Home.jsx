import { Box, Button, Container, Heading, Stack, Text } from "@chakra-ui/react";
import React from "react";
import animationData from "../../assets/docs/animation_lnko5v1n.json";
import Lottie from "lottie-react";
import { useNavigate } from "react-router-dom";

const Home = () => {

  const navigate = useNavigate();

  return (
    <>
      <Container
        maxW={"container.xl"}
        minH={"95vh"}
        display={"flex"}
        flexDirection={["column", "column", "row", "row"]}
      >
        <Box
          borderRight={["none", "none", "none", "2px solid #2b6cb0"]}
          h={"full"}
          w={"full"}
          display={"flex"}
          flexDirection={"column"}
          alignItems={["center", "self-start"]}
          justifyContent={"center"}
          px={[10, 10, 10, 0]}
        >
          <Box py={10} w={"full"}>
            <Heading size={["xl", "3xl"]} letterSpacing={"4px"}>
              Empower <span style={{ color: "#00a3ff" }}>Your</span>
            </Heading>
            <Heading size={["xl", "3xl"]} letterSpacing={"4px"} mt={4}>
              Learning Journey
            </Heading>
          </Box>

          <Stack w={"100%"} alignItems={"self-start"}>
            <img
              src="https://s3.amazonaws.com/cdn.codeblu.io/website/Landing_Img/lineimg.png"
              width={"60%"}
            />
          </Stack>

          <Text
            fontWeight={"bold"}
            fontSize={"1.5rem"}
            letterSpacing={"1px"}
            py={14}
          >
            Upskill, Engage And Develop Your Team With All In One Learning
            Management Tool
          </Text>

          <img src="https://s3.amazonaws.com/cdn.codeblu.io/website/Landing_Img/landingpage_mobile_saly.png" />
        </Box>
        <Box
          py={10}
          h={"full"}
          w={"full"}
          display={"flex"}
          flexDirection={"column"}
          alignItems={"center"}
          justifyContent={"space-evenly"}
        >
          <Heading textAlign={"center"}>Get Your Course Right Now</Heading>
          <Box h={["200px", "300px"]} w={["200px", "300px"]}>
            <Lottie
              animationData={animationData}
              style={{ height: "100%", width: "100%", transform: "scale(1.5)" }}
            />
          </Box>

          <Text w={"80%"} fontSize={"0.8rem"} textAlign={"justify"}>
            We're passionate about helping you achieve your learning goals.
            Whether you're looking to enhance your skills, explore new topics,
            or advance your career, our diverse range of courses has something
            for everyone.
          </Text>

   
          <Button onClick={()=>{
            navigate("/courses")
          }} colorScheme="blue" width={"50%"} mt={12}>
            Get Started
          </Button>
    
        </Box>
      </Container>
    </>
  );
};

export default Home;
