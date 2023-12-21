import {
  Avatar,
  Box,
  Button,
  Container,
  FormControl,
  Grid,
  GridItem,
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
import React, { useEffect, useRef, useState } from "react";
import { CgProfile } from "react-icons/cg";
import { PiBookOpenTextLight, PiLockKeyBold } from "react-icons/pi";
import { TbLogout2 } from "react-icons/tb";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import {
  removeFromPlaylist,
  updateProfilePicture,
} from "../../reduxToolkit/api_functions/profile";
import { useDispatch, useSelector } from "react-redux";
import {
  clearError,
  clearMessage,
} from "../../reduxToolkit/slices/profileSlice";
import {
  clearError as subsClearError,
  clearMessage as subsClearMessage,
} from "../../reduxToolkit/slices/subscriptionSlice";
import { getMyProfile, logout } from "../../reduxToolkit/api_functions/user";
import { BsCollectionPlayFill } from "react-icons/bs";
import { MdDelete } from "react-icons/md";
import { cancelSubscription } from "../../reduxToolkit/api_functions/subscription";
import Lottie from "lottie-react";
import animationData from "../../assets/docs/Animation - 1703153032547.json"

const Profile = ({ user }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { loading, message, error } = useSelector((state) => state.profile);
  const {
    loading: subscriptionLoading,
    message: subscriptionMessage,
    error: subscriptionError,
  } = useSelector((state) => state.subscription);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const removeFromPlayList = async (id) => {
    await removeFromPlaylist(id, dispatch);
    getMyProfile(dispatch);
  };

  const handleCancelSubscription = async () => {
    await cancelSubscription(dispatch);
    getMyProfile(dispatch);
  };

  const logoutHandler = () => {
    logout(dispatch)
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

    if (subscriptionError) {
      toast.error(subscriptionError);
      dispatch(subsClearError());
    }
    if (subscriptionMessage) {
      toast.success(subscriptionMessage);
      dispatch(subsClearMessage());
    }
  }, [dispatch, message, error, subscriptionError, subscriptionMessage]);
  return (
    <>
      <Container maxW={"6xl"} minH={"80vh"} p={4}>
        <Stack
          direction={["column", "column", "row", "row"]}
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
              onClick={()=> navigate("/courses")}
            >
              <PiBookOpenTextLight size={20} /> <Text> Courses</Text>
            </Button>

            <Button
              variant={"unstyled"}
              display={"flex"}
              gap={4}
              alignItems={"center"}
              justifyContent={"start"}
              w={"full"}
              p={4}
              onClick={logoutHandler}
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

            <Grid
              templateColumns={["1fr", "1fr 1fr"]}
              w={"full"}
              gap={8}
              mt={4}
            >
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
              <HStack
                w={"full"}
                alignItems={"center"}
                justifyContent={["start", "end"]}
              >
                <Text fontWeight={"bold"}>Subscription</Text>
                {user.subscription && user.subscription.status === "active" ? (
                  <Button
                    isLoading={subscriptionLoading}
                    onClick={handleCancelSubscription}
                  >
                    Cancel Subscription
                  </Button>
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

      <Container maxW={"6xl"} p={4}>
        <Heading letterSpacing={"2px"}>Playlist</Heading>
        {user.playlist.length > 0 ? (
          <Grid
            templateColumns={["1fr", "1fr", "1fr 1fr", "1fr 1fr 1fr"]}
            gap={6}
            margin={"auto"}
            p={4}
          >
            {user.playlist.map((item) => (
              <GridItem margin={"auto"} key={item.course}>
                <PlaylistCardComp
                  imageSrc={item.poster}
                  id={item.course}
                  removeFromPlaylistHandler={removeFromPlayList}
                  loading={loading}
                />
              </GridItem>
            ))}
          </Grid>
        ) : (
          <Box minH={"40vh"}>
            <Heading size={'md'} color={'grey'} textAlign={"center"} mb={4}>
            Please Add Courses In Playlist
            </Heading>
            <Box h={["200px", "300px"]} w={["200px", "300px"]}  margin={'auto'}>
            <Lottie animationData={animationData}   style={{ height: "100%", width: "100%"}} />
            </Box>
          </Box>
        )}
      </Container>

      <ChangeProfileModal
        isOpen={isOpen}
        onClose={onClose}
        dispatch={dispatch}
        loading={loading}
        user={user}
      />
    </>
  );
};

const ChangeProfileModal = ({ isOpen, onClose, dispatch, loading, user }) => {
  const [imagePreview, setImagePreview] = useState(user.avatar.url);
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
    setImagePreview(user.avatar.url);
    setImage("");
  };

  const OverlayOne = () => (
    <ModalOverlay
      bg="blackAlpha.600"
      backdropFilter="blur(5px) hue-rotate(10deg)"
    />
  );

  const submitProfile = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    formData.append("file", image);
    await updateProfilePicture(formData, dispatch);
    dispatch(getMyProfile(dispatch));
    onClose();
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
              }}
              colorScheme="blue"
              mr={3}
              isLoading={loading}
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

const PlaylistCardComp = ({
  imageSrc,
  id,
  loading,
  removeFromPlaylistHandler,
}) => {
  return (
    <VStack
      className="course"
      maxW={"350px"}
      minH={"300px"}
      p={4}
      borderRadius={"10px"}
      bg={"blue.900"}
      shadow={"dark-lg"}
      gap={4}
    >
      <Image
        src={imageSrc}
        h={"200px"}
        w={"300px"}
        marginX={"auto"}
        objectFit={"cover"}
      />

      <Stack
        direction={["column", "row"]}
        alignItems={"center"}
        justifyContent={"space-between"}
      >
        <Link to={`/course/${id}`}>
          <Button colorScheme="blue">
            Watch Now <BsCollectionPlayFill style={{ marginLeft: "10px" }} />
          </Button>
        </Link>
        <Button
          isLoading={loading}
          variant={"outline"}
          colorScheme="blue"
          onClick={() => removeFromPlaylistHandler(id)}
        >
          Remove
          <MdDelete size={22} style={{ marginLeft: "10px" }} />
        </Button>
      </Stack>
    </VStack>
  );
};

export default Profile;
