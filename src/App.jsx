import React, { useContext, useState } from "react";
import Menubar from "./components/menubar/Menubar";
import {Routes} from 'react-router-dom'
import {Route} from 'react-router-dom'
import Home from "./pages/Home/Home";
import Contact from "./pages/Contact Us/Contact";
import ExploreFood from "./pages/Explore/ExploreFood";
import FoodDetails from "./pages/FoodDetails/FoodDetails";
import Cart from "./pages/Cart/Cart";
import PlaceOrder from "./pages/PlaceOrder/PlaceOrder";
import Login from "./Login/Login";
import Register from "./Register/Register";
import { ToastContainer,toast } from "react-toastify";
import Myorders from "./pages/MyOrders/Myorders";
import OrderById from "./pages/MyOrders/OrdersById/OrderById";
import { StoreContext } from "./context/StoreContext";




const App = () => {
  const{token}=useContext(StoreContext);
  
  return (
    <div>
      <Menubar />
      <ToastContainer/>      
      <Routes>
        <Route path="/login" element={token?<Home/>:<Login/>}></Route>
        <Route path="/register" element={token?<Home/>:<Register/>}></Route>

       <Route path="/home" element={<Home/>}></Route>
       <Route path="/contact" element={<Contact/>}></Route>
       <Route path="/explore-foods" element={<ExploreFood />}></Route>
       <Route path="/cart" element={<Cart/>}></Route>
       <Route path="/food/:id" element={<FoodDetails/>}></Route>
       <Route path="/order" element={token?<PlaceOrder/>:<Login/>}></Route>
       <Route path="/myorders" element={token?<Myorders/>:<Login/>}></Route>
       <Route path="/myorders/:id" element={<OrderById/>}></Route>
       
       <Route path="/" element={<Home/>}></Route>
      </Routes>
    </div>
  );
};

export default App;
