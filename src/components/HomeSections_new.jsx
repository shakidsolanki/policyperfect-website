import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, Shield, Zap, FileText, ChevronDown, PhoneCall, Star, ArrowRight } from 'lucide-react';

export const PartnerLogos = () => {
  const logos = [
    {
      name: 'HDFC Ergo',
      img: 'https://upload.wikimedia.org/wikipedia/en/thumb/b/b0/HDFC_ERGO_logo.svg/200px-HDFC_ERGO_logo.svg.png',
      color: '#ed1c24',
    },
    {
      name: 'ICICI Lombard',
      img: 'https://upload.wikimedia.org/wikipedia/en/thumb/6/6e/ICICI_Lombard_logo.svg/200px-ICICI_Lombard_logo.svg.png',
      color: '#f15a22',
    },
    {
      name: 'Bajaj Allianz',
      img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5f/Bajaj_Allianz_Logo.svg/200px-Bajaj_Allianz_Logo.svg.png',
      color: '#005eb8',
    },
    {
      name: 'Star Health',
      img: 'https://upload.wikimedia.org/wikipedia/en/thumb/0/0a/Star_Health_and_Allied_Insurance_logo.svg/200px-Star_Health_and_Allied_Insurance_logo.svg.png',
      color: '#0033a0',
    },
    {
      name: 'Tata AIG',
      img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8e/Tata_AIG_Logo.svg/200px-Tata_AIG_Logo.svg.png',
      color: '#e31837',
    },
    {
      name: 'Niva Bupa',
      img: 'https://upload.wikimedia.org/wikipedia/en/thumb/5/5e/Niva_Bupa_Health_Insurance_logo.svg/200px-Niva_Bupa_Health_Insurance_logo.svg.png',
      color: '#e31837',
    },
    {
      name: 'New India',
      img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/db/New_India_Assurance_Logo.svg/200px-New_India_Assurance_Logo.svg.png',
      color: '#0c3b7a',
    },
    {
      name: 'SBI General',
      img: 'https://upload.wikimedia.org/wikipedia/en/thumb/9/9c/SBI_General_Insurance.svg/200px-SBI_General_Insurance.svg.png',
      color: '#004e9c',
    },
    {
      name: 'Care Health',
      img: 'https://upload.wikimedia.org/wikipedia/en/thumb/2/2c/Care_Health_Insurance_Logo.svg/200px-Care_Health_Insurance_Logo.svg.png',
      color: '#00529b',
    },
    {
      name: 'Zuno General',
      img: 'https://upload.wikimedia.org/wikipedia/en/thumb/1/16/Zuno_General_Insurance_logo.svg/200px-Zuno_General_Insurance_logo.svg.png',
      color: '#cc0000',
    },
  ];

  const marqueeLogos = [...logos, ...logos];

  return (
    <section className="py-10 border-y border-slate-100 overflow-hidden">
      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 mb-5">
        <p className="text-center text-[11px] font-black text-slate-400 uppercase tracking-widest">
          Trusted by India's Leading Insurers
        </p>
      </div>
      <div className="relative">
        <div className="flex animate-marquee gap-5 w-max">
          {marqueeLogos.map((logo, idx) => (
            <div
              key={idx}
              className="flex-shrink-0 bg-white rounded-xl px-4 py-2.5 shadow-sm border border-slate-100 flex items-center gap-2.5 hover:shadow-md transition-shadow cursor-pointer min-w-[150px]"
            >
              <img
                src={logo.img}
                alt={logo.name}
                className="h-8 w-auto max-w-[38px] object-contain flex-shrink-0"
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.nextSibling.style.display = 'flex';
                }}
              />
              <div
                className="hidden w-8 h-8 rounded-lg items-center justify-center text-white text-[11px] font-black flex-shrink-0"
                style={{ background: logo.color }}
              >
                {logo.name.charAt(0)}
              </div>
              <span className="text-[12.5px] font-bold text-slate-700 whitespace-nowrap">{logo.name}</span>
            </div>
          ))}
        </div>
        {/* Fade edges */}
        <div className="absolute left-0 top-0 h-full w-20 bg-gradient-to-r from-slate-50 to-transparent pointer-events-none z-10" />
        <div className="absolute right-0 top-0 h-full w-20 bg-gradient-to-l from-slate-50 to-transparent pointer-events-none z-10" />
      </div>
    </section>
  );
};

