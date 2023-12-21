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
            <Link to={"/about"}>Our Story</Link>
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
            <Link to={"/courses"}>Courses</Link>
            <Link to={"/profile"}>My Account</Link>
            <Link to={"/"}>Course Dashboard</Link>
          </VStack>{" "}
          <VStack
             fontSize={["md", "xl", "xl", "xl"]}
            h={"full"}
            alignItems={"center"}
            justifyContent={"space-evenly"}
          >
            <Heading>Social Links</Heading>
            <Link to={"https://www.linkedin.com/in/jarmanjit-singh-029452256/"} target="_blank">Linkedin</Link>
            <Link to={"https://github.com/JarmanjitSingh"} target="_blank">Github</Link>
            <Link to={"https://www.instagram.com/jarmanjit01/"} target="_blank">Instagram</Link>
          </VStack>{" "}
          <VStack
            fontSize={["md", "xl", "xl", "xl"]}
            h={"full"}
            alignItems={"center"}
            justifyContent={"space-evenly"}
          >
            <Heading>Resources</Heading>
            <Link to={"/"}>Blog</Link>
            <Link to={"/"}>News Letter</Link>
            <Link to={"/"}>Events</Link>
          </VStack>
        </Grid>

        <Text textAlign={'center'}>Copyright &copy; 2023 codeblu | All Rights Reserved</Text>
      </Stack>
    </>
  );
};

export default Footer;
