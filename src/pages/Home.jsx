import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  Car, Heart, TrendingUp, Plane, Home as HomeIcon, 
  Users, Shield, Star, Clock, Percent, ShieldCheck, X, ArrowRight
} from 'lucide-react';
import { PartnerLogos, WhyChooseUs, FAQ, Testimonials, AppDownload, CTASection } from '../components/HomeSections';
import SEO from '../components/SEO';
import { db } from '../utils/db';
import ProductQuoteModal from '../components/ProductQuoteModal';

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
  const [quoteModalOpen, setQuoteModalOpen] = useState(false);
  const [selectedProductType, setSelectedProductType] = useState('health');
  const [banner, setBanner] = useState({ imageUrl: '', redirectUrl: '' });

  const handleProductClick = (product, e) => {
    if (product.name === 'Motor' || product.name === 'Two Wheeler') {
      return; // Navigate normally
    }
    e.preventDefault();
    let type = 'health';
    if (product.name === 'Life') type = 'life';
    else if (product.name === 'Home') type = 'fire';
    else if (product.name === 'Travel') type = 'travel';
    else if (product.name === 'Cyber') type = 'cyber';
    else if (product.name === 'Pet') type = 'pet';
    else if (product.name === 'Business') type = 'business';

    setSelectedProductType(type);
    setQuoteModalOpen(true);
    setIsModalOpen(false); // Close the "All Products" modal if it is open
  };

  useEffect(() => {
    setBanner(db.getBanner());
  }, []);

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
      "telephone": "+91-75749-48768",
      "contactType": "customer service",
      "areaServed": "IN",
      "availableLanguage": ["en", "hi"]
    }
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "PolicyPerfect",
    "url": "https://policyperfect.co.in",
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": "https://policyperfect.co.in/product/{search_term_string}"
      },
      "query-input": "required name=search_term_string"
    }
  };

  return (
    <div className="w-full min-h-screen bg-white font-sans overflow-x-hidden">
      <SEO 
        title="PolicyPerfect Insurance | Compare &amp; Buy Best Insurance Plans Online"
        description="Compare and buy cheap insurance policies instantly in India. PolicyPerfect offers Health, Life, Motor, Travel, and Cyber insurance. Get a free quote today!"
      />
      <script type="application/ld+json">
        {JSON.stringify(organizationSchema)}
      </script>
      <script type="application/ld+json">
        {JSON.stringify(websiteSchema)}
      </script>
      
      {/* Hero Section */}
      <section className="relative pt-16 pb-20 px-4 sm:px-6 lg:px-8 max-w-[1400px] mx-auto bg-gradient-to-br from-slate-50 via-white to-accent-50/10 rounded-b-[3rem]">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-8">
          
          {/* Left Content */}
          <div className="lg:w-[55%] w-full z-10">
            {/* Trusted Badge */}
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 border border-slate-200 bg-slate-100/70 px-4 py-2 rounded-full mb-8 shadow-sm"
            >
              <Star size={14} className="text-accent-500 fill-accent-500" />
              <span className="text-[10px] sm:text-xs font-black text-slate-600 tracking-wider">TRUSTED BY 2 LAKH+ CUSTOMERS</span>
            </motion.div>

            {/* Main Heading */}
            <motion.h1 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-[3.8rem] font-black text-primary-500 leading-[1.1] mb-6 tracking-tight"
            >
              Compare & Save on <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-500 via-accent-500 to-accent-600">Insurance Policies</span>
            </motion.h1>

            {/* Subheading */}
            <motion.p 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-base sm:text-lg text-slate-500 mb-10 max-w-xl leading-relaxed font-medium"
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
                <div key={idx} className="flex items-center gap-3 border border-slate-100 rounded-xl p-3 bg-white shadow-md">
                  <stat.icon size={18} className="text-accent-500" />
                  <div>
                    <div className="text-sm font-black text-primary-500 leading-tight">{stat.value}</div>
                    <div className="text-[10px] text-slate-400 font-bold leading-tight">{stat.label}</div>
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
              <h3 className="text-xs font-black text-slate-400 tracking-widest uppercase mb-5">
                SELECT INSURANCE TYPE
              </h3>
              <div className="flex flex-wrap gap-6 lg:gap-8 justify-start">
                {products.map((product, idx) => {
                  const Icon = product.icon;
                  return (
                    <motion.div key={idx} whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.95 }}>
                      <Link to={product.path} onClick={(e) => handleProductClick(product, e)} className="flex flex-col items-center gap-3 group">
                        <div className="w-18 h-18 rounded-full bg-white border border-slate-200/80 flex items-center justify-center shadow-md transition-all duration-300 group-hover:border-accent-500 group-hover:shadow-xl group-hover:shadow-accent-500/10 group-hover:-translate-y-1">
                          <Icon size={28} className="text-primary-500 group-hover:text-accent-500 transition-colors" strokeWidth={2.2} />
                        </div>
                        <span className="text-xs font-black text-slate-700 group-hover:text-primary-500 transition-colors tracking-wide">
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
                  className="flex items-center gap-2 text-sm font-black text-accent-600 hover:text-accent-700 transition-colors"
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
              className="relative w-full aspect-[4/3] rounded-[2rem] overflow-hidden border border-slate-200 shadow-2xl"
            >
              {/* Main Image */}
              <a href={banner.redirectUrl || '#'} className="block w-full h-full cursor-pointer">
                <img 
                  src={banner.imageUrl || "https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?auto=format&fit=crop&q=80&w=1200"} 
                  alt="Family Insurance Protection" 
                  className="w-full h-full object-cover opacity-95 hover:scale-105 transition-transform duration-500"
                />
              </a>
              <div className="absolute inset-0 bg-gradient-to-t from-white/60 to-transparent pointer-events-none"></div>

              {/* Floating Badge 1 (Top Right) */}
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
                className="absolute top-6 right-6 bg-white/95 backdrop-blur-md border border-slate-200/50 rounded-2xl p-3 flex items-center gap-3 shadow-xl"
              >
                <div className="w-10 h-10 rounded-full bg-accent-50 flex items-center justify-center">
                  <Percent size={18} className="text-accent-600" />
                </div>
                <div>
                  <div className="text-sm font-black text-slate-800 leading-tight">Save up to 40%</div>
                  <div className="text-[11px] text-slate-500 font-semibold">vs direct purchase</div>
                </div>
              </motion.div>

              {/* Floating Badge 2 (Bottom Left) */}
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 }}
                className="absolute bottom-6 left-6 bg-white/95 backdrop-blur-md border border-slate-200/50 rounded-2xl p-4 flex items-center gap-3 shadow-xl"
              >
                <div className="w-10 h-10 rounded-full bg-emerald-50 flex items-center justify-center">
                  <ShieldCheck size={20} className="text-emerald-500" />
                </div>
                <div>
                  <div className="text-sm font-black text-slate-800 leading-tight">100% Secure</div>
                  <div className="text-[11px] text-slate-500 font-semibold">Information Privacy</div>
                </div>
              </motion.div>
            </motion.div>
            
            {/* Background Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-accent-500/5 rounded-full blur-[100px] -z-10"></div>
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
              <div className="absolute top-0 left-0 w-full h-40 bg-gradient-to-br from-primary-500 to-primary-600 -z-10"></div>
              <div className="absolute -top-20 -right-20 w-64 h-64 bg-white/5 rounded-full blur-3xl"></div>
              
              <div className="flex items-center justify-between p-8 border-b border-white/10">
                <div className="text-white">
                  <h2 className="text-3xl font-black mb-1">Explore Our Plans</h2>
                  <p className="text-accent-100 text-sm font-semibold">Choose the perfect protection for your needs</p>
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
                          onClick={(e) => handleProductClick(product, e)}
                          className="flex flex-col items-center gap-4 p-6 rounded-[2rem] bg-white hover:bg-slate-50 transition-all group border border-slate-100 hover:border-accent-500 hover:shadow-xl hover:-translate-y-1 block h-full"
                        >
                          <div className="w-18 h-18 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center shadow-sm transition-all group-hover:scale-115 group-hover:shadow-md group-hover:border-accent-500">
                            <Icon size={26} className="text-primary-500 group-hover:text-accent-500 transition-colors" strokeWidth={2.2} />
                          </div>
                          <span className="text-xs font-black text-slate-700 group-hover:text-primary-500 text-center tracking-wide">
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

      <ProductQuoteModal 
        isOpen={quoteModalOpen} 
        onClose={() => setQuoteModalOpen(false)} 
        defaultProductType={selectedProductType} 
      />

    </div>
  );
};

export default Home;
