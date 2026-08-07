import { toast } from "react-toastify";
import { api } from "../config/api.js";

export const registerUser = async (newUser) => {
  try {
    const response = await api.post("/api/user/register", newUser);
    return response.status;
  } catch (error) {
    toast.error("Error in register");
  }
};

export const login = async (data) => {
  console.log("from func", data);

  try {
    const response = await api.post("/api/user/login", data);
    return response;
  } catch (error) {
    toast.error("User Id and password not found");
  }
};
