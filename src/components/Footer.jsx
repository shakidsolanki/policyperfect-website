import React from 'react';
import { ShieldCheck, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-8 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          
          <div className="col-span-1 md:col-span-1">
            <Link to="/" className="flex items-center gap-3 mb-4 group">
              {/* Premium Custom SVG Brand Logo (Shield-Check with Gold Gradient) */}
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="w-9 h-9" fill="none">
                <defs>
                  <linearGradient id="footerGold" x1="100%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stop-color="#f6c21e" />
                    <stop offset="50%" stop-color="#be8c00" />
                    <stop offset="100%" stop-color="#916400" />
                  </linearGradient>
                </defs>
                {/* Left Shield Half (Vibrant Blue for dark background) */}
                <path d="M256 460 C100 320 80 180 120 60 C160 65 220 85 256 110 L256 128 C230 115 195 105 160 115 C125 185 140 295 256 415 Z" fill="#3b82f6" />
                {/* Right Shield Half (Gold Gradient) */}
                <path d="M256 460 C412 320 432 180 392 60 C352 65 292 85 256 110 L256 128 C282 115 317 105 352 115 C387 185 372 295 256 415 Z" fill="url(#footerGold)" />
                {/* Overlapping Vibrant Blue Checkmark */}
                <path d="M135 240 C135 240 185 270 235 360 C325 240 415 120 495 15 C415 90 305 250 240 375 C195 310 160 265 135 240 Z" fill="#3b82f6" />
              </svg>
              <span className="font-extrabold text-xl tracking-tight text-white group-hover:text-blue-400 transition-colors">
                Policy Perfect
              </span>
            </Link>
            <p className="text-sm text-slate-400 mb-6 leading-relaxed">
              Compare and buy the best insurance policies online. We help you find the right coverage at the best price.
            </p>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4 uppercase text-sm tracking-wider">Insurance</h3>
            <ul className="space-y-3">
              <li><Link to="/product/car" className="text-sm hover:text-orange-400 transition-colors">Car Insurance</Link></li>
              <li><Link to="/product/bike" className="text-sm hover:text-orange-400 transition-colors">Bike Insurance</Link></li>
              <li><Link to="/product/health" className="text-sm hover:text-orange-400 transition-colors">Health Insurance</Link></li>
              <li><Link to="/product/life" className="text-sm hover:text-orange-400 transition-colors">Life Insurance</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4 uppercase text-sm tracking-wider">Company</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-sm hover:text-blue-400 transition-colors">About Us</a></li>
              <li><a href="#" className="text-sm hover:text-blue-400 transition-colors">Careers</a></li>
              <li><a href="#" className="text-sm hover:text-blue-400 transition-colors">Contact Us</a></li>
              <li><a href="#" className="text-sm hover:text-blue-400 transition-colors">Partners</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4 uppercase text-sm tracking-wider">Legal</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-sm hover:text-blue-400 transition-colors">Terms of Use</a></li>
              <li><a href="#" className="text-sm hover:text-blue-400 transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="text-sm hover:text-blue-400 transition-colors">Disclaimer</a></li>
              <li><a href="#" className="text-sm hover:text-blue-400 transition-colors">ISNP</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-slate-500 text-center md:text-left max-w-3xl leading-relaxed">
            *Standard T&C Apply. Insurance is the subject matter of solicitation. Policy Perfect is an online insurance aggregator. 
            All savings and claims figures are based on internal data and vary by insurer.
          </p>
          <div className="flex items-center gap-1 text-sm text-slate-400">
            Made with <Heart size={14} className="text-red-500 fill-current" /> in India
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
