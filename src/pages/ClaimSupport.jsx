import React, { useState } from 'react';
import { PhoneCall, Mail, MessageCircle, AlertCircle, CheckCircle } from 'lucide-react';
import SEO from '../components/SEO';
import { db } from '../utils/db';

const ClaimSupport = () => {
  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    policyNo: '',
    productType: 'Motor Insurance',
    accidentDate: '',
    accidentTime: '',
    location: '',
    description: '',
    driverDetails: '',
    witnessContact: ''
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [claimRef, setClaimRef] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    // Validations
    if (!formData.name.trim()) return setError('Full name is required');
    if (formData.mobile.length !== 10) return setError('Valid 10-digit mobile number is required');
    if (!formData.policyNo.trim()) return setError('Policy number is required');
    if (!formData.accidentDate) return setError('Accident date is required');
    if (!formData.location.trim()) return setError('Accident location is required');
    if (!formData.description.trim()) return setError('Please describe the accident');

    // Create claim entry
    const refNo = 'CLM-' + Date.now().toString().slice(-6);
    
    // Find policy in active policies if any to fetch details
    const activePolicies = db.getPolicies();
    const matchedPolicy = activePolicies.find(p => 
      p.policyNo.toLowerCase() === formData.policyNo.trim().toLowerCase()
    );

    const newClaim = {
      id: refNo,
      policyNo: formData.policyNo.trim().toUpperCase(),
      productType: matchedPolicy ? matchedPolicy.productType : formData.productType,
      mobile: formData.mobile,
      name: formData.name,
      vehicleDetails: matchedPolicy ? matchedPolicy.vehicleDetails : 'N/A',
      date: new Date().toLocaleString(),
      accidentDate: formData.accidentDate,
      accidentTime: formData.accidentTime,
      location: formData.location,
      description: formData.description,
      driverDetails: formData.driverDetails,
      witnessContact: formData.witnessContact
    };

    const currentClaims = db.getClaims();
    db.setClaims([newClaim, ...currentClaims]);

    setClaimRef(refNo);
    setSuccess('Claim Intimated successfully!');
    setFormData({
      name: '',
      mobile: '',
      policyNo: '',
      productType: 'Motor Insurance',
      accidentDate: '',
      accidentTime: '',
      location: '',
      description: '',
      driverDetails: '',
      witnessContact: ''
    });
  };

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

        {/* Claim Intimation Form */}
        <div className="mt-20 bg-white p-8 md:p-12 rounded-[2.5rem] shadow-sm border border-slate-200/80 max-w-3xl mx-auto">
          <div className="mb-8">
            <h2 className="text-2xl font-black text-slate-800 mb-2">Online Claim Intimation</h2>
            <p className="text-sm text-slate-500">Intimate your claim online for faster processing. Our claims helpdesk will contact you within 15 minutes.</p>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 p-4 rounded-xl text-xs font-bold flex items-center gap-2 mb-6">
              <AlertCircle size={16} />
              <span>{error}</span>
            </div>
          )}

          {success && (
            <div className="bg-green-50 border border-green-200 text-green-700 p-5 rounded-2xl text-sm font-semibold flex flex-col gap-1 mb-6">
              <div className="flex items-center gap-2">
                <CheckCircle size={18} className="text-green-600" />
                <span>{success}</span>
              </div>
              <span className="text-xs text-green-600 font-bold ml-6 mt-1">Claim Intimation Reference Number: {claimRef}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Full Name *</label>
                <input
                  type="text"
                  name="name"
                  placeholder="Enter insured full name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 outline-none focus:border-blue-500 transition-colors text-sm font-medium"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Registered Mobile *</label>
                <input
                  type="tel"
                  name="mobile"
                  maxLength={10}
                  placeholder="Enter 10-digit number"
                  value={formData.mobile}
                  onChange={(e) => setFormData({...formData, mobile: e.target.value.replace(/\D/g, '')})}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 outline-none focus:border-blue-500 transition-colors text-sm font-medium"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Policy Number *</label>
                <input
                  type="text"
                  name="policyNo"
                  placeholder="e.g. PP-MOT-789320"
                  value={formData.policyNo}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 outline-none focus:border-blue-500 transition-colors text-sm font-medium uppercase"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Product Type *</label>
                <select
                  name="productType"
                  value={formData.productType}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 outline-none focus:border-blue-500 transition-colors text-sm font-medium"
                >
                  <option value="Motor Insurance">Motor Insurance</option>
                  <option value="Health Insurance">Health Insurance</option>
                  <option value="Life Insurance">Life Insurance</option>
                  <option value="Travel Insurance">Travel Insurance</option>
                  <option value="Home/Fire Insurance">Home/Fire Insurance</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Accident Date *</label>
                <input
                  type="date"
                  name="accidentDate"
                  value={formData.accidentDate}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 outline-none focus:border-blue-500 transition-colors text-sm font-medium"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Accident Time</label>
                <input
                  type="time"
                  name="accidentTime"
                  value={formData.accidentTime}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 outline-none focus:border-blue-500 transition-colors text-sm font-medium"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Accident Location *</label>
              <input
                type="text"
                name="location"
                placeholder="e.g. Near Noida Sector 18 Metro Station"
                value={formData.location}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 outline-none focus:border-blue-500 transition-colors text-sm font-medium"
              />
            </div>

            <div className="grid md:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Driver Details / License Info</label>
                <input
                  type="text"
                  name="driverDetails"
                  placeholder="Who was driving & License No."
                  value={formData.driverDetails}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 outline-none focus:border-blue-500 transition-colors text-sm font-medium"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Witness Contact Info</label>
                <input
                  type="text"
                  name="witnessContact"
                  placeholder="Witness Name / Mobile (if any)"
                  value={formData.witnessContact}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 outline-none focus:border-blue-500 transition-colors text-sm font-medium"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Description of Accident *</label>
              <textarea
                name="description"
                rows={3}
                placeholder="Explain the event timeline and damages in details..."
                value={formData.description}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 outline-none focus:border-blue-500 transition-colors text-sm font-medium resize-none"
              />
            </div>

            <button
              type="submit"
              className="w-full md:w-auto px-8 py-4 bg-[#1e3a8a] hover:bg-[#1a3275] text-white rounded-xl font-bold shadow-lg shadow-blue-900/10 transition-colors text-sm"
            >
              Submit Claim Intimation
            </button>
          </form>
        </div>

      </div>
    </div>
  );
};

export default ClaimSupport;
