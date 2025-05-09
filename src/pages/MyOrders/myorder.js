import axios from "axios";
const APP_URL = "https://foodingo.onrender.com";
export const getAllOrders=async(token)=>{
    try{
        const response=await axios.get(`${APP_URL}/api/orders`,{ headers: { Authorization: `Bearer ${token}`}})
        return response;
    }catch(error){
        console.log("some error ");
    }
}

export const getOrderByOrderId = async (orderId, token) => {
    try {
      const response = await axios.get(
        `${APP_URL}/api/orders/${orderId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      //console.log("order is:", response);
      return response;
    } catch (error) {
      console.log("some error", error);
      throw error; // optional: re-throw for caller to handle
    }
  };
  
