import { api } from "../../config/api.js";

export const getAllOrders = async (token) => {
  try {
    const response = await api.get("/api/orders", {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response;
  } catch (error) {
    console.log("some error ");
  }
};

export const getOrderByOrderId = async (orderId, token) => {
  try {
    const response = await api.get(`/api/orders/${orderId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response;
  } catch (error) {
    console.log("some error", error);
    throw error;
  }
};
