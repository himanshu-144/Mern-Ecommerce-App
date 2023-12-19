import React from 'react'
import { Box,Button,Text } from '@chakra-ui/react'
import Navbar from '../../components/Navbar/Navbar'
import { useGetProducts } from '../../hooks/useGetProducts'
import { useGlobalContext } from '../../context/ShopContext'
import CartItems from '../../components/CartItems/CartItems'
import Summary from '../../components/Summary/Summary'

const Checkout = () => {

  const {products} = useGetProducts();
  const {getCartItemCount,clearCart} = useGlobalContext();
  
  return (
    <Box
      minHeight="100vh"
      w="100%"
      display="flex"
      flexDirection="column"
      background="#0277bd"
      backgroundPosition="center"
      backgroundSize="100%"
      backgroundRepeat="no-repeat"
      
    >
      <Navbar />
      <Text textAlign="center" margin="3px 0px" fontSize="22">
        Your Cart Items
      </Text>
      <Box w="100%" h="100%" display="flex" p="2">
        <Box
          w="80%"
          border="1px solid white"
          display="flex"
          flexWrap='wrap'
          gap="10px"
          p='2'
          justifyContent='center'
          
        >
          {products.map((product) => {
            if (getCartItemCount(product._id) !== 0) {
              return <CartItems product={product} />;
            }
          })}
        </Box>

        <Box w="20%" border="1px solid white" display='flex' flexDirection='column' alignItems='center'>
          <Summary />
        </Box>
      </Box>
        <Button marginBottom='3'  onClick={()=>clearCart()}>Clear Cart</Button>
     
    </Box>
  );
}

export default Checkout
