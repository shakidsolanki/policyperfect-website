import React from 'react';
import { PhoneCall, Mail, MessageCircle } from 'lucide-react';

const ClaimSupport = () => {
  return (
    <div className="min-h-[80vh] bg-slate-50 py-20 px-4">
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
