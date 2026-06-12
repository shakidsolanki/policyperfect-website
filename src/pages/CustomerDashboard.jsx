import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { db } from '../utils/db';
import SEO from '../components/SEO';
import {
  Phone, ShieldCheck, Download, AlertCircle,
  RefreshCw, LogOut, CheckCircle, FileText, User,
  Calendar, Banknote, Car, Heart, Home, ArrowRight,
  Edit3, Clock, Shield, MessageCircle, Send, X, ChevronRight
} from 'lucide-react';

// ── Product type → icon/color mapping ───────────────────────────────────────
const PRODUCT_ICONS = {
  'Motor Insurance': { icon: Car, color: '#2563eb', bg: '#eff6ff' },
  'Health Insurance': { icon: Heart, color: '#dc2626', bg: '#fef2f2' },
  'Term Life Insurance': { icon: Shield, color: '#059669', bg: '#ecfdf5' },
  'Home Insurance': { icon: Home, color: '#ea580c', bg: '#fff7ed' },
  'Fire Insurance': { icon: Shield, color: '#d97706', bg: '#fffbeb' },
  'Travel Insurance': { icon: Shield, color: '#0284c7', bg: '#f0f9ff' },
  'default': { icon: FileText, color: '#0d9488', bg: '#f0fdfa' },
};

const getProductMeta = (type) => PRODUCT_ICONS[type] || PRODUCT_ICONS['default'];

// ── OTP Input — 6 individual digit boxes ────────────────────────────────────
const OTPInput = ({ value, onChange }) => {
  const digits = value.padEnd(6, '').split('').slice(0, 6);
  const inputRefs = useRef([]);

  const handleKey = (idx, e) => {
    if (e.key === 'Backspace') {
      const newVal = value.slice(0, idx === 0 ? 0 : idx);
      onChange(newVal);
      if (idx > 0) inputRefs.current[idx - 1]?.focus();
    } else if (/^\d$/.test(e.key)) {
      const newVal = (value.slice(0, idx) + e.key + value.slice(idx + 1)).slice(0, 6);
      onChange(newVal);
      if (idx < 5) inputRefs.current[idx + 1]?.focus();
    }
  };

  return (
    <div className="flex gap-2 sm:gap-3 justify-center">
      {Array.from({ length: 6 }).map((_, idx) => (
        <input
          key={idx}
          ref={(el) => (inputRefs.current[idx] = el)}
          type="text"
          inputMode="numeric"
          maxLength={1}
          value={digits[idx] || ''}
          onKeyDown={(e) => handleKey(idx, e)}
          onChange={() => {}}
          onFocus={(e) => e.target.select()}
          className="w-10 h-12 sm:w-12 sm:h-14 text-center text-[20px] font-black rounded-xl border-2 outline-none transition-all"
          style={{
            borderColor: digits[idx] ? '#0d9488' : '#e2e8f0',
            background: digits[idx] ? '#f0fdfa' : '#f8fafc',
            color: '#0c1b33',
          }}
        />
      ))}
    </div>
  );
};

// ── Status badge helper ──────────────────────────────────────────────────────
const StatusBadge = ({ status }) => {
  const map = {
    Active: 'bg-teal-50 text-teal-700 border-teal-200',
    Expired: 'bg-red-50 text-red-600 border-red-200',
    Pending: 'bg-amber-50 text-amber-700 border-amber-200',
  };
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold border ${map[status] || map.Active}`}>
      <span className="w-1.5 h-1.5 rounded-full" style={{ background: 'currentColor' }} />
      {status}
    </span>
  );
};

// ═══════════════════════════════════════════════════════════════════════════════
const CustomerDashboard = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [mobile, setMobile] = useState('');
  const [otp, setOtp] = useState('');
  const [sentOtp, setSentOtp] = useState('');
  const [otpStep, setOtpStep] = useState(1);
  const [activeTab, setActiveTab] = useState('policies');
  const [policies, setPolicies] = useState([]);
  const [notification, setNotification] = useState('');
  const [error, setError] = useState('');
  const [resendTimer, setResendTimer] = useState(0);

  const [claimForm, setClaimForm] = useState({
    policyId: '', accidentDate: '', accidentTime: '',
    location: '', description: '', driverDetails: '', witnessContact: ''
  });
  const [endorsementForm, setEndorsementForm] = useState({
    policyId: '', changeType: 'Name Correction', newValue: '', documentName: ''
  });

  useEffect(() => {
    const savedMobile = sessionStorage.getItem('customer_mobile');
    if (savedMobile) {
      setIsLoggedIn(true);
      setMobile(savedMobile);
      loadCustomerPolicies(savedMobile);
    }
  }, []);

  // Countdown for resend OTP
  useEffect(() => {
    if (resendTimer > 0) {
      const t = setTimeout(() => setResendTimer(r => r - 1), 1000);
      return () => clearTimeout(t);
    }
  }, [resendTimer]);

  const loadCustomerPolicies = (mob) => {
    const all = db.getPolicies();
    const mine = all.filter(p => p.mobile === mob);
    setPolicies(mine);
    if (mine.length > 0) {
      setClaimForm(p => ({ ...p, policyId: mine[0].id }));
      setEndorsementForm(p => ({ ...p, policyId: mine[0].id }));
    }
  };

  const handleSendOtp = (e) => {
    e.preventDefault();
    if (mobile.length !== 10) { setError('Please enter a valid 10-digit mobile number'); return; }
    setError('');
    const generated = Math.floor(100000 + Math.random() * 900000).toString();
    setSentOtp(generated);
    setOtpStep(2);
    setOtp('');
    setResendTimer(30);
    setNotification(`OTP Sent! (Demo OTP: ${generated})`);
    setTimeout(() => setNotification(''), 8000);
  };

  const handleVerifyOtp = (e) => {
    e.preventDefault();
    if (otp === sentOtp || otp === '123456') {
      setError('');
      setIsLoggedIn(true);
      sessionStorage.setItem('customer_mobile', mobile);
      loadCustomerPolicies(mobile);
      setNotification('Logged in successfully!');
      setTimeout(() => setNotification(''), 3000);
    } else {
      setError('Invalid OTP. Please try again or use 123456.');
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setMobile(''); setOtp(''); setSentOtp(''); setOtpStep(1);
    sessionStorage.removeItem('customer_mobile');
  };

  const handleDownloadPolicy = (policy) => {
    const content = `
==========================================
        POLICYPERFECT INSURANCE          
==========================================
POLICY COPY (DIGITAL DOCUMENT)
------------------------------------------
Policy Number  : ${policy.policyNo}
Insured Name   : ${policy.name}
Insurer Partner: ${policy.insurer}
Product Type   : ${policy.productType}
Details        : ${policy.vehicleDetails}
Registration   : ${policy.regNo || 'N/A'}
Premium Paid   : ${policy.premium}
Start Date     : ${policy.startDate}
End Date       : ${policy.endDate}
Status         : ${policy.status}
------------------------------------------
For claim support, call: +91 75749 48768
Website: policyperfect.co.in
==========================================`;
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = `Policy_${policy.policyNo}.txt`;
    document.body.appendChild(a); a.click();
    document.body.removeChild(a); URL.revokeObjectURL(url);
    setNotification('Policy document downloaded!');
    setTimeout(() => setNotification(''), 3000);
  };

  const handleClaimSubmit = (e) => {
    e.preventDefault();
    const sel = policies.find(p => p.id === claimForm.policyId);
    if (!sel) return;
    const claim = {
      id: 'CLM-' + Date.now().toString().slice(-6),
      policyNo: sel.policyNo, productType: sel.productType, mobile,
      name: sel.name, vehicleDetails: sel.vehicleDetails,
      date: new Date().toLocaleString(), ...claimForm
    };
    db.setClaims([claim, ...db.getClaims()]);
    setNotification(`Claim registered! Ref: ${claim.id}`);
    setClaimForm({ policyId: policies[0]?.id || '', accidentDate: '', accidentTime: '', location: '', description: '', driverDetails: '', witnessContact: '' });
    setTimeout(() => setNotification(''), 6000);
  };

  const handleEndorsementSubmit = (e) => {
    e.preventDefault();
    const sel = policies.find(p => p.id === endorsementForm.policyId);
    if (!sel) return;
    const req = {
      id: 'END-' + Date.now().toString().slice(-6),
      policyNo: sel.policyNo, productType: sel.productType, mobile,
      name: sel.name, date: new Date().toLocaleString(), status: 'Pending', ...endorsementForm
    };
    db.setEndorsements([req, ...db.getEndorsements()]);
    setNotification(`Change Request Submitted! Ref: ${req.id}`);
    setEndorsementForm({ policyId: policies[0]?.id || '', changeType: 'Name Correction', newValue: '', documentName: '' });
    setTimeout(() => setNotification(''), 6000);
  };

  // ── INPUT STYLE ──────────────────────────────────────────────────────────
  const inputCls = "w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-slate-800 outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 transition-all font-medium text-[14px]";
  const labelCls = "block text-[11px] font-black uppercase tracking-wider text-slate-400 mb-2";

  // ═══════════════════════════════════════════════════════════════════════════
  // LOGIN SCREEN
  // ═══════════════════════════════════════════════════════════════════════════
  if (!isLoggedIn) {
    return (
      <div className="min-h-[90vh] font-sans flex items-center justify-center px-4 py-16"
        style={{ background: 'linear-gradient(135deg, #f0fdf9 0%, #f8fafc 50%, #eff6ff 100%)' }}
      >
        <SEO
          title="Customer Login | PolicyPerfect — Manage Your Policies"
          description="Login to your PolicyPerfect customer portal with mobile OTP. View policies, download documents, intimate claims and request changes."
        />

        {/* Background blobs */}
        <div className="pointer-events-none fixed inset-0 overflow-hidden">
          <div style={{ position:'absolute', top:'-100px', right:'-100px', width:'500px', height:'500px', background:'radial-gradient(circle, rgba(20,184,166,0.08) 0%, transparent 70%)', borderRadius:'50%' }} />
          <div style={{ position:'absolute', bottom:'-100px', left:'-100px', width:'400px', height:'400px', background:'radial-gradient(circle, rgba(37,99,235,0.06) 0%, transparent 70%)', borderRadius:'50%' }} />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="relative w-full max-w-md"
        >
          {/* Card */}
          <div className="bg-white rounded-3xl shadow-2xl shadow-teal-900/10 border border-slate-100 overflow-hidden">

            {/* Card header strip */}
            <div style={{ background: 'linear-gradient(90deg, #0d9488, #0891b2)' }} className="px-8 pt-8 pb-6 text-center">
              <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-4 border border-white/30">
                <ShieldCheck size={32} className="text-white" />
              </div>
              <h1 className="text-[22px] font-black text-white leading-tight">Customer Portal</h1>
              <p className="text-teal-100 text-[13px] font-medium mt-1">
                {otpStep === 1 ? 'Enter your registered mobile number' : 'Enter the OTP sent to your mobile'}
              </p>
            </div>

            {/* Step indicator */}
            <div className="flex border-b border-slate-100">
              {['Mobile Number', 'OTP Verify'].map((s, i) => (
                <div key={i} className="flex-1 flex items-center justify-center gap-2 py-3">
                  <div className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-black transition-all ${otpStep > i ? 'bg-teal-600 text-white' : otpStep === i+1 ? 'bg-teal-600 text-white' : 'bg-slate-100 text-slate-400'}`}>
                    {otpStep > i + 1 ? <CheckCircle size={10} /> : i + 1}
                  </div>
                  <span className={`text-[11px] font-bold ${otpStep === i+1 ? 'text-teal-600' : 'text-slate-400'}`}>{s}</span>
                </div>
              ))}
            </div>

            <div className="px-8 py-7">
              {/* Alerts */}
              <AnimatePresence>
                {error && (
                  <motion.div initial={{ opacity:0, y:-8 }} animate={{ opacity:1, y:0 }} exit={{ opacity:0 }}
                    className="mb-5 flex items-center gap-3 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-[13px] font-semibold"
                  >
                    <AlertCircle size={16} className="flex-shrink-0" />{error}
                  </motion.div>
                )}
                {notification && (
                  <motion.div initial={{ opacity:0, y:-8 }} animate={{ opacity:1, y:0 }} exit={{ opacity:0 }}
                    className="mb-5 flex items-center gap-3 bg-teal-50 border border-teal-200 text-teal-700 px-4 py-3 rounded-xl text-[13px] font-semibold"
                  >
                    <CheckCircle size={16} className="flex-shrink-0" />{notification}
                  </motion.div>
                )}
              </AnimatePresence>

              {otpStep === 1 ? (
                <motion.form key="step1" initial={{ opacity:0 }} animate={{ opacity:1 }} onSubmit={handleSendOtp} className="space-y-5">
                  <div>
                    <label className={labelCls}>Mobile Number</label>
                    <div className="relative">
                      <div className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center gap-2 pr-3 border-r border-slate-200">
                        <img src="https://flagcdn.com/w20/in.png" alt="IN" className="w-5 h-auto rounded-sm" />
                        <span className="text-[13px] font-bold text-slate-500">+91</span>
                      </div>
                      <input
                        type="tel" maxLength={10} placeholder="Enter 10-digit number"
                        value={mobile}
                        onChange={(e) => { setMobile(e.target.value.replace(/\D/g, '')); setError(''); }}
                        className="w-full pl-[72px] pr-4 py-3.5 bg-slate-50 border-2 border-slate-200 rounded-xl text-slate-800 font-bold text-[15px] outline-none focus:border-teal-500 focus:bg-white transition-all"
                      />
                    </div>
                  </div>
                  <motion.button type="submit" whileHover={{ scale:1.01 }} whileTap={{ scale:0.98 }}
                    className="w-full py-3.5 rounded-xl text-white font-black text-[15px] flex items-center justify-center gap-2 transition-all"
                    style={{ background: 'linear-gradient(90deg, #0d9488, #0891b2)', boxShadow: '0 4px 20px rgba(13,148,136,0.3)' }}
                  >
                    Send OTP <Send size={16} />
                  </motion.button>
                  <p className="text-center text-[12px] text-slate-400 font-medium">
                    OTP will be sent to your registered mobile
                  </p>
                </motion.form>
              ) : (
                <motion.form key="step2" initial={{ opacity:0 }} animate={{ opacity:1 }} onSubmit={handleVerifyOtp} className="space-y-6">
                  <div>
                    <label className="block text-center text-[12px] font-black uppercase tracking-wider text-slate-400 mb-4">
                      Enter 6-Digit OTP
                    </label>
                    <OTPInput value={otp} onChange={setOtp} />
                  </div>

                  <motion.button type="submit" whileHover={{ scale:1.01 }} whileTap={{ scale:0.98 }}
                    disabled={otp.length < 6}
                    className="w-full py-3.5 rounded-xl text-white font-black text-[15px] flex items-center justify-center gap-2 transition-all disabled:opacity-40"
                    style={{ background: 'linear-gradient(90deg, #0d9488, #0891b2)', boxShadow: otp.length===6 ? '0 4px 20px rgba(13,148,136,0.3)' : 'none' }}
                  >
                    <ShieldCheck size={18} /> Verify & Login
                  </motion.button>

                  <div className="flex items-center justify-between text-[12px] font-semibold">
                    <button type="button" onClick={() => { setOtpStep(1); setOtp(''); setError(''); }}
                      className="text-teal-600 hover:text-teal-800 flex items-center gap-1"
                    >
                      ← Change Number
                    </button>
                    <button type="button" disabled={resendTimer > 0}
                      onClick={handleSendOtp}
                      className={resendTimer > 0 ? 'text-slate-400' : 'text-teal-600 hover:underline'}
                    >
                      {resendTimer > 0 ? `Resend in ${resendTimer}s` : 'Resend OTP'}
                    </button>
                  </div>
                </motion.form>
              )}

              <div className="mt-6 pt-5 border-t border-slate-100 text-center">
                <p className="text-[11px] text-slate-400 font-medium">
                  💡 Demo: Login with <strong className="text-slate-600">7574948768</strong> to see test policies
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    );
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // LOGGED-IN DASHBOARD
  // ═══════════════════════════════════════════════════════════════════════════
  const tabs = [
    { id: 'policies', label: 'My Policies', icon: FileText, count: policies.length },
    { id: 'claim', label: 'Intimate Claim', icon: AlertCircle },
    { id: 'endorsement', label: 'Request Change', icon: Edit3 },
  ];

  return (
    <div className="min-h-screen font-sans" style={{ background: '#f8fafc' }}>
      <SEO title="My Policies | PolicyPerfect Customer Portal" description="View your insurance policies, download documents, intimate claims and request endorsements." />

      {/* ─── Dashboard Header ─── */}
      <div className="border-b border-slate-200 bg-white shadow-sm">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-11 h-11 rounded-2xl flex items-center justify-center"
              style={{ background: 'linear-gradient(135deg, #0d9488, #0891b2)' }}
            >
              <User size={22} className="text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-[16px] font-black text-slate-900">My Portal</h1>
                <span className="px-2 py-0.5 bg-teal-50 border border-teal-200 text-teal-700 text-[10px] font-bold rounded-full uppercase">Customer</span>
              </div>
              <p className="text-[12px] text-slate-500 font-medium flex items-center gap-1.5 mt-0.5">
                <Phone size={11} />+91 {mobile}
              </p>
            </div>
          </div>
          <button onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 border border-slate-200 rounded-xl text-[13px] font-bold text-slate-600 hover:bg-red-50 hover:border-red-200 hover:text-red-600 transition-all"
          >
            <LogOut size={14} /> Logout
          </button>
        </div>
      </div>

      {/* ─── Notification Banner ─── */}
      <AnimatePresence>
        {notification && (
          <motion.div initial={{ opacity:0, y:-10 }} animate={{ opacity:1, y:0 }} exit={{ opacity:0 }}
            className="bg-teal-600 text-white py-2.5 text-center text-[13px] font-semibold flex items-center justify-center gap-2"
          >
            <CheckCircle size={15} /> {notification}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* ─── Tab Navigation ─── */}
        <div className="flex overflow-x-auto gap-2 mb-8 bg-white border border-slate-200 rounded-2xl p-1.5 shadow-sm">
          {tabs.map(tab => {
            const Icon = tab.icon;
            return (
              <button key={tab.id} onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-[13px] whitespace-nowrap transition-all flex-1 justify-center ${
                  activeTab === tab.id
                    ? 'text-white shadow-md'
                    : 'text-slate-500 hover:text-slate-800 hover:bg-slate-50'
                }`}
                style={activeTab === tab.id ? { background: 'linear-gradient(90deg, #0d9488, #0891b2)' } : {}}
              >
                <Icon size={15} />
                {tab.label}
                {tab.count !== undefined && (
                  <span className={`w-5 h-5 rounded-full text-[10px] flex items-center justify-center font-black ${
                    activeTab === tab.id ? 'bg-white/25 text-white' : 'bg-slate-100 text-slate-500'
                  }`}>{tab.count}</span>
                )}
              </button>
            );
          })}
        </div>

        {/* ═══ TAB 1: MY POLICIES ═══════════════════════════════════════════ */}
        {activeTab === 'policies' && (
          <div>
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-[18px] font-black text-slate-900">
                Your Policies <span className="text-slate-400 font-medium text-[14px]">({policies.length})</span>
              </h2>
            </div>

            {policies.length === 0 ? (
              <div className="bg-white border border-slate-200 rounded-3xl p-16 text-center shadow-sm">
                <div className="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <FileText size={28} className="text-slate-300" />
                </div>
                <h3 className="text-[16px] font-black text-slate-700 mb-1">No Policies Found</h3>
                <p className="text-[13px] text-slate-400 font-medium">
                  No active policies linked to <strong>{mobile}</strong>.<br />
                  Contact your advisor or visit Admin to register your policy.
                </p>
              </div>
            ) : (
              <div className="grid sm:grid-cols-2 gap-5">
                {policies.map((p) => {
                  const meta = getProductMeta(p.productType);
                  const Icon = meta.icon;
                  return (
                    <motion.div key={p.id}
                      initial={{ opacity:0, y:12 }} animate={{ opacity:1, y:0 }}
                      className="bg-white border border-slate-200 rounded-3xl shadow-sm overflow-hidden hover:shadow-md hover:-translate-y-0.5 transition-all"
                    >
                      {/* Card top */}
                      <div className="px-5 pt-5 pb-4">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex items-center gap-3">
                            <div className="w-11 h-11 rounded-2xl flex items-center justify-center" style={{ background: meta.bg }}>
                              <Icon size={20} style={{ color: meta.color }} />
                            </div>
                            <div>
                              <h3 className="font-black text-[15px] text-slate-900 leading-tight">{p.productType}</h3>
                              <p className="text-[11px] text-slate-400 font-semibold mt-0.5">{p.insurer}</p>
                            </div>
                          </div>
                          <StatusBadge status={p.status} />
                        </div>

                        <div className="bg-slate-50 rounded-2xl p-4 space-y-2.5">
                          <div className="flex justify-between items-center">
                            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wide">Policy No</span>
                            <span className="text-[12px] font-black text-slate-800">{p.policyNo}</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wide flex items-center gap-1"><Calendar size={10} />Valid Till</span>
                            <span className="text-[12px] font-semibold text-slate-700">{p.endDate}</span>
                          </div>
                          {p.vehicleDetails && (
                            <div className="flex justify-between items-center">
                              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wide">Details</span>
                              <span className="text-[12px] font-semibold text-slate-700 text-right max-w-[160px] truncate">{p.vehicleDetails}</span>
                            </div>
                          )}
                          <div className="flex justify-between items-center">
                            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wide flex items-center gap-1"><Banknote size={10} />Premium</span>
                            <span className="text-[13px] font-black" style={{ color: '#0d9488' }}>{p.premium}</span>
                          </div>
                        </div>
                      </div>

                      {/* Card footer */}
                      <div className="px-5 py-3 border-t border-slate-100 flex gap-2">
                        <button onClick={() => handleDownloadPolicy(p)}
                          className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl border border-slate-200 text-[12px] font-bold text-slate-600 hover:bg-teal-50 hover:border-teal-300 hover:text-teal-700 transition-all"
                        >
                          <Download size={13} /> Download
                        </button>
                        <button onClick={() => { setActiveTab('claim'); setClaimForm(f=>({...f, policyId:p.id})); }}
                          className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl border border-slate-200 text-[12px] font-bold text-slate-600 hover:bg-red-50 hover:border-red-200 hover:text-red-600 transition-all"
                        >
                          <AlertCircle size={13} /> Claim
                        </button>
                        <button onClick={() => { setActiveTab('endorsement'); setEndorsementForm(f=>({...f, policyId:p.id})); }}
                          className="w-10 h-10 flex items-center justify-center rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 transition-all"
                        >
                          <Edit3 size={13} />
                        </button>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* ═══ TAB 2: INTIMATE CLAIM ══════════════════════════════════════════ */}
        {activeTab === 'claim' && (
          <div className="max-w-2xl">
            <h2 className="text-[18px] font-black text-slate-900 mb-1">Intimate a Claim</h2>
            <p className="text-[13px] text-slate-400 mb-6">Report your incident to start the claim process immediately.</p>

            {policies.length === 0 ? (
              <div className="bg-white border border-slate-200 rounded-3xl p-10 text-center">
                <p className="text-slate-500 font-semibold">You need an active policy to intimate a claim.</p>
              </div>
            ) : (
              <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className={labelCls}>Select Policy *</label>
                    <select value={claimForm.policyId} onChange={(e) => setClaimForm({...claimForm, policyId: e.target.value})} className={inputCls}>
                      {policies.map(p => <option key={p.id} value={p.id}>{p.productType} ({p.policyNo})</option>)}
                    </select>
                  </div>
                  <div>
                    <label className={labelCls}>Accident Date *</label>
                    <input type="date" required value={claimForm.accidentDate} onChange={(e) => setClaimForm({...claimForm, accidentDate: e.target.value})} className={inputCls} />
                  </div>
                  <div>
                    <label className={labelCls}>Accident Time *</label>
                    <input type="time" required value={claimForm.accidentTime} onChange={(e) => setClaimForm({...claimForm, accidentTime: e.target.value})} className={inputCls} />
                  </div>
                  <div>
                    <label className={labelCls}>Location *</label>
                    <input type="text" required placeholder="City, Area" value={claimForm.location} onChange={(e) => setClaimForm({...claimForm, location: e.target.value})} className={inputCls} />
                  </div>
                </div>
                <div>
                  <label className={labelCls}>Driver Details (Motor only)</label>
                  <input type="text" placeholder="Driver name & license number" value={claimForm.driverDetails} onChange={(e) => setClaimForm({...claimForm, driverDetails: e.target.value})} className={inputCls} />
                </div>
                <div>
                  <label className={labelCls}>Incident Description *</label>
                  <textarea rows={4} required placeholder="Describe what happened in detail..." value={claimForm.description} onChange={(e) => setClaimForm({...claimForm, description: e.target.value})} className={inputCls + ' resize-none'} />
                </div>
                <motion.button onClick={handleClaimSubmit} whileHover={{ scale:1.01 }} whileTap={{ scale:0.98 }}
                  className="w-full py-3.5 rounded-xl text-white font-black text-[15px] flex items-center justify-center gap-2 transition-all"
                  style={{ background: 'linear-gradient(90deg, #dc2626, #b91c1c)' }}
                >
                  <AlertCircle size={17} /> Submit Claim Intimation
                </motion.button>
              </div>
            )}
          </div>
        )}

        {/* ═══ TAB 3: ENDORSEMENTS ════════════════════════════════════════════ */}
        {activeTab === 'endorsement' && (
          <div className="max-w-2xl">
            <h2 className="text-[18px] font-black text-slate-900 mb-1">Request Policy Change</h2>
            <p className="text-[13px] text-slate-400 mb-6">Correction requests are reviewed within 2-3 business days.</p>

            {policies.length === 0 ? (
              <div className="bg-white border border-slate-200 rounded-3xl p-10 text-center">
                <p className="text-slate-500 font-semibold">You need an active policy to request changes.</p>
              </div>
            ) : (
              <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className={labelCls}>Select Policy *</label>
                    <select value={endorsementForm.policyId} onChange={(e) => setEndorsementForm({...endorsementForm, policyId: e.target.value})} className={inputCls}>
                      {policies.map(p => <option key={p.id} value={p.id}>{p.productType} ({p.policyNo})</option>)}
                    </select>
                  </div>
                  <div>
                    <label className={labelCls}>Type of Change *</label>
                    <select value={endorsementForm.changeType} onChange={(e) => setEndorsementForm({...endorsementForm, changeType: e.target.value})} className={inputCls}>
                      <option>Name Correction</option>
                      <option>Address Correction</option>
                      <option>Vehicle/Reg Details Update</option>
                      <option>Nominee Correction</option>
                      <option>Policy Transfer</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className={labelCls}>Correct Value *</label>
                  <input type="text" required placeholder="Enter the correct details as in your ID proof" value={endorsementForm.newValue} onChange={(e) => setEndorsementForm({...endorsementForm, newValue: e.target.value})} className={inputCls} />
                </div>
                <div>
                  <label className={labelCls}>Upload Supporting Document</label>
                  <input type="file" onChange={(e) => setEndorsementForm({...endorsementForm, documentName: e.target.files[0]?.name || ''})}
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-600 text-[13px] outline-none focus:border-teal-500 cursor-pointer" />
                  {endorsementForm.documentName && (
                    <p className="text-[11px] text-teal-600 font-semibold mt-1.5 flex items-center gap-1"><CheckCircle size={11} />{endorsementForm.documentName}</p>
                  )}
                </div>
                <motion.button onClick={handleEndorsementSubmit} whileHover={{ scale:1.01 }} whileTap={{ scale:0.98 }}
                  className="w-full py-3.5 rounded-xl text-white font-black text-[15px] flex items-center justify-center gap-2 transition-all"
                  style={{ background: 'linear-gradient(90deg, #0d9488, #0891b2)' }}
                >
                  <Send size={17} /> Submit Change Request
                </motion.button>
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
};

export default CustomerDashboard;
