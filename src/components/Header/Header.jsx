import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const Header = () => {
  return (
    <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-900 via-purple-900 to-orange-500 text-white shadow-2xl my-8 mx-0 md:mx-4">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=2070')] bg-cover bg-center opacity-20 mix-blend-overlay"></div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>

      <div className="container relative z-10 px-6 py-20 md:py-32 flex flex-col items-start justify-center min-h-[500px]">
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="inline-block py-1 px-3 rounded-full bg-white/20 backdrop-blur-sm border border-white/10 text-sm font-medium mb-6"
        >
          Hungry? We got you.
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-5xl md:text-7xl font-bold font-heading leading-tight mb-6 max-w-3xl"
        >
          Order Your <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-pink-500">Favourite Food</span> Here
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="text-lg md:text-xl text-gray-200 mb-10 max-w-2xl"
        >
          Discover the best food and drinks in Bengaluru. From local favorites to gourmet dining, delivered straight to your door.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="flex gap-4"
        >
          <Link to='/explore-foods' className="group relative px-8 py-4 bg-white text-gray-900 rounded-full font-bold text-lg overflow-hidden transition-all hover:scale-105 active:scale-95 shadow-lg hover:shadow-white/20">
            <span className="relative z-10 flex items-center gap-2">
              Order Now <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </span>
          </Link>
          <Link to='/contact' className="px-8 py-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-full font-bold text-lg text-white transition-all hover:bg-white/20 hover:scale-105 active:scale-95">
            View Menu
          </Link>
        </motion.div>
      </div>

      {/* Decorative circles */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-orange-500/30 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500/30 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>
    </section>
  );
}

export default Header;