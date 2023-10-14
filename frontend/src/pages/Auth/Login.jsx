import {
    Box,
  Button,
  Container,
  FormControl,
  FormLabel,
  HStack,
  Heading,
  Input,
  Stack,
  VStack,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  return (
    <>
      <Container h={"95vh"}>
        <VStack h={"full"} justifyContent={"center"} w={"full"} spacing={16}>
          <Stack direction={['column', 'row']} alignItems={"center"} justifyContent={"center"}>
            <Heading>Welcome to the </Heading>
            <img
              src="https://s3.amazonaws.com/cdn.codeblu.io/website/img_footer/footerlogo.svg"
              alt="codeblu logo"
            />
          </Stack>
          <form style={{ width: "100%" }}>
            <FormControl my={4}>
              <FormLabel htmlFor="email">Email Address</FormLabel>
              <Input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="Enter your email"
              />
            </FormControl>

            <FormControl my={4}>
              <FormLabel htmlFor="password">Password</FormLabel>
              <Input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="Enter your password"
              />
            </FormControl>

            <Box>
                <Link to={'/forgetpassword'}>
                    <Button variant={'link'}>Forget Password?</Button>
                </Link>
            </Box>

            <Button colorScheme="blue" type="submit" w={'full'} my={4}>Login</Button>

            <Box>New User? <Link to={'/register'}><Button variant={'link'} colorScheme="blue" >Sign Up</Button></Link></Box>
          </form>
        </VStack>
      </Container>
    </>
  );
};

export default Login;
