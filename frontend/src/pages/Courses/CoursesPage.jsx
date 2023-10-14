import {
  Button,
  Container,
  HStack,
  Heading,
  Input,
  InputGroup,
  InputLeftElement,
  Stack,
} from "@chakra-ui/react";
import React, { useState } from "react";
import CourseCardComp from "../../components/CourseCardComp";
import { BsSearch } from "react-icons/bs";

const CoursesPage = () => {
  const [keyword, setKeyword] = useState("");
  const [category, setCategory] = useState("");

  const addToPlayList = () => {};

  const categories = [
    "Web development",
    "App development",
    "Data Science",
    "Artificial inteligence",
    "Machine learning",
  ];
  return (
    <Container minH={"95vh"} maxW={"container.lg"} >
      <Heading textAlign={"center"} size={"2xl"} letterSpacing={"1px"} m={8}>
        All Courses
      </Heading>

      <InputGroup>
        <InputLeftElement pointerEvents="none">
          <BsSearch color="gray.300" />
        </InputLeftElement>
        <Input
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        placeholder="Search a course ..."
      />
      </InputGroup>

     

      <Heading mt={4} size={"md"}>
        Select Category
      </Heading>
      <HStack
        gap={4}
        alignItems={"center"}
        w={"full"}
        m={"auto"}
        mt={4}
        flexWrap={"wrap"}
      >
        {categories.map((item) => (
          <Button variant={"link"} onClick={() => setCategory(item)} key={item}>
            {item}
          </Button>
        ))}
      </HStack>

      <Stack
        direction={["column", "row"]}
        flexWrap={"wrap"}
        justifyContent={["flex-start", "space-evenly"]}
        alignItems={["center", "flex-start"]}
        py={8}
      >
        <CourseCardComp
          views={4}
          title={"javascript"}
          imageSrc={"hh"}
          id={123}
          addToPlaylistHandler={addToPlayList}
          creator={"jarmanjit singh"}
          description={
            "this is mern stack project what is the capacity to do work and the eligibility criteria is the most important thing in the world"
          }
          lectures={4}
        />
      </Stack>
    </Container>
  );
};

export default CoursesPage;
