import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Hospital, Wrench, Search, MapPin, Phone, Building2, ChevronRight, X } from 'lucide-react';
import SEO from '../components/SEO';

// --- MOCK DATA ---
const HOSPITAL_DATA = {
  'HDFC ERGO': [
    { name: 'Apollo Hospitals', city: 'Chennai', address: 'No.21, Greams Lane, Chennai - 600006', phone: '044-28290200', type: 'Multi-specialty' },
    { name: 'Fortis Hospital', city: 'Mumbai', address: 'Mulund Goregaon Link Rd, Mumbai - 400078', phone: '022-41274000', type: 'Multi-specialty' },
    { name: 'Max Super Specialty', city: 'Delhi', address: 'Press Enclave Road, Saket, Delhi', phone: '011-26515050', type: 'Multi-specialty' },
    { name: 'Kokilaben Hospital', city: 'Mumbai', address: '4 Andheri, Mumbai - 400053', phone: '022-30999999', type: 'Multi-specialty' },
    { name: 'AIIMS', city: 'Delhi', address: 'Ansari Nagar, New Delhi - 110029', phone: '011-26588500', type: 'Government' },
  ],
  'Star Health': [
    { name: 'Manipal Hospitals', city: 'Bangalore', address: '98, HAL Airport Road, Bangalore', phone: '080-25024444', type: 'Multi-specialty' },
    { name: 'Narayana Health', city: 'Bangalore', address: '258/A, Bommasandra, Bangalore', phone: '080-71222222', type: 'Cardiac Care' },
    { name: 'Medanta Hospital', city: 'Gurugram', address: 'Sector 38, Gurugram - 122001', phone: '0124-4141414', type: 'Multi-specialty' },
    { name: 'Ruby Hall Clinic', city: 'Pune', address: '40, Sassoon Road, Pune - 411001', phone: '020-66455000', type: 'Multi-specialty' },
  ],
  'ICICI Lombard': [
    { name: 'Hinduja Hospital', city: 'Mumbai', address: 'Veer Savarkar Marg, Mahim, Mumbai', phone: '022-24447000', type: 'Multi-specialty' },
    { name: 'Lilavati Hospital', city: 'Mumbai', address: 'A-791, Bandra Reclamation, Mumbai', phone: '022-26568000', type: 'Multi-specialty' },
    { name: 'Amrita Institute', city: 'Kochi', address: 'AIMS Ponekkara, Kochi - 682041', phone: '0484-2801234', type: 'Multi-specialty' },
  ],
  'Bajaj Allianz': [
    { name: 'KIMS Hospital', city: 'Hyderabad', address: 'Minister Road, Hyderabad', phone: '040-44885000', type: 'Multi-specialty' },
    { name: 'Sunshine Hospitals', city: 'Hyderabad', address: 'PG Road, Paradise Circle', phone: '040-44557777', type: 'Multi-specialty' },
    { name: 'Yashoda Hospitals', city: 'Hyderabad', address: 'Rajbhavan Road, Somajiguda', phone: '040-45674567', type: 'Multi-specialty' },
  ],
  'Tata AIG': [
    { name: 'Breach Candy Hospital', city: 'Mumbai', address: '60-A, Bhulabhai Desai Road, Mumbai', phone: '022-23667888', type: 'Multi-specialty' },
    { name: 'Nanavati Hospital', city: 'Mumbai', address: 'S.V. Road, Vile Parle (W)', phone: '022-26182222', type: 'Multi-specialty' },
  ],
  'Niva Bupa': [
    { name: 'Apollo Spectra', city: 'Delhi', address: 'Nehru Enclave, Kalkaji, Delhi', phone: '011-71771777', type: 'Multi-specialty' },
    { name: 'BLK Max Hospital', city: 'Delhi', address: '5, Pusa Road, New Delhi', phone: '011-30403040', type: 'Multi-specialty' },
    { name: 'Artemis Hospital', city: 'Gurugram', address: 'Sector 51, Gurugram', phone: '0124-4511111', type: 'Multi-specialty' }
  ]
};

const GARAGE_DATA = {
  'HDFC ERGO': [
    { name: 'Maruti Genuine Parts', city: 'Delhi', address: 'Mathura Road, Faridabad', phone: '0129-4111111', brands: 'Maruti Suzuki' },
    { name: 'Hyundai Authorized', city: 'Mumbai', address: 'LBS Marg, Vikhroli, Mumbai', phone: '022-67000555', brands: 'Hyundai' },
    { name: 'Toyota Motor Garage', city: 'Bangalore', address: 'Whitefield Road, Bangalore', phone: '080-41222233', brands: 'Toyota' },
    { name: 'Honda Workshop', city: 'Pune', address: 'Nagar Road, Hadapsar, Pune', phone: '020-30455566', brands: 'Honda' }
  ],
  'ICICI Lombard': [
    { name: 'Tata Motors Center', city: 'Mumbai', address: 'Eastern Express Highway, Thane', phone: '022-25347600', brands: 'Tata Motors' },
    { name: 'Mahindra Garage', city: 'Delhi', address: 'Najafgarh Road, Uttam Nagar, Delhi', phone: '011-45678900', brands: 'Mahindra' },
    { name: 'Ford Service Center', city: 'Chennai', address: 'GST Road, Tambaram, Chennai', phone: '044-22273300', brands: 'Ford' }
  ],
  'Bajaj Allianz': [
    { name: 'Volkswagen Workshop', city: 'Hyderabad', address: 'Road No 12, Banjara Hills', phone: '040-66779900', brands: 'Volkswagen' },
    { name: 'BMW Authorized', city: 'Mumbai', address: 'Andheri Kurla Road, Mumbai', phone: '022-40789900', brands: 'BMW' },
    { name: 'Bosch Car Service', city: 'Pune', address: 'Pimpri Industrial Area, Pune', phone: '020-27475555', brands: 'Multi-brand' }
  ],
  'Tata AIG': [
    { name: 'Kia Authorized Garage', city: 'Delhi', address: 'Dwarka Sector 14, Delhi', phone: '011-45896500', brands: 'Kia' },
    { name: 'Renault Service', city: 'Bangalore', address: 'Hosur Road, BTM Layout', phone: '080-41226677', brands: 'Renault' }
  ]
};

const COMPANY_COLORS = {
  'HDFC ERGO': { bg: '#fee2e2', text: '#dc2626', initials: 'HE' },
  'Star Health': { bg: '#dbeafe', text: '#2563eb', initials: 'SH' },
  'ICICI Lombard': { bg: '#ffedd5', text: '#ea580c', initials: 'IL' },
  'Bajaj Allianz': { bg: '#e0e7ff', text: '#4f46e5', initials: 'BA' },
  'Tata AIG': { bg: '#ccfbf1', text: '#0d9488', initials: 'TA' },
  'Niva Bupa': { bg: '#fce7f3', text: '#db2777', initials: 'NB' }
};

const CashlessNetwork = () => {
  const [activeTab, setActiveTab] = useState('hospitals'); // 'hospitals' | 'garages'
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const currentDataMap = activeTab === 'hospitals' ? HOSPITAL_DATA : GARAGE_DATA;
  const companies = Object.keys(currentDataMap);

  // Auto-select first company when tab changes or if none selected
  useEffect(() => {
    setSelectedCompany(companies[0]);
    setSearchTerm('');
  }, [activeTab]);

  const activeLocations = selectedCompany && currentDataMap[selectedCompany] ? currentDataMap[selectedCompany] : [];
  
  const filteredLocations = activeLocations.filter(loc => 
    loc.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    loc.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (loc.type && loc.type.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (loc.brands && loc.brands.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="min-h-screen bg-slate-50 font-sans pb-20">
      <SEO 
        title="Cashless Network | Hospitals & Garages | PolicyPerfect" 
        description="Find cashless network hospitals and network garages for your insurance policy. Select your insurance company and search by city or name."
      />

      {/* --- HERO SECTION --- */}
      <div className="bg-[#0c1b33] pt-12 pb-24 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{ background: 'radial-gradient(circle at 50% 100%, #14b8a6 0%, transparent 50%)' }}></div>
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
              activeTab === 'hospitals' ? 'bg-teal-600 text-white shadow-md' : 'text-slate-500 hover:bg-slate-50'
            }`}
          >
            <Hospital size={18} /> Cashless Hospitals
          </button>
          <button 
            onClick={() => setActiveTab('garages')}
            className={`flex-1 flex items-center justify-center gap-2 py-3.5 rounded-xl font-black text-[13px] transition-all ${
              activeTab === 'garages' ? 'bg-teal-600 text-white shadow-md' : 'text-slate-500 hover:bg-slate-50'
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
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center font-black text-lg flex-shrink-0"
                      style={{ backgroundColor: colorInfo.bg, color: colorInfo.text }}
                    >
                      {colorInfo.initials}
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
                    placeholder="Search city, name..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold text-slate-800 outline-none focus:border-teal-500 focus:bg-white transition-all"
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
                {filteredLocations.length === 0 ? (
                  <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }} className="text-center py-16">
                    <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center mx-auto mb-4 text-slate-300">
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
                          <span className="px-2.5 py-1 bg-teal-50 text-teal-700 text-[10px] font-bold rounded-md">
                            {activeTab === 'hospitals' ? loc.type : loc.brands}
                          </span>
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
