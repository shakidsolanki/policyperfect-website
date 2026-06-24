import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowRight, ArrowLeft, CheckCircle2, AlertCircle, Heart, Flame, Shield, TrendingUp, Building2, Briefcase, Sparkles, Phone, MessageSquare } from 'lucide-react';
import { db } from '../utils/db';

const PRODUCT_LIST = [
  { id: 'car', label: 'Car Insurance', category: 'motor' },
  { id: 'bike', label: 'Bike Insurance', category: 'motor' },
  { id: 'health', label: 'Health Insurance', category: 'health' },
  { id: 'critical', label: 'Critical Illness', category: 'health' },
  { id: 'senior', label: 'Senior Citizen Health', category: 'health' },
  { id: 'parent', label: 'Parent Health', category: 'health' },
  { id: 'travel', label: 'Travel Insurance', category: 'travel' },
  { id: 'group', label: 'Group Health', category: 'business' },
  { id: 'life', label: 'Term Life Insurance', category: 'life' },
  { id: 'home', label: 'Home Insurance', category: 'property' },
  { id: 'fire', label: 'Fire Insurance', category: 'property' },
  { id: 'marine', label: 'Marine Insurance', category: 'business' },
  { id: 'cyber', label: 'Cyber Insurance', category: 'business' },
  { id: 'business', label: 'Business / SME Insurance', category: 'business' },
  { id: 'workmen', label: 'Workmen Compensation', category: 'business' },
  { id: 'pet', label: 'Pet Insurance', category: 'personal' }
];

const ProductQuoteModal = ({ isOpen, onClose, productType, defaultProductType = 'health' }) => {
  const activeProductKey = productType || defaultProductType;
  const [selectedProduct, setSelectedProduct] = useState(activeProductKey);
  const [step, setStep] = useState(1);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Step 1 - Common Fields
  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    email: '',
    city: '',
    pincode: '',
    preferredTime: 'Anytime',
    remarks: '',
  });

  // Step 2 - Product Specific Fields
  const [productFields, setProductFields] = useState({});
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (isOpen) {
      setSelectedProduct(activeProductKey);
      setStep(1);
      setIsSubmitted(false);
      setIsSubmitting(false);
      setErrors({});
      setProductFields({});
    }
  }, [isOpen, activeProductKey]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const handleProductFieldChange = (name, value) => {
    setProductFields(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const validateStep1 = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Full name is required';
    if (!formData.mobile || formData.mobile.length !== 10) newErrors.mobile = 'Valid 10-digit mobile number is required';
    if (!formData.city.trim()) newErrors.city = 'City is required';
    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'Enter a valid email';
    if (formData.pincode && formData.pincode.length !== 6) newErrors.pincode = 'Pincode must be 6 digits';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep2 = () => {
    const newErrors = {};
    // Add product-specific validation rules if needed
    // Example: motor requires registration number
    if (['car', 'bike'].includes(selectedProduct)) {
      if (!productFields.regNo) newErrors.regNo = 'Registration number is required';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep1()) {
      setStep(2);
    }
  };

  const handleBack = () => {
    setStep(1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateStep2()) return;
    setIsSubmitting(true);

    setTimeout(() => {
      const leadSource = 'Website Quote Form';
      const assignedTo = `Telecaller_${Math.floor(Math.random() * 5) + 1}`; // Auto assignment to telecaller

      const newLead = {
        id: 'L-' + Date.now().toString().slice(-6),
        productType: PRODUCT_LIST.find(p => p.id === selectedProduct)?.label || selectedProduct,
        date: new Date().toLocaleString(),
        name: formData.name,
        mobile: formData.mobile,
        email: formData.email,
        city: formData.city,
        pincode: formData.pincode,
        preferredTime: formData.preferredTime,
        remarks: formData.remarks,
        leadSource,
        assignedTo,
        details: productFields,
        status: 'New'
      };

      const existingLeads = db.getLeads ? db.getLeads() : [];
      if (db.setLeads) db.setLeads([newLead, ...existingLeads]);

      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 1000);
  };

  const openWhatsApp = () => {
    const text = encodeURIComponent(`Hi PolicyPerfect Team, I just submitted a quote request for ${PRODUCT_LIST.find(p => p.id === selectedProduct)?.label || selectedProduct}. Please contact me.`);
    window.open(`https://wa.me/917574948768?text=${text}`, '_blank');
  };

  const inputCls = "w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 transition-all font-semibold text-[13px]";
  const labelCls = "block text-[10px] font-black uppercase tracking-wider text-slate-500 mb-1.5 ml-1";

  // Dynamic Product Fields Renderer
  const renderProductSpecificFields = () => {
    switch (selectedProduct) {
      case 'car':
      case 'bike':
        return (
          <div className="space-y-4">
            <div>
              <label className={labelCls}>Vehicle Type *</label>
              <div className="flex gap-2">
                {['Car', 'Bike', 'Commercial'].map(t => (
                  <button key={t} type="button" onClick={() => handleProductFieldChange('vehicleType', t)}
                    className={`flex-1 py-2.5 rounded-xl border-2 font-bold text-[12px] transition-all ${productFields.vehicleType === t ? 'border-teal-500 bg-teal-50 text-teal-800' : 'border-slate-100 bg-white text-slate-500 hover:border-slate-200'}`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className={labelCls}>Registration Number *</label>
              <input type="text" placeholder="e.g. GJ01XX9999" value={productFields.regNo || ''} onChange={e => handleProductFieldChange('regNo', e.target.value.toUpperCase())}
                className={`${inputCls} ${errors.regNo ? 'border-red-400 focus:ring-red-500/20 bg-red-50' : ''}`}
              />
              {errors.regNo && <p className="text-[10px] text-red-500 font-bold mt-1 ml-1 flex items-center gap-1"><AlertCircle size={10}/>{errors.regNo}</p>}
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className={labelCls}>Vehicle Make</label>
                <input type="text" placeholder="e.g. Maruti" value={productFields.make || ''} onChange={e => handleProductFieldChange('make', e.target.value)} className={inputCls} />
              </div>
              <div>
                <label className={labelCls}>Vehicle Model</label>
                <input type="text" placeholder="e.g. Swift" value={productFields.model || ''} onChange={e => handleProductFieldChange('model', e.target.value)} className={inputCls} />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className={labelCls}>Registration Year</label>
                <select value={productFields.regYear || '2025'} onChange={e => handleProductFieldChange('regYear', e.target.value)} className={inputCls}>
                  {[...Array(15)].map((_, i) => {
                    const yr = (new Date().getFullYear() - i).toString();
                    return <option key={yr} value={yr}>{yr}</option>;
                  })}
                </select>
              </div>
              <div>
                <label className={labelCls}>Fuel Type</label>
                <select value={productFields.fuelType || 'Petrol'} onChange={e => handleProductFieldChange('fuelType', e.target.value)} className={inputCls}>
                  <option>Petrol</option>
                  <option>Diesel</option>
                  <option>CNG</option>
                  <option>Electric</option>
                </select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className={labelCls}>Existing Insurer</label>
                <input type="text" placeholder="e.g. HDFC Ergo" value={productFields.existingInsurer || ''} onChange={e => handleProductFieldChange('existingInsurer', e.target.value)} className={inputCls} />
              </div>
              <div>
                <label className={labelCls}>NCB %</label>
                <select value={productFields.ncb || '0%'} onChange={e => handleProductFieldChange('ncb', e.target.value)} className={inputCls}>
                  <option>0%</option>
                  <option>20%</option>
                  <option>25%</option>
                  <option>35%</option>
                  <option>45%</option>
                  <option>50%</option>
                </select>
              </div>
            </div>
            <div>
              <label className={labelCls}>Claim in Previous Year?</label>
              <div className="flex gap-2">
                {['No', 'Yes'].map(c => (
                  <button key={c} type="button" onClick={() => handleProductFieldChange('prevClaim', c)}
                    className={`flex-1 py-2.5 rounded-xl border-2 font-bold text-[12px] transition-all ${productFields.prevClaim === c ? 'border-teal-500 bg-teal-50 text-teal-800' : 'border-slate-100 bg-white text-slate-500 hover:border-slate-200'}`}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>
          </div>
        );
      case 'health':
        return (
          <div className="space-y-4">
            <div>
              <label className={labelCls}>Coverage Type</label>
              <div className="flex gap-2">
                {['Individual', 'Family Floater'].map(t => (
                  <button key={t} type="button" onClick={() => handleProductFieldChange('coverageType', t)}
                    className={`flex-1 py-2.5 rounded-xl border-2 font-bold text-[12px] transition-all ${productFields.coverageType === t ? 'border-teal-500 bg-teal-50 text-teal-800' : 'border-slate-100 bg-white text-slate-500 hover:border-slate-200'}`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className={labelCls}>Self Age</label>
                <input type="number" placeholder="Age" value={productFields.selfAge || ''} onChange={e => handleProductFieldChange('selfAge', e.target.value)} className={inputCls} />
              </div>
              <div>
                <label className={labelCls}>Spouse Age</label>
                <input type="number" placeholder="Age" value={productFields.spouseAge || ''} onChange={e => handleProductFieldChange('spouseAge', e.target.value)} className={inputCls} />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className={labelCls}>Children Count</label>
                <select value={productFields.children || '0'} onChange={e => handleProductFieldChange('children', e.target.value)} className={inputCls}>
                  <option>0</option>
                  <option>1</option>
                  <option>2</option>
                  <option>3</option>
                  <option>4</option>
                </select>
              </div>
              <div>
                <label className={labelCls}>Sum Insured Required</label>
                <select value={productFields.sumInsured || '5 Lakhs'} onChange={e => handleProductFieldChange('sumInsured', e.target.value)} className={inputCls}>
                  <option>3 Lakhs</option>
                  <option>5 Lakhs</option>
                  <option>10 Lakhs</option>
                  <option>20 Lakhs</option>
                  <option>50 Lakhs</option>
                  <option>1 Crore</option>
                </select>
              </div>
            </div>
            <div>
              <label className={labelCls}>Existing Medical Conditions</label>
              <input type="text" placeholder="e.g. BP, Diabetes, None" value={productFields.medicalConditions || ''} onChange={e => handleProductFieldChange('medicalConditions', e.target.value)} className={inputCls} />
            </div>
            <div>
              <label className={labelCls}>Have Existing Health Insurance?</label>
              <div className="flex gap-2">
                {['No', 'Yes'].map(h => (
                  <button key={h} type="button" onClick={() => handleProductFieldChange('hasExisting', h)}
                    className={`flex-1 py-2.5 rounded-xl border-2 font-bold text-[12px] transition-all ${productFields.hasExisting === h ? 'border-teal-500 bg-teal-50 text-teal-800' : 'border-slate-100 bg-white text-slate-500 hover:border-slate-200'}`}
                  >
                    {h}
                  </button>
                ))}
              </div>
            </div>
          </div>
        );
      case 'critical':
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className={labelCls}>Age</label>
                <input type="number" placeholder="Enter Age" value={productFields.age || ''} onChange={e => handleProductFieldChange('age', e.target.value)} className={inputCls} />
              </div>
              <div>
                <label className={labelCls}>Gender</label>
                <select value={productFields.gender || 'Male'} onChange={e => handleProductFieldChange('gender', e.target.value)} className={inputCls}>
                  <option>Male</option>
                  <option>Female</option>
                  <option>Other</option>
                </select>
              </div>
            </div>
            <div>
              <label className={labelCls}>Occupation</label>
              <input type="text" placeholder="e.g. Software Engineer" value={productFields.occupation || ''} onChange={e => handleProductFieldChange('occupation', e.target.value)} className={inputCls} />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className={labelCls}>Smoker / Non-Smoker</label>
                <select value={productFields.smoker || 'Non-Smoker'} onChange={e => handleProductFieldChange('smoker', e.target.value)} className={inputCls}>
                  <option>Non-Smoker</option>
                  <option>Smoker</option>
                </select>
              </div>
              <div>
                <label className={labelCls}>Coverage Amount</label>
                <select value={productFields.coverageAmount || '10 Lakhs'} onChange={e => handleProductFieldChange('coverageAmount', e.target.value)} className={inputCls}>
                  <option>5 Lakhs</option>
                  <option>10 Lakhs</option>
                  <option>25 Lakhs</option>
                  <option>50 Lakhs</option>
                  <option>1 Crore</option>
                </select>
              </div>
            </div>
            <div>
              <label className={labelCls}>Existing Illness (if any)</label>
              <input type="text" placeholder="e.g. Asthma, Heart Disease" value={productFields.existingIllness || ''} onChange={e => handleProductFieldChange('existingIllness', e.target.value)} className={inputCls} />
            </div>
          </div>
        );
      case 'senior':
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className={labelCls}>Age</label>
                <input type="number" placeholder="Enter Age" value={productFields.age || ''} onChange={e => handleProductFieldChange('age', e.target.value)} className={inputCls} />
              </div>
              <div>
                <label className={labelCls}>Gender</label>
                <select value={productFields.gender || 'Male'} onChange={e => handleProductFieldChange('gender', e.target.value)} className={inputCls}>
                  <option>Male</option>
                  <option>Female</option>
                </select>
              </div>
            </div>
            <div>
              <label className={labelCls}>Existing Diseases (if any)</label>
              <input type="text" placeholder="e.g. Hypertension, Joint pain" value={productFields.diseases || ''} onChange={e => handleProductFieldChange('diseases', e.target.value)} className={inputCls} />
            </div>
            <div>
              <label className={labelCls}>Current Medication Details</label>
              <input type="text" placeholder="e.g. Telmisartan 40mg" value={productFields.medication || ''} onChange={e => handleProductFieldChange('medication', e.target.value)} className={inputCls} />
            </div>
            <div>
              <label className={labelCls}>Sum Insured Required</label>
              <select value={productFields.sumInsured || '5 Lakhs'} onChange={e => handleProductFieldChange('sumInsured', e.target.value)} className={inputCls}>
                <option>3 Lakhs</option>
                <option>5 Lakhs</option>
                <option>10 Lakhs</option>
                <option>15 Lakhs</option>
              </select>
            </div>
          </div>
        );
      case 'parent':
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className={labelCls}>Father Age</label>
                <input type="number" placeholder="e.g. 62" value={productFields.fatherAge || ''} onChange={e => handleProductFieldChange('fatherAge', e.target.value)} className={inputCls} />
              </div>
              <div>
                <label className={labelCls}>Mother Age</label>
                <input type="number" placeholder="e.g. 58" value={productFields.motherAge || ''} onChange={e => handleProductFieldChange('motherAge', e.target.value)} className={inputCls} />
              </div>
            </div>
            <div>
              <label className={labelCls}>Existing Diseases (if any)</label>
              <input type="text" placeholder="e.g. Diabetes, BP" value={productFields.diseases || ''} onChange={e => handleProductFieldChange('diseases', e.target.value)} className={inputCls} />
            </div>
            <div>
              <label className={labelCls}>Sum Insured Required</label>
              <select value={productFields.sumInsured || '5 Lakhs'} onChange={e => handleProductFieldChange('sumInsured', e.target.value)} className={inputCls}>
                <option>3 Lakhs</option>
                <option>5 Lakhs</option>
                <option>10 Lakhs</option>
                <option>15 Lakhs</option>
              </select>
            </div>
          </div>
        );
      case 'travel':
        return (
          <div className="space-y-4">
            <div>
              <label className={labelCls}>Destination Country</label>
              <input type="text" placeholder="e.g. USA, Germany, Thailand" value={productFields.destination || ''} onChange={e => handleProductFieldChange('destination', e.target.value)} className={inputCls} />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className={labelCls}>Start Date</label>
                <input type="date" value={productFields.startDate || ''} onChange={e => handleProductFieldChange('startDate', e.target.value)} className={inputCls} />
              </div>
              <div>
                <label className={labelCls}>End Date</label>
                <input type="date" value={productFields.endDate || ''} onChange={e => handleProductFieldChange('endDate', e.target.value)} className={inputCls} />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className={labelCls}>Total Travellers</label>
                <input type="number" placeholder="e.g. 2" value={productFields.travellerCount || ''} onChange={e => handleProductFieldChange('travellerCount', e.target.value)} className={inputCls} />
              </div>
              <div>
                <label className={labelCls}>Traveller Ages</label>
                <input type="text" placeholder="e.g. 32, 28" value={productFields.travellerAges || ''} onChange={e => handleProductFieldChange('travellerAges', e.target.value)} className={inputCls} />
              </div>
            </div>
            <div>
              <label className={labelCls}>Purpose of Travel</label>
              <select value={productFields.purpose || 'Leisure'} onChange={e => handleProductFieldChange('purpose', e.target.value)} className={inputCls}>
                <option>Leisure / Holiday</option>
                <option>Business Trip</option>
                <option>Student Study Abroad</option>
              </select>
            </div>
          </div>
        );
      case 'group':
        return (
          <div className="space-y-4">
            <div>
              <label className={labelCls}>Company Name</label>
              <input type="text" placeholder="Company Legal Name" value={productFields.companyName || ''} onChange={e => handleProductFieldChange('companyName', e.target.value)} className={inputCls} />
            </div>
            <div>
              <label className={labelCls}>Industry Type</label>
              <input type="text" placeholder="e.g. IT, Manufacturing, Retail" value={productFields.industry || ''} onChange={e => handleProductFieldChange('industry', e.target.value)} className={inputCls} />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className={labelCls}>Total Employees</label>
                <select value={productFields.employees || '10-20'} onChange={e => handleProductFieldChange('employees', e.target.value)} className={inputCls}>
                  <option>10-20</option>
                  <option>21-50</option>
                  <option>51-200</option>
                  <option>200+</option>
                </select>
              </div>
              <div>
                <label className={labelCls}>Coverage Required</label>
                <input type="text" placeholder="e.g. ₹3 Lakhs Floater" value={productFields.coverage || ''} onChange={e => handleProductFieldChange('coverage', e.target.value)} className={inputCls} />
              </div>
            </div>
            <div>
              <label className={labelCls}>Existing Group Policy?</label>
              <select value={productFields.existingPolicy || 'No'} onChange={e => handleProductFieldChange('existingPolicy', e.target.value)} className={inputCls}>
                <option>No</option>
                <option>Yes</option>
              </select>
            </div>
          </div>
        );
      case 'life':
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className={labelCls}>Date of Birth</label>
                <input type="date" value={productFields.dob || ''} onChange={e => handleProductFieldChange('dob', e.target.value)} className={inputCls} />
              </div>
              <div>
                <label className={labelCls}>Gender</label>
                <select value={productFields.gender || 'Male'} onChange={e => handleProductFieldChange('gender', e.target.value)} className={inputCls}>
                  <option>Male</option>
                  <option>Female</option>
                </select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className={labelCls}>Occupation</label>
                <input type="text" placeholder="e.g. Salaried" value={productFields.occupation || ''} onChange={e => handleProductFieldChange('occupation', e.target.value)} className={inputCls} />
              </div>
              <div>
                <label className={labelCls}>Annual Income</label>
                <select value={productFields.income || '5-10 Lakhs'} onChange={e => handleProductFieldChange('income', e.target.value)} className={inputCls}>
                  <option>Under 3 Lakhs</option>
                  <option>3-5 Lakhs</option>
                  <option>5-10 Lakhs</option>
                  <option>10-15 Lakhs</option>
                  <option>15-20 Lakhs</option>
                  <option>20+ Lakhs</option>
                </select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className={labelCls}>Tobacco / Smoker</label>
                <select value={productFields.tobacco || 'No'} onChange={e => handleProductFieldChange('tobacco', e.target.value)} className={inputCls}>
                  <option>No</option>
                  <option>Yes</option>
                </select>
              </div>
              <div>
                <label className={labelCls}>Coverage Amount</label>
                <select value={productFields.coverAmount || '1 Crore'} onChange={e => handleProductFieldChange('coverAmount', e.target.value)} className={inputCls}>
                  <option>50 Lakhs</option>
                  <option>1 Crore</option>
                  <option>2 Crores</option>
                  <option>3+ Crores</option>
                </select>
              </div>
            </div>
            <div>
              <label className={labelCls}>Policy Term</label>
              <select value={productFields.term || '30 Years'} onChange={e => handleProductFieldChange('term', e.target.value)} className={inputCls}>
                <option>10 Years</option>
                <option>20 Years</option>
                <option>30 Years</option>
                <option>40 Years</option>
              </select>
            </div>
          </div>
        );
      case 'home':
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className={labelCls}>Property Type</label>
                <select value={productFields.propertyType || 'Apartment'} onChange={e => handleProductFieldChange('propertyType', e.target.value)} className={inputCls}>
                  <option>Apartment / Flat</option>
                  <option>Independent Villa</option>
                  <option>Row House / Builder floor</option>
                </select>
              </div>
              <div>
                <label className={labelCls}>Ownership</label>
                <select value={productFields.ownership || 'Owned'} onChange={e => handleProductFieldChange('ownership', e.target.value)} className={inputCls}>
                  <option>Owned</option>
                  <option>Rented</option>
                </select>
              </div>
            </div>
            <div>
              <label className={labelCls}>Estimated Property Value</label>
              <select value={productFields.propertyValue || '50 Lakhs - 1 Crore'} onChange={e => handleProductFieldChange('propertyValue', e.target.value)} className={inputCls}>
                <option>Up to 50 Lakhs</option>
                <option>50 Lakhs - 1 Crore</option>
                <option>1 - 2 Crores</option>
                <option>2 - 5 Crores</option>
                <option>5+ Crores</option>
              </select>
            </div>
            <div>
              <label className={labelCls}>Construction Type</label>
              <select value={productFields.constructionType || 'RCC Framed'} onChange={e => handleProductFieldChange('constructionType', e.target.value)} className={inputCls}>
                <option>RCC Framed Structure</option>
                <option>Load Bearing Brick Walls</option>
                <option>Timber / Wood Frame</option>
              </select>
            </div>
          </div>
        );
      case 'fire':
        return (
          <div className="space-y-4">
            <div>
              <label className={labelCls}>Business / Shop Name</label>
              <input type="text" placeholder="Enter Business Name" value={productFields.businessName || ''} onChange={e => handleProductFieldChange('businessName', e.target.value)} className={inputCls} />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className={labelCls}>Property Value</label>
                <input type="text" placeholder="e.g. ₹50 Lakhs" value={productFields.propertyValue || ''} onChange={e => handleProductFieldChange('propertyValue', e.target.value)} className={inputCls} />
              </div>
              <div>
                <label className={labelCls}>Stock Value</label>
                <input type="text" placeholder="e.g. ₹20 Lakhs" value={productFields.stockValue || ''} onChange={e => handleProductFieldChange('stockValue', e.target.value)} className={inputCls} />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className={labelCls}>Building Value</label>
                <input type="text" placeholder="e.g. ₹30 Lakhs" value={productFields.buildingValue || ''} onChange={e => handleProductFieldChange('buildingValue', e.target.value)} className={inputCls} />
              </div>
              <div>
                <label className={labelCls}>Property Location</label>
                <input type="text" placeholder="e.g. Industrial Area" value={productFields.location || ''} onChange={e => handleProductFieldChange('location', e.target.value)} className={inputCls} />
              </div>
            </div>
          </div>
        );
      case 'marine':
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className={labelCls}>Cargo / Goods Type</label>
                <input type="text" placeholder="e.g. Steel Sheets" value={productFields.cargoType || ''} onChange={e => handleProductFieldChange('cargoType', e.target.value)} className={inputCls} />
              </div>
              <div>
                <label className={labelCls}>Transit Type</label>
                <select value={productFields.transitType || 'Road'} onChange={e => handleProductFieldChange('transitType', e.target.value)} className={inputCls}>
                  <option>Road</option>
                  <option>Rail</option>
                  <option>Sea Freight</option>
                  <option>Air Freight</option>
                </select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className={labelCls}>Origin Location</label>
                <input type="text" placeholder="e.g. Ahmedabad" value={productFields.origin || ''} onChange={e => handleProductFieldChange('origin', e.target.value)} className={inputCls} />
              </div>
              <div>
                <label className={labelCls}>Destination Location</label>
                <input type="text" placeholder="e.g. Hamburg Port" value={productFields.destination || ''} onChange={e => handleProductFieldChange('destination', e.target.value)} className={inputCls} />
              </div>
            </div>
            <div>
              <label className={labelCls}>Cargo Value</label>
              <input type="text" placeholder="e.g. ₹45 Lakhs" value={productFields.cargoValue || ''} onChange={e => handleProductFieldChange('cargoValue', e.target.value)} className={inputCls} />
            </div>
          </div>
        );
      case 'cyber':
        return (
          <div className="space-y-4">
            <div>
              <label className={labelCls}>Cyber Risk Entity</label>
              <div className="flex gap-2">
                {['Individual', 'Business'].map(e => (
                  <button key={e} type="button" onClick={() => handleProductFieldChange('entityType', e)}
                    className={`flex-1 py-2.5 rounded-xl border-2 font-bold text-[12px] transition-all ${productFields.entityType === e ? 'border-teal-500 bg-teal-50 text-teal-800' : 'border-slate-100 bg-white text-slate-500 hover:border-slate-200'}`}
                  >
                    {e}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className={labelCls}>Business Type</label>
              <input type="text" placeholder="e.g. E-commerce, Software development" value={productFields.businessType || ''} onChange={e => handleProductFieldChange('businessType', e.target.value)} className={inputCls} />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className={labelCls}>Annual Turnover</label>
                <input type="text" placeholder="e.g. ₹5 Crores" value={productFields.turnover || ''} onChange={e => handleProductFieldChange('turnover', e.target.value)} className={inputCls} />
              </div>
              <div>
                <label className={labelCls}>Number of Employees</label>
                <input type="number" placeholder="Employees" value={productFields.employeesCount || ''} onChange={e => handleProductFieldChange('employeesCount', e.target.value)} className={inputCls} />
              </div>
            </div>
            <div>
              <label className={labelCls}>Existing Cyber Incidents?</label>
              <select value={productFields.hasIncidents || 'No'} onChange={e => handleProductFieldChange('hasIncidents', e.target.value)} className={inputCls}>
                <option>No</option>
                <option>Yes (Brief in remarks)</option>
              </select>
            </div>
          </div>
        );
      case 'business':
        return (
          <div className="space-y-4">
            <div>
              <label className={labelCls}>Business Name</label>
              <input type="text" placeholder="Company Name" value={productFields.businessName || ''} onChange={e => handleProductFieldChange('businessName', e.target.value)} className={inputCls} />
            </div>
            <div>
              <label className={labelCls}>Industry Type</label>
              <input type="text" placeholder="e.g. Retail, Logistics, Manufacturing" value={productFields.industry || ''} onChange={e => handleProductFieldChange('industry', e.target.value)} className={inputCls} />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className={labelCls}>Annual Turnover</label>
                <input type="text" placeholder="Turnover" value={productFields.turnover || ''} onChange={e => handleProductFieldChange('turnover', e.target.value)} className={inputCls} />
              </div>
              <div>
                <label className={labelCls}>Number of Employees</label>
                <input type="number" placeholder="Employees" value={productFields.employees || ''} onChange={e => handleProductFieldChange('employees', e.target.value)} className={inputCls} />
              </div>
            </div>
            <div>
              <label className={labelCls}>Required Coverage Type</label>
              <input type="text" placeholder="e.g. Asset Protection, Liability" value={productFields.coverageRequired || ''} onChange={e => handleProductFieldChange('coverageRequired', e.target.value)} className={inputCls} />
            </div>
          </div>
        );
      case 'workmen':
        return (
          <div className="space-y-4">
            <div>
              <label className={labelCls}>Company Name</label>
              <input type="text" placeholder="Company Name" value={productFields.companyName || ''} onChange={e => handleProductFieldChange('companyName', e.target.value)} className={inputCls} />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className={labelCls}>Number of Workers</label>
                <input type="number" placeholder="Workers count" value={productFields.workersCount || ''} onChange={e => handleProductFieldChange('workersCount', e.target.value)} className={inputCls} />
              </div>
              <div>
                <label className={labelCls}>Industry Type</label>
                <input type="text" placeholder="e.g. Construction" value={productFields.industry || ''} onChange={e => handleProductFieldChange('industry', e.target.value)} className={inputCls} />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className={labelCls}>Annual Wage Amount</label>
                <input type="text" placeholder="Wages Total" value={productFields.annualWages || ''} onChange={e => handleProductFieldChange('annualWages', e.target.value)} className={inputCls} />
              </div>
              <div>
                <label className={labelCls}>State of Site</label>
                <input type="text" placeholder="e.g. Gujarat" value={productFields.state || ''} onChange={e => handleProductFieldChange('state', e.target.value)} className={inputCls} />
              </div>
            </div>
          </div>
        );
      case 'pet':
        return (
          <div className="space-y-4">
            <div>
              <label className={labelCls}>Pet Type</label>
              <div className="flex gap-2">
                {['Dog', 'Cat'].map(p => (
                  <button key={p} type="button" onClick={() => handleProductFieldChange('petType', p)}
                    className={`flex-1 py-2.5 rounded-xl border-2 font-bold text-[12px] transition-all ${productFields.petType === p ? 'border-teal-500 bg-teal-50 text-teal-800' : 'border-slate-100 bg-white text-slate-500 hover:border-slate-200'}`}
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className={labelCls}>Breed</label>
                <input type="text" placeholder="e.g. Golden Retriever" value={productFields.breed || ''} onChange={e => handleProductFieldChange('breed', e.target.value)} className={inputCls} />
              </div>
              <div>
                <label className={labelCls}>Age (Months/Years)</label>
                <input type="text" placeholder="e.g. 2 Years" value={productFields.age || ''} onChange={e => handleProductFieldChange('age', e.target.value)} className={inputCls} />
              </div>
            </div>
            <div>
              <label className={labelCls}>Sum Insured Required</label>
              <select value={productFields.sumInsured || '50,000'} onChange={e => handleProductFieldChange('sumInsured', e.target.value)} className={inputCls}>
                <option>10,000</option>
                <option>25,000</option>
                <option>50,000</option>
                <option>1 Lakh</option>
              </select>
            </div>
          </div>
        );
      default:
        return (
          <div className="p-4 bg-teal-50 text-teal-800 rounded-2xl border border-teal-100 text-xs font-semibold">
            Custom quote fields will be configured by our advisor over call. Click Submit to verify.
          </div>
        );
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex justify-end bg-slate-900/60 backdrop-blur-sm">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-transparent" onClick={onClose} />

      {/* Drawer */}
      <motion.div
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ type: 'spring', damping: 25, stiffness: 220 }}
        className="relative w-full max-w-lg md:max-w-xl h-screen bg-white shadow-2xl flex flex-col z-10 overflow-hidden"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-slate-100 bg-[#0c1b33] text-white">
          <div>
            <h3 className="text-lg font-black tracking-tight">Get Best Insurance Quote</h3>
            <p className="text-xs text-slate-300 font-medium">Compare plans & save up to 40% instantly</p>
          </div>
          <button onClick={onClose} className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors">
            <X size={16} />
          </button>
        </div>

        {/* Progress Bar */}
        <div className="w-full h-1 bg-slate-100">
          <div className="h-full bg-teal-500 transition-all duration-300" style={{ width: step === 1 ? '50%' : '100%' }} />
        </div>

        {/* Scrollable Form Body */}
        <div className="flex-grow overflow-y-auto p-6 space-y-6 custom-scrollbar">
          {!isSubmitted ? (
            <form onSubmit={handleSubmit} className="space-y-6">
              {step === 1 ? (
                /* STEP 1: Common Fields */
                <div className="space-y-4">
                  <div className="p-4 bg-teal-50 border border-teal-100 rounded-2xl flex items-start gap-2.5 mb-2">
                    <Sparkles size={16} className="text-teal-600 mt-0.5 flex-shrink-0" />
                    <p className="text-[12px] font-bold text-teal-800 leading-relaxed">
                      Enter your contact details to begin. In Step 2, we will ask for details specific to your selection.
                    </p>
                  </div>

                  <div>
                    <label className={labelCls}>Select Insurance Type *</label>
                    <select value={selectedProduct} onChange={e => setSelectedProduct(e.target.value)} className={inputCls}>
                      {PRODUCT_LIST.map(p => (
                        <option key={p.id} value={p.id}>{p.label}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className={labelCls}>Full Name *</label>
                    <input type="text" name="name" placeholder="As per Aadhaar / PAN" value={formData.name} onChange={handleChange}
                      className={`${inputCls} ${errors.name ? 'border-red-400 focus:ring-red-500/20 bg-red-50' : ''}`}
                    />
                    {errors.name && <p className="text-[10px] text-red-500 font-bold mt-1 ml-1 flex items-center gap-1"><AlertCircle size={10}/>{errors.name}</p>}
                  </div>

                  <div>
                    <label className={labelCls}>Mobile Number *</label>
                    <div className="relative">
                      <div className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center gap-2 pr-3 border-r border-slate-200">
                        <span className="text-[13px] font-bold text-slate-500">+91</span>
                      </div>
                      <input type="tel" name="mobile" placeholder="10-digit mobile number" maxLength={10} value={formData.mobile} onChange={e => setFormData(p => ({ ...p, mobile: e.target.value.replace(/\D/g, '') }))}
                        className={`${inputCls} pl-[65px] ${errors.mobile ? 'border-red-400 focus:ring-red-500/20 bg-red-50' : ''}`}
                      />
                    </div>
                    {errors.mobile && <p className="text-[10px] text-red-500 font-bold mt-1 ml-1 flex items-center gap-1"><AlertCircle size={10}/>{errors.mobile}</p>}
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className={labelCls}>City *</label>
                      <input type="text" name="city" placeholder="e.g. Ahmedabad" value={formData.city} onChange={handleChange}
                        className={`${inputCls} ${errors.city ? 'border-red-400 focus:ring-red-500/20 bg-red-50' : ''}`}
                      />
                      {errors.city && <p className="text-[10px] text-red-500 font-bold mt-1 ml-1 flex items-center gap-1"><AlertCircle size={10}/>{errors.city}</p>}
                    </div>
                    <div>
                      <label className={labelCls}>Pincode</label>
                      <input type="text" name="pincode" placeholder="e.g. 380009" maxLength={6} value={formData.pincode} onChange={e => setFormData(p => ({ ...p, pincode: e.target.value.replace(/\D/g, '') }))}
                        className={`${inputCls} ${errors.pincode ? 'border-red-400 focus:ring-red-500/20 bg-red-50' : ''}`}
                      />
                      {errors.pincode && <p className="text-[10px] text-red-500 font-bold mt-1 ml-1 flex items-center gap-1"><AlertCircle size={10}/>{errors.pincode}</p>}
                    </div>
                  </div>

                  <div>
                    <label className={labelCls}>Email Address</label>
                    <input type="email" name="email" placeholder="e.g. name@example.com" value={formData.email} onChange={handleChange}
                      className={`${inputCls} ${errors.email ? 'border-red-400 focus:ring-red-500/20 bg-red-50' : ''}`}
                    />
                    {errors.email && <p className="text-[10px] text-red-500 font-bold mt-1 ml-1 flex items-center gap-1"><AlertCircle size={10}/>{errors.email}</p>}
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className={labelCls}>Preferred Contact Time</label>
                      <select name="preferredTime" value={formData.preferredTime} onChange={handleChange} className={inputCls}>
                        <option>Anytime</option>
                        <option>Morning (9 AM - 12 PM)</option>
                        <option>Afternoon (12 PM - 4 PM)</option>
                        <option>Evening (4 PM - 8 PM)</option>
                      </select>
                    </div>
                    <div>
                      <label className={labelCls}>Additional Remarks</label>
                      <input type="text" name="remarks" placeholder="Optional details..." value={formData.remarks} onChange={handleChange} className={inputCls} />
                    </div>
                  </div>
                </div>
              ) : (
                /* STEP 2: Product Specific Fields */
                <div className="space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                    <span className="text-[13px] font-black text-slate-800 uppercase tracking-wider">
                      {PRODUCT_LIST.find(p => p.id === selectedProduct)?.label} details
                    </span>
                    <button type="button" onClick={handleBack} className="text-[11px] font-bold text-teal-600 hover:text-teal-700">
                      Edit Contact Details
                    </button>
                  </div>
                  
                  {renderProductSpecificFields()}
                </div>
              )}
            </form>
          ) : (
            /* SUCCESS PAGE SCREEN */
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="py-8 text-center space-y-6"
            >
              <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-4 border-2 border-green-200">
                <CheckCircle2 size={44} className="text-green-500 animate-pulse" />
              </div>
              <div className="space-y-2">
                <h4 className="text-2xl font-black text-slate-900">Request Registered!</h4>
                <p className="text-sm font-semibold text-slate-500 max-w-sm mx-auto leading-relaxed">
                  Our Dedicated Insurance Advisor Will Contact You Shortly. A telecaller has been assigned to prepare your quotes.
                </p>
              </div>

              <div className="p-5 bg-slate-50 border border-slate-100 rounded-3xl space-y-3 max-w-sm mx-auto">
                <div className="text-[12px] font-bold text-slate-600 flex justify-between">
                  <span>Lead Reference:</span>
                  <span className="text-slate-900 font-extrabold">L-{Date.now().toString().slice(-6)}</span>
                </div>
                <div className="text-[12px] font-bold text-slate-600 flex justify-between">
                  <span>Assigned To:</span>
                  <span className="text-slate-900 font-extrabold">Advisor Team</span>
                </div>
                <div className="text-[12px] font-bold text-slate-600 flex justify-between">
                  <span>Status:</span>
                  <span className="text-teal-600 font-extrabold flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-teal-500 inline-block animate-ping"></span> Active Allocation</span>
                </div>
              </div>

              {/* WhatsApp Button CTA */}
              <div className="space-y-3 pt-4">
                <button
                  onClick={openWhatsApp}
                  className="w-full max-w-xs mx-auto py-3.5 px-6 bg-[#25d366] hover:bg-[#20ba5a] text-white rounded-xl font-black text-sm shadow-lg shadow-green-500/20 flex items-center justify-center gap-2 cursor-pointer transition-all hover:scale-105"
                >
                  <MessageSquare size={18} /> Connect on WhatsApp
                </button>
                <p className="text-[10px] text-slate-400 font-semibold">Get premium tables and comparisons instantly on your phone</p>
              </div>
            </motion.div>
          )}
        </div>

        {/* Footer */}
        {!isSubmitted && (
          <div className="px-6 py-5 border-t border-slate-100 bg-slate-50 flex items-center justify-between flex-shrink-0">
            {step === 2 ? (
              <button type="button" onClick={handleBack} className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-slate-200 font-black text-[12px] text-slate-600 hover:bg-slate-100 transition-colors">
                <ArrowLeft size={14} /> Back
              </button>
            ) : (
              <div />
            )}

            {step === 1 ? (
              <button type="button" onClick={handleNext} className="flex items-center gap-1.5 px-6 py-2.5 bg-[#0c1b33] hover:bg-[#162a4a] text-white rounded-xl font-black text-[12px] shadow-md transition-all">
                Next Step <ArrowRight size={14} />
              </button>
            ) : (
              <button type="button" onClick={handleSubmit} disabled={isSubmitting} className="flex items-center gap-1.5 px-6 py-2.5 bg-teal-600 hover:bg-teal-500 text-white rounded-xl font-black text-[12px] shadow-md transition-all disabled:opacity-60">
                {isSubmitting ? 'Submitting...' : 'Get Best Quote'} <ArrowRight size={14} />
              </button>
            )}
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default ProductQuoteModal;
