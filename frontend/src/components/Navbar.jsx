import { Box, Button, Container } from '@chakra-ui/react'
import React, { useEffect, useRef, useState } from 'react'
import {BiMenuAltRight} from "react-icons/bi"
import DrawerComp from './DrawerComp'
import { useDispatch, useSelector } from 'react-redux'
import toast from 'react-hot-toast'
import { clearError, clearMessage } from '../reduxToolkit/slices/userSlice'
import { Link, useLocation } from 'react-router-dom'

const Navbar = () => {


  const refToChild = useRef(null);
  const {isAuthenticated, user, message, error} = useSelector(state=> state.user)
  const dispatch = useDispatch();
  const location = useLocation();
  console.log(location) 

  if(location.pathname == "/"){
    document.title = "Code Blu";
  }else if(location.pathname == "/courses"){
    document.title = "Code Blu - Courses";
  }else if(location.pathname == "/request"){
    document.title = "Code Blu - Request Course";
  }else if(location.pathname == "/contact"){
    document.title = "Code Blu - Contact Us";
  }
  else if(location.pathname == "/about"){
    document.title = "Code Blu - About Us";
  }
  else if(location.pathname == "/profile"){
    document.title = "Code Blu - Profile";
  }
  else if(location.pathname.includes("admin")){
    document.title = "Code Blu - Admin";
  }
  else if(location.pathname == "/login"){
    document.title = "Code Blu - Login";
  }
  else if(location.pathname == "/register"){
    document.title = "Code Blu - Register";
  }
  else if(location.pathname == "/forgetpassword"){
    document.title = "Code Blu - Forget Password";
  }else{
    document.title = "Code Blu";
  }

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
