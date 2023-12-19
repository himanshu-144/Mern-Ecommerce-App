import React, { useState} from 'react'
import { Box, Button } from '@chakra-ui/react'
import { Text } from '@chakra-ui/react'
import { Input } from '@chakra-ui/react'
import { Link} from 'react-router-dom'
import axios from "axios"
import { useNavigate } from 'react-router-dom'
import { useToast } from '@chakra-ui/react'
import { Spinner } from '@chakra-ui/react'
import {useCookies} from "react-cookie"
import { useGlobalContext } from '../../context/ShopContext'

const Login = () => {
  const {setIsAuthenticated  }= useGlobalContext();
  const navigate = useNavigate();
  const[username, setUsername] = useState("");
  const[password, setPassword] = useState("");
  const[_, setCookie] = useCookies(['access_token']);
  const toast = useToast()
  const[loading, setLoading] = useState(false);
  const handleSubmit = async(e)=>{ 
    e.preventDefault();
    setLoading(true);
    if(!username || !password){
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
      const userData= {
        username :username,
        password :password,
      }
      const userInfo= await axios.post("http://localhost:8000/api/v1/auth/login", 
      userData, {
        headers:{
          "Content-Type" :"application/json"
        }
      });
    
    //console.log(userInfo.data);
    localStorage.setItem("userInfo", JSON.stringify(userInfo.data));
    setCookie('access_token',userInfo.data.token)
    setLoading(false);
    toast({
      title: 'Login Successfull.',
      description: "Grab your favorite products.",
      status: 'success',
      duration: 2000,
      isClosable: true,
      position:'top-right',
    })
    setIsAuthenticated(true);
    navigate('/dashboard')
    } catch (error) {
      toast({
        title: 'Failed to login',
        description: 'Unable to login.',
        status: 'error',
        duration: 2000,
        isClosable: true,
        position:'top-right',
      })
      setLoading(false);
    }
  };
 
  return (
    <Box
      h="100vh"
      w="100%"
      display="flex"
      justifyContent="center"
      alignItems="center"
      backgroundColor='#ec407a'
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
          LOGIN
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
                value={username}
                onChange={(e) =>setUsername(e.target.value)}
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
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Box>
            {
              loading ? 
            (
             <Button colorScheme="linkedin">
             <Spinner color='white.800' />
             </Button>
            ):
            (
              <Button type="submit" colorScheme="linkedin">
              Login
            </Button>
            )
            }
             <Text textAlign="center">
              Don't Have An Account?
              <Link to="/register">
                <b style={{ marginLeft: 15, color: "yellow" }}>
                  Create An Account
                </b>
              </Link>
            </Text>
          </Box>
        </form>
      </Box>
    </Box>
  );
}

export default Login
