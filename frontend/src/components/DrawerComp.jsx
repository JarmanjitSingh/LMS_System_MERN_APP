import React from "react";
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Button,
  useDisclosure,
  VStack,
  HStack,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { CgLogOut, CgProfile } from "react-icons/cg";
import {RiDashboardFill} from "react-icons/ri"

const DrawerComp = ({ refFromParent }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const isAuthenticated = true;
  const user = {
    role: "admin"
  }

  return (
    <>
      <Button
        ref={refFromParent}
        display={"none"}
        colorScheme="teal"
        onClick={onOpen}
      >
        Open
      </Button>
      <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent bg={"blue.800"} color={"white"}>
          <DrawerCloseButton />
          <DrawerHeader>
            <img
              src="https://s3.amazonaws.com/cdn.codeblu.io/website/img_footer/footerlogo.svg"
              alt="logo"
            />
          </DrawerHeader>

          <DrawerBody>
            <VStack
              alignItems={"flex-start"}
              spacing={6}
              justifyContent={"center"}
            >
              <Link to="/">
                <Button variant={"link"}>Home</Button>
              </Link>
              <Link to="/">
                <Button variant={"link"}>Courses</Button>
              </Link>
              <Link to="/">
                <Button variant={"link"}>Request Course</Button>
              </Link>
              <Link to="/">
                <Button variant={"link"}>Contact Us</Button>
              </Link>
              <Link to="/">
                <Button variant={"link"}>About</Button>
              </Link>
            </VStack>
          </DrawerBody>

          <DrawerFooter
            border={"1px solid"}
            display={"flex"}
            justifyContent={"space-evenly"}
          >
            {isAuthenticated ? (
              <>
                <VStack>
                  <HStack>
                    <Button variant={"outline"} colorScheme="white">
                      Logout
                      <CgLogOut style={{marginLeft: "5px"}}  />
                    </Button>
                    <Link to={"/profile"}>
                      <Button colorScheme="blue">Profile
                      <CgProfile style={{marginLeft: "5px"}} />
                      </Button>
                    </Link>
                  </HStack>
                  {
                    user && user.role === "admin" &&  <Link to={"/admin/dashboard"}>
                    <Button>
                      Dashboard
                      <RiDashboardFill style={{marginLeft: "5px"}}  />
                      </Button>
                      
                  </Link>
                  }
                </VStack>
              </>
            ) : (
              <>
                <Link to={"/register"}>
                  <Button variant={"outline"} colorScheme="white">
                    Sign Up
                  </Button>
                </Link>
                <p>Or</p>
                <Link to={"/login"}>
                  <Button colorScheme="blue">Login</Button>
                </Link>
              </>
            )}
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default DrawerComp;
