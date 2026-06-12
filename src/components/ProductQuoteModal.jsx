import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowRight, ArrowLeft, ShieldCheck, CheckCircle2, AlertCircle, Heart, Flame, Shield, TrendingUp, Building2, Briefcase } from 'lucide-react';
import { db } from '../utils/db';

const PRODUCT_THEMES = {
  health: { icon: Heart, color: '#dc2626', bg: '#fef2f2', label: 'Health Insurance' },
  life: { icon: TrendingUp, color: '#059669', bg: '#ecfdf5', label: 'Term Life Insurance' },
  fire: { icon: Flame, color: '#ea580c', bg: '#fff7ed', label: 'Property / Fire Insurance' },
  travel: { icon: Shield, color: '#0284c7', bg: '#f0f9ff', label: 'Travel Insurance' },
  cyber: { icon: ShieldCheck, color: '#7c3aed', bg: '#f5f3ff', label: 'Cyber Insurance' },
  business: { icon: Building2, color: '#475569', bg: '#f8fafc', label: 'Business / SME Insurance' },
  pet: { icon: Heart, color: '#ec4899', bg: '#fdf2f8', label: 'Pet Insurance' },
  default: { icon: ShieldCheck, color: '#0d9488', bg: '#f0fdfa', label: 'Insurance Quote' },
};

const ProductQuoteModal = ({ isOpen, onClose, defaultProductType = 'health' }) => {
  const [productType, setProductType] = useState(defaultProductType);
  const [step, setStep] = useState(1);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Dynamic states
  const [healthMembers, setHealthMembers] = useState({
    self: true, spouse: false, son: false, daughter: false, father: false, mother: false
  });
  const [healthAges, setHealthAges] = useState({
    self: '30', spouse: '28', son: '5', daughter: '8', father: '60', mother: '58'
  });

  const [formData, setFormData] = useState({
    name: '', mobile: '', email: '', pincode: '', city: '', state: '',
    // Life specific
    gender: 'Male', tobacco: 'No', income: '5-10 Lakhs', coverAmount: '1 Crore', age: '28',
    // Fire/Property specific
    propertyType: 'Residential', propertyAge: '1-5 Years', constructionType: 'RCC Framed Structure', occupancy: 'Self Occupied', sumInsured: '50 Lakhs', fireSystems: 'Fire Extinguishers',
    // Business specific
    businessType: 'Retail Shop', employees: '1-10', turnover: 'Up to 1 Crore',
    // Fallbacks
    preExisting: 'None',
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (isOpen) {
      setProductType(defaultProductType);
      setStep(1);
      setIsSubmitted(false);
      setIsSubmitting(false);
      setErrors({});
    }
  }, [isOpen, defaultProductType]);

  const handleMemberCheckbox = (member) => {
    setHealthMembers(prev => ({ ...prev, [member]: !prev[member] }));
  };

  const handleAgeChange = (member, val) => {
    setHealthAges(prev => ({ ...prev, [member]: val }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const validateStep = () => {
    const newErrors = {};
    if (step === 3) {
      if (!formData.name.trim()) newErrors.name = 'Full name is required';
      if (!formData.mobile || formData.mobile.length !== 10) newErrors.mobile = 'Valid 10-digit mobile number is required';
      if (!formData.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'Valid email is required';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => { if (validateStep()) setStep(prev => prev + 1); };
  const handleBack = () => { setStep(prev => prev - 1); };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateStep()) return;
    setIsSubmitting(true);

    setTimeout(() => {
      let details = {};
      if (productType === 'health') {
        const selectedMembers = Object.keys(healthMembers).filter(k => healthMembers[k]);
        details = { members: selectedMembers.join(', '), memberDetails: selectedMembers.map(m => `${m} (${healthAges[m]}y)`).join(', '), preExisting: formData.preExisting };
      } else if (productType === 'life') {
        details = { gender: formData.gender, age: formData.age, income: formData.income, tobacco: formData.tobacco, coverAmount: formData.coverAmount };
      } else if (productType === 'fire') {
        details = { propertyType: formData.propertyType, sumInsured: formData.sumInsured };
      } else if (productType === 'business') {
        details = { businessType: formData.businessType, turnover: formData.turnover };
      }

      const newLead = {
        id: 'L-' + Date.now().toString().slice(-6),
        productType: (PRODUCT_THEMES[productType]?.label || productType) + ' Inquiry',
        date: new Date().toLocaleString(),
        name: formData.name, mobile: formData.mobile, email: formData.email, pincode: formData.pincode,
        ...details, status: 'New'
      };

      const existingLeads = db.getLeads ? db.getLeads() : [];
      if (db.setLeads) db.setLeads([newLead, ...existingLeads]);

      setIsSubmitting(false);
      setIsSubmitted(true);
      setTimeout(() => onClose(), 3000);
    }, 1000);
  };

  const theme = PRODUCT_THEMES[productType] || PRODUCT_THEMES['default'];
  const Icon = theme.icon;

  if (!isOpen) return null;

  // Input styles
  const inputCls = "w-full px-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 transition-all font-semibold text-[14px]";
  const labelCls = "block text-[11px] font-black uppercase tracking-wider text-slate-500 mb-1.5 ml-1";

  return (
    <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-0 sm:p-4 md:p-6 bg-slate-900/60 backdrop-blur-sm">
      <AnimatePresence mode="wait">
        {!isSubmitted ? (
          <motion.div 
            key="form"
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="w-full h-[90vh] sm:h-auto sm:max-h-[90vh] md:max-w-4xl bg-white sm:rounded-[2rem] rounded-t-[2rem] shadow-2xl overflow-hidden flex flex-col md:flex-row relative"
          >
            {/* Close Button Mobile */}
            <button onClick={onClose} className="md:hidden absolute top-4 right-4 z-10 w-8 h-8 bg-white/80 backdrop-blur rounded-full flex items-center justify-center text-slate-600 shadow-sm border border-slate-100">
              <X size={16} />
            </button>

            {/* LEFT SIDE: Hero Info (Hidden on mobile) */}
            <div className="hidden md:flex md:w-[35%] p-8 flex-col justify-between text-white relative overflow-hidden"
              style={{ background: `linear-gradient(145deg, ${theme.color}, #0c1b33)` }}
            >
              <div className="absolute inset-0 opacity-10" style={{ background: 'radial-gradient(circle at 80% 20%, white 0%, transparent 60%)' }} />
              <div className="relative z-10">
                <div className="w-12 h-12 bg-white/20 backdrop-blur rounded-2xl flex items-center justify-center mb-6 border border-white/20 shadow-lg">
                  <Icon size={24} className="text-white" />
                </div>
                <h2 className="text-3xl font-black mb-3 leading-tight">{theme.label}</h2>
                <p className="text-white/80 text-sm font-medium leading-relaxed">
                  Get personalized quotes from 25+ top insurers in India. Transparent pricing, zero hidden fees, and instant issuance.
                </p>
              </div>

              <div className="relative z-10 space-y-4">
                {[
                  { title: 'Best Price Guarantee', desc: 'Save up to 40% on premiums' },
                  { title: 'Instant Issuance', desc: 'Zero paperwork required' },
                  { title: '24x7 Claim Support', desc: 'Dedicated claim assistance' }
                ].map((f, i) => (
                  <div key={i} className="flex gap-3">
                    <CheckCircle2 size={18} className="text-teal-300 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-sm font-bold text-white">{f.title}</h4>
                      <p className="text-[11px] text-white/70 font-medium">{f.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* RIGHT SIDE: Form Area (65%) */}
            <div className="w-full md:w-[65%] flex flex-col h-full bg-white relative">
              {/* Mobile Header */}
              <div className="md:hidden px-6 pt-6 pb-4 border-b border-slate-100">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: theme.bg, color: theme.color }}>
                    <Icon size={20} />
                  </div>
                  <div>
                    <h2 className="text-[16px] font-black text-slate-900">{theme.label}</h2>
                    <p className="text-[11px] font-semibold text-slate-500">Get quotes in 2 minutes</p>
                  </div>
                </div>
              </div>

              {/* Header / Progress Desktop */}
              <div className="hidden md:flex px-8 pt-8 pb-4 justify-between items-center">
                <div>
                  <p className="text-[11px] font-black uppercase tracking-widest text-teal-600 mb-1">Get Your Quote</p>
                  <h3 className="text-xl font-black text-slate-900">Step {step} of 3</h3>
                </div>
                <button onClick={onClose} className="w-9 h-9 rounded-full bg-slate-50 flex items-center justify-center text-slate-500 hover:bg-slate-100 hover:text-slate-800 transition-colors border border-slate-200">
                  <X size={16} />
                </button>
              </div>

              {/* Progress Bar Line */}
              <div className="w-full h-1.5 bg-slate-100">
                <div className="h-full bg-teal-500 transition-all duration-500 ease-out" style={{ width: `${(step / 3) * 100}%` }} />
              </div>

              {/* Form Content */}
              <div className="flex-grow overflow-y-auto px-6 py-6 md:px-8 space-y-6 custom-scrollbar">
                
                {/* === STEP 1: Core details === */}
                {step === 1 && (
                  <motion.div initial={{ opacity:0, x:20 }} animate={{ opacity:1, x:0 }} exit={{ opacity:0, x:-20 }} className="space-y-6">
                    
                    {productType === 'health' && (
                      <div>
                        <label className="block text-[14px] font-black text-slate-800 mb-3">Who do you want to cover?</label>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                          {Object.keys(healthMembers).map((member) => (
                            <div key={member} onClick={() => handleMemberCheckbox(member)}
                              className={`relative p-3.5 rounded-2xl border-2 cursor-pointer transition-all ${
                                healthMembers[member] ? 'border-teal-500 bg-teal-50 shadow-md shadow-teal-500/10' : 'border-slate-100 bg-white hover:border-teal-200'
                              }`}
                            >
                              <div className="flex justify-between items-center mb-1">
                                <span className={`font-black capitalize text-[13px] ${healthMembers[member] ? 'text-teal-800' : 'text-slate-600'}`}>{member}</span>
                                {healthMembers[member] && <CheckCircle2 size={14} className="text-teal-600" />}
                              </div>
                              {healthMembers[member] && (
                                <div className="mt-2.5" onClick={e => e.stopPropagation()}>
                                  <select value={healthAges[member]} onChange={e => handleAgeChange(member, e.target.value)}
                                    className="w-full px-2 py-1.5 bg-white border border-teal-200 rounded-lg text-[12px] font-bold text-slate-700 outline-none focus:border-teal-500"
                                  >
                                    {[...Array(100)].map((_, i) => <option key={i} value={i+1}>{i+1} yrs</option>)}
                                  </select>
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {productType === 'life' && (
                      <div className="grid sm:grid-cols-2 gap-5">
                        <div>
                          <label className={labelCls}>Your Gender</label>
                          <div className="flex gap-2">
                            {['Male', 'Female'].map(g => (
                              <button key={g} type="button" onClick={() => setFormData({...formData, gender: g})}
                                className={`flex-1 py-3 rounded-xl border-2 font-bold text-[13px] transition-all ${formData.gender === g ? 'border-teal-500 bg-teal-50 text-teal-800' : 'border-slate-100 bg-white text-slate-500 hover:border-slate-200'}`}
                              >
                                {g}
                              </button>
                            ))}
                          </div>
                        </div>
                        <div>
                          <label className={labelCls}>Your Age</label>
                          <select value={formData.age} onChange={handleChange} name="age" className={inputCls}>
                            {[...Array(50)].map((_, i) => <option key={i} value={i+18}>{i+18} Years</option>)}
                          </select>
                        </div>
                        <div>
                          <label className={labelCls}>Annual Income</label>
                          <select value={formData.income} onChange={handleChange} name="income" className={inputCls}>
                            {['Under 5 Lakhs', '5-10 Lakhs', '10-15 Lakhs', '15-20 Lakhs', '20+ Lakhs'].map(v => <option key={v}>{v}</option>)}
                          </select>
                        </div>
                        <div>
                          <label className={labelCls}>Do you consume tobacco?</label>
                          <div className="flex gap-2">
                            {['Yes', 'No'].map(g => (
                              <button key={g} type="button" onClick={() => setFormData({...formData, tobacco: g})}
                                className={`flex-1 py-3 rounded-xl border-2 font-bold text-[13px] transition-all ${formData.tobacco === g ? 'border-teal-500 bg-teal-50 text-teal-800' : 'border-slate-100 bg-white text-slate-500 hover:border-slate-200'}`}
                              >
                                {g}
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}

                    {productType === 'fire' && (
                      <div className="grid sm:grid-cols-2 gap-5">
                        <div><label className={labelCls}>Property Type</label><select name="propertyType" value={formData.propertyType} onChange={handleChange} className={inputCls}><option>Residential</option><option>Commercial/Office</option><option>Warehouse</option><option>Factory</option></select></div>
                        <div><label className={labelCls}>Estimated Value</label><select name="sumInsured" value={formData.sumInsured} onChange={handleChange} className={inputCls}><option>Up to 50 Lakhs</option><option>50 Lakhs - 1 Crore</option><option>1-5 Crores</option><option>Above 5 Crores</option></select></div>
                        <div><label className={labelCls}>Property Age</label><select name="propertyAge" value={formData.propertyAge} onChange={handleChange} className={inputCls}><option>0-5 Years</option><option>5-10 Years</option><option>10-20 Years</option><option>20+ Years</option></select></div>
                      </div>
                    )}

                    {productType === 'business' && (
                      <div className="grid sm:grid-cols-2 gap-5">
                        <div><label className={labelCls}>Business Type</label><input type="text" name="businessType" value={formData.businessType} onChange={handleChange} placeholder="e.g. Retail Shop, IT Service" className={inputCls} /></div>
                        <div><label className={labelCls}>Annual Turnover</label><select name="turnover" value={formData.turnover} onChange={handleChange} className={inputCls}><option>Up to 1 Crore</option><option>1 - 5 Crores</option><option>5 - 20 Crores</option><option>20+ Crores</option></select></div>
                        <div><label className={labelCls}>Total Employees</label><select name="employees" value={formData.employees} onChange={handleChange} className={inputCls}><option>1-10</option><option>11-50</option><option>51-200</option><option>200+</option></select></div>
                      </div>
                    )}

                    {(productType === 'travel' || productType === 'cyber' || productType === 'pet') && (
                      <div className="p-5 bg-teal-50 rounded-2xl border border-teal-100 flex items-start gap-3">
                        <Sparkles className="text-teal-500 mt-1 flex-shrink-0" size={20} />
                        <div>
                          <h4 className="font-bold text-teal-900 mb-1">Excellent Choice!</h4>
                          <p className="text-[13px] text-teal-700 font-medium">Please proceed to enter your contact details. Our expert will customize the best {theme.label.toLowerCase()} plan for your specific needs.</p>
                        </div>
                      </div>
                    )}

                  </motion.div>
                )}

                {/* === STEP 2: Secondary details / Location === */}
                {step === 2 && (
                  <motion.div initial={{ opacity:0, x:20 }} animate={{ opacity:1, x:0 }} exit={{ opacity:0, x:-20 }} className="space-y-5">
                    <div>
                      <label className={labelCls}>Pincode *</label>
                      <input type="text" name="pincode" placeholder="Enter 6-digit Pincode" maxLength={6} value={formData.pincode} onChange={handleChange} className={inputCls} />
                    </div>
                    
                    {productType === 'health' && (
                      <div>
                        <label className={labelCls}>Pre-existing Medical Conditions</label>
                        <select name="preExisting" value={formData.preExisting} onChange={handleChange} className={inputCls}>
                          <option>None</option>
                          <option>Diabetes</option>
                          <option>Blood Pressure / Hypertension</option>
                          <option>Asthma</option>
                          <option>Other</option>
                        </select>
                      </div>
                    )}

                    {productType === 'life' && (
                      <div>
                        <label className={labelCls}>Desired Life Cover Amount</label>
                        <select name="coverAmount" value={formData.coverAmount} onChange={handleChange} className={inputCls}>
                          <option>50 Lakhs</option>
                          <option>1 Crore</option>
                          <option>2 Crores</option>
                          <option>3+ Crores</option>
                        </select>
                      </div>
                    )}

                    {productType === 'fire' && (
                      <div>
                        <label className={labelCls}>Fire Safety Systems Installed</label>
                        <select name="fireSystems" value={formData.fireSystems} onChange={handleChange} className={inputCls}>
                          <option>None</option>
                          <option>Basic Fire Extinguishers</option>
                          <option>Extinguishers & Hydrants</option>
                          <option>Full Sprinkler System + Alarms</option>
                        </select>
                      </div>
                    )}
                  </motion.div>
                )}

                {/* === STEP 3: Contact Details === */}
                {step === 3 && (
                  <motion.div initial={{ opacity:0, x:20 }} animate={{ opacity:1, x:0 }} exit={{ opacity:0, x:-20 }} className="space-y-5">
                    
                    <div>
                      <label className={labelCls}>Full Name *</label>
                      <input type="text" name="name" placeholder="As per Aadhaar/PAN" value={formData.name} onChange={handleChange}
                        className={`${inputCls} ${errors.name ? 'border-red-400 focus:ring-red-500/20 bg-red-50' : ''}`}
                      />
                      {errors.name && <p className="text-[11px] text-red-500 font-bold mt-1.5 ml-1 flex items-center gap-1"><AlertCircle size={10}/>{errors.name}</p>}
                    </div>

                    <div>
                      <label className={labelCls}>Mobile Number *</label>
                      <div className="relative">
                        <div className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center gap-2 pr-3 border-r border-slate-200">
                          <span className="text-[13px] font-bold text-slate-500">+91</span>
                        </div>
                        <input type="tel" name="mobile" placeholder="10-digit number" maxLength={10} value={formData.mobile} onChange={(e) => { setFormData(p=>({...p, mobile: e.target.value.replace(/\D/g,'')})); setErrors(p=>({...p, mobile:''})); }}
                          className={`${inputCls} pl-[65px] ${errors.mobile ? 'border-red-400 focus:ring-red-500/20 bg-red-50' : ''}`}
                        />
                      </div>
                      {errors.mobile && <p className="text-[11px] text-red-500 font-bold mt-1.5 ml-1 flex items-center gap-1"><AlertCircle size={10}/>{errors.mobile}</p>}
                    </div>

                    <div>
                      <label className={labelCls}>Email Address *</label>
                      <input type="email" name="email" placeholder="Policy details will be sent here" value={formData.email} onChange={handleChange}
                        className={`${inputCls} ${errors.email ? 'border-red-400 focus:ring-red-500/20 bg-red-50' : ''}`}
                      />
                      {errors.email && <p className="text-[11px] text-red-500 font-bold mt-1.5 ml-1 flex items-center gap-1"><AlertCircle size={10}/>{errors.email}</p>}
                    </div>
                  </motion.div>
                )}
              </div>

              {/* Footer Actions */}
              <div className="px-6 py-5 md:px-8 bg-slate-50 border-t border-slate-100 flex items-center justify-between mt-auto">
                {step > 1 ? (
                  <button onClick={handleBack} className="flex items-center gap-2 px-5 py-3 rounded-xl font-bold text-[13px] text-slate-600 hover:bg-slate-200 transition-colors">
                    <ArrowLeft size={16} /> Back
                  </button>
                ) : (
                  <div />
                )}
                
                {step < 3 ? (
                  <button onClick={handleNext} className="flex items-center gap-2 px-6 py-3 bg-[#0c1b33] hover:bg-[#162a4a] text-white rounded-xl font-bold text-[13px] shadow-lg shadow-slate-900/10 transition-all">
                    Next Step <ArrowRight size={16} />
                  </button>
                ) : (
                  <button onClick={handleSubmit} disabled={isSubmitting} className="flex items-center gap-2 px-8 py-3 bg-teal-600 hover:bg-teal-500 text-white rounded-xl font-bold text-[14px] shadow-lg shadow-teal-600/20 transition-all disabled:opacity-70">
                    {isSubmitting ? 'Processing...' : 'View Quotes Now'} <ArrowRight size={16} />
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div 
            key="success"
            initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-sm bg-white rounded-[2rem] p-8 text-center shadow-2xl relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-teal-400 to-blue-500" />
            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', delay: 0.1 }} className="w-20 h-20 bg-teal-50 rounded-full flex items-center justify-center mx-auto mb-5">
              <CheckCircle2 size={40} className="text-teal-500" />
            </motion.div>
            <h3 className="text-2xl font-black text-slate-900 mb-2">Details Submitted!</h3>
            <p className="text-[13px] font-medium text-slate-500 mb-6 leading-relaxed">
              Our insurance expert will contact you shortly at <strong className="text-slate-800">{formData.mobile}</strong> with the best quotes for {theme.label}.
            </p>
            <div className="px-4 py-3 bg-slate-50 rounded-xl text-[12px] font-bold text-slate-600 border border-slate-100 flex items-center justify-center gap-2">
              Redirecting...
              <div className="w-4 h-4 border-2 border-teal-500 border-t-transparent rounded-full animate-spin" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProductQuoteModal;
