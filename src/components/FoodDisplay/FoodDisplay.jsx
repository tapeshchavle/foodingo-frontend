import React, { useContext, useState } from "react";
import { StoreContext } from "../../context/StoreContext";
import FoodCart from "./FoodCart";
const FoodDisplay = ({category,searchText}) => {
  const {foodList}  = useContext(StoreContext);
  
  const filterFoods=foodList.filter((food)=>(
    (category==='All' || food.category==category) && (food.name.toLowerCase().includes(searchText.toLowerCase()))
  ));

  console.log("food is:",foodList);
  return (
    <div className="container py-4">
      <div className="row">
        {filterFoods.length > 0 ? (
         
         filterFoods.map((item,index)=>{
            return (
              <FoodCart item={item} index={index} key={index} />
            )
           })
         
        ) : (
          <div className="text-center mt-4">
            <h4>No food found</h4>
          </div>
        )}
      </div>
    </div>
  );
};

export default FoodDisplay;
