import React, { useState } from 'react'
import Header from '../../components/Header/Header'
import ExploreMenu from '../../components/ExploreMenu/ExploreMenu'
import FoodDisplay from '../../components/FoodDisplay/FoodDisplay'
import { motion } from 'framer-motion'

const Home = () => {
  const [category, setCategory] = useState('All');

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col gap-4"
    >
      <Header />
      <ExploreMenu category={category} setCategory={setCategory} />
      <FoodDisplay category={category} searchText={''} />
      <div className="h-12"></div>
    </motion.div>
  )
}

export default Home