import React from "react";
import { Container, Stack, VStack } from "@chakra-ui/react";
import cursor from "../../../assets/images/cursor.png";
import Sidebar from "../Sidebar";

const AdminCourses = () => {
  return (
    <Container
      maxW={"container.2xl"}
      border={"1px solid"}
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

        <VStack
          w={"70%"}
          minH={"90vh"}
          border={"1px solid red"}
          overflowY={"scroll"}
        ></VStack>
      </Stack>
    </Container>
  );
};

export default AdminCourses;
