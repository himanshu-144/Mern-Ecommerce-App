import { useEffect, useState } from "react"
import axios from "axios"
import {useCookies} from "react-cookie"
import { useGlobalContext } from "../context/ShopContext";

export const useGetProducts = ()=>{

    const[cookies,_] = useCookies(['access_token']);
    const[products, setProducts] = useState([]);
    const isAuthenticated = useGlobalContext();
    const fetchProducts = async()=>{
        try {
            const productData = await axios.get("http://localhost:8000/api/v1/product",{
                headers:{
                    Authorization: `${cookies.access_token}`,
                   
                }
            });
            setProducts(productData.data.products);
        } catch (error) {
            console.log(error);
        }
       
    };

    useEffect(()=>{
     fetchProducts();
    
      
    },[]);

    return { products };
};