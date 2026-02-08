import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { registerUser } from '../Service/authService';
import { toast } from 'react-toastify';
import { User, Mail, Lock, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

const Register = () => {
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    password: ""
  });

  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    const registerResponse = await registerUser(newUser);
    if (registerResponse == 201) {
      toast.success("Registration completed. Please login.");
      navigate("/login");
    } else {
      toast.error("Unable to register. Please try again.");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gray-900">
      {/* Background Image */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center opacity-40"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1543353071-873f17a7a088?q=80&w=2070')"
        }}
      ></div>
      <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40 to-transparent z-0"></div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 w-full max-w-md p-8 bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl shadow-2xl mx-4"
      >
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-white mb-2">Create Account</h2>
          <p className="text-gray-300">Join Foodingo and start ordering today</p>
        </div>

        <form onSubmit={submitHandler} className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-300 block">Full Name</label>
            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <input
                onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                type="text"
                className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                placeholder="John Doe"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-300 block">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <input
                onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                type="email"
                className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                placeholder="name@example.com"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-300 block">Password</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <input
                onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                type="password"
                className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                placeholder="••••••••"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-primary hover:bg-orange-600 text-white font-bold rounded-xl shadow-lg shadow-orange-500/30 transition-all transform hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-2"
          >
            Sign Up <ArrowRight size={20} />
          </button>
        </form>

        <div className="mt-6 text-center text-gray-400">
          Already have an account? <Link to="/login" className="text-primary hover:text-orange-400 font-medium transition-colors">Sign In</Link>
        </div>
      </motion.div>
    </div>
  )
}

export default Register