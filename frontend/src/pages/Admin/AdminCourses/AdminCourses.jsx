import React from "react";
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

const AdminCourses = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const courses = [
    {
      _id: "dfladfklnadjn",
      title: "MERN Stack",
      category: "Web Development",
      poster: {
        url: "https://res.cloudinary.com/practicaldev/image/fetch/s--J2NNFAdg--/c_imagga_scale,f_auto,fl_progressive,h_420,q_auto,w_1000/https://images.unsplash.com/photo-1529675641475-78780f1fd4b0%3Fixlib%3Drb-1.2.1%26ixid%3DeyJhcHBfaWQiOjEyMDd9%26auto%3Dformat%26fit%3Dcrop%26w%3D1350%26q%3D80",
      },
      createdBy: "Mr. Jarmanjit Singh",
      views: 1023,
      numOfVideos: 12,
    },
  ];

  const courseDetailHandler = () => {
    onOpen();
  };
  const deleteUserHandler = () => {};

  const deleteLectureButtonHandler = () => {};

  const addLectureHandler = (e, courseId, title, description, video) => {
    e.preventDefault()
  };
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
        direction={["column", "row"]}
        alignItems={"start"}
        justifyContent={"center"}
        w={"full"}
        h={"full"}
        gap={16}
      >
        <VStack
          w={"20%"}
          gap={4}
          bg={"blue.800"}
          borderRadius={"10px"}
          minH={"70vh"}
        >
          <Sidebar />
        </VStack>

        <VStack w={"70%"} minH={"90vh"} overflowX={"auto"}>
          <Heading textTransform={"uppercase"}>All Users</Heading>

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
                {courses.map((item) => (
                  <Row
                    key={item._id}
                    item={item}
                    courseDetailHandler={courseDetailHandler}
                    deleteUserHandler={deleteUserHandler}
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
          />
        </VStack>
      </Stack>
    </Container>
  );
};

export default AdminCourses;

function Row({ item, courseDetailHandler, deleteUserHandler }) {
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
            <Button onClick={() => deleteUserHandler(item._id)}>
              <AiFillDelete />
            </Button>
          </HStack>
        </Td>
      </Tr>
    </>
  );
}
