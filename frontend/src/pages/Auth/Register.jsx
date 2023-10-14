import {
  Avatar,
  Box,
  Button,
  Container,
  FormControl,
  FormLabel,
  HStack,
  Heading,
  Input,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";

const fileUploadStyle = {
    "&::file-selector-button": {
        cursor: "pointer",
        marginLeft: "-5%",
        width: "110%",
        height: "100%",
        color: "#EEC94B",
        backgroundColor: "white"
    }
}

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [imagePreview, setImagePreview] = useState("");
  const [image, setImage] = useState('')

  const fileInputRef = useRef(null);

  const changeImageHandler = (e)=>{
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onloadend = ()=>{
        setImagePreview(reader.result)
        setImage(file)
    }
  }

  return (
    <>
      <Container h={"95vh"}>
        <VStack h={"full"} justifyContent={"center"} w={"full"} spacing={16}>
          <Stack
            direction={["column", "row"]}
            alignItems={"center"}
            justifyContent={"center"}
          >
            <Heading>Register to the </Heading>
            <img
              src="https://s3.amazonaws.com/cdn.codeblu.io/website/img_footer/footerlogo.svg"
              alt="codeblu logo"
            />
          </Stack>

          <form style={{ width: "100%" }}>
            <FormControl my={4}>
              <FormLabel htmlFor="name">Name</FormLabel>
              <Input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                placeholder="Enter your name"
              />
            </FormControl>

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

            <FormControl my={4} display={'none'} >
              <FormLabel htmlFor="avatar">Choose Avatar</FormLabel>
              <Input ref={fileInputRef} onChange={changeImageHandler} accept="image/*" type="file" id="avatar" required css={fileUploadStyle} />
            </FormControl>

            <HStack textAlign={'right'} alignItems={'center'} justifyContent={'end'}>
                <Button onClick={()=> fileInputRef.current.click()} size={'sm'} colorScheme="blue" variant={'outline'}>Choose Avatar</Button>
                <Avatar src={imagePreview} />
            </HStack>

      

            <Button colorScheme="blue" type="submit" w={"full"} my={4}>
              Sign Up
            </Button>

            <Box>
              Already have an account?{" "}
              <Link to={"/login"}>
                <Button variant={"link"} colorScheme="blue">
                  Login
                </Button>
              </Link>
            </Box>
          </form>
        </VStack>
      </Container>
    </>
  );
};

export default Register;
