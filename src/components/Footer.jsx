import React, { useState } from 'react';
import { Heart, X, Shield, Info, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const Footer = () => {
  const [activeModal, setActiveModal] = useState(null);

  const modalContent = {
    about: {
      title: 'About PolicyPerfect',
      icon: Info,
      color: 'text-blue-500 bg-blue-50',
      text: 'PolicyPerfect is India\'s premier online insurance comparison and advisory portal. Established with a vision to simplify insurance, we empower you to compare, choose, and buy the best insurance plans from 25+ top insurers in India. Our mission is to provide 100% transparent rates, zero hidden fees, and dedicated claim support when you need it most.'
    },
    careers: {
      title: 'Join the PolicyPerfect Team',
      icon: Shield,
      color: 'text-green-500 bg-green-50',
      text: 'We are always looking for passionate people to help us revolutionize the insurance industry in India. We have open positions across software engineering, digital marketing, sales, and operations. Send your resume to careers@policyperfect.co.in or call +91 75749 48768 to speak to our HR team.'
    },
    partners: {
      title: 'Our Insurance Partners',
      icon: CheckCircle2,
      color: 'text-sky-500 bg-sky-50',
      text: 'We work with 25+ leading insurance providers in India to bring you the best rates and comprehensive coverage options: HDFC ERGO, ICICI Lombard, Reliance General, Tata AIG, Bajaj Allianz, Digit Insurance, SBI General, IFFCO Tokio, Kotak General, Universal Sompo, and many more.'
    },
    terms: {
      title: 'Terms of Use',
      icon: Info,
      color: 'text-purple-500 bg-purple-50',
      text: 'Welcome to PolicyPerfect. By accessing this website (policyperfect.co.in), you agree to comply with our terms of service. The comparison data, premium calculations, and materials on this site are provided for informational purposes. We make every effort to display accurate premiums, but final rates are determined by the respective insurance companies based on underwriting guidelines.'
    },
    privacy: {
      title: 'Privacy Policy',
      icon: Shield,
      color: 'text-teal-500 bg-teal-50',
      text: 'Your privacy is of utmost importance to us. PolicyPerfect collects basic contact details (name, email, phone) and vehicle/health information solely to fetch premium quotes from our insurance partners and save leads for follow-up support. We do not sell or share your personal data with unauthorized third parties. All lead data is encrypted and securely stored.'
    },
    disclaimer: {
      title: 'Disclaimer',
      icon: Info,
      color: 'text-red-500 bg-red-50',
      text: 'Insurance is the subject matter of solicitation. PolicyPerfect acts as an online comparison aggregator and does not directly issue policies or guarantee claim settlements. The information displayed is based on details provided by insurers. Customers are advised to read policy terms and conditions carefully before purchasing.'
    },
    isnp: {
      title: 'ISNP Registration Details',
      icon: CheckCircle2,
      color: 'text-indigo-500 bg-indigo-50',
      text: 'PolicyPerfect is fully compliant with the Insurance Regulatory and Development Authority of India (IRDAI) guidelines for Insurance Self-Network Platforms (ISNP).\n\nRegistered Aggregator: PolicyPerfect Insurance Brokers Pvt. Ltd.\nIRDAI License No: IRDAI/DB-984/2026\nStatus: Active.'
    }
  };

  const activeData = modalContent[activeModal];

  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-8 border-t border-slate-800 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          
          <div className="col-span-1 md:col-span-1">
            <Link to="/" className="flex items-center mb-4">
              <img src="/logo-white.png" alt="Policy Perfect" className="h-9 w-auto object-contain" />
            </Link>
            <p className="text-sm text-slate-400 mb-6 leading-relaxed">
              Compare and buy the best insurance policies online. We help you find the right coverage at the best price.
            </p>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4 uppercase text-sm tracking-wider">Insurance</h3>
            <ul className="space-y-3">
              <li><Link to="/product/car" className="text-sm hover:text-blue-400 transition-colors">Car Insurance</Link></li>
              <li><Link to="/product/bike" className="text-sm hover:text-blue-400 transition-colors">Bike Insurance</Link></li>
              <li><Link to="/product/health" className="text-sm hover:text-blue-400 transition-colors">Health Insurance</Link></li>
              <li><Link to="/product/life" className="text-sm hover:text-blue-400 transition-colors">Life Insurance</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4 uppercase text-sm tracking-wider">Company</h3>
            <ul className="space-y-3">
              <li><a href="#" onClick={(e) => { e.preventDefault(); setActiveModal('about'); }} className="text-sm hover:text-blue-400 transition-colors">About Us</a></li>
              <li><a href="#" onClick={(e) => { e.preventDefault(); setActiveModal('careers'); }} className="text-sm hover:text-blue-400 transition-colors">Careers</a></li>
              <li><Link to="/claims" className="text-sm hover:text-blue-400 transition-colors">Contact Us</Link></li>
              <li><a href="#" onClick={(e) => { e.preventDefault(); setActiveModal('partners'); }} className="text-sm hover:text-blue-400 transition-colors">Partners</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4 uppercase text-sm tracking-wider">Legal</h3>
            <ul className="space-y-3">
              <li><a href="#" onClick={(e) => { e.preventDefault(); setActiveModal('terms'); }} className="text-sm hover:text-blue-400 transition-colors">Terms of Use</a></li>
              <li><a href="#" onClick={(e) => { e.preventDefault(); setActiveModal('privacy'); }} className="text-sm hover:text-blue-400 transition-colors">Privacy Policy</a></li>
              <li><a href="#" onClick={(e) => { e.preventDefault(); setActiveModal('disclaimer'); }} className="text-sm hover:text-blue-400 transition-colors">Disclaimer</a></li>
              <li><a href="#" onClick={(e) => { e.preventDefault(); setActiveModal('isnp'); }} className="text-sm hover:text-blue-400 transition-colors">ISNP</a></li>
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

      {/* Info Modals */}
      <AnimatePresence>
        {activeModal && activeData && (
          <div className="fixed inset-0 z-[150] flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-lg bg-white rounded-2xl shadow-2xl overflow-hidden border border-slate-200"
            >
              <div className="px-6 py-5 border-b border-slate-100 flex justify-between items-center bg-slate-50">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${activeData.color}`}>
                    <activeData.icon size={20} />
                  </div>
                  <h3 className="font-extrabold text-slate-800 text-lg">{activeData.title}</h3>
                </div>
                <button 
                  onClick={() => setActiveModal(null)}
                  className="w-8 h-8 rounded-full hover:bg-slate-200 flex items-center justify-center text-slate-500 transition-colors"
                >
                  <X size={18} />
                </button>
              </div>
              <div className="p-6">
                <p className="text-sm text-slate-600 leading-relaxed whitespace-pre-line font-medium">
                  {activeData.text}
                </p>
              </div>
              <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex justify-end">
                <button 
                  onClick={() => setActiveModal(null)}
                  className="px-5 py-2 bg-[#012e67] hover:bg-blue-900 text-white font-bold rounded-xl text-sm transition-colors shadow-md"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </footer>
  );
};

export default Footer;
