import React from 'react'
import { Box ,Heading,Text} from '@chakra-ui/react'
import { FaCartShopping } from "react-icons/fa6";
import { FiLogOut } from "react-icons/fi";
import { Link, useNavigate } from 'react-router-dom';
import { useGlobalContext } from '../../context/ShopContext';
import { useCookies } from "react-cookie";

const Navbar = () => {
  const [_, setCookies] = useCookies(["access_token"]);
  const {  availableMoney} = useGlobalContext();
  const { getTotalCartAmount} = useGlobalContext();
  const totalAmount = getTotalCartAmount();
  const navigate = useNavigate();

  const handleLogout=()=>{
    localStorage.clear();
    setCookies("access_token", null);
    navigate('/');
  };

  return (
    <Box
      h="65px"
      w="100%"
      p="3px 15px"
      display="flex"
      alignItems="center"
      color="white"
      justifyContent="space-between"
      boxShadow="0px 2px 5px 1px white"
    >
      <Heading as="h2" size="xl">
        Brand Jam
      </Heading>
      <Box display="flex" alignItems="center" gap="5">
        <Link to="/dashboard">
          <Text fontSize="2xl">Shop</Text>
        </Link>
        <FaCartShopping
          fontSize={22}
          cursor="pointer"
          onClick={() => navigate("/checkout")}
          />
        <Text>{(availableMoney - totalAmount).toFixed(2)}</Text>
        <FiLogOut fontSize={22} cursor="pointer" onClick={()=>handleLogout()} />
      </Box>
    </Box>
  );
}

export default Navbar
