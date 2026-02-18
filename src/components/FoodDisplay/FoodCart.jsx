import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { StoreContext } from "../../context/StoreContext";
import { Plus, Minus, Star, ShoppingBag } from "lucide-react";
import { motion } from "framer-motion";

const FoodCart = ({ item }) => {
  const { increaseQty, decreaseQty, quantities } = useContext(StoreContext);
  const qty = quantities[item.id] || 0;

  // Since we don't have the original rating data in context, sticking to static for now or random
  // Assuming item might have rating later, but for now hardcoded visual

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.3 }}
      className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm hover:shadow-xl transition-shadow duration-300 overflow-hidden border border-gray-100 dark:border-gray-700 flex flex-col h-full group"
    >
      <div className="relative overflow-hidden h-32 sm:h-52">
        <Link to={`/food/${item.id}`}>
          <img
            src={item.imageUrl}
            className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
            alt={item.name}
          />
        </Link>
        {!qty && (
          <button
            onClick={() => increaseQty(item.id)}
            className="absolute bottom-3 right-3 bg-white dark:bg-gray-700 p-2 rounded-full shadow-lg text-gray-800 dark:text-white hover:text-primary dark:hover:text-primary transition-colors opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 duration-300"
          >
            <Plus size={20} />
          </button>
        )}
      </div>

      <div className="p-3 sm:p-5 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-2">
          <h5 className="font-bold text-sm sm:text-xl text-gray-800 dark:text-gray-100 line-clamp-1">{item.name}</h5>
          <div className="flex items-center gap-1 bg-green-50 dark:bg-green-900/30 px-1.5 py-0.5 rounded text-green-700 dark:text-green-400 text-xs font-bold">
            <span>4.5</span>
            <Star size={10} fill="currentColor" />
          </div>
        </div>

        <p className="text-gray-500 dark:text-gray-400 text-xs sm:text-sm line-clamp-2 mb-2 sm:mb-4 flex-grow">{item.description}</p>

        <div className="flex justify-between items-center mt-auto">
          <span className="text-primary font-bold text-lg sm:text-xl">₹{item.price}</span>

          {qty > 0 ? (
            <div className="flex items-center gap-3 bg-gray-50 dark:bg-gray-700/50 rounded-full px-2 py-1">
              <button
                className="w-7 h-7 flex items-center justify-center rounded-full bg-white dark:bg-gray-600 text-red-500 shadow hover:bg-red-50 dark:hover:bg-red-900/30 transition-colors"
                onClick={() => decreaseQty(item.id)}
              >
                <Minus size={16} />
              </button>
              <span className="font-bold text-gray-800 dark:text-gray-200 w-4 text-center">{qty}</span>
              <button
                className="w-7 h-7 flex items-center justify-center rounded-full bg-white dark:bg-gray-600 text-green-500 shadow hover:bg-green-50 dark:hover:bg-green-900/30 transition-colors"
                onClick={() => increaseQty(item.id)}
              >
                <Plus size={16} />
              </button>
            </div>
          ) : (
            <button
              className="px-3 py-1.5 sm:px-4 sm:py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 rounded-lg text-xs sm:text-sm font-medium hover:bg-primary hover:text-white transition-all flex items-center gap-1 sm:gap-2"
              onClick={() => increaseQty(item.id)}
            >
              Add <Plus size={14} className="sm:w-4 sm:h-4" />
            </button>
          )}
        </div>
      </div>
    </motion.div >
  );
};

export default FoodCart;
