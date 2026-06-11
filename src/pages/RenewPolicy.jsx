import React from 'react';
import SEO from '../components/SEO';

const RenewPolicy = () => {
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "serviceType": "Insurance Policy Renewal",
    "provider": {
      "@type": "InsuranceAgency",
      "name": "PolicyPerfect",
      "url": "https://policyperfect.co.in"
    },
    "description": "Renew your motor, health, or term life insurance policy online instantly with secure verification and payment process.",
    "areaServed": "IN"
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://policyperfect.co.in/"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Renew Policy",
        "item": "https://policyperfect.co.in/renew"
      }
    ]
  };

  return (
    <div className="min-h-[80vh] bg-slate-50 flex flex-col items-center justify-center px-4 py-20">
      <SEO 
        title="Instant Insurance Policy Renewal Online | PolicyPerfect" 
        description="Renew your car, bike, health, or life insurance policy instantly online. Keep your coverage active with seamless, secure, and hassle-free payment options." 
      />
      <script type="application/ld+json">
        {JSON.stringify(serviceSchema)}
      </script>
      <script type="application/ld+json">
        {JSON.stringify(breadcrumbSchema)}
      </script>
      <div className="max-w-xl w-full bg-white rounded-2xl shadow-xl border border-slate-100 p-8 md:p-12 text-center">
        <h1 className="text-3xl font-black text-[#1e3a8a] mb-4">Renew Policy</h1>
        <p className="text-slate-500 mb-8">Enter your existing policy details below to renew instantly and continue enjoying seamless protection.</p>
        
        <form className="space-y-4 text-left">
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-1">Policy Number</label>
            <input type="text" placeholder="e.g. POL-12345678" className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-1">Registered Mobile Number</label>
            <input type="tel" placeholder="+91 00000 00000" className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
          <button type="button" className="w-full bg-[#1e3a8a] text-white font-bold py-3.5 rounded-lg mt-4 hover:bg-blue-900 transition-colors shadow-lg shadow-blue-900/20">
            Fetch Policy Details
          </button>
        </form>
      </div>
    </div>
  );
};

export default RenewPolicy;
