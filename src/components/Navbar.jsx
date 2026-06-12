import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShieldCheck, Menu, X, ChevronDown, User, PhoneCall } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const products = [
    { name: 'Motor Insurance', path: '/product/car' },
    { name: 'Health Insurance', path: '/product/health' },
    { name: 'Life Insurance', path: '/product/life' },
    { name: 'Travel Insurance', path: '/product/travel' },
    { name: 'Home Insurance', path: '/product/home' },
  ];

  return (
    <nav className="bg-white sticky top-0 z-50 shadow-sm border-b border-slate-200">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          
          {/* Logo */}
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="flex-shrink-0 flex items-center">
            <Link to="/" className="flex items-center">
              <img src="/logo.png" alt="Policy Perfect" className="h-10 sm:h-12 w-auto object-contain" />
            </Link>
          </motion.div>

          {/* Center Links (Desktop) */}
          <div className="hidden lg:flex items-center space-x-8">
            <div className="relative group">
              <button className="flex items-center gap-1 font-semibold text-[15px] text-slate-700 hover:text-[#1e3a8a] transition-colors py-8">
                Insurance Products <ChevronDown size={16} />
              </button>
              <div className="absolute top-[80px] left-0 w-64 bg-white border border-slate-200 shadow-xl rounded-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform origin-top-left -translate-y-2 group-hover:translate-y-0">
                <div className="py-2">
                  {products.map((product) => (
                    <Link
                      key={product.name}
                      to={product.path}
                      className="block px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-50 hover:text-[#1e3a8a] font-medium transition-colors"
                    >
                      {product.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
            <Link to="/renew" className="font-extrabold text-[14px] uppercase tracking-wider text-slate-700 hover:text-primary-500 transition-colors">Renew Policy</Link>
            <Link to="/claims" className="font-extrabold text-[14px] uppercase tracking-wider text-slate-700 hover:text-primary-500 transition-colors">Claim Support</Link>
            <Link to="/login" className="font-extrabold text-[14px] uppercase tracking-wider text-slate-700 hover:text-primary-500 transition-colors">Customer Portal</Link>
          </div>

          {/* Right Section (Desktop) */}
          <div className="hidden lg:flex items-center space-x-6">
            
            {/* Contact Info */}
            <div className="text-right">
              <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Expert Support</div>
              <div className="font-bold text-primary-500 text-[15px]">+91 75749 48768</div>
              <div className="text-[10px] text-slate-400 font-bold">support@policyperfect.co.in</div>
            </div>

            {/* Buttons */}
            <div className="flex items-center space-x-3">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link to="/admin" className="flex items-center gap-2 px-5 py-2.5 border-2 border-slate-200 rounded-lg text-slate-700 font-bold text-xs uppercase tracking-wider hover:border-primary-500 hover:text-primary-500 transition-colors">
                  <User size={16} />
                  Admin Portal
                </Link>
              </motion.div>
              <motion.button 
                whileHover={{ scale: 1.05 }} 
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 px-5 py-2.5 bg-accent-500 text-primary-500 rounded-lg font-bold text-xs uppercase tracking-wider hover:bg-accent-600 transition-colors shadow-lg shadow-accent-500/10"
              >
                <PhoneCall size={16} />
                Talk to Expert
              </motion.button>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center lg:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-slate-600 hover:text-primary-500 focus:outline-none p-2"
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden border-t border-slate-100 bg-white overflow-hidden shadow-inner"
          >
            <div className="px-4 py-4 space-y-2">
              <div className="pb-4 mb-4 border-b border-slate-100">
                <div className="text-xs font-bold text-slate-400 uppercase mb-1">Expert Support</div>
                <div className="font-bold text-primary-500">+91 75749 48768</div>
                <div className="text-xs text-slate-500 font-bold">support@policyperfect.co.in</div>
              </div>
              
              <Link to="/" onClick={() => setIsOpen(false)} className="block px-3 py-3 rounded-lg text-base font-extrabold text-slate-800 hover:bg-slate-50 hover:text-primary-500">Home</Link>
              <Link to="/renew" onClick={() => setIsOpen(false)} className="block px-3 py-3 rounded-lg text-base font-extrabold text-slate-800 hover:bg-slate-50 hover:text-primary-500">Renew Policy</Link>
              <Link to="/claims" onClick={() => setIsOpen(false)} className="block px-3 py-3 rounded-lg text-base font-extrabold text-slate-800 hover:bg-slate-50 hover:text-primary-500">Claim Support</Link>
              <Link to="/login" onClick={() => setIsOpen(false)} className="block px-3 py-3 rounded-lg text-base font-extrabold text-slate-800 hover:bg-slate-50 hover:text-primary-500">Customer Portal</Link>
              
              <div className="px-3 py-2 text-xs font-bold text-slate-400 uppercase tracking-wider">Products</div>
              {products.map((product) => (
                <Link
                  key={product.name}
                  to={product.path}
                  onClick={() => setIsOpen(false)}
                  className="block px-3 py-2.5 rounded-lg text-sm font-bold text-slate-600 hover:text-primary-500 hover:bg-slate-50 pl-6"
                >
                  {product.name}
                </Link>
              ))}
              
              <div className="pt-4 mt-4 border-t border-slate-100 grid grid-cols-2 gap-3">
                <Link to="/admin" onClick={() => setIsOpen(false)} className="flex items-center justify-center gap-2 px-4 py-3 border-2 border-slate-200 rounded-lg text-slate-700 font-bold text-xs uppercase tracking-wider">
                  Admin Portal
                </Link>
                <button className="flex items-center justify-center gap-2 px-4 py-3 bg-accent-500 text-primary-500 rounded-lg font-bold text-xs uppercase tracking-wider">
                  Talk to Expert
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
