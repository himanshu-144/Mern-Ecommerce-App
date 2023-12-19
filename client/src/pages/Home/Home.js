import React from 'react'
import { Box, Button } from '@chakra-ui/react'
import { Heading } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'
const Home = () => {
  const navigate = useNavigate();
  return (
    <Box
      h="100vh"
      w="100%"
      display="flex"
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
      gap='4'
      backgroundImage='https://img.freepik.com/premium-vector/online-shopping-digital-technology-with-icon-blue-background-ecommerce-online-store-marketing_252172-219.jpg'
      backgroundPosition='center'
      backgroundSize='100%'
      backgroundRepeat='no-repeat'
    >
      <Heading as="h2" size="2xl">
        Brand Jam 
      </Heading>
      <Heading as="h1" size="xl">
        Ensuring the best welfare of the buyers
      </Heading>
      <Box display='flex' gap='10' marginTop='15'>
      <Button colorScheme="pink" size="lg" onClick={()=>navigate('/login')}>
        LOGIN
      </Button>
      <Button colorScheme="teal" size="lg" onClick={()=>navigate('/register')}>
        REGISTER
      </Button>
      </Box>
      
    </Box>
  );
}

export default Home
