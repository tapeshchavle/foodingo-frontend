import { api } from "../config/api.js";

export const fetchFoodList = async () => {
  try {
    const response = await api.get("/api/foods");
    return response.data;
  } catch (error) {
    console.error("Error fetching food list:", error);
  }
};

export const getFoodById = async (id) => {
  try {
    const response = await api.get(`/api/foods/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching food :", error);
  }
};
