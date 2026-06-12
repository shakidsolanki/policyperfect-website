import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, Shield, Zap, FileText, ChevronDown, PhoneCall, Star, ArrowRight } from 'lucide-react';

export const PartnerLogos = () => {
  const logos = [
    { name: 'HDFC Ergo', color1: '#ed1c24', color2: '#004b8f', text: ['HDFC', 'ERGO'] },
    { name: 'SBI General', color1: '#004e9c', color2: '#64748b', text: ['SBI', 'General'] },
    { name: 'ICICI Lombard', color1: '#f15a22', color2: '#0f3b7b', text: ['ICICI', 'Lombard'] },
    { name: 'Bajaj Allianz', color1: '#005eb8', color2: '#005eb8', text: ['Bajaj', 'Allianz'] },
    { name: 'Star Health', color1: '#0033a0', color2: '#e31837', text: ['Star', 'Health'] },
    { name: 'Care Insurance', color1: '#00529b', color2: '#00529b', text: ['Care', 'Insurance'] },
    { name: 'New India', color1: '#0c1b33', color2: '#dfb15b', text: ['New', 'India'] },
    { name: 'Oriental Insurance', color1: '#006341', color2: '#006341', text: ['Oriental', 'Insurance'] },
  ];

  // Duplicate for seamless marquee
  const marqueeLogos = [...logos, ...logos];

  return (
    <section className="py-10 bg-slate-50 border-y border-slate-100 overflow-hidden">
      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 mb-5">
        <p className="text-center text-[11px] font-black text-slate-400 uppercase tracking-widest">
          Trusted by India's Leading Insurers
        </p>
      </div>
      <div className="relative">
        <div className="flex animate-marquee gap-8 w-max">
          {marqueeLogos.map((logo, idx) => (
            <div
              key={idx}
              className="flex-shrink-0 bg-white rounded-xl px-5 py-3 shadow-sm border border-slate-100 flex items-center gap-1.5 hover:shadow-md transition-shadow cursor-pointer"
            >
              <span className="text-[15px] font-black" style={{ color: logo.color1 }}>{logo.text[0]}</span>
              <span className="text-[15px] font-black" style={{ color: logo.color2 }}>{logo.text[1]}</span>
            </div>
          ))}
        </div>
        {/* Fade edges */}
        <div className="absolute left-0 top-0 h-full w-20 bg-gradient-to-r from-slate-50 to-transparent pointer-events-none z-10" />
        <div className="absolute right-0 top-0 h-full w-20 bg-gradient-to-l from-slate-50 to-transparent pointer-events-none z-10" />
      </div>
    </section>
  );
};

export const WhyChooseUs = () => {
  const features = [
    {
      icon: Zap,
      title: 'Instant Policy Issuance',
      desc: 'No paperwork, no waiting. Get your policy document in your inbox within 2 minutes of payment.',
      iconColor: '#f59e0b',
      bg: '#fffbeb',
      border: '#fde68a',
    },
    {
      icon: Shield,
      title: 'Zero Hidden Charges',
      desc: 'What you see is what you pay. Complete transparency in all premiums — no surprise fees ever.',
      iconColor: '#0d9488',
      bg: '#f0fdfa',
      border: '#99f6e4',
    },
    {
      icon: FileText,
      title: 'Easy Claim Settlement',
      desc: 'Dedicated claim support team available 24x7 to guide you through every step of the claim process.',
      iconColor: '#3b82f6',
      bg: '#eff6ff',
      border: '#bfdbfe',
    },
    {
      icon: CheckCircle2,
      title: 'IRDAI Registered',
      desc: 'Fully compliant, government-registered insurance broker. Your coverage is legally protected.',
      iconColor: '#10b981',
      bg: '#ecfdf5',
      border: '#a7f3d0',
    },
  ];

  return (
    <section className="py-16 sm:py-20 bg-white">
      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <p className="text-[11px] font-black text-teal-600 uppercase tracking-widest mb-3">Why Choose Us</p>
          <h2 className="text-[26px] sm:text-[32px] font-black text-slate-900 mb-4">Why Policy Perfect?</h2>
          <p className="text-slate-500 text-[15px] leading-relaxed">
            We simplify insurance so you can focus on what matters most — experience the fastest, most reliable platform.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {features.map((feature, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.12 }}
              className="group relative bg-white rounded-3xl p-6 border hover:shadow-xl transition-all duration-300 card-hover"
              style={{ borderColor: feature.border }}
            >
              <div
                className="w-12 h-12 rounded-2xl flex items-center justify-center mb-5"
                style={{ backgroundColor: feature.bg }}
              >
                <feature.icon size={22} style={{ color: feature.iconColor }} strokeWidth={2} />
              </div>
              <h3 className="text-[15px] font-black text-slate-900 mb-2.5">{feature.title}</h3>
              <p className="text-slate-500 leading-relaxed text-[13px]">{feature.desc}</p>

              {/* Bottom accent line */}
              <div
                className="absolute bottom-0 left-6 right-6 h-0.5 rounded-full scale-x-0 group-hover:scale-x-100 transition-transform duration-300"
                style={{ backgroundColor: feature.iconColor }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export const FAQ = () => {
  const faqs = [
    { q: 'How long does it take to get a policy?', a: 'With our digital process, you can receive your policy instantly via email within 5 minutes of completing your payment.' },
    { q: 'Are there any hidden charges?', a: 'Absolutely not. We believe in 100% transparency. The premium you see is the final amount you pay — no surprises.' },
    { q: 'How do I renew my old policy?', a: 'Simply click on "Renew Policy" at the top, enter your old policy number, and renew it in under 2 minutes.' },
    { q: 'Can I cancel my policy and get a refund?', a: 'Yes, most policies come with a free-look period (usually 15 days) during which you can cancel for a full refund.' },
    { q: 'How do I file a claim?', a: 'You can file a claim through our website, call our 24x7 helpline, or use the Customer Portal. Our team will guide you step by step.' },
  ];

  const [openIdx, setOpenIdx] = useState(0);

  return (
    <section className="py-16 sm:py-20 bg-slate-50">
      <div className="max-w-[780px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <p className="text-[11px] font-black text-teal-600 uppercase tracking-widest mb-3">FAQs</p>
          <h2 className="text-[26px] sm:text-[32px] font-black text-slate-900 mb-3">Frequently Asked Questions</h2>
          <p className="text-slate-500 text-[14px]">Got questions? We've got answers.</p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => (
            <div
              key={idx}
              className={`rounded-2xl overflow-hidden border transition-all duration-200 ${
                openIdx === idx
                  ? 'border-teal-300 bg-white shadow-md'
                  : 'border-slate-200 bg-white hover:border-teal-200'
              }`}
            >
              <button
                onClick={() => setOpenIdx(openIdx === idx ? -1 : idx)}
                className="w-full px-5 py-4 flex items-center justify-between text-left gap-4"
              >
                <span className={`font-bold text-[14px] sm:text-[15px] leading-snug ${
                  openIdx === idx ? 'text-teal-700' : 'text-slate-800'
                }`}>
                  {faq.q}
                </span>
                <div className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 transition-colors ${
                  openIdx === idx ? 'bg-teal-100 text-teal-600' : 'bg-slate-100 text-slate-500'
                }`}>
                  <ChevronDown size={16} className={`transition-transform duration-200 ${openIdx === idx ? 'rotate-180' : ''}`} />
                </div>
              </button>
              <AnimatePresence>
                {openIdx === idx && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="px-5 pb-4 text-slate-600 leading-relaxed text-[13px] sm:text-[14px] border-t border-teal-100 pt-3">
                      {faq.a}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export const Testimonials = () => {
  const reviews = [
    {
      name: 'Rahul Sharma',
      location: 'Mumbai',
      text: 'Policy Perfect made buying car insurance so easy. I saved almost 30% compared to my previous insurer. Highly recommended!',
      rating: 5,
      initial: 'R',
      color: '#3b82f6',
    },
    {
      name: 'Priya Patel',
      location: 'Ahmedabad',
      text: 'Their customer support is brilliant. They helped me settle my health insurance claim within 24 hours without any hassle.',
      rating: 5,
      initial: 'P',
      color: '#e11d48',
    },
    {
      name: 'Amit Kumar',
      location: 'Delhi',
      text: 'Very simple interface. I could compare 10 different life insurance policies in minutes. Completely transparent platform.',
      rating: 5,
      initial: 'A',
      color: '#10b981',
    },
  ];

  return (
    <section className="py-16 sm:py-20 bg-white border-t border-slate-100">
      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <p className="text-[11px] font-black text-teal-600 uppercase tracking-widest mb-3">Testimonials</p>
          <h2 className="text-[26px] sm:text-[32px] font-black text-slate-900 mb-3">What Our Customers Say</h2>
          <p className="text-slate-500 text-[14px]">Don't just take our word for it — here's what thousands of happy customers think.</p>
        </div>

        <div className="grid sm:grid-cols-3 gap-5">
          {reviews.map((review, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.15 }}
              className="bg-white p-6 rounded-3xl border border-slate-100 hover:shadow-xl transition-all hover:border-teal-200 card-hover"
            >
              {/* Stars */}
              <div className="flex gap-0.5 mb-4">
                {[...Array(review.rating)].map((_, i) => (
                  <Star key={i} size={14} className="fill-amber-400 text-amber-400" />
                ))}
              </div>
              <p className="text-slate-600 text-[13px] leading-relaxed mb-5 italic">"{review.text}"</p>
              <div className="flex items-center gap-3 pt-4 border-t border-slate-100">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center text-white text-[14px] font-black flex-shrink-0"
                  style={{ backgroundColor: review.color }}
                >
                  {review.initial}
                </div>
                <div>
                  <div className="text-[14px] font-black text-slate-800">{review.name}</div>
                  <div className="text-[11px] text-slate-400 font-semibold">{review.location}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export const AppDownload = () => {
  return (
    <section className="py-12 bg-slate-50 border-t border-slate-100">
      <div className="max-w-[1100px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-[#0c1b33] to-[#0d2b50] rounded-[2rem] p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-10 relative overflow-hidden">
          {/* Background glow */}
          <div className="absolute top-0 right-0 w-72 h-72 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-blue-500/10 rounded-full blur-2xl pointer-events-none" />

          <div className="md:w-1/2 relative z-10 text-center md:text-left">
            <div className="inline-flex items-center gap-2 bg-teal-500/15 border border-teal-500/25 px-3 py-1.5 rounded-full mb-5">
              <div className="w-2 h-2 rounded-full bg-teal-400 animate-pulse" />
              <span className="text-[11px] font-bold text-teal-300 uppercase tracking-wider">Coming Soon</span>
            </div>
            <h2 className="text-[24px] md:text-[30px] font-black text-white mb-4 leading-tight">
              Get the Policy Perfect App
            </h2>
            <p className="text-slate-400 text-[14px] mb-7 leading-relaxed">
              Manage policies, track claims, and get instant support from your pocket. Download and get exclusive app-only discounts.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-3">
              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                className="w-full sm:w-auto bg-white text-slate-900 px-5 py-3 rounded-xl flex items-center gap-3 hover:bg-slate-100 transition-colors font-semibold text-[13px]"
              >
                <div>
                  <div className="text-[9px] uppercase tracking-wider text-slate-400 font-black">Download on the</div>
                  <div className="text-[14px] font-black text-slate-900">App Store</div>
                </div>
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                className="w-full sm:w-auto bg-white text-slate-900 px-5 py-3 rounded-xl flex items-center gap-3 hover:bg-slate-100 transition-colors font-semibold text-[13px]"
              >
                <div>
                  <div className="text-[9px] uppercase tracking-wider text-slate-400 font-black">GET IT ON</div>
                  <div className="text-[14px] font-black text-slate-900">Google Play</div>
                </div>
              </motion.button>
            </div>
          </div>

          {/* Phone mockup */}
          <div className="md:w-[30%] relative z-10 hidden md:flex justify-center">
            <div className="w-[160px] aspect-[9/18] bg-slate-900 rounded-[2rem] border-4 border-slate-800 shadow-2xl overflow-hidden relative">
              <div className="absolute top-3 left-1/2 -translate-x-1/2 w-16 h-4 bg-slate-800 rounded-b-xl z-20" />
              <img
                src="https://images.unsplash.com/photo-1616469829581-73993eb86b02?auto=format&fit=crop&q=80&w=400"
                alt="App Preview"
                className="w-full h-full object-cover opacity-70"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export const CTASection = () => {
  const [contact, setContact] = React.useState({});
  React.useEffect(() => {
    try { setContact(db.getContact()); } catch(e){}
  }, []);

  return (
    <section className="py-16 sm:py-20 bg-gradient-to-br from-[#0d9488] via-[#0f766e] to-[#115e59] text-center relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-64 h-64 bg-white/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-48 h-48 bg-white/5 rounded-full blur-2xl" />
      </div>
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <p className="text-[11px] font-black text-teal-200 uppercase tracking-widest mb-4">Ready to Get Started?</p>
        <h2 className="text-[28px] sm:text-[36px] font-black text-white mb-5 leading-tight">
          Secure Your Future Today
        </h2>
        <p className="text-teal-100 text-[15px] mb-9 leading-relaxed">
          Join over 2 Lakh+ Indians who trust Policy Perfect. Get a quote in less than 2 minutes.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            className="flex items-center gap-2 bg-white text-teal-700 px-8 py-3.5 rounded-xl font-black text-[15px] hover:bg-teal-50 transition-colors shadow-xl"
          >
            Get Free Quote <ArrowRight size={18} />
          </motion.button>
          <a href={`tel:${contact?.phone?.replace(/\s+/g, '') || '+917574948768'}`} className="flex items-center gap-2 text-teal-100 font-bold text-[14px] hover:text-white transition-colors">
            <PhoneCall size={16} />
            Call {contact?.phone || '+91 75749 48768'}
          </a>
        </div>
      </div>
    </section>
  );
};
