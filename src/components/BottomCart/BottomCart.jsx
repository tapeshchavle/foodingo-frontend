import React, { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { StoreContext } from "../../context/StoreContext";
import { ShoppingBag, ArrowRight } from "lucide-react";

const BottomCart = () => {
    const { foodList, quantities } = useContext(StoreContext);
    const location = useLocation();

    // Don't show on Cart or PlaceOrder pages to avoid double checkout buttons
    if (location.pathname === '/cart' || location.pathname === '/order') {
        return null;
    }

    const cartItems = foodList.filter((food) => quantities[food.id] > 0);
    const totalItems = cartItems.reduce((acc, item) => acc + quantities[item.id], 0);

    const subtotal = cartItems.reduce(
        (acc, food) => acc + food.price * quantities[food.id],
        0
    );

    if (totalItems === 0) return null;

    return (
        <div className="fixed bottom-0 left-0 right-0 z-50 p-4 md:hidden">
            <Link to="/cart">
                <div className="bg-primary text-white p-4 rounded-xl shadow-lg shadow-orange-500/30 flex justify-between items-center animate-slide-up">
                    <div className="flex flex-col">
                        <span className="font-bold text-sm uppercase">{totalItems} Item{totalItems > 1 ? 's' : ''} | ₹{subtotal}</span>
                        <span className="text-[10px] opacity-90">Extra charges may apply</span>
                    </div>
                    <div className="flex items-center gap-2 font-bold text-sm">
                        View Cart <ArrowRight size={16} />
                    </div>
                </div>
            </Link>
        </div>
    );
};

export default BottomCart;
