import {
  Button,
  Container,
  FormControl,
  FormLabel,
  Heading,
  Input,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { forgetPassword } from "../../reduxToolkit/api_functions/profile";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import {
  clearError,
  clearMessage,
} from "../../reduxToolkit/slices/profileSlice";
import { useNavigate } from "react-router-dom";

const ForgetPassword = () => {
  const [email, setEmail] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, message, error } = useSelector((state) => state.profile);

  const submitHandler = (e) => {
    e.preventDefault();
    forgetPassword(email, dispatch);
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearError());
    }
    if (message) {
      toast.success(message);
      dispatch(clearMessage());
      navigate("/login")
    }
  }, [dispatch, error, message]);

  return (
    <Container py={16} h={"90vh"}>
      <form onSubmit={submitHandler}>
        <Heading my={16} textTransform={"uppercase"} textAlign={"center"}>
          Forget password
        </Heading>

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

        <Button isLoading={loading} w={"full"} colorScheme="blue" type="submit">
          Send Reset Link
        </Button>
      </form>
    </Container>
  );
};

export default ForgetPassword;
