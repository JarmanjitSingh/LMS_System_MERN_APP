import { Box, Button, Container, FormControl, FormLabel, Heading, Input, Textarea, VStack } from '@chakra-ui/react'
import React, { useState } from 'react'
import { Link } from 'react-router-dom';

const RequestCourse = () => {
  
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [course, setCourse] = useState('');

  return (
    <Container h={'92vh'}>
        <VStack>
            <Heading textTransform={'uppercase'} textAlign={'center'}>Request New Course</Heading>

            <form style={{ width: "100%" }}>
            <FormControl my={4}>
              <FormLabel htmlFor="name">Name</FormLabel>
              <Input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                placeholder="Enter your name"
              />
            </FormControl>

            <FormControl my={4}>
              <FormLabel htmlFor="email">Email Address</FormLabel>
              <Input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="Enter your email"
              />
            </FormControl>

            <FormControl my={4}>
              <FormLabel htmlFor="course">Course</FormLabel>
              <Textarea
                id="course"
                value={course}
                onChange={(e) => setCourse(e.target.value)}
                required
                placeholder="Explain the course..."
              />
            </FormControl>

            

            <Button colorScheme="blue" type="submit" w={'full'} my={4}>Send</Button>
            <Box>See available courses ! <Link to={'/courses'}><Button variant={'link'} colorScheme="blue" >click here</Button></Link></Box>
          
           </form>
        </VStack>
    </Container>
  )
}

export default RequestCourse
