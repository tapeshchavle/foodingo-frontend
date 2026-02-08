import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../Service/authService";
import { toast } from "react-toastify";
import { StoreContext } from "../context/StoreContext";
import { Lock, Mail, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { setToken, loadCartData } = useContext(StoreContext);

  const submitHandler = async (e) => {
    e.preventDefault();
    let obj = {
      email: email,
      password: password,
    };

    try {
      const res = await login(obj);
      if (res.status == 200) {
        setToken(res.data.token);
        localStorage.setItem('token', res.data.token);
        await loadCartData(localStorage.getItem('token'));
        toast.success("Welcome back!");
        navigate("/");
      } else {
        toast.error("Invalid credentials.");
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gray-900">
      {/* Background Image */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center opacity-40"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=2070')"
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
          <h2 className="text-3xl font-bold text-white mb-2">Welcome Back</h2>
          <p className="text-gray-300">Sign in to continue ordering your favorite food</p>
        </div>

        <form onSubmit={submitHandler} className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-300 block">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <input
                onChange={(e) => setEmail(e.target.value)}
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
                onChange={(e) => setPassword(e.target.value)}
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
            Sign In <ArrowRight size={20} />
          </button>
        </form>

        <div className="mt-6 text-center text-gray-400">
          Don't have an account? <Link to="/register" className="text-primary hover:text-orange-400 font-medium transition-colors">Sign Up</Link>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
