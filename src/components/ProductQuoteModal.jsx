import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowRight, ArrowLeft, ShieldCheck, CheckCircle2, AlertCircle, Sparkles } from 'lucide-react';

const ProductQuoteModal = ({ isOpen, onClose, defaultProductType = 'health' }) => {
  const [productType, setProductType] = useState(defaultProductType);
  const [step, setStep] = useState(1);
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  // Dynamic states
  const [healthMembers, setHealthMembers] = useState({
    self: true, spouse: false, son: false, daughter: false, father: false, mother: false
  });
  const [healthAges, setHealthAges] = useState({
    self: '30', spouse: '28', son: '5', daughter: '8', father: '60', mother: '58'
  });

  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    email: '',
    pincode: '',
    city: '',
    state: '',
    
    // Life specific
    gender: 'Male',
    tobacco: 'No',
    income: '5-10 Lakhs',
    coverAmount: '1 Crore',
    age: '28',

    // Fire specific
    propertyType: 'Residential',
    propertyAge: '1-5 Years',
    constructionType: 'RCC Framed Structure',
    occupancy: 'Self Occupied',
    sumInsured: '50 Lakhs',
    fireSystems: 'Fire Extinguishers',

    // Fallbacks
    preExisting: 'None',
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (isOpen) {
      setProductType(defaultProductType);
      setStep(1);
      setIsSubmitted(false);
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
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateStep = () => {
    const newErrors = {};
    if (step === 3 || (productType === 'life' && step === 3) || (productType === 'fire' && step === 3)) {
      if (!formData.name) newErrors.name = 'Full name is required';
      if (!formData.mobile || formData.mobile.length !== 10) newErrors.mobile = 'Valid 10-digit mobile number is required';
      if (!formData.email) newErrors.email = 'Email address is required';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep()) {
      setStep(prev => prev + 1);
    }
  };

  const handleBack = () => {
    setStep(prev => prev - 1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateStep()) return;

    // Build specific lead details
    let details = {};
    if (productType === 'health') {
      const selectedMembers = Object.keys(healthMembers).filter(k => healthMembers[k]);
      const memberDetails = selectedMembers.map(m => `${m} (${healthAges[m]} yrs)`).join(', ');
      details = {
        members: selectedMembers.join(', '),
        memberDetails: memberDetails,
        preExisting: formData.preExisting
      };
    } else if (productType === 'life') {
      details = {
        gender: formData.gender,
        age: formData.age,
        income: formData.income,
        tobacco: formData.tobacco,
        coverAmount: formData.coverAmount
      };
    } else if (productType === 'fire') {
      details = {
        propertyType: formData.propertyType,
        constructionType: formData.constructionType,
        occupancy: formData.occupancy,
        sumInsured: formData.sumInsured,
        fireSystems: formData.fireSystems
      };
    }

    const newLead = {
      id: Date.now(),
      productType: productType.toUpperCase() + ' Insurance',
      date: new Date().toLocaleString(),
      name: formData.name,
      mobile: formData.mobile,
      email: formData.email,
      pincode: formData.pincode,
      city: formData.city || 'Delhi',
      state: formData.state || 'Delhi',
      ...details
    };

    const existingLeads = JSON.parse(localStorage.getItem('policy_leads') || '[]');
    localStorage.setItem('policy_leads', JSON.stringify([newLead, ...existingLeads]));

    setIsSubmitted(true);
    setTimeout(() => {
      onClose();
    }, 2500);
  };

  const getProductTitle = () => {
    switch (productType) {
      case 'health': return 'Health Insurance Cover';
      case 'life': return 'Term Life Protection';
      case 'fire': return 'Fire & Property Protection';
      default: return `${productType.toUpperCase()} Insurance Quote`;
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-0 md:p-6 bg-slate-950/60 backdrop-blur-md">
      <AnimatePresence mode="wait">
        {!isSubmitted ? (
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="w-full h-full md:h-auto md:max-w-4xl bg-slate-900 border border-white/10 md:rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row max-h-[100vh] md:max-h-[90vh] text-slate-100"
          >
            {/* Form Side (65%) */}
            <div className="w-full lg:w-[65%] flex flex-col max-h-[100vh] md:max-h-[90vh]">
              {/* Header */}
              <div className="px-6 py-5 border-b border-white/5 flex justify-between items-center bg-slate-950/40">
                <div>
                  <h2 className="text-lg font-black text-white">{getProductTitle()}</h2>
                  <p className="text-xs text-slate-400">Step {step} of 3</p>
                </div>
                <button onClick={onClose} className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors">
                  <X size={16} />
                </button>
              </div>

              {/* Progress bar */}
              <div className="w-full h-1 bg-white/5">
                <div 
                  className="h-full bg-blue-500 transition-all duration-300"
                  style={{ width: `${(step / 3) * 100}%` }}
                />
              </div>

              {/* Form Body */}
              <div className="flex-grow overflow-y-auto p-6 md:p-8 space-y-6">
                
                {/* 1. HEALTH INSURANCE FORM */}
                {productType === 'health' && (
                  <>
                    {step === 1 && (
                      <div className="space-y-6">
                        <label className="block text-sm font-bold text-white">Select Family Members to Cover *</label>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                          {Object.keys(healthMembers).map((member) => (
                            <div 
                              key={member}
                              onClick={() => handleMemberCheckbox(member)}
                              className={`p-4 rounded-xl border cursor-pointer transition-all ${
                                healthMembers[member] 
                                  ? 'border-blue-500 bg-blue-500/10 text-white' 
                                  : 'border-white/10 hover:border-white/20 text-slate-400'
                              }`}
                            >
                              <div className="font-bold capitalize text-xs">{member}</div>
                              {healthMembers[member] && (
                                <div className="mt-3" onClick={(e) => e.stopPropagation()}>
                                  <label className="block text-[10px] text-slate-400 mb-1 font-bold">AGE</label>
                                  <select 
                                    value={healthAges[member]}
                                    onChange={(e) => handleAgeChange(member, e.target.value)}
                                    className="w-full px-2 py-1 bg-slate-950 border border-white/10 rounded text-xs text-white"
                                  >
                                    {[...Array(100)].map((_, i) => (
                                      <option key={i} value={i+1}>{i+1} years</option>
                                    ))}
                                  </select>
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {step === 2 && (
                      <div className="space-y-5">
                        <div>
                          <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">City & Pincode *</label>
                          <input 
                            type="text" 
                            name="pincode" 
                            placeholder="Enter 6-digit Pincode"
                            maxLength={6}
                            value={formData.pincode}
                            onChange={handleChange}
                            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 font-semibold"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Pre-existing Medical Conditions *</label>
                          <select 
                            name="preExisting" 
                            value={formData.preExisting}
                            onChange={handleChange}
                            className="w-full px-4 py-3 bg-slate-950 border border-white/10 rounded-xl text-white outline-none focus:border-blue-500 font-semibold"
                          >
                            <option value="None">None / No Disease</option>
                            <option value="Diabetes">Diabetes</option>
                            <option value="High Blood Pressure">High Blood Pressure</option>
                            <option value="Heart Condition">Heart Condition</option>
                            <option value="Multiple">Multiple Medical Conditions</option>
                          </select>
                        </div>
                      </div>
                    )}
                  </>
                )}

                {/* 2. TERM LIFE INSURANCE FORM */}
                {productType === 'life' && (
                  <>
                    {step === 1 && (
                      <div className="space-y-5">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Gender *</label>
                            <select name="gender" value={formData.gender} onChange={handleChange} className="w-full px-4 py-3 bg-slate-950 border border-white/10 rounded-xl text-white">
                              <option value="Male">Male</option>
                              <option value="Female">Female</option>
                              <option value="Other">Other</option>
                            </select>
                          </div>
                          <div>
                            <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Your Age *</label>
                            <input type="number" name="age" placeholder="e.g. 28" value={formData.age} onChange={handleChange} className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white" />
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Annual Income *</label>
                            <select name="income" value={formData.income} onChange={handleChange} className="w-full px-4 py-3 bg-slate-950 border border-white/10 rounded-xl text-white">
                              <option value="Below 5 Lakhs">Below 5 Lakhs</option>
                              <option value="5-10 Lakhs">5-10 Lakhs</option>
                              <option value="10-15 Lakhs">10-15 Lakhs</option>
                              <option value="15-20 Lakhs">15-20 Lakhs</option>
                              <option value="20 Lakhs+">20 Lakhs+</option>
                            </select>
                          </div>
                          <div>
                            <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Do you chew/smoke tobacco?</label>
                            <select name="tobacco" value={formData.tobacco} onChange={handleChange} className="w-full px-4 py-3 bg-slate-950 border border-white/10 rounded-xl text-white">
                              <option value="No">No</option>
                              <option value="Yes">Yes</option>
                            </select>
                          </div>
                        </div>
                      </div>
                    )}

                    {step === 2 && (
                      <div className="space-y-5">
                        <div>
                          <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Select Life Cover Amount *</label>
                          <select name="coverAmount" value={formData.coverAmount} onChange={handleChange} className="w-full px-4 py-3 bg-slate-950 border border-white/10 rounded-xl text-white">
                            <option value="50 Lakhs">50 Lakhs</option>
                            <option value="1 Crore">1 Crore</option>
                            <option value="1.5 Crore">1.5 Crore</option>
                            <option value="2 Crore">2 Crore</option>
                            <option value="5 Crore">5 Crore</option>
                          </select>
                        </div>
                      </div>
                    )}
                  </>
                )}

                {/* 3. FIRE INSURANCE FORM */}
                {productType === 'fire' && (
                  <>
                    {step === 1 && (
                      <div className="space-y-5">
                        <div>
                          <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Property Type *</label>
                          <select name="propertyType" value={formData.propertyType} onChange={handleChange} className="w-full px-4 py-3 bg-slate-950 border border-white/10 rounded-xl text-white">
                            <option value="Residential">Residential Building</option>
                            <option value="Commercial Office">Commercial Office</option>
                            <option value="Retail Shop">Retail Shop / Showroom</option>
                            <option value="Warehouse">Warehouse / Godown</option>
                            <option value="Factory">Manufacturing Unit / Factory</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Type of Construction *</label>
                          <select name="constructionType" value={formData.constructionType} onChange={handleChange} className="w-full px-4 py-3 bg-slate-950 border border-white/10 rounded-xl text-white">
                            <option value="RCC Framed Structure">RCC Framed Structure</option>
                            <option value="Load Bearing Wall Structure">Load Bearing Wall Structure</option>
                            <option value="Steel Frame / Shed">Steel Frame / Tin Shed</option>
                            <option value="Kutcha Structure">Kutcha Structure</option>
                          </select>
                        </div>
                      </div>
                    )}

                    {step === 2 && (
                      <div className="space-y-5">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Property Occupancy *</label>
                            <select name="occupancy" value={formData.occupancy} onChange={handleChange} className="w-full px-4 py-3 bg-slate-950 border border-white/10 rounded-xl text-white">
                              <option value="Self Occupied">Self Occupied</option>
                              <option value="Rented Out">Rented Out</option>
                              <option value="Vacant">Unoccupied / Vacant</option>
                            </select>
                          </div>
                          <div>
                            <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Firefighting Systems *</label>
                            <select name="fireSystems" value={formData.fireSystems} onChange={handleChange} className="w-full px-4 py-3 bg-slate-950 border border-white/10 rounded-xl text-white">
                              <option value="None">None</option>
                              <option value="Fire Extinguishers">Fire Extinguishers</option>
                              <option value="Sprinklers & Hydrants">Sprinklers & Hydrants</option>
                              <option value="Fully Automatic Alarm & Extinguisher">Fully Automatic Alarms</option>
                            </select>
                          </div>
                        </div>
                        <div>
                          <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Estimated Value of Property / Sum Insured *</label>
                          <select name="sumInsured" value={formData.sumInsured} onChange={handleChange} className="w-full px-4 py-3 bg-slate-950 border border-white/10 rounded-xl text-white">
                            <option value="25 Lakhs">25 Lakhs</option>
                            <option value="50 Lakhs">50 Lakhs</option>
                            <option value="1 Crore">1 Crore</option>
                            <option value="5 Crore">5 Crore</option>
                            <option value="10 Crore+">10 Crore+</option>
                          </select>
                        </div>
                      </div>
                    )}
                  </>
                )}

                {/* 4. FALLBACK / GENERAL PRODUCTS FORM (Cyber, Pet, Business, Travel, Home) */}
                {productType !== 'health' && productType !== 'life' && productType !== 'fire' && (
                  <>
                    {step === 1 && (
                      <div className="space-y-5">
                        <p className="text-xs text-slate-400 font-semibold leading-relaxed">
                          Provide primary details regarding your target {productType} insurance proposal to start comparisons.
                        </p>
                        <div>
                          <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Provide Cover description / details *</label>
                          <textarea 
                            rows={3}
                            name="propertyType" 
                            placeholder={`e.g. Coverage details for ${productType} protection...`} 
                            value={formData.propertyType} 
                            onChange={handleChange} 
                            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white outline-none focus:border-blue-500 font-medium resize-none"
                          />
                        </div>
                      </div>
                    )}

                    {step === 2 && (
                      <div className="space-y-5">
                        <div>
                          <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Sum Insured Limit / Cover Value *</label>
                          <select name="sumInsured" value={formData.sumInsured} onChange={handleChange} className="w-full px-4 py-3 bg-slate-950 border border-white/10 rounded-xl text-white">
                            <option value="5 Lakhs">5 Lakhs</option>
                            <option value="10 Lakhs">10 Lakhs</option>
                            <option value="25 Lakhs">25 Lakhs</option>
                            <option value="50 Lakhs+">50 Lakhs+</option>
                          </select>
                        </div>
                      </div>
                    )}
                  </>
                )}

                {/* STEP 3: GENERAL CONTACT DETAILS (FOR ALL) */}
                {step === 3 && (
                  <div className="space-y-4">
                    <p className="text-xs text-slate-400 font-bold uppercase tracking-wider mb-2">3. Enter Contact Details</p>
                    
                    <div>
                      <label className="block text-xs font-bold text-slate-400 mb-1.5">Full Name *</label>
                      <input 
                        type="text" 
                        name="name" 
                        placeholder="Enter your name" 
                        value={formData.name} 
                        onChange={handleChange} 
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white outline-none focus:border-blue-500 font-semibold"
                      />
                      {errors.name && <p className="text-red-500 text-xs mt-1 font-semibold">{errors.name}</p>}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-400 mb-1.5">Mobile Number *</label>
                        <input 
                          type="tel" 
                          name="mobile" 
                          maxLength={10}
                          placeholder="Enter 10 digit number" 
                          value={formData.mobile} 
                          onChange={handleChange} 
                          className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white outline-none focus:border-blue-500 font-semibold"
                        />
                        {errors.mobile && <p className="text-red-500 text-xs mt-1 font-semibold">{errors.mobile}</p>}
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-400 mb-1.5">Email Address *</label>
                        <input 
                          type="email" 
                          name="email" 
                          placeholder="Enter email id" 
                          value={formData.email} 
                          onChange={handleChange} 
                          className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white outline-none focus:border-blue-500 font-semibold"
                        />
                        {errors.email && <p className="text-red-500 text-xs mt-1 font-semibold">{errors.email}</p>}
                      </div>
                    </div>
                  </div>
                )}

              </div>

              {/* Footer Actions */}
              <div className="p-6 border-t border-white/5 flex justify-between items-center bg-slate-950/40 flex-shrink-0">
                {step > 1 ? (
                  <button 
                    onClick={handleBack} 
                    className="flex items-center gap-2 text-xs font-bold text-slate-400 hover:text-white transition-colors"
                  >
                    <ArrowLeft size={16} /> Back
                  </button>
                ) : <div />}

                {step < 3 ? (
                  <button 
                    onClick={handleNext}
                    className="px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-lg shadow-blue-500/10 transition-all"
                  >
                    Continue <ArrowRight size={16} />
                  </button>
                ) : (
                  <button 
                    onClick={handleSubmit}
                    className="px-6 py-3 bg-green-600 hover:bg-green-500 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-lg shadow-green-500/10 transition-all"
                  >
                    View Quotes <ArrowRight size={16} />
                  </button>
                )}
              </div>
            </div>

            {/* Sidebar (35%) */}
            <div className="hidden lg:flex lg:w-[35%] bg-gradient-to-br from-[#0c1328] to-[#16274e] border-l border-white/10 p-8 flex-col justify-between max-h-[100vh] md:max-h-[90vh]">
              <div className="space-y-6">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-blue-500/10 border border-blue-500/20 text-blue-400 rounded-full text-[10px] font-bold tracking-wider uppercase">
                  <Sparkles size={12} /> PolicyPerfect Guarantee
                </div>

                <div className="text-white">
                  <h3 className="text-xl font-black mb-2">Save up to 80%</h3>
                  <p className="text-xs text-slate-400 leading-relaxed font-semibold">
                    Compare plans from top-rated insurers in India. Get instant digital policy issuance with zero paper work.
                  </p>
                </div>

                <div className="border-t border-white/5 pt-6 space-y-4 font-bold text-xs text-slate-300">
                  <div className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-green-500/10 border border-green-500/25 flex items-center justify-center text-green-400 flex-shrink-0">✓</div>
                    <span>Instant coverage verification</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-green-500/10 border border-green-500/25 flex items-center justify-center text-green-400 flex-shrink-0">✓</div>
                    <span>Cashless treatment across India</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-green-500/10 border border-green-500/25 flex items-center justify-center text-green-400 flex-shrink-0">✓</div>
                    <span>24x7 dedicated claim assistance</span>
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-white/5 flex items-center gap-3">
                <ShieldCheck className="text-blue-400" size={32} />
                <div>
                  <div className="text-[10px] text-slate-500 uppercase tracking-widest font-black">Secure Platform</div>
                  <div className="text-xs text-slate-300 font-bold">100% Privacy Ensured</div>
                </div>
              </div>
            </div>

          </motion.div>
        ) : (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-md bg-slate-900 border border-white/10 rounded-[2.5rem] p-8 text-center text-slate-200 shadow-2xl relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-green-500/10 rounded-full blur-2xl"></div>
            <CheckCircle2 size={56} className="text-green-500 mx-auto mb-4" />
            <h3 className="text-xl font-black text-white">Details Submitted!</h3>
            <p className="text-slate-400 text-xs mt-2 font-semibold">
              Thank you! Our insurance specialists will analyze your details and share quotes via Call & WhatsApp shortly.
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProductQuoteModal;
