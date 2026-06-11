import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  Car, Heart, TrendingUp, Plane, Home as HomeIcon, 
  Users, Shield, Star, Clock, Percent, ShieldCheck, X, ArrowRight
} from 'lucide-react';
import { PartnerLogos, WhyChooseUs, FAQ, Testimonials, AppDownload, CTASection } from '../components/HomeSections';
import SEO from '../components/SEO';

const Home = () => {
  const products = [
    { name: 'Motor', icon: Car, path: '/product/car', color: 'bg-[#3b82f6]' },
    { name: 'Health', icon: Heart, path: '/product/health', color: 'bg-[#e11d48]' },
    { name: 'Life', icon: TrendingUp, path: '/product/life', color: 'bg-[#10b981]' },
    { name: 'Travel', icon: Plane, path: '/product/travel', color: 'bg-[#0ea5e9]' },
    { name: 'Home', icon: HomeIcon, path: '/product/home', color: 'bg-[#ea580c]' },
  ];

  const allProducts = [
    ...products,
    { name: 'Cyber', icon: Shield, path: '/product/cyber', color: 'bg-[#8b5cf6]' },
    { name: 'Pet', icon: Heart, path: '/product/pet', color: 'bg-[#f59e0b]' },
    { name: 'Business', icon: Users, path: '/product/business', color: 'bg-[#64748b]' },
    { name: 'Two Wheeler', icon: Car, path: '/product/bike', color: 'bg-[#06b6d4]' },
  ];

  const [isModalOpen, setIsModalOpen] = useState(false);

  const stats = [
    { icon: Users, value: '2 Lakh+', label: 'Happy Customers' },
    { icon: Shield, value: '25+', label: 'Insurance Partners' },
    { icon: Star, value: '4.9/5', label: 'Customer Rating' },
    { icon: Clock, value: '5 Min', label: 'Instant Policy' }
  ];

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "PolicyPerfect",
    "url": "https://policyperfect.co.in",
    "logo": "https://policyperfect.co.in/logo.png",
    "description": "PolicyPerfect Insurance offers custom and affordable plans for Health, Life, Motor, Travel, and Home Insurance. Compare quotes and renew policies instantly online.",
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+91-99999-99999",
      "contactType": "customer service",
      "areaServed": "IN",
      "availableLanguage": ["en", "hi"]
    }
  };

  return (
    <div className="w-full min-h-screen bg-[#1c2237] font-sans overflow-x-hidden">
      <SEO 
        title="PolicyPerfect Insurance | Compare &amp; Buy Best Insurance Plans Online"
        description="Compare and buy cheap insurance policies instantly in India. PolicyPerfect offers Health, Life, Motor, Travel, and Cyber insurance. Get a free quote today!"
      />
      <script type="application/ld+json">
        {JSON.stringify(organizationSchema)}
      </script>
      
      {/* Hero Section */}
      <section className="relative pt-20 pb-20 px-4 sm:px-6 lg:px-8 max-w-[1400px] mx-auto">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-8">
          
          {/* Left Content */}
          <div className="lg:w-[55%] w-full z-10">
            {/* Trusted Badge */}
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 border border-white/10 bg-white/5 px-4 py-2 rounded-full mb-8"
            >
              <Star size={14} className="text-yellow-500 fill-yellow-500" />
              <span className="text-xs font-semibold text-slate-300 tracking-wider">TRUSTED BY 2 LAKH+ CUSTOMERS</span>
            </motion.div>

            {/* Main Heading */}
            <motion.h1 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-5xl lg:text-[4rem] font-black text-white leading-[1.1] mb-6 tracking-tight"
            >
              Compare & Save on <br />
              <span className="text-[#38bdf8]">Insurance Policies</span>
            </motion.h1>

            {/* Subheading */}
            <motion.p 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-lg text-slate-400 mb-10 max-w-xl leading-relaxed"
            >
              Get the best quotes from top insurers instantly. Zero hidden charges, 100% reliable support, and guaranteed lowest premiums.
            </motion.p>

            {/* Stats Row */}
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-12"
            >
              {stats.map((stat, idx) => (
                <div key={idx} className="flex items-center gap-3 border border-white/10 rounded-xl p-3 bg-white/5">
                  <stat.icon size={18} className="text-blue-400" />
                  <div>
                    <div className="text-sm font-bold text-white leading-tight">{stat.value}</div>
                    <div className="text-[10px] text-slate-400 leading-tight">{stat.label}</div>
                  </div>
                </div>
              ))}
            </motion.div>

            {/* Products Selector */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <h3 className="text-xs font-bold text-slate-500 tracking-widest uppercase mb-5">
                SELECT INSURANCE TYPE
              </h3>
              <div className="flex flex-wrap gap-4 lg:gap-6">
                {products.map((product, idx) => {
                  const Icon = product.icon;
                  return (
                    <motion.div key={idx} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <Link to={product.path} className="flex flex-col items-center gap-3 group">
                        <div className={`w-20 h-20 rounded-3xl ${product.color} flex items-center justify-center shadow-lg transition-transform group-hover:-translate-y-2 group-hover:shadow-2xl`}>
                          <Icon size={32} className="text-white" strokeWidth={2} />
                        </div>
                        <span className="text-sm font-bold text-white group-hover:text-blue-400 transition-colors">
                          {product.name}
                        </span>
                      </Link>
                    </motion.div>
                  );
                })}
              </div>
              <div className="mt-6">
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsModalOpen(true)}
                  className="flex items-center gap-2 text-sm font-bold text-[#38bdf8] hover:text-blue-300 transition-colors"
                >
                  View All Products <ArrowRight size={16} />
                </motion.button>
              </div>
            </motion.div>
          </div>

          {/* Right Content (Image) */}
          <div className="lg:w-[45%] w-full relative z-10">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="relative w-full aspect-[4/3] rounded-[2rem] overflow-hidden border border-white/10 shadow-2xl"
            >
              {/* Main Image */}
              <img 
                src="https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?auto=format&fit=crop&q=80&w=1200" 
                alt="Family Insurance Protection" 
                className="w-full h-full object-cover opacity-90"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1c2237]/80 to-transparent"></div>

              {/* Floating Badge 1 (Top Right) */}
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
                className="absolute top-6 right-6 bg-white rounded-2xl p-3 flex items-center gap-3 shadow-xl"
              >
                <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center">
                  <Percent size={18} className="text-blue-600" />
                </div>
                <div>
                  <div className="text-sm font-bold text-slate-800 leading-tight">Save up to 40%</div>
                  <div className="text-[11px] text-slate-500">vs direct purchase</div>
                </div>
              </motion.div>

              {/* Floating Badge 2 (Bottom Left) */}
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 }}
                className="absolute bottom-6 left-6 bg-white rounded-2xl p-4 flex items-center gap-3 shadow-xl"
              >
                <div className="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center">
                  <ShieldCheck size={20} className="text-green-500" />
                </div>
                <div>
                  <div className="text-sm font-bold text-slate-800 leading-tight">100% Secure</div>
                  <div className="text-[11px] text-slate-500">Information Privacy</div>
                </div>
              </motion.div>
            </motion.div>
            
            {/* Background Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-blue-500/10 rounded-full blur-[100px] -z-10"></div>
          </div>

        </div>
      </section>

      {/* New Extended Sections */}
      <PartnerLogos />
      <WhyChooseUs />
      <Testimonials />
      <AppDownload />
      <FAQ />
      <CTASection />

      {/* All Products Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
            <motion.div 
              initial={{ opacity: 0, backdropFilter: 'blur(0px)' }}
              animate={{ opacity: 1, backdropFilter: 'blur(12px)' }}
              exit={{ opacity: 0, backdropFilter: 'blur(0px)' }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-[#0f172a]/60"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.8, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 30 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative w-full max-w-5xl bg-white rounded-[2.5rem] shadow-2xl overflow-hidden z-10"
            >
              {/* Decorative Header Background */}
              <div className="absolute top-0 left-0 w-full h-40 bg-gradient-to-br from-blue-600 to-[#1e3a8a] -z-10"></div>
              <div className="absolute -top-20 -right-20 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
              
              <div className="flex items-center justify-between p-8 border-b border-white/10">
                <div className="text-white">
                  <h2 className="text-3xl font-black mb-1">Explore Our Plans</h2>
                  <p className="text-blue-200 text-sm">Choose the perfect protection for your needs</p>
                </div>
                <motion.button 
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setIsModalOpen(false)}
                  className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white hover:bg-white/20 transition-colors shadow-sm"
                >
                  <X size={24} />
                </motion.button>
              </div>

              <div className="p-8 bg-slate-50">
                <motion.div 
                  initial="hidden"
                  animate="visible"
                  variants={{
                    hidden: { opacity: 0 },
                    visible: {
                      opacity: 1,
                      transition: { staggerChildren: 0.05 }
                    }
                  }}
                  className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6"
                >
                  {allProducts.map((product, idx) => {
                    const Icon = product.icon;
                    return (
                      <motion.div
                        key={idx}
                        variants={{
                          hidden: { opacity: 0, y: 20 },
                          visible: { opacity: 1, y: 0 }
                        }}
                      >
                        <Link 
                          to={product.path} 
                          onClick={() => setIsModalOpen(false)}
                          className="flex flex-col items-center gap-4 p-6 rounded-[2rem] bg-white hover:bg-slate-50 transition-colors group border border-slate-100 hover:border-blue-100 hover:shadow-xl hover:-translate-y-1 block h-full"
                        >
                          <div className={`w-20 h-20 rounded-2xl ${product.color} flex items-center justify-center shadow-md transition-transform group-hover:scale-110 group-hover:shadow-lg`}>
                            <Icon size={32} className="text-white" strokeWidth={2} />
                          </div>
                          <span className="text-base font-bold text-slate-700 group-hover:text-blue-600 text-center">
                            {product.name}
                          </span>
                        </Link>
                      </motion.div>
                    );
                  })}
                </motion.div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
};

export default Home;
