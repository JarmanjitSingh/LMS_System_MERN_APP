import React, { useEffect, useRef, useState } from "react";
import {
  Box,
  Button,
  Container,
  FormControl,
  FormLabel,
  Heading,
  Image,
  Input,
  Select,
  Stack,
  VStack,
} from "@chakra-ui/react";
import cursor from "../../../assets/images/cursor.png";
import Sidebar from "../Sidebar";
import { createCourse } from "../../../reduxToolkit/api_functions/admin";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import {
  clearError,
  clearMessage,
} from "../../../reduxToolkit/slices/adminSlice";

const categories = [
  "Web development",
  "App development",
  "Data Science",
  "Artificial inteligence",
  "Machine learning",
];

const CreateCourse = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [createdBy, setCreatedBy] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState("");
  const [imagePrev, setImagePrev] = useState("");

  const fileInputRef = useRef(null);

  const dispatch = useDispatch();

  const { loading, error, message } = useSelector((state) => state.admin);

  const changeImageHandler = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onloadend = () => {
      setImagePrev(reader.result);
      setImage(file);
    };
  };

  const submitHandler = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("createdBy", createdBy);
    formData.append("category", category);
    formData.append("file", image);

    createCourse(formData, dispatch);
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
    <Container
      maxW={"container.2xl"}
      minH={"100vh"}
      p={4}
      css={{
        cursor: `url(${cursor}), default`,
      }}
    >
      <Stack
        direction={["column", "column", "row", "row"]}
        alignItems={"start"}
        justifyContent={"center"}
        w={"full"}
        h={"full"}
        gap={16}
      >
        <VStack
          w={["full", "full", "20%", "20%"]}
          gap={4}
          bg={"blue.800"}
          borderRadius={"10px"}
          minH={"70vh"}
        >
          <Sidebar />
        </VStack>

        <VStack w={["full", "full", "70%", "70%"]} minH={"90vh"}>
          <Box w={["100%", "60%"]}>
            <form
              onSubmit={submitHandler}
              style={{ width: "100%", textAlign: "center" }}
            >
              <Heading textTransform={"uppercase"}>Create Course</Heading>
              <FormControl my={4}>
                <FormLabel htmlFor="title">Title</FormLabel>
                <Input
                  type="text"
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                  placeholder="Enter your title"
                />
              </FormControl>

              <FormControl my={4}>
                <FormLabel htmlFor="description">Description</FormLabel>
                <Input
                  type="text"
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                  placeholder="Enter your description"
                />
              </FormControl>

              <FormControl my={4}>
                <FormLabel htmlFor="email">Creator Name</FormLabel>
                <Input
                  type="text"
                  id="email"
                  value={createdBy}
                  onChange={(e) => setCreatedBy(e.target.value)}
                  required
                  placeholder="Enter creator name"
                />
              </FormControl>

              <FormControl my={4}>
                <FormLabel htmlFor="email">Category</FormLabel>
                <Select
                  placeholder="Select option"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  {categories.map((item) => (
                    <option value={item} key={item}>
                      {item}
                    </option>
                  ))}
                </Select>
              </FormControl>

              <FormControl my={4} display={"none"}>
                <FormLabel htmlFor="avatar">Choose File</FormLabel>
                <Input
                  ref={fileInputRef}
                  onChange={changeImageHandler}
                  accept="image/*"
                  type="file"
                  required
                />
              </FormControl>

              <Button
                onClick={() => fileInputRef.current.click()}
                my={4}
                colorScheme="gray"
                color={"white"}
                css={{ ":hover": { color: "black" } }}
                variant={"outline"}
                width={"full"}
              >
                Choose File
              </Button>

              {imagePrev && (
                <Image
                  boxSize={64}
                  objectFit={"contain"}
                  src={imagePrev}
                  m={"auto"}
                />
              )}

              <Button
                isLoading={loading}
                colorScheme="blue"
                type="submit"
                w={"full"}
                my={4}
              >
                Create
              </Button>
            </form>
          </Box>
        </VStack>
      </Stack>
    </Container>
  );
};

export default CreateCourse;
