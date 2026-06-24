import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Car, Bike, HeartPulse, TrendingUp, Plane, Home as HomeIcon, Shield, Building2,
  CheckCircle2, ArrowLeft, PhoneCall, ShieldCheck, Sparkles, Filter, Info, Mail, User, Send, Check
} from 'lucide-react';
import HeroBackground from '../components/HeroBackground';
import SEO from '../components/SEO';
import { db } from '../utils/db';

const PRODUCT_LIST = [
  { id: 'motor_car', label: 'Car Insurance', icon: Car, color: '#2563eb', bg: '#eff6ff' },
  { id: 'motor_bike', label: 'Bike Insurance', icon: Bike, color: '#0891b2', bg: '#ecfeff' },
  { id: 'health', label: 'Health Insurance', icon: HeartPulse, color: '#dc2626', bg: '#fef2f2' },
  { id: 'life', label: 'Life Insurance', icon: TrendingUp, color: '#059669', bg: '#ecfdf5' },
  { id: 'travel', label: 'Travel Insurance', icon: Plane, color: '#0284c7', bg: '#f0f9ff' },
  { id: 'home', label: 'Home Insurance', icon: HomeIcon, color: '#ea580c', bg: '#fff7ed' },
  { id: 'cyber', label: 'Cyber Insurance', icon: Shield, color: '#7c3aed', bg: '#f5f3ff' },
  { id: 'business', label: 'Business Insurance', icon: Building2, color: '#475569', bg: '#f8fafc' },
];

const MOCK_PLANS = {
  motor_car: [
    { insurer: 'HDFC ERGO', logo: '🛡️', premium: '₹2,450 / yr', idv: '₹4,50,000', ratio: '98.4%', benefits: ['Cashless repair at 8,000+ garages', '24x7 emergency roadside support', 'Free zero-depreciation addon'] },
    { insurer: 'ICICI Lombard', logo: '💎', premium: '₹2,600 / yr', idv: '₹4,60,000', ratio: '97.8%', benefits: ['Instant video claims in 30 mins', 'No claim bonus protection', 'Engine protect cover included'] },
    { insurer: 'Digit Insurance', logo: '⚡', premium: '₹2,100 / yr', idv: '₹4,30,000', ratio: '96.2%', benefits: ['100% paperless self-inspection', 'Fastest claim approvals', 'Return to invoice cover'] },
    { insurer: 'Tata AIG', logo: '⭐', premium: '₹2,550 / yr', idv: '₹4,55,000', ratio: '99.0%', benefits: ['Free pick-up and drop facility', 'Original OEM parts warranty', 'Consumables cover addon'] }
  ],
  motor_bike: [
    { insurer: 'HDFC ERGO', logo: '🛡️', premium: '₹750 / yr', idv: '₹75,000', ratio: '98.4%', benefits: ['Cashless claims at 4,000+ workshops', 'Instant online policy issuance', 'Third-party cover included'] },
    { insurer: 'ICICI Lombard', logo: '💎', premium: '₹790 / yr', idv: '₹78,000', ratio: '97.8%', benefits: ['Multi-year policy discount options', 'Personal accident cover up to 15 Lakhs', '24x7 towing support'] },
    { insurer: 'Digit Insurance', logo: '⚡', premium: '₹680 / yr', idv: '₹72,000', ratio: '96.2%', benefits: ['Super simple mobile inspections', 'Guaranteed lowest premium rate', 'Zero paper documentation'] }
  ],
  health: [
    { insurer: 'HDFC ERGO Optima', logo: '❤️', premium: '₹780 / mo', idv: '₹10 Lakhs', ratio: '99.0%', benefits: ['2x automatic restore cover benefit', 'Zero room room rent capping charges', '10,000+ network cashless hospitals'] },
    { insurer: 'Star Health Assure', logo: '✨', premium: '₹840 / mo', idv: '₹10 Lakhs', ratio: '98.2%', benefits: ['Pre-existing diseases covered in 3 yrs', 'Free annual health checkup package', 'Assured renewal for life'] },
    { insurer: 'Niva Bupa ReAssure', logo: '🌟', premium: '₹690 / mo', idv: '₹10 Lakhs', ratio: '96.5%', benefits: ['Unlimited re-assure cover benefits', '30-minute cashless claim processing', 'Active wellness discount up to 30%'] },
    { insurer: 'Care Health Secure', logo: '🎗️', premium: '₹620 / mo', idv: '₹7 Lakhs', ratio: '95.2%', benefits: ['No-claim bonus up to 150%', 'Global treatment cover included', 'Cashless home care treatment option'] }
  ],
  life: [
    { insurer: 'HDFC Life Click2Protect', logo: '🕊️', premium: '₹980 / mo', idv: '₹1 Crore', ratio: '99.3%', benefits: ['Immediate terminal illness payouts', 'Tax exemptions under Section 80C', 'Accidental death cover riders'] },
    { insurer: 'ICICI Pru iProtect', logo: '👑', premium: '₹890 / mo', idv: '₹1 Crore', ratio: '97.9%', benefits: ['Special lower rates for non-smokers', 'Critical illness protection cover', 'Flexible payout options (lump sum/monthly)'] },
    { insurer: 'Max Life SmartSecure', logo: '🎖️', premium: '₹850 / mo', idv: '₹1 Crore', ratio: '99.5%', benefits: ['Premium back option upon maturity', 'Voluntary sum assured top-up feature', 'Dedicated relationship advisor'] }
  ],
  travel: [
    { insurer: 'Tata AIG TravelGuard', logo: '✈️', premium: '₹550 / trip', idv: '₹50,000 $', ratio: '99.0%', benefits: ['Emergency medical evacuation cover', 'Loss of checked baggage compensation', 'Flight delay & trip cancellation payouts'] },
    { insurer: 'Digit WorldCover', logo: '🌍', premium: '₹490 / trip', idv: '₹50,000 $', ratio: '96.2%', benefits: ['Global cashless hospital network access', 'Adventure sports coverage included', 'Missed connection flight cover'] }
  ],
  home: [
    { insurer: 'HDFC ERGO HomeShield', logo: '🏡', premium: '₹1,500 / yr', idv: '₹50 Lakhs', ratio: '98.4%', benefits: ['Covers earthquake and flood damages', 'Alternate accommodation rental allowance', 'Electronic appliances cover addon'] },
    { insurer: 'ICICI Lombard HomeSafe', logo: '🔒', premium: '₹1,650 / yr', idv: '₹50 Lakhs', ratio: '97.8%', benefits: ['Robbery and burglary coverage included', 'Terrorism damage cover options', 'Portable equipment cover worldwide'] }
  ],
  cyber: [
    { insurer: 'HDFC ERGO CyberSafe', logo: '💻', premium: '₹1,200 / yr', idv: '₹5 Lakhs', ratio: '98.4%', benefits: ['Identity theft loss recovery costs', 'Phishing & email spoofing protection', 'Cyber extortion defense legal expense'] },
    { insurer: 'QuickHeal CyberPlan', logo: '🛡️', premium: '₹999 / yr', idv: '₹3 Lakhs', ratio: '95.0%', benefits: ['Malware attack liability compensation', 'Online shopping fraud coverage', 'IT expert consultation fees covered'] }
  ],
  business: [
    { insurer: 'Tata AIG ShopKeeper', logo: '🏬', premium: '₹3,500 / yr', idv: '₹20 Lakhs', ratio: '99.0%', benefits: ['Fire and allied perils coverage', 'Public liability cover for customer injury', 'Business interruption loss allowance'] },
    { insurer: 'Digit SME Shield', logo: '💼', premium: '₹3,100 / yr', idv: '₹20 Lakhs', ratio: '96.2%', benefits: ['Machinery breakdown coverage included', 'Employee workmen compensation addons', 'Fastest paperless claims settlement'] }
  ]
};

export default function QuotesPage() {
  const location = useLocation();
  const navigate = useNavigate();

  // Quote form inputs
  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');
  const [email, setEmail] = useState('');
  const [selectedProduct, setSelectedProduct] = useState('health');
  const [vehicleNumber, setVehicleNumber] = useState('');
  const [message, setMessage] = useState('');

  // Control state
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [activeProduct, setActiveProduct] = useState('health');
  const [callbackRequested, setCallbackRequested] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    // If state is passed from home page, pre-fill and submit
    if (location.state) {
      const { name: sName, mobile: sMobile, initialProduct: sProd } = location.state;
      if (sName && sMobile) {
        setName(sName);
        setMobile(sMobile);
        if (sProd) {
          setSelectedProduct(sProd);
          setActiveProduct(sProd);
        }
        setFormSubmitted(true);
      }
    }
  }, [location.state]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [activeProduct]);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!name || !mobile) {
      alert('Please fill in Name and Mobile Number.');
      return;
    }
    
    setIsSubmitting(true);
    try {
      const nowString = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });
      const currentProd = PRODUCT_LIST.find(p => p.id === selectedProduct)?.label || selectedProduct;
      
      const newLead = {
        id: 'L-' + Date.now().toString().slice(-6),
        name,
        mobile,
        email: email || 'N/A',
        productType: currentProd,
        insuranceType: currentProd,
        vehicleNumber: vehicleNumber || 'N/A',
        message: message || 'Requesting free insurance quotes',
        status: 'New',
        createdDate: nowString,
        assignedUser: 'Unassigned'
      };

      if (db.addLead) {
        await db.addLead(newLead);
      }

      // Simulate a small delay for verification and fetching live rates
      setTimeout(() => {
        setIsSubmitting(false);
        setActiveProduct(selectedProduct);
        setFormSubmitted(true);
      }, 1500);

    } catch (err) {
      console.error(err);
      setIsSubmitting(false);
    }
  };

  const handleRequestCallback = (planName) => {
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setCallbackRequested(planName);
      setTimeout(() => setCallbackRequested(null), 4000);
    }, 1200);
  };

  const plans = MOCK_PLANS[activeProduct] || MOCK_PLANS['health'];
  const activeProductData = PRODUCT_LIST.find(p => p.id === activeProduct) || PRODUCT_LIST[2];

  return (
    <div className="bg-transparent min-h-screen">
      <SEO 
        title={formSubmitted ? `Compare ${activeProductData.label} Quotes | PolicyPerfect` : "Get Free Insurance Quotes | PolicyPerfect"} 
        description={formSubmitted 
          ? `Compare premiums, benefits and claim settlement ratios from India's top insurers for ${activeProductData.label}.`
          : "Request free insurance quotes for Car, Bike, Health, Life, Travel, Home, and Business insurance from India's top insurers."
        }
      />

      {/* Header Banner */}
      <div className="bg-[#0c1b33] text-white py-12 relative overflow-hidden border-b border-[#dfb15b]/20">
        <HeroBackground isDark={true} icons={[Sparkles, CheckCircle2, TrendingUp, Shield]} />
        <div className="absolute inset-0 opacity-10 z-0">
          <div className="absolute top-0 right-1/4 w-80 h-80 bg-white/20 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-1/4 w-60 h-60 bg-white/20 rounded-full blur-2xl" />
        </div>
        
        <div className="max-w-[1280px] mx-auto px-6 sm:px-8 lg:px-16 relative z-10">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <Link to="/" className="inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-wider text-[#dfb15b] hover:text-white transition-colors mb-3">
                <ArrowLeft size={12} /> Back to Home
              </Link>
              <h1 className="text-2xl sm:text-3xl font-black tracking-tight leading-none mb-2">
                {formSubmitted ? `Hey ${name}, Compare Best Quotes!` : "Get Free Insurance Quotes"}
              </h1>
              <p className="text-slate-300 text-[13px] font-semibold flex items-center gap-2">
                {formSubmitted ? (
                  <>
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                    Showing live quotes for your mobile: <strong className="text-white">+91 {mobile}</strong>
                  </>
                ) : (
                  "Compare premiums from 25+ top insurance companies in India instantly."
                )}
              </p>
            </div>
            
            <div className="flex items-center gap-3 bg-white/5 backdrop-blur px-5 py-3 rounded-2xl border border-white/10 w-fit">
              <div className="w-8 h-8 rounded-full bg-[#dfb15b]/10 border border-[#dfb15b]/20 flex items-center justify-center text-[#dfb15b]">
                <Sparkles size={16} />
              </div>
              <div>
                <p className="text-[11px] text-slate-400 font-bold uppercase tracking-wide leading-none mb-0.5">Assistance</p>
                <p className="text-xs font-black text-white">Call Helpline: +91 75749 48768</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {!formSubmitted ? (
        /* Render Quote Request Form */
        <div className="max-w-2xl mx-auto px-6 py-12">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-[2rem] shadow-xl border border-slate-100 p-8 sm:p-12 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-24 h-24 bg-[#dfb15b]/10 rounded-bl-full flex items-center justify-center" />
            
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 bg-amber-50 text-amber-600 rounded-2xl flex items-center justify-center border border-amber-100">
                <Sparkles size={24} />
              </div>
              <div>
                <span className="text-[11px] font-black uppercase tracking-wider text-teal-600 block mb-0.5">Instant Proposals</span>
                <h2 className="text-xl sm:text-2xl font-black text-slate-800 leading-tight">Request Free Insurance Quotes</h2>
              </div>
            </div>

            <form onSubmit={handleFormSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="space-y-1.5">
                  <label className="text-[11px] font-black uppercase text-slate-400 tracking-wider">Full Name *</label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                    <input 
                      type="text" 
                      required 
                      value={name} 
                      onChange={e => setName(e.target.value)}
                      placeholder="Enter your name" 
                      className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl font-semibold text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-[#dfb15b]/20 focus:border-[#dfb15b] focus:bg-white transition-all"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[11px] font-black uppercase text-slate-400 tracking-wider">Mobile Number *</label>
                  <div className="relative">
                    <PhoneCall className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                    <input 
                      type="tel" 
                      required 
                      pattern="[0-9]{10}"
                      value={mobile}
                      onChange={e => setMobile(e.target.value)}
                      placeholder="10-digit mobile number" 
                      className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl font-semibold text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-[#dfb15b]/20 focus:border-[#dfb15b] focus:bg-white transition-all"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="space-y-1.5">
                  <label className="text-[11px] font-black uppercase text-slate-400 tracking-wider">Email Address</label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                    <input 
                      type="email" 
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      placeholder="Enter email address" 
                      className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl font-semibold text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-[#dfb15b]/20 focus:border-[#dfb15b] focus:bg-white transition-all"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[11px] font-black uppercase text-slate-400 tracking-wider">Insurance Product *</label>
                  <select 
                    value={selectedProduct} 
                    onChange={e => setSelectedProduct(e.target.value)}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl font-semibold text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-[#dfb15b]/20 focus:border-[#dfb15b] focus:bg-white transition-all appearance-none"
                  >
                    {PRODUCT_LIST.map(p => (
                      <option key={p.id} value={p.id}>{p.label}</option>
                    ))}
                  </select>
                </div>
              </div>

              {selectedProduct.startsWith('motor') && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="space-y-1.5"
                >
                  <label className="text-[11px] font-black uppercase text-slate-400 tracking-wider">Vehicle Registration Number *</label>
                  <input 
                    type="text" 
                    required 
                    value={vehicleNumber}
                    onChange={e => setVehicleNumber(e.target.value.toUpperCase())}
                    placeholder="e.g. GJ-01-XX-9999" 
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl font-semibold text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-[#dfb15b]/20 focus:border-[#dfb15b] focus:bg-white transition-all"
                  />
                </motion.div>
              )}

              <div className="space-y-1.5">
                <label className="text-[11px] font-black uppercase text-slate-400 tracking-wider">Message / Coverage Requirements</label>
                <textarea 
                  rows={3} 
                  value={message}
                  onChange={e => setMessage(e.target.value)}
                  placeholder="e.g. I need cashless garage options, zero depreciation add-on, etc." 
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl font-semibold text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-[#dfb15b]/20 focus:border-[#dfb15b] focus:bg-white transition-all resize-none"
                />
              </div>

              <button 
                type="submit" 
                disabled={isSubmitting}
                className="w-full py-4 bg-[#dfb15b] hover:bg-[#cfa14a] text-slate-900 font-black rounded-xl text-sm transition-colors shadow-lg shadow-amber-500/10 flex items-center justify-center gap-2"
              >
                {isSubmitting ? 'Comparing Quotes...' : <><Send size={15} /> Compare Free Quotes</>}
              </button>
            </form>
          </motion.div>
        </div>
      ) : (
        /* Render Comparison Dashboard */
        <div className="max-w-[1280px] mx-auto px-6 sm:px-8 lg:px-16 py-10">
          <div className="flex flex-col lg:flex-row gap-8">
            
            {/* LEFT: Sidebar categories */}
            <div className="w-full lg:w-[28%] flex-shrink-0">
              <div className="bg-white rounded-[2rem] border border-slate-100 p-6 shadow-xl sticky top-24">
                <h3 className="text-xs font-black uppercase text-slate-400 tracking-widest mb-4 flex items-center gap-1.5">
                  <Filter size={12} /> Select Product
                </h3>
                
                <div className="flex flex-col gap-2">
                  {PRODUCT_LIST.map((prod) => {
                    const Icon = prod.icon;
                    const isActive = activeProduct === prod.id;
                    return (
                      <button
                        key={prod.id}
                        onClick={() => {
                          setActiveProduct(prod.id);
                          setSelectedProduct(prod.id);
                        }}
                        className={`w-full flex items-center gap-3.5 px-4 py-3.5 rounded-2xl border-2 transition-all text-left font-black text-[13.5px] ${
                          isActive 
                            ? 'border-[#0c1b33] bg-[#0c1b33]/5 text-[#0c1b33]' 
                            : 'border-slate-50 hover:border-slate-200 bg-slate-50 text-slate-600 hover:text-slate-900'
                        }`}
                      >
                        <div className="w-9 h-9 rounded-xl flex items-center justify-center border"
                          style={{ 
                            background: isActive ? '#0c1b33' : '#fff',
                            borderColor: isActive ? '#0c1b33' : '#e2e8f0'
                          }}
                        >
                          <Icon size={18} style={{ color: isActive ? '#dfb15b' : prod.color }} />
                        </div>
                        <span>{prod.label}</span>
                      </button>
                    );
                  })}
                </div>
                
                <button 
                  onClick={() => setFormSubmitted(false)}
                  className="w-full mt-6 py-3 border-2 border-slate-200 hover:border-slate-300 text-slate-600 hover:text-slate-800 font-bold rounded-2xl text-xs transition-colors flex items-center justify-center gap-1.5"
                >
                  <ArrowLeft size={13} /> Update Quote Request
                </button>
              </div>
            </div>

            {/* RIGHT: Compare plans list */}
            <div className="w-full lg:w-[72%]">
              
              {/* Header info */}
              <div className="bg-white rounded-2xl border border-slate-100 px-6 py-4 shadow-md mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: activeProductData.bg }}>
                    <activeProductData.icon size={22} style={{ color: activeProductData.color }} />
                  </div>
                  <div>
                    <h2 className="text-[16px] font-black text-slate-800 leading-none mb-1">{activeProductData.label} Quotes</h2>
                    <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Top Insurer Proposals</p>
                  </div>
                </div>
                <div className="text-xs font-black text-slate-500 bg-slate-100 px-3 py-1.5 rounded-lg w-fit">
                  {plans.length} Plans Found
                </div>
              </div>

              {/* Plans stack */}
              <div className="space-y-6">
                {plans.map((plan, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    className="bg-white rounded-[2rem] border border-slate-100 shadow-xl overflow-hidden hover:border-[#dfb15b]/40 hover:shadow-2xl transition-all duration-300"
                  >
                    <div className="p-6 sm:p-8 flex flex-col md:flex-row items-stretch justify-between gap-6 md:gap-4">
                      
                      {/* Left: Insurer Logo / Claim Ratio */}
                      <div className="flex md:flex-col md:justify-between items-center md:items-start gap-4 md:w-[22%]">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 bg-slate-50 rounded-2xl border border-slate-100 flex items-center justify-center text-2xl shadow-inner">
                            {plan.logo}
                          </div>
                          <div>
                            <h4 className="font-extrabold text-[#0c1b33] text-md leading-tight">{plan.insurer}</h4>
                            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Insurer Partner</p>
                          </div>
                        </div>
                        
                        <div className="hidden md:block">
                          <p className="text-[10px] text-slate-400 font-black uppercase tracking-wider leading-none mb-1">Claim Ratio</p>
                          <p className="text-[13px] font-black text-slate-700">{plan.ratio}</p>
                        </div>
                      </div>

                      {/* Middle: Benefits checklist */}
                      <div className="flex-grow border-y md:border-y-0 md:border-x border-slate-100 py-5 md:py-0 md:px-8 space-y-3">
                        <p className="text-[10px] text-slate-400 font-black uppercase tracking-wider leading-none mb-2">Key Plan Benefits</p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                          {plan.benefits.map((b, bIdx) => (
                            <div key={bIdx} className="flex items-start gap-2">
                              <CheckCircle2 size={13} className="text-emerald-500 flex-shrink-0 mt-0.5" />
                              <span className="text-[12.5px] font-semibold text-slate-600 leading-normal">{b}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Right: Cover & Premium Price */}
                      <div className="flex items-center md:flex-col justify-between md:justify-center gap-4 md:w-[24%] md:text-center">
                        <div className="md:mb-4">
                          {activeProduct.includes('motor') ? (
                            <>
                              <p className="text-[10px] text-slate-400 font-black uppercase tracking-wider leading-none mb-1">Vehicle IDV</p>
                              <p className="text-[15px] font-black text-slate-700">{plan.idv}</p>
                            </>
                          ) : (
                            <>
                              <p className="text-[10px] text-slate-400 font-black uppercase tracking-wider leading-none mb-1">Sum Insured</p>
                              <p className="text-[15px] font-black text-[#0c1b33]">{plan.idv}</p>
                            </>
                          )}
                        </div>

                        <div>
                          <p className="text-[10px] text-slate-400 font-black uppercase tracking-wider leading-none mb-1">Premium Price</p>
                          <p className="text-[20px] font-black text-[#dfb15b] leading-tight mb-3">{plan.premium}</p>
                          <button
                            onClick={() => handleRequestCallback(plan.insurer)}
                            className="w-full px-5 py-3 bg-[#0c1b33] hover:bg-[#162a4a] text-white font-black rounded-xl text-xs tracking-wide uppercase transition-colors shadow-lg shadow-slate-900/10 flex items-center justify-center gap-1.5"
                          >
                            <PhoneCall size={12} className="text-[#dfb15b]" /> Get Call Back
                          </button>
                        </div>

                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Disclaimer */}
              <div className="bg-slate-100 rounded-2xl p-5 border border-slate-200/50 mt-8 flex items-start gap-3">
                <Info size={16} className="text-slate-500 flex-shrink-0 mt-0.5" />
                <p className="text-[11.5px] font-bold text-slate-500 leading-relaxed">
                  *The premiums shown are indicative estimate quotes based on parameters shared by insurance providers. Final policy premium values are subject to individual insurer underwriting guidelines, terms of declaration, and medical checkups if applicable.
                </p>
              </div>

            </div>
          </div>
        </div>
      )}

      {/* Success Notification Alert Overlay */}
      <AnimatePresence>
        {callbackRequested && (
          <div className="fixed bottom-6 right-6 z-[200] max-w-sm w-full bg-[#0c1b33] border border-[#dfb15b]/30 rounded-2xl shadow-2xl p-5 text-white overflow-hidden">
            <div className="absolute top-0 left-0 w-2 h-full bg-[#dfb15b]" />
            <div className="flex items-start gap-3.5 pl-2">
              <div className="w-9 h-9 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 flex-shrink-0">
                <CheckCircle2 size={18} />
              </div>
              <div>
                <h4 className="font-extrabold text-sm mb-1">Callback Requested!</h4>
                <p className="text-[11.5px] text-slate-300 font-semibold leading-relaxed">
                  Our certified advisor will call you at <strong className="text-white">+91 {mobile}</strong> within 15 minutes to configure your **{callbackRequested}** plan.
                </p>
              </div>
            </div>
          </div>
        )}
      </AnimatePresence>
      
      {/* Loading Overlay */}
      {isSubmitting && (
        <div className="fixed inset-0 bg-[#0c1b33]/40 backdrop-blur-sm z-[250] flex items-center justify-center">
          <div className="bg-white rounded-2xl p-6 shadow-2xl border border-slate-100 flex flex-col items-center gap-4">
            <div className="w-10 h-10 border-4 border-[#0c1b33] border-t-transparent rounded-full animate-spin" />
            <p className="text-xs font-black text-slate-700">Processing Request...</p>
          </div>
        </div>
      )}
    </div>
  );
}
