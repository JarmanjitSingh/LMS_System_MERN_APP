import {
  Button,
  Container,
  FormControl,
  FormLabel,
  Heading,
  Input,
  VStack,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { changePassword } from "../../reduxToolkit/api_functions/profile";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import {
  clearError,
  clearMessage,
} from "../../reduxToolkit/slices/profileSlice";

const ChangePassword = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const dispatch = useDispatch();

  const submitHandler = async(e) => {
    e.preventDefault();
    await changePassword(oldPassword, newPassword, dispatch);
    setOldPassword("")
    setNewPassword("")
  };

  const {loading, message, error } = useSelector(
    (state) => state.profile
  );

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearError());
    }
    if (message) {
      toast.success(message);
      dispatch(clearMessage());
    }
  }, [dispatch, message, error]);

  return (
    <>
      <Container h={"95vh"}>
        <VStack h={"full"} justifyContent={"start"} w={"full"} spacing={16}>
          <form onSubmit={submitHandler} style={{ width: "100%" }}>
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

            <Button isLoading={loading} colorScheme="blue" type="submit" w={"full"} my={4}>
              Change Password
            </Button>
          </form>
        </VStack>
      </Container>
    </>
  );
};

export default ChangePassword;
