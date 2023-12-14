import {
  Button,
  Container,
  FormControl,
  FormLabel,
  Heading,
  Input,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { resetPassword } from "../../reduxToolkit/api_functions/profile";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import {
  clearError,
  clearMessage,
} from "../../reduxToolkit/slices/profileSlice";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  const params = useParams();

  const { loading, message, error } = useSelector((state) => state.profile);

  const submitHandler = (e) => {
    e.preventDefault();
    resetPassword(params.token, password, dispatch);
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearError());
    }
    if (message) {
      toast.success(message);
      dispatch(clearMessage());
    }
  }, [dispatch, error, message]);

  return (
    <Container py={16} h={"90vh"}>
      <form onSubmit={submitHandler}>
        <Heading my={16} textTransform={"uppercase"} textAlign={"center"}>
          Reset password
        </Heading>

        <FormControl my={4}>
          <Input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="Enter your password"
          />
        </FormControl>

        <Button isLoading={loading} w={"full"} colorScheme="blue" type="submit">
          Reset Password
        </Button>
      </form>
    </Container>
  );
};

export default ResetPassword;
