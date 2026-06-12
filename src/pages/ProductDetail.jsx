import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Shield, CheckCircle2, AlertTriangle, ArrowRight, 
  ChevronRight, HeartPulse, Home, Flame, Plane, 
  Clock, Percent, Stethoscope, Banknote, HelpCircle
} from 'lucide-react';
import SEO from '../components/SEO';
import { PartnerLogos } from '../components/HomeSections';
import ProductQuoteModal from '../components/ProductQuoteModal';

const ProductDetail = () => {
  const { type } = useParams();
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [type]);

  const productDB = {
    health: {
      title: 'Health Insurance',
      sub: 'Comprehensive Medical Coverage',
      color: 'teal',
      icon: HeartPulse,
      bgImg: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80&w=1200',
      seoDesc: 'Compare and buy the best health insurance plans online. Get cashless treatment at 10,000+ hospitals, pre & post hospitalization cover, and high claim settlement ratio.',
      desc: 'Protect your savings from rising medical costs. Our comprehensive health insurance plans offer cashless treatments, maternity cover, and extensive network hospital access.',
      badges: [
        { label: 'Cashless Network', sub: '10,000+ Hospitals', icon: Shield },
        { label: 'Pre & Post Care', sub: 'Up to 90 days', icon: Clock },
        { label: 'Tax Benefits', sub: 'Under Sec 80D', icon: Percent },
        { label: 'Free Checkups', sub: 'Annual Health Check', icon: Stethoscope }
      ],
      covered: [
        'In-patient Hospitalization',
        'Pre & Post Hospitalization',
        'Day Care Treatments',
        'Ambulance Charges',
        'Organ Donor Expenses',
        'Domiciliary Treatment'
      ],
      notCovered: [
        'Pre-existing diseases (until waiting period)',
        'Cosmetic Surgery',
        'Self-inflicted injuries',
        'Unproven treatments',
        'Cost of spectacles/lenses'
      ],
      faqs: [
        { q: 'What is a waiting period in health insurance?', a: 'A waiting period is the time you must wait before certain diseases or pre-existing conditions are covered by the policy. It generally ranges from 1 to 4 years.' },
        { q: 'Are maternity expenses covered?', a: 'Yes, but usually after a waiting period ranging from 9 months to 4 years depending on the specific health insurance plan.' }
      ],
      process: [
        { step: '1', title: 'Intimate Hospital', desc: 'Show your health card at network hospital.' },
        { step: '2', title: 'Pre-Authorization', desc: 'Hospital sends request to insurer/TPA.' },
        { step: '3', title: 'Approval', desc: 'Insurer approves cashless treatment.' },
        { step: '4', title: 'Treatment', desc: 'Get treated without paying cash.' },
        { step: '5', title: 'Discharge', desc: 'Sign documents and get discharged.' }
      ]
    },
    life: {
      title: 'Term Life Insurance',
      sub: 'Financial Security for Your Family',
      color: 'blue',
      icon: Shield,
      bgImg: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&q=80&w=1200',
      seoDesc: 'Buy the best term life insurance policy online in India. Secure your family’s future with high life cover at low premiums. Compare plans and buy instantly.',
      desc: 'Ensure your family’s financial independence in your absence. Term insurance provides high coverage at very affordable premiums, securing your loved ones forever.',
      badges: [
        { label: 'High Cover', sub: 'Low Premiums', icon: Banknote },
        { label: 'Tax Benefits', sub: 'Under Sec 80C', icon: Percent },
        { label: 'Claim Support', sub: 'Dedicated Manager', icon: CheckCircle2 },
        { label: 'Critical Illness', sub: 'Add-on Covers', icon: HeartPulse }
      ],
      covered: [
        'Death due to natural causes',
        'Death due to accidents',
        'Death due to critical illness',
        'Terminal illness benefits (if opted)',
        'Waiver of premium on disability'
      ],
      notCovered: [
        'Suicide within first year',
        'Death due to drug/alcohol abuse',
        'Death participating in hazardous sports',
        'Death involving criminal acts'
      ],
      faqs: [
        { q: 'Who should buy Term Life Insurance?', a: 'Anyone who has financial dependents (parents, spouse, children) or outstanding debts should absolutely buy term insurance.' },
        { q: 'What is the ideal coverage amount?', a: 'A general rule of thumb is to have a life cover that is at least 15 to 20 times your current annual income.' }
      ],
      process: [
        { step: '1', title: 'Claim Intimation', desc: 'Nominee informs the insurance company.' },
        { step: '2', title: 'Document Submission', desc: 'Submit death certificate & policy documents.' },
        { step: '3', title: 'Verification', desc: 'Insurer verifies the submitted documents.' },
        { step: '4', title: 'Approval', desc: 'Claim is approved after verification.' },
        { step: '5', title: 'Payout', desc: 'Sum assured transferred to nominee.' }
      ]
    },
    home: {
      title: 'Home Insurance',
      sub: 'Protect Your Dream House',
      color: 'amber',
      icon: Home,
      bgImg: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&q=80&w=1200',
      seoDesc: 'Comprehensive Home Insurance to protect your house structure and contents against fire, theft, and natural disasters. Get instant quotes.',
      desc: 'Safeguard your biggest asset. Home insurance protects your building structure and personal belongings from unforeseeable events like fires, floods, and burglaries.',
      badges: [
        { label: 'Structure Cover', sub: 'Building Protection', icon: Home },
        { label: 'Contents Cover', sub: 'Appliances & Furniture', icon: Shield },
        { label: 'Natural Calamities', sub: 'Earthquake/Flood', icon: AlertTriangle },
        { label: 'Burglary', sub: 'Theft Protection', icon: Banknote }
      ],
      covered: [
        'Fire and allied perils',
        'Earthquakes and Lightning',
        'Storms, Cyclones, and Floods',
        'Theft and Burglary',
        'Riot, Strike and Malicious Damage',
        'Aircraft Damage'
      ],
      notCovered: [
        'Normal wear and tear',
        'Damage due to war or nuclear perils',
        'Loss of cash or bullion',
        'Damage to property unoccupied for >30 days',
        'Deliberate damage'
      ],
      faqs: [
        { q: 'Do tenants need home insurance?', a: 'Yes! Tenants can buy Contents Insurance to protect their appliances, electronics, and furniture against theft and fire, even if they do not own the structure.' },
        { q: 'Is earthquake coverage included?', a: 'In most modern home insurance policies (like Bharat Griha Raksha), earthquake and natural disaster cover is built-in.' }
      ],
      process: [
        { step: '1', title: 'Report Incident', desc: 'Inform the police (for theft) and insurer.' },
        { step: '2', title: 'Surveyor Visit', desc: 'Insurer assigns surveyor to assess damage.' },
        { step: '3', title: 'Submit Proofs', desc: 'Provide FIR, repair estimates, and photos.' },
        { step: '4', title: 'Assessment', desc: 'Insurer evaluates the claim amount.' },
        { step: '5', title: 'Settlement', desc: 'Funds are disbursed for repair/replacement.' }
      ]
    },
    fire: {
      title: 'Fire & Burglary Insurance',
      sub: 'Commercial & Asset Protection',
      color: 'red',
      icon: Flame,
      bgImg: 'https://images.unsplash.com/photo-1616422285623-1466986eb7be?auto=format&fit=crop&q=80&w=1200',
      seoDesc: 'Standard Fire and Special Perils policy to protect businesses, factories, and commercial spaces. Compare quotes for fire insurance.',
      desc: 'Essential protection for businesses, factories, and warehouses. Our Fire & Burglary policies cover loss of assets, machinery, and inventory against accidental fires and theft.',
      badges: [
        { label: 'Asset Protection', sub: 'Machinery & Stock', icon: Shield },
        { label: 'Special Perils', sub: 'Riots & Strikes', icon: AlertTriangle },
        { label: 'Business Interruption', sub: 'Loss of Profit Cover', icon: Banknote },
        { label: 'Customizable', sub: 'Tailored for your industry', icon: CheckCircle2 }
      ],
      covered: [
        'Fire, Lightning, and Explosion',
        'Riot, Strike, Malicious Damage',
        'Storm, Cyclone, Flood',
        'Impact damage by vehicles',
        'Burglary and housebreaking (if opted)'
      ],
      notCovered: [
        'Spontaneous combustion',
        'Theft during or after a fire',
        'Damage due to war or nuclear risks',
        'Pollution or contamination',
        'Loss of earnings (unless Add-on taken)'
      ],
      faqs: [
        { q: 'Who should buy Standard Fire Insurance?', a: 'Any business owner, manufacturer, warehouse operator, or commercial property owner should have fire insurance to protect their assets.' },
        { q: 'What is Loss of Profit cover?', a: 'Also known as Business Interruption insurance, it compensates you for the loss of income while your business operations are halted due to fire damage.' }
      ],
      process: [
        { step: '1', title: 'Control Fire', desc: 'Call fire brigade & minimize further loss.' },
        { step: '2', title: 'Intimate Claim', desc: 'Inform insurance company immediately.' },
        { step: '3', title: 'Surveyor Visit', desc: 'Surveyor assesses the commercial damage.' },
        { step: '4', title: 'Documentation', desc: 'Submit Fire Brigade report, FIR & books of accounts.' },
        { step: '5', title: 'Settlement', desc: 'Claim is finalized and disbursed.' }
      ]
    },
    travel: {
      title: 'Travel Insurance',
      sub: 'Explore The World Worry-Free',
      color: 'sky',
      icon: Plane,
      bgImg: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&q=80&w=1200',
      seoDesc: 'Buy international travel insurance online. Coverage for medical emergencies, flight delays, lost baggage, and trip cancellations.',
      desc: 'Secure your domestic or international trips. Travel insurance provides emergency medical assistance, baggage loss cover, and trip cancellation protection so you can fly with peace of mind.',
      badges: [
        { label: 'Medical Emergencies', sub: 'Global Coverage', icon: HeartPulse },
        { label: 'Lost Baggage', sub: 'Financial Comp', icon: Shield },
        { label: 'Flight Delays', sub: 'Reimbursement', icon: Clock },
        { label: 'Trip Cancellation', sub: 'Pre-trip Protection', icon: AlertTriangle }
      ],
      covered: [
        'Emergency Medical Expenses abroad',
        'Loss of Passport',
        'Loss or delay of checked-in baggage',
        'Flight delay or cancellation',
        'Personal Liability',
        'Medical Evacuation'
      ],
      notCovered: [
        'Pre-existing medical conditions (unless stated)',
        'Traveling against medical advice',
        'Injuries from adventure sports (unless add-on taken)',
        'Loss of baggage due to negligence'
      ],
      faqs: [
        { q: 'Is travel insurance mandatory for international trips?', a: 'It is mandatory for Schengen countries and a few others. However, it is highly recommended for ALL international trips due to high medical costs abroad.' },
        { q: 'How does cashless hospitalization work abroad?', a: 'Your insurer provides an international toll-free number. In an emergency, call the TPA, and they will arrange direct settlement with the foreign hospital.' }
      ],
      process: [
        { step: '1', title: 'Emergency Occurs', desc: 'Medical issue or baggage lost abroad.' },
        { step: '2', title: 'Call Hotline', desc: 'Contact the 24/7 global TPA hotline.' },
        { step: '3', title: 'Get Assistance', desc: 'TPA guides you to nearest network hospital.' },
        { step: '4', title: 'Submit Proofs', desc: 'For baggage/delays, submit airline reports.' },
        { step: '5', title: 'Settlement', desc: 'Cashless treatment or rapid reimbursement.' }
      ]
    }
  };

  const data = productDB[type] || productDB.health;
  const Icon = data.icon;

  // Determine dynamic color classes
  const getColors = () => {
    switch(data.color) {
      case 'teal': return { bg: 'bg-teal-600', hover: 'hover:bg-teal-700', text: 'text-teal-600', light: 'bg-teal-50', border: 'border-teal-200' };
      case 'blue': return { bg: 'bg-blue-600', hover: 'hover:bg-blue-700', text: 'text-blue-600', light: 'bg-blue-50', border: 'border-blue-200' };
      case 'amber': return { bg: 'bg-amber-500', hover: 'hover:bg-amber-600', text: 'text-amber-600', light: 'bg-amber-50', border: 'border-amber-200' };
      case 'red': return { bg: 'bg-red-600', hover: 'hover:bg-red-700', text: 'text-red-600', light: 'bg-red-50', border: 'border-red-200' };
      case 'sky': return { bg: 'bg-sky-500', hover: 'hover:bg-sky-600', text: 'text-sky-600', light: 'bg-sky-50', border: 'border-sky-200' };
      default: return { bg: 'bg-teal-600', hover: 'hover:bg-teal-700', text: 'text-teal-600', light: 'bg-teal-50', border: 'border-teal-200' };
    }
  };
  const colors = getColors();

  return (
    <div className="w-full min-h-screen bg-slate-50 font-sans pb-16">
      <SEO title={`${data.title} - PolicyPerfect`} description={data.seoDesc} />

      {/* Hero Section */}
      <section className="bg-[#0c1b33] border-b border-slate-800 pt-10 pb-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className={`absolute top-0 right-0 w-96 h-96 ${colors.bg} rounded-full blur-[100px] opacity-20 pointer-events-none`}></div>
        <div className="max-w-[1200px] mx-auto flex flex-col lg:flex-row items-center justify-between gap-12 relative z-10">
          
          <div className="lg:w-[50%] w-full space-y-6">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Home</span>
              <ChevronRight size={14} className="text-slate-500" />
              <span className={`text-xs font-bold ${colors.text} uppercase tracking-widest brightness-150`}>{data.title}</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white leading-tight">
              {data.sub}
            </h1>
            <p className="text-lg text-slate-300 leading-relaxed max-w-xl">
              {data.desc}
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <button 
                onClick={() => setIsModalOpen(true)}
                className={`flex items-center justify-center gap-2 px-8 py-4 ${colors.bg} text-white rounded-xl font-bold ${colors.hover} transition-all shadow-lg`}
              >
                Get Free Quote <ArrowRight size={18} />
              </button>
            </div>

            {/* Quick Badges */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-6 border-t border-slate-800">
              {data.badges.map((badge, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <div className={`w-8 h-8 rounded-lg bg-white/5 ${colors.text} flex items-center justify-center flex-shrink-0 brightness-150`}>
                    <badge.icon size={16} />
                  </div>
                  <div className="text-[10px] leading-tight">
                    <div className="font-extrabold text-slate-200">{badge.label}</div>
                    <div className="text-slate-400 font-bold">{badge.sub}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:w-[45%] w-full relative">
            <div className="w-full aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl border border-slate-700">
              <img src={data.bgImg} alt={data.title} className="w-full h-full object-cover" />
            </div>
            
            <div className="absolute -bottom-6 -left-6 bg-slate-900 rounded-2xl p-4 shadow-2xl border border-slate-700 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-green-500/20 text-green-400 flex items-center justify-center">
                <CheckCircle2 size={24} />
              </div>
              <div>
                <div className="text-xs text-slate-400 font-bold">Trusted by</div>
                <div className="text-sm font-black text-white">10,000+ Customers</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Covered vs Not Covered */}
      <section className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-12">
          <h2 className="text-3xl font-black text-slate-800">What's Covered & What's Not</h2>
          <p className="text-slate-500 font-semibold text-sm">Complete transparency on policy inclusions and exclusions.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Covered */}
          <div className="bg-white p-8 rounded-3xl border border-green-200 shadow-xl shadow-green-100/50 space-y-6">
            <div className="flex items-center gap-3 border-b border-green-100 pb-4">
              <div className="w-12 h-12 rounded-xl bg-green-50 text-green-600 flex items-center justify-center">
                <CheckCircle2 size={24} />
              </div>
              <h3 className="text-2xl font-black text-slate-800">Inclusions</h3>
            </div>
            <ul className="space-y-4">
              {data.covered.map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <div className="mt-1 w-5 h-5 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                    <CheckCircle2 size={12} className="text-green-600" />
                  </div>
                  <span className="text-slate-700 font-semibold">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Not Covered */}
          <div className="bg-white p-8 rounded-3xl border border-red-200 shadow-xl shadow-red-100/50 space-y-6">
            <div className="flex items-center gap-3 border-b border-red-100 pb-4">
              <div className="w-12 h-12 rounded-xl bg-red-50 text-red-600 flex items-center justify-center">
                <AlertTriangle size={24} />
              </div>
              <h3 className="text-2xl font-black text-slate-800">Exclusions</h3>
            </div>
            <ul className="space-y-4">
              {data.notCovered.map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <div className="mt-1 w-5 h-5 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0">
                    <AlertTriangle size={12} className="text-red-600" />
                  </div>
                  <span className="text-slate-700 font-semibold">{item}</span>
                </li>
              ))}
            </ul>
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
            {data.process.map((s, idx) => (
              <div key={idx} className="relative text-center space-y-2">
                <div className={`w-12 h-12 rounded-full ${colors.bg} text-white flex items-center justify-center font-extrabold mx-auto text-lg shadow-md`}>
                  {s.step}
                </div>
                <h4 className="font-extrabold text-slate-800 text-sm">{s.title}</h4>
                <p className="text-xs text-slate-400 font-semibold max-w-[160px] mx-auto leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="max-w-[800px] mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-8">
        <div className="text-center space-y-3">
          <h2 className="text-3xl font-black text-slate-800">Frequently Asked Questions</h2>
          <p className="text-slate-500 font-semibold text-sm">Got questions? We've got answers.</p>
        </div>
        
        <div className="space-y-4">
          {data.faqs.map((faq, idx) => (
            <div key={idx} className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
              <h4 className="text-sm font-extrabold text-slate-800 flex items-start gap-2">
                <HelpCircle size={18} className={`${colors.text} flex-shrink-0`} />
                {faq.q}
              </h4>
              <p className="text-sm text-slate-500 font-semibold mt-2 pl-6 leading-relaxed">
                {faq.a}
              </p>
            </div>
          ))}
        </div>
      </section>

      <PartnerLogos />

      {/* Bottom CTA */}
      <section className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 mt-16">
        <div className={`bg-gradient-to-r ${colors.bg} to-slate-900 text-white rounded-3xl p-8 md:p-12 text-center space-y-6 relative overflow-hidden shadow-xl`}>
          <div className="absolute -bottom-20 -left-20 w-88 h-88 bg-white/5 rounded-full blur-3xl"></div>
          <div className="max-w-xl mx-auto space-y-3 relative z-10">
            <h2 className="text-3xl md:text-4xl font-black">Ready to Secure Your Future?</h2>
            <p className="text-slate-300 font-semibold text-sm md:text-base">Get comprehensive coverage at the best market rates today.</p>
          </div>
          <div className="flex justify-center relative z-10">
            <button 
              onClick={() => setIsModalOpen(true)}
              className="bg-white text-slate-900 font-black px-8 py-4 rounded-xl hover:bg-slate-50 transition-colors shadow-lg"
            >
              Get Free Consultation
            </button>
          </div>
        </div>
      </section>

      {/* Lead Capture Modal */}
      <ProductQuoteModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        productType={type}
      />
    </div>
  );
};

export default ProductDetail;
