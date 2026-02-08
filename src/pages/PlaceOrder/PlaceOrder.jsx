import React, { useContext, useState, useEffect } from "react";
import { StoreContext } from "../../context/StoreContext";
import axios from "axios";
import { toast } from "react-toastify";
import { RAZORPAY_KEY } from "../../util/constants.js";
import { useNavigate } from "react-router-dom";
import { CreditCard, MapPin, Truck } from "lucide-react";

const PlaceOrder = () => {
  const { foodList, quantities, setQuantities } = useContext(StoreContext);
  const cartItems = foodList.filter((food) => quantities[food.id] > 0);
  const token = localStorage.getItem("token");
  const APP_URL = "https://foodingo-api-awasc8h4d7d7cmft.centralindia-01.azurewebsites.net";
  const navigate = useNavigate();

  const subtotal = cartItems.reduce(
    (acc, food) => acc + food.price * quantities[food.id],
    0
  );
  const shipping = subtotal === 0 ? 0.0 : 10;
  const tax = subtotal * 0.1;
  const total = subtotal + shipping + tax;

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

  useEffect(() => {
    if (!token) {
      navigate('/login');
    } else if (cartItems.length === 0) {
      navigate('/cart');
    }
  }, [token, cartItems, navigate]);

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
  };

  const intiateRazorPayPayment = (order) => {
    const options = {
      key: RAZORPAY_KEY,
      amount: order.amount * 100,
      currency: "INR",
      name: "Foodingo",
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
      theme: { color: "#ff6347" },
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

      if (response.status === 200) {
        toast.success("Payment Successful.");
        await clearCart();
        navigate("/myorders");
      } else {
        toast.error("Payment Failed. Please try again...");
        navigate("/");
      }
    } catch (error) {
      toast.error("Payment Failed.");
    }
  };

  const deleteOrder = async (orderId) => {
    try {
      await axios.delete(
        `${APP_URL}/api/orders/${orderId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
    } catch (error) {
      console.error("Error deleting order:", error);
    }
  };

  const clearCart = async () => {
    try {
      await axios.delete(
        `${APP_URL}/api/cart/delete`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setQuantities({});
    } catch (error) {
      toast.error("Error while clearing the cart");
    }
  };

  return (
    <div className="container py-8 px-4 md:px-8">
      <h1 className="text-3xl font-bold font-heading mb-8 flex items-center gap-3">
        <CreditCard className="text-primary" size={32} />
        Checkout
      </h1>
      <form onSubmit={onSubmitHandler} className="flex flex-col lg:flex-row gap-8">
        <div className="flex-1">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 mb-6">
            <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
              <MapPin size={20} className="text-gray-500" />
              Delivery Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-sm font-medium text-gray-700">First Name</label>
                <input required name="firstName" onChange={onChangeHandler} value={data.firstName} type="text" className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all" placeholder="John" />
              </div>
              <div className="space-y-1">
                <label className="text-sm font-medium text-gray-700">Last Name</label>
                <input required name="lastName" onChange={onChangeHandler} value={data.lastName} type="text" className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all" placeholder="Doe" />
              </div>
              <div className="md:col-span-2 space-y-1">
                <label className="text-sm font-medium text-gray-700">Email Address</label>
                <input required name="email" onChange={onChangeHandler} value={data.email} type="email" className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all" placeholder="john@example.com" />
              </div>
              <div className="md:col-span-2 space-y-1">
                <label className="text-sm font-medium text-gray-700">Phone Number</label>
                <input required name="phoneNumber" onChange={onChangeHandler} value={data.phoneNumber} type="number" className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all" placeholder="+91" />
              </div>
              <div className="md:col-span-2 space-y-1">
                <label className="text-sm font-medium text-gray-700">Street Address</label>
                <input required name="address" onChange={onChangeHandler} value={data.address} type="text" className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all" placeholder="1234 Main St" />
              </div>
              <div className="space-y-1">
                <label className="text-sm font-medium text-gray-700">City</label>
                <select required name="city" onChange={onChangeHandler} value={data.city} className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all bg-white">
                  <option value="">Select City</option>
                  <option value="Bhopal">Bhopal</option>
                  <option value="Indore">Indore</option>
                  <option value="Mumbai">Mumbai</option>
                  <option value="Delhi">Delhi</option>
                  <option value="Bangalore">Bangalore</option>
                </select>
              </div>
              <div className="space-y-1">
                <label className="text-sm font-medium text-gray-700">State</label>
                <select required name="state" onChange={onChangeHandler} value={data.state} className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all bg-white">
                  <option value="">Select State</option>
                  <option value="Madhya Pradesh">Madhya Pradesh</option>
                  <option value="Maharashtra">Maharashtra</option>
                  <option value="Delhi">Delhi</option>
                  <option value="Karnataka">Karnataka</option>
                </select>
              </div>
              <div className="space-y-1">
                <label className="text-sm font-medium text-gray-700">Zip Code</label>
                <input required name="zip" onChange={onChangeHandler} value={data.zip} type="text" className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all" placeholder="462001" />
              </div>
              <div className="space-y-1">
                <label className="text-sm font-medium text-gray-700">Country</label>
                <select required name="country" onChange={onChangeHandler} value={data.country} className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all bg-white">
                  <option value="India">India</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:w-96">
          <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 sticky top-24">
            <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
              <Truck size={20} className="text-gray-500" />
              Order Summary
            </h2>
            <div className="space-y-4 mb-6">
              <div className="flex justify-between text-gray-600">
                <span>Items ({cartItems.length})</span>
                <span>₹{subtotal}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Shipping</span>
                <span>₹{shipping}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Tax (10%)</span>
                <span>₹{tax.toFixed(2)}</span>
              </div>
              <div className="h-px bg-gray-100 my-4"></div>
              <div className="flex justify-between text-xl font-bold text-gray-900">
                <span>Total</span>
                <span>₹{total.toFixed(2)}</span>
              </div>
            </div>
            <button
              type="submit"
              className="w-full py-4 bg-primary text-white font-bold rounded-xl shadow-lg shadow-orange-500/30 hover:shadow-orange-500/50 hover:scale-[1.02] transition-all active:scale-95 flex items-center justify-center gap-2"
            >
              Proceed to Payment
            </button>
            <p className="text-xs text-center text-gray-400 mt-4">Safe and secure payments via Razorpay</p>
          </div>
        </div>
      </form>
    </div>
  );
};

export default PlaceOrder;
