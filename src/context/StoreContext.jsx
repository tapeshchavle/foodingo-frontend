import { createContext, useEffect, useState } from "react";
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

  // Initialize token from localStorage to persist login state
  const [token, setToken] = useState(localStorage.getItem("token") || "");

  // Initialize theme from localStorage or system preference
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  const increaseQty = async (foodId) => {
    setQuantities((prev) => ({ ...prev, [foodId]: (prev[foodId] || 0) + 1 }));
    if (token) await addFood(foodId, token);
  };

  const decreaseQty = async (foodId) => {
    setQuantities((prev) => ({
      ...prev,
      [foodId]: prev[foodId] > 0 ? prev[foodId] - 1 : 0,
    }));
    if (token) await decFoodQty(foodId, token);
  };

  const removeItem = async (foodId) => {
    setQuantities((prev) => ({ ...prev, [foodId]: 0 }));
    if (token) await delteItemFromCart(token);
  };

  const removeCart = async () => {
    setQuantities({});
    if (token) await deleteCart(token);
  };

  const loadCartData = async (token) => {
    try {
      const response = await loadCart(token);
      // Ensure we handle the response correctly based on API structure
      if (response && response.data && response.data.items) {
        setQuantities(response.data.items);
      }
    } catch (error) {
      console.error("Failed to load cart data:", error);
    }
  };

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  };

  // Effect to apply theme class
  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove("light", "dark");
    root.classList.add(theme);
  }, [theme]);

  // Initial Data Load
  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await fetchFoodList();
        setFoodList(data);
        if (localStorage.getItem("token")) {
          setToken(localStorage.getItem("token"));
          await loadCartData(localStorage.getItem("token"));
        }
      } catch (error) {
        console.error("Error loading initial data:", error);
      }
    };
    loadData();
  }, []);

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
    theme,
    toggleTheme
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};
