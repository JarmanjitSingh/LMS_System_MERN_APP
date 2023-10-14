import { Button, Container, FormControl, FormLabel, Heading, Input } from '@chakra-ui/react'
import React, { useState } from 'react'

const ResetPassword = () => {
    const [password, setPassword] = useState('');
    return (
      <Container py={16} h={'90vh'}>
          <form>
              <Heading my={16} textTransform={'uppercase'} textAlign={'center'}>
                  Reset password
              </Heading>
  
              
              <FormControl my={4}>
                <Input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="Enter your password"
                />
              </FormControl>
  
              <Button w={'full'} colorScheme='blue' type='submit'>Reset Password</Button>
          </form>
      </Container>
    )
}

export default ResetPassword
