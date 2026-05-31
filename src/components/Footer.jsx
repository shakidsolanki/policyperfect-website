import React from 'react';
import { ShieldCheck, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-8 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          
          <div className="col-span-1 md:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4 group">
              <div className="bg-blue-600 text-white p-2 rounded-lg">
                <ShieldCheck size={24} />
              </div>
              <span className="font-bold text-xl tracking-tight text-white">
                Policy<span className="text-blue-500">Perfect</span>
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
