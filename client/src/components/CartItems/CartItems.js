import React from 'react'
import {Card, CardBody, Image, Stack, Heading,Text,Divider,CardFooter,Button} from "@chakra-ui/react"
import { FaArrowUp } from "react-icons/fa";
import { FaArrowDown } from "react-icons/fa";
import { useGlobalContext } from '../../context/ShopContext';

const CartItems = ({product}) => {

    const {getCartItemCount, addToCart, removeItemFromCart, updateCartItemCount} = useGlobalContext();

    const cartItemsCount = getCartItemCount(product._id);

  return (
    <Card w="310px" maxH="400px">
      <CardBody>
        <Image
          src={product.imageURL}
          alt={product.productName}
          h="200px"
          w="100%"
          objectFit="cover"
          borderRadius="lg"
        />
        <Stack mt="2" spacing="1">
          <Heading size="md">{product.productName}</Heading>
          <Text color="blue.700" fontSize="xl">
            ${product.productPrice}
          </Text>
        </Stack>
      </CardBody>
      <Divider />
      <CardFooter display='flex' gap='2' justifyContent='center'>
        <Button backgroundColor='#3f51b5' onClick={()=>addToCart(product._id)}>
        <FaArrowUp />
        </Button>
        <input value={cartItemsCount} type='text' style={{width:20,height:20,textAlign:"center"}}
           onChange={(e)=>updateCartItemCount(e.target.value, product._id)}
         />
        <Button backgroundColor='#f44336' onClick={()=>removeItemFromCart(product._id)}>
        <FaArrowDown />
        </Button>
      </CardFooter>
      
    </Card>
  );
}

export default CartItems
