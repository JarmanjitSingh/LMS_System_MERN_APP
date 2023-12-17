import React, { useEffect } from "react";
import {
  Button,
  Container,
  HStack,
  Heading,
  Image,
  Stack,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  VStack,
  useDisclosure,
} from "@chakra-ui/react";
import cursor from "../../../assets/images/cursor.png";
import Sidebar from "../Sidebar";
import { AiFillDelete } from "react-icons/ai";
import LecturesModal from "./LecturesModal";
import { useDispatch, useSelector } from "react-redux";
import { getAllCourses, getCourseLectures } from "../../../reduxToolkit/api_functions/course";
import toast from "react-hot-toast";
import { clearError, clearMessage } from "../../../reduxToolkit/slices/adminSlice";
import { deleteCourse } from "../../../reduxToolkit/api_functions/admin";

const AdminCourses = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { courses, lectures } = useSelector((state) => state.course);
  const { loading, error, message } = useSelector((state) => state.admin);
  const dispatch = useDispatch();

  const courseDetailHandler = (courseId) => {
    getCourseLectures(courseId, dispatch)
    onOpen();
  };
  const deleteCourseHandler = (courseId) => {
    deleteCourse(courseId, dispatch)
  };

  const deleteLectureButtonHandler = () => {};

  const addLectureHandler = (e, courseId, title, description, video) => {
    e.preventDefault();
  };

  useEffect(() => {
    getAllCourses("", "",dispatch);

    if(error){
      toast.error(error);
      dispatch(clearError())
    }

    if(message){
      toast.success(message);
      dispatch(clearMessage())
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

        <VStack
          w={["full", "full", "70%", "70%"]}
          minH={"90vh"}
          overflowX={"auto"}
        >
          <Heading textTransform={"uppercase"}>All Courses</Heading>

          <TableContainer w={["100vw", "full"]}>
            <Table variant={"simple"}>
              <TableCaption>All available courses in the database</TableCaption>
              <Thead>
                <Tr>
                  <Th color={"white"}>ID</Th>
                  <Th color={"white"}>poster</Th>
                  <Th color={"white"}>title</Th>
                  <Th color={"white"}>catefory</Th>
                  <Th color={"white"}>creator</Th>
                  <Th color={"white"} isNumeric>
                    views
                  </Th>
                  <Th color={"white"} isNumeric>
                    lectures
                  </Th>
                  <Th color={"white"} isNumeric>
                    ACTION
                  </Th>
                </Tr>
              </Thead>

              <Tbody>
                {courses &&
                  courses.length > 0 &&
                  courses.map((item) => (
                    <Row
                      key={item._id}
                      item={item}
                      courseDetailHandler={courseDetailHandler}
                      deleteCourseHandler={deleteCourseHandler}
                      loading={loading}
                    />
                  ))}
              </Tbody>
            </Table>
          </TableContainer>
          <LecturesModal
            isOpen={isOpen}
            onClose={onClose}
            id={"fadkfkaslkfj"}
            deleteButtonHandler={deleteLectureButtonHandler}
            courseTitle={"React Course"}
            addLectureHandler={addLectureHandler}
            lectures={lectures}
            loading={loading}
          />
        </VStack>
      </Stack>
    </Container>
  );
};

export default AdminCourses;

function Row({ item, courseDetailHandler, deleteCourseHandler, loading }) {
  return (
    <>
      <Tr>
        <Td>#{item._id}</Td>
        <Td>
          <Image src={item.poster.url} />
        </Td>
        <Td>{item.title}</Td>
        <Td textTransform={"uppercase"}>{item.category}</Td>
        <Td>{item.createdBy}</Td>

        <Td isNumeric>{item.views}</Td>
        <Td isNumeric>{item.numOfVideos}</Td>

        <Td isNumeric>
          <HStack justifyContent={"flex-end"}>
            <Button
              variant={"outline"}
              colorScheme="blue"
              color={"white"}
              css={{ ":hover": { color: "blue" } }}
              onClick={() => courseDetailHandler(item._id)}
            >
              View Lectures
            </Button>
            <Button isLoading={loading} onClick={() => deleteCourseHandler(item._id)}>
              <AiFillDelete />
            </Button>
          </HStack>
        </Td>
      </Tr>
    </>
  );
}
