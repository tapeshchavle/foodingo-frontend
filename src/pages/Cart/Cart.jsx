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
    <section className="container py-4 md:py-8 px-4 md:px-8 pb-32 md:pb-8">
      <h1 className="text-2xl md:text-4xl font-bold font-heading mb-6 md:mb-8 flex items-center gap-3">
        <ShoppingBag className="text-primary" size={28} />
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
                  className="bg-white dark:bg-gray-800 p-3 md:p-4 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 flex items-center gap-3 md:gap-4"
                >
                  <div className="w-20 h-20 md:w-24 md:h-24 flex-shrink-0 bg-gray-100 dark:bg-gray-700 rounded-xl overflow-hidden">
                    <img
                      src={item.imageUrl}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-grow">
                    <div className="flex justify-between items-start mb-1">
                      <h3 className="font-bold text-base md:text-lg text-gray-800 dark:text-gray-100 line-clamp-1">{item.name}</h3>
                      <p className="font-bold text-gray-900 dark:text-gray-100 md:hidden">₹{item.price * quantities[item.id]}</p>
                    </div>
                    <p className="text-gray-500 dark:text-gray-400 text-xs md:text-sm mb-2">{item.category}</p>

                    <div className="flex justify-between items-center">
                      <p className="text-primary font-bold hidden md:block">₹{item.price}</p>

                      <div className="flex items-center gap-3 bg-gray-50 dark:bg-gray-700/50 rounded-full px-2 py-1">
                        <button
                          onClick={() => decreaseQty(item.id)}
                          className="w-6 h-6 md:w-8 md:h-8 flex items-center justify-center rounded-full bg-white dark:bg-gray-600 text-gray-600 dark:text-gray-200 shadow hover:text-red-500 transition-colors"
                        >
                          <Minus size={14} className="md:w-4 md:h-4" />
                        </button>
                        <span className="font-bold text-sm md:text-base text-gray-800 dark:text-gray-100 w-4 md:w-6 text-center">{quantities[item.id]}</span>
                        <button
                          onClick={() => increaseQty(item.id)}
                          className="w-6 h-6 md:w-8 md:h-8 flex items-center justify-center rounded-full bg-white dark:bg-gray-600 text-gray-600 dark:text-gray-200 shadow hover:text-green-500 transition-colors"
                        >
                          <Plus size={14} className="md:w-4 md:h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="text-right min-w-[80px] hidden md:block">
                    <p className="font-bold text-lg text-gray-900 dark:text-gray-100">₹{item.price * quantities[item.id]}</p>
                  </div>
                  <button
                    onClick={() => removeItem(item.id)}
                    className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-full transition-colors ml-[-8px] md:ml-0"
                  >
                    <Trash2 size={18} className="md:w-5 md:h-5" />
                  </button>
                </motion.div>
              ))}
            </AnimatePresence>

            <div className="flex justify-between items-center mt-4 md:mt-6 mb-20 md:mb-0">
              <Link to="/home" className="flex items-center gap-2 text-gray-600 hover:text-primary font-medium transition-colors text-sm md:text-base">
                <ArrowLeft size={18} className="md:w-5 md:h-5" />
                Continue Shopping
              </Link>
              <button
                onClick={removeCart}
                className="text-red-500 hover:text-red-700 font-medium px-4 py-2 hover:bg-red-50 rounded-lg transition-colors text-sm md:text-base"
              >
                Clear Cart
              </button>
            </div>
          </div>

          {/* Desktop Order Summary */}
          <div className="lg:w-96 hidden md:block">
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

          {/* Mobile Sticky Footer */}
          <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 border-t border-gray-100 dark:border-gray-700 p-4 md:hidden shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] z-40">
            <div className="flex items-center gap-4">
              <div className="flex-1">
                <p className="text-xs text-uppercase text-gray-500 font-bold mb-0.5">TOTAL</p>
                <div className="flex items-baseline gap-2">
                  <p className="text-xl font-bold text-gray-900 dark:text-white">₹{total.toFixed(0)}</p>
                  <p className="text-xs text-gray-400 line-through">₹{(total * 1.2).toFixed(0)}</p>
                </div>
              </div>
              <button
                onClick={() => navigate('/order')}
                className="flex-1 bg-primary text-white font-bold py-3.5 rounded-xl shadow-lg shadow-orange-500/30 active:scale-95 transition-transform"
              >
                Proceed to Pay
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
