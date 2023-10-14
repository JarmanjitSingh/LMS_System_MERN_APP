import { Button, Container, FormControl, FormLabel, Heading, Input } from '@chakra-ui/react'
import React, { useState } from 'react'

const ForgetPassword = () => {
    const [email, setEmail] = useState('');
  return (
    <Container py={16} h={'90vh'}>
        <form>
            <Heading my={16} textTransform={'uppercase'} textAlign={'center'}>
                Forget password
            </Heading>

            
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

            <Button w={'full'} colorScheme='blue' type='submit'>Send Reset Link</Button>
        </form>
    </Container>
  )
}

export default ForgetPassword
