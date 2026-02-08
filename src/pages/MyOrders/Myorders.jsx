import React, { useEffect, useState } from 'react'
import { getAllOrders } from './myorder';
import OrderListPage from './OrderCart/OrderListPage';
import { Package } from 'lucide-react';

const Myorders = () => {
  const token = localStorage.getItem("token");
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    getOrders();
  }, [orders])

  const getOrders = async () => {
    try {
      const response = await getAllOrders(token);
      setOrders(response.data);
    } catch (error) {
      console.log("Error fetching orders");
    }
  }

  return (
    <div className="container py-8 px-4 md:px-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold font-heading mb-8 flex items-center gap-3 text-gray-900 dark:text-white">
        <Package className="text-primary" size={32} />
        My Orders
      </h1>

      {orders.length > 0 ? (
        <div className="space-y-4">
          {orders.map((item, index) => (
            <OrderListPage order={item} key={index} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-gray-50 dark:bg-gray-800 rounded-2xl border border-dashed border-gray-200 dark:border-gray-700">
          <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-400">
            <Package size={32} />
          </div>
          <h3 className="text-xl font-bold text-gray-700 dark:text-gray-200 mb-2">No orders yet</h3>
          <p className="text-gray-500 dark:text-gray-400">Go ahead and explore our menu to place your first order.</p>
        </div>
      )}
    </div>
  )
}

export default Myorders
