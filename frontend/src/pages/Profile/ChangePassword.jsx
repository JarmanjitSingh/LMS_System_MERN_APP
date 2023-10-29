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

const ChangePassword = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  return (
    <>
      <Container h={"95vh"}>
        <VStack h={"full"} justifyContent={"start"} w={"full"} spacing={16}>
          <form style={{ width: "100%" }}>
            <Heading my={8} textTransform={"uppercase"} textAlign={"center"}>
              Change Password
            </Heading>
            <FormControl my={4}>
              <FormLabel htmlFor="oldPassword">Old Password</FormLabel>
              <Input
                id="oldPassword"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
                required
                placeholder="Enter Old Password"
              />
            </FormControl>

            <FormControl my={4}>
              <FormLabel htmlFor="newPassword">New Password</FormLabel>
              <Input
                id="newPassword"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
                placeholder="Enter New Password"
              />
            </FormControl>

            <Button colorScheme="blue" type="submit" w={"full"} my={4}>
              Change Password
            </Button>
          </form>
        </VStack>
      </Container>
    </>
  );
};

export default ChangePassword;
