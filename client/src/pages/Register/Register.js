import React, { useState } from 'react'
import { Box, Button } from '@chakra-ui/react'
import { Text } from '@chakra-ui/react'
import { Input } from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { useToast } from '@chakra-ui/react'
import { Spinner } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'

const Register = () => {
  const navigate = useNavigate();
  const[input, setInput] = useState({
    username : "", 
    password : "",
    
  });
  const toast = useToast()
  const[loading, setLoading] = useState(false);

  const handleSubmit=async(e)=>{ 
    e.preventDefault();
    setLoading(true);
    if(!input.username || !input.password){
      toast({
        title: 'All fields are required!',
        description: 'Unable to create user account.',
        status: 'error',
        duration: 2000,
        isClosable: true,
        position:'top-right',
      })
      return;
    }
    try {
     const userData ={
       username :input.username,
       password :input.password,
     }
     const userInfo = await axios.post("http://localhost:8000/api/v1/auth/register", 
      userData, {
        headers:{
          "Content-Type":"application/json",
        }
      });
    //console.log(userInfo.data);
    localStorage.setItem("userInfo",JSON.stringify(userInfo.data));
    setLoading(false);
    toast({
      title: 'Account created.',
      description: "We've created your account for you.",
      status: 'success',
      duration: 2000,
      isClosable: true,
      position:'top-right',
    })
    navigate('/dashboard')
    } catch (error) {
       console.log(error);
       toast({
        title: 'An error occurred.',
        description: 'Unable to create user account.',
        status: 'error',
        duration: 2000,
        isClosable: true,
        position:'top-right',
      })
      setLoading(false);
    }
    
  };
  const handleChange=(e)=>{
   setInput({...input, [e.target.name] : e.target.value});
  };
  return (
    <Box
    h="100vh"
    w="100%"
    display="flex"
    justifyContent="center"
    alignItems="center"
    backgroundColor='#00acc1'
  >
    <Box
      h="85vh"
      w="50%"
      border="1.5px solid white"
      borderRadius='15'
      display="flex"
      flexDir="column"
    >
      <Text fontSize="5xl" textAlign="center">
        REGISTER
      </Text>
      <form onSubmit={handleSubmit}>
        <Box display="flex" padding="5" flexDir="column" gap="5">
          <Box display="flex" flexDirection="column">
            <Text fontSize="3xl">Username</Text>
            <Input
              type="text"
              placeholder="Enter Your Username"
              size="md"
              variant="filled"
              name="username"
              value={input.username}
              onChange={(e) => handleChange(e)}
            />
          </Box>
          <Box display="flex" flexDirection="column">
            <Text fontSize="3xl">Password</Text>
            <Input
              type="password"
              placeholder="Enter Your Password"
              size="md"
              variant="filled"
              name="password"
              value={input.password}
              onChange={(e) => handleChange(e)}
            />
          </Box>
          {
            loading ? 
            (
             <Button colorScheme="pink">
             <Spinner color='white.800' />
             </Button>
            )
            :
            (
          <Button type="submit" colorScheme="pink" >
            Register
          </Button>
            )
          }
         
          <Text textAlign="center">
            Already Have An Account,
            <Link to="/login">
              <b style={{ marginLeft: 15, color: "yellow" }}>
                Go To Login
              </b>
            </Link>
          </Text>
        </Box>
      </form>
    </Box>
  </Box>
  )
}

export default Register
