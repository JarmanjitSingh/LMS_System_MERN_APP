import { Box, Button, Container, FormControl, FormLabel, Heading, Input, Textarea, VStack } from '@chakra-ui/react'
import React, { useState } from 'react'
import { Link } from 'react-router-dom';

const Contact = () => {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

  return (
    <Container h={'92vh'}>
        <VStack>
            <Heading textTransform={'uppercase'} textAlign={'center'}>Contact Us</Heading>

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
              <FormLabel htmlFor="message">Message</FormLabel>
              <Textarea
                id="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
                placeholder="Enter your message"
              />
            </FormControl>

            

            <Button colorScheme="blue" type="submit" w={'full'} my={4}>Send</Button>
            <Box>Request for a course? <Link to={'/request'}><Button variant={'link'} colorScheme="blue" >click here</Button></Link></Box>
          
           </form>
        </VStack>
    </Container>
  )
}

export default Contact
