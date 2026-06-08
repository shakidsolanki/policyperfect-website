import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowRight, ArrowLeft, Shield, CheckCircle, Info, HelpCircle } from 'lucide-react';

const makeOptions = {
  car: ['Maruti Suzuki', 'Hyundai', 'Tata', 'Mahindra', 'Toyota', 'Honda', 'Kia', 'Renault', 'Nissan', 'Volkswagen', 'Skoda', 'MG', 'Jeep', 'BMW', 'Mercedes', 'Audi', 'Other'],
  bike: ['Hero', 'Honda', 'TVS', 'Bajaj', 'Yamaha', 'Suzuki', 'Royal Enfield', 'KTM', 'Other'],
  commercial: ['Tata', 'Mahindra', 'Ashok Leyland', 'Eicher', 'BharatBenz', 'Force', 'Piaggio', 'Maruti Suzuki', 'Other']
};

const modelOptions = {
  // Car models
  'Maruti Suzuki': ['Swift', 'Baleno', 'Dzire', 'WagonR', 'Brezza', 'Fronx', 'Ertiga', 'Grand Vitara', 'Other'],
  'Hyundai': ['i20', 'Creta', 'Verna', 'Venue', 'Grand i10 Nios', 'Exter', 'Alcazar', 'Tucson', 'Other'],
  'Tata': ['Nexon', 'Punch', 'Altroz', 'Tiago', 'Harrier', 'Safari', 'Tigor', 'Curvv', 'Other'],
  'Mahindra': ['XUV700', 'Scorpio-N', 'Thar', 'XUV300', 'Bolero', 'XUV400', 'Other'],
  'Toyota': ['Innova Crysta', 'Innova Hycross', 'Fortuner', 'Glanza', 'Urban Cruiser Taisor', 'Hilux', 'Other'],
  // Bike models
  'Hero': ['Splendor+', 'HF Deluxe', 'Glamour', 'Passion Pro', 'Super Splendor', 'Xpulse 200', 'Mavrick 440', 'Other'],
  'Honda': ['Activa 6G', 'Activa 125', 'Shine', 'SP 125', 'Unicorn', 'CB350', 'Hornet 2.0', 'Other'],
  'TVS': ['Jupiter', 'Apache RTR 160', 'Radeon', 'Ntorq 125', 'Raider 125', 'iQube', 'Other'],
  'Bajaj': ['Pulsar 150', 'Pulsar NS200', 'Platina 100', 'Chetak', 'Dominar 400', 'Avenger Cruise 220', 'Other'],
  // Fallbacks
  'Other': ['Other']
};

const variantOptions = {
  'Swift': ['LXI', 'VXI', 'ZXI', 'ZXI+', 'Other'],
  'Baleno': ['Sigma', 'Delta', 'Zeta', 'Alpha', 'Other'],
  'Dzire': ['LXI', 'VXI', 'ZXI', 'ZXI+', 'Other'],
  'Nexon': ['Smart', 'Pure', 'Creative', 'Fearless', 'Other'],
  'Creta': ['E', 'EX', 'S', 'SX', 'SX(O)', 'Other'],
  'Thar': ['AX Opt', 'LX', 'Earth Edition', 'Other'],
  'Activa 6G': ['Standard', 'Deluxe', 'H-Smart', 'Other'],
  'Pulsar 150': ['Neon', 'Single Disc', 'Twin Disc', 'Other'],
  'Other': ['Other']
};

const commercialTypes = [
  'Goods Carrier', 'Truck', 'Trailer', 'Tanker', 'Taxi', 'School Bus', 
  'Passenger Bus', 'Auto Rickshaw', 'Pickup', 'Tempo', 'LCV', 'HCV', 'Other'
];

const insurerOptions = [
  'HDFC ERGO', 'ICICI Lombard', 'Reliance General', 'Tata AIG', 'Bajaj Allianz',
  'Digit', 'SBI General', 'Royal Sundaram', 'IFFCO Tokio', 'Kotak General',
  'Future Generali', 'Universal Sompo', 'Other'
];

const MotorLeadModal = ({ isOpen, onClose, defaultVehicleType = 'car' }) => {
  const [step, setStep] = useState(1);
  const [vehicleType, setVehicleType] = useState(defaultVehicleType); // car, bike, commercial, other
  
  // Step Form Data States
  const [formData, setFormData] = useState({
    // Step 1: Vehicle Details
    commercialType: '',
    customVehicleTypeName: '',
    make: '',
    customMake: '',
    model: '',
    customModel: '',
    variant: '',
    customVariant: '',
    fuelType: 'Petrol',
    regNo: '',
    mfgYear: new Date().getFullYear(),
    
    // Step 2: Policy Details
    currentInsurer: '',
    expiryDate: '',
    policyType: 'Comprehensive',
    
    // Step 3: Claim History
    hasClaimed: 'No',
    claimsCount: '1',
    claimType: 'Own Damage',
    
    // Step 4: NCB Details
    currentNCB: '0%',
    
    // Step 5: Personal Details
    name: '',
    mobile: '',
    altMobile: '',
    email: '',
    pincode: '',
    city: '',
    state: '',
    district: '',
    address: ''
  });

  const [errors, setErrors] = useState({});
  const [pincodeLoading, setPincodeLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [refNumber, setRefNumber] = useState('');
  const [showNcbTooltip, setShowNcbTooltip] = useState(false);

  // Generate reference number on submission
  const generateRef = () => {
    const date = new Date();
    const yy = date.getFullYear().toString().slice(-2);
    const mm = String(date.getMonth() + 1).padStart(2, '0');
    const dd = String(date.getDate()).padStart(2, '0');
    const rand = Math.floor(100 + Math.random() * 900); // 3 digit random
    return `PP${yy}${mm}${dd}${rand}`;
  };

  // Helper to fetch Pincode info
  useEffect(() => {
    const fetchPincode = async () => {
      if (formData.pincode.length === 6) {
        setPincodeLoading(true);
        try {
          const response = await fetch(`https://api.postalpincode.in/pincode/${formData.pincode}`);
          const data = await response.json();
          if (data[0]?.Status === 'Success' && data[0]?.PostOffice?.length > 0) {
            const po = data[0].PostOffice[0];
            setFormData(prev => ({
              ...prev,
              city: po.Block || po.Division || po.District,
              state: po.State,
              district: po.District
            }));
            setErrors(prev => ({ ...prev, pincode: '' }));
          } else {
            setErrors(prev => ({ ...prev, pincode: 'Invalid Pincode' }));
          }
        } catch (err) {
          console.error(err);
        } finally {
          setPincodeLoading(false);
        }
      }
    };
    fetchPincode();
  }, [formData.pincode]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => {
      const updated = { ...prev, [name]: value };
      
      // Reset dependent fields
      if (name === 'make') {
        updated.model = '';
        updated.variant = '';
        updated.customMake = '';
        updated.customModel = '';
        updated.customVariant = '';
      } else if (name === 'model') {
        updated.variant = '';
        updated.customModel = '';
        updated.customVariant = '';
      } else if (name === 'variant') {
        updated.customVariant = '';
      }
      return updated;
    });
    // Clear error
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleVehicleTypeSelect = (type) => {
    setVehicleType(type);
    setFormData(prev => ({
      ...prev,
      make: '',
      model: '',
      variant: '',
      commercialType: '',
      customVehicleTypeName: ''
    }));
  };

  const validateStep = () => {
    const newErrors = {};
    if (step === 1) {
      if (vehicleType === 'commercial' && !formData.commercialType) {
        newErrors.commercialType = 'Commercial vehicle type is required';
      }
      if (vehicleType === 'other' && !formData.customVehicleTypeName) {
        newErrors.customVehicleTypeName = 'Vehicle type name is required';
      }
      if (vehicleType !== 'other') {
        if (!formData.make) newErrors.make = 'Make is required';
        if (formData.make === 'Other' && !formData.customMake) newErrors.customMake = 'Vehicle Make is required';
        
        if (formData.make && formData.make !== 'Other') {
          if (!formData.model) newErrors.model = 'Model is required';
          if (formData.model === 'Other' && !formData.customModel) newErrors.customModel = 'Model Name is required';
        }
        
        if (formData.model && formData.model !== 'Other' && variantOptions[formData.model]) {
          if (!formData.variant) newErrors.variant = 'Variant is required';
          if (formData.variant === 'Other' && !formData.customVariant) newErrors.customVariant = 'Variant is required';
        }
      } else {
        if (!formData.customMake) newErrors.customMake = 'Make is required';
        if (!formData.customModel) newErrors.customModel = 'Model is required';
      }

      if (!formData.regNo) {
        newErrors.regNo = 'Registration number is required';
      } else if (!/^[A-Z]{2}[0-9]{2}[A-Z]{1,2}[0-9]{4}$/i.test(formData.regNo.replace(/\s+/g, ''))) {
        newErrors.regNo = 'Invalid format. e.g. GJ01AB1234';
      }
    } else if (step === 2) {
      if (!formData.currentInsurer) newErrors.currentInsurer = 'Current insurer is required';
      if (!formData.expiryDate) newErrors.expiryDate = 'Expiry date is required';
    } else if (step === 5) {
      if (!formData.name) newErrors.name = 'Full Name is required';
      if (!formData.mobile) {
        newErrors.mobile = 'Mobile Number is required';
      } else if (!/^[6-9]\d{9}$/.test(formData.mobile)) {
        newErrors.mobile = 'Invalid 10-digit Mobile Number';
      }
      if (!formData.email) {
        newErrors.email = 'Email address is required';
      } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        newErrors.email = 'Invalid Email address';
      }
      if (!formData.pincode) {
        newErrors.pincode = 'Pincode is required';
      } else if (formData.pincode.length !== 6) {
        newErrors.pincode = 'Must be 6 digits';
      }
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateStep()) {
      setIsSubmitting(true);
      
      const newRef = generateRef();
      setRefNumber(newRef);

      const leadData = {
        id: Date.now(),
        refNo: newRef,
        date: new Date().toLocaleString(),
        productType: vehicleType === 'bike' ? 'Two Wheeler Insurance' : 'Motor Insurance',
        vehicleType: vehicleType.toUpperCase(),
        make: formData.make === 'Other' ? formData.customMake : (formData.make || formData.customMake),
        model: formData.model === 'Other' ? formData.customModel : (formData.model || formData.customModel),
        variant: formData.variant === 'Other' ? formData.customVariant : (formData.variant || formData.customVariant),
        fuel: formData.fuelType,
        regNo: formData.regNo.toUpperCase(),
        mfgYear: formData.mfgYear,
        currentInsurer: formData.currentInsurer,
        expiryDate: formData.expiryDate,
        policyType: formData.policyType,
        claimHistory: formData.hasClaimed === 'Yes' ? `${formData.claimsCount} Claims (${formData.claimType})` : 'No Claims',
        ncb: formData.currentNCB,
        name: formData.name,
        mobile: formData.mobile,
        altMobile: formData.altMobile || '-',
        email: formData.email,
        city: formData.city,
        state: formData.state,
        pincode: formData.pincode,
        address: formData.address || '-',
        source: 'Motor Insurance Page',
        status: 'New Lead'
      };

      // Save to LocalStorage (simulating Firebase CRM Integration)
      try {
        const existingLeads = JSON.parse(localStorage.getItem('policy_leads') || '[]');
        localStorage.setItem('policy_leads', JSON.stringify([leadData, ...existingLeads]));
        
        // Simulating artificial delay for premium enterprise submitting state
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        setShowSuccess(true);
      } catch (err) {
        console.error(err);
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-0 md:p-6 bg-slate-900/60 backdrop-blur-md">
      <AnimatePresence mode="wait">
        {!showSuccess ? (
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="w-full h-full md:h-auto md:max-w-4xl bg-white md:rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[100vh] md:max-h-[90vh]"
          >
            {/* Modal Header */}
            <div className="bg-[#012e67] px-6 py-5 text-white flex justify-between items-center flex-shrink-0">
              <div>
                <h2 className="text-xl md:text-2xl font-black">Get Instant Motor Insurance Quote</h2>
                <p className="text-slate-200 text-xs md:text-sm mt-0.5">Fill in your details to get the best quotes from top insurers</p>
              </div>
              <button 
                onClick={onClose} 
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Stepper Progress bar */}
            <div className="bg-slate-50 px-6 py-4 border-b border-slate-100 flex-shrink-0">
              <div className="flex justify-between items-center max-w-2xl mx-auto text-[10px] md:text-xs font-bold text-slate-400">
                {[
                  { num: 1, title: 'Vehicle details' },
                  { num: 2, title: 'Policy details' },
                  { num: 3, title: 'Claim & NCB' },
                  { num: 4, title: 'Personal details' },
                  { num: 5, title: 'Review & Submit' }
                ].map((s) => (
                  <div key={s.num} className="flex items-center gap-1.5 md:gap-2">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center font-bold text-xs ${
                      step >= s.num ? 'bg-[#012e67] text-white' : 'bg-slate-200 text-slate-500'
                    }`}>
                      {s.num}
                    </div>
                    <span className={step >= s.num ? 'text-[#012e67]' : ''}>{s.title}</span>
                    {s.num < 5 && <div className="h-[2px] w-4 md:w-8 bg-slate-200" />}
                  </div>
                ))}
              </div>
            </div>

            {/* Scrollable Form Body */}
            <div className="flex-grow overflow-y-auto p-6 md:p-8 space-y-6">
              
              {/* STEP 1: VEHICLE TYPE & BASE DETAILS */}
              {step === 1 && (
                <div className="space-y-6">
                  {/* Vehicle Type Cards */}
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-3">1. Select Vehicle Type</label>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {[
                        { id: 'car', name: 'Private Car', desc: '🚗 Car' },
                        { id: 'commercial', name: 'Commercial Vehicle', desc: '🚚 Commercial' },
                        { id: 'bike', name: 'Bike / Scooter', desc: '🏍️ Bike' },
                        { id: 'other', name: 'Other Vehicle', desc: '❓ Other' }
                      ].map((item) => (
                        <div 
                          key={item.id}
                          onClick={() => handleVehicleTypeSelect(item.id)}
                          className={`p-4 rounded-xl border-2 text-center cursor-pointer transition-all ${
                            vehicleType === item.id 
                              ? 'border-[#012e67] bg-blue-50/50 shadow-md scale-[1.02]' 
                              : 'border-slate-200 hover:border-slate-300'
                          }`}
                        >
                          <div className="text-2xl mb-1">{item.desc.split(' ')[0]}</div>
                          <div className="font-bold text-sm text-slate-700">{item.name}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Dynamic Fields based on Type */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    {vehicleType === 'commercial' && (
                      <div className="col-span-2">
                        <label className="block text-sm font-bold text-slate-700 mb-1.5">Commercial Vehicle Type *</label>
                        <select 
                          name="commercialType"
                          value={formData.commercialType}
                          onChange={handleChange}
                          className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none bg-slate-50 font-medium"
                        >
                          <option value="">Select Type</option>
                          {commercialTypes.map(t => <option key={t} value={t}>{t}</option>)}
                        </select>
                        {errors.commercialType && <p className="text-red-500 text-xs mt-1 font-semibold">{errors.commercialType}</p>}
                      </div>
                    )}

                    {vehicleType === 'other' && (
                      <div className="col-span-2">
                        <label className="block text-sm font-bold text-slate-700 mb-1.5">Vehicle Type Name *</label>
                        <input 
                          type="text"
                          name="customVehicleTypeName"
                          placeholder="e.g. Tractor, Crane, etc."
                          value={formData.customVehicleTypeName}
                          onChange={handleChange}
                          className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none bg-slate-50 font-medium"
                        />
                        {errors.customVehicleTypeName && <p className="text-red-500 text-xs mt-1 font-semibold">{errors.customVehicleTypeName}</p>}
                      </div>
                    )}

                    {/* Make Selection */}
                    {vehicleType !== 'other' ? (
                      <div>
                        <label className="block text-sm font-bold text-slate-700 mb-1.5">Make (Brand) *</label>
                        <select
                          name="make"
                          value={formData.make}
                          onChange={handleChange}
                          className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none bg-slate-50 font-medium"
                        >
                          <option value="">Select Make</option>
                          {makeOptions[vehicleType]?.map(m => <option key={m} value={m}>{m}</option>)}
                        </select>
                        {errors.make && <p className="text-red-500 text-xs mt-1 font-semibold">{errors.make}</p>}
                      </div>
                    ) : (
                      <div>
                        <label className="block text-sm font-bold text-slate-700 mb-1.5">Enter Vehicle Make *</label>
                        <input 
                          type="text"
                          name="customMake"
                          placeholder="e.g. JCB, Force"
                          value={formData.customMake}
                          onChange={handleChange}
                          className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none bg-slate-50 font-medium"
                        />
                        {errors.customMake && <p className="text-red-500 text-xs mt-1 font-semibold">{errors.customMake}</p>}
                      </div>
                    )}

                    {/* Custom Make Input */}
                    {formData.make === 'Other' && (
                      <div>
                        <label className="block text-sm font-bold text-slate-700 mb-1.5">Enter Vehicle Brand *</label>
                        <input 
                          type="text"
                          name="customMake"
                          placeholder="Enter brand name"
                          value={formData.customMake}
                          onChange={handleChange}
                          className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none bg-slate-50 font-medium"
                        />
                        {errors.customMake && <p className="text-red-500 text-xs mt-1 font-semibold">{errors.customMake}</p>}
                      </div>
                    )}

                    {/* Model Selection */}
                    {vehicleType !== 'other' && formData.make && formData.make !== 'Other' && (
                      <div>
                        <label className="block text-sm font-bold text-slate-700 mb-1.5">Model *</label>
                        <select
                          name="model"
                          value={formData.model}
                          onChange={handleChange}
                          className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none bg-slate-50 font-medium"
                        >
                          <option value="">Select Model</option>
                          {modelOptions[formData.make]?.map(mod => <option key={mod} value={mod}>{mod}</option>)}
                          <option value="Other">Other</option>
                        </select>
                        {errors.model && <p className="text-red-500 text-xs mt-1 font-semibold">{errors.model}</p>}
                      </div>
                    )}

                    {/* Custom Model Input */}
                    {(formData.model === 'Other' || vehicleType === 'other') && (
                      <div>
                        <label className="block text-sm font-bold text-slate-700 mb-1.5">Enter Model Name *</label>
                        <input 
                          type="text"
                          name="customModel"
                          placeholder="Enter model"
                          value={formData.customModel}
                          onChange={handleChange}
                          className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none bg-slate-50 font-medium"
                        />
                        {errors.customModel && <p className="text-red-500 text-xs mt-1 font-semibold">{errors.customModel}</p>}
                      </div>
                    )}

                    {/* Variant Selection */}
                    {formData.model && formData.model !== 'Other' && variantOptions[formData.model] && (
                      <div>
                        <label className="block text-sm font-bold text-slate-700 mb-1.5">Variant *</label>
                        <select
                          name="variant"
                          value={formData.variant}
                          onChange={handleChange}
                          className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none bg-slate-50 font-medium"
                        >
                          <option value="">Select Variant</option>
                          {variantOptions[formData.model]?.map(v => <option key={v} value={v}>{v}</option>)}
                        </select>
                        {errors.variant && <p className="text-red-500 text-xs mt-1 font-semibold">{errors.variant}</p>}
                      </div>
                    )}

                    {/* Custom Variant Input */}
                    {formData.variant === 'Other' && (
                      <div>
                        <label className="block text-sm font-bold text-slate-700 mb-1.5">Enter Variant *</label>
                        <input 
                          type="text"
                          name="customVariant"
                          placeholder="e.g. LXI (O)"
                          value={formData.customVariant}
                          onChange={handleChange}
                          className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none bg-slate-50 font-medium"
                        />
                        {errors.customVariant && <p className="text-red-500 text-xs mt-1 font-semibold">{errors.customVariant}</p>}
                      </div>
                    )}

                    {/* Fuel Type */}
                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-1.5">Fuel Type *</label>
                      <div className="flex gap-2 flex-wrap">
                        {['Petrol', 'Diesel', 'CNG', 'Electric', 'Hybrid'].map(f => (
                          <button
                            key={f}
                            type="button"
                            onClick={() => setFormData(p => ({ ...p, fuelType: f }))}
                            className={`px-4 py-2 text-sm font-bold rounded-lg border transition-all ${
                              formData.fuelType === f 
                                ? 'bg-[#012e67] text-white border-[#012e67]' 
                                : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                            }`}
                          >
                            {f}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Registration Number */}
                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-1.5">Registration Number *</label>
                      <input 
                        type="text"
                        name="regNo"
                        placeholder="e.g. GJ01AB1234"
                        value={formData.regNo}
                        onChange={(e) => {
                          e.target.value = e.target.value.toUpperCase();
                          handleChange(e);
                        }}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none bg-slate-50 font-medium"
                      />
                      {errors.regNo && <p className="text-red-500 text-xs mt-1 font-semibold">{errors.regNo}</p>}
                    </div>

                    {/* Manufacturing Year */}
                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-1.5">Manufacturing Year *</label>
                      <select
                        name="mfgYear"
                        value={formData.mfgYear}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none bg-slate-50 font-medium"
                      >
                        {Array.from({ length: 27 }, (_, i) => new Date().getFullYear() - i).map(yr => (
                          <option key={yr} value={yr}>{yr}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 2: POLICY DETAILS */}
              {step === 2 && (
                <div className="space-y-6 max-w-xl mx-auto">
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-1.5">Current Insurer *</label>
                    <select
                      name="currentInsurer"
                      value={formData.currentInsurer}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none bg-slate-50 font-medium"
                    >
                      <option value="">Select Insurer</option>
                      {insurerOptions.map(ins => <option key={ins} value={ins}>{ins}</option>)}
                    </select>
                    {errors.currentInsurer && <p className="text-red-500 text-xs mt-1 font-semibold">{errors.currentInsurer}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-1.5">Policy Expiry Date *</label>
                    <input 
                      type="date"
                      name="expiryDate"
                      value={formData.expiryDate}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none bg-slate-50 font-medium"
                    />
                    {errors.expiryDate && <p className="text-red-500 text-xs mt-1 font-semibold">{errors.expiryDate}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">Policy Type *</label>
                    <div className="grid grid-cols-2 gap-3">
                      {['Comprehensive', 'Third Party', 'Own Damage', "Don't Know"].map(type => (
                        <div 
                          key={type}
                          onClick={() => setFormData(p => ({ ...p, policyType: type }))}
                          className={`p-3 rounded-xl border-2 text-center cursor-pointer transition-all font-bold text-sm ${
                            formData.policyType === type
                              ? 'border-[#012e67] bg-blue-50/50 text-[#012e67]'
                              : 'border-slate-200 text-slate-600 hover:border-slate-300'
                          }`}
                        >
                          {type}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 3: CLAIM & NCB DETAILS */}
              {step === 3 && (
                <div className="space-y-6 max-w-xl mx-auto">
                  {/* Claim History */}
                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                    <label className="block text-sm font-bold text-slate-800 mb-3">Have you made a claim in the last 3 years? *</label>
                    <div className="flex gap-4">
                      {['No', 'Yes'].map(opt => (
                        <label key={opt} className="flex items-center gap-2 font-bold text-slate-700 cursor-pointer">
                          <input 
                            type="radio"
                            name="hasClaimed"
                            value={opt}
                            checked={formData.hasClaimed === opt}
                            onChange={handleChange}
                            className="w-5 h-5 text-blue-600 focus:ring-blue-500"
                          />
                          {opt}
                        </label>
                      ))}
                    </div>
                  </div>

                  {formData.hasClaimed === 'Yes' && (
                    <motion.div 
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      className="space-y-4"
                    >
                      <div>
                        <label className="block text-sm font-bold text-slate-700 mb-1.5">Number of Claims *</label>
                        <select
                          name="claimsCount"
                          value={formData.claimsCount}
                          onChange={handleChange}
                          className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none bg-slate-50 font-medium"
                        >
                          <option value="1">1</option>
                          <option value="2">2</option>
                          <option value="3">3</option>
                          <option value="More than 3">More than 3</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-bold text-slate-700 mb-1.5">Claim Type *</label>
                        <select
                          name="claimType"
                          value={formData.claimType}
                          onChange={handleChange}
                          className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none bg-slate-50 font-medium"
                        >
                          <option value="Own Damage">Own Damage</option>
                          <option value="Third Party">Third Party</option>
                          <option value="Theft">Theft</option>
                          <option value="Total Loss">Total Loss</option>
                          <option value="Unknown">Unknown</option>
                        </select>
                      </div>
                    </motion.div>
                  )}

                  {/* NCB Details */}
                  <div className="relative">
                    <div className="flex justify-between items-center mb-2">
                      <label className="block text-sm font-bold text-slate-700">Current NCB (No Claim Bonus) *</label>
                      <button 
                        type="button"
                        onClick={() => setShowNcbTooltip(!showNcbTooltip)}
                        className="text-blue-600 hover:text-blue-800 text-xs font-bold flex items-center gap-1"
                      >
                        <HelpCircle size={14} /> NCB info
                      </button>
                    </div>

                    {showNcbTooltip && (
                      <div className="absolute right-0 top-6 z-20 w-80 bg-[#0f172a] text-white p-4 rounded-xl shadow-2xl text-xs space-y-2.5">
                        <div className="flex justify-between items-center border-b border-white/10 pb-1.5">
                          <span className="font-bold text-slate-300">NCB Multiplier Scale</span>
                          <button onClick={() => setShowNcbTooltip(false)} className="text-slate-400 hover:text-white">✕</button>
                        </div>
                        <ul className="space-y-1 font-medium text-slate-200">
                          <li>• 1 Claim-free Year = 20%</li>
                          <li>• 2 Claim-free Years = 25%</li>
                          <li>• 3 Claim-free Years = 35%</li>
                          <li>• 4 Claim-free Years = 45%</li>
                          <li>• 5 Claim-free Years = 50% (Max)</li>
                        </ul>
                        <div className="bg-red-500/20 text-red-200 p-2 rounded-lg border border-red-500/30">
                          <span className="font-bold">NCB becomes 0% if:</span>
                          <p className="mt-0.5">• You file an Own Damage claim.</p>
                          <p>• Your policy lapses by &gt; 90 days.</p>
                        </div>
                      </div>
                    )}

                    <select
                      name="currentNCB"
                      value={formData.currentNCB}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none bg-slate-50 font-medium"
                    >
                      <option value="0%">0% (Last year claimed or new vehicle)</option>
                      <option value="20%">20% (1 Claim-free year)</option>
                      <option value="25%">25% (2 Claim-free years)</option>
                      <option value="35%">35% (3 Claim-free years)</option>
                      <option value="45%">45% (4 Claim-free years)</option>
                      <option value="50%">50% (5 Claim-free years)</option>
                      <option value="Don't Know">Don't Know</option>
                    </select>
                  </div>
                </div>
              )}

              {/* STEP 4: PERSONAL & LOCATION DETAILS */}
              {step === 4 && (
                <div className="space-y-5">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-1.5">Full Name *</label>
                      <input 
                        type="text"
                        name="name"
                        placeholder="Enter full name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none bg-slate-50 font-medium"
                      />
                      {errors.name && <p className="text-red-500 text-xs mt-1 font-semibold">{errors.name}</p>}
                    </div>

                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-1.5">Mobile Number *</label>
                      <input 
                        type="tel"
                        name="mobile"
                        maxLength="10"
                        placeholder="Enter 10-digit mobile number"
                        value={formData.mobile}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none bg-slate-50 font-medium"
                      />
                      {errors.mobile && <p className="text-red-500 text-xs mt-1 font-semibold">{errors.mobile}</p>}
                    </div>

                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-1.5">Alternate Mobile (Optional)</label>
                      <input 
                        type="tel"
                        name="altMobile"
                        maxLength="10"
                        placeholder="Enter secondary number"
                        value={formData.altMobile}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none bg-slate-50 font-medium"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-1.5">Email Address *</label>
                      <input 
                        type="email"
                        name="email"
                        placeholder="Enter email address"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none bg-slate-50 font-medium"
                      />
                      {errors.email && <p className="text-red-500 text-xs mt-1 font-semibold">{errors.email}</p>}
                    </div>
                  </div>

                  <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100 space-y-4">
                    <h3 className="font-bold text-sm text-[#012e67] uppercase tracking-wider">Location Details</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-600 mb-1">Pincode *</label>
                        <input 
                          type="text"
                          name="pincode"
                          maxLength="6"
                          placeholder="e.g. 380001"
                          value={formData.pincode}
                          onChange={handleChange}
                          className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none bg-white font-medium text-sm"
                        />
                        {pincodeLoading && <span className="text-[10px] text-blue-500">Checking...</span>}
                        {errors.pincode && <p className="text-red-500 text-xs mt-1 font-semibold">{errors.pincode}</p>}
                      </div>
                      
                      <div>
                        <label className="block text-xs font-bold text-slate-600 mb-1">City / Town</label>
                        <input 
                          type="text"
                          name="city"
                          readOnly
                          value={formData.city}
                          className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-slate-100 font-bold text-slate-700 outline-none text-sm cursor-not-allowed"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-600 mb-1">State</label>
                        <input 
                          type="text"
                          name="state"
                          readOnly
                          value={formData.state}
                          className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-slate-100 font-bold text-slate-700 outline-none text-sm cursor-not-allowed"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-600 mb-1">Address Line (Optional)</label>
                      <textarea 
                        name="address"
                        rows="2"
                        placeholder="Enter house/flat number, road, area details"
                        value={formData.address}
                        onChange={handleChange}
                        className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none bg-white font-medium text-sm"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 5: REVIEW SCREEN */}
              {step === 5 && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    
                    {/* Vehicle Details Card */}
                    <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200/60 space-y-2 text-sm">
                      <h3 className="font-extrabold text-[#012e67] border-b border-slate-200 pb-2 mb-3 uppercase text-xs tracking-wider">🚗 Vehicle Details</h3>
                      <div><span className="font-medium text-slate-500">Vehicle Type:</span> <span className="font-bold text-slate-800">{vehicleType.toUpperCase()}</span></div>
                      {vehicleType === 'commercial' && <div><span className="font-medium text-slate-500">Commercial Type:</span> <span className="font-bold text-slate-800">{formData.commercialType}</span></div>}
                      {vehicleType === 'other' && <div><span className="font-medium text-slate-500">Vehicle Type:</span> <span className="font-bold text-slate-800">{formData.customVehicleTypeName}</span></div>}
                      <div><span className="font-medium text-slate-500">Brand & Make:</span> <span className="font-bold text-slate-800">{formData.make === 'Other' ? formData.customMake : (formData.make || formData.customMake)}</span></div>
                      {vehicleType !== 'other' && <div><span className="font-medium text-slate-500">Model Name:</span> <span className="font-bold text-slate-800">{formData.model === 'Other' ? formData.customModel : (formData.model || formData.customModel)}</span></div>}
                      {vehicleType !== 'other' && formData.variant && <div><span className="font-medium text-slate-500">Variant Name:</span> <span className="font-bold text-slate-800">{formData.variant === 'Other' ? formData.customVariant : (formData.variant || formData.customVariant)}</span></div>}
                      <div><span className="font-medium text-slate-500">Fuel & Mfg Year:</span> <span className="font-bold text-slate-800">{formData.fuelType} ({formData.mfgYear})</span></div>
                      <div><span className="font-medium text-slate-500">Registration No:</span> <span className="font-bold text-slate-800 text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-100">{formData.regNo.toUpperCase()}</span></div>
                    </div>

                    {/* Policy & Claim Details Card */}
                    <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200/60 space-y-2 text-sm">
                      <h3 className="font-extrabold text-[#012e67] border-b border-slate-200 pb-2 mb-3 uppercase text-xs tracking-wider">🛡️ Policy & NCB Details</h3>
                      <div><span className="font-medium text-slate-500">Previous Insurer:</span> <span className="font-bold text-slate-800">{formData.currentInsurer}</span></div>
                      <div><span className="font-medium text-slate-500">Expiry Date:</span> <span className="font-bold text-slate-800">{formData.expiryDate}</span></div>
                      <div><span className="font-medium text-slate-500">Policy Type:</span> <span className="font-bold text-slate-800">{formData.policyType}</span></div>
                      <div><span className="font-medium text-slate-500">Claim History:</span> <span className="font-bold text-slate-800">{formData.hasClaimed === 'Yes' ? `${formData.claimsCount} Claims (${formData.claimType})` : 'No Claims'}</span></div>
                      <div><span className="font-medium text-slate-500">NCB Percent:</span> <span className="font-bold text-green-700 bg-green-50 px-2 py-0.5 rounded border border-green-100">{formData.currentNCB}</span></div>
                    </div>

                    {/* Personal Details Card */}
                    <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200/60 col-span-1 md:col-span-2 space-y-2 text-sm">
                      <h3 className="font-extrabold text-[#012e67] border-b border-slate-200 pb-2 mb-3 uppercase text-xs tracking-wider">👤 Personal Details</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        <div><span className="font-medium text-slate-500">Full Name:</span> <span className="font-bold text-slate-800">{formData.name}</span></div>
                        <div><span className="font-medium text-slate-500">Mobile Number:</span> <span className="font-bold text-slate-800">{formData.mobile}</span></div>
                        {formData.altMobile && <div><span className="font-medium text-slate-500">Alt Mobile:</span> <span className="font-bold text-slate-800">{formData.altMobile}</span></div>}
                        <div><span className="font-medium text-slate-500">Email Address:</span> <span className="font-bold text-slate-800">{formData.email}</span></div>
                        <div className="col-span-1 md:col-span-2"><span className="font-medium text-slate-500">Location Area:</span> <span className="font-bold text-slate-800">{formData.city}, {formData.state} - {formData.pincode}</span></div>
                        {formData.address && <div className="col-span-1 md:col-span-2"><span className="font-medium text-slate-500">Full Address:</span> <span className="font-bold text-slate-800">{formData.address}</span></div>}
                      </div>
                    </div>
                  </div>

                  <label className="flex items-center gap-2.5 p-3 bg-blue-50/40 rounded-xl border border-blue-100 cursor-pointer font-bold text-slate-700 text-sm">
                    <input 
                      type="checkbox"
                      id="confirmCheck"
                      required
                      className="w-5 h-5 text-blue-600 focus:ring-blue-500"
                    />
                    I confirm that all the details provided above are correct.
                  </label>
                </div>
              )}

            </div>

            {/* Modal Footer Controls */}
            <div className="bg-slate-50 px-6 py-5 border-t border-slate-100 flex justify-between items-center flex-shrink-0">
              {step > 1 ? (
                <button
                  type="button"
                  onClick={handleBack}
                  className="flex items-center gap-2 px-5 py-3 border-2 border-slate-200 rounded-xl text-slate-700 hover:bg-slate-100 font-bold transition-all"
                >
                  <ArrowLeft size={16} /> Back
                </button>
              ) : (
                <div />
              )}

              {step < 5 ? (
                <button
                  type="button"
                  onClick={handleNext}
                  className="flex items-center gap-2 px-6 py-3 bg-[#012e67] text-white rounded-xl font-bold hover:bg-blue-900 transition-all shadow-lg shadow-blue-900/20"
                >
                  Continue <ArrowRight size={16} />
                </button>
              ) : (
                <button
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-[#012e67] text-white rounded-xl font-black text-base hover:opacity-90 disabled:opacity-50 transition-all shadow-lg shadow-blue-500/20 w-full sm:w-auto"
                >
                  {isSubmitting ? (
                    <span className="flex items-center gap-2">
                      <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Submitting...
                    </span>
                  ) : (
                    <>
                      GET MY BEST QUOTES <ArrowRight size={18} />
                    </>
                  )}
                </button>
              )}
            </div>
          </motion.div>
        ) : (
          /* SUCCESS SCREEN */
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-lg bg-white rounded-3xl p-8 text-center shadow-2xl relative z-10 border border-slate-100"
          >
            <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner animate-pulse">
              <CheckCircle size={48} className="stroke-[2.5]" />
            </div>

            <h2 className="text-2xl font-black text-slate-800 mb-2">Thank You For Showing Interest</h2>
            <p className="text-slate-500 font-semibold mb-6">
              Your request has been submitted successfully.<br />Our insurance experts will compare the best plans and contact you shortly.
            </p>

            <div className="bg-slate-50 border border-slate-150 rounded-2xl p-4 mb-8 flex flex-col items-center">
              <span className="text-slate-400 font-bold text-xs uppercase tracking-widest">Reference Number</span>
              <span className="font-extrabold text-xl text-[#012e67] mt-1 tracking-wider">{refNumber}</span>
            </div>

            <div className="space-y-3">
              <button 
                onClick={onClose}
                className="w-full bg-[#012e67] text-white font-bold py-3.5 rounded-xl hover:bg-blue-900 transition-colors shadow-lg shadow-blue-900/15"
              >
                Back To Home
              </button>
              <div className="grid grid-cols-2 gap-3">
                <button 
                  onClick={() => alert(`Tracking Lead ID: ${refNumber}`)}
                  className="bg-slate-100 text-slate-700 font-bold py-3 rounded-xl hover:bg-slate-200 transition-colors text-sm"
                >
                  Track Request
                </button>
                <a 
                  href="tel:+917574948768"
                  className="bg-blue-50 text-[#012e67] border border-blue-100 font-bold py-3 rounded-xl hover:bg-blue-100 transition-colors text-sm flex items-center justify-center gap-1.5"
                >
                  Talk To Expert
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MotorLeadModal;
