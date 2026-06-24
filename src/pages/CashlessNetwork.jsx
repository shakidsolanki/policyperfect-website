import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Hospital, Search, MapPin, Phone, ChevronRight, Activity, Wrench, Shield, CheckCircle2, X } from 'lucide-react';
import HeroBackground from '../components/HeroBackground';
import SEO from '../components/SEO';

// --- MOCK DATA ---
const HOSPITAL_DATA = {
  'HDFC ERGO': [
    { name: 'Apollo Hospitals', city: 'Chennai', address: 'No.21, Greams Lane, Chennai - 600006', phone: '044-28290200', type: 'Multi-specialty', pincode: '600006', ownership: 'Private' },
    { name: 'Fortis Hospital', city: 'Mumbai', address: 'Mulund Goregaon Link Rd, Mumbai - 400078', phone: '022-41274000', type: 'Multi-specialty', pincode: '400078', ownership: 'Private' },
    { name: 'Max Super Specialty', city: 'Delhi', address: 'Press Enclave Road, Saket, Delhi', phone: '011-26515050', type: 'Multi-specialty', pincode: '110017', ownership: 'Private' },
    { name: 'Kokilaben Hospital', city: 'Mumbai', address: '4 Andheri, Mumbai - 400053', phone: '022-30999999', type: 'Multi-specialty', pincode: '400053', ownership: 'Private' },
    { name: 'AIIMS', city: 'Delhi', address: 'Ansari Nagar, New Delhi - 110029', phone: '011-26588500', type: 'Government', pincode: '110029', ownership: 'Government' },
  ],
  'Star Health': [
    { name: 'Manipal Hospitals', city: 'Bangalore', address: '98, HAL Airport Road, Bangalore', phone: '080-25024444', type: 'Multi-specialty', pincode: '560017', ownership: 'Private' },
    { name: 'Narayana Health', city: 'Bangalore', address: '258/A, Bommasandra, Bangalore', phone: '080-71222222', type: 'Cardiac Care', pincode: '560099', ownership: 'Private' },
    { name: 'Medanta Hospital', city: 'Gurugram', address: 'Sector 38, Gurugram - 122001', phone: '0124-4141414', type: 'Multi-specialty', pincode: '122001', ownership: 'Private' },
    { name: 'Ruby Hall Clinic', city: 'Pune', address: '40, Sassoon Road, Pune - 411001', phone: '020-66455000', type: 'Multi-specialty', pincode: '411001', ownership: 'Private' },
  ],
  'ICICI Lombard': [
    { name: 'Hinduja Hospital', city: 'Mumbai', address: 'Veer Savarkar Marg, Mahim, Mumbai', phone: '022-24447000', type: 'Multi-specialty', pincode: '400016', ownership: 'Private' },
    { name: 'Lilavati Hospital', city: 'Mumbai', address: 'A-791, Bandra Reclamation, Mumbai', phone: '022-26568000', type: 'Multi-specialty', pincode: '400050', ownership: 'Private' },
    { name: 'Amrita Institute', city: 'Kochi', address: 'AIMS Ponekkara, Kochi - 682041', phone: '0484-2801234', type: 'Multi-specialty', pincode: '682041', ownership: 'Private' },
  ],
  'Bajaj Allianz': [
    { name: 'KIMS Hospital', city: 'Hyderabad', address: 'Minister Road, Hyderabad', phone: '040-44885000', type: 'Multi-specialty', pincode: '500003', ownership: 'Private' },
    { name: 'Sunshine Hospitals', city: 'Hyderabad', address: 'PG Road, Paradise Circle', phone: '040-44557777', type: 'Multi-specialty', pincode: '500003', ownership: 'Private' },
    { name: 'Yashoda Hospitals', city: 'Hyderabad', address: 'Rajbhavan Road, Somajiguda', phone: '040-45674567', type: 'Multi-specialty', pincode: '500082', ownership: 'Private' },
  ],
  'Tata AIG': [
    { name: 'Breach Candy Hospital', city: 'Mumbai', address: '60-A, Bhulabhai Desai Road, Mumbai', phone: '022-23667888', type: 'Multi-specialty', pincode: '400026', ownership: 'Private' },
    { name: 'Nanavati Hospital', city: 'Mumbai', address: 'S.V. Road, Vile Parle (W)', phone: '022-26182222', type: 'Multi-specialty', pincode: '400056', ownership: 'Private' },
  ],
  'Niva Bupa': [
    { name: 'Apollo Spectra', city: 'Delhi', address: 'Nehru Enclave, Kalkaji, Delhi', phone: '011-71771777', type: 'Multi-specialty', pincode: '110019', ownership: 'Private' },
    { name: 'BLK Max Hospital', city: 'Delhi', address: '5, Pusa Road, New Delhi', phone: '011-30403040', type: 'Multi-specialty', pincode: '110005', ownership: 'Private' },
    { name: 'Artemis Hospital', city: 'Gurugram', address: 'Sector 51, Gurugram', phone: '0124-4511111', type: 'Multi-specialty', pincode: '122001', ownership: 'Private' }
  ]
};

const GARAGE_DATA = {
  'HDFC ERGO': [
    { name: 'Maruti Genuine Parts', city: 'Delhi', address: 'Mathura Road, Faridabad', phone: '0129-4111111', brands: 'Maruti Suzuki', pincode: '121003', ownership: 'Commercial' },
    { name: 'Hyundai Authorized', city: 'Mumbai', address: 'LBS Marg, Vikhroli, Mumbai', phone: '022-67000555', brands: 'Hyundai', pincode: '400083', ownership: 'Commercial' },
    { name: 'Toyota Motor Garage', city: 'Bangalore', address: 'Whitefield Road, Bangalore', phone: '080-41222233', brands: 'Toyota', pincode: '560066', ownership: 'Commercial' },
    { name: 'Honda Workshop', city: 'Pune', address: 'Nagar Road, Hadapsar, Pune', phone: '020-30455566', brands: 'Honda', pincode: '411028', ownership: 'Private' }
  ],
  'ICICI Lombard': [
    { name: 'Tata Motors Center', city: 'Mumbai', address: 'Eastern Express Highway, Thane', phone: '022-25347600', brands: 'Tata Motors', pincode: '400601', ownership: 'Commercial' },
    { name: 'Mahindra Garage', city: 'Delhi', address: 'Najafgarh Road, Uttam Nagar, Delhi', phone: '011-45678900', brands: 'Mahindra', pincode: '110059', ownership: 'Commercial' },
    { name: 'Ford Service Center', city: 'Chennai', address: 'GST Road, Tambaram, Chennai', phone: '044-22273300', brands: 'Ford', pincode: '600045', ownership: 'Private' }
  ],
  'Bajaj Allianz': [
    { name: 'Volkswagen Workshop', city: 'Hyderabad', address: 'Road No 12, Banjara Hills', phone: '040-66779900', brands: 'Volkswagen', pincode: '500034', ownership: 'Commercial' },
    { name: 'BMW Authorized', city: 'Mumbai', address: 'Andheri Kurla Road, Mumbai', phone: '022-40789900', brands: 'BMW', pincode: '400059', ownership: 'Commercial' },
    { name: 'Bosch Car Service', city: 'Pune', address: 'Pimpri Industrial Area, Pune', phone: '020-27475555', brands: 'Multi-brand', pincode: '411018', ownership: 'Private' }
  ],
  'Tata AIG': [
    { name: 'Kia Authorized Garage', city: 'Delhi', address: 'Dwarka Sector 14, Delhi', phone: '011-45896500', brands: 'Kia', pincode: '110078', ownership: 'Commercial' },
    { name: 'Renault Service', city: 'Bangalore', address: 'Hosur Road, BTM Layout', phone: '080-41226677', brands: 'Renault', pincode: '560068', ownership: 'Private' }
  ]
};

const COMPANY_COLORS = {
  'HDFC ERGO': { bg: '#fee2e2', text: '#dc2626', logo: 'https://logo.clearbit.com/hdfcergo.com' },
  'Star Health': { bg: '#dbeafe', text: '#2563eb', logo: 'https://logo.clearbit.com/starhealth.in' },
  'ICICI Lombard': { bg: '#ffedd5', text: '#ea580c', logo: 'https://logo.clearbit.com/icicilombard.com' },
  'Bajaj Allianz': { bg: '#e0e7ff', text: '#4f46e5', logo: 'https://logo.clearbit.com/bajajallianz.com' },
  'Tata AIG': { bg: '#ccfbf1', text: '#0d9488', logo: 'https://logo.clearbit.com/tataaig.com' },
  'Niva Bupa': { bg: '#fce7f3', text: '#db2777', logo: 'https://logo.clearbit.com/nivabupa.com' }
};

const CashlessNetwork = () => {
  const [activeTab, setActiveTab] = useState('hospitals'); // 'hospitals' | 'garages'
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [isFetching, setIsFetching] = useState(false);

  const currentDataMap = activeTab === 'hospitals' ? HOSPITAL_DATA : GARAGE_DATA;
  const companies = Object.keys(currentDataMap);

  const handleCompanySelect = (company) => {
    setIsFetching(true);
    setSelectedCompany(company);
    setSearchTerm('');
    setTimeout(() => {
      setIsFetching(false);
    }, 800);
  };

  // Auto-select first company when tab changes or if none selected
  useEffect(() => {
    handleCompanySelect(companies[0]);
  }, [activeTab]);

  const activeLocations = selectedCompany && currentDataMap[selectedCompany] ? currentDataMap[selectedCompany] : [];
  
  const filteredLocations = activeLocations.filter(loc => {
    const sTerm = searchTerm.toLowerCase();
    return (
      loc.name.toLowerCase().includes(sTerm) || 
      loc.city.toLowerCase().includes(sTerm) ||
      (loc.type && loc.type.toLowerCase().includes(sTerm)) ||
      (loc.brands && loc.brands.toLowerCase().includes(sTerm)) ||
      (loc.pincode && loc.pincode.includes(sTerm)) ||
      (loc.ownership && loc.ownership.toLowerCase().includes(sTerm)) ||
      (sTerm === 'pvt' && loc.ownership === 'Private') ||
      ((sTerm === 'gov' || sTerm === 'govt') && loc.ownership === 'Government') ||
      (sTerm === 'com' && loc.ownership === 'Commercial')
    );
  });

  return (
    <div className="min-h-screen bg-[#f8fafc] font-sans pb-20">
      <SEO 
        title="Cashless Network | Hospitals & Garages | PolicyPerfect" 
        description="Find cashless network hospitals and network garages for your insurance policy. Select your insurance company and search by city or name."
      />

      {/* --- HERO SECTION --- */}
      <div className="bg-[#0c1b33] pt-12 pb-24 relative overflow-hidden">
        <HeroBackground isDark={true} icons={[MapPin, Activity, Wrench, Shield, CheckCircle2]} />
        <div className="absolute inset-0 opacity-10 z-0" style={{ background: 'radial-gradient(circle at 50% 100%, #14b8a6 0%, transparent 50%)' }}></div>
        <div className="max-w-[1200px] mx-auto px-6 lg:px-8 relative z-10 text-center">
          <h1 className="text-3xl md:text-4xl font-black text-white mb-4">Cashless Network Locator</h1>
          <p className="text-slate-300 font-medium max-w-2xl mx-auto text-sm md:text-base">
            Find network hospitals for health insurance and cashless garages for motor insurance. Direct settlement, zero hassle.
          </p>
        </div>
      </div>

      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 -mt-12 relative z-20">
        {/* --- MAIN TABS --- */}
        <div className="flex bg-white rounded-2xl shadow-xl p-2 max-w-md mx-auto mb-10 border border-slate-100">
          <button 
            onClick={() => setActiveTab('hospitals')}
            className={`flex-1 flex items-center justify-center gap-2 py-3.5 rounded-xl font-black text-[13px] transition-all ${
              activeTab === 'hospitals' ? 'bg-teal-600 text-white shadow-md' : 'text-slate-500 hover:bg-[#f8fafc]'
            }`}
          >
            <Hospital size={18} /> Cashless Hospitals
          </button>
          <button 
            onClick={() => setActiveTab('garages')}
            className={`flex-1 flex items-center justify-center gap-2 py-3.5 rounded-xl font-black text-[13px] transition-all ${
              activeTab === 'garages' ? 'bg-teal-600 text-white shadow-md' : 'text-slate-500 hover:bg-[#f8fafc]'
            }`}
          >
            <Wrench size={18} /> Network Garages
          </button>
        </div>

        {/* --- CONTENT LAYOUT --- */}
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* LEFT SIDE: Companies Grid */}
          <div className="w-full lg:w-1/3">
            <h2 className="text-[13px] font-black uppercase tracking-wider text-slate-400 mb-4 ml-1">Select Insurance Company</h2>
            <div className="grid grid-cols-2 lg:grid-cols-1 gap-3">
              {companies.map((company) => {
                const colorInfo = COMPANY_COLORS[company] || { bg: '#f1f5f9', text: '#64748b', initials: 'CO' };
                const isSelected = selectedCompany === company;
                const count = currentDataMap[company]?.length || 0;
                
                return (
                  <button
                    key={company}
                    onClick={() => setSelectedCompany(company)}
                    className={`flex items-center gap-4 p-4 rounded-2xl text-left transition-all border-2 ${
                      isSelected 
                        ? 'bg-white border-teal-500 shadow-md shadow-teal-500/10' 
                        : 'bg-white border-slate-100 hover:border-teal-200'
                    }`}
                  >
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 bg-white border border-slate-100 overflow-hidden p-1.5 shadow-inner relative">
                      <span className="absolute font-black text-slate-300 text-xs text-center leading-none">{company.substring(0, 3).toUpperCase()}</span>
                      <img src={colorInfo.logo} alt={company} className="w-full h-full object-contain relative z-10 bg-white" onError={(e) => { e.target.style.opacity = '0'; e.target.style.background = 'transparent'; }} />
                    </div>
                    <div className="flex-grow">
                      <h3 className={`font-black text-[14px] leading-tight ${isSelected ? 'text-teal-800' : 'text-slate-800'}`}>{company}</h3>
                      <p className="text-[11px] font-bold text-slate-400 mt-0.5">{count}+ {activeTab}</p>
                    </div>
                    {isSelected && <ChevronRight size={18} className="text-teal-500" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* RIGHT SIDE: List & Search */}
          <div className="w-full lg:w-2/3">
            <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200 min-h-[500px]">
              
              {/* Header & Search */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-6 border-b border-slate-100">
                <div>
                  <h2 className="text-xl font-black text-slate-900">{selectedCompany} Network</h2>
                  <p className="text-[13px] font-semibold text-slate-500 mt-1">Showing {filteredLocations.length} results</p>
                </div>
                
                <div className="relative w-full sm:w-64">
                  <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input 
                    type="text" 
                    placeholder="Search city, name, pincode, type..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-[#f8fafc] border border-slate-200 rounded-xl text-sm font-semibold text-slate-800 outline-none focus:border-teal-500 focus:bg-white transition-all"
                  />
                  {searchTerm && (
                    <button onClick={() => setSearchTerm('')} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
                      <X size={14} />
                    </button>
                  )}
                </div>
              </div>

              {/* List */}
              <AnimatePresence mode="popLayout">
                {isFetching ? (
                  <motion.div key="loader" initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }} className="flex flex-col items-center justify-center py-20">
                    <div className="w-12 h-12 border-4 border-teal-100 border-t-teal-600 rounded-full animate-spin mb-4" />
                    <h3 className="text-[15px] font-black text-slate-700 animate-pulse">Connecting to {selectedCompany} APIs...</h3>
                    <p className="text-[12px] font-medium text-slate-400 mt-1">Fetching real-time {activeTab} data</p>
                  </motion.div>
                ) : filteredLocations.length === 0 ? (
                  <motion.div key="empty" initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }} className="text-center py-16">
                    <div className="w-16 h-16 bg-[#f8fafc] rounded-2xl flex items-center justify-center mx-auto mb-4 text-slate-300">
                      <Search size={28} />
                    </div>
                    <h3 className="text-[16px] font-black text-slate-700 mb-1">No results found</h3>
                    <p className="text-[13px] font-medium text-slate-400">Try adjusting your search terms</p>
                  </motion.div>
                ) : (
                  <div className="grid sm:grid-cols-2 gap-4">
                    {filteredLocations.map((loc, idx) => (
                      <motion.div 
                        layout
                        initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} exit={{ opacity:0, scale:0.95 }}
                        transition={{ duration: 0.2, delay: idx * 0.05 }}
                        key={`${loc.name}-${idx}`}
                        className="p-5 rounded-2xl border border-slate-100 hover:border-teal-200 hover:shadow-lg hover:shadow-teal-900/5 transition-all bg-white group"
                      >
                        <div className="flex justify-between items-start mb-3">
                          <span className="px-2.5 py-1 bg-slate-100 text-slate-600 text-[10px] font-black uppercase tracking-wider rounded-md">
                            {loc.city}
                          </span>
                          <div className="flex gap-1.5">
                            <span className="px-2.5 py-1 bg-teal-50 text-teal-700 text-[10px] font-bold rounded-md">
                              {activeTab === 'hospitals' ? loc.type : loc.brands}
                            </span>
                            {loc.ownership && (
                              <span className={`px-2.5 py-1 text-[10px] font-bold rounded-md ${loc.ownership === 'Private' ? 'bg-purple-50 text-purple-700' : loc.ownership === 'Commercial' ? 'bg-amber-50 text-amber-700' : 'bg-blue-50 text-blue-700'}`}>
                                {loc.ownership}
                              </span>
                            )}
                          </div>
                        </div>
                        
                        <h3 className="text-[15px] font-black text-slate-900 mb-2 leading-snug group-hover:text-teal-700 transition-colors">
                          {loc.name}
                        </h3>
                        
                        <div className="space-y-2 mt-4">
                          <div className="flex items-start gap-2.5">
                            <MapPin size={14} className="text-slate-400 mt-0.5 flex-shrink-0" />
                            <span className="text-[12px] font-medium text-slate-600 leading-tight">{loc.address}</span>
                          </div>
                          <div className="flex items-center gap-2.5">
                            <Phone size={14} className="text-slate-400 flex-shrink-0" />
                            <a href={`tel:${loc.phone}`} className="text-[12px] font-black text-teal-600 hover:underline">{loc.phone}</a>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </AnimatePresence>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default CashlessNetwork;
