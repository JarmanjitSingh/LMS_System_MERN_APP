import {
  Button,
  HStack,
  Heading,
  Image,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router-dom";
import { BsCollectionPlayFill, BsListUl } from "react-icons/bs";
import { LuView } from "react-icons/lu";
import {AiOutlineVideoCameraAdd} from "react-icons/ai"

const CourseCardComp = ({
  views,
  title,
  imageSrc,
  id,
  addToPlaylistHandler,
  creator,
  description,
  lectures,
}) => {
  return (
    <VStack
      className="course"
      alignItems={"space-between"}
      maxW={"350px"}
      p={4}
    //   border={"1px solid"}
      borderRadius={"10px"}
      bg={'blue.900'}
      shadow={'dark-lg'}
      gap={4}
      
    >
      <Image
        src={imageSrc}
        h={"200px"}
        w={"full"}
        objectFit={"cover"}
      />
      <Heading
        textAlign={"left"}
        fontFamily={"sans-serif"}
        noOfLines={3}
        size={"md"}
        textTransform={'uppercase'}
      >
        {title}
      </Heading>
      <Text noOfLines={2}>{description}</Text>
      <HStack>
        <Text fontWeight={"bold"} textTransform={"uppercase"}>
          Creator -
        </Text>
        <Text fontFamily={"body"} textTransform={"uppercase"}>
          {creator}
        </Text>
      </HStack>

      <HStack justifyContent={"space-between"}>
        <HStack>
          <LuView size={20} />
          <Heading size={"sm"} fontWeight={'normal'} textTransform={"uppercase"}>
          {views} Views
          </Heading>
        </HStack>
        <HStack>
          <BsListUl size={20} />
          <Heading size={"sm"} fontWeight={'normal'} textTransform={"uppercase"}>
            {lectures} Lectures
          </Heading>
        </HStack>
      </HStack>

      <Stack direction={["column", "row"]} alignItems={"center"} justifyContent={'space-between'}>
        <Link to={`/course/${id}`}>
          <Button colorScheme="blue">Watch Now <BsCollectionPlayFill style={{marginLeft: '10px'}} /></Button>
        </Link>
        <Button
          variant={"outline"}
          colorScheme="blue"
          onClick={() => addToPlaylistHandler(id)}
        >
          Add to playlist
          <AiOutlineVideoCameraAdd size={22} style={{marginLeft: '10px'}}  />
        </Button>
      </Stack>
    </VStack>
  );
};

export default CourseCardComp;
