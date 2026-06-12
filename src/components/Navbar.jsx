import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { db } from '../utils/db';
import {
  ShieldCheck, Menu, X, ChevronDown, User, PhoneCall,
  Car, Heart, TrendingUp, Plane, Home as HomeIcon, Shield,
  Bike, HeartPulse, Building2, LogIn
} from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [productsOpen, setProductsOpen] = useState(false);
  const [logo, setLogo] = useState({ url: '/logo.png', width: '180' });
  const [contact, setContact] = useState({});
  const location = useLocation();
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false);
    try { 
      setLogo(db.getLogo()); 
      setContact(db.getContact());
    } catch(e){}
  }, [location.pathname]);

  const products = [
    { name: 'Motor Insurance', path: '/product/car', icon: Car, color: '#3b82f6' },
    { name: 'Two Wheeler', path: '/product/bike', icon: Bike, color: '#06b6d4' },
    { name: 'Health Insurance', path: '/product/health', icon: HeartPulse, color: '#e11d48' },
    { name: 'Life Insurance', path: '/product/life', icon: TrendingUp, color: '#10b981' },
    { name: 'Travel Insurance', path: '/product/travel', icon: Plane, color: '#0ea5e9' },
    { name: 'Home Insurance', path: '/product/home', icon: HomeIcon, color: '#ea580c' },
    { name: 'Cyber Insurance', path: '/product/cyber', icon: Shield, color: '#8b5cf6' },
    { name: 'Business Insurance', path: '/product/business', icon: Building2, color: '#64748b' },
  ];

  const navLinks = [
    { name: 'Renew Policy', path: '/renew' },
    { name: 'Claim Support', path: '/claims' },
  ];

  return (
    <div className="sticky top-2 sm:top-4 z-50 px-2 sm:px-4 lg:px-6 transition-all duration-300 pb-2">
      <nav className={`bg-white/95 backdrop-blur-lg max-w-[1320px] mx-auto rounded-2xl sm:rounded-[1.5rem] border transition-all duration-300 ${scrolled ? 'shadow-xl shadow-teal-900/5 border-slate-200/80 py-0.5' : 'shadow-lg border-slate-100 py-1'}`}>
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-[64px] sm:h-[70px]">

          {/* Logo */}
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="flex-shrink-0 flex items-center">
            <Link to="/" className="flex items-center">
              <img src={logo.url} alt="Policy Perfect" style={{ width: `${logo.width}px`, maxWidth: '100%' }} className="h-auto object-contain transition-all duration-300" />
            </Link>
          </motion.div>

          {/* Center Nav (Desktop) */}
          <div className="hidden lg:flex items-center gap-2">
            {/* Products Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                onMouseEnter={() => setProductsOpen(true)}
                onMouseLeave={() => setProductsOpen(false)}
                className="flex items-center gap-1.5 px-4 py-2 text-[14px] font-semibold text-slate-700 hover:text-teal-600 transition-colors rounded-lg hover:bg-slate-50"
              >
                Insurance Products
                <ChevronDown size={15} className={`transition-transform duration-200 ${productsOpen ? 'rotate-180 text-teal-600' : ''}`} />
              </button>

              <AnimatePresence>
                {productsOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.97 }}
                    transition={{ duration: 0.18 }}
                    onMouseEnter={() => setProductsOpen(true)}
                    onMouseLeave={() => setProductsOpen(false)}
                    className="absolute top-full left-0 mt-1 w-[340px] bg-white rounded-2xl shadow-2xl border border-slate-100 p-3 grid grid-cols-2 gap-1"
                  >
                    {products.map((product) => {
                      const Icon = product.icon;
                      return (
                        <Link
                          key={product.path}
                          to={product.path}
                          onClick={() => setProductsOpen(false)}
                          className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-slate-50 transition-colors group"
                        >
                          <div
                            className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                            style={{ backgroundColor: product.color + '18' }}
                          >
                            <Icon size={16} style={{ color: product.color }} strokeWidth={2} />
                          </div>
                          <span className="text-[13px] font-semibold text-slate-700 group-hover:text-slate-900">{product.name}</span>
                        </Link>
                      );
                    })}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-4 py-2 text-[14px] font-semibold rounded-lg transition-colors ${
                  location.pathname === link.path
                    ? 'text-teal-600 bg-teal-50'
                    : 'text-slate-700 hover:text-teal-600 hover:bg-slate-50'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Right Section (Desktop) */}
          <div className="hidden lg:flex items-center gap-4">
            {/* Phone */}
            <a href={`tel:${contact?.phone?.replace(/\s+/g, '') || '+917574948768'}`} className="flex items-center gap-2 group">
              <div className="w-9 h-9 rounded-full bg-teal-50 flex items-center justify-center group-hover:bg-teal-100 transition-colors">
                <PhoneCall size={16} className="text-teal-600" />
              </div>
              <div>
                <div className="text-[11px] font-bold text-slate-400 leading-tight">Expert Support</div>
                <div className="text-[13px] font-bold text-slate-800 leading-tight">{contact?.phone || '+91 75749 48768'}</div>
              </div>
            </a>

            <div className="w-px h-8 bg-slate-200" />

            {/* Admin Button */}
            <Link
              to="/admin"
              className="flex items-center gap-2 px-4 py-2 border border-slate-200 rounded-xl text-slate-600 font-semibold text-[13px] hover:border-teal-400 hover:text-teal-600 hover:bg-teal-50 transition-all"
            >
              <User size={15} />
              Admin
            </Link>

            {/* Login CTA */}
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
              <Link
                to="/login"
                className="flex items-center gap-2 px-5 py-2.5 bg-teal-600 text-white rounded-xl font-semibold text-[13px] hover:bg-teal-700 transition-colors shadow-lg shadow-teal-900/10"
              >
                <LogIn size={15} />
                Login
              </Link>
            </motion.div>
          </div>

          {/* Mobile Hamburger */}
          <div className="flex items-center lg:hidden gap-3">
            <a href={`tel:${contact?.phone?.replace(/\s+/g, '') || '+917574948768'}`} className="w-9 h-9 rounded-full bg-teal-50 flex items-center justify-center">
              <PhoneCall size={16} className="text-teal-600" />
            </a>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="w-9 h-9 rounded-lg bg-slate-100 flex items-center justify-center text-slate-600 hover:bg-slate-200 transition-colors"
            >
              {isOpen ? <X size={20} /> : <Menu size={20} />}
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
            transition={{ duration: 0.2 }}
            className="lg:hidden border-t border-slate-100 bg-white overflow-hidden"
          >
            <div className="px-4 py-4 space-y-1">
              {/* Phone info */}
              <div className="flex items-center gap-3 px-3 py-3 mb-2 bg-teal-50 rounded-xl">
                <PhoneCall size={16} className="text-teal-600" />
                <div>
                  <div className="text-[11px] font-bold text-slate-500">Expert Support</div>
                  <div className="text-[14px] font-bold text-slate-800">+91 75749 48768</div>
                </div>
              </div>

              <Link to="/" className="block px-3 py-2.5 rounded-lg text-[15px] font-semibold text-slate-800 hover:bg-slate-50 hover:text-teal-600">Home</Link>
              <Link to="/renew" className="block px-3 py-2.5 rounded-lg text-[15px] font-semibold text-slate-800 hover:bg-slate-50 hover:text-teal-600">Renew Policy</Link>
              <Link to="/claims" className="block px-3 py-2.5 rounded-lg text-[15px] font-semibold text-slate-800 hover:bg-slate-50 hover:text-teal-600">Claim Support</Link>


              <div className="px-3 pt-3 pb-1">
                <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Products</p>
              </div>

              <div className="grid grid-cols-2 gap-1">
                {products.map((product) => {
                  const Icon = product.icon;
                  return (
                    <Link
                      key={product.path}
                      to={product.path}
                      className="flex items-center gap-2 px-3 py-2.5 rounded-lg hover:bg-slate-50 transition-colors"
                    >
                      <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ backgroundColor: product.color + '18' }}>
                        <Icon size={14} style={{ color: product.color }} />
                      </div>
                      <span className="text-[13px] font-semibold text-slate-700">{product.name}</span>
                    </Link>
                  );
                })}
              </div>

              <div className="pt-3 mt-2 border-t border-slate-100 grid grid-cols-2 gap-2">
                <Link to="/admin" className="flex items-center justify-center gap-2 px-4 py-2.5 border border-slate-200 rounded-xl text-slate-700 font-semibold text-[13px]">
                  <User size={14} />
                  Admin Portal
                </Link>
                <Link to="/login" className="flex items-center justify-center gap-2 px-4 py-2.5 bg-teal-600 text-white rounded-xl font-semibold text-[13px] hover:bg-teal-700 transition-colors">
                  <LogIn size={14} />
                  Login
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
    </div>
  );
};

export default Navbar;
