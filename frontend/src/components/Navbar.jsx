import { Box, Button, Container } from '@chakra-ui/react'
import React, { useEffect, useRef, useState } from 'react'
import {BiMenuAltRight} from "react-icons/bi"
import DrawerComp from './DrawerComp'
import { useDispatch, useSelector } from 'react-redux'
import toast from 'react-hot-toast'
import { clearError, clearMessage } from '../reduxToolkit/slices/userSlice'
import { Link } from 'react-router-dom'

const Navbar = () => {


  const refToChild = useRef(null);
  const {isAuthenticated, user, message, error} = useSelector(state=> state.user)
  const dispatch = useDispatch();

  useEffect(()=>{
      if(error){
       // toast.error(error)
        dispatch(clearError())
      }
    
    if(message){
      toast.success(message)
      dispatch(clearMessage())
    }

  }, [dispatch, message, error])

  const openDrawer = ()=>{
    if(refToChild.current){
      refToChild.current.click()
    }
  }
  return (
    <Box h={20} py={4} px={10} display={'flex'} alignItems={'center'} justifyContent={'space-between'}>
      <Link to={"/"}>
      <img src='https://s3.amazonaws.com/cdn.codeblu.io/website/img_footer/footerlogo.svg' alt='logo' />
      </Link>
      <Button colorScheme='blue' onClick={openDrawer}><BiMenuAltRight size={24} /></Button>
      <DrawerComp refFromParent={refToChild} isAuthenticated={isAuthenticated} user={user}/>
    </Box>
  )
}

export default Navbar
