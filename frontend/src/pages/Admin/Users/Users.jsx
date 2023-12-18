import React, { useEffect } from "react";
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
import { useDispatch, useSelector } from "react-redux";
import { deleteUser, getAllUsers, updateUserRole } from "../../../reduxToolkit/api_functions/admin";
import Loader from "../../../components/Loader";
import toast from "react-hot-toast";
import { clearError, clearMessage } from "../../../reduxToolkit/slices/adminSlice";

const Users = () => {

  const dispatch = useDispatch();
  const {users, loading, error, message} = useSelector(state=> state.admin)

  const updateRoleHandler = (id) => {
    updateUserRole(id, dispatch)
  };
  const deleteUserHandler = (id) => {
    deleteUser(id, dispatch)
  };

  useEffect(() => {
    getAllUsers(dispatch)

    if(error){
      toast.error(error)
      dispatch(clearError())
    }
    if(message){
      toast.success(message)
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
              {users && users.length > 0 && users.map((item) => (
                <Row
                  key={item._id}
                  item={item}
                  updateRoleHandler={updateRoleHandler}
                  deleteUserHandler={deleteUserHandler}
                  loading={loading}
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

function Row({ item, updateRoleHandler, deleteUserHandler, loading }) {
  return (
    <>
      <Tr>
        <Td>#{item._id}</Td>
        <Td>{item.name}</Td>
        <Td>{item.email}</Td>
        <Td>{item.role}</Td>
        <Td>
          {item.subscription && item.subscription.status === "active" ? "Active" : "Not Active"}
        </Td>
        <Td isNumeric>
          <HStack justifyContent={"flex-end"}>
            <Button
            isLoading={loading}
              variant={"outline"}
              colorScheme="blue"
              color={"white"}
              css={{ ":hover": { color: "blue" } }}
              onClick={() => updateRoleHandler(item._id)}
            >
              Change Role
            </Button>
            <Button isLoading={loading} onClick={() => deleteUserHandler(item._id)}>
              <AiFillDelete />
            </Button>
          </HStack>
        </Td>
      </Tr>
    </>
  );
}
