import axios from "axios";
import { toast } from 'react-toastify'
const APP_URL = "https://foodingo-api-awasc8h4d7d7cmft.centralindia-01.azurewebsites.net"
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

