import React, { useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Shield, CheckCircle2, AlertTriangle, ArrowRight, 
  ChevronRight, HelpCircle, PhoneCall, Star, Clock, 
  Percent, FileText, Settings, Heart, Navigation, Key
} from 'lucide-react';
import MotorLeadModal from '../components/MotorLeadModal';
import { PartnerLogos, FAQ } from '../components/HomeSections';
import SEO from '../components/SEO';

const MotorInsurance = () => {
  const location = useLocation();
  const isBike = location.pathname.includes('/bike');
  
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Dynamic content based on car vs bike
  const pageTitle = isBike ? 'Two Wheeler Insurance' : 'Motor Insurance';
  const pageSub = isBike ? 'Two Wheeler Insurance Made Simple' : 'Motor Insurance Made Simple';
  const mainImage = isBike 
    ? 'https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&q=80&w=800' // Premium Bike image
    : 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&q=80&w=800'; // Sleek blue car image

  const seoTitle = isBike 
    ? "Two Wheeler &amp; Bike Insurance Online - Save up to 80% | PolicyPerfect" 
    : "Car &amp; Motor Insurance Online - Instant Quote &amp; Renewal | PolicyPerfect";
  
  const seoDesc = isBike 
    ? "Compare and renew bike or scooter insurance online instantly. Save up to 80% on premiums with comprehensive own-damage and mandatory third-party coverage." 
    : "Compare and buy the best car insurance plans online. Enjoy instant digital policy issuance, cashless claims across 5,000+ garages, and high own-damage protection.";

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What is No Claim Bonus (NCB) in motor insurance?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "No Claim Bonus (NCB) is a discount on the own-damage premium offered by insurers for every claim-free year. It starts at 20% for the first claim-free year and can go up to 50% for five consecutive claim-free years."
        }
      },
      {
        "@type": "Question",
        "name": "Is third-party motor insurance mandatory in India?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, under the Motor Vehicles Act, third-party liability insurance is legally mandatory for all vehicles operating on public roads in India."
        }
      }
    ]
  };

  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": pageTitle,
    "image": mainImage,
    "description": seoDesc,
    "brand": {
      "@type": "Brand",
      "name": "PolicyPerfect"
    },
    "offers": {
      "@type": "AggregateOffer",
      "url": `https://policyperfect.co.in${location.pathname}`,
      "priceCurrency": "INR",
      "lowPrice": isBike ? "500" : "2000",
      "highPrice": isBike ? "5000" : "50000",
      "offerCount": "25"
    }
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
        "name": pageTitle,
        "item": `https://policyperfect.co.in${location.pathname}`
      }
    ]
  };

  return (
    <div className="w-full min-h-screen bg-slate-50 font-sans pb-16">
      <SEO 
        title={seoTitle}
        description={seoDesc}
      />
      <script type="application/ld+json">
        {JSON.stringify(faqSchema)}
      </script>
      <script type="application/ld+json">
        {JSON.stringify(productSchema)}
      </script>
      <script type="application/ld+json">
        {JSON.stringify(breadcrumbSchema)}
      </script>
      
      {/* Hero Section */}
      <section className="bg-white border-b border-slate-200 pt-10 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-[1200px] mx-auto flex flex-col lg:flex-row items-center justify-between gap-12">
          {/* Left Text */}
          <div className="lg:w-[50%] w-full space-y-6">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Home</span>
              <ChevronRight size={14} className="text-slate-400" />
              <span className="text-xs font-bold text-blue-600 uppercase tracking-widest">{pageTitle}</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-800 leading-tight">
              {pageSub}
            </h1>
            <p className="text-lg text-slate-500 leading-relaxed max-w-xl">
              Compare plans from 25+ insurers and save up to 80% on your premium. Protect your vehicle against accidents, theft, and natural disasters.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <button 
                onClick={() => setIsModalOpen(true)}
                className="flex items-center justify-center gap-2 px-8 py-4 bg-[#012e67] text-white rounded-xl font-bold hover:bg-blue-900 transition-all shadow-lg shadow-blue-900/15"
              >
                Get Instant Quote <ArrowRight size={18} />
              </button>
              <a 
                href="#compare-plans"
                className="flex items-center justify-center gap-2 px-8 py-4 border-2 border-slate-200 rounded-xl font-bold text-slate-700 hover:bg-slate-50 transition-all"
              >
                Compare Plans
              </a>
            </div>

            {/* Quick Badges */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-6 border-t border-slate-100">
              {[
                { label: 'Instant Policy', sub: 'Issuance', icon: Clock },
                { label: 'Cashless Claims', sub: 'Network', icon: Shield },
                { label: 'Easy Renewals', sub: 'Instant Online', icon: Settings },
                { label: 'No-Claim Bonus', sub: 'Benefits', icon: Percent }
              ].map((badge, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center flex-shrink-0">
                    <badge.icon size={16} />
                  </div>
                  <div className="text-[10px] leading-tight">
                    <div className="font-extrabold text-slate-700">{badge.label}</div>
                    <div className="text-slate-400 font-bold">{badge.sub}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Image */}
          <div className="lg:w-[45%] w-full relative">
            <div className="w-full aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl border border-slate-200">
              <img src={mainImage} alt={pageTitle} className="w-full h-full object-cover" />
            </div>
            
            {/* Float badge */}
            <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl p-4 shadow-xl border border-slate-100 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-green-50 text-green-500 flex items-center justify-center">
                <CheckCircle2 size={24} />
              </div>
              <div>
                <div className="text-xs text-slate-400 font-bold">Trusted by</div>
                <div className="text-sm font-black text-slate-700">10,000+ Customers</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Plan Types Section */}
      <section id="compare-plans" className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <h2 className="text-3xl font-black text-slate-800">Choose Your Plan</h2>
          <p className="text-slate-500 font-semibold text-sm">Select the plan that best fits your vehicle and budget needs</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              title: 'Third Party Insurance',
              desc: 'Mandatory by law',
              color: 'border-t-green-500',
              bullets: [
                'Covers third-party injury/death',
                'Covers third-party property damage',
                'Lowest premium',
                'Own vehicle damage not covered'
              ]
            },
            {
              title: 'Comprehensive Insurance',
              desc: 'Most recommended',
              color: 'border-t-blue-600',
              featured: true,
              bullets: [
                'Own damage covered',
                'Third party covered',
                'Theft protection',
                'Natural calamities covered',
                'Fire & Explosion covered'
              ]
            },
            {
              title: 'Standalone Own Damage',
              desc: 'For vehicles with active TP',
              color: 'border-t-purple-500',
              bullets: [
                'Own damage protection',
                'Theft coverage',
                'Accident damage',
                'Requires external third party policy'
              ]
            }
          ].map((plan, idx) => (
            <div 
              key={idx} 
              className={`bg-white rounded-2xl shadow-md border-t-4 ${plan.color} p-6 flex flex-col justify-between relative ${
                plan.featured ? 'ring-2 ring-blue-600 scale-[1.02] shadow-lg' : 'border border-slate-100'
              }`}
            >
              {plan.featured && (
                <span className="absolute -top-3 right-6 bg-blue-600 text-white text-[10px] font-extrabold uppercase px-2.5 py-1 rounded-full">
                  Recommended
                </span>
              )}
              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-extrabold text-slate-800">{plan.title}</h3>
                  <p className="text-xs text-slate-400 font-bold mt-1 uppercase tracking-wider">{plan.desc}</p>
                </div>
                <ul className="space-y-3 pt-4 border-t border-slate-50">
                  {plan.bullets.map((b, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-sm text-slate-600 font-medium">
                      {b.includes('not covered') ? (
                        <AlertTriangle size={16} className="text-red-500 flex-shrink-0 mt-0.5" />
                      ) : (
                        <CheckCircle2 size={16} className="text-green-500 flex-shrink-0 mt-0.5" />
                      )}
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
              <button 
                onClick={() => setIsModalOpen(true)}
                className={`w-full py-3 rounded-xl font-bold text-sm mt-8 transition-colors ${
                  plan.featured 
                    ? 'bg-[#012e67] text-white hover:bg-blue-900 shadow-md' 
                    : 'bg-slate-50 text-slate-700 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                View Plans
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Add-on Covers Grid */}
      <section className="bg-white border-y border-slate-200 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-[1200px] mx-auto space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <h2 className="text-3xl font-black text-slate-800">Add-on Covers</h2>
            <p className="text-slate-500 font-semibold text-sm">Enhance your policy with additional protection shields</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
            {[
              { title: 'Zero Depreciation', icon: Shield, desc: 'Get full claim value without depreciation deduction.' },
              { title: 'Engine Protection', icon: Settings, desc: 'Covers water ingression & engine damage.' },
              { title: 'Roadside Assistance', icon: Navigation, desc: '24x7 towing & emergency roadside support.' },
              { title: 'Return To Invoice', icon: FileText, desc: 'Get invoice value if vehicle is total loss.' },
              { title: 'Consumables Cover', icon: Heart, desc: 'Nuts, bolts, engine oil etc covered.' },
              { title: 'Key Replacement', icon: Key, desc: 'Lost or damaged key protection.' }
            ].map((addon, idx) => (
              <div key={idx} className="bg-slate-50 rounded-xl p-4 border border-slate-100 text-center hover:shadow-md transition-shadow">
                <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center mx-auto mb-3">
                  <addon.icon size={20} />
                </div>
                <h4 className="font-extrabold text-sm text-slate-800 mb-1 leading-snug">{addon.title}</h4>
                <p className="text-[10px] text-slate-400 font-medium leading-relaxed">{addon.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* NCB Explained Section */}
      <section className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left: NCB Box */}
          <div className="bg-[#012e67] text-white p-8 rounded-3xl space-y-6 shadow-xl relative overflow-hidden">
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/5 rounded-full blur-2xl"></div>
            <div className="space-y-2">
              <span className="text-xs font-bold text-blue-300 uppercase tracking-widest">No Claim Bonus (NCB)</span>
              <h3 className="text-2xl font-black">NCB Explained Simply</h3>
              <p className="text-sm text-blue-200">Claim-free years give premium discounts.</p>
            </div>
            
            <div className="bg-white/10 rounded-2xl overflow-hidden border border-white/10">
              <table className="w-full text-left text-xs text-blue-100">
                <thead>
                  <tr className="border-b border-white/10 bg-white/5 font-extrabold text-white">
                    <th className="px-4 py-3">Claim-free Years</th>
                    <th className="px-4 py-3">NCB Discount</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 font-bold">
                  <tr><td className="px-4 py-3">1 Year</td><td className="px-4 py-3 text-yellow-300">20%</td></tr>
                  <tr><td className="px-4 py-3">2 Years</td><td className="px-4 py-3 text-yellow-300">25%</td></tr>
                  <tr><td className="px-4 py-3">3 Years</td><td className="px-4 py-3 text-yellow-300">35%</td></tr>
                  <tr><td className="px-4 py-3">4 Years</td><td className="px-4 py-3 text-yellow-300">45%</td></tr>
                  <tr><td className="px-4 py-3">5 Years</td><td className="px-4 py-3 text-yellow-300">50% (Max)</td></tr>
                </tbody>
              </table>
            </div>
            <p className="text-[10px] text-blue-300 font-medium">*NCB is applicable as per insurer policy terms.</p>
          </div>

          {/* Right: Covered / Not Covered */}
          <div className="space-y-6">
            <h3 className="text-2xl font-black text-slate-800">What's Covered & What's Not</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              
              {/* Covered */}
              <div className="bg-green-50/50 p-6 rounded-2xl border border-green-100 space-y-3">
                <h4 className="font-extrabold text-sm text-green-800 uppercase tracking-wider flex items-center gap-1.5">
                  <CheckCircle2 size={16} /> What's Covered
                </h4>
                <ul className="space-y-2 text-xs font-semibold text-slate-600">
                  <li>• Accidental Damage</li>
                  <li>• Theft or Burglary</li>
                  <li>• Fire Damage</li>
                  <li>• Natural Disasters (Flood, Cyclone)</li>
                  <li>• Riots & Strikes</li>
                </ul>
              </div>

              {/* Not Covered */}
              <div className="bg-red-50/50 p-6 rounded-2xl border border-red-100 space-y-3">
                <h4 className="font-extrabold text-sm text-red-800 uppercase tracking-wider flex items-center gap-1.5">
                  <AlertTriangle size={16} /> What's Not Covered
                </h4>
                <ul className="space-y-2 text-xs font-semibold text-slate-600">
                  <li>• Drunk Driving</li>
                  <li>• Driving Without License</li>
                  <li>• Mechanical Breakdown</li>
                  <li>• Consequential Loss</li>
                  <li>• Wear and Tear</li>
                </ul>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* Claim Process Stepper */}
      <section className="bg-white border-y border-slate-200 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-[1200px] mx-auto space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <h2 className="text-3xl font-black text-slate-800">Claim Process</h2>
            <p className="text-slate-500 font-semibold text-sm">Hassle-free claims in 5 simple steps</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
            {[
              { step: '1', title: 'Intimate Claim', desc: 'Inform us about the accident or theft.' },
              { step: '2', title: 'Upload Photos', desc: 'Upload vehicle & damage photographs.' },
              { step: '3', title: 'Survey Inspection', desc: 'Surveyor will inspect the vehicle.' },
              { step: '4', title: 'Repair Approval', desc: 'Get approval and cashless repairs.' },
              { step: '5', title: 'Claim Settlement', desc: 'Claim is settled directly with garage.' }
            ].map((s, idx) => (
              <div key={idx} className="relative text-center space-y-2">
                <div className="w-12 h-12 rounded-full bg-[#012e67] text-white flex items-center justify-center font-extrabold mx-auto text-lg shadow-md">
                  {s.step}
                </div>
                <h4 className="font-extrabold text-slate-800 text-sm">{s.title}</h4>
                <p className="text-xs text-slate-400 font-semibold max-w-[160px] mx-auto leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Partner Insurers */}
      <PartnerLogos />

      {/* Bottom CTA Banner */}
      <section className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 mt-16">
        <div className="bg-gradient-to-r from-blue-700 to-[#012e67] text-white rounded-3xl p-8 md:p-12 text-center space-y-6 relative overflow-hidden shadow-xl">
          <div className="absolute -bottom-20 -left-20 w-88 h-88 bg-white/5 rounded-full blur-3xl"></div>
          <div className="max-w-xl mx-auto space-y-3 relative z-10">
            <h2 className="text-3xl md:text-4xl font-black">Ready to Protect Your Vehicle?</h2>
            <p className="text-blue-200 font-semibold text-sm md:text-base">Compare quotes from top insurers and save up to 80% on your premium instantly.</p>
          </div>
          <div className="flex justify-center relative z-10">
            <button 
              onClick={() => setIsModalOpen(true)}
              className="bg-white text-[#012e67] font-black px-8 py-4 rounded-xl hover:bg-slate-100 transition-colors shadow-lg"
            >
              Get Instant Premium Quote
            </button>
          </div>
        </div>
      </section>

      {/* Modal Lead Capture */}
      <MotorLeadModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        defaultVehicleType={isBike ? 'bike' : 'car'}
      />

    </div>
  );
};

export default MotorInsurance;
