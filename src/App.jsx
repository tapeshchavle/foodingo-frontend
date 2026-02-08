import React, { useContext, useState } from "react";
import { Routes, Route, useLocation } from 'react-router-dom'
import Home from "./pages/Home/Home";
import Contact from "./pages/Contact Us/Contact";
import ExploreFood from "./pages/Explore/ExploreFood";
import FoodDetails from "./pages/FoodDetails/FoodDetails";
import Cart from "./pages/Cart/Cart";
import PlaceOrder from "./pages/PlaceOrder/PlaceOrder";
import Login from "./Login/Login";
import Register from "./Register/Register";
import { ToastContainer } from "react-toastify";
import Myorders from "./pages/MyOrders/Myorders";
import OrderById from "./pages/MyOrders/OrdersById/OrderById";
import { StoreContext } from "./context/StoreContext";
import Layout from "./components/Layout/Layout";
import { AnimatePresence } from "framer-motion";

const App = () => {
  const { token } = useContext(StoreContext);
  const location = useLocation();

  return (
    <Layout>
      <ToastContainer position="bottom-right" theme="colored" />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/login" element={token ? <Home /> : <Login />}></Route>
          <Route path="/register" element={token ? <Home /> : <Register />}></Route>

          <Route path="/home" element={<Home />}></Route>
          <Route path="/contact" element={<Contact />}></Route>
          <Route path="/explore-foods" element={<ExploreFood />}></Route>
          <Route path="/cart" element={<Cart />}></Route>
          <Route path="/food/:id" element={<FoodDetails />}></Route>
          <Route path="/order" element={token ? <PlaceOrder /> : <Login />}></Route>
          <Route path="/myorders" element={token ? <Myorders /> : <Login />}></Route>
          <Route path="/myorders/:id" element={<OrderById />}></Route>

          <Route path="/" element={<Home />}></Route>
        </Routes>
      </AnimatePresence>
    </Layout>
  );
};

export default App;
