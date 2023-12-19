import React from 'react'
import {Card, CardBody, Image, Stack, Heading, Text,Divider,CardFooter,ButtonGroup,Button} from "@chakra-ui/react"
import { useGlobalContext } from '../../context/ShopContext';

const Products = ({product}) => {

  const {addToCart,getCartItemCount} = useGlobalContext();

  const count = getCartItemCount(product._id);
  
  return (
    <Card w="400px" maxH="500px">
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
          <Text>{product.description}</Text>
          <Text color="blue.700" fontSize="xl">
          <span style={{color:`${product.quantity > 10 ? '#6a1b9a': '#e53935'}`}}>
          Quantity : 
          {product.quantity === 0 ?  "Out Of Stock" : product.quantity}
          </span> 
          <br />
          ${product.productPrice} 
          </Text>
        </Stack>
      </CardBody>
      <Divider />
      <CardFooter>
        <Button variant="solid" colorScheme="blue" onClick={()=>addToCart(product._id)}>
          Add to cart {count > 0 && <p style={{marginLeft:15,color:'#ffff00'}}>{count}</p> }
        </Button>
      </CardFooter>
    </Card>
  );
}

export default Products
