import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, CheckCircle2, AlertTriangle, Calendar,
  Car, Shield, Phone, Mail, MapPin, User,
  Zap, ArrowRight, Search, RefreshCw,
  Truck, Bike, Bus
} from 'lucide-react';
import { db } from '../utils/db';

const vehicleCategories = [
  { id: 'car', name: 'Private Car', emoji: '🚗' },
  { id: 'bike', name: 'Two Wheeler', emoji: '🏍️' },
  { id: 'rickshaw', name: 'Three Wheeler', emoji: '🛺' },
  { id: 'commercial', name: 'Commercial Vehicle', emoji: '🚚' },
  { id: 'goods', name: 'Goods Carrier', emoji: '🚛' },
  { id: 'bus', name: 'Passenger Vehicle', emoji: '🚌' },
  { id: 'tractor', name: 'Tractor', emoji: '🚜' },
  { id: 'ev', name: 'Electric Vehicle', emoji: '⚡' }
];

const categoryWiseData = {
  car: {
    makes: ['Maruti Suzuki', 'Hyundai', 'Tata Motors', 'Mahindra', 'Honda', 'Toyota', 'Kia', 'MG', 'Renault', 'Nissan', 'Skoda', 'Volkswagen', 'BMW', 'Mercedes-Benz', 'Audi', 'Volvo', 'Jeep', 'Citroen', 'Force Motors (Passenger)', 'Other'],
    models: {
      'Maruti Suzuki': ['Swift', 'Baleno', 'Dzire', 'WagonR', 'Brezza', 'Ertiga', 'Fronx', 'Grand Vitara', 'Alto K10', 'Celerio', 'Ignis', 'XL6', 'Jimny', 'Invicto', 'Other'],
      'Hyundai': ['Creta', 'i20', 'Venue', 'Verna', 'Grand i10 Nios', 'Exter', 'Alcazar', 'Tucson', 'Aura', 'Ioniq 5', 'Other'],
      'Tata Motors': ['Nexon', 'Punch', 'Altroz', 'Tiago', 'Harrier', 'Safari', 'Tigor', 'Curvv', 'Nexon EV', 'Punch EV', 'Other'],
      'Mahindra': ['XUV700', 'Scorpio-N', 'Thar', 'Scorpio Classic', 'XUV300', 'XUV3XO', 'Bolero', 'Bolero Neo', 'XUV400 EV', 'Other'],
      'Honda': ['City', 'Amaze', 'Elevate', 'City e:HEV', 'WR-V', 'Other'],
      'Toyota': ['Innova Crysta', 'Innova Hycross', 'Fortuner', 'Glanza', 'Urban Cruiser Taisor', 'Hilux', 'Camry', 'Other'],
      'Kia': ['Seltos', 'Sonet', 'Carens', 'EV6', 'Other'],
      'MG': ['Hector', 'Astor', 'Comet EV', 'ZSEV', 'Gloster', 'Windsor EV', 'Other'],
      'Renault': ['Kwid', 'Triber', 'Kiger', 'Other'],
      'Nissan': ['Magnite', 'Kicks', 'Other'],
      'Skoda': ['Slavia', 'Kushaq', 'Kodiaq', 'Superb', 'Kylaq', 'Other'],
      'Volkswagen': ['Virtus', 'Taigun', 'Tiguan', 'Other'],
      'BMW': ['3 Series', '5 Series', '7 Series', 'X1', 'X3', 'X5', 'X7', 'i4', 'i7', 'iX', 'Other'],
      'Mercedes-Benz': ['C-Class', 'E-Class', 'S-Class', 'GLA', 'GLC', 'GLE', 'GLS', 'EQE', 'EQS', 'Other'],
      'Audi': ['A4', 'A6', 'Q3', 'Q5', 'Q7', 'Q8', 'e-tron', 'Other'],
      'Volvo': ['XC40 Recharge', 'XC60', 'XC90', 'EX30', 'Other'],
      'Jeep': ['Compass', 'Meridian', 'Wrangler', 'Grand Cherokee', 'Other'],
      'Citroen': ['C3', 'eC3', 'C3 Aircross', 'C5 Aircross', 'Basalt', 'Other'],
      'Other': ['Other']
    }
  },
  bike: {
    makes: ['Hero', 'Honda', 'TVS', 'Bajaj', 'Yamaha', 'Suzuki', 'Royal Enfield', 'KTM', 'Jawa', 'Yezdi', 'Harley-Davidson', 'Triumph', 'Kawasaki', 'BMW Motorrad', 'Ola Electric', 'Ather', 'Revolt', 'Other'],
    models: {
      'Hero': ['Splendor+', 'HF Deluxe', 'Glamour', 'Passion Pro', 'Super Splendor', 'Xpulse 200', 'Pleasure+', 'Xoom', 'Other'],
      'Honda': ['Activa 6G', 'Activa 125', 'Shine', 'SP 125', 'Unicorn', 'CB350', 'Hornet 2.0', 'Dio', 'Other'],
      'TVS': ['Jupiter', 'Apache RTR 160', 'Apache RTR 200', 'Radeon', 'Ntorq 125', 'Raider 125', 'iQube EV', 'Ronin', 'Other'],
      'Bajaj': ['Pulsar 150', 'Pulsar NS200', 'Pulsar N160', 'Platina 100', 'Chetak EV', 'Dominar 400', 'Avenger 220', 'Freedom 125 (CNG)', 'Other'],
      'Yamaha': ['FZ-S FI', 'MT-15 V2', 'R15 V4', 'RayZR 125', 'Fascino 125', 'Other'],
      'Suzuki': ['Access 125', 'Burgman Street', 'Gixxer 150', 'Gixxer SF 250', 'Other'],
      'Royal Enfield': ['Classic 350', 'Hunter 350', 'Bullet 350', 'Meteor 350', 'Himalayan 450', 'Continental GT 650', 'Other'],
      'KTM': ['Duke 200', 'Duke 390', 'RC 200', 'Adventure 390', 'Other'],
      'Ola Electric': ['S1 Pro', 'S1 X', 'S1 Air', 'Other'],
      'Ather': ['450X', '450S', 'Rizta', 'Other'],
      'Other': ['Other']
    }
  },
  rickshaw: {
    makes: ['Bajaj Auto', 'Piaggio', 'Mahindra Electric', 'TVS King', 'Atul Auto', 'Euler Motors', 'Omega Seiki', 'YC Electric', 'Other'],
    models: {
      'Bajaj Auto': ['RE Compact', 'RE Maxima', 'Maxima Z', 'Maxima C', 'Other'],
      'Piaggio': ['Ape City', 'Ape City+', 'Ape Xtra LDX', 'Other'],
      'Mahindra Electric': ['Treo', 'Treo Yaari', 'Zor Grand', 'Alfa DX', 'Other'],
      'TVS King': ['King Deluxe', 'King Duramax', 'King Kargo', 'Other'],
      'Atul Auto': ['Atul Gem', 'Atul Elite', 'Atul RIK', 'Other'],
      'Other': ['Other']
    }
  },
  commercial: {
    makes: ['Tata Motors Commercial', 'Ashok Leyland', 'Eicher Commercial', 'BharatBenz', 'Mahindra Commercial', 'Force Motors', 'SML Isuzu', 'Other'],
    models: {
      'Tata Motors Commercial': ['Mini Truck', 'Ace Gold (Chota Hathi)', 'Intra V30', 'Yodha Pickup', '407 Gold', '709g LPT', '1109g LPT', 'Signa 2823', 'LCV', 'HCV', 'Tipper', 'Trailer', 'Delivery Van', 'Other'],
      'Ashok Leyland': ['Dost+', 'Bada Dost', 'Partner', 'Ecomet Star', 'AVTR 2820', 'Other'],
      'Eicher Commercial': ['Pro 2049', 'Pro 2059', 'Pro 3015', 'Pro 6028', 'Other'],
      'BharatBenz': ['1217C', '1617R', '2823C', '3528C', 'Other'],
      'Mahindra Commercial': ['Bolero Pik-Up', 'Supro Profit Truck', 'Furio 7', 'Blazo X 28', 'Other'],
      'Force Motors': ['Urbania', 'Trax Delivery Van', 'Kargo King', 'Other'],
      'Other': ['Mini Truck', 'Pickup', 'LCV', 'ICV', 'MCV', 'HCV', 'Tipper', 'Trailer', 'Tanker', 'Delivery Van', 'Other']
    }
  },
  goods: {
    makes: ['Tata Motors Commercial', 'Ashok Leyland', 'Eicher', 'BharatBenz', 'Mahindra Commercial', 'Force Motors', 'Other'],
    models: {
      'Tata Motors Commercial': ['Ace Gold', 'Intra V50', '407 LPT', 'Signa Cargo', 'Other'],
      'Ashok Leyland': ['Dost Strong', 'Bada Dost i3', 'Ecomet Goods', 'Other'],
      'Mahindra Commercial': ['Bolero Maxi Truck', 'Supro Cargo', 'Furio 11', 'Other'],
      'Other': ['Cargo Truck', 'Delivery Van', 'Container Truck', 'Refrigerated Truck', 'Pickup Truck', 'Other']
    }
  },
  bus: {
    makes: ['Tata Motors Bus', 'Ashok Leyland', 'Eicher Bus', 'BharatBenz Bus', 'Force Motors', 'SML Isuzu', 'Other'],
    models: {
      'Tata Motors Bus': ['School Bus', 'Staff Bus', 'Tourist Bus', 'Starbus', 'CityRide', 'Other'],
      'Ashok Leyland': ['Lynx Smart', 'Oyster', 'Viking Bus', 'MiTR Bus', 'Other'],
      'Eicher Bus': ['Starline', 'Skyline Pro', 'Pro 2090 Bus', 'Other'],
      'Force Motors': ['Tempo Traveller 3050', 'Traveller Monobus', 'Trax Toofan', 'Other'],
      'Other': ['School Bus', 'Staff Bus', 'Tourist Bus', 'Mini Bus', 'Maxi Cab', 'Tempo Traveller', 'Ambulance', 'City Bus', 'Luxury Coach', 'Other']
    }
  },
  tractor: {
    makes: ['Mahindra Tractor', 'Swaraj', 'Sonalika', 'John Deere', 'New Holland', 'Massey Ferguson', 'Eicher Tractor', 'Escorts Kubota', 'Powertrac', 'Farmtrac', 'Other'],
    models: {
      'Mahindra Tractor': ['575 DI', '275 DI SP Plus', 'Arjun Novo 605', 'Jivo 245 4WD', 'Other'],
      'Swaraj': ['744 FE', '855 FE', '735 FE', 'Other'],
      'Sonalika': ['DI 750 III', 'Sikander DI 745', 'Tiger 55', 'Other'],
      'John Deere': ['5050 D', '5310 Trem IV', 'Other'],
      'Massey Ferguson': ['241 DI Dynatrack', '1035 DI', 'Other'],
      'Other': ['Tractor 35 HP', 'Tractor 45 HP', 'Tractor 50+ HP', 'Other']
    }
  },
  ev: {
    subCategories: ['Electric Car', 'Electric Bike', 'Electric Scooter', 'Electric Auto', 'Electric Bus', 'Electric Commercial'],
    makes: ['Tata EV', 'MG EV', 'BYD India', 'Mahindra EV', 'Hyundai EV', 'Kia EV', 'Ola Electric', 'Ather Energy', 'TVS EV', 'Bajaj Chetak', 'Hero Vida', 'Other EV Brand'],
    models: {
      'Tata EV': ['Nexon EV', 'Punch EV', 'Tiago EV', 'Tigor EV', 'Curvv EV', 'Other'],
      'MG EV': ['Comet EV', 'ZS EV', 'Windsor EV', 'Other'],
      'BYD India': ['Atto 3', 'Seal', 'e6', 'Other'],
      'Ola Electric': ['S1 Pro', 'S1 X', 'S1 Air', 'Other'],
      'Ather Energy': ['450X', '450S', 'Rizta', 'Other'],
      'Other EV Brand': ['Other']
    }
  }
};

const mfgYears = Array.from({ length: 25 }, (_, i) => new Date().getFullYear() - i);
const fuelTypes = ['Petrol', 'Diesel', 'CNG', 'Electric', 'Hybrid'];
const insurerOptions = [
  'HDFC ERGO', 'ICICI Lombard', 'Tata AIG', 'Bajaj Allianz', 
  'Reliance General', 'Go Digit', 'SBI General', 'New India Assurance',
  'Royal Sundaram', 'Star Health', 'Other'
];

const MotorLeadModal = ({ isOpen, onClose, defaultVehicleType = 'car' }) => {
  const [vehicleType, setVehicleType] = useState(defaultVehicleType);
  const [evSubCategory, setEvSubCategory] = useState('Electric Car');
  const [showManualSection, setShowManualSection] = useState(false);
  
  const [fetchStatus, setFetchStatus] = useState('idle'); // 'idle' | 'loading' | 'success' | 'failed'
  const [fetchErrorMessage, setFetchErrorMessage] = useState('');
  
  // Custom manual entries for "Other"
  const [customMake, setCustomMake] = useState('');
  const [customModel, setCustomModel] = useState('');

  // Form State
  const [formData, setFormData] = useState({
    regNo: '',
    ownerName: '',
    mobile: '',
    make: '',
    model: '',
    mfgYear: new Date().getFullYear(),
    fuelType: 'Petrol',
    expiryDate: '',
    currentInsurer: '',
    
    // Optional Contact Info
    email: '',
    city: '',
    pincode: '',
    state: ''
  });

  const [errors, setErrors] = useState({});
  const [pincodeLoading, setPincodeLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [refNumber, setRefNumber] = useState('');

  // Category specific makes
  const availableMakes = useMemo(() => {
    const cat = categoryWiseData[vehicleType] || categoryWiseData.car;
    return cat.makes || [];
  }, [vehicleType]);

  // Category specific models for selected make
  const availableModels = useMemo(() => {
    const cat = categoryWiseData[vehicleType] || categoryWiseData.car;
    const modelDict = cat.models || {};
    return modelDict[formData.make] || modelDict['Other'] || ['Other'];
  }, [vehicleType, formData.make]);

  // Reset modal state on open
  useEffect(() => {
    if (isOpen) {
      setVehicleType(defaultVehicleType);
      setEvSubCategory('Electric Car');
      setShowManualSection(false);
      setFetchStatus('idle');
      setFetchErrorMessage('');
      setCustomMake('');
      setCustomModel('');
      setErrors({});
      setShowSuccessModal(false);
      setFormData({
        regNo: '',
        ownerName: '',
        mobile: '',
        make: '',
        model: '',
        mfgYear: new Date().getFullYear(),
        fuelType: defaultVehicleType === 'ev' ? 'Electric' : 'Petrol',
        expiryDate: '',
        currentInsurer: '',
        email: '',
        city: '',
        pincode: '',
        state: ''
      });
    }
  }, [isOpen, defaultVehicleType]);

  // Handle Vehicle Category Switch
  const handleCategorySwitch = (catId) => {
    setVehicleType(catId);
    setCustomMake('');
    setCustomModel('');
    setFormData(prev => ({
      ...prev,
      make: '',
      model: '',
      fuelType: catId === 'ev' ? 'Electric' : 'Petrol'
    }));
  };

  // Pincode auto-lookup (Optional field)
  useEffect(() => {
    const fetchPincode = async () => {
      if (formData.pincode && formData.pincode.length === 6) {
        setPincodeLoading(true);
        try {
          const res = await fetch(`https://api.postalpincode.in/pincode/${formData.pincode}`);
          const data = await res.json();
          if (data[0]?.Status === 'Success' && data[0]?.PostOffice?.length > 0) {
            const po = data[0].PostOffice[0];
            setFormData(prev => ({
              ...prev,
              city: po.Block || po.Division || po.District,
              state: po.State
            }));
          }
        } catch (err) {
          console.error('Pincode fetch error:', err);
        } finally {
          setPincodeLoading(false);
        }
      }
    };
    fetchPincode();
  }, [formData.pincode]);

  // Validate required initial details before searching Vahan
  const validateBeforeSearch = () => {
    const newErrors = {};
    const cleanReg = formData.regNo.replace(/[^a-zA-Z0-9]/g, '').toUpperCase();

    if (!cleanReg || cleanReg.length < 5) {
      newErrors.regNo = 'Enter valid vehicle registration number (e.g. GJ01AB1234)';
    }

    if (!formData.ownerName || !formData.ownerName.trim()) {
      newErrors.ownerName = 'Full Name is required';
    }

    if (!formData.mobile) {
      newErrors.mobile = 'Mobile Number is required';
    } else if (!/^[6-9]\d{9}$/.test(formData.mobile)) {
      newErrors.mobile = 'Enter valid 10-digit mobile number';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Search Vahan API after Reg No, Name & Mobile are entered
  const handleSearchVahan = async () => {
    if (!validateBeforeSearch()) return;

    const cleanReg = formData.regNo.replace(/[^a-zA-Z0-9]/g, '').toUpperCase();
    setFetchStatus('loading');
    setFetchErrorMessage('');

    try {
      const res = await fetch('/api/rc-lookup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ vehicleNumber: cleanReg })
      });
      
      const result = await res.json();

      if (result.success && result.data && (result.data.make || result.data.model)) {
        const v = result.data;
        setFormData(prev => ({
          ...prev,
          regNo: cleanReg,
          ownerName: prev.ownerName || v.ownerName || 'Registered Owner',
          make: v.make || prev.make,
          model: v.model || prev.model,
          fuelType: v.fuelType || prev.fuelType,
          mfgYear: v.mfgYear || prev.mfgYear,
          currentInsurer: v.currentInsurer || prev.currentInsurer,
          expiryDate: v.expiryDate || prev.expiryDate
        }));
        setFetchStatus('success');
      } else {
        setFetchStatus('failed');
        setFetchErrorMessage(result.error || 'Vehicle details not found in Vahan database.');
        setShowManualSection(true);
      }
    } catch (err) {
      console.error('Vahan Search Error:', err);
      setFetchStatus('failed');
      setFetchErrorMessage('Unable to fetch vehicle details automatically.');
      setShowManualSection(true);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    if (name === 'make') {
      setCustomMake('');
      setCustomModel('');
      setFormData(prev => ({ ...prev, make: value, model: '' }));
    } else if (name === 'model') {
      setCustomModel('');
      setFormData(prev => ({ ...prev, model: value }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }

    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  // Validate form before submit
  const validateForm = () => {
    const newErrors = {};

    if (!formData.regNo) {
      newErrors.regNo = 'Vehicle Registration Number is required';
    }

    if (!formData.ownerName || !formData.ownerName.trim()) {
      newErrors.ownerName = 'Full Name is required';
    }

    if (!formData.mobile) {
      newErrors.mobile = 'Mobile Number is required';
    } else if (!/^[6-9]\d{9}$/.test(formData.mobile)) {
      newErrors.mobile = 'Enter valid 10-digit mobile number';
    }

    // Make is compulsory (*), Model is optional
    if (showManualSection || fetchStatus !== 'success') {
      if (!formData.make) {
        newErrors.make = 'Vehicle Make (Manufacturer) is required';
      } else if (formData.make === 'Other' && !customMake) {
        newErrors.customMake = 'Please enter your vehicle brand name';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Submit Lead
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    const generatedRef = `MOT-${Math.floor(100000 + Math.random() * 900000)}`;
    setRefNumber(generatedRef);

    const finalMake = formData.make === 'Other' ? customMake : formData.make;
    const finalModel = formData.model === 'Other' ? customModel : formData.model;

    const leadPayload = {
      refNumber: generatedRef,
      type: 'Motor Insurance',
      vehicleCategory: vehicleType === 'ev' ? `Electric Vehicle (${evSubCategory})` : vehicleType,
      registrationNumber: formData.regNo.toUpperCase(),
      ownerName: formData.ownerName,
      make: finalMake,
      model: finalModel,
      mfgYear: formData.mfgYear,
      fuelType: formData.fuelType,
      currentInsurer: formData.currentInsurer,
      expiryDate: formData.expiryDate,
      customerName: formData.ownerName || 'Valued Customer',
      mobile: formData.mobile,
      email: formData.email,
      city: formData.city,
      pincode: formData.pincode,
      state: formData.state,
      fetchedViaVahan: fetchStatus === 'success',
      createdAt: new Date().toISOString()
    };

    try {
      db.addMotorLead(leadPayload);
      await fetch('/api/send-lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(leadPayload)
      }).catch(() => {});
    } catch (err) {
      console.error('Lead Save Error:', err);
    } finally {
      setIsSubmitting(false);
      setShowSuccessModal(true);
    }
  };

  const handleResetAndNewQuote = () => {
    setShowSuccessModal(false);
    setFetchStatus('idle');
    setShowManualSection(false);
    setCustomMake('');
    setCustomModel('');
    setFormData({
      regNo: '',
      ownerName: '',
      mobile: '',
      make: '',
      model: '',
      mfgYear: new Date().getFullYear(),
      fuelType: 'Petrol',
      expiryDate: '',
      currentInsurer: '',
      email: '',
      city: '',
      pincode: '',
      state: ''
    });
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-3 sm:p-6 bg-slate-950/75 backdrop-blur-md">
        
        {/* MODAL CONTAINER */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.96, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 15 }}
          className="relative w-full max-w-xl bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-100 flex flex-col max-h-[92vh]"
        >
          
          {/* POPUP HEADER */}
          <div className="bg-gradient-to-r from-[#012e67] via-[#024394] to-[#012e67] text-white px-6 py-5 relative flex-shrink-0">
            <div className="pr-10">
              <h2 className="text-xl sm:text-2xl font-black tracking-tight text-white">
                Get Motor Insurance Quote
              </h2>
              <p className="text-slate-200 text-xs sm:text-sm font-medium mt-1 leading-relaxed">
                Enter registration, name, and mobile number to search vehicle details and get quotes.
              </p>
            </div>
            
            <button 
              onClick={onClose}
              className="absolute top-5 right-5 w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-all"
            >
              <X size={18} />
            </button>
          </div>

          {/* SCROLLABLE BODY */}
          <div className="flex-grow overflow-y-auto p-5 sm:p-6 space-y-5">
            
            {/* REQUIRED INITIAL FORM: REG NO + NAME + MOBILE */}
            <div className="bg-slate-50 border border-slate-200/80 p-5 rounded-2xl shadow-xs space-y-3.5">
              <div className="flex justify-between items-center">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                  <Car size={15} className="text-[#012e67]" /> Quote Details (Required to Search)
                </label>
              </div>

              {/* 1. Vehicle Registration Number */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">🚗 Vehicle Registration Number *</label>
                <div className="relative">
                  <div className="absolute left-3 top-1/2 -translate-y-1/2 px-2 py-0.5 bg-amber-400 text-slate-950 font-black text-[10px] rounded shadow-xs">
                    IND
                  </div>
                  <input 
                    type="text"
                    name="regNo"
                    placeholder="e.g. GJ01AB1234"
                    value={formData.regNo}
                    onChange={(e) => {
                      const val = e.target.value.toUpperCase();
                      setFormData(p => ({ ...p, regNo: val }));
                      if (errors.regNo) setErrors(p => ({ ...p, regNo: '' }));
                    }}
                    className="w-full pl-16 pr-4 py-2.5 bg-white border border-slate-300 rounded-xl text-slate-900 font-bold text-xs uppercase outline-none focus:ring-2 focus:ring-[#012e67] transition-all placeholder:text-slate-400 placeholder:normal-case"
                  />
                </div>
                {errors.regNo && <p className="text-red-500 text-[11px] font-bold mt-1">{errors.regNo}</p>}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* 2. Customer Full Name */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">👤 Full Name *</label>
                  <input 
                    type="text"
                    name="ownerName"
                    placeholder="e.g. Rahul Sharma"
                    value={formData.ownerName}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-300 bg-white font-bold text-xs text-slate-800 outline-none focus:ring-2 focus:ring-[#012e67]"
                  />
                  {errors.ownerName && <p className="text-red-500 text-[11px] font-bold mt-1">{errors.ownerName}</p>}
                </div>

                {/* 3. Mobile Number */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">📱 Mobile Number *</label>
                  <input 
                    type="tel"
                    name="mobile"
                    maxLength={10}
                    placeholder="10-digit mobile number"
                    value={formData.mobile}
                    onChange={(e) => {
                      const val = e.target.value.replace(/\D/g, '');
                      setFormData(p => ({ ...p, mobile: val }));
                      if (errors.mobile) setErrors(p => ({ ...p, mobile: '' }));
                    }}
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-300 bg-white font-bold text-xs text-slate-800 outline-none focus:ring-2 focus:ring-[#012e67]"
                  />
                  {errors.mobile && <p className="text-red-500 text-[11px] font-bold mt-1">{errors.mobile}</p>}
                </div>
              </div>

              {/* SEARCH BUTTON */}
              <div className="pt-1">
                <button
                  type="button"
                  onClick={handleSearchVahan}
                  disabled={fetchStatus === 'loading'}
                  className="w-full py-3 bg-[#012e67] hover:bg-[#012452] text-white font-bold rounded-xl text-xs uppercase tracking-wider transition-all disabled:opacity-50 shadow-md flex items-center justify-center gap-2 cursor-pointer"
                >
                  {fetchStatus === 'loading' ? (
                    <>
                      <RefreshCw size={15} className="animate-spin text-teal-300" />
                      Searching Vahan...
                    </>
                  ) : (
                    <>
                      <Search size={15} />
                      Search Vehicle Details
                    </>
                  )}
                </button>
              </div>

              {/* ENTER DETAILS MANUALLY BUTTON */}
              {!showManualSection && (
                <div className="text-center pt-1">
                  <button
                    type="button"
                    onClick={() => setShowManualSection(true)}
                    className="text-xs font-bold text-[#012e67] hover:underline inline-flex items-center gap-1 cursor-pointer py-1"
                  >
                    Or Enter Details Manually ➔
                  </button>
                </div>
              )}
            </div>

            {/* IF VAHAN DETAILS SUCCESSFULLY FETCHED */}
            {fetchStatus === 'success' && (
              <motion.div 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-emerald-50/80 border border-emerald-200 p-4 rounded-2xl shadow-xs space-y-2.5"
              >
                <div className="flex items-center gap-2 text-emerald-800 font-bold text-xs">
                  <CheckCircle2 size={17} className="text-emerald-600" />
                  <span>✓ Vehicle details fetched successfully</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs bg-white p-3.5 rounded-xl border border-emerald-100">
                  <div>
                    <span className="text-slate-400 block font-semibold">👤 Customer Name</span>
                    <span className="text-slate-800 font-bold">{formData.ownerName}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block font-semibold">🚗 Make</span>
                    <span className="text-slate-800 font-bold">{formData.make}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block font-semibold">🚘 Model</span>
                    <span className="text-slate-800 font-bold">{formData.model}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block font-semibold">🛡 Insurer</span>
                    <span className="text-slate-800 font-bold">{formData.currentInsurer || 'Not Specified'}</span>
                  </div>
                </div>
              </motion.div>
            )}

            {/* IF SEARCH FAILS */}
            {fetchStatus === 'failed' && (
              <motion.div 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-amber-50 border border-amber-200 p-3.5 rounded-xl text-amber-900 text-xs font-medium space-y-1"
              >
                <div className="flex items-center gap-2 font-bold text-amber-800">
                  <AlertTriangle size={15} className="text-amber-600" />
                  <span>⚠️ Vehicle details not found.</span>
                </div>
                <p className="text-amber-800/90 pl-5 text-[11px]">
                  Please enter vehicle details manually below.
                </p>
              </motion.div>
            )}

            {/* MANUAL VEHICLE DETAILS SECTION */}
            {showManualSection && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="space-y-4 border-t border-slate-100 pt-4"
              >
                <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                  <Car size={15} className="text-[#012e67]" /> Manual Vehicle Details
                </h3>

                {/* VEHICLE CATEGORY CARDS */}
                <div>
                  <label className="block text-[11px] font-semibold text-slate-500 mb-2">Select Vehicle Category</label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {vehicleCategories.map((cat) => {
                      const isSelected = vehicleType === cat.id;
                      return (
                        <div
                          key={cat.id}
                          onClick={() => handleCategorySwitch(cat.id)}
                          className={`p-2.5 rounded-xl border cursor-pointer transition-all flex flex-col items-center justify-center text-center relative ${
                            isSelected 
                              ? 'border-[#012e67] bg-blue-50/80 text-[#012e67] font-bold shadow-xs' 
                              : 'border-slate-200 bg-slate-50/50 hover:bg-slate-100 text-slate-700'
                          }`}
                        >
                          <span className="text-lg mb-0.5">{cat.emoji}</span>
                          <span className="text-[11px] font-bold leading-tight">{cat.name}</span>
                          {isSelected && (
                            <div className="absolute top-1 right-1 w-3.5 h-3.5 rounded-full bg-[#012e67] text-white flex items-center justify-center text-[9px]">
                              ✓
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* EV SUB-CATEGORY SELECTOR */}
                {vehicleType === 'ev' && (
                  <div className="p-3 bg-teal-50/60 border border-teal-200 rounded-xl space-y-1.5">
                    <label className="block text-[11px] font-bold text-teal-900 uppercase">EV Category</label>
                    <div className="flex flex-wrap gap-1.5">
                      {categoryWiseData.ev.subCategories.map(sub => (
                        <button
                          key={sub}
                          type="button"
                          onClick={() => setEvSubCategory(sub)}
                          className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all border ${
                            evSubCategory === sub 
                              ? 'bg-teal-700 text-white border-teal-700' 
                              : 'bg-white text-teal-900 border-teal-200 hover:bg-teal-100/50'
                          }`}
                        >
                          {sub}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* DYNAMIC MAKE & MODEL DROPDOWNS */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  {/* Vehicle Make (Compulsory *) */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Vehicle Make *</label>
                    <select
                      name="make"
                      value={formData.make}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:ring-2 focus:ring-[#012e67] outline-none bg-slate-50 font-bold text-xs text-slate-800"
                    >
                      <option value="">Select Manufacturer</option>
                      {availableMakes.map(m => <option key={m} value={m}>{m}</option>)}
                    </select>
                    {errors.make && <p className="text-red-500 text-[11px] mt-1 font-bold">{errors.make}</p>}
                  </div>

                  {/* CUSTOM MAKE INPUT (IF "OTHER" IS SELECTED) */}
                  {formData.make === 'Other' && (
                    <div className="col-span-1 sm:col-span-2">
                      <label className="block text-xs font-bold text-slate-700 mb-1">Enter Vehicle Brand Name *</label>
                      <input 
                        type="text"
                        placeholder="Type manufacturer name"
                        value={customMake}
                        onChange={(e) => {
                          setCustomMake(e.target.value);
                          if (errors.customMake) setErrors(p => ({ ...p, customMake: '' }));
                        }}
                        className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:ring-2 focus:ring-[#012e67] outline-none bg-white font-bold text-xs text-slate-800"
                      />
                      {errors.customMake && <p className="text-red-500 text-[11px] mt-1 font-bold">{errors.customMake}</p>}
                    </div>
                  )}

                  {/* Vehicle Model (Optional) */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Vehicle Model (Optional)</label>
                    <select
                      name="model"
                      value={formData.model}
                      onChange={handleInputChange}
                      disabled={!formData.make}
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:ring-2 focus:ring-[#012e67] outline-none bg-slate-50 font-bold text-xs text-slate-800 disabled:opacity-50"
                    >
                      <option value="">{formData.make ? 'Select Model' : 'Select Make First'}</option>
                      {availableModels.map(mod => <option key={mod} value={mod}>{mod}</option>)}
                    </select>
                  </div>

                  {/* CUSTOM MODEL INPUT (IF "OTHER" IS SELECTED) */}
                  {formData.model === 'Other' && (
                    <div className="col-span-1 sm:col-span-2">
                      <label className="block text-xs font-bold text-slate-700 mb-1">Enter Model Name</label>
                      <input 
                        type="text"
                        placeholder="Type vehicle model name"
                        value={customModel}
                        onChange={(e) => setCustomModel(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:ring-2 focus:ring-[#012e67] outline-none bg-white font-bold text-xs text-slate-800"
                      />
                    </div>
                  )}

                  {/* Manufacturing Year */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Manufacturing Year</label>
                    <select
                      name="mfgYear"
                      value={formData.mfgYear}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:ring-2 focus:ring-[#012e67] outline-none bg-slate-50 text-xs text-slate-800 font-medium"
                    >
                      {mfgYears.map(yr => <option key={yr} value={yr}>{yr}</option>)}
                    </select>
                  </div>

                  {/* Fuel Type */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Fuel Type</label>
                    <select
                      name="fuelType"
                      value={formData.fuelType}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:ring-2 focus:ring-[#012e67] outline-none bg-slate-50 text-xs text-slate-800 font-medium"
                    >
                      {fuelTypes.map(f => <option key={f} value={f}>{f}</option>)}
                    </select>
                  </div>

                  {/* Previous Insurer */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Previous Insurance Company</label>
                    <select
                      name="currentInsurer"
                      value={formData.currentInsurer}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:ring-2 focus:ring-[#012e67] outline-none bg-slate-50 text-xs text-slate-800 font-medium"
                    >
                      <option value="">Select Insurer</option>
                      {insurerOptions.map(ins => <option key={ins} value={ins}>{ins}</option>)}
                    </select>
                  </div>

                  {/* Insurance Expiry Date */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Insurance Expiry Date</label>
                    <input 
                      type="date"
                      name="expiryDate"
                      value={formData.expiryDate}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:ring-2 focus:ring-[#012e67] outline-none bg-slate-50 text-xs text-slate-800 font-medium"
                    />
                  </div>
                </div>
              </motion.div>
            )}

            {/* OPTIONAL ADDITIONAL CONTACT INFORMATION */}
            <div className="bg-blue-50/30 border border-blue-100 p-4 rounded-2xl space-y-3">
              <h3 className="text-xs font-bold text-[#012e67] uppercase tracking-wider flex items-center gap-1.5">
                <User size={15} /> Additional Information (Optional)
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {/* Email Address (Optional) */}
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">📧 Email Address</label>
                  <input 
                    type="email"
                    name="email"
                    placeholder="name@example.com"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:ring-2 focus:ring-[#012e67] outline-none bg-white text-xs text-slate-800 font-medium"
                  />
                </div>

                {/* PIN Code (Optional) */}
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1 flex items-center justify-between">
                    <span>📍 PIN Code</span>
                    {pincodeLoading && <span className="text-[10px] text-blue-600 font-semibold animate-pulse">Fetching...</span>}
                  </label>
                  <input 
                    type="text"
                    name="pincode"
                    maxLength={6}
                    placeholder="6-digit PIN code"
                    value={formData.pincode}
                    onChange={(e) => {
                      const val = e.target.value.replace(/\D/g, '');
                      setFormData(p => ({ ...p, pincode: val }));
                    }}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:ring-2 focus:ring-[#012e67] outline-none bg-white text-xs text-slate-800 font-medium"
                  />
                </div>

                {/* City (Optional) */}
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">🏙 City</label>
                  <input 
                    type="text"
                    name="city"
                    placeholder="Enter city"
                    value={formData.city}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:ring-2 focus:ring-[#012e67] outline-none bg-white text-xs text-slate-800 font-medium"
                  />
                </div>
              </div>
            </div>

            {/* SUBMIT BUTTON */}
            <div className="pt-1">
              <button
                type="button"
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="w-full py-3.5 bg-gradient-to-r from-[#012e67] via-[#024394] to-[#012e67] hover:brightness-110 text-white font-black rounded-xl text-sm uppercase tracking-wider transition-all shadow-lg shadow-blue-900/20 flex items-center justify-center gap-2 cursor-pointer active:scale-[0.99]"
              >
                {isSubmitting ? (
                  <>
                    <RefreshCw size={17} className="animate-spin text-teal-300" />
                    Submitting...
                  </>
                ) : (
                  <>
                    Submit <ArrowRight size={17} />
                  </>
                )}
              </button>
            </div>

          </div>

        </motion.div>

        {/* SUCCESS POPUP MODAL */}
        <AnimatePresence>
          {showSuccessModal && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-lg"
            >
              <motion.div 
                initial={{ scale: 0.8, y: 30 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.8, y: 30 }}
                className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full text-center shadow-2xl border border-slate-100 space-y-4"
              >
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-inner">
                  <CheckCircle2 size={36} />
                </div>

                <div>
                  <span className="px-3 py-1 rounded-full bg-slate-100 text-slate-600 text-[11px] font-mono font-bold inline-block mb-2">
                    Reference ID: #{refNumber}
                  </span>
                  <h3 className="text-xl sm:text-2xl font-black text-slate-900">
                    Thank You for Showing Interest!
                  </h3>
                  <p className="text-xs sm:text-sm font-bold text-emerald-700 mt-1">
                    Your request has been submitted successfully.
                  </p>
                </div>

                <p className="text-xs sm:text-sm text-slate-600 font-medium leading-relaxed bg-slate-50 p-4 rounded-2xl border border-slate-100">
                  Our PolicyPerfect insurance advisor will contact you shortly with the best available insurance quote.
                </p>

                <div className="flex flex-col sm:flex-row gap-2.5 pt-2">
                  <button
                    onClick={onClose}
                    className="flex-1 py-3 px-4 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl text-xs uppercase tracking-wider transition-all cursor-pointer"
                  >
                    Close
                  </button>
                  <button
                    onClick={handleResetAndNewQuote}
                    className="flex-1 py-3 px-4 bg-[#012e67] hover:bg-[#012452] text-white font-bold rounded-xl text-xs uppercase tracking-wider transition-all shadow-md shadow-blue-900/20 cursor-pointer"
                  >
                    Get Another Quote
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </AnimatePresence>
  );
};

export default MotorLeadModal;
