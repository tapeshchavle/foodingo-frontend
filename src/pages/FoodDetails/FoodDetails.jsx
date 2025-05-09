import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import { getFoodById } from '../../Service/foodService';
import { StoreContext } from '../../context/StoreContext';

const FoodDetails = () => {
    const {id}=useParams();
    const [food,setFood]=useState('');    
    
    useEffect(()=>{
      const getFood= async()=>{
         const res= await getFoodById(id);
         setFood(res);
      }
      getFood();
    },[id])
    console.log(food);
    
   const{quantities,increaseQty, removeItem}= useContext(StoreContext);
   const count = Object.values(quantities).filter(qty => qty > 0).length;


  return (
    <div className='container'>
      <section className="">
            <div className="container px-4 px-lg-5 my-5">
                <div className="row gx-4 gx-lg-5 align-items-center">
                    <div className="col-md-6"><img  height={500} width={300}  className="card-img-top mb-5 mb-md-0" src={food.imageUrl} alt="..." /></div>
                    <div className="col-md-6">
                        <div className="fs-5 mb-1">Category: <span className='badge text-bg-warning'>{food.category}</span></div>
                        <h1 className="display-5 fw-bolder">{food.name}</h1>
                        <div className="fs-5 mb-2">
                            
                            <span>&#8377; {food.price}.00</span>
                        </div>
                        <p className="lead">{food.description}</p>
                        <div className="d-flex">
                            
                            {
                                count>0?(
                                    <button onClick={()=>{removeItem(id)}} className="btn btn-outline-dark flex-shrink-0" type="button">
                                <i className="bi-cart-fill me-1"></i>
                                Remove from cart
                            </button>
                                ):(
                                    <button onClick={()=>{increaseQty(id)}} className="btn btn-outline-dark flex-shrink-0" type="button">
                                <i className="bi-cart-fill me-1"></i>
                                Add to cart
                            </button>
                                )
                            }
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
  )
}

export default FoodDetails