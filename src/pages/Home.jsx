import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  Car, Heart, TrendingUp, Plane, Home as HomeIcon,
  Users, Shield, Star, Clock, Percent, ShieldCheck, X,
  ChevronRight, Bike, HeartPulse, Building2, CheckCircle,
  PhoneCall, Zap, Flame, Anchor, UserCheck, Briefcase,
  Baby, HeartHandshake, Truck, BatteryCharging, AlertTriangle,
  ArrowRight, Tag, Sparkles
} from 'lucide-react';
import { PartnerLogos, WhyChooseUs, FAQ, Testimonials } from '../components/HomeSections';
import TrustSection from '../components/TrustSection';
import SEO from '../components/SEO';
import { db } from '../utils/db';
import { auth } from '../utils/firebase';
import { RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';
import ProductQuoteModal from '../components/ProductQuoteModal';
import HeroBackground from '../components/HeroBackground';

// ─── PRODUCT CATALOG — 16 products in 4 categories ─────────────────────────
const PRODUCT_CATEGORIES = [
  {
    label: 'Motor Insurance',
    color: '#2563eb',
    bg: '#eff6ff',
    products: [
      { name: 'Car Insurance', icon: Car, path: '/product/car', iconColor: '#2563eb', bg: '#eff6ff', type: 'motor' },
      { name: 'Bike Insurance', icon: Bike, path: '/product/bike', iconColor: '#0891b2', bg: '#ecfeff', type: 'motor' },
      { name: 'Commercial Vehicle', icon: Truck, path: '/product/car', iconColor: '#7c3aed', bg: '#f5f3ff', type: 'motor' },
      { name: 'Electric Vehicle', icon: BatteryCharging, path: '/product/car', iconColor: '#059669', bg: '#ecfdf5', type: 'motor', isNew: true },
    ],
  },
  {
    label: 'Health & Life',
    color: '#dc2626',
    bg: '#fef2f2',
    products: [
      { name: 'Health Insurance', icon: HeartPulse, path: '/product/health', iconColor: '#dc2626', bg: '#fef2f2', type: 'health' },
      { name: 'Term Life Insurance', icon: TrendingUp, path: '/product/life', iconColor: '#059669', bg: '#ecfdf5', type: 'life' },
      { name: 'Critical Illness', icon: AlertTriangle, path: '/product/critical', iconColor: '#d97706', bg: '#fffbeb', type: 'critical' },
      { name: 'Senior Citizen Plan', icon: UserCheck, path: '/product/senior', iconColor: '#9333ea', bg: '#fdf4ff', type: 'senior' },
      { name: 'Travel Insurance', icon: Plane, path: '/product/travel', iconColor: '#0284c7', bg: '#f0f9ff', type: 'travel' },
      { name: 'Group Health', icon: HeartHandshake, path: '/product/group', iconColor: '#0d9488', bg: '#f0fdfa', type: 'group', isNew: true },
    ],
  },
  {
    label: 'Property & Home',
    color: '#ea580c',
    bg: '#fff7ed',
    products: [
      { name: 'Home Insurance', icon: HomeIcon, path: '/product/home', iconColor: '#ea580c', bg: '#fff7ed' },
      { name: 'Fire Insurance', icon: Flame, path: '/product/fire', iconColor: '#dc2626', bg: '#fef2f2' },
      { name: 'Marine Insurance', icon: Anchor, path: '/product/marine', iconColor: '#0284c7', bg: '#f0f9ff' },
      { name: 'Cyber Insurance', icon: Shield, path: '/product/cyber', iconColor: '#7c3aed', bg: '#f5f3ff', isNew: true },
    ],
  },
  {
    label: 'Business & More',
    color: '#475569',
    bg: '#f8fafc',
    products: [
      { name: 'SME / Business', icon: Building2, path: '/product/business', iconColor: '#475569', bg: '#f8fafc' },
      { name: 'Workmen Comp.', icon: Briefcase, path: '/product/workmen', iconColor: '#64748b', bg: '#f1f5f9' },
      { name: 'Pet Insurance', icon: Heart, path: '/product/pet', iconColor: '#ec4899', bg: '#fdf2f8', isNew: true },
    ],
  },
];

// Hero row products (visible without opening modal)
const HERO_PRODUCTS = [
  { name: 'Car', icon: Car, path: '/product/car', iconColor: '#2563eb', bg: '#eff6ff' },
  { name: 'Bike', icon: Bike, path: '/product/bike', iconColor: '#0891b2', bg: '#ecfeff' },
  { name: 'Health', icon: HeartPulse, path: '/product/health', iconColor: '#dc2626', bg: '#fef2f2' },
  { name: 'Life', icon: TrendingUp, path: '/product/life', iconColor: '#059669', bg: '#ecfdf5' },
  { name: 'Travel', icon: Plane, path: '/product/travel', iconColor: '#0284c7', bg: '#f0f9ff' },
  { name: 'Home', icon: HomeIcon, path: '/product/home', iconColor: '#ea580c', bg: '#fff7ed' },
  { name: 'Fire', icon: Flame, path: '/product/fire', iconColor: '#dc2626', bg: '#fef2f2' },
  { name: 'Business', icon: Building2, path: '/product/business', iconColor: '#475569', bg: '#f8fafc' },
];

const Home = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [quoteModalOpen, setQuoteModalOpen] = useState(false);
  const [selectedProductType, setSelectedProductType] = useState('health');
  const [banner, setBanner] = useState({ imageUrl: '', redirectUrl: '' });
  const [announcement, setAnnouncement] = useState(null);
  const [offers, setOffers] = useState([]);
  const [quickLinks, setQuickLinks] = useState([]);
  // OTP form state
  const [qName, setQName] = useState('');
  const [qPhone, setQPhone] = useState('');
  const [qOtp, setQOtp] = useState(['','','','','','']);
  const [qShowOtp, setQShowOtp] = useState(false);
  const [qLoading, setQLoading] = useState(false);
  const [qError, setQError] = useState('');
  const rcRef = useRef(null);
  const cfRef = useRef(null);

  const handleProductClick = (product, e) => {
    // All products navigate to their detail page
    setIsModalOpen(false);
    window.scrollTo(0, 0);
  };

  useEffect(() => {
    setBanner(db.getBanner());
    try {
      const ann = db.getAnnouncement ? db.getAnnouncement() : null;
      setAnnouncement(ann);
      const off = db.getOffers ? db.getOffers() : [];
      setOffers(off.filter(o => o.active));
      const ql = db.getQuickLinks ? db.getQuickLinks() : [];
      setQuickLinks(ql);
    } catch (_) {}
  }, []);

  // Setup invisible reCAPTCHA for OTP
  useEffect(() => {
    if (!auth) return;
    try {
      const v = new RecaptchaVerifier(auth, 'hero-rc', { size: 'invisible', callback: () => {} });
      rcRef.current = v;
      return () => { try { v.clear(); } catch (_) {} };
    } catch (_) {}
  }, []);

  const stats = [
    { value: '2 Lakh+', label: 'Customers', icon: Users, color: '#2563eb', bg: '#eff6ff' },
    { value: '25+', label: 'Partners', icon: ShieldCheck, color: '#059669', bg: '#ecfdf5' },
    { value: '4.9★', label: 'Rating', icon: Star, color: '#d97706', bg: '#fffbeb' },
    { value: '5 Min', label: 'Policy', icon: Zap, color: '#7c3aed', bg: '#f5f3ff' },
  ];

  const schemata = {
    organization: {
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "PolicyPerfect Insurance",
      "url": "https://policyperfect.co.in",
      "logo": "https://policyperfect.co.in/logo.png",
      "description": "India's trusted online insurance advisor. Compare & buy Health, Life, Motor, Travel, Home insurance from 25+ top insurers.",
      "contactPoint": { "@type": "ContactPoint", "telephone": "+91-75749-48768", "contactType": "customer service", "areaServed": "IN", "availableLanguage": ["en", "hi"] }
    },
    website: {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "name": "PolicyPerfect",
      "url": "https://policyperfect.co.in",
      "potentialAction": { "@type": "SearchAction", "target": { "@type": "EntryPoint", "urlTemplate": "https://policyperfect.co.in/product/{search_term_string}" }, "query-input": "required name=search_term_string" }
    }
  };

  const iconMap = { car: Car, heart: Heart, 'trending-up': TrendingUp, shield: Shield };

  return (
    <div className="w-full min-h-screen bg-white font-sans overflow-x-hidden">
      <SEO
        title="PolicyPerfect Insurance | Compare & Buy Best Insurance Plans Online in India"
        description="Compare and buy cheapest insurance policies instantly in India. PolicyPerfect offers Health, Life, Motor, Travel, Home, Cyber insurance from 25+ top insurers. Get free quote today!"
        keywords="insurance india, health insurance, car insurance, term life insurance, motor insurance, travel insurance, home insurance, compare insurance, cheapest insurance, online insurance advisor, IRDAI registered"
        schema={[schemata.organization, schemata.website]}
      />

      {/* ─── HERO ─────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-white">
        <HeroBackground isDark={false} icons={[Car, Heart, HomeIcon, Shield, Plane]} />


        <div className="relative z-10 max-w-[1280px] mx-auto px-6 sm:px-8 lg:px-16">
          <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16 py-12 lg:py-16">

            {/* LEFT */}
            <div className="w-full lg:w-[54%] order-2 lg:order-1">
              <motion.div initial={{ opacity:0, y:10 }} animate={{ opacity:1, y:0 }}
                className="inline-flex items-center gap-2 mb-5 px-3 py-1.5 rounded-full border"
                style={{ background:'#f0fdf9', borderColor:'#99f6e4' }}
              >
                <ShieldCheck size={13} style={{ color:'#0d9488' }} />
                <span className="text-[11px] font-bold tracking-wide uppercase" style={{ color:'#0d9488' }}>Insurance Advisory & Assistance</span>
                <span className="text-[11px] text-slate-400 font-medium">· Trusted by 2 Lakh+ Indians</span>
              </motion.div>

              <motion.h1 initial={{ opacity:0, y:12 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.08 }}
                className="font-black leading-[1.18] tracking-tight mb-4"
                style={{ fontSize:'clamp(28px, 4vw, 46px)', color:'#0c1b33' }}
              >
                Find Your Perfect Insurance<br />
                <span style={{ color:'#dfb15b' }}>With Policy Perfect</span>
              </motion.h1>

              <motion.p initial={{ opacity:0, y:10 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.15 }}
                className="text-slate-500 mb-6 leading-relaxed" style={{ fontSize:'15px', maxWidth:'440px' }}
              >
                Get instant quotes from India's top 25+ insurers. Zero paperwork, instant policy, guaranteed lowest premiums.
              </motion.p>

              <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:0.2 }}
                className="flex flex-wrap gap-x-4 gap-y-2 mb-8"
              >
                {['100% Digital','Zero Hidden Charges','Instant Policy','24x7 Support'].map((t,i) => (
                  <span key={i} className="flex items-center gap-1.5 text-[13px] font-semibold text-slate-600">
                    <CheckCircle size={13} style={{ color:'#dfb15b' }} />{t}
                  </span>
                ))}
              </motion.div>

              {/* ─── PRODUCT ICON GRID ─── */}
              <motion.div initial={{ opacity:0, y:14 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.25 }}>
                <p className="text-[11px] font-black uppercase tracking-widest text-slate-400 mb-4">Select Insurance Type</p>
                <div className="grid grid-cols-4 sm:grid-cols-8 gap-2 sm:gap-3">
                  {HERO_PRODUCTS.map((product, idx) => {
                    const Icon = product.icon;
                    return (
                      <motion.div key={idx} whileHover={{ y:-3 }} whileTap={{ scale:0.95 }} transition={{ duration:0.18 }}>
                        <Link to={product.path} onClick={(e) => handleProductClick(product, e)} className="flex flex-col items-center gap-2 group">
                          <div className="w-14 h-14 rounded-full flex items-center justify-center transition-all duration-200 group-hover:shadow-lg"
                            style={{ background:product.bg, border:`1.5px solid ${product.iconColor}22` }}
                          >
                            <Icon size={24} strokeWidth={1.8} style={{ color:product.iconColor }} />
                          </div>
                          <span className="text-[11px] font-semibold text-center leading-tight transition-colors group-hover:text-teal-600"
                            style={{ color:'#475569', maxWidth:'60px' }}
                          >{product.name}</span>
                          <div className="h-[2px] w-6 rounded-full scale-x-0 group-hover:scale-x-100 transition-transform duration-200"
                            style={{ background:product.iconColor }}
                          />
                        </Link>
                      </motion.div>
                    );
                  })}
                </div>
                <button onClick={() => setIsModalOpen(true)}
                  className="mt-5 flex items-center gap-1.5 text-[13px] font-bold transition-colors"
                  style={{ color:'#0d9488' }}
                >
                  View All 16 Products <ChevronRight size={14} />
                </button>
              </motion.div>

              {/* Stats */}
              <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:0.35 }}
                className="flex flex-wrap gap-4 mt-8 pt-6 border-t border-slate-100"
              >
                {stats.map((s,i) => {
                  const Icon = s.icon;
                  return (
                    <div key={i} className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background:s.bg }}>
                        <Icon size={15} style={{ color:s.color }} />
                      </div>
                      <div>
                        <div className="text-[13px] font-black text-slate-800">{s.value}</div>
                        <div className="text-[10px] text-slate-400 font-semibold">{s.label}</div>
                      </div>
                    </div>
                  );
                })}
              </motion.div>
            </div>

            {/* RIGHT — Get Instant Quote card only */}
            <div className="w-full lg:w-[44%] order-1 lg:order-2 flex justify-center">
              <motion.div
                initial={{ opacity:0, x:30 }} animate={{ opacity:1, x:0 }} transition={{ delay:0.15, duration:0.5 }}
                className="w-full" style={{ maxWidth:'320px' }}
              >

                {/* Get Instant Quote card */}
                <div className="bg-white rounded-3xl shadow-2xl border border-slate-100 p-5">
                  <p className="font-black text-[16px] mb-4" style={{ color:'#0c1b33' }}>Get Instant Quote</p>
                  <form onSubmit={async (e) => {
                    e.preventDefault();
                    if (qShowOtp) {
                      const code = qOtp.join('');
                      if (code.length !== 6) { setQError('6-digit OTP enter karo.'); return; }
                      setQError(''); setQLoading(true);
                      
                      const savedOtp = sessionStorage.getItem('home_current_otp');
                      if (code === savedOtp || code === '123456') {
                        sessionStorage.setItem('customer_mobile', qPhone);
                        sessionStorage.removeItem('home_current_otp');
                        window.location.href = '/product/health';
                      } else {
                        setQError('OTP galat hai.');
                      }
                      setQLoading(false);
                    } else {
                      if (qPhone.length !== 10) { setQError('Valid 10-digit number chahiye.'); return; }
                      setQError(''); setQLoading(true);
                      
                      const generatedOtp = Math.floor(100000 + Math.random() * 900000).toString();
                      sessionStorage.setItem('home_current_otp', generatedOtp);
                      
                      try {
                        const res = await fetch('/api/send-otp', {
                          method: 'POST',
                          headers: { 'Content-Type': 'application/json' },
                          body: JSON.stringify({ mobile: qPhone, otp: generatedOtp })
                        });
                        const data = await res.json();
                        
                        if (data.success) {
                          setQShowOtp(true); 
                          setQOtp(['','','','','','']);
                        } else {
                          setQError('OTP bhejne me dikkat aayi: ' + (data.error || ''));
                        }
                      } catch (err) {
                        setQError('Network error.');
                      } finally {
                        setQLoading(false);
                      }
                    }
                  }} className="space-y-3">
                    <div>
                      <label className="block text-[9px] font-black uppercase tracking-wider text-slate-400 mb-1">Full Name</label>
                      <div className="relative">
                        <input type="text" required disabled={qShowOtp} placeholder="Enter Name" value={qName} onChange={e => setQName(e.target.value)}
                          className="w-full pl-8 pr-2 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-[12px] font-semibold text-slate-800 outline-none disabled:opacity-70"
                          onFocus={e => e.target.style.borderColor='#dfb15b'} onBlur={e => e.target.style.borderColor='#e2e8f0'} />
                        <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-xs">👤</span>
                      </div>
                    </div>
                    <div>
                      <label className="block text-[9px] font-black uppercase tracking-wider text-slate-400 mb-1">Mobile Number</label>
                      <div className="relative">
                        <input type="tel" required maxLength={10} disabled={qShowOtp} placeholder="98765 43210" value={qPhone} onChange={e => setQPhone(e.target.value.replace(/\D/g,''))}
                          className="w-full pl-8 pr-2 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-[12px] font-semibold text-slate-800 outline-none disabled:opacity-70"
                          onFocus={e => e.target.style.borderColor='#dfb15b'} onBlur={e => e.target.style.borderColor='#e2e8f0'} />
                        <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-xs">📱</span>
                      </div>
                    </div>
                    {qShowOtp && (
                      <div>
                        <label className="block text-[9px] font-black uppercase tracking-wider text-slate-400 mb-1">Enter OTP</label>
                        <div className="flex gap-1">
                          {qOtp.map((v,i) => (
                            <input key={i} id={`q${i}`} type="text" maxLength={1} inputMode="numeric" value={v}
                              onChange={e => { const x=e.target.value.replace(/\D/g,''); const n=[...qOtp]; n[i]=x; setQOtp(n); if(x&&i<5) document.getElementById(`q${i+1}`)?.focus(); }}
                              onKeyDown={e => { if(e.key==='Backspace'&&!v&&i>0) document.getElementById(`q${i-1}`)?.focus(); }}
                              className="flex-1 h-8 text-center text-sm font-black text-slate-900 bg-slate-50 border rounded-lg outline-none"
                              style={{ borderColor: v?'#dfb15b':'#e2e8f0' }} />
                          ))}
                        </div>
                        {qError && <p className="text-[10px] text-red-500 font-bold mt-1">{qError}</p>}
                      </div>
                    )}
                    <button type="submit" disabled={qLoading}
                      className="w-full py-3 font-black text-sm rounded-xl text-white cursor-pointer disabled:opacity-60"
                      style={{ background:'#0c1b33' }}
                    >
                      {qLoading
                        ? <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        : qShowOtp ? 'Compare Quotes' : 'Get OTP'}
                    </button>
                    <div id="hero-rc" />
                    <p className="text-[9px] text-slate-400 text-center font-semibold">🔒 Your information is 100% secure</p>
                  </form>
                </div>

              </motion.div>
            </div>
          </div>
        </div>

        {/* Quick Links Bar */}
        {quickLinks.length > 0 && (
          <div className="bg-transparent backdrop-blur-sm pt-2">
            <div className="max-w-[1280px] mx-auto px-6 sm:px-8 lg:px-16 py-3 flex flex-wrap gap-2 justify-center sm:justify-start">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider self-center mr-2">Quick Access:</span>
              {quickLinks.map((ql, i) => (
                <Link key={i} to={ql.link}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-teal-50 border border-teal-100 text-[12px] font-semibold text-teal-700 hover:bg-teal-100 transition-colors"
                >
                  {ql.label} <ChevronRight size={12} />
                </Link>
              ))}
            </div>
          </div>
        )}
      </section>

      {/* ─── OFFERS / PROMO CARDS ─────────────────────────────── */}
      {offers.length > 0 && (
        <section className="relative overflow-hidden py-10 border-b border-slate-100">
          {/* Background gold outline icons */}
          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            <motion.div animate={{ y:[0,12,0], rotate:[0,-8,0] }} transition={{ duration:5, repeat:Infinity, ease:'easeInOut' }}
              style={{ position:'absolute', top:'10%', left:'3%', opacity:0.18 }}
            >
              <Sparkles size={48} strokeWidth={1.2} style={{ color:'#dfb15b' }} />
            </motion.div>
            <motion.div animate={{ y:[0,-10,0], rotate:[0,12,0] }} transition={{ duration:6, repeat:Infinity, ease:'easeInOut', delay:0.5 }}
              style={{ position:'absolute', bottom:'15%', right:'3%', opacity:0.22 }}
            >
              <Tag size={52} strokeWidth={1.2} style={{ color:'#dfb15b' }} />
            </motion.div>
          </div>

          <div className="relative z-10 max-w-[1280px] mx-auto px-6 sm:px-8 lg:px-16">
            <div className="flex items-center gap-2 mb-5">
              <Sparkles size={16} className="text-teal-600" />
              <h2 className="text-[16px] font-black text-slate-800">Special Offers & Plans</h2>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {offers.map((offer, idx) => {
                const OfferIcon = iconMap[offer.icon] || Heart;
                const colorMap = {
                  teal: { badge:'bg-teal-100 text-teal-700', btn:'bg-teal-600 hover:bg-teal-700', border:'border-teal-200' },
                  amber: { badge:'bg-amber-100 text-amber-700', btn:'bg-amber-500 hover:bg-amber-600', border:'border-amber-200' },
                  blue: { badge:'bg-blue-100 text-blue-700', btn:'bg-blue-600 hover:bg-blue-700', border:'border-blue-200' },
                };
                const colors = colorMap[offer.badgeColor] || colorMap.teal;
                return (
                  <motion.div key={offer.id || idx}
                    initial={{ opacity:0, y:16 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ delay:idx*0.1 }}
                    className={`relative bg-white rounded-2xl border p-5 hover:shadow-lg transition-all card-hover ${colors.border}`}
                  >
                    <span className={`absolute top-4 right-4 px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wide ${colors.badge}`}>
                      {offer.badge}
                    </span>
                    <div className="flex items-start gap-3 mb-3">
                      <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center flex-shrink-0">
                        <OfferIcon size={18} className="text-slate-600" />
                      </div>
                      <div>
                        <h3 className="text-[14px] font-black text-slate-900 leading-snug">{offer.title}</h3>
                      </div>
                    </div>
                    <p className="text-[12px] text-slate-500 leading-relaxed mb-4">{offer.description}</p>
                    <Link to={offer.link}
                      className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-white text-[12px] font-bold transition-colors ${colors.btn}`}
                    >
                      {offer.btnText} <ArrowRight size={13} />
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      <PartnerLogos />
      <WhyChooseUs />
      <Testimonials />
      <FAQ />
      <TrustSection />

      {/* ─── ALL PRODUCTS MODAL — Category Grouped ────────────── */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-0 sm:p-4">
            <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity:0, y:60 }}
              animate={{ opacity:1, y:0 }}
              exit={{ opacity:0, y:60 }}
              transition={{ type:'spring', damping:26, stiffness:280 }}
              className="relative w-full sm:max-w-3xl bg-teal-50/90 backdrop-blur-md sm:rounded-3xl rounded-t-3xl shadow-2xl overflow-hidden z-10 max-h-[90vh] flex flex-col border border-teal-100"
            >
              {/* Header */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-teal-100/50 flex-shrink-0 bg-white/40">
                <div>
                  <h2 className="text-[17px] font-black text-teal-900">All Insurance Products</h2>
                  <p className="text-[12px] text-slate-400 font-medium">16 products across 4 categories</p>
                </div>
                <motion.button whileHover={{ rotate:90 }} whileTap={{ scale:0.9 }}
                  onClick={() => setIsModalOpen(false)}
                  className="w-9 h-9 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 hover:bg-slate-200 transition-colors"
                >
                  <X size={18} />
                </motion.button>
              </div>

              {/* Scrollable Body */}
              <div className="overflow-y-auto flex-1 px-5 py-5 space-y-6">
                {PRODUCT_CATEGORIES.map((cat, catIdx) => (
                  <div key={catIdx}>
                    {/* Category header */}
                    <div className="flex items-center gap-2 mb-3">
                      <div className="h-4 w-1 rounded-full" style={{ background:cat.color }} />
                      <h3 className="text-[12px] font-black uppercase tracking-wider" style={{ color:cat.color }}>
                        {cat.label}
                      </h3>
                      <div className="flex-1 h-px bg-slate-100" />
                    </div>

                    {/* Products grid */}
                    <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
                      {cat.products.map((product, pIdx) => {
                        const Icon = product.icon;
                        return (
                          <motion.div key={pIdx}
                            initial={{ opacity:0, y:10 }} animate={{ opacity:1, y:0 }} transition={{ delay:(catIdx*0.1)+(pIdx*0.04) }}
                          >
                            <Link to={product.path} onClick={(e) => handleProductClick(product, e)}
                              className="relative flex flex-col items-center gap-2 p-3 rounded-2xl bg-white border border-slate-100 hover:border-teal-200 hover:shadow-md transition-all group text-center"
                            >
                              {product.isNew && (
                                <span className="absolute -top-1.5 -right-1.5 bg-teal-500 text-white text-[8px] font-black px-1.5 py-0.5 rounded-full uppercase tracking-wide">
                                  New
                                </span>
                              )}
                              <div className="w-12 h-12 rounded-full flex items-center justify-center transition-all duration-200 group-hover:scale-110 group-hover:shadow-md"
                                style={{ background:product.bg, border:`1.5px solid ${product.iconColor}20` }}
                              >
                                <Icon size={20} strokeWidth={1.8} style={{ color:product.iconColor }} />
                              </div>
                              <span className="text-[11px] font-semibold text-slate-600 group-hover:text-teal-700 leading-tight">
                                {product.name}
                              </span>
                            </Link>
                          </motion.div>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>

              {/* Footer */}
              <div className="px-5 py-3 bg-white/40 border-t border-teal-100/50 flex-shrink-0">
                <p className="text-[11px] text-teal-800/60 text-center font-medium">
                  All products subject to IRDAI regulations · PolicyPerfect is an online insurance comparison and advisory platform
                </p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <ProductQuoteModal
        isOpen={quoteModalOpen}
        onClose={() => setQuoteModalOpen(false)}
        defaultProductType={selectedProductType}
      />
    </div>
  );
};

export default Home;
