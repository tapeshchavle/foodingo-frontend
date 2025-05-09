import React, { useEffect, useState } from "react";
import "./orderbyid.css";
import { useParams } from "react-router-dom";
import { getOrderByOrderId } from "../myorder";
import { toast } from "react-toastify";

const OrderById = () => {
  const token = localStorage.getItem("token");
  const { id } = useParams();
  console.log("id is:", id);

  const [order, setOrder] = useState({ orderedItems: [] });

  useEffect(() => {
    getOrderById();
  }, [id]);

  const getOrderById = async () => {
    try {
      const response = await getOrderByOrderId(id, token);
      console.log("order by is:", response);
      if (response.status == 200) {
        setOrder(response.data);
      }
    } catch (error) {
      toast.error("Order is not found");
    }
  };
  const statusBadgeMap = {
    "Out For Delivery": "bg-primary",
    Rejected: "bg-danger",
    Delivered: "bg-success",
  };

  console.log(order);

  return (
    <div className="container my-4">
      <div className="card fancy-card shadow rounded-4">
        <div className="card-header bg-dark text-white d-flex justify-content-between align-items-center">
          <h5 className="mb-0">Order Summary</h5>
          <span className="badge bg-primary fs-6">#{order.id}</span>
        </div>
        <div className="card-body">
          <p>
            <strong>Amount:</strong> ₹{order.amount / 100}
          </p>
          <p>
            <strong>Email:</strong> {order.email}
          </p>
          <p>
            <strong>Phone:</strong> {order.phoneNumber}
          </p>
          <p>
            <strong>Payment Status:</strong>{" "}
            <span
              className={`badge ${
                order.paymentStatus === "paid"
                  ? "bg-success"
                  : "bg-warning text-dark"
              }`}
            >
              {order.paymentStatus}
            </span>
          </p>
          <p>
            <strong>Order Status: </strong>
            <span
              className={`badge ${
                statusBadgeMap[order.orderStatus] || "bg-warning"
              }`}
            >
              {order.orderStatus}
            </span>
          </p>
          <p>
            <strong>Address:</strong> {order.userAddress}
          </p>
          <p>
            <strong>Razorpay Order ID:</strong> {order.razorpayOrderId}
          </p>
          <hr />
          <h6>Ordered Items:</h6>
          <ul className="list-group mb-3">
            {order.orderedItems?.map((item, index) => (
              <li
                key={index}
                className="list-group-item d-flex justify-content-between align-items-center"
              >
                {item.name}
                <span className="badge bg-secondary">{item.quantity}x</span>
              </li>
            ))}
          </ul>
          <p className="text-muted">
            <small>User ID: {order.userId}</small>
          </p>
        </div>
      </div>
    </div>
  );
};

export default OrderById;
