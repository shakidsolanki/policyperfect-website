import React from 'react';
import { PhoneCall, Mail, MessageCircle } from 'lucide-react';
import SEO from '../components/SEO';

const ClaimSupport = () => {
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "serviceType": "Insurance Claim Assistance",
    "provider": {
      "@type": "InsuranceAgency",
      "name": "PolicyPerfect",
      "url": "https://policyperfect.co.in"
    },
    "description": "Register and track your insurance claims online with 24/7 customer support and cashless claim settlement services.",
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
        "name": "Claims Support",
        "item": "https://policyperfect.co.in/claims"
      }
    ]
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "How do I register a claim on PolicyPerfect?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "You can register a claim by calling our 24/7 customer support at +91 75749 48768 or emailing us your policy and damage details at claims@policyperfect.co.in. Our claim experts will guide you through the document verification and garage allocation process immediately."
        }
      },
      {
        "@type": "Question",
        "name": "What is cashless claim settlement?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Cashless claim settlement allows you to get your insured asset (like a car or bike) repaired at our network garages without paying the repair bills out of pocket. The bills are settled directly by the insurer, except for mandatory deductibles."
        }
      }
    ]
  };

  return (
    <div className="min-h-[80vh] bg-slate-50 py-20 px-4">
      <SEO 
        title="Hassle-Free Cashless Claims & Support 24/7 | PolicyPerfect" 
        description="Register and track your insurance claims easily online. Get 24x7 helpline support, cashless repairs at network garages, and quick document reviews." 
      />
      <script type="application/ld+json">
        {JSON.stringify(serviceSchema)}
      </script>
      <script type="application/ld+json">
        {JSON.stringify(breadcrumbSchema)}
      </script>
      <script type="application/ld+json">
        {JSON.stringify(faqSchema)}
      </script>
      <div className="max-w-[1000px] mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-black text-slate-800 mb-4">Claim Support Center</h1>
          <p className="text-lg text-slate-500 max-w-2xl mx-auto">We're here to help you when you need us the most. Contact our 24x7 support team to register or track your claim.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 text-center hover:shadow-lg transition-shadow">
            <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-6">
              <PhoneCall size={32} className="text-blue-600" />
            </div>
            <h3 className="text-xl font-bold text-slate-800 mb-2">Call Us</h3>
            <p className="text-slate-500 mb-4">Available 24/7 for emergency support</p>
            <div className="font-bold text-xl text-[#1e3a8a]">+91 75749 48768</div>
          </div>
          
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 text-center hover:shadow-lg transition-shadow">
            <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6">
              <MessageCircle size={32} className="text-green-600" />
            </div>
            <h3 className="text-xl font-bold text-slate-800 mb-2">WhatsApp</h3>
            <p className="text-slate-500 mb-4">Chat with our claim experts directly</p>
            <div className="font-bold text-xl text-[#1e3a8a]">+91 75749 48768</div>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 text-center hover:shadow-lg transition-shadow">
            <div className="w-16 h-16 bg-purple-50 rounded-full flex items-center justify-center mx-auto mb-6">
              <Mail size={32} className="text-purple-600" />
            </div>
            <h3 className="text-xl font-bold text-slate-800 mb-2">Email Support</h3>
            <p className="text-slate-500 mb-4">Send us your documents for review</p>
            <div className="font-bold text-lg text-[#1e3a8a]">claims@policyperfect.co.in</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClaimSupport;
