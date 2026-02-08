import React from "react";
import { useNavigate } from "react-router-dom";
import { Package, ChevronRight, Clock, MapPin } from "lucide-react";

const OrderListPage = ({ order }) => {
  const navigate = useNavigate();

  const handleRowClick = () => {
    navigate(`/myorders/${order.id}`);
  };

  const statusColorMap = {
    "Out For Delivery": "bg-blue-100 text-blue-700",
    "Delivered": "bg-green-100 text-green-700",
    "Cooking": "bg-orange-100 text-orange-700",
    "Preparing": "bg-yellow-100 text-yellow-700",
    "Rejected": "bg-red-100 text-red-700",
  };

  const statusColor = statusColorMap[order.orderStatus] || "bg-gray-100 text-gray-700";

  return (
    <div
      onClick={handleRowClick}
      className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-5 mb-4 hover:shadow-md transition-shadow cursor-pointer group"
    >
      <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
        <div className="flex items-start gap-4">
          <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg text-gray-600 dark:text-gray-300 group-hover:bg-primary/10 group-hover:text-primary transition-colors">
            <Package size={24} />
          </div>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <h3 className="font-bold text-gray-900 dark:text-white">Order #{order.id.slice(-6).toUpperCase()}</h3>
              <span className={`text-xs px-2 py-1 rounded-full font-medium ${statusColor}`}>
                {order.orderStatus}
              </span>
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-1 mb-1">
              <Clock size={14} />
              {new Date().toLocaleDateString()}
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-1">
              <MapPin size={14} />
              {order.userAddress ? order.userAddress.substring(0, 30) + "..." : "No Address"}
            </p>
          </div>
        </div>

        <div className="flex items-center justify-between md:justify-end gap-6 w-full md:w-auto mt-2 md:mt-0 pt-2 md:pt-0 border-t md:border-t-0 border-gray-100 dark:border-gray-700">
          <div className="text-right">
            <p className="text-xs text-gray-400">Total Amount</p>
            <p className="font-bold text-lg dark:text-white">₹{order.amount / 100}</p>
          </div>
          <div className="hidden md:block text-gray-300 dark:text-gray-600">
            <ChevronRight size={20} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderListPage;
