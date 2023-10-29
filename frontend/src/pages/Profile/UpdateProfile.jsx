import {
    Box,
    Button,
    Container,
    FormControl,
    FormLabel,
    Heading,
    Input,
    Stack,
    VStack,
  } from "@chakra-ui/react";
  import React, { useState } from "react";

const UpdateProfile = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  return (
    <>
    <Container h={"95vh"}>
      <VStack h={"full"} justifyContent={"start"} w={"full"} spacing={16}>
        <form style={{ width: "100%" }}>
          <Heading my={8} textTransform={'uppercase'} textAlign={'center'}>update profile</Heading>
          <FormControl my={4}>
            <FormLabel htmlFor="name">Name</FormLabel>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter Your Name"
            />
          </FormControl>

          <FormControl my={4}>
            <FormLabel htmlFor="email">Email</FormLabel>
            <Input
            type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Enter Your Email"
            />
          </FormControl>


          <Button colorScheme="blue" type="submit" w={'full'} my={4}>Update Profile</Button>

         </form>
      </VStack>
    </Container>
  </>
  )
}

export default UpdateProfile
