import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Shield, CheckCircle2, AlertTriangle, ArrowRight, ChevronRight, HelpCircle, 
  PhoneCall, Star, Clock, Percent, FileText, Settings, Heart, Navigation, 
  Key, Zap, Car, Bike, Info, Building2, Phone, MessageSquare, ClipboardCheck,
  Award, HelpCircle as HelpIcon, ArrowUpRight, X
} from 'lucide-react';
import HeroBackground from '../components/HeroBackground';
import SEO from '../components/SEO';
import { PartnerLogos } from '../components/HomeSections';
import TrustSection from '../components/TrustSection';
import ProductQuoteModal from '../components/ProductQuoteModal';
import { insuranceData } from '../utils/insuranceData';

const FAQAccordionItem = ({ faq, index, activeIndex, setActiveIndex, textCls }) => {
  const isOpen = activeIndex === index;
  return (
    <div className="border border-slate-200 rounded-2xl bg-white overflow-hidden shadow-sm transition-all duration-300">
      <button
        onClick={() => setActiveIndex(isOpen ? null : index)}
        className="w-full px-6 py-4 flex items-center justify-between text-left focus:outline-none"
      >
        <span className="text-[13px] font-black text-slate-800 flex items-start gap-2.5">
          <HelpCircle size={16} className={`${textCls} mt-0.5 flex-shrink-0`} />
          {faq.q}
        </span>
        <span className={`text-slate-400 font-extrabold transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>▼</span>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <div className="px-6 pb-5 pl-11 text-xs text-slate-500 font-semibold leading-relaxed border-t border-slate-50 pt-2">
              {faq.a}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const ProductDetail = ({ type: propType }) => {
  const { type: paramType } = useParams();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeFaq, setActiveFaq] = useState(null);

  const activeKey = propType || paramType || 'health';

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
    setActiveFaq(null);
  }, [activeKey]);

  const data = insuranceData[activeKey] || insuranceData.health;
  const Icon = data.icon || Heart;

  // Colors
  const getColors = () => {
    switch (data.color) {
      case 'teal': return { bg: 'bg-teal-600', hover: 'hover:bg-teal-700', text: 'text-teal-600', light: 'bg-teal-50', border: 'border-teal-200', btnLight: 'bg-teal-50 text-teal-700 hover:bg-teal-100' };
      case 'blue': return { bg: 'bg-blue-600', hover: 'hover:bg-blue-700', text: 'text-blue-600', light: 'bg-blue-50', border: 'border-blue-200', btnLight: 'bg-blue-50 text-blue-700 hover:bg-blue-100' };
      case 'amber': return { bg: 'bg-amber-500', hover: 'hover:bg-amber-600', text: 'text-amber-600', light: 'bg-amber-50', border: 'border-amber-200', btnLight: 'bg-amber-50 text-amber-700 hover:bg-amber-100' };
      case 'red': return { bg: 'bg-red-600', hover: 'hover:bg-red-700', text: 'text-red-600', light: 'bg-red-50', border: 'border-red-200', btnLight: 'bg-red-50 text-red-700 hover:bg-red-100' };
      case 'sky': return { bg: 'bg-sky-500', hover: 'hover:bg-sky-600', text: 'text-sky-600', light: 'bg-sky-50', border: 'border-sky-200', btnLight: 'bg-sky-50 text-sky-700 hover:bg-sky-100' };
      case 'slate': return { bg: 'bg-slate-700', hover: 'hover:bg-slate-800', text: 'text-slate-700', light: 'bg-slate-50', border: 'border-slate-200', btnLight: 'bg-slate-50 text-slate-700 hover:bg-slate-100' };
      case 'purple': return { bg: 'bg-purple-600', hover: 'hover:bg-purple-700', text: 'text-purple-600', light: 'bg-purple-50', border: 'border-purple-200', btnLight: 'bg-purple-50 text-purple-700 hover:bg-purple-100' };
      case 'rose': return { bg: 'bg-rose-600', hover: 'hover:bg-rose-700', text: 'text-rose-600', light: 'bg-rose-50', border: 'border-rose-200', btnLight: 'bg-rose-50 text-rose-700 hover:bg-rose-100' };
      case 'indigo': return { bg: 'bg-indigo-600', hover: 'hover:bg-indigo-700', text: 'text-indigo-600', light: 'bg-indigo-50', border: 'border-indigo-200', btnLight: 'bg-indigo-50 text-indigo-700 hover:bg-indigo-100' };
      default: return { bg: 'bg-teal-600', hover: 'hover:bg-teal-700', text: 'text-teal-600', light: 'bg-teal-50', border: 'border-teal-200', btnLight: 'bg-teal-50 text-teal-700 hover:bg-teal-100' };
    }
  };
  const colors = getColors();

  // Related products filters
  const relatedProducts = Object.keys(insuranceData)
    .filter(k => k !== activeKey)
    .slice(0, 4)
    .map(k => ({ id: k, ...insuranceData[k] }));

  // FAQ Schema Script
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": data.faqs.map(faq => ({
      "@type": "Question",
      "name": faq.q,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.a
      }
    }))
  };

  return (
    <div className="w-full min-h-screen bg-slate-50 font-sans pb-16 overflow-x-hidden">
      <SEO title={`${data.title} Details - PolicyPerfect`} description={data.seoDesc} />
      
      {/* Schema Injection */}
      <script type="application/ld+json">
        {JSON.stringify(faqSchema)}
      </script>

      {/* ─── 1. HERO SECTION ────────────────────────────────────────── */}
      <section className="bg-[#0c1b33] border-b border-slate-800 pt-10 pb-16 px-6 sm:px-8 lg:px-16 relative overflow-hidden">
        <HeroBackground isDark={true} icons={[Shield, Star, CheckCircle2, Info, Heart, Building2]} />
        <div className={`absolute top-0 right-0 w-96 h-96 ${colors.bg} rounded-full blur-[120px] opacity-15 pointer-events-none z-0`}></div>
        
        <div className="max-w-[1280px] mx-auto flex flex-col lg:flex-row items-center justify-between gap-12 relative z-10">
          
          {/* Left Hero */}
          <div className="lg:w-[52%] w-full space-y-6">
            <div className="flex items-center gap-2">
              <Link to="/" className="text-[11px] font-black text-slate-400 hover:text-white uppercase tracking-widest transition-colors">Home</Link>
              <ChevronRight size={12} className="text-slate-500" />
              <span className={`text-[11px] font-black ${colors.text} uppercase tracking-widest brightness-125`}>{data.title}</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white leading-tight">
              {data.sub}
            </h1>
            <p className="text-sm md:text-base text-slate-300 leading-relaxed max-w-xl font-medium">
              {data.desc}
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap gap-4 pt-2">
              <button 
                onClick={() => setIsModalOpen(true)}
                className={`flex items-center justify-center gap-2 px-8 py-3.5 ${colors.bg} text-white rounded-xl font-black text-sm ${colors.hover} transition-all shadow-lg shadow-black/30 cursor-pointer hover:scale-105`}
              >
                Get Free Quote <ArrowRight size={16} />
              </button>
              <a 
                href="tel:+917574948768"
                className="flex items-center justify-center gap-2 px-8 py-3.5 bg-white/10 hover:bg-white/20 border border-white/20 text-white rounded-xl font-black text-sm transition-all hover:scale-105"
              >
                <Phone size={15} /> Talk to Advisor
              </a>
            </div>

            {/* Badges Highlights */}
            <div className="grid grid-cols-2 gap-3.5 pt-6 border-t border-slate-800">
              {data.badges.map((badge, idx) => {
                const BadgeIcon = badge.icon || Shield;
                return (
                  <div key={idx} className="flex items-center gap-2.5">
                    <div className={`w-9 h-9 rounded-xl bg-white/5 ${colors.text} flex items-center justify-center flex-shrink-0 brightness-125 border border-white/10 shadow-inner`}>
                      <BadgeIcon size={16} />
                    </div>
                    <div className="text-[10px] leading-tight">
                      <div className="font-black text-slate-200">{badge.label}</div>
                      <div className="text-slate-400 font-bold mt-0.5">{badge.sub}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Hero - Product Illustration Card */}
          <div className="lg:w-[44%] w-full relative">
            <div className="w-full aspect-[4/3] rounded-[2rem] overflow-hidden shadow-2xl border border-slate-700 relative group">
              <img src={data.bgImg} alt={data.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/50 to-transparent pointer-events-none" />
            </div>
            
            <div className="absolute -bottom-6 -left-6 bg-slate-900 rounded-2xl p-4 shadow-2xl border border-slate-700 flex items-center gap-3 animate-float">
              <div className="w-9 h-9 rounded-full bg-green-500/20 text-green-400 flex items-center justify-center border border-green-500/20">
                <CheckCircle2 size={20} />
              </div>
              <div>
                <div className="text-[10px] text-slate-400 font-bold">Advisory Trust</div>
                <div className="text-xs font-black text-white">IRDAI Registered Partner</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Layout with Navigation Outline */}
      <div className="max-w-[1280px] mx-auto px-6 sm:px-8 lg:px-16 py-12 flex flex-col lg:flex-row gap-12">
        
        {/* Left Side: Table of Contents Outline (Desktop sticky sidebar) */}
        <div className="hidden lg:block lg:w-[22%] flex-shrink-0">
          <div className="sticky top-6 bg-white border border-slate-200 rounded-3xl p-5 shadow-sm space-y-4">
            <p className="text-[10px] font-black uppercase tracking-wider text-slate-400">Page Navigation</p>
            <nav className="flex flex-col gap-2.5">
              {[
                { id: 'about', label: 'Overview' },
                { id: 'types', label: 'Plan Variants' },
                { id: 'features', label: 'Key Features' },
                { id: 'coverage', label: 'Inclusions & Exclusions' },
                { id: 'timeline', label: 'Claims Journey' },
                { id: 'factors', label: 'Premium Rules' },
                { id: 'glossary', label: 'Terms explained' },
                { id: 'faqs', label: 'Frequently Asked' },
                { id: 'seo', label: 'SEO Resources' }
              ].map(item => (
                <a 
                  key={item.id} 
                  href={`#${item.id}`} 
                  className={`text-[12px] font-bold text-slate-600 hover:text-teal-600 transition-colors flex items-center gap-1.5`}
                >
                  <span className="w-1 h-1 rounded-full bg-slate-300"></span> {item.label}
                </a>
              ))}
            </nav>
            <div className="pt-4 border-t border-slate-100 flex flex-col gap-2">
              <button onClick={() => setIsModalOpen(true)} className={`w-full py-2.5 px-4 rounded-xl text-white font-black text-[11px] ${colors.bg} ${colors.hover} transition-colors shadow-sm`}>
                Request Quote
              </button>
            </div>
          </div>
        </div>

        {/* Right Side: Detailed Sections */}
        <div className="w-full lg:w-[78%] space-y-16">
          
          {/* ─── 2. WHAT IS THIS INSURANCE? ────────────────────────────────── */}
          <div id="about" className="bg-white border border-slate-200 rounded-[2rem] p-6 md:p-8 shadow-sm space-y-6 scroll-mt-6">
            <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
              <div className={`w-10 h-10 rounded-xl ${colors.light} ${colors.text} flex items-center justify-center`}>
                <Info size={20} />
              </div>
              <div>
                <h2 className="text-xl md:text-2xl font-black text-slate-800">Understanding {data.title}</h2>
                <p className="text-[11px] text-slate-400 font-bold uppercase tracking-wider">Product Overview</p>
              </div>
            </div>
            
            <p className="text-xs md:text-sm text-slate-600 font-semibold leading-relaxed">
              {data.whatIs}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-4">
              <div className="p-5 rounded-2xl bg-teal-50/50 border border-teal-100/50 space-y-2">
                <h4 className="text-xs font-black text-teal-900 uppercase tracking-wide">Why it is Critical</h4>
                <p className="text-[11px] text-teal-800 font-bold leading-relaxed">{data.whyImportant}</p>
              </div>
              <div className="p-5 rounded-2xl bg-amber-50/50 border border-amber-100/50 space-y-2">
                <h4 className="text-xs font-black text-amber-900 uppercase tracking-wide">Who Should Buy It</h4>
                <p className="text-[11px] text-amber-800 font-bold leading-relaxed">{data.whoShouldBuy}</p>
              </div>
            </div>
          </div>

          {/* ─── 3. TYPES OF INSURANCE ────────────────────────────────────────── */}
          <div id="types" className="space-y-6 scroll-mt-6">
            <div className="space-y-1">
              <h2 className="text-2xl font-black text-slate-800">Different Types of Plans Available</h2>
              <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">Plan Variants & Coverage Scope</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {data.variants && data.variants.map((v, idx) => (
                <div key={idx} className="bg-white border border-slate-200 hover:border-teal-500 rounded-3xl p-6 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between">
                  <div className="space-y-3">
                    <div className="inline-flex px-2.5 py-1 rounded-lg bg-slate-50 text-[10px] font-black uppercase text-slate-500 border border-slate-100">
                      Option 0{idx+1}
                    </div>
                    <h3 className="text-sm font-black text-slate-800">{v.name}</h3>
                    <p className="text-[11px] text-slate-500 font-semibold leading-relaxed">{v.desc}</p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-slate-50 bg-slate-50/70 p-3 rounded-xl">
                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-wider">Example Scenario</p>
                    <p className="text-[10px] text-slate-600 font-bold mt-1 leading-snug">{v.example}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ─── 4. KEY FEATURES ────────────────────────────────────────────── */}
          <div id="features" className="bg-[#0c1b33] text-white rounded-[2rem] p-8 relative overflow-hidden scroll-mt-6 shadow-xl">
            <div className="absolute top-0 right-0 w-72 h-72 bg-teal-500/10 rounded-full blur-[100px] pointer-events-none"></div>
            <div className="relative z-10 space-y-8">
              <div className="space-y-1 border-b border-white/10 pb-4">
                <span className="text-[10px] font-black text-teal-400 uppercase tracking-wider">Security Benefits</span>
                <h2 className="text-2xl font-black text-white">Policy Highlights & Features</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {data.features && data.features.map((f, idx) => (
                  <div key={idx} className="flex gap-4 p-4 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
                    <div className="w-8 h-8 rounded-lg bg-teal-500/20 text-teal-400 flex items-center justify-center flex-shrink-0">
                      <Star size={16} />
                    </div>
                    <div className="space-y-1">
                      <h4 className="text-[13px] font-black text-white">{f.title}</h4>
                      <p className="text-[11px] text-slate-300 font-semibold leading-relaxed">{f.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ─── 5 & 6. WHAT IS COVERED & WHAT IS NOT COVERED ───────────────── */}
          <div id="coverage" className="grid grid-cols-1 md:grid-cols-2 gap-8 scroll-mt-6">
            
            {/* Covered */}
            <div className="bg-white border border-green-200 shadow-xl shadow-green-50/50 rounded-[2rem] p-6 md:p-8 space-y-6">
              <div className="flex items-center gap-3 border-b border-green-100 pb-4">
                <div className="w-10 h-10 rounded-xl bg-green-50 text-green-600 flex items-center justify-center">
                  <CheckCircle2 size={22} />
                </div>
                <div>
                  <h3 className="text-lg font-black text-slate-800">What is Covered?</h3>
                  <p className="text-[9px] text-green-600 font-bold uppercase tracking-wider">Inclusions</p>
                </div>
              </div>
              <ul className="space-y-3.5">
                {data.covered && data.covered.map((item, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-xs text-slate-600 font-semibold leading-snug">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500 mt-1.5 flex-shrink-0"></span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Exclusions */}
            <div className="bg-white border border-red-200 shadow-xl shadow-red-50/50 rounded-[2rem] p-6 md:p-8 space-y-6">
              <div className="flex items-center gap-3 border-b border-red-100 pb-4">
                <div className="w-10 h-10 rounded-xl bg-red-50 text-red-600 flex items-center justify-center">
                  <AlertTriangle size={22} />
                </div>
                <div>
                  <h3 className="text-lg font-black text-slate-800">What is Not Covered?</h3>
                  <p className="text-[9px] text-red-600 font-bold uppercase tracking-wider">Exclusions & Limits</p>
                </div>
              </div>
              <ul className="space-y-3.5">
                {data.notCovered && data.notCovered.map((item, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-xs text-slate-600 font-semibold leading-snug">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-500 mt-1.5 flex-shrink-0"></span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* ─── 7. CLAIM PROCESS TIMELINE ─────────────────────────────────── */}
          <div id="timeline" className="bg-white border border-slate-200 rounded-[2rem] p-6 md:p-8 shadow-sm space-y-8 scroll-mt-6">
            <div className="space-y-1 text-center max-w-lg mx-auto">
              <h2 className="text-2xl font-black text-slate-800">Hassle-Free Claims Guide</h2>
              <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">Step by step settlement timeline</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-5 gap-6 relative">
              {data.claimTimeline && data.claimTimeline.map((step, idx) => (
                <div key={idx} className="text-center space-y-3 relative group">
                  <div className={`w-12 h-12 rounded-full ${colors.bg} text-white flex items-center justify-center font-black mx-auto text-sm shadow-md border-2 border-white relative z-10`}>
                    {step.step}
                  </div>
                  <h4 className="font-black text-slate-800 text-[13px] leading-tight">{step.title}</h4>
                  <p className="text-[10px] text-slate-400 font-bold max-w-[130px] mx-auto leading-relaxed">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* ─── 8. COMMON CLAIM REJECTION REASONS ─────────────────────────── */}
          <div className="space-y-6">
            <div className="space-y-1">
              <h2 className="text-2xl font-black text-slate-800">Common Claim Rejection Reasons</h2>
              <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">Things to watch out for to prevent dispute</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {data.rejectionReasons && data.rejectionReasons.map((item, idx) => (
                <div key={idx} className="p-5 bg-white border border-slate-200 rounded-2xl flex items-start gap-4">
                  <div className="w-8 h-8 rounded-lg bg-red-50 text-red-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <X size={15} />
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-[13px] font-black text-slate-800">{item.reason}</h4>
                    <p className="text-[11px] text-slate-400 font-semibold leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ─── 9. PREMIUM CALCULATION FACTORS ───────────────────────────── */}
          <div id="factors" className="space-y-6 scroll-mt-6">
            <div className="space-y-1">
              <h2 className="text-2xl font-black text-slate-800">Premium Calculation Factors</h2>
              <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">What drives your premium costs?</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {data.premiumFactors && data.premiumFactors.map((f, idx) => (
                <div key={idx} className="p-5 bg-white border border-slate-200 rounded-2xl space-y-1.5 shadow-sm">
                  <h4 className="text-[13px] font-black text-slate-800 flex items-center gap-1.5">
                    <span className={`w-2 h-2 rounded-full ${colors.bg}`}></span> {f.factor}
                  </h4>
                  <p className="text-[11px] text-slate-400 font-semibold leading-relaxed pl-3.5">
                    {f.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* ─── 10. IMPORTANT INSURANCE TERMS ──────────────────────────────── */}
          <div id="glossary" className="bg-slate-50 border border-slate-200 rounded-[2rem] p-6 md:p-8 space-y-6 scroll-mt-6">
            <div className="space-y-1 pb-3 border-b border-slate-200">
              <h2 className="text-xl font-black text-slate-800">Important Policy Jargon Explained</h2>
              <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">Glossary & Terms</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {data.terms && data.terms.map((item, idx) => (
                <div key={idx} className="space-y-1">
                  <h4 className="text-[12px] font-black text-slate-800 uppercase tracking-wider">{item.term}</h4>
                  <p className="text-[11px] text-slate-500 font-semibold leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* ─── 11. DOCUMENTS REQUIRED ──────────────────────────────────────── */}
          <div className="bg-white border border-slate-200 rounded-[2rem] p-6 md:p-8 shadow-sm space-y-6">
            <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
              <div className={`w-10 h-10 rounded-xl ${colors.light} ${colors.text} flex items-center justify-center`}>
                <ClipboardCheck size={20} />
              </div>
              <div>
                <h3 className="text-lg font-black text-slate-800">Documents Required for Purchase/Claims</h3>
                <p className="text-[9px] text-slate-400 font-bold uppercase tracking-wider">Required documentation list</p>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {data.documents && data.documents.map((docItem, idx) => (
                <div key={idx} className="flex items-center gap-2.5 py-2 px-3 bg-slate-50 rounded-xl border border-slate-100 text-xs font-bold text-slate-700">
                  <CheckCircle2 size={14} className="text-teal-600 flex-shrink-0" />
                  <span>{docItem}</span>
                </div>
              ))}
            </div>
          </div>

          {/* ─── 12. FAQS SECTION (MIN 15 FAQS) ─────────────────────────────── */}
          <div id="faqs" className="space-y-6 scroll-mt-6">
            <div className="space-y-1 text-center max-w-lg mx-auto">
              <h2 className="text-2xl font-black text-slate-800">Frequently Asked Questions</h2>
              <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">Clearing your doubts & queries</p>
            </div>

            <div className="space-y-3">
              {data.faqs && data.faqs.map((faq, idx) => (
                <FAQAccordionItem 
                  key={idx} 
                  faq={faq} 
                  index={idx} 
                  activeIndex={activeFaq} 
                  setActiveIndex={setActiveFaq} 
                  textCls={colors.text}
                />
              ))}
            </div>
          </div>

          {/* ─── 13. WHY CHOOSE POLICYPERFECT ─────────────────────────────── */}
          <div className="bg-gradient-to-br from-[#0c1b33] to-slate-900 text-white rounded-[2rem] p-8 md:p-10 relative overflow-hidden shadow-xl">
            <div className="absolute top-0 right-0 w-80 h-80 bg-teal-500/10 rounded-full blur-[100px] pointer-events-none"></div>
            <div className="relative z-10 space-y-8">
              <div className="text-center max-w-md mx-auto space-y-2">
                <span className="text-[10px] font-black text-teal-400 uppercase tracking-widest">Trust PolicyPerfect</span>
                <h3 className="text-2xl md:text-3xl font-black">Why India Trusts PolicyPerfect</h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                {[
                  { title: "Expert Advisors", desc: "Expert certified telecallers allocated to customize plans for your budget.", icon: Award },
                  { title: "25+ Insurers", desc: "Compare rates from all top providers side by side.", icon: ClipboardCheck },
                  { title: "Claim Support", desc: "Free 24x7 helpdesk backing you during hospitalizations.", icon: Shield },
                  { title: "Renewal Alerts", desc: "Automated tracking for seamless continuation of benefits.", icon: Clock }
                ].map((item, idx) => {
                  const CardIcon = item.icon;
                  return (
                    <div key={idx} className="space-y-2.5 p-4 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
                      <div className="w-8 h-8 rounded-lg bg-teal-500/20 text-teal-400 flex items-center justify-center">
                        <CardIcon size={16} />
                      </div>
                      <h4 className="font-black text-white text-[13px]">{item.title}</h4>
                      <p className="text-[10px] text-slate-300 font-bold leading-relaxed">{item.desc}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* ─── 14. RELATED INSURANCE PRODUCTS ────────────────────────────── */}
          <div className="space-y-6">
            <div className="space-y-1">
              <h2 className="text-xl font-black text-slate-800">Related Insurance Solutions</h2>
              <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">Explore other customized plans</p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {relatedProducts.map(p => {
                const CardIcon = p.icon || Shield;
                return (
                  <Link 
                    key={p.id} 
                    to={`/product/${p.id}`}
                    className="p-4 bg-white border border-slate-200 hover:border-teal-500 rounded-2xl flex flex-col items-center text-center gap-2.5 group shadow-sm hover:shadow transition-all"
                  >
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all bg-slate-50 text-slate-600 group-hover:scale-105 group-hover:shadow`}>
                      <CardIcon size={18} />
                    </div>
                    <span className="text-[11px] font-black text-slate-700 group-hover:text-teal-600 leading-tight">
                      {p.title}
                    </span>
                  </Link>
                );
              })}
            </div>
          </div>

          {/* ─── 15. LEAD GENERATION CTA ────────────────────────────────────── */}
          <div className="bg-[#f0fdfa] border border-teal-200 rounded-[2rem] p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm">
            <div className="space-y-2 max-w-md">
              <span className="text-[9px] font-black text-teal-600 uppercase tracking-widest">Get Insured Today</span>
              <h3 className="text-xl md:text-2xl font-black text-teal-950">Have questions? Get a free advisory session now!</h3>
              <p className="text-xs text-teal-700 font-semibold">Our expert advisors will guide you to pick the right sum insured.</p>
            </div>

            <div className="flex flex-wrap gap-3.5 w-full md:w-auto">
              <button 
                onClick={() => setIsModalOpen(true)}
                className={`flex-1 md:flex-initial flex items-center justify-center gap-1.5 py-3 px-6 rounded-xl text-white font-black text-xs bg-teal-600 hover:bg-teal-700 cursor-pointer shadow-md`}
              >
                Free Consultation
              </button>
              <button 
                onClick={() => {
                  const text = encodeURIComponent(`Hi, I'm interested in details of ${data.title}. Please call me.`);
                  window.open(`https://wa.me/917574948768?text=${text}`, '_blank');
                }}
                className="flex-1 md:flex-initial flex items-center justify-center gap-1.5 py-3 px-6 rounded-xl text-white font-black text-xs bg-[#25d366] hover:bg-[#20ba5a] cursor-pointer shadow-md"
              >
                <MessageSquare size={14} /> WhatsApp
              </button>
            </div>
          </div>

          {/* ─── 16. SEO DETAILED SECTION ─────────────────────────────────── */}
          <div id="seo" className="border-t border-slate-200 pt-10 space-y-6 scroll-mt-6">
            <div className="space-y-1">
              <h2 className="text-sm font-black text-slate-800 uppercase tracking-wider">Extended Information & Resources</h2>
              <p className="text-[11px] text-slate-400 font-bold uppercase tracking-wider">Complete SEO Overview & References</p>
            </div>

            <div className="prose prose-sm max-w-none text-xs text-slate-500 font-semibold leading-relaxed space-y-4">
              <p>
                {data.seoContent}
              </p>
              <p>
                When comparing plans on PolicyPerfect, you benefit from transparent pricing directly matching IRDAI directives. We assist you in calculating key benefits like the No-Claim Bonus (NCB), evaluating co-payment clauses in senior health policies, and understanding exclusions under fire and property damage rules. Compare multiple insurers side-by-side to make an informed, hassle-free decision.
              </p>
            </div>
          </div>

        </div>

      </div>

      <PartnerLogos />

      <TrustSection />

      {/* Slide-in Dynamic Quote Drawer */}
      <ProductQuoteModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        productType={activeKey}
      />
    </div>
  );
};

export default ProductDetail;
