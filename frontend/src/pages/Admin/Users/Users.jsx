import React from "react";
import {
  Button,
  Container,
  HStack,
  Heading,
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
} from "@chakra-ui/react";
import cursor from "../../../assets/images/cursor.png";
import Sidebar from "../Sidebar";
import { AiFillDelete } from "react-icons/ai";

const Users = () => {
  const users = [
    {
      _id: "dfladfklnadjn",
      name: "Jarmanjit Singh",
      email: "jarmanjit@gmail.com",
      role: "admin",
      subscription: {
        status: "active",
      },
    },
  ];

  const updateRoleHandler = () => {};
  const deleteUserHandler = () => {};
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

        <VStack
          w={"70%"}
          minH={"90vh"}
          overflowX={"auto"}
        >
          <Heading textTransform={"uppercase"}>All Users</Heading>

          <TableContainer w={["100vw", "full"]}>
            <Table variant={"simple"}>
              <TableCaption>All available users in the database</TableCaption>
              <Thead>
                <Tr>
                  <Th color={"white"}>ID</Th>
                  <Th color={"white"}>NAME</Th>
                  <Th color={"white"}>EMAIL</Th>
                  <Th color={"white"}>ROLE</Th>
                  <Th color={"white"}>SUBSCRIPTION</Th>
                  <Th color={"white"} isNumeric>
                    ACTION
                  </Th>
                </Tr>
              </Thead>

              <Tbody>
                {users.map((item) => (
                  <Row
                    key={item._id}
                    item={item}
                    updateRoleHandler={updateRoleHandler}
                    deleteUserHandler={deleteUserHandler}
                  />
                ))}
              </Tbody>
            </Table>
          </TableContainer>
        </VStack>
      </Stack>
    </Container>
  );
};

export default Users;

function Row({ item, updateRoleHandler, deleteUserHandler }) {
  return (
    <>
      <Tr>
        <Td>#{item._id}</Td>
        <Td>{item.name}</Td>
        <Td>{item.email}</Td>
        <Td>{item.role}</Td>
        <Td>
          {item.subscription.status === "active" ? "Active" : "Not Active"}
        </Td>
        <Td isNumeric>
          <HStack justifyContent={"flex-end"}>
            <Button
              variant={"outline"}
              colorScheme="blue"
              color={"white"}
              css={{ ":hover": { color: "blue" } }}
              onClick={() => updateRoleHandler(item._id)}
            >
              Change Role
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
