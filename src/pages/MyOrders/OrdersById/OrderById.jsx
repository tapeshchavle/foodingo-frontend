import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getOrderByOrderId } from "../myorder";
import { toast } from "react-toastify";
import { ArrowLeft, CheckCircle, Clock } from "lucide-react";

const OrderById = () => {
  const token = localStorage.getItem("token");
  const { id } = useParams();
  const [order, setOrder] = useState({ orderedItems: [] });

  useEffect(() => {
    getOrderById();
  }, [id]);

  const getOrderById = async () => {
    try {
      const response = await getOrderByOrderId(id, token);
      if (response.status === 200) {
        setOrder(response.data);
      }
    } catch (error) {
      toast.error("Order is not found");
    }
  };

  const statusSteps = ["Preparing", "Cooking", "Out For Delivery", "Delivered"];
  const currentStepIndex = statusSteps.indexOf(order.orderStatus) !== -1 ? statusSteps.indexOf(order.orderStatus) : 0;

  return (
    <div className="container py-8 px-4 md:px-8 max-w-4xl mx-auto">
      <Link to="/myorders" className="inline-flex items-center gap-2 text-gray-500 hover:text-primary mb-6 transition-colors">
        <ArrowLeft size={18} /> Back to Orders
      </Link>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        {/* Header */}
        <div className="bg-gray-50 p-6 border-b border-gray-100 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-1">Order #{order.id?.slice(-6).toUpperCase()}</h1>
            <p className="text-sm text-gray-500">Placed on {new Date().toLocaleDateString()}</p>
          </div>
          <div className="flex gap-3">
            <span className={`px-3 py-1 rounded-full text-sm font-bold ${order.paymentStatus === 'paid' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
              {order.paymentStatus === 'paid' ? 'Paid' : 'Unpaid'}
            </span>
            <span className="px-3 py-1 rounded-full text-sm font-bold bg-primary/10 text-primary">
              {order.orderStatus}
            </span>
          </div>
        </div>

        {/* Progress Logic (Simple Visual) */}
        <div className="p-6 md:p-8 bg-white border-b border-gray-100">
          <div className="relative">
            <div className="absolute top-1/2 left-0 w-full h-1 bg-gray-100 -translate-y-1/2 rounded-full"></div>
            <div
              className="absolute top-1/2 left-0 h-1 bg-primary -translate-y-1/2 rounded-full transition-all duration-1000"
              style={{ width: `${(currentStepIndex / (statusSteps.length - 1)) * 100}%` }}
            ></div>

            <div className="relative flex justify-between">
              {statusSteps.map((step, index) => {
                const isCompleted = index <= currentStepIndex;
                return (
                  <div key={step} className="flex flex-col items-center gap-2">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center z-10 border-2 ${isCompleted ? 'bg-primary border-primary text-white' : 'bg-white border-gray-200 text-gray-300'}`}>
                      {index < currentStepIndex ? <CheckCircle size={16} /> : <div className="w-2 h-2 bg-current rounded-full"></div>}
                    </div>
                    <span className={`text-xs font-medium ${isCompleted ? 'text-gray-900' : 'text-gray-400'}`}>{step}</span>
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        {/* Details Content */}
        <div className="p-6 md:p-8 grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="font-bold text-gray-900 mb-4">Delivery Details</h3>
            <div className="space-y-3 text-sm text-gray-600">
              <p><span className="font-medium text-gray-900 block mb-1">Address</span> {order.userAddress}</p>
              <p><span className="font-medium text-gray-900 block mb-1">Phone</span> {order.phoneNumber}</p>
              <p><span className="font-medium text-gray-900 block mb-1">Email</span> {order.email}</p>
            </div>
          </div>

          <div>
            <h3 className="font-bold text-gray-900 mb-4">Order Items</h3>
            <div className="space-y-3">
              {order.orderedItems?.map((item, index) => (
                <div key={index} className="flex justify-between items-center py-2 border-b border-gray-50 last:border-0">
                  <div className="flex items-center gap-3">
                    <span className="bg-gray-100 text-gray-600 text-xs font-bold px-2 py-1 rounded">{item.quantity}x</span>
                    <span className="text-gray-700 font-medium">{item.name}</span>
                  </div>
                  {/* Price per item isn't in item object usually, only total or unit price? Assuming item.price is unit price */}
                  <span className="text-gray-900">₹{item.price * item.quantity}</span>
                </div>
              ))}
            </div>
            <div className="mt-4 pt-4 border-t border-gray-100 flex justify-between items-center">
              <span className="font-bold text-lg text-gray-900">Total Amount</span>
              <span className="font-bold text-xl text-primary">₹{order.amount / 100}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderById;
