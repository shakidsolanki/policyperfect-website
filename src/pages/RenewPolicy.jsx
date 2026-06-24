import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ShieldCheck, Clock, CheckCircle2, Search, FileText, Upload, 
  ArrowLeft, Send, Check, AlertCircle, Calendar, User, PhoneCall, Mail
} from 'lucide-react';
import HeroBackground from '../components/HeroBackground';
import SEO from '../components/SEO';
import { db } from '../utils/db';

export default function RenewPolicy() {
  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');
  const [email, setEmail] = useState('');
  const [policyNo, setPolicyNo] = useState('');
  const [vehicleNo, setVehicleNo] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [prevInsurer, setPrevInsurer] = useState('HDFC ERGO');
  const [ncb, setNcb] = useState('20%');
  const [selectedFile, setSelectedFile] = useState(null);
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleRenewSubmit = async (e) => {
    e.preventDefault();
    if (!name || !mobile || !vehicleNo) {
      alert('Please fill in Name, Mobile, and Vehicle Number.');
      return;
    }

    setIsSubmitting(true);
    try {
      const nowString = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });
      const nowISO = new Date().toISOString().split('T')[0];
      
      const newRenewal = {
        id: 'REN-' + Date.now().toString().slice(-6),
        policyNo: policyNo || 'PP-REN-' + Date.now().toString().slice(-4),
        date: nowISO,
        name,
        mobile,
        email: email || 'N/A',
        vehicleNo: vehicleNo.toUpperCase(),
        expiryDate: expiryDate || 'N/A',
        prevInsurer,
        ncb,
        fileName: selectedFile ? selectedFile.name : 'No file uploaded',
        status: 'In Progress'
      };

      const newLead = {
        id: 'L-' + Date.now().toString().slice(-6),
        name,
        mobile,
        email: email || 'N/A',
        productType: 'Policy Renewal',
        insuranceType: 'Motor Renewal',
        vehicleNumber: vehicleNo.toUpperCase(),
        message: `Renewal request. Prev Insurer: ${prevInsurer}, NCB: ${ncb}, Expiry: ${expiryDate || 'N/A'}. File: ${selectedFile ? selectedFile.name : 'None'}`,
        status: 'New',
        createdDate: nowString,
        assignedUser: 'Unassigned'
      };

      if (db.addRenewal) {
        await db.addRenewal(newRenewal);
      }
      if (db.addLead) {
        await db.addLead(newLead);
      }

      // Simulate network request
      setTimeout(() => {
        setIsSubmitting(false);
        setSubmitted(true);
      }, 1500);

    } catch (err) {
      console.error(err);
      setIsSubmitting(false);
    }
  };

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "serviceType": "Insurance Policy Renewal",
    "provider": {
      "@type": "InsuranceAgency",
      "name": "PolicyPerfect",
      "url": "https://policyperfect.co.in"
    },
    "description": "Renew your motor, health, or term life insurance policy online instantly with secure verification and payment process.",
    "areaServed": "IN"
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://policyperfect.co.in/"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Renew Policy",
        "item": "https://policyperfect.co.in/renew"
      }
    ]
  };

  return (
    <div className="bg-transparent min-h-screen pb-16 sm:pb-24">
      <SEO 
        title="Instant Insurance Policy Renewal Online | PolicyPerfect" 
        description="Renew your car, bike, health, or life insurance policy instantly online. Keep your coverage active with seamless, secure, and hassle-free payment options." 
      />
      <script type="application/ld+json">
        {JSON.stringify(serviceSchema)}
      </script>
      <script type="application/ld+json">
        {JSON.stringify(breadcrumbSchema)}
      </script>

      {/* Header Banner */}
      <div className="bg-[#0c1b33] text-white py-16 sm:py-20 relative overflow-hidden">
        <HeroBackground isDark={true} icons={[ShieldCheck, Clock, CheckCircle2, Search]} />
        <div className="absolute inset-0 opacity-10 z-0">
          <div className="absolute top-0 right-1/4 w-80 h-80 bg-white/20 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-1/4 w-60 h-60 bg-white/20 rounded-full blur-2xl" />
        </div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="flex items-center justify-center gap-2 text-xs font-black uppercase tracking-widest text-[#dfb15b] mb-4">
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight size={10} />
            <span className="text-slate-400">Renew Policy</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight leading-none mb-4">
            Policy Renewal Portal
          </h1>
          <p className="text-slate-300 text-sm sm:text-base font-semibold max-w-2xl mx-auto">
            Renew your motor, health, or life insurance policies instantly. Keep your family and assets protected.
          </p>
        </div>
      </div>

      {/* Main Content Form */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-20">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-[2rem] shadow-xl border border-slate-100 p-8 sm:p-12"
        >
          {submitted ? (
            <div className="flex flex-col items-center justify-center text-center space-y-4 py-8">
              <div className="w-16 h-16 bg-green-50 text-green-600 rounded-full flex items-center justify-center border border-green-100">
                <Check size={36} strokeWidth={3} />
              </div>
              <h2 className="text-2xl font-black text-slate-800">Renewal Request Submitted!</h2>
              <p className="text-slate-500 font-semibold text-sm max-w-md leading-relaxed">
                Thank you, <strong>{name}</strong>! Your policy renewal request for vehicle <strong>{vehicleNo}</strong> has been registered. Our experts will check your previous policy, calculate your new NCB discount, and share the renewal quote & secure payment link via WhatsApp (+91 {mobile}) shortly.
              </p>
              <div className="pt-6">
                <Link 
                  to="/" 
                  className="px-8 py-3.5 bg-[#dfb15b] hover:bg-[#cfa14a] text-slate-900 font-black rounded-xl text-sm transition-colors shadow-lg shadow-amber-500/10 inline-flex items-center gap-2"
                >
                  Back to Homepage
                </Link>
              </div>
            </div>
          ) : (
            <form onSubmit={handleRenewSubmit} className="space-y-6">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-amber-50 text-amber-600 rounded-2xl flex items-center justify-center border border-amber-100">
                  <ShieldCheck size={24} />
                </div>
                <div>
                  <span className="text-[11px] font-black uppercase tracking-wider text-teal-600 block mb-0.5">Secure Renewal</span>
                  <h3 className="text-lg sm:text-xl font-black text-slate-800 leading-tight">Enter Current Policy & Contact Information</h3>
                </div>
              </div>

              {/* Personal Details */}
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
                      placeholder="10-digit registered mobile" 
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
                  <label className="text-[11px] font-black uppercase text-slate-400 tracking-wider">Existing Policy Number (Optional)</label>
                  <div className="relative">
                    <FileText className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                    <input 
                      type="text" 
                      value={policyNo}
                      onChange={e => setPolicyNo(e.target.value)}
                      placeholder="e.g. PP-MOT-789320" 
                      className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl font-semibold text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-[#dfb15b]/20 focus:border-[#dfb15b] focus:bg-white transition-all"
                    />
                  </div>
                </div>
              </div>

              {/* Policy specific details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="space-y-1.5">
                  <label className="text-[11px] font-black uppercase text-slate-400 tracking-wider">Vehicle Number *</label>
                  <input 
                    type="text" 
                    required 
                    value={vehicleNo}
                    onChange={e => setVehicleNo(e.target.value.toUpperCase())}
                    placeholder="e.g. GJ-01-XX-9999" 
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl font-semibold text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-[#dfb15b]/20 focus:border-[#dfb15b] focus:bg-white transition-all"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[11px] font-black uppercase text-slate-400 tracking-wider">Policy Expiry Date</label>
                  <div className="relative">
                    <Calendar className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                    <input 
                      type="date" 
                      value={expiryDate}
                      onChange={e => setExpiryDate(e.target.value)}
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl font-semibold text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-[#dfb15b]/20 focus:border-[#dfb15b] focus:bg-white transition-all"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="space-y-1.5">
                  <label className="text-[11px] font-black uppercase text-slate-400 tracking-wider">Previous Insurance Insurer</label>
                  <select 
                    value={prevInsurer} 
                    onChange={e => setPrevInsurer(e.target.value)}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl font-semibold text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-[#dfb15b]/20 focus:border-[#dfb15b] focus:bg-white transition-all appearance-none"
                  >
                    <option value="HDFC ERGO">HDFC ERGO</option>
                    <option value="ICICI Lombard">ICICI Lombard</option>
                    <option value="Tata AIG">Tata AIG</option>
                    <option value="Bajaj Allianz">Bajaj Allianz</option>
                    <option value="Star Health">Star Health</option>
                    <option value="Digit Insurance">Digit Insurance</option>
                    <option value="SBI General">SBI General</option>
                    <option value="Universal Sompo">Universal Sompo</option>
                    <option value="Other">Other Insurer</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[11px] font-black uppercase text-slate-400 tracking-wider">Previous No Claim Bonus (NCB)</label>
                  <select 
                    value={ncb} 
                    onChange={e => setNcb(e.target.value)}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl font-semibold text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-[#dfb15b]/20 focus:border-[#dfb15b] focus:bg-white transition-all appearance-none"
                  >
                    <option value="0%">0% (No discount)</option>
                    <option value="20%">20%</option>
                    <option value="25%">25%</option>
                    <option value="35%">35%</option>
                    <option value="45%">45%</option>
                    <option value="50%">50% (Max discount)</option>
                  </select>
                </div>
              </div>

              {/* Document upload section */}
              <div className="space-y-2">
                <label className="text-[11px] font-black uppercase text-slate-400 tracking-wider">Upload Previous Policy or RC Copy (Optional)</label>
                <div className="border-2 border-dashed border-slate-200 hover:border-[#dfb15b]/60 rounded-2xl p-6 transition-colors bg-slate-50 flex flex-col items-center justify-center relative group">
                  <input 
                    type="file" 
                    onChange={handleFileChange}
                    className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                    accept=".pdf,.png,.jpg,.jpeg"
                  />
                  <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-sm text-slate-400 group-hover:text-[#dfb15b] transition-colors mb-2.5">
                    <Upload size={20} />
                  </div>
                  {selectedFile ? (
                    <div className="text-center">
                      <p className="text-xs font-bold text-slate-800 flex items-center gap-1.5 justify-center">
                        <CheckCircle2 className="text-emerald-500" size={14} />
                        {selectedFile.name}
                      </p>
                      <p className="text-[10px] text-slate-400 font-semibold mt-0.5">{(selectedFile.size / 1024 / 1024).toFixed(2)} MB • Click/Drag to replace</p>
                    </div>
                  ) : (
                    <div className="text-center">
                      <p className="text-xs font-bold text-slate-700">Drag & drop files or click to browse</p>
                      <p className="text-[10px] text-slate-400 font-semibold mt-0.5">Supports PDF, PNG, JPG up to 5MB</p>
                    </div>
                  )}
                </div>
              </div>

              <button 
                type="submit" 
                disabled={isSubmitting}
                className="w-full py-4 bg-[#dfb15b] hover:bg-[#cfa14a] text-slate-900 font-black rounded-xl text-sm transition-colors shadow-lg shadow-amber-500/10 flex items-center justify-center gap-2"
              >
                {isSubmitting ? 'Submitting Request...' : <><Send size={15} /> Submit Renewal Request</>}
              </button>
            </form>
          )}
        </motion.div>
      </div>

      {/* Loading Overlay */}
      {isSubmitting && (
        <div className="fixed inset-0 bg-[#0c1b33]/40 backdrop-blur-sm z-[250] flex items-center justify-center">
          <div className="bg-white rounded-2xl p-6 shadow-2xl border border-slate-100 flex flex-col items-center gap-4">
            <div className="w-10 h-10 border-4 border-[#0c1b33] border-t-transparent rounded-full animate-spin" />
            <p className="text-xs font-black text-slate-700">Verifying Policy & Saving Lead...</p>
          </div>
        </div>
      )}
    </div>
  );
}

// ChevronRight helper since it is not inside lucide imports (or we can just define it as a inline SVG or import it)
function ChevronRight({ size = 12 }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="m9 18 6-6-6-6" />
    </svg>
  );
}
