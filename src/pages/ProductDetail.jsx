import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { CheckCircle2, ShieldCheck, Star, ArrowLeft } from 'lucide-react';
import SEO from '../components/SEO';

const ProductDetail = () => {
  const { type } = useParams();
  const navigate = useNavigate();
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  const { register, handleSubmit, formState: { errors } } = useForm();

  // Content Data based on product type
  const productData = {
    car: {
      title: 'Motor Insurance',
      subtitle: 'Get the best rates from 25+ insurers',
      desc: 'Protect your vehicle against accidents, theft, and natural calamities. Compare and buy instantly.',
    },
    bike: {
      title: 'Two Wheeler Insurance',
      subtitle: 'Get the best rates from 20+ insurers',
      desc: 'Comprehensive protection for your two-wheeler. Ride with complete peace of mind.',
    },
    health: {
      title: 'Health Insurance',
      subtitle: 'Compare plans from 30+ top hospitals',
      desc: 'Secure your family\'s health and savings with comprehensive medical coverage and cashless claims.',
    },
    life: {
      title: 'Term Life Insurance',
      subtitle: 'Protect your loved ones',
      desc: 'Ensure financial security for your family even when you are not around with high cover at low premiums.',
    },
    travel: {
      title: 'Travel Insurance',
      subtitle: 'Travel the world worry-free',
      desc: 'Coverage against flight delays, medical emergencies, and lost baggage anywhere in the world.',
    },
    home: {
      title: 'Home Insurance',
      subtitle: 'Secure your dream home',
      desc: 'Protect your house structure and contents against fire, burglary, and natural disasters.',
    }
  };

  const data = productData[type] || productData.car;

  const onSubmit = (formData) => {
    const newLead = {
      id: Date.now(),
      productType: data.title,
      date: new Date().toLocaleString(),
      ...formData
    };
    
    const existingLeads = JSON.parse(localStorage.getItem('policy_leads') || '[]');
    localStorage.setItem('policy_leads', JSON.stringify([newLead, ...existingLeads]));
    
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      navigate('/admin');
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans pb-24">
      <SEO 
        title={`${data.title} - Compare &amp; Buy Best Plans Online | PolicyPerfect`} 
        description={data.desc} 
        url={`https://policyperfect.co.in/product/${type}`}
      />
      {/* HEADER SECTION */}
      <div className="bg-[#111827] pt-12 pb-24 text-white">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <Link to="/" className="inline-flex items-center gap-2 text-slate-300 hover:text-white mb-8 transition-colors">
            <ArrowLeft size={16} /> Back to Home
          </Link>
          
          <div className="flex flex-col md:flex-row gap-12 justify-between">
            {/* Left side content */}
            <div className="md:w-[55%]">
              <div className="inline-block px-3 py-1 bg-blue-900/50 text-blue-300 font-semibold rounded-full text-sm border border-blue-800 mb-4">
                Fast & Secure
              </div>
              <h1 className="text-4xl md:text-5xl font-black mb-4 leading-tight">
                {data.title}
              </h1>
              <p className="text-xl text-slate-300 mb-8 max-w-lg">
                {data.desc}
              </p>
              
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-3">
                  <div className="bg-green-500/20 p-2 rounded-full text-green-400">
                    <CheckCircle2 size={24} />
                  </div>
                  <span className="text-lg font-medium">Instant Policy Issuance</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="bg-blue-500/20 p-2 rounded-full text-blue-400">
                    <ShieldCheck size={24} />
                  </div>
                  <span className="text-lg font-medium">100% Secure Payment</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="bg-yellow-500/20 p-2 rounded-full text-yellow-400">
                    <Star size={24} />
                  </div>
                  <span className="text-lg font-medium">4.9/5 Average Rating</span>
                </div>
              </div>
            </div>

            {/* Right side FORM */}
            <div className="md:w-[40%]">
              <div className="bg-white rounded-2xl p-8 shadow-2xl text-slate-800 -mb-20 relative z-10">
                <h3 className="text-2xl font-black mb-2">{data.subtitle}</h3>
                <p className="text-slate-500 mb-6 font-medium">Fill details to get instant quotes.</p>
                
                {isSubmitted ? (
                  <div className="text-center py-10 bg-green-50 rounded-xl border border-green-100">
                    <CheckCircle2 size={48} className="text-green-500 mx-auto mb-4" />
                    <h3 className="text-xl font-bold text-slate-800 mb-2">Details Submitted!</h3>
                    <p className="text-slate-600">Our experts will call you shortly.</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-1.5">Insurance Type</label>
                      <select 
                        {...register("insuranceType")}
                        defaultValue={type}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none bg-slate-50 font-medium"
                      >
                        <option value="car">Motor Insurance</option>
                        <option value="bike">Two Wheeler Insurance</option>
                        <option value="health">Health Insurance</option>
                        <option value="life">Term Life Insurance</option>
                        <option value="travel">Travel Insurance</option>
                        <option value="home">Home Insurance</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-1.5">Full Name</label>
                      <input 
                        type="text"
                        placeholder="Enter your name"
                        {...register("name", { required: true })}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none bg-slate-50 font-medium"
                      />
                      {errors.name && <span className="text-red-500 text-xs mt-1">This field is required</span>}
                    </div>
                    
                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-1.5">Mobile Number</label>
                      <input 
                        type="tel"
                        placeholder="Enter 10 digit number"
                        {...register("mobile", { required: true })}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none bg-slate-50 font-medium"
                      />
                      {errors.mobile && <span className="text-red-500 text-xs mt-1">This field is required</span>}
                    </div>
                    
                    <button 
                      type="submit"
                      className="w-full bg-[#2563EB] hover:bg-blue-700 text-white font-bold py-4 rounded-xl shadow-lg shadow-blue-500/30 transition-all mt-4"
                    >
                      View Quotes
                    </button>
                    <p className="text-xs text-center text-slate-400 mt-4 font-medium">
                      By proceeding, you agree to our terms and conditions.
                    </p>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
