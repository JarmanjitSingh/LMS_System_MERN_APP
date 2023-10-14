import { Container, HStack, Heading, Text, VStack } from "@chakra-ui/react";
import React from "react";

const About = () => {
  return (
    <Container maxW={"container.xl"} minH={"90vh"} mb={16}>
      <VStack h={"full"}>
        <HStack justifyContent={"center"} letterSpacing={"2px"}>
          <Heading>What is</Heading>
          <img
            src="https://s3.amazonaws.com/cdn.codeblu.io/website/img_footer/footerlogo.svg"
            alt="logo"
          />
          <Heading>?</Heading>
        </HStack>
        <Text fontFamily={"body"} fontSize={'xl'} mt={8} color={'gray.400'} alignContent={'center'}>
          Are you ready to take your programming skills to the next level? Look
          no further than Codeblu, the premier programming community dedicated
          to helping new programmers achieve their goals and reach their full
          potential.
          <br></br>
          <br></br>
          As the founder and CEO of Codeblu, I know firsthand the challenges
          that come with learning and growing in the programming industry.
          That's why I created Codeblu – to provide new programmers with the
          resources and support they need to succeed.
          <br></br>
          <br></br>
          Our YouTube channel is a treasure trove of informative videos on
          everything from programming basics to advanced techniques. But that's
          just the beginning. Our affordable courses are designed to give you
          the high-quality education you need to succeed in the industry,
          without breaking the bank.
          <br></br>
          <br></br>
          At Codeblu, we believe that price should never be a barrier to
          achieving your dreams. That's why our courses are priced low – so that
          anyone, regardless of their financial situation, can access the tools
          and knowledge they need to succeed.
          <br></br>
          <br></br>
          But Codeblu is more than just a community – we're a family. Our
          supportive community of like-minded individuals is here to help you
          every step of the way, whether you're just starting out or looking to
          take your skills to the next level.
          <br></br>
          <br></br>
          With Codeblu by your side, there's nothing standing between you and
          your dream job. Our courses and community will provide you with the
          guidance, support, and motivation you need to unleash your full
          potential and become a skilled programmer.
          <br></br>
          <br></br>
          So what are you waiting for? Join the Codeblu family today and let's
          conquer the programming industry together! With our affordable
          courses, informative videos, and supportive community, the sky's the
          limit.
        </Text>
      </VStack>
    </Container>
  );
};

export default About;
