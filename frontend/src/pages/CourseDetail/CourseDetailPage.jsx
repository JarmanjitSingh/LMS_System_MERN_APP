import { Box, Grid, Heading, Text, VStack } from "@chakra-ui/react";
import React, { useState } from "react";
import introVideo from "../../assets/videos/intro.mp4";

const CourseDetailPage = () => {
  const [lectureNumber, setLectureNumber] = useState(0);

  //to prevent right click on a window to save video
  window.addEventListener("contextmenu", (e) => {
    e.preventDefault();
  });

  const lectures = [
    {
      _id: "firstid",
      title: "Sample Title",
      description: "Sample Description",
      video: {
        url: "video url",
      },
    },
    {
      _id: "firstid2",
      title: "Sample Title 2",
      description: "Sample Description",
      video: {
        url: "video url",
      },
    },
    {
      _id: "firstid3",
      title: "Sample Title 3",
      description: "Sample Description",
      video: {
        url: "video url",
      },
    },
  ];

  return (
    <Grid
      minH={"90vh"}
      templateColumns={["1fr", "3fr 1fr"]}
    >
      <Box p={4}>
        <video
          width={"100%"}
          style={{borderRadius: "10px"}}
          controls
          controlsList="nodownload noremoteplayback"
          disablePictureInPicture
          disableRemotePlayback
          src={introVideo}
        ></video>

        <Heading m={4}>{`#${lectureNumber + 1} ${
          lectures[lectureNumber].title
        }`}</Heading>
        <Heading m={4}>Description</Heading>
        <Text m={4}>{lectures[lectureNumber].description}</Text>
      </Box>

      <VStack p={4}>
        {lectures.map((item, index) => (
          <button
            onClick={() => setLectureNumber(index)}
            key={item._id}
            style={{
              width: "100%",
              padding: "1rem",
              textAlign: "center",
              marginBottom: 0,
              borderBottom: "1px solid rgba(255, 255, 255, 0.2)",
            }}
          >
            <Text noOfLines={1}>
              #{index + 1} {item.title}
            </Text>
          </button>
        ))}
      </VStack>
    </Grid>
  );
};

export default CourseDetailPage;
