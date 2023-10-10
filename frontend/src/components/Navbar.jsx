import { Box, Button, Container } from '@chakra-ui/react'
import React, { useRef } from 'react'
import {BiMenuAltRight} from "react-icons/bi"
import DrawerComp from './DrawerComp'

const Navbar = () => {

  const refToChild = useRef(null);

  const openDrawer = ()=>{
    if(refToChild.current){
      refToChild.current.click()
    }
  }
  return (
    <Box h={20} py={4} px={10} display={'flex'} alignItems={'center'} justifyContent={'space-between'}>
      <img src='https://s3.amazonaws.com/cdn.codeblu.io/website/img_footer/footerlogo.svg' />
      <Button colorScheme='blue' onClick={openDrawer}><BiMenuAltRight size={24} /></Button>
      <DrawerComp refFromParent={refToChild} />
    </Box>
  )
}

export default Navbar
