import React, { createContext, useContext, useEffect, useState } from 'react'
import { useCookies } from "react-cookie";
import axios from 'axios';
import { useGetProducts } from '../hooks/useGetProducts';
import { useNavigate } from 'react-router-dom';

const CreateShopContext = createContext();


const ShopContext = ({children}) => {

  const navigate = useNavigate();

  const {products,fetchProducts} = useGetProducts();

  const [cookies, setCookies] = useCookies(["access_token"]);
  const [cartItems, setCartItems] = useState({});
  const [availableMoney, setAvailableMoney] = useState(0);
  const [purchasedItems, setPurchaseItems] = useState([]); 
  const [isAuthenticated, setIsAuthenticated] = useState(cookies.access_token !== null);

  const getCartItemCount = (itemId) => {
    if (itemId in cartItems) {
      return cartItems[itemId];
    }
      return 0;
  };

  const addToCart=(itemId)=>{
      if(!cartItems[itemId]){
        setCartItems((prev)=>({...prev, [itemId] :1}));
      }
      else{
        setCartItems((prev)=>({...prev, [itemId] : prev[itemId] + 1}));
      }
  };

  const removeItemFromCart=(itemId)=>{
      if(!cartItems[itemId]){
        return;
      }
      else if(cartItems[itemId] === 0) return;
      else{
        setCartItems((prev)=>({...prev, [itemId] : prev[itemId] -1}));
      }
  };

  const updateCartItemCount=(newAmount,itemId)=>{
    setCartItems((prev) => ({...prev, [itemId] : newAmount}));
  };

  const clearCart=()=>{
     setCartItems({});
  };

  const fetchAvailableMoney = async () => {
    const userID = JSON.parse(localStorage.getItem("userInfo"))
    const res = await axios.get(
      `http://localhost:8000/api/v1/auth/available-money/${userID.user._id}`,
       {
        headers:{
          Authorization : `${cookies.access_token}`
        }
       }
    );
    setAvailableMoney(res.data.availableMoney);
  };

  const fetchPurchasedItems = async () => {
    const userID = JSON.parse(localStorage.getItem("userInfo"));
    const res = await axios.get(
      `http://localhost:8000/api/v1/product/purchased-items/${userID.user._id}`,
      {
        headers:{
          Authorization : `${cookies.access_token}`
        }
       }
    );
     
     setPurchaseItems(res.data.purchasedItems);
  };

  const getTotalCartAmount = () => {
    if (products.length === 0) return 0;

    let totalAmount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        let itemInfo = products.find((product) => product._id === item);
        totalAmount += cartItems[item] * itemInfo.productPrice;
      }
    }
    return Number(totalAmount.toFixed(2));
  };

 
  
  const checkout = async () => {
    const customerID = JSON.parse(localStorage.getItem("userInfo"));
    const body = { customerID: customerID.user._id, cartItems };
    try {
      const res = await axios.post(
        "http://localhost:8000/api/v1/product/checkout",body,
        {
          headers:{
            Authorization : `${cookies.access_token}`
          }
        }
      );
      setPurchaseItems(res.data.purchasedItems);
      fetchAvailableMoney();
      fetchProducts();
      navigate('/')
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(()=>{
    if(isAuthenticated){
      fetchAvailableMoney();
      fetchPurchasedItems();
    }
  },[isAuthenticated])

  useEffect(() => {
    if (!isAuthenticated) {
      localStorage.clear();
      setCookies("access_token", null);
    }
  }, [isAuthenticated]);


  return (
    <CreateShopContext.Provider
      value={{
        addToCart,
        removeItemFromCart,
        updateCartItemCount,
        cartItems,
        getCartItemCount,
        clearCart,
        fetchAvailableMoney,
        fetchPurchasedItems,
        getTotalCartAmount,
        checkout,
        isAuthenticated, 
        purchasedItems,
        setIsAuthenticated,
        availableMoney

      }}
    >
      {children}
    </CreateShopContext.Provider>
  );
}

export default ShopContext

export const useGlobalContext=()=>{
    return useContext(CreateShopContext);
}

