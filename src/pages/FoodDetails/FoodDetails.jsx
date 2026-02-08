import React, { useContext, useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { getFoodById } from '../../Service/foodService';
import { StoreContext } from '../../context/StoreContext';
import { ShoppingBag, Star, ArrowLeft, Loader, Minus, Plus } from 'lucide-react';
import { motion } from 'framer-motion';

const FoodDetails = () => {
    const { id } = useParams();
    const [food, setFood] = useState(null);
    const { quantities, increaseQty, removeItem, decreaseQty } = useContext(StoreContext);

    useEffect(() => {
        const getFood = async () => {
            try {
                const res = await getFoodById(id);
                setFood(res);
            } catch (error) {
                console.error("Failed to fetch food details", error);
            }
        }
        getFood();
    }, [id])

    if (!food) {
        return (
            <div className="min-h-[50vh] flex items-center justify-center">
                <Loader className="animate-spin text-primary" size={40} />
            </div>
        )
    }

    const qty = quantities[food.id] || 0;

    return (
        <section className="container py-8 px-4 md:px-8">
            <Link to="/" className="inline-flex items-center gap-2 text-gray-500 hover:text-primary mb-8 transition-colors group">
                <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
                Back to Menu
            </Link>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center"
            >
                {/* Image Section */}
                <div className="relative group">
                    <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                    <img
                        src={food.imageUrl}
                        alt={food.name}
                        className="relative z-10 w-full rounded-3xl shadow-2xl transform transition-transform duration-500 group-hover:scale-105"
                    />
                </div>

                {/* Content Section */}
                <div className="space-y-6">
                    <div>
                        <span className="inline-block px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm font-bold mb-4">
                            {food.category}
                        </span>
                        <h1 className="text-4xl md:text-5xl font-bold font-heading text-gray-900 mb-4">{food.name}</h1>
                        <div className="flex items-center gap-2 mb-6">
                            <div className="flex text-yellow-500">
                                <Star fill="currentColor" size={20} />
                                <Star fill="currentColor" size={20} />
                                <Star fill="currentColor" size={20} />
                                <Star fill="currentColor" size={20} />
                                <Star fill="currentColor" size={20} /> // Assuming 5 for now
                            </div>
                            <span className="text-gray-500 text-sm">(120 reviews)</span>
                        </div>
                        <p className="text-gray-600 text-lg leading-relaxed mb-8">
                            {food.description}
                        </p>
                    </div>

                    <div className="flex items-center justify-between p-6 bg-gray-50 rounded-2xl border border-gray-100">
                        <span className="text-3xl font-bold text-gray-900">₹{food.price}</span>

                        <div className="flex items-center gap-4">
                            {qty > 0 ? (
                                <div className="flex items-center gap-4 bg-white rounded-full px-2 py-1 shadow-sm border border-gray-100">
                                    <button
                                        onClick={() => decreaseQty(id)}
                                        className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 hover:bg-red-50 hover:text-red-500 transition-colors"
                                    >
                                        <Minus size={20} />
                                    </button>
                                    <span className="font-bold text-xl w-8 text-center">{qty}</span>
                                    <button
                                        onClick={() => increaseQty(id)}
                                        className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 hover:bg-green-50 hover:text-green-500 transition-colors"
                                    >
                                        <Plus size={20} />
                                    </button>
                                </div>
                            ) : (
                                <button
                                    onClick={() => increaseQty(id)}
                                    className="px-8 py-3 bg-primary text-white font-bold rounded-xl shadow-lg shadow-orange-500/30 hover:bg-orange-600 hover:scale-105 transition-all text-lg flex items-center gap-2"
                                >
                                    Add to Cart
                                </button>
                            )}
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="p-4 bg-green-50 rounded-xl border border-green-100">
                            <p className="text-green-800 font-bold mb-1">Fast Delivery</p>
                            <p className="text-green-600 text-sm">Within 30 mins</p>
                        </div>
                        <div className="p-4 bg-orange-50 rounded-xl border border-orange-100">
                            <p className="text-orange-800 font-bold mb-1">Fresh Food</p>
                            <p className="text-orange-600 text-sm">Made with love</p>
                        </div>
                    </div>
                </div>
            </motion.div>
        </section>
    )
}

export default FoodDetails