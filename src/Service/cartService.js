import { api } from "../config/api.js";

export const addFood = async (foodId, jwt) => {
  await api.post(
    "/api/cart",
    { foodId },
    { headers: { Authorization: `Bearer ${jwt}` } }
  );
};

export const decFoodQty = async (foodId, jwt) => {
  await api.post(
    "/api/cart/remove",
    { foodId },
    { headers: { Authorization: `Bearer ${jwt}` } }
  );
};

export const deleteCart = async (jwt) => {
  await api.delete("/api/cart/delete", {
    headers: { Authorization: `Bearer ${jwt}` },
  });
};

export const loadCart = async (token) => {
  const response = await api.get("/api/cart", {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response;
};

export const delteItemFromCart = async (jwt) => {
  await api.delete("/api/cart/delete-cart", {
    headers: { Authorization: `Bearer ${jwt}` },
  });
};
