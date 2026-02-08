import React, { useState } from "react";
import FoodDisplay from "../../components/FoodDisplay/FoodDisplay";
import { Search, Filter } from "lucide-react";

const ExploreFood = () => {
  const [category, setCategory] = useState("All");
  const [searchText, setSearchText] = useState("");

  const categories = [
    "All", "poha", "paratha", "idli", "biryani", "dosa", "chole bhature", "cake"
  ];

  return (
    <>
      <section className="container py-8 px-4 md:px-8">
        <div className="bg-primary/5 dark:bg-gray-800/50 rounded-3xl p-8 mb-8 text-center">
          <h1 className="text-3xl font-bold font-heading mb-6 text-gray-900 dark:text-white">Find Your Next Cravings</h1>

          <div className="max-w-2xl mx-auto flex flex-col md:flex-row gap-4">
            <div className="relative flex-grow">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search for dishes..."
                className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all shadow-sm"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
              />
            </div>

            <div className="relative md:w-48">
              <Filter className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <select
                className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all shadow-sm appearance-none bg-white cursor-pointer"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat === "All" ? "All Categories" : cat.charAt(0).toUpperCase() + cat.slice(1)}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <FoodDisplay category={category} searchText={searchText} />
      </section>
    </>
  );
};

export default ExploreFood;
