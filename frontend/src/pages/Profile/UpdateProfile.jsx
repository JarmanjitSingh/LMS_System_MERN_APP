import {
  Button,
  Container,
  FormControl,
  FormLabel,
  Heading,
  Input,
  VStack,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateProfile } from "../../reduxToolkit/api_functions/profile";
import { getMyProfile } from "../../reduxToolkit/api_functions/user";
import { useNavigate } from "react-router-dom";

const UpdateProfile = ({ user }) => {
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    await updateProfile(name, email, dispatch);
    getMyProfile(dispatch);
    navigate("/profile")
  };

  const { loading } = useSelector((state) => state.profile);

  return (
    <>
      <Container h={"95vh"}>
        <VStack h={"full"} justifyContent={"start"} w={"full"} spacing={16}>
          <form onSubmit={submitHandler} style={{ width: "100%" }}>
            <Heading my={8} textTransform={"uppercase"} textAlign={"center"}>
              update profile
            </Heading>
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

            <Button
              isLoading={loading}
              colorScheme="blue"
              type="submit"
              w={"full"}
              my={4}
            >
              Update Profile
            </Button>
          </form>
        </VStack>
      </Container>
    </>
  );
};

export default UpdateProfile;
