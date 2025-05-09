import { createContext, use, useEffect, useState } from "react";
import axios from "axios";
import { fetchFoodList } from "../Service/foodService";
import {
  addFood,
  decFoodQty,
  deleteCart,
  delteItemFromCart,
  loadCart,
} from "../Service/cartService";

export const StoreContext = createContext();

export const StoreContextProvider = (props) => {
  const [foodList, setFoodList] = useState([]);
  const [quantities, setQuantities] = useState({});
  //we will use to store jwt token and provide it to all componenet
  const [token, setToken] = useState("");
  const jwt = localStorage.getItem("token");

  const increaseQty = async (foodId) => {
    setQuantities((prev) => ({ ...prev, [foodId]: (prev[foodId] || 0) + 1 }));
    await addFood(foodId, jwt);
  };

  const decreaseQty = async (foodId) => {
    setQuantities((prev) => ({
      ...prev,
      [foodId]: prev[foodId] > 0 ? prev[foodId] - 1 : 0,
    }));
    await decFoodQty(foodId, jwt);
  };

  const removeItem = async (foodId) => {
    setQuantities((prev) => ({ ...prev, [foodId]: 0 }));
    await delteItemFromCart(jwt);
    
  };

  const removeCart = async () => {
    setQuantities(0);
    await deleteCart(jwt);
  };

  const loadCartData = async (token) => {
    const response = await loadCart(token);
    setQuantities(response.data.items);
  };

  const contextValue = {
    foodList,
    increaseQty,
    decreaseQty,
    quantities,
    setQuantities,
    removeItem,
    token,
    setToken,
    loadCartData,
    removeCart,
  };

  useEffect(async () => {
    const save = async () => {
      const data = await fetchFoodList();
      setFoodList(data);
      await loadCartData(localStorage.getItem("token"));
    };
    save();
  }, []);

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};
