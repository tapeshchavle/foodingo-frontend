import axios from "axios";
const APP_URL = "https://foodingo.onrender.com";
export const addFood = async (foodId, jwt) => {
  const response = await axios.post(
    `${APP_URL}/api/cart`,
    { foodId },
    { headers: { Authorization: `Bearer ${jwt}` } }
  );
};

export const decFoodQty = async (foodId, jwt) => {
  const response = await axios.post(
    `${APP_URL}/api/cart/remove`,
    { foodId },
    { headers: { Authorization: `Bearer ${jwt}` } }
  );
};

export const deleteCart = async (jwt) => {
  const response = await axios.delete(`${APP_URL}/api/cart/delete`, {
    headers: { Authorization: `Bearer ${jwt}` },
  });
};

export const loadCart = async (token) => {
  const response = await axios.get(`${APP_URL}/api/cart`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response;
};

export const delteItemFromCart = async (jwt) => {
  const response = await axios.delete(`${APP_URL}/api/cart/delete-cart`, {
    headers: { Authorization: `Bearer ${jwt}` },
  });
};
