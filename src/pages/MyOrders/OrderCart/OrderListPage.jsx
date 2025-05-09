import React from "react";
import { useNavigate } from "react-router-dom";
import "./ordercart.css";

const OrderListPage = ({ order }) => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const handleRowClick = (orderId, token) => {
    navigate(`/myorders/${orderId}`);
  };

  const statusBadgeMap = {
    "Out For Delivery": "bg-primary",
    Rejected: "bg-danger",
    Delivered: "bg-success",
  };

  return (
    <div className="list-group">
      <div
        key={order.id}
        className="list-group-item list-group-item-action order-row d-flex justify-content-between align-items-center"
        onClick={() => handleRowClick(order.id)}
      >
        <div>
          <h6 className="mb-1">
            ₹{order.amount / 100} - {order.email}
          </h6>
          <small>{order.userAddress}</small>
        </div>
        <div className="text-end">
          <span
            className={`badge me-3 ${
              order.paymentStatus === "paid"
                ? "bg-success"
                : "bg-warning text-dark"
            }`}
          >
            {order.paymentStatus}
          </span>

          <span className={`badge ${statusBadgeMap[order.orderStatus] || "bg-warning"}`}>
  {order.orderStatus}
</span>


          <br />
          <small>ID: {order.id.slice(-6)}</small>
          
          
        </div>
      </div>
    </div>
  );
};

export default OrderListPage;
