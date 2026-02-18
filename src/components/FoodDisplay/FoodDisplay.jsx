import React, { useContext } from "react";
import { StoreContext } from "../../context/StoreContext";
import FoodCart from "./FoodCart";
import { AnimatePresence } from "framer-motion";

const FoodDisplay = ({ category, searchText }) => {
  const { foodList } = useContext(StoreContext);

  const filterFoods = foodList.filter((food) => (
    (category === 'All' || food.category === category) && (food.name.toLowerCase().includes(searchText.toLowerCase()))
  ));

  return (
    <section className="container py-4 md:py-8 px-4 md:px-8" id="food-display">
      <h2 className="text-2xl font-bold font-heading mb-6 md:mb-8 text-gray-800 dark:text-white">Top dishes near you</h2>
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-6 gap-y-8">
        <AnimatePresence mode="popLayout">
          {filterFoods.length > 0 ? (
            filterFoods.map((item, index) => {
              return (
                <FoodCart item={item} index={index} key={item.id || index} />
              )
            })
          ) : (
            <div className="col-span-full py-20 text-center">
              <h4 className="text-xl text-gray-500 dark:text-gray-400 font-medium">No food found serving this category</h4>
            </div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default FoodDisplay;
