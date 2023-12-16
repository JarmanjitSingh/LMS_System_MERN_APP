import {
  Button,
  Container,
  Grid,
  HStack,
  Heading,
  Input,
  InputGroup,
  InputLeftElement,
  Stack,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import CourseCardComp from "../../components/CourseCardComp";
import { BsSearch } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { getAllCourses } from "../../reduxToolkit/api_functions/course";
import toast from "react-hot-toast";
import {
  clearError,
  clearMessage,
} from "../../reduxToolkit/slices/courseSlice";
import { addToPlaylist } from "../../reduxToolkit/api_functions/profile";
import { getMyProfile } from "../../reduxToolkit/api_functions/user";

const CoursesPage = () => {
  const [keyword, setKeyword] = useState("");
  const [category, setCategory] = useState("");
  const [activeTab, setActiveTab] = useState(0);
  const dispatch = useDispatch();
  const { loading, error, courses, message } = useSelector(
    (state) => state.course
  );

  const addToPlayListHandler = async (id) => {
    await addToPlaylist(id, dispatch);
    getMyProfile(dispatch);
  };

  const categories = [
    "All",
    "Web development",
    "App development",
    "Data Science",
    "Artificial inteligence",
    "Machine learning",
  ];

  useEffect(() => {
    getAllCourses(category, keyword, dispatch);
    if (message) {
      toast.success(message);
      dispatch(clearMessage());
    }
    if (error) {
      toast.error(error);
      dispatch(clearError());
    }
  }, [category, keyword, dispatch, error, message]);

  return (
    <>
      <Container maxW={"container.lg"}>
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
          {categories.map((item, index) => (
            <Button
              variant={"link"}
              onClick={() => {
                setCategory(item);
                setActiveTab(index);
              }}
              color={activeTab === index ? "blue.500" : ""}
              key={item}
            >
              {item}
            </Button>
          ))}
        </HStack>
      </Container>

      <Stack
        direction={["column", "row"]}
        flexWrap={"wrap"}
        justifyContent={["flex-start", "space-evenly"]}
        alignItems={["center", "flex-start"]}
        py={8}
        maxW={"container.xl"}
        margin={"auto"}
      >
        {courses && courses.length > 0 ? (
          courses.map((course) => (
            <CourseCardComp
              views={course.views}
              title={course.title}
              imageSrc={course.poster.url}
              id={course._id}
              addToPlaylistHandler={addToPlayListHandler}
              creator={course.createdBy}
              description={course.description}
              lectures={course.numOfVideos}
              key={course._id}
              loading={loading}
            />
          ))
        ) : (
          <Heading>Courses not found</Heading>
        )}
      </Stack>
    </>
  );
};

export default CoursesPage;
