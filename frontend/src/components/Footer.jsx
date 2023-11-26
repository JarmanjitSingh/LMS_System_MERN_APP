import { Grid, HStack, Heading, Stack, Text, VStack } from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <>
      <Stack
        bg={"blue.900"}
        minH={"300px"}
        alignItems={"center"}
        justifyContent={"space-between"}
        py={4}
      >
        <Grid
         templateColumns={['1fr', '1fr 1fr', '1fr 1fr 1fr 1fr', '1fr 1fr 1fr 1fr']}
        gap={4}
          h={"full"}
          w={"full"}
        >
          <VStack
            fontSize={["md", "xl", "xl", "xl"]}
            h={"full"}
            alignItems={'center'}
            justifyContent={"space-evenly"}
          >
            <Heading>About</Heading>
            <Link to={"/"}>Our Story</Link>
            <Link to={"/"}>Privacy Policy</Link>
            <Link to={"/"}>FAQ</Link>
          </VStack>
          <VStack
             fontSize={["md", "xl", "xl", "xl"]}
            h={"full"}
            alignItems={"center"}
            justifyContent={"space-evenly"}
          >
            <Heading>Quick Links</Heading>
            <Link to={"/"}>Courses</Link>
            <Link to={"/"}>My Account</Link>
            <Link to={"/"}>Course Dashboard</Link>
          </VStack>{" "}
          <VStack
             fontSize={["md", "xl", "xl", "xl"]}
            h={"full"}
            alignItems={"center"}
            justifyContent={"space-evenly"}
          >
            <Heading>Social Links</Heading>
            <Link to={"/"}>Linkedin</Link>
            <Link to={"/"}>Github</Link>
            <Link to={"/"}>Instagram</Link>
          </VStack>{" "}
          <VStack
            fontSize={["md", "xl", "xl", "xl"]}
            h={"full"}
            alignItems={"center"}
            justifyContent={"space-evenly"}
          >
            <Heading>About</Heading>
            <Link to={"/"}>Our Story</Link>
            <Link to={"/"}>Privacy Policy</Link>
            <Link to={"/"}>FAQ</Link>
          </VStack>
        </Grid>

        <Text textAlign={'center'}>Copyright &copy; 2023 codeblu | All Rights Reserved</Text>
      </Stack>
    </>
  );
};

export default Footer;
