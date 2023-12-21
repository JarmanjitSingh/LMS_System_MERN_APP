import { Box, Grid, GridItem, Heading, Text, VStack } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import introVideo from "../../assets/videos/intro.mp4";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useParams } from "react-router-dom";
import { getCourseLectures } from "../../reduxToolkit/api_functions/course";
import Loader from "../../components/Loader";
import Lottie from "lottie-react";
import animationData from "../../assets/docs/Animation - 1703153032547.json"

const CourseDetailPage = ({ user }) => {
  const [lectureNumber, setLectureNumber] = useState(0);
  const dispatch = useDispatch();
  const params = useParams();

  const { lectures, loading } = useSelector((state) => state.course);

  //to prevent right click on a window to save video
  window.addEventListener("contextmenu", (e) => {
    e.preventDefault();
  });

  useEffect(() => {
    getCourseLectures(params.id, dispatch);
  }, [dispatch, params.id]);

  if (
    user.role !== "admin" &&
    (user.subscription === undefined || user.subscription.status !== "active")
  ) {
    return <Navigate to={"/subscribe"} />;
  }
  return loading ? (
    <Loader />
  ) : (
    <Grid minH={"90vh"} templateColumns={["1fr", "3fr 1fr"]}>
      {lectures && lectures.length > 0 ? (
        <>
          <Box p={4}>
            <video
              width={"100%"}
              style={{ borderRadius: "10px" }}
              controls
              controlsList="nodownload noremoteplayback"
              disablePictureInPicture
              disableRemotePlayback
              src={lectures[lectureNumber].video.url}
            ></video>

            <Heading m={4}>{`#${lectureNumber + 1} ${
              lectures[lectureNumber].title
            }`}</Heading>
            <Heading m={4}>Description</Heading>
            <Text m={4} maxH={"200px"} overflow={"auto"}>
              {lectures[lectureNumber].description}
            </Text>
          </Box>

          <VStack p={4} maxH={"90vh"} overflow={"auto"}>
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
        </>
      ) : (
       <GridItem colSpan={6} minH={"40vh"}  margin={'auto'} w={'full'} >
          <Heading size={"lg"} color={"grey"} textAlign={"center"} mb={4}>
            Lectures Not Found
          </Heading>
          <Box h={["200px", "300px"]} w={["200px", "300px"]} margin={"auto"}>
            <Lottie
              animationData={animationData}
              style={{ height: "100%", width: "100%" }}
            />
          </Box>
        </GridItem>
      )}
    </Grid>
  );
};

export default CourseDetailPage;
