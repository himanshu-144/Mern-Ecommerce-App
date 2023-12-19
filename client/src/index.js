import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {ChakraProvider} from "@chakra-ui/react"
import ShopContext from './context/ShopContext';
import {BrowserRouter} from "react-router-dom"
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ChakraProvider>
  <BrowserRouter>
   <ShopContext>
    <React.StrictMode>
      <App />
    </React.StrictMode>
   </ShopContext>
   </BrowserRouter>
  </ChakraProvider>
  
);


