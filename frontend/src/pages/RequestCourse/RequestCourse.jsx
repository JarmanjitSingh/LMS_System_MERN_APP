import { Box, Button, Container, FormControl, FormLabel, Heading, Input, Textarea, VStack } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { courseRequest } from '../../reduxToolkit/api_functions/contact';
import toast from 'react-hot-toast';
import { clearError, clearMessage } from '../../reduxToolkit/slices/contactSlice';

const RequestCourse = () => {

  const dispatch = useDispatch();
  const {loading, message, error} = useSelector(state=> state.contact)
  
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [course, setCourse] = useState('');

    const submitHandler = (e)=>{
      e.preventDefault();
      courseRequest(name, email, course, dispatch)
    }

    useEffect(() => {
      if (error) {
        toast.error(error);
        dispatch(clearError());
      }
      if (message) {
        toast.success(message);
        dispatch(clearMessage());
      }
    }, [dispatch, error, message]);

  return (
    <Container h={'92vh'}>
        <VStack>
            <Heading textTransform={'uppercase'} textAlign={'center'}>Request New Course</Heading>

            <form onSubmit={submitHandler} style={{ width: "100%" }}>
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

            

            <Button isLoading={loading} colorScheme="blue" type="submit" w={'full'} my={4}>Send</Button>
            <Box>See available courses ! <Link to={'/courses'}><Button variant={'link'} colorScheme="blue" >click here</Button></Link></Box>
          
           </form>
        </VStack>
    </Container>
  )
}

export default RequestCourse
