import axios from "axios";
import { toast } from "react-toastify";
const APP_URL = "https://foodingo.onrender.com";

export const registerUser = async (newUser) => {
  try {
    const response = await axios.post(
      `${APP_URL}/api/user/register`,
      newUser
    );
    return response.status;
  } catch (error) {
    toast.error("Error in register");
  }
};

export const login = async (data) => {
    console.log("from func",data);
    
  try {
    const response = await axios.post(
      `${APP_URL}/api/user/login`,data);
    return response;
  } catch (error) {
    toast.error("User Id and password not found"); 
  }
};
