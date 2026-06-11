import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, Shield, Zap, FileText, ChevronDown, PhoneCall, Star } from 'lucide-react';

export const PartnerLogos = () => {
  const logos = [
    { name: 'HDFC Ergo', text: <><span className="text-[#ed1c24]">HDFC</span> <span className="text-[#004b8f]">ERGO</span></> },
    { name: 'SBI General', text: <><span className="text-[#004e9c] font-extrabold">SBI</span> <span className="text-slate-700">General</span></> },
    { name: 'ICICI Lombard', text: <><span className="text-[#f15a22]">ICICI</span> <span className="text-[#0f3b7b]">Lombard</span></> },
    { name: 'Bajaj Allianz', text: <span className="text-[#005eb8]">Bajaj Allianz</span> },
    { name: 'Star Health', text: <><span className="text-[#0033a0]">Star</span> <span className="text-[#e31837]">Health</span></> },
    { name: 'Care Insurance', text: <span className="text-[#00529b]">Care Insurance</span> },
  ];

  return (
    <section className="py-12 bg-white border-y border-slate-100">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-center text-sm font-bold text-slate-400 uppercase tracking-widest mb-8">Trusted by India's Top Insurers</p>
        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16">
          {logos.map((logo, idx) => (
            <div key={idx} className="text-2xl font-black transition-transform hover:scale-105 cursor-pointer">
              {logo.text}
            </div>
          ))}
        </div>
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
      color: 'text-yellow-500',
      bg: 'bg-yellow-50'
    },
    {
      icon: Shield,
      title: 'Zero Hidden Charges',
      desc: 'What you see is what you pay. We guarantee complete transparency in all our insurance premiums.',
      color: 'text-green-500',
      bg: 'bg-green-50'
    },
    {
      icon: FileText,
      title: 'Easy Claim Settlement',
      desc: 'Dedicated claim support team available 24x7 to assist you through the entire claim process seamlessly.',
      color: 'text-blue-500',
      bg: 'bg-blue-50'
    }
  ];

  return (
    <section className="py-20 bg-slate-50">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-black text-slate-800 mb-4">Why Choose Policy Perfect?</h2>
          <p className="text-slate-500 text-lg">We simplify insurance so you can focus on what matters most. Experience the fastest, most reliable insurance platform.</p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.2 }}
              className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl transition-shadow border border-slate-100"
            >
              <div className={`w-14 h-14 rounded-xl ${feature.bg} flex items-center justify-center mb-6`}>
                <feature.icon size={28} className={feature.color} />
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-3">{feature.title}</h3>
              <p className="text-slate-500 leading-relaxed">{feature.desc}</p>
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
    { q: 'Are there any hidden charges?', a: 'Absolutely not. We believe in 100% transparency. The premium you see is the final amount you pay.' },
    { q: 'How do I renew my old policy?', a: 'Simply click on the "Renew Policy" button at the top, enter your old policy number, and you can renew it in 2 minutes.' },
    { q: 'Can I cancel my policy and get a refund?', a: 'Yes, most policies come with a free-look period (usually 15 days) during which you can cancel for a refund.' }
  ];

  const [openIdx, setOpenIdx] = useState(0);

  return (
    <section className="py-20 bg-white">
      <div className="max-w-[800px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-black text-slate-800 mb-4">Frequently Asked Questions</h2>
          <p className="text-slate-500">Got questions? We've got answers.</p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <div 
              key={idx} 
              className={`border rounded-2xl overflow-hidden transition-colors ${openIdx === idx ? 'border-blue-500 bg-blue-50' : 'border-slate-200 bg-white'}`}
            >
              <motion.button 
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                onClick={() => setOpenIdx(openIdx === idx ? -1 : idx)}
                className="w-full px-6 py-5 flex items-center justify-between text-left"
              >
                <span className={`font-bold text-lg ${openIdx === idx ? 'text-blue-700' : 'text-slate-800'}`}>{faq.q}</span>
                <ChevronDown size={20} className={`transform transition-transform ${openIdx === idx ? 'rotate-180 text-blue-700' : 'text-slate-400'}`} />
              </motion.button>
              <AnimatePresence>
                {openIdx === idx && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                  >
                    <div className="px-6 pb-5 text-slate-600 leading-relaxed">
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
    { name: 'Rahul Sharma', location: 'Mumbai', text: 'Policy Perfect made buying car insurance so easy. I saved almost 30% compared to my previous insurer. Highly recommended!', rating: 5 },
    { name: 'Priya Patel', location: 'Ahmedabad', text: 'Their customer support is brilliant. They helped me settle my health insurance claim within 24 hours without any hassle.', rating: 5 },
    { name: 'Amit Kumar', location: 'Delhi', text: 'The interface is very simple. I could compare 10 different life insurance policies in minutes. Very transparent platform.', rating: 5 }
  ];

  return (
    <section className="py-20 bg-slate-50 border-t border-slate-100">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-black text-slate-800 mb-4">What Our Customers Say</h2>
          <p className="text-slate-500 text-lg">Don't just take our word for it. Here is what thousands of happy customers have to say about us.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {reviews.map((review, idx) => (
            <div key={idx} className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-xl transition-shadow">
              <div className="flex text-yellow-400 mb-4">
                {[...Array(review.rating)].map((_, i) => <Star key={i} size={18} className="fill-current" />)}
              </div>
              <p className="text-slate-600 italic mb-6">"{review.text}"</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-[#1e3a8a] font-bold">
                  {review.name.charAt(0)}
                </div>
                <div>
                  <div className="font-bold text-slate-800 text-sm">{review.name}</div>
                  <div className="text-xs text-slate-500">{review.location}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export const AppDownload = () => {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#1e3a8a] rounded-3xl p-8 md:p-16 flex flex-col md:flex-row items-center justify-between gap-12 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-700/30 rounded-full blur-3xl"></div>
          
          <div className="md:w-1/2 relative z-10 text-center md:text-left">
            <h2 className="text-3xl md:text-4xl font-black text-white mb-6">Get the Policy Perfect App</h2>
            <p className="text-blue-100 text-lg mb-8">Manage your policies, track claims, and get instant support right from your pocket. Download now and get exclusive app-only discounts.</p>
            <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-4">
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-black text-white px-6 py-3 rounded-xl flex items-center gap-3 hover:bg-slate-900 transition-colors w-full sm:w-auto justify-center"
              >
                <div className="text-left">
                  <div className="text-[10px] uppercase tracking-wider text-slate-400">Download on the</div>
                  <div className="text-sm font-bold">App Store</div>
                </div>
              </motion.button>
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-black text-white px-6 py-3 rounded-xl flex items-center gap-3 hover:bg-slate-900 transition-colors w-full sm:w-auto justify-center"
              >
                <div className="text-left">
                  <div className="text-[10px] uppercase tracking-wider text-slate-400">GET IT ON</div>
                  <div className="text-sm font-bold">Google Play</div>
                </div>
              </motion.button>
            </div>
          </div>
          <div className="md:w-1/3 relative z-10 hidden md:block">
            <div className="w-full aspect-[9/16] bg-slate-900 rounded-[2rem] border-8 border-slate-800 shadow-2xl overflow-hidden relative">
              <div className="absolute top-4 left-1/2 -translate-x-1/2 w-32 h-6 bg-slate-800 rounded-b-xl z-20"></div>
              <img src="https://images.unsplash.com/photo-1616469829581-73993eb86b02?auto=format&fit=crop&q=80&w=600" alt="App Preview" className="w-full h-full object-cover opacity-80" loading="lazy" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export const CTASection = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-slate-900 to-[#1c2237] text-center border-t border-slate-800">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-black text-white mb-6">Ready to secure your future?</h2>
        <p className="text-slate-400 text-lg mb-10">Join over 2 Lakh+ Indians who trust Policy Perfect for their insurance needs. Get a quote in less than 2 minutes.</p>
        <motion.button 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-blue-600 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-blue-500 transition-colors shadow-lg shadow-blue-900/50"
        >
          Get Started Now
        </motion.button>
      </div>
    </section>
  );
};

export const Footer = () => {
  return (
    <footer className="bg-[#1c2237] text-white pt-20 pb-10 border-t border-slate-800">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="md:col-span-1">
            <h3 className="text-2xl font-black text-white mb-4">Policy Perfect</h3>
            <p className="text-slate-400 text-sm leading-relaxed mb-6">
              Your trusted partner for all insurance needs. We make comparing and buying insurance simple, fast, and secure.
            </p>
            <div className="flex items-center gap-3">
              <PhoneCall size={20} className="text-blue-400" />
              <div>
                <div className="text-sm font-bold">+91 75749 48768</div>
                <div className="text-xs text-slate-500">24/7 Expert Support</div>
              </div>
            </div>
          </div>
          
          <div>
            <h4 className="text-lg font-bold mb-6 text-slate-200">Insurance</h4>
            <ul className="space-y-3">
              <li><a href="#" className="text-slate-400 hover:text-white text-sm transition-colors">Car Insurance</a></li>
              <li><a href="#" className="text-slate-400 hover:text-white text-sm transition-colors">Health Insurance</a></li>
              <li><a href="#" className="text-slate-400 hover:text-white text-sm transition-colors">Life Insurance</a></li>
              <li><a href="#" className="text-slate-400 hover:text-white text-sm transition-colors">Travel Insurance</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-6 text-slate-200">Quick Links</h4>
            <ul className="space-y-3">
              <li><a href="#" className="text-slate-400 hover:text-white text-sm transition-colors">About Us</a></li>
              <li><a href="#" className="text-slate-400 hover:text-white text-sm transition-colors">Contact Us</a></li>
              <li><a href="#" className="text-slate-400 hover:text-white text-sm transition-colors">Careers</a></li>
              <li><a href="#" className="text-slate-400 hover:text-white text-sm transition-colors">Blog</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-6 text-slate-200">Legal</h4>
            <ul className="space-y-3">
              <li><a href="#" className="text-slate-400 hover:text-white text-sm transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="text-slate-400 hover:text-white text-sm transition-colors">Terms of Service</a></li>
              <li><a href="#" className="text-slate-400 hover:text-white text-sm transition-colors">Disclaimer</a></li>
              <li><a href="#" className="text-slate-400 hover:text-white text-sm transition-colors">Fraud Prevention</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-slate-800 pt-8 text-center">
          <p className="text-slate-500 text-sm">
            © {new Date().getFullYear()} Policy Perfect Insurance. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};
