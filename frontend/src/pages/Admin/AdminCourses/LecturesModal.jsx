import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Grid,
  Heading,
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
} from "@chakra-ui/react";
import React, { useRef, useState } from "react";
import { AiFillDelete } from "react-icons/ai";
import Loader from "../../../components/Loader";

const LecturesModal = ({
  isOpen,
  onClose,
  courseTitle,
  id,
  deleteButtonHandler,
  addLectureHandler,
  lectures = [],
  loading,
}) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [video, setVideo] = useState("");
  const [videoPrev, setVideoPrev] = useState("");

  const fileInputRef = useRef(null);

  const changeVideoHandler = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onloadend = () => {
      setVideoPrev(reader.result);
      setVideo(file);
    };
  };

  const closeHandler = () => {
    setTitle("");
    setDescription("");
    setVideo("");
    setVideoPrev("");
    onClose();
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={closeHandler} size={"full"}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader className="themeClass">{courseTitle}</ModalHeader>
          <ModalCloseButton color={"white"} />
          <ModalBody className="themeClass">
            <Grid templateColumns={["1fr", "3fr 1fr"]}>
              <Box px={["2", "8"]}>
                <Box my={"5"}>
                  <Heading>{courseTitle}</Heading>
                  <Heading size={"sm"} opacity={0.4}>
                    #{id}
                  </Heading>
                </Box>

                <Heading size={"lg"}>Lectures</Heading>

                {lectures &&
                  lectures.length > 0 &&
                  lectures.map((lecture, index) => {
                    return (
                      <VideoCard
                        key={lecture._id}
                        title={lecture.title}
                        description={lecture.description}
                        num={index + 1}
                        lectureId={lecture._id}
                        courseId={id}
                        deleteButtonHandler={deleteButtonHandler}
                        loading={loading}
                      />
                    );
                  })}
              </Box>

              <Box px={["2", "8"]}>
                <form
                  onSubmit={(e) => {
                    addLectureHandler(e, id, title, description, video);
                  }}
                  style={{ textAlign: "center" }}
                >
                  <Heading textTransform={"uppercase"} my={"5"}>
                    Add Lecture
                  </Heading>
                  <FormControl my={4}>
                    <FormLabel htmlFor="title">Title</FormLabel>
                    <Input
                      type="text"
                      id="title"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      required
                      placeholder="Enter your title"
                    />
                  </FormControl>

                  <FormControl my={4}>
                    <FormLabel htmlFor="description">Description</FormLabel>
                    <Input
                      type="text"
                      id="description"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      required
                      placeholder="Enter your description"
                    />
                  </FormControl>

                  <FormControl my={4} display={"none"}>
                    <FormLabel htmlFor="avatar">Choose File</FormLabel>
                    <Input
                      ref={fileInputRef}
                      onChange={changeVideoHandler}
                      accept="video/mp4"
                      type="file"
                      required
                    />
                  </FormControl>

                  <Button
                    onClick={() => fileInputRef.current.click()}
                    my={4}
                    color={"white"}
                    css={{ ":hover": { color: "black" } }}
                    colorScheme="gray"
                    variant={"outline"}
                    width={"full"}
                  >
                    Choose File
                  </Button>

                  {videoPrev && (
                    <video
                      controlsList="nodownload"
                      controls
                      src={videoPrev}
                    ></video>
                  )}

                  <Button
                    isLoading={loading}
                    colorScheme="blue"
                    type="submit"
                    w={"full"}
                    my={4}
                  >
                    Add Lecture
                  </Button>
                </form>
              </Box>
            </Grid>
          </ModalBody>

          <ModalFooter className="themeClass">
            <Button
              colorScheme="blue"
              variant={"outline"}
              mr={3}
              onClick={closeHandler}
            >
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default LecturesModal;

function VideoCard({
  title,
  description,
  num,
  lectureId,
  courseId,
  deleteButtonHandler,
  loading,
}) {
  return (
    <Stack
      direction={["column", "row"]}
      my={8}
      borderRadius={"lg"}
      boxShadow={
        " 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"
      }
      justifyContent={["flex-start", "space-between"]}
      p={["4", "8"]}
      bg={"blue.900"}
    >
      <Box>
        <Heading>
          #{num} {title}
        </Heading>

        <Text>{description}</Text>
      </Box>

      <Button
        isLoading={loading}
        onClick={() => deleteButtonHandler(courseId, lectureId)}
      >
        <AiFillDelete />
      </Button>
    </Stack>
  );
}
