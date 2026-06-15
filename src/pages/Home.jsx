import React, { useState, useEffect } from 'react';
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
import { PartnerLogos, WhyChooseUs, FAQ, Testimonials, AppDownload, CTASection } from '../components/HomeSections';
import SEO from '../components/SEO';
import { db } from '../utils/db';
import ProductQuoteModal from '../components/ProductQuoteModal';

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
      { name: 'Critical Illness', icon: AlertTriangle, path: '/product/health', iconColor: '#d97706', bg: '#fffbeb', type: 'health' },
      { name: 'Senior Citizen Plan', icon: UserCheck, path: '/product/health', iconColor: '#9333ea', bg: '#fdf4ff', type: 'health' },
      { name: 'Travel Insurance', icon: Plane, path: '/product/travel', iconColor: '#0284c7', bg: '#f0f9ff', type: 'travel' },
      { name: 'Group Health', icon: HeartHandshake, path: '/product/health', iconColor: '#0d9488', bg: '#f0fdfa', type: 'health', isNew: true },
    ],
  },
  {
    label: 'Property & Home',
    color: '#ea580c',
    bg: '#fff7ed',
    products: [
      { name: 'Home Insurance', icon: HomeIcon, path: '/product/home', iconColor: '#ea580c', bg: '#fff7ed', type: 'fire' },
      { name: 'Fire Insurance', icon: Flame, path: '/product/home', iconColor: '#dc2626', bg: '#fef2f2', type: 'fire' },
      { name: 'Marine Insurance', icon: Anchor, path: '/product/business', iconColor: '#0284c7', bg: '#f0f9ff', type: 'business' },
      { name: 'Cyber Insurance', icon: Shield, path: '/product/cyber', iconColor: '#7c3aed', bg: '#f5f3ff', type: 'cyber', isNew: true },
    ],
  },
  {
    label: 'Business & More',
    color: '#475569',
    bg: '#f8fafc',
    products: [
      { name: 'SME / Business', icon: Building2, path: '/product/business', iconColor: '#475569', bg: '#f8fafc', type: 'business' },
      { name: 'Workmen Comp.', icon: Briefcase, path: '/product/business', iconColor: '#64748b', bg: '#f1f5f9', type: 'business' },
      { name: 'Pet Insurance', icon: Heart, path: '/product/cyber', iconColor: '#ec4899', bg: '#fdf2f8', type: 'pet', isNew: true },
    ],
  },
];

// Hero row products (visible without opening modal)
const HERO_PRODUCTS = [
  { name: 'Car', icon: Car, path: '/product/car', iconColor: '#2563eb', bg: '#eff6ff', type: 'motor' },
  { name: 'Bike', icon: Bike, path: '/product/bike', iconColor: '#0891b2', bg: '#ecfeff', type: 'motor' },
  { name: 'Health', icon: HeartPulse, path: '/product/health', iconColor: '#dc2626', bg: '#fef2f2', type: 'health' },
  { name: 'Life', icon: TrendingUp, path: '/product/life', iconColor: '#059669', bg: '#ecfdf5', type: 'life' },
  { name: 'Travel', icon: Plane, path: '/product/travel', iconColor: '#0284c7', bg: '#f0f9ff', type: 'travel' },
  { name: 'Home', icon: HomeIcon, path: '/product/home', iconColor: '#ea580c', bg: '#fff7ed', type: 'fire' },
  { name: 'Cyber', icon: Shield, path: '/product/cyber', iconColor: '#7c3aed', bg: '#f5f3ff', type: 'cyber' },
  { name: 'Business', icon: Building2, path: '/product/business', iconColor: '#475569', bg: '#f8fafc', type: 'business' },
];

const QUOTE_TYPE_MAP = {
  motor: null, // navigate normally
  health: 'health',
  life: 'life',
  fire: 'fire',
  travel: 'travel',
  cyber: 'cyber',
  business: 'business',
  pet: 'pet',
};

const Home = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [quoteModalOpen, setQuoteModalOpen] = useState(false);
  const [selectedProductType, setSelectedProductType] = useState('health');
  const [banner, setBanner] = useState({ imageUrl: '', redirectUrl: '' });
  const [announcement, setAnnouncement] = useState(null);
  const [offers, setOffers] = useState([]);
  const [quickLinks, setQuickLinks] = useState([]);

  const handleProductClick = (product, e) => {
    const quoteType = QUOTE_TYPE_MAP[product.type];
    if (quoteType === null || product.type === 'motor') {
      return; // navigate normally
    }
    e.preventDefault();
    setSelectedProductType(quoteType || 'health');
    setQuoteModalOpen(true);
    setIsModalOpen(false);
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
      "description": "India's trusted online insurance broker. Compare & buy Health, Life, Motor, Travel, Home insurance from 25+ top insurers.",
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
        keywords="insurance india, health insurance, car insurance, term life insurance, motor insurance, travel insurance, home insurance, compare insurance, cheapest insurance, online insurance broker, IRDAI registered"
        schema={[schemata.organization, schemata.website]}
      />

      {/* ─── HERO ─────────────────────────────────────────────── */}
      <section
        className="relative overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #f0fdf9 0%, #f8fafc 50%, #eff6ff 100%)' }}
      >
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div style={{ position:'absolute', top:'-80px', right:'-80px', width:'420px', height:'420px', background:'radial-gradient(circle, rgba(20,184,166,0.10) 0%, transparent 70%)', borderRadius:'50%' }} />
          <div style={{ position:'absolute', bottom:'-60px', left:'-60px', width:'320px', height:'320px', background:'radial-gradient(circle, rgba(37,99,235,0.07) 0%, transparent 70%)', borderRadius:'50%' }} />
        </div>

        <div className="relative z-10 max-w-[1280px] mx-auto px-6 sm:px-8 lg:px-16">
          <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16 py-12 lg:py-16">

            {/* LEFT */}
            <div className="w-full lg:w-[54%] order-2 lg:order-1">
              <motion.div initial={{ opacity:0, y:10 }} animate={{ opacity:1, y:0 }}
                className="inline-flex items-center gap-2 mb-5 px-3 py-1.5 rounded-full border"
                style={{ background:'#f0fdf9', borderColor:'#99f6e4' }}
              >
                <ShieldCheck size={13} style={{ color:'#0d9488' }} />
                <span className="text-[11px] font-bold tracking-wide uppercase" style={{ color:'#0d9488' }}>IRDAI Registered Broker</span>
                <span className="text-[11px] text-slate-400 font-medium">· Trusted by 2 Lakh+ Indians</span>
              </motion.div>

              <motion.h1 initial={{ opacity:0, y:12 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.08 }}
                className="font-black leading-[1.15] tracking-tight mb-4"
                style={{ fontSize:'clamp(28px, 4vw, 46px)', color:'#0c1b33' }}
              >
                Compare & Save on<br />
                <span style={{ background:'linear-gradient(90deg, #0d9488, #0891b2)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text' }}>
                  Best Insurance Plans
                </span>
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
                    <CheckCircle size={13} style={{ color:'#0d9488' }} />{t}
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

            {/* RIGHT — Illustration */}
            <div className="w-full lg:w-[44%] order-1 lg:order-2 flex justify-center">
              <motion.div initial={{ opacity:0, x:30 }} animate={{ opacity:1, x:0 }} transition={{ delay:0.15, duration:0.5 }}
                className="relative w-full" style={{ maxWidth:'420px' }}
              >
                <div className="relative rounded-3xl overflow-hidden shadow-2xl"
                  style={{ background:'linear-gradient(160deg, #e8faf8 0%, #f0fdf9 40%, #eff6ff 100%)' }}
                >
                  <a href={banner.redirectUrl || '#'} className="block" onClick={(e) => !banner.redirectUrl && e.preventDefault()}>
                    <img
                      src="/hero-illustration.png?v=2"
                      alt="Insurance plans for family, car, health and life in India"
                      className="w-full object-cover"
                      style={{ height:'320px', objectPosition:'center top' }}
                      onError={(e) => { e.target.onerror=null; e.target.src='https://images.unsplash.com/photo-1581553673739-c4906b5d0de8?auto=format&fit=crop&q=80&w=700'; }}
                    />
                  </a>
                  <div className="px-5 py-4 flex items-center justify-between"
                    style={{ background:'linear-gradient(90deg, #0d9488, #0891b2)' }}
                  >
                    <div>
                      <p className="text-white font-black text-[14px] leading-snug">Expert Claim Support</p>
                      <p className="text-teal-100 text-[11px] font-medium">Available 24x7 for you</p>
                    </div>
                    <a href="tel:+917574948768" className="flex items-center gap-2 bg-white/20 hover:bg-white/30 transition-colors px-3 py-1.5 rounded-lg">
                      <PhoneCall size={13} className="text-white" />
                      <span className="text-white text-[12px] font-bold">Call Now</span>
                    </a>
                  </div>
                </div>

                <motion.div initial={{ opacity:0, scale:0.8 }} animate={{ opacity:1, scale:1 }} transition={{ delay:0.5 }}
                  className="animate-float absolute bg-white rounded-2xl shadow-xl flex items-center gap-3"
                  style={{ top:'24px', right:'-20px', padding:'10px 14px', border:'1.5px solid #fde68a', minWidth:'140px' }}
                >
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background:'#fffbeb' }}>
                    <Percent size={16} style={{ color:'#d97706' }} />
                  </div>
                  <div>
                    <div className="text-[13px] font-black text-slate-800">Save 40%</div>
                    <div className="text-[10px] text-slate-400 font-semibold">vs direct buy</div>
                  </div>
                </motion.div>

                <motion.div initial={{ opacity:0, scale:0.8 }} animate={{ opacity:1, scale:1 }} transition={{ delay:0.65 }}
                  className="animate-float-reverse absolute bg-white rounded-2xl shadow-xl flex items-center gap-3"
                  style={{ bottom:'80px', left:'-20px', padding:'10px 14px', border:'1.5px solid #99f6e4', minWidth:'145px' }}
                >
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background:'#f0fdf9' }}>
                    <Clock size={16} style={{ color:'#0d9488' }} />
                  </div>
                  <div>
                    <div className="text-[13px] font-black text-slate-800">5 Min Policy</div>
                    <div className="text-[10px] text-slate-400 font-semibold">Instant issuance</div>
                  </div>
                </motion.div>

                <motion.div initial={{ opacity:0, scale:0.8 }} animate={{ opacity:1, scale:1 }} transition={{ delay:0.8 }}
                  className="animate-float absolute bg-white rounded-2xl shadow-lg flex items-center gap-2"
                  style={{ bottom:'22px', right:'-15px', padding:'8px 12px', border:'1.5px solid #fde68a' }}
                >
                  <Star size={13} style={{ color:'#d97706', fill:'#d97706' }} />
                  <span className="text-[13px] font-black text-slate-800">4.9 / 5</span>
                  <span className="text-[10px] text-slate-400 font-semibold">Rating</span>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Quick Links Bar */}
        {quickLinks.length > 0 && (
          <div className="border-t border-teal-100/60 bg-white/70 backdrop-blur-sm">
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
        <section className="py-10 bg-white border-b border-slate-100">
          <div className="max-w-[1280px] mx-auto px-6 sm:px-8 lg:px-16">
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
      <AppDownload />
      <FAQ />
      <CTASection />

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
              className="relative w-full sm:max-w-3xl bg-white sm:rounded-3xl rounded-t-3xl shadow-2xl overflow-hidden z-10 max-h-[90vh] flex flex-col"
            >
              {/* Header */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 flex-shrink-0">
                <div>
                  <h2 className="text-[17px] font-black text-slate-900">All Insurance Products</h2>
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
              <div className="px-5 py-3 bg-slate-50 border-t border-slate-100 flex-shrink-0">
                <p className="text-[11px] text-slate-400 text-center font-medium">
                  All products subject to IRDAI regulations · PolicyPerfect is an IRDAI registered broker
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
