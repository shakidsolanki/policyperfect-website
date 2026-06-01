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
                    <stop offset="0%" stop-color="#F9D423" />
                    <stop offset="50%" stop-color="#CCA43B" />
                    <stop offset="100%" stop-color="#9E7818" />
                  </linearGradient>
                </defs>
                <path d="M 434 85 L 413 105 L 386 136 L 385 139 L 385 167 L 382 200 L 378 227 L 373 251 L 368 270 L 360 294 L 358 297 L 358 299 L 356 302 L 356 304 L 353 309 L 353 311 L 341 335 L 339 337 L 335 345 L 331 350 L 330 353 L 317 371 L 302 389 L 283 408 L 264 424 L 249 435 L 246 436 L 233 445 L 225 449 L 222 449 L 220 450 L 220 507 L 225 507 L 231 504 L 233 504 L 235 502 L 248 496 L 250 494 L 255 492 L 257 490 L 265 486 L 287 471 L 313 450 L 329 435 L 348 414 L 369 386 L 370 383 L 372 381 L 375 375 L 377 373 L 378 370 L 380 368 L 383 361 L 385 359 L 396 337 L 396 335 L 399 330 L 399 328 L 401 325 L 401 323 L 405 315 L 406 310 L 408 307 L 411 298 L 411 295 L 413 292 L 422 258 L 428 228 L 432 199 L 435 160 L 435 90 Z" fill="url(#navGold)" />
                <path d="M 220 6 L 220 65 L 223 65 L 256 82 L 258 82 L 265 86 L 267 86 L 272 89 L 274 89 L 277 91 L 279 91 L 282 93 L 285 94 L 287 94 L 290 96 L 308 102 L 312 103 L 316 103 L 318 102 L 329 91 L 338 83 L 344 78 L 351 73 L 359 66 L 359 64 L 357 63 L 355 63 L 347 61 L 341 59 L 337 58 L 322 53 L 319 51 L 317 51 L 311 49 L 308 47 L 306 47 L 303 46 L 300 44 L 298 44 L 295 42 L 293 42 L 288 39 L 286 39 L 277 34 L 275 34 L 262 27 L 260 27 L 258 25 L 256 25 L 254 23 L 235 14 L 233 12 L 228 10 L 226 8 L 224 8 L 222 6 Z" fill="url(#navGold)" />
                <path d="M 218 6 L 197 17 L 195 19 L 180 26 L 178 28 L 176 28 L 147 42 L 145 42 L 127 50 L 119 52 L 116 54 L 60 70 L 26 77 L 5 80 L 2 83 L 2 102 L 0 104 L 0 138 L 2 140 L 3 178 L 7 215 L 15 258 L 25 295 L 36 325 L 49 353 L 66 382 L 84 407 L 100 426 L 121 447 L 145 467 L 168 483 L 183 492 L 190 495 L 192 497 L 214 507 L 219 506 L 218 504 L 218 450 L 208 447 L 177 427 L 157 411 L 131 385 L 117 368 L 104 349 L 94 332 L 82 307 L 70 274 L 59 229 L 55 204 L 52 174 L 51 126 L 56 122 L 92 115 L 142 99 L 145 97 L 167 89 L 172 86 L 174 86 L 203 72 L 205 70 L 215 65 L 219 64 L 219 16 Z" fill="#012e67" />
                <path d="M 509 2 L 493 7 L 478 14 L 476 14 L 469 18 L 467 18 L 431 37 L 429 39 L 416 46 L 395 60 L 356 90 L 326 117 L 308 135 L 276 170 L 237 218 L 222 238 L 210 256 L 205 260 L 200 255 L 193 244 L 182 230 L 166 214 L 156 207 L 154 207 L 148 204 L 144 203 L 135 203 L 122 207 L 109 215 L 100 222 L 93 229 L 93 231 L 95 233 L 97 233 L 111 242 L 130 260 L 147 280 L 169 309 L 205 363 L 207 365 L 210 364 L 212 359 L 214 357 L 216 352 L 227 335 L 229 330 L 231 328 L 232 325 L 234 323 L 247 300 L 251 295 L 255 287 L 270 265 L 271 262 L 310 205 L 333 174 L 356 145 L 394 101 L 429 65 L 443 52 L 467 32 Z" fill="#012e67" />
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
