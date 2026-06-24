import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, Shield, Zap, FileText, ChevronDown, PhoneCall, Star, ArrowRight } from 'lucide-react';

export const PartnerLogos = () => {
  const logos = [
    { name: 'HDFC ERGO',     img: '/logos/hdfc_ergo.png',     h: 'h-8'  },
    { name: 'ICICI Lombard', img: '/logos/icici_lombard.png', h: 'h-11' },
    { name: 'Bajaj Allianz', img: 'https://www.bajajallianz.com/content/dam/bagic/bajajallianz/media/images/logo.svg', h: 'h-9', fallback: '/logos/bajaj_allianz.svg' },
    { name: 'Star Health',   img: '/logos/star_health.png',   h: 'h-8'  },
    { name: 'SBI General',   img: '/logos/sbi_general.png',   h: 'h-11' },
    { name: 'Tata AIG',      img: '/logos/tata_aig.png',      h: 'h-8'  },
    { name: 'New India',     img: '/logos/new_india.png',     h: 'h-8'  },
    { name: 'Niva Bupa',     img: '/logos/niva_bupa.png',     h: 'h-8'  },
    { name: 'Care Health',   img: '/logos/care_health.png',   h: 'h-8'  },
    { name: 'Zuno General',  img: '/logos/zuno_general.png',  h: 'h-8'  },
  ];

  const marqueeLogos = [...logos, ...logos];

  return (
    <section className="py-10 bg-slate-50 border-y border-slate-100 overflow-hidden">
      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 mb-6">
        <p className="text-center text-[11px] font-black text-slate-400 uppercase tracking-widest">
          Trusted by India's Leading Insurers
        </p>
      </div>
      <div className="relative">
        <div className="flex animate-marquee gap-12 w-max items-center">
          {marqueeLogos.map((logo, idx) => (
            <div key={idx} className="flex-shrink-0 flex items-center justify-center px-2">
              <img
                src={logo.img}
                alt={logo.name}
                className={`${logo.h} w-auto max-w-[130px] object-contain opacity-70 hover:opacity-100 transition-opacity duration-300`}
                onError={(e) => {
                  if (logo.fallback && e.target.src !== logo.fallback) {
                    e.target.src = logo.fallback;
                  } else {
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'flex';
                  }
                }}
              />
              <span
                className="items-center justify-center text-[12px] font-black tracking-tight text-slate-600"
                style={{ display: 'none' }}
              >
                {logo.name}
              </span>
            </div>
          ))}
        </div>
        <div className="absolute left-0 top-0 h-full w-24 bg-gradient-to-r from-white to-transparent pointer-events-none z-10" />
        <div className="absolute right-0 top-0 h-full w-24 bg-gradient-to-l from-white to-transparent pointer-events-none z-10" />
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
      desc: 'Fully compliant, government-registered insurance advisory platform. Your coverage is legally protected.',
      iconColor: '#10b981',
      bg: '#ecfdf5',
      border: '#a7f3d0',
    },
  ];

  return (
    <section className="relative overflow-hidden py-16 sm:py-20 bg-white">
      {/* Background gold outline icons */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <motion.div animate={{ y:[0,12,0], rotate:[0,10,0] }} transition={{ duration:6.2, repeat:Infinity, ease:'easeInOut' }}
          style={{ position:'absolute', top:'15%', right:'5%', opacity:0.18 }}
        >
          <Zap size={52} strokeWidth={1.2} style={{ color:'#dfb15b' }} />
        </motion.div>
        <motion.div animate={{ y:[0,-10,0], rotate:[0,-8,0] }} transition={{ duration:5.8, repeat:Infinity, ease:'easeInOut', delay:0.5 }}
          style={{ position:'absolute', bottom:'15%', left:'4%', opacity:0.22 }}
        >
          <Shield size={48} strokeWidth={1.2} style={{ color:'#dfb15b' }} />
        </motion.div>
      </div>

      <div className="relative z-10 max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
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
    <section className="relative overflow-hidden py-16 sm:py-20 bg-slate-50">
      {/* Background gold outline icons */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <motion.div animate={{ y:[0,-12,0], rotate:[0,8,0] }} transition={{ duration:6.8, repeat:Infinity, ease:'easeInOut' }}
          style={{ position:'absolute', top:'10%', left:'5%', opacity:0.18 }}
        >
          <FileText size={52} strokeWidth={1.2} style={{ color:'#dfb15b' }} />
        </motion.div>
        <motion.div animate={{ y:[0,10,0], rotate:[0,-10,0] }} transition={{ duration:6.0, repeat:Infinity, ease:'easeInOut', delay:0.5 }}
          style={{ position:'absolute', bottom:'15%', right:'5%', opacity:0.20 }}
        >
          <CheckCircle2 size={48} strokeWidth={1.2} style={{ color:'#dfb15b' }} />
        </motion.div>
      </div>

      <div className="relative z-10 max-w-[780px] mx-auto px-4 sm:px-6 lg:px-8">
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
    <section className="relative overflow-hidden py-16 sm:py-20 bg-white border-t border-slate-100">
      {/* Background gold outline icons */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <motion.div animate={{ y:[0,12,0], rotate:[0,15,0] }} transition={{ duration:6.5, repeat:Infinity, ease:'easeInOut' }}
          style={{ position:'absolute', top:'15%', left:'4%', opacity:0.18 }}
        >
          <Star size={48} strokeWidth={1.2} style={{ color:'#dfb15b' }} />
        </motion.div>
        <motion.div animate={{ y:[0,-10,0], rotate:[0,-12,0] }} transition={{ duration:5.5, repeat:Infinity, ease:'easeInOut', delay:0.5 }}
          style={{ position:'absolute', bottom:'15%', right:'5%', opacity:0.22 }}
        >
          <PhoneCall size={52} strokeWidth={1.2} style={{ color:'#dfb15b' }} />
        </motion.div>
      </div>

      <div className="relative z-10 max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
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



