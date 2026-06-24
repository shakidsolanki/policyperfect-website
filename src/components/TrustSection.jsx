import React from 'react';
import { ShieldCheck, RefreshCw, HelpCircle, PhoneCall, Layers, Lock, Award } from 'lucide-react';

const TRUST_ITEMS = [
  {
    title: 'Free Insurance Quotes',
    desc: 'Get unbiased quotes from India\'s top insurers at zero cost to you.',
    icon: Award,
    color: 'text-teal-600 bg-teal-50 border-teal-100/50'
  },
  {
    title: 'Renewal Assistance',
    desc: 'Timely reminders and hassle-free support to renew your policy on time.',
    icon: RefreshCw,
    color: 'text-blue-600 bg-blue-50 border-blue-100/50'
  },
  {
    title: 'Claim Guidance',
    desc: 'Dedicated claim support and assistance to get your claims processed fast.',
    icon: ShieldCheck,
    color: 'text-emerald-600 bg-emerald-50 border-emerald-100/50'
  },
  {
    title: 'Customer Support',
    desc: 'Reach out to our experts over phone or WhatsApp for prompt resolution.',
    icon: PhoneCall,
    color: 'text-amber-600 bg-amber-50 border-amber-100/50'
  },
  {
    title: 'Multiple Insurance Solutions',
    desc: 'One-stop shop for Health, Motor, Life, Travel, Home, Fire, and Marine plans.',
    icon: Layers,
    color: 'text-indigo-600 bg-indigo-50 border-indigo-100/50'
  },
  {
    title: 'Secure Information Handling',
    desc: 'Your private personal and vehicle details are safe and fully encrypted.',
    icon: Lock,
    color: 'text-rose-600 bg-rose-50 border-rose-100/50'
  }
];

export default function TrustSection() {
  return (
    <section className="w-full bg-slate-50 py-16 border-t border-b border-slate-200/60 font-sans">
      <div className="max-w-[1200px] mx-auto px-6 sm:px-8 lg:px-12">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <span className="text-[11px] font-black uppercase tracking-widest text-[#dfb15b]">Why Trust Us</span>
          <h2 className="text-3xl font-black text-slate-800 leading-none">Our Trust &amp; Compliance Promises</h2>
          <p className="text-slate-500 font-semibold text-xs leading-relaxed">
            PolicyPerfect Insurance Advisory is built on transparency, regulatory compliance, and customer trust.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {TRUST_ITEMS.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div 
                key={idx} 
                className="bg-white border border-slate-100 rounded-3xl p-6 shadow-[0_4px_20px_rgba(0,0,0,0.015)] hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 flex items-start gap-4"
              >
                <div className={`w-11 h-11 rounded-2xl flex items-center justify-center flex-shrink-0 border ${item.color}`}>
                  <Icon size={20} />
                </div>
                <div className="space-y-1.5">
                  <h3 className="font-extrabold text-slate-800 text-sm leading-tight">{item.title}</h3>
                  <p className="text-[11.5px] text-slate-500 font-semibold leading-relaxed">{item.desc}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Disclaimer Box */}
        <div className="mt-12 bg-white/60 border border-slate-200/80 rounded-[1.5rem] p-6 max-w-3xl mx-auto flex items-start gap-4">
          <HelpCircle size={20} className="text-slate-400 mt-0.5 flex-shrink-0" />
          <div className="space-y-1">
            <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">Platform Disclaimer &amp; Compliance</span>
            <p className="text-[11px] font-bold text-slate-500 leading-relaxed">
              PolicyPerfect Insurance is an Insurance Advisory and Assistance Platform. Insurance policies are issued by respective insurers. Premiums, underwriting decisions, policy issuance, and claim settlements are subject to insurer terms and conditions. We collect previous policies and vehicle information solely for quotation rendering.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
