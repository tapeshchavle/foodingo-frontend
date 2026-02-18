import React, { useContext, useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { StoreContext } from "../../context/StoreContext";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingCart, Menu, X, User, LogOut, Home, Compass, Phone, Package, Sun, Moon } from "lucide-react";

const Menubar = () => {
  const { quantities, token, setToken, setQuantities, theme, toggleTheme } = useContext(StoreContext);
  const count = Object.values(quantities).filter(qty => qty > 0).length;
  const navigate = useNavigate();
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const logout = () => {
    localStorage.removeItem('token');
    setToken("");
    setQuantities({});
    navigate('/');
  };

  const navLinks = [
    { name: "Home", path: "/home", icon: Home },
    { name: "Explore", path: "/explore-foods", icon: Compass },
    { name: "Contact", path: "/contact", icon: Phone },
  ];

  if (token) {
    navLinks.push({ name: "Orders", path: "/myorders", icon: Package });
  }

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
          ? "bg-white/80 dark:bg-gray-900/80 backdrop-blur-md shadow-glass py-3"
          : "bg-transparent py-5"
          }`}
      >
        <div className="container mx-auto px-4 md:px-8 flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="text-2xl font-bold font-heading bg-gradient-to-r from-primary to-orange-600 bg-clip-text text-transparent flex items-center gap-2">
            <span className="p-2 bg-primary/10 rounded-lg text-primary">
              <Package size={24} />
            </span>
            Foodingo
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`flex items-center gap-2 font-medium transition-colors hover:text-primary ${location.pathname === link.path ? "text-primary" : "text-gray-600 dark:text-gray-300"
                  }`}
              >
                {/* <link.icon size={18} /> */}
                {link.name}
                {location.pathname === link.path && (
                  <motion.div
                    layoutId="underline"
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary"
                  />
                )}
              </Link>
            ))}
          </div>

          {/* Actions */}
          <div className="hidden md:flex items-center gap-4">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-gray-700 dark:text-gray-300"
            >
              {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
            </button>

            <Link to="/cart" className="relative p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors group">
              <ShoppingCart size={24} className="text-gray-700 dark:text-gray-300 group-hover:text-primary transition-colors" />
              {count > 0 && (
                <span className="absolute top-0 right-0 bg-primary text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full animate-bounce">
                  {count}
                </span>
              )}
            </Link>

            {!token ? (
              <div className="flex items-center gap-3">
                <button
                  onClick={() => navigate('/login')}
                  className="px-5 py-2 rounded-full border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-medium hover:border-primary hover:text-primary transition-all"
                >
                  Login
                </button>
                <button
                  onClick={() => navigate('/register')}
                  className="px-5 py-2 rounded-full bg-primary text-white font-medium hover:bg-orange-600 shadow-lg hover:shadow-orange-500/30 transition-all"
                >
                  Register
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <button onClick={logout} className="p-2 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-full text-gray-600 dark:text-gray-300 hover:text-red-500 transition-colors" title="Logout">
                  <LogOut size={22} />
                </button>
              </div>
            )}
          </div>

          {/* Mobile Toggle */}
          <div className="flex md:hidden items-center gap-4">
            <Link to="/cart" className="relative p-2 text-gray-700 dark:text-gray-300">
              <ShoppingCart size={24} />
              {count > 0 && (
                <span className="absolute top-0 right-0 bg-primary text-white text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full">
                  {count}
                </span>
              )}
            </Link>
            <button
              onClick={toggleTheme}
              className="p-2 text-gray-700 dark:text-gray-300"
            >
              {theme === 'dark' ? <Sun size={24} /> : <Moon size={24} />}
            </button>
            <button
              className="p-2 text-gray-700 dark:text-gray-300"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 z-[60] bg-black/20 backdrop-blur-sm md:hidden"
            />

            {/* Sidebar */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 bottom-0 z-[70] w-[75%] max-w-xs bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl shadow-2xl md:hidden flex flex-col"
            >
              {/* Header */}
              <div className="p-6 flex justify-between items-center border-b border-gray-100 dark:border-gray-800">
                <span className="text-xl font-bold font-heading text-primary">Foodingo</span>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2 -mr-2 text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors"
                >
                  <X size={24} />
                </button>
              </div>

              {/* Body */}
              <div className="flex-1 overflow-y-auto py-6 px-6 flex flex-col gap-2">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    to={link.path}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`flex items-center gap-4 px-4 py-3 rounded-xl transition-all ${location.pathname === link.path
                      ? "bg-primary/10 text-primary font-bold"
                      : "text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800"
                      }`}
                  >
                    <link.icon size={20} />
                    <span className="text-lg">{link.name}</span>
                  </Link>
                ))}
              </div>

              {/* Footer */}
              <div className="p-6 border-t border-gray-100 dark:border-gray-800">
                {!token ? (
                  <div className="flex flex-col gap-3">
                    <button onClick={() => { navigate('/login'); setIsMobileMenuOpen(false) }} className="w-full py-3 rounded-xl border border-gray-200 dark:border-gray-700 font-bold text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                      Login
                    </button>
                    <button onClick={() => { navigate('/register'); setIsMobileMenuOpen(false) }} className="w-full py-3 rounded-xl bg-primary text-white font-bold shadow-lg shadow-orange-500/30 hover:bg-orange-600 transition-colors">
                      Register
                    </button>
                  </div>
                ) : (
                  <button onClick={() => { logout(); setIsMobileMenuOpen(false) }} className="w-full py-3 flex items-center justify-center gap-2 rounded-xl bg-red-50 dark:bg-red-900/20 text-red-500 font-bold hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors">
                    <LogOut size={20} />
                    Logout
                  </button>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Menubar;
