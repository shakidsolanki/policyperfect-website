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
            <Link to="/" className="flex items-center gap-3 group">
              {/* Premium Custom SVG Brand Logo (Shield-Check with Gold Gradient) */}
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="w-11 h-11" fill="none">
                <defs>
                  <linearGradient id="navGold" x1="100%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stop-color="#f6c21e" />
                    <stop offset="50%" stop-color="#be8c00" />
                    <stop offset="100%" stop-color="#916400" />
                  </linearGradient>
                </defs>
                {/* Left Shield Half (Navy Blue) */}
                <path d="M256 460 C100 320 80 180 120 60 C160 65 220 85 256 110 L256 128 C230 115 195 105 160 115 C125 185 140 295 256 415 Z" fill="#012e67" />
                {/* Right Shield Half (Gold Gradient) */}
                <path d="M256 460 C412 320 432 180 392 60 C352 65 292 85 256 110 L256 128 C282 115 317 105 352 115 C387 185 372 295 256 415 Z" fill="url(#navGold)" />
                {/* Overlapping Navy Checkmark */}
                <path d="M135 240 C135 240 185 270 235 360 C325 240 415 120 495 15 C415 90 305 250 240 375 C195 310 160 265 135 240 Z" fill="#012e67" />
              </svg>
              <span className="font-extrabold text-2xl tracking-tight text-[#012e67] group-hover:text-blue-800 transition-colors">
                Policy Perfect
              </span>
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
            <Link to="/renew" className="font-semibold text-[15px] text-slate-700 hover:text-[#1e3a8a] transition-colors">Renew Policy</Link>
            <Link to="/claims" className="font-semibold text-[15px] text-slate-700 hover:text-[#1e3a8a] transition-colors">Claim Support</Link>
          </div>

          {/* Right Section (Desktop) */}
          <div className="hidden lg:flex items-center space-x-6">
            
            {/* Contact Info */}
            <div className="text-right">
              <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Expert Support</div>
              <div className="font-bold text-[#1e3a8a] text-[15px]">+91 75749 48768</div>
              <div className="text-[10px] text-slate-500">support@policyperfect.co.in</div>
            </div>

            {/* Buttons */}
            <div className="flex items-center space-x-3">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link to="/admin" className="flex items-center gap-2 px-5 py-2.5 border-2 border-slate-200 rounded-lg text-slate-700 font-semibold text-sm hover:border-[#1e3a8a] hover:text-[#1e3a8a] transition-colors">
                  <User size={18} />
                  Sign In
                </Link>
              </motion.div>
              <motion.button 
                whileHover={{ scale: 1.05 }} 
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 px-5 py-2.5 bg-[#1e3a8a] text-white rounded-lg font-semibold text-sm hover:bg-blue-900 transition-colors shadow-lg shadow-blue-900/20"
              >
                <PhoneCall size={18} />
                Talk to Expert
              </motion.button>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center lg:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-slate-600 hover:text-[#1e3a8a] focus:outline-none p-2"
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
                <div className="text-xs font-bold text-slate-500 uppercase mb-1">Expert Support</div>
                <div className="font-bold text-[#1e3a8a]">+91 75749 48768</div>
                <div className="text-sm text-slate-500">support@policyperfect.co.in</div>
              </div>
              
              <Link to="/" onClick={() => setIsOpen(false)} className="block px-3 py-3 rounded-lg text-base font-semibold text-slate-800 hover:bg-slate-50">Home</Link>
              <div className="px-3 py-2 text-xs font-bold text-slate-400 uppercase tracking-wider">Products</div>
              {products.map((product) => (
                <Link
                  key={product.name}
                  to={product.path}
                  onClick={() => setIsOpen(false)}
                  className="block px-3 py-2.5 rounded-lg text-sm font-medium text-slate-600 hover:text-[#1e3a8a] hover:bg-slate-50 pl-6"
                >
                  {product.name}
                </Link>
              ))}
              
              <div className="pt-4 mt-4 border-t border-slate-100 grid grid-cols-2 gap-3">
                <Link to="/admin" onClick={() => setIsOpen(false)} className="flex items-center justify-center gap-2 px-4 py-3 border-2 border-slate-200 rounded-lg text-slate-700 font-semibold text-sm">
                  Sign In
                </Link>
                <button className="flex items-center justify-center gap-2 px-4 py-3 bg-[#1e3a8a] text-white rounded-lg font-semibold text-sm">
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
