import React, { useContext } from "react";
import { StoreContext } from "../../context/StoreContext";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Trash2, ArrowLeft, ShoppingBag, Plus, Minus } from "lucide-react";

const Cart = () => {
  const { foodList, increaseQty, decreaseQty, quantities, removeItem, removeCart } = useContext(StoreContext);
  const navigate = useNavigate();

  const cartItems = foodList.filter((food) => quantities[food.id] > 0);

  const subtotal = cartItems.reduce(
    (acc, food) => acc + food.price * quantities[food.id],
    0
  );
  const shipping = subtotal === 0 ? 0.0 : 10;
  const tax = subtotal * 0.1;
  const total = subtotal + shipping + tax;

  return (
    <section className="container py-8 px-4 md:px-8">
      <h1 className="text-3xl md:text-4xl font-bold font-heading mb-8 flex items-center gap-3">
        <ShoppingBag className="text-primary" size={32} />
        Your Cart
      </h1>

      {cartItems.length > 0 ? (
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Cart Items List */}
          <div className="flex-1 flex flex-col gap-4">
            <AnimatePresence mode="popLayout">
              {cartItems.map((item) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  className="bg-white dark:bg-gray-800 p-4 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 flex flex-col sm:flex-row items-center gap-4"
                >
                  <div className="w-full sm:w-24 h-24 flex-shrink-0 bg-gray-100 dark:bg-gray-700 rounded-xl overflow-hidden">
                    <img
                      src={item.imageUrl}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-grow text-center sm:text-left">
                    <h3 className="font-bold text-lg text-gray-800 dark:text-gray-100">{item.name}</h3>
                    <p className="text-gray-500 dark:text-gray-400 text-sm">{item.category}</p>
                    <p className="text-primary font-bold mt-1">₹{item.price}</p>
                  </div>
                  <div className="flex items-center gap-3 bg-gray-50 dark:bg-gray-700/50 rounded-full px-2 py-1">
                    <button
                      onClick={() => decreaseQty(item.id)}
                      className="w-8 h-8 flex items-center justify-center rounded-full bg-white dark:bg-gray-600 text-gray-600 dark:text-gray-200 shadow hover:text-red-500 transition-colors"
                    >
                      <Minus size={16} />
                    </button>
                    <span className="font-bold text-gray-800 dark:text-gray-100 w-6 text-center">{quantities[item.id]}</span>
                    <button
                      onClick={() => increaseQty(item.id)}
                      className="w-8 h-8 flex items-center justify-center rounded-full bg-white dark:bg-gray-600 text-gray-600 dark:text-gray-200 shadow hover:text-green-500 transition-colors"
                    >
                      <Plus size={16} />
                    </button>
                  </div>
                  <div className="text-right min-w-[80px]">
                    <p className="font-bold text-lg text-gray-900 dark:text-gray-100">₹{item.price * quantities[item.id]}</p>
                  </div>
                  <button
                    onClick={() => removeItem(item.id)}
                    className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-full transition-colors"
                  >
                    <Trash2 size={20} />
                  </button>
                </motion.div>
              ))}
            </AnimatePresence>

            <div className="flex justify-between items-center mt-6">
              <Link to="/home" className="flex items-center gap-2 text-gray-600 hover:text-primary font-medium transition-colors">
                <ArrowLeft size={20} />
                Continue Shopping
              </Link>
              <button
                onClick={removeCart}
                className="text-red-500 hover:text-red-700 font-medium px-4 py-2 hover:bg-red-50 rounded-lg transition-colors"
              >
                Clear Cart
              </button>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:w-96">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 sticky top-24">
              <h2 className="text-xl font-bold mb-6 text-gray-900 dark:text-white">Order Summary</h2>
              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-gray-600 dark:text-gray-400">
                  <span>Subtotal</span>
                  <span>₹{subtotal}</span>
                </div>
                <div className="flex justify-between text-gray-600 dark:text-gray-400">
                  <span>Shipping</span>
                  <span>₹{shipping}</span>
                </div>
                <div className="flex justify-between text-gray-600 dark:text-gray-400">
                  <span>Tax (10%)</span>
                  <span>₹{tax.toFixed(2)}</span>
                </div>
                <div className="h-px bg-gray-100 dark:bg-gray-700 my-4"></div>
                <div className="flex justify-between text-xl font-bold text-gray-900 dark:text-white">
                  <span>Total</span>
                  <span>₹{total.toFixed(2)}</span>
                </div>
              </div>
              <button
                onClick={() => navigate('/order')}
                className="w-full py-4 bg-primary text-white font-bold rounded-xl shadow-lg shadow-orange-500/30 hover:shadow-orange-500/50 hover:scale-[1.02] transition-all active:scale-95"
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <div className="w-24 h-24 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mb-6">
            <ShoppingBag size={40} className="text-gray-400" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Your cart is empty</h3>
          <p className="text-gray-500 dark:text-gray-400 mb-8 max-w-md">Looks like you haven't added anything to your cart yet. Go ahead and explore our top categories.</p>
          <Link
            to="/home"
            className="px-8 py-3 bg-primary text-white font-bold rounded-full hover:bg-orange-600 transition-colors shadow-lg shadow-orange-500/20"
          >
            Start Shopping
          </Link>
        </div>
      )}
    </section>
  );
};

export default Cart;
