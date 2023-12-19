import React from 'react'
import { Box } from '@chakra-ui/react'
import Navbar from '../../components/Navbar/Navbar'
import {useGetProducts} from "../../hooks/useGetProducts"
import Products from '../../components/Products/Products'

const Dashboard = () => {

  const {products} = useGetProducts();
  
  
  return (
    <Box
      minHeight="100vh"
      w="100%"
      display="flex"
      flexDirection="column"
       background='#0277bd'
      backgroundPosition='center'
      backgroundSize='100%'
      backgroundRepeat='no-repeat'
    >
      <Navbar />
      <Box display="flex" p='2'>
        <Box display="flex" flexWrap="wrap" gap="5">
          {products.map((product) => {
            return <Products product={product} key={product._id} />;
          })}
        </Box>
      </Box>
    </Box>
  );
}

export default Dashboard
