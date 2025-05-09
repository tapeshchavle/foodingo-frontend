import React, { useEffect, useState } from 'react'
import { getAllOrders } from './myorder';
import FancyOrderCard from './OrderCart/OrderListPage';
import OrderListPage from './OrderCart/OrderListPage';

const Myorders = () => {
   const token = localStorage.getItem("token");
   const [orders,setOrders]=useState([]);
   useEffect(()=>{
     getOrders();
   },[orders])

   const getOrders=async()=>{
      try{
        const response=await getAllOrders(token);
        console.log("resp is:",response);
        setOrders(response.data);   
      }catch(error){
        console.log("some error");
      }
   }
      
   
  return (
    <div className="container mt-4">
      <h3 className="mb-4">Orders</h3>
      {
            orders.map((item,index)=>(
                <OrderListPage order={item} key={index}  />
            ))
        }
      
    </div>
       
  )
}

export default Myorders


