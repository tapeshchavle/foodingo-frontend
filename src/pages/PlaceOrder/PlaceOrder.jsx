import React, { useContext, useState } from "react";
import "./placeorder.css";
import { StoreContext } from "../../context/StoreContext";
import axios from "axios";
import { toast } from "react-toastify";
import { RAZORPAY_KEY } from "../../util/constants.js";
import { useNavigate } from "react-router-dom";
const PlaceOrder = () => {
  const { foodList, quantities, setQuantities } = useContext(StoreContext);
  const cartItems = foodList.filter((food) => quantities[food.id] > 0);
  const token = localStorage.getItem("token");
   const APP_URL = "https://foodingo.onrender.com";
  const navigate = useNavigate();

  const subtotal = cartItems.reduce(
    (acc, food) => acc + food.price * quantities[food.id],
    0
  );
  const shipping = subtotal === 0 ? 0.0 : 10;
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    address: "",
    state: "",
    country: "",
    city: "",
    zip: "",
  });

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData((data) => ({ ...data, [name]: value }));
  };
  const onSubmitHandler = async (event) => {
    event.preventDefault();
    const orderData = {
      userAddress: `${data.firstName} ${data.lastName}, ${data.address}, ${data.city} ,${data.state},${data.zip}`,
      phoneNumber: data.phoneNumber,
      email: data.email,
      orderedItems: cartItems.map((item) => ({
        foodId: item.foodId,
        quantity: quantities[item.id],
        price: item.price * quantities[item.id],
        category: item.category,
        imageUrl: item.imageUrl,
        description: item.description,
        name: item.name,
      })),
      amount: Math.round(total * 100),
      orderStatus: "Preparing",
    };

    try {
      const res = await axios.post(
        `${APP_URL}/api/orders/create`,
        orderData,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      console.log("Status is", res.status);
      if (res.status === 201 && res.data.razorpayOrderId) {
        intiateRazorPayPayment(res.data);
      } else {
        toast.error("Unable to place order please try again...");
      }
    } catch (error) {
      toast.error("Some Error in Server. Please try after some time..");
    }
    console.log(orderData);
  };

  const intiateRazorPayPayment = (order) => {
    const options = {
      key: RAZORPAY_KEY,
      amount: order.amount * 100,
      currency: "INR",
      name: "Food Land",
      description: "Food order payment",
      order_id: order.razorpayOrderId,
      handler: async function (razorpayResponse) {
        await verifyPayment(razorpayResponse);
      },
      prefill: {
        name: `${data.firstName} ${data.lastName}`,
        email: data.email,
        contact: data.phoneNumber,
      },
      theme: { color: "#3399cc" },
      modal: {
        ondismiss: async function () {
          toast.error("Payment cancelled.");
          await deleteOrder(order.id);
        },
      },
    };

    const razorpay = new window.Razorpay(options);
    razorpay.open();
  };

  const verifyPayment = async (razorpayResponse) => {
    const paymentData = {
      razorpay_payment_id: razorpayResponse.razorpay_payment_id,
      razorpay_order_id: razorpayResponse.razorpay_order_id,
      razorpay_signature: razorpayResponse.razorpay_signature,
    };
    try {
      const response = await axios.post(
        `${APP_URL}/api/orders/verify`,
        paymentData,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      console.log("I got resp", response);

      if (response.status == 200) {
        toast.success("Payment Successful.");
        await clearCart();
        navigate("/myorders");
      } else {
        toast.error("Payment Failed.Please try again...");
        navigate("/");
      }
    } catch (error) {
      toast.error("Payment Failed.");
    }
  };

  const deleteOrder = async (orderId) => {
    console.log(orderId);
    try {
      const response = await axios.delete(
        `${APP_URL}/api/orders/${orderId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
    } catch (error) {
      toast.error("order not deleted");
    }
  };

  const clearCart = async () => {
    try {
      const response = await axios.delete(
        `${APP_URL}/api/cart/delete`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setQuantities({});
    } catch (error) {
      toast.error("error while clearing the cart");
    }
  };

  const tax = subtotal * 0.1;
  const total = subtotal + shipping + tax;
  return (
    <div class="container mt-3 ">
      <div class="row g-5">
        <div class="col-md-5 col-lg-4 order-md-last">
          <h4 class="d-flex justify-content-between align-items-center mb-3">
            <span class="text-primary">Order Summary</span>
            <span class="badge bg-primary rounded-pill">
              {cartItems.length}
            </span>
          </h4>
          <ul class="list-group mb-3">
            {cartItems.map((item, index) => (
              <li class="list-group-item d-flex justify-content-between lh-sm">
                <div>
                  <h6 class="my-0">{item.name}</h6>
                  <small class="text-body-secondary">
                    Qty: {quantities[item.id]}
                  </small>
                </div>
                <span class="text-body-secondary">
                  {" "}
                  &#8377;{item.price * quantities[item.id]}
                </span>
              </li>
            ))}
            <li class="list-group-item d-flex justify-content-between">
              <span c>Shipping</span>
              <strong>&#8377;{shipping}</strong>
            </li>
            <li class="list-group-item d-flex justify-content-between">
              <span>Tax</span>
              <strong>&#8377;{tax}</strong>
            </li>

            <li class="list-group-item d-flex justify-content-between">
              <strong>Total (INR)</strong>
              <strong>&#8377; {total}</strong>
            </li>
          </ul>
        </div>
        <div class="col-md-7 col-lg-8">
          <h4 class="mb-3">Billing address</h4>
          <form
            onSubmit={(event) => onSubmitHandler(event)}
            class="needs-validation"
            novalidate
          >
            <div class="row g-3">
              <div class="col-sm-6">
                <label for="firstName" class="form-label">
                  First name
                </label>
                <input
                  onChange={onChangeHandler}
                  type="text"
                  name="firstName"
                  class="form-control"
                  id="firstName"
                  value={data.firstName}
                  placeholder="John"
                />
                <div class="invalid-feedback">
                  Valid first name is required.
                </div>
              </div>

              <div class="col-sm-6">
                <label for="lastName" class="form-label">
                  Last name
                </label>
                <input
                  name="lastName"
                  value={data.lastName}
                  onChange={onChangeHandler}
                  type="text"
                  class="form-control"
                  id="lastName"
                  placeholder="Doe"
                  required
                />
                <div class="invalid-feedback">Valid last name is required.</div>
              </div>

              <div class="col-12">
                <label for="email" class="form-label">
                  Email
                </label>
                <div class="input-group has-validation">
                  <span class="input-group-text">@</span>
                  <input
                    name="email"
                    value={data.email}
                    onChange={onChangeHandler}
                    type="email"
                    class="form-control"
                    id="email"
                    placeholder="you@gmail.com"
                    required
                  />
                  <div class="invalid-feedback">Your username is required.</div>
                </div>
              </div>

              <div class="col-12">
                <label for="phone" class="form-label">
                  Phone Number<span class="text-body-secondary"></span>
                </label>
                <input
                  name="phoneNumber"
                  value={data.phoneNumber}
                  onChange={onChangeHandler}
                  type="number"
                  class="form-control"
                  id="phone"
                  placeholder="Enter phone number..."
                />
              </div>
              <div class="col-12">
                <label for="address" class="form-label">
                  Address
                </label>
                <input
                  value={data.address}
                  name="address"
                  onChange={onChangeHandler}
                  type="text"
                  class="form-control"
                  id="address"
                  placeholder="1234 Main St"
                  required
                />
                <div class="invalid-feedback">
                  Please enter your shipping address.
                </div>
              </div>

              <div class="col-md-3">
                <label for="country" class="form-label">
                  Country
                </label>
                <select
                  class="form-select"
                  id="country"
                  required
                  name="country"
                  value={data.country}
                  onChange={onChangeHandler}
                >
                  <option value="">Choose...</option>
                  <option value={"India"}>India</option>
                </select>
                <div class="invalid-feedback">
                  Please select a valid country.
                </div>
              </div>

              <div class="col-md-3">
                <label for="state" class="form-label">
                  State
                </label>
                <select
                  class="form-select"
                  id="state"
                  required
                  name="state"
                  value={data.state}
                  onChange={onChangeHandler}
                >
                  <option value="">Choose...</option>
                  <option value={"Madhya Pradesh"}>Madhya Pradesh</option>
                </select>
                <div class="invalid-feedback">
                  Please provide a valid state.
                </div>
              </div>

              <div class="col-md-3">
                <label for="city" class="form-label">
                  City
                </label>
                <select
                  class="form-select"
                  id="city"
                  required
                  name="city"
                  value={data.city}
                  onChange={onChangeHandler}
                >
                  <option value="">Choose...</option>
                  <option value={"Bhopal"}>Bhopal</option>
                </select>
                <div class="invalid-feedback">
                  Please provide a valid state.
                </div>
              </div>

              <div class="col-md-3">
                <label for="zip" class="form-label">
                  Zip
                </label>
                <input
                  name="zip"
                  value={data.zip}
                  onChange={onChangeHandler}
                  type="text"
                  class="form-control"
                  id="zip"
                  placeholder=""
                />
                <div class="invalid-feedback">Zip code required.</div>
              </div>
            </div>

            <hr class="my-4" />

            <button
              disabled={cartItems.length == 0}
              class="w-100 btn btn-primary btn-lg"
              type="submit"
            >
              Continue to checkout
            </button>
          </form>
        </div>
      </div>

      <footer class="my-5 pt-5 text-body-secondary text-center text-small">
        <p class="mb-1">&copy; 2017–2025 Company Name</p>
        <ul class="list-inline">
          <li class="list-inline-item">
            <a href="#">Privacy</a>
          </li>
          <li class="list-inline-item">
            <a href="#">Terms</a>
          </li>
          <li class="list-inline-item">
            <a href="#">Support</a>
          </li>
        </ul>
      </footer>
    </div>
  );
};

export default PlaceOrder;
