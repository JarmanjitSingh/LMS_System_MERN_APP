import {
  Avatar,
  Box,
  Button,
  ButtonGroup,
  Container,
  FormControl,
  FormLabel,
  Grid,
  HStack,
  Heading,
  Image,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  Text,
  VStack,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useRef, useState } from "react";
import { CgProfile } from "react-icons/cg";
import { PiBookOpenTextLight, PiLockKeyBold } from "react-icons/pi";
import { TbLogout2 } from "react-icons/tb";
import { Link, useNavigate } from "react-router-dom";
import CourseCardComp from "../../components/CourseCardComp";
import toast from "react-hot-toast";

const Profile = ({user}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const navigate = useNavigate();

  const removeFromPlayList = () => {};

  return (
    <>
      <Container maxW={"6xl"} border={"1px solid"} minH={"80vh"} p={4}>
        <Stack
          direction={["column","column","row", "row"]}
          alignItems={"center"}
          justifyContent={"center"}
          w={"full"}
          h={"full"}
          gap={16}
        >
          <VStack
            w={["100%", "100%", "25%", "25%"]}
            gap={4}
            bg={"blue.800"}
            borderRadius={"10px"}
            minH={"70vh"}
          >
            <HStack
              w={"full"}
              p={2}
              alignItems={"center"}
              justifyContent={"start"}
              bg={"blue.900"}
              css={{ borderRadius: "10px 10px 0 0" }}
            >
              <Avatar /> <Text>My Account</Text>
            </HStack>

            <Button
              variant={"unstyled"}
              display={"flex"}
              gap={4}
              alignItems={"center"}
              justifyContent={"start"}
              w={"full"}
              p={4}
              onClick={() => navigate("/updateprofile")}
            >
              <CgProfile size={20} /> <Text>Update Profile</Text>
            </Button>

            <Button
              variant={"unstyled"}
              display={"flex"}
              gap={4}
              alignItems={"center"}
              justifyContent={"start"}
              w={"full"}
              p={4}
              onClick={() => navigate("/changepassword")}

            >
              <PiLockKeyBold size={20} /> <Text>Change Password</Text>
            </Button>

            <Button
              variant={"unstyled"}
              display={"flex"}
              gap={4}
              alignItems={"center"}
              justifyContent={"start"}
              w={"full"}
              p={4}
            >
              <PiBookOpenTextLight size={20} /> <Text>Enrolled Courses</Text>
            </Button>

            <Button
              variant={"unstyled"}
              display={"flex"}
              gap={4}
              alignItems={"center"}
              justifyContent={"start"}
              w={"full"}
              p={4}
            >
              <TbLogout2 size={20} /> <Text>Sign Out</Text>
            </Button>
          </VStack>

          <VStack w={["100%", "100%", "60%", "60%"]} minH={"70vh"}>
            <VStack>
              <Avatar size={"2xl"} src={user.avatar.url} />
              <Button variant={"link"} colorScheme="blue" onClick={onOpen}>
                Change Photo
              </Button>
            </VStack>

            <Grid templateColumns={["1fr", "1fr 1fr"]} w={"full"} gap={8} mt={4}>
              <HStack>
                <Text fontWeight={"bold"} color={"gray.400"}>
                  Name :{" "}
                </Text>
                <Text noOfLines={1} color={"gray.400"}>
                  {user.name}
                </Text>
              </HStack>
              <HStack>
                <Text fontWeight={"bold"} color={"gray.400"}>
                  Email :{" "}
                </Text>
                <Text noOfLines={1} color={"gray.400"}>
                  {user.email}
                </Text>
              </HStack>
              <HStack>
                <Text fontWeight={"bold"} color={"gray.400"}>
                  Created At :{" "}
                </Text>
                <Text noOfLines={1} color={"gray.400"}>
                  {user.createdAt.split("T")[0]}
                </Text>
              </HStack>
            </Grid>

            {user.role !== "admin" && (
              <HStack w={"full"} alignItems={"center"} justifyContent={["start", "end"]}>
                <Text fontWeight={"bold"}>Subscription</Text>
                {user.subscription && user.subscription.status === "active" ? (
                  <Button>Cancel Subscription</Button>
                ) : (
                  <Link to={"/subscribe"}>
                    <Button colorScheme="blue">Subscribe</Button>
                  </Link>
                )}
              </HStack>
            )}
          </VStack>
        </Stack>
      </Container>

      <Container maxW={"6xl"} border={"1px solid"} p={4}>
        <Heading letterSpacing={"2px"}>Playlist</Heading>
        {user.playlist.length > 0 && (
          <Stack
            direction={["column", "row"]}
            alignItems={"center"}
            flexWrap={"wrap"}
            p={4}
          >
            {user.playlist.map((element) => (
              <VStack m={2} key={element.course}>
                <CourseCardComp
                  views={4}
                  title={"javascript"}
                  imageSrc={"hh"}
                  id={element.course}
                  addToPlaylistHandler={removeFromPlayList}
                  creator={"jarmanjit singh"}
                  description={
                    "this is mern stack project what is the capacity to do work and the eligibility criteria is the most important thing in the world"
                  }
                  lectures={4}
                />
              </VStack>
            ))}
          </Stack>
        )}
      </Container>

      <ChangeProfileModal isOpen={isOpen} onClose={onClose} />
    </>
  );
};

const ChangeProfileModal = ({ isOpen, onClose }) => {
  const [imagePreview, setImagePreview] = useState("");
  const [image, setImage] = useState("");

  const fileInputRef = useRef(null);
  const initialRef = useRef(null);
  const submitButtonRef = useRef(null);

  const changeImageHandler = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onloadend = () => {
      setImagePreview(reader.result);
      setImage(file);
    };
  };

  const closeHandler = () => {
    onClose();
    setImagePreview("");
    setImage("");
  };

  const OverlayOne = () => (
    <ModalOverlay
      bg="blackAlpha.600"
      backdropFilter="blur(5px) hue-rotate(10deg)"
    />
  );

  const submitProfile = (e) => {
    e.preventDefault();
    toast.success("Profile updated");
    console.log(e);
  };

  return (
    <>
      <Modal
        initialFocusRef={initialRef}
        closeOnOverlayClick={false}
        motionPreset="slideInBottom"
        isCentered
        size={"md"}
        isOpen={isOpen}
        onClose={closeHandler}
        scrollBehavior={"inside"}
      >
        <OverlayOne />
        <ModalContent>
          <ModalHeader>Change Profile</ModalHeader>
          <ModalCloseButton />

          <ModalBody pb={6}>
            <form onSubmit={submitProfile}>
              <FormControl my={4} display={"none"}>
                <Input
                  ref={fileInputRef}
                  onChange={changeImageHandler}
                  accept="image/*"
                  type="file"
                  id="avatar"
                  required
                />
              </FormControl>

              <VStack
                textAlign={"right"}
                gap={6}
                alignItems={"center"}
                justifyContent={"center"}
              >
                <Avatar src={imagePreview} size={"2xl"} />
                <Button
                  onClick={() => fileInputRef.current.click()}
                  size={"sm"}
                  colorScheme="blue"
                  variant={"outline"}
                >
                  Choose Avatar
                </Button>
              </VStack>

              <Button type="submit" ref={submitButtonRef} display={"none"}>
                submit
              </Button>
            </form>
          </ModalBody>

          <ModalFooter>
            <Button
              onClick={() => {
                submitButtonRef.current.click();
                onClose();
              }}
              colorScheme="blue"
              mr={3}
            >
              Submit
            </Button>
            <Button onClick={closeHandler}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default Profile;
