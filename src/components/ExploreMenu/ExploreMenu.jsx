import React, { useRef } from 'react'
import { images } from '../../assets/images'
import { motion } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'

const ExploreMenu = ({ category, setCategory }) => {
    const menuRef = useRef(null);

    const scroll = (direction) => {
        if (menuRef.current) {
            const scrollAmount = direction === 'left' ? -300 : 300;
            menuRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        }
    }

    return (
        <section className="container py-6 md:py-12 px-4 md:px-8 flex flex-col gap-6" id="explore-menu">
            <div className="flex justify-between items-end">
                <div>
                    <h2 className="text-3xl md:text-4xl font-bold font-heading mb-3 text-gray-900 dark:text-white">Explore Our Menu</h2>
                    <p className="text-gray-500 dark:text-gray-400 max-w-lg">Choose from a diverse menu featuring a delectable array of dishes crafted with the finest ingredients.</p>
                </div>
                <div className="hidden md:flex gap-2">
                    <button onClick={() => scroll('left')} className="p-2 rounded-full border border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 hover:border-gray-300 dark:hover:border-gray-600 transition-colors text-gray-600 dark:text-gray-300">
                        <ChevronLeft size={24} />
                    </button>
                    <button onClick={() => scroll('right')} className="p-2 rounded-full border border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 hover:border-gray-300 dark:hover:border-gray-600 transition-colors text-gray-600 dark:text-gray-300">
                        <ChevronRight size={24} />
                    </button>
                </div>
            </div>

            <div
                className="flex gap-3 md:gap-8 overflow-x-auto pb-4 md:pb-8 pt-2 md:pt-4 scrollbar-hide snap-x snap-mandatory"
                ref={menuRef}
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
                {images.map((item, index) => {
                    const isActive = category === item.role;
                    return (
                        <div
                            key={index}
                            className="flex-shrink-0 flex flex-col items-center gap-2 md:gap-4 cursor-pointer snap-start group"
                            onClick={() => setCategory(prev => prev === item.role ? 'All' : item.role)}
                        >
                            <div className={`
                                relative w-20 h-20 md:w-32 md:h-32 rounded-full p-1 transition-all duration-300 overflow-hidden
                                ${isActive ? 'bg-gradient-to-tr from-primary to-orange-400 shadow-lg scale-105' : 'bg-transparent group-hover:bg-gray-100 dark:group-hover:bg-gray-800'}
                            `}>
                                <img
                                    src={item.url}
                                    className={`
                                        w-full h-full object-cover object-top rounded-full border-2 md:border-4 transition-all duration-300 scale-150
                                        ${isActive ? 'border-white dark:border-gray-900' : 'border-transparent group-hover:border-white dark:group-hover:border-gray-700'}
                                    `}
                                    alt={item.role}
                                />
                            </div>
                            <p className={`
                                text-xs md:text-lg font-medium transition-colors text-center max-w-[80px] md:max-w-none
                                ${isActive ? 'text-primary font-bold' : 'text-gray-600 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white'}
                            `}>
                                {item.role}
                            </p>
                        </div>
                    )
                })}
            </div>

            <hr className="border-gray-200 dark:border-gray-800" />
        </section >
    )
}

export default ExploreMenu