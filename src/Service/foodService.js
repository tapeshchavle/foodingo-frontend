import axios from "axios";
import {toast} from 'react-toastify'
const APP_URL="https://foodingo.onrender.com"
export const fetchFoodList = async () => {
  try {
    const response = await axios.get(`${APP_URL}/api/foods`);
    return response.data;
  } catch (error) {
    console.error("Error fetching food list:", error);
  }
};

export const getFoodById = async (id) => {
  try {
    const response = await axios.get(`${APP_URL}/api/foods/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching food :", error);
  }
};

