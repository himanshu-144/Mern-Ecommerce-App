import React from 'react'
import { Box ,Button,Heading,Text} from '@chakra-ui/react'
import { useGlobalContext } from '../../context/ShopContext'
import { useNavigate } from 'react-router-dom'
const Summary = () => {
   const navigate = useNavigate();
   const { getTotalCartAmount, checkout} = useGlobalContext();
   const totalAmount = getTotalCartAmount();

   const handleCheckOut=()=>{
    const userID = JSON.parse(localStorage.getItem("userInfo"))
    checkout(userID.user._id);
   }
   
  return (
    <Box display='flex' gap='5' flexDirection='column'>
      <Text fontSize='24'  fontWeight='600'>Summary</Text>
      {
        totalAmount > 0 
        ?
         ( 
            <>
            <Text fontSize='20'>Subtotal : ${totalAmount}</Text>
            <Button colorScheme='yellow' onClick={()=>navigate('/dashboard')}>Continue Shopping</Button>
            <Button colorScheme='red' onClick={()=>handleCheckOut()}>Checkout</Button>
            </>
        ) 
        :
        (
          <Heading>Your cart is Empty</Heading>
        )
      }
     
    </Box>
  )
}

export default Summary
