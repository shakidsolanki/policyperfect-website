import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { db } from '../utils/db';
import { 
  PhoneCall, MessageCircle, ShieldCheck, FileText, Clock, AlertTriangle, 
  CheckCircle2, XCircle, ChevronDown, ChevronUp, AlertCircle,
  Camera, FileSignature, Landmark, Zap, CreditCard, Activity,
  FileSearch, PenTool, CheckSquare, Search, FileKey, Scale, Settings, MapPin
} from 'lucide-react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';

const ClaimSupport = () => {
  const [activeFaq, setActiveFaq] = useState(null);
  const [activeDocTab, setActiveDocTab] = useState('ownDamage');
  const [contact, setContact] = useState({});

  useEffect(() => {
    window.scrollTo(0, 0);
    try { setContact(db.getContact()); } catch(e){}
  }, []);

  const processSteps = [
    { title: 'Accident Occurs', desc: 'Accident or damage happens.' },
    { title: 'Intimate Insurer', desc: 'Inform insurance company immediately.' },
    { title: 'Claim Registration', desc: 'Claim number is generated.' },
    { title: 'Surveyor Appointment', desc: 'Surveyor assigned to your case.' },
    { title: 'Vehicle Inspection', desc: 'Surveyor inspects the damage.' },
    { title: 'Submit Documents', desc: 'Provide all required paperwork.' },
    { title: 'Estimate Approval', desc: 'Repair estimate is approved.' },
    { title: 'Vehicle Repair', desc: 'Garage starts repairing.' },
    { title: 'Bill Verification', desc: 'Final invoice is checked.' },
    { title: 'Claim Settlement', desc: 'Payment made to garage/customer.' }
  ];

  const docTabs = {
    ownDamage: {
      title: 'Own Damage Claim',
      docs: ['RC Copy', 'Driving License', 'Insurance Policy Copy', 'Claim Form', 'Repair Estimate', 'Vehicle Photos']
    },
    accidental: {
      title: 'Accidental Claim',
      docs: ['RC Copy', 'Driving License', 'Insurance Policy', 'Claim Form', 'FIR (if applicable)', 'Repair Bills', 'Photographs']
    },
    theft: {
      title: 'Theft Claim',
      docs: ['FIR Copy', 'Final Police Report', 'Original RC', 'Insurance Policy', 'Vehicle Keys', 'Claim Form', 'Identity Proof']
    }
  };

  const rejections = [
    { title: 'Policy Expired', desc: 'Driving with an expired or lapsed insurance policy.' },
    { title: 'Invalid License', desc: 'Driving without a valid driving license.' },
    { title: 'Drunk Driving', desc: 'Driving under the influence of alcohol or drugs.' },
    { title: 'Fraudulent Information', desc: 'Providing fake documents or staged accidents.' },
    { title: 'Delayed Intimation', desc: 'Failing to inform insurer within 24-48 hours.' },
    { title: 'Commercial Use', desc: 'Using a private vehicle for commercial purposes.' },
    { title: 'Consequential Damage', desc: 'Damage caused by driving a vehicle after an accident (e.g. engine hydrostatic lock).' },
    { title: 'Unauthorized Driver', desc: 'Driven by someone not authorized or under-aged.' },
    { title: 'Illegal Activities', desc: 'Vehicle used in any unlawful activity.' },
    { title: 'Document Mismatch', desc: 'Discrepancies in RC, Policy or DL details.' },
    { title: 'Policy Violation', desc: 'Breach of specific terms and conditions of the policy.' }
  ];

  const faqs = [
    { q: 'What is a claim intimation?', a: 'Claim intimation is the formal process of informing your insurance company that an incident (accident, theft, or damage) has occurred which may lead to a claim.' },
    { q: 'When is FIR mandatory?', a: 'An FIR is mandatory in cases involving third-party property damage, bodily injury, theft of the vehicle, or malicious damage (e.g., riots or vandalism).' },
    { q: 'How long does claim approval take?', a: 'Cashless claims usually get initial approval within 24-48 hours of survey. Final settlement depends on repair completion. Reimbursement takes 7-15 days after document submission.' },
    { q: 'What is depreciation in claims?', a: 'Depreciation is the reduction in the value of vehicle parts over time due to wear and tear. Insurers deduct this amount unless you have a Zero Depreciation add-on.' },
    { q: 'Will NCB be affected after a claim?', a: 'Yes, making a claim will usually reset your No Claim Bonus (NCB) to zero for the next renewal, unless you have an NCB Protect add-on cover.' },
    { q: 'What is the difference between cashless and reimbursement?', a: 'In cashless, the insurer pays the network garage directly. In reimbursement, you pay the repair bills first and the insurer pays you back later.' },
    { q: 'Can a claim be rejected after the survey?', a: 'Yes. If the surveyor finds discrepancies, policy violations, or exclusions during or after the inspection, the claim can still be rejected.' },
    { q: 'How can I track my claim status?', a: 'You can track your claim via the insurer\'s portal, our Customer Dashboard, or by calling our claim helpdesk with your claim reference number.' }
  ];

  return (
    <div className="min-h-screen bg-[#f8fafc] font-sans pb-20 overflow-hidden">
      <SEO 
        title="Insurance Claim Assistance | Fast & Transparent | PolicyPerfect" 
        description="Fast, Transparent and Hassle-Free Claim Support. Understand claim processes, required documents, tracking, and get expert assistance from Policy Perfect."
      />

      {/* --- HERO SECTION --- */}
      <div className="bg-[#0c1b33] pt-28 pb-32 relative">
        {/* Abstract background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[100%] bg-teal-500/10 rounded-full blur-[120px]" />
          <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[100%] bg-blue-500/10 rounded-full blur-[120px]" />
        </div>
        
        <div className="max-w-[1200px] mx-auto px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-teal-500/10 border border-teal-500/20 text-teal-300 text-[12px] font-black uppercase tracking-widest mb-6">
              <ShieldCheck size={14} /> 24x7 Claim Helpdesk
            </motion.div>
            <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6 leading-tight tracking-tight">
              Insurance Claim <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-cyan-300">Assistance</span>
            </motion.h1>
            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-slate-300 font-medium text-lg mb-10 leading-relaxed">
              Fast, Transparent and Hassle-Free Claim Support. Because we know what matters most when things go wrong.
            </motion.p>
            
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a href={`tel:${contact?.phone?.replace(/\s+/g, '') || '18001234567'}`} className="flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-teal-600 to-teal-500 hover:from-teal-500 hover:to-teal-400 text-white rounded-2xl font-black text-[15px] shadow-xl shadow-teal-900/50 transition-all w-full sm:w-auto">
                <PhoneCall size={18} /> Call Claim Support
              </a>
              <a href={`https://wa.me/91${contact?.whatsapp || '7574948768'}`} target="_blank" rel="noreferrer" className="flex items-center justify-center gap-2 px-8 py-4 bg-[#25D366]/10 hover:bg-[#25D366]/20 border border-[#25D366]/30 text-[#25D366] rounded-2xl font-black text-[15px] backdrop-blur-md transition-all w-full sm:w-auto">
                <MessageCircle size={18} /> WhatsApp Us
              </a>
            </motion.div>

            {/* Trust Indicators */}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="flex flex-wrap justify-center gap-6 mt-12 pt-8 border-t border-white/10">
              {[
                { icon: ShieldCheck, text: 'Claim Support' },
                { icon: FileSignature, text: 'Documentation Help' },
                { icon: Zap, text: 'Quick Guidance' }
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-2 text-slate-400 text-[13px] font-bold uppercase tracking-wider">
                  <item.icon size={16} className="text-teal-400" /> {item.text}
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>

      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 relative z-20 -mt-10">

        {/* --- CASHLESS LOCATOR CTA --- */}
        <div className="bg-gradient-to-r from-teal-600 to-blue-700 rounded-3xl shadow-xl p-8 sm:p-10 mb-12 relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl pointer-events-none"></div>
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
                <MapPin size={24} className="text-white" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-white">Find Cashless Network</h2>
            </div>
            <p className="text-teal-50 font-medium text-[15px] max-w-xl leading-relaxed">
              Locate 10,000+ cashless network hospitals and 5,000+ cashless garages across India. Check live availability and get directions instantly via Google Maps.
            </p>
          </div>
          <div className="relative z-10 w-full md:w-auto flex-shrink-0">
            <Link to="/cashless" className="flex items-center justify-center gap-2 px-8 py-4 bg-white text-teal-700 hover:bg-slate-50 rounded-2xl font-black text-[15px] shadow-lg transition-transform hover:scale-105 w-full">
              <Search size={18} /> Search Nearby
            </Link>
          </div>
        </div>

        {/* --- WHAT IS AN INSURANCE CLAIM --- */}
        <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 p-8 sm:p-10 border border-slate-100 mb-12 flex flex-col md:flex-row items-center gap-8">
          <div className="w-16 h-16 rounded-2xl bg-teal-50 text-teal-600 flex items-center justify-center flex-shrink-0 border border-teal-100">
            <FileSearch size={32} />
          </div>
          <div>
            <h2 className="text-2xl font-black text-slate-900 mb-2">What is an Insurance Claim?</h2>
            <p className="text-[15px] text-slate-600 font-medium leading-relaxed">
              An insurance claim is a formal request made by the policyholder to the insurance company for compensation against a covered loss, accident, damage, or insured event. It's the moment when your policy's promise is delivered.
            </p>
          </div>
        </div>

        {/* --- TYPES OF CLAIMS --- */}
        <div className="grid md:grid-cols-2 gap-6 mb-16">
          <div className="bg-gradient-to-br from-white to-slate-50 p-8 rounded-3xl border border-slate-200 shadow-sm hover:shadow-lg transition-all group">
            <div className="w-12 h-12 rounded-xl bg-teal-100 text-teal-700 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <CreditCard size={24} />
            </div>
            <h3 className="text-xl font-black text-slate-900 mb-4">Cashless Claim</h3>
            <ul className="space-y-3">
              {[
                'Vehicle repaired at network garage',
                'Insurance company settles approved amount directly with garage',
                'Faster & smoother process',
                'Less paperwork and out-of-pocket hassle'
              ].map((text, i) => (
                <li key={i} className="flex items-start gap-3">
                  <CheckCircle2 size={18} className="text-teal-500 mt-0.5 flex-shrink-0" />
                  <span className="text-[14px] font-semibold text-slate-700">{text}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-gradient-to-br from-white to-slate-50 p-8 rounded-3xl border border-slate-200 shadow-sm hover:shadow-lg transition-all group">
            <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Landmark size={24} />
            </div>
            <h3 className="text-xl font-black text-slate-900 mb-4">Reimbursement Claim</h3>
            <ul className="space-y-3">
              {[
                'Customer pays the repair bill initially out-of-pocket',
                'Documents and original bills submitted to insurer',
                'Approved claim amount reimbursed later to bank account',
                'Offers freedom to choose any non-network garage'
              ].map((text, i) => (
                <li key={i} className="flex items-start gap-3">
                  <CheckCircle2 size={18} className="text-blue-500 mt-0.5 flex-shrink-0" />
                  <span className="text-[14px] font-semibold text-slate-700">{text}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* --- PROCESS TIMELINE --- */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-black text-slate-900">Complete Motor Claim Process</h2>
            <p className="text-slate-500 font-medium mt-2">Step-by-step transparent journey from accident to settlement</p>
          </div>
          
          <div className="relative">
            {/* Connecting line */}
            <div className="absolute left-[20px] md:left-1/2 top-4 bottom-4 w-1 bg-teal-100 md:-translate-x-1/2 rounded-full" />
            
            <div className="space-y-8">
              {processSteps.map((step, idx) => (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }}
                  key={idx} className={`flex flex-col md:flex-row items-start md:items-center relative ${idx % 2 === 0 ? 'md:flex-row-reverse' : ''}`}
                >
                  <div className={`ml-12 md:ml-0 md:w-1/2 ${idx % 2 === 0 ? 'md:pl-12' : 'md:pr-12 md:text-right'}`}>
                    <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md hover:border-teal-200 transition-all">
                      <h4 className="text-[15px] font-black text-slate-900 mb-1">Step {idx + 1}: {step.title}</h4>
                      <p className="text-[13px] font-medium text-slate-500">{step.desc}</p>
                    </div>
                  </div>
                  
                  {/* Node */}
                  <div className="absolute left-0 md:left-1/2 top-4 md:top-1/2 w-10 h-10 bg-teal-600 border-4 border-white rounded-full md:-translate-x-1/2 md:-translate-y-1/2 shadow-md flex items-center justify-center text-white text-[12px] font-black">
                    {idx + 1}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* --- DOCUMENTS REQUIRED --- */}
        <div className="bg-white rounded-[2rem] shadow-sm border border-slate-200 p-6 md:p-10 mb-20 overflow-hidden relative">
          <div className="absolute top-0 right-0 w-64 h-64 bg-slate-50 rounded-full blur-3xl -z-10 -mr-20 -mt-20"></div>
          <div className="text-center mb-8">
            <h2 className="text-3xl font-black text-slate-900">Documents Required</h2>
            <p className="text-slate-500 font-medium mt-2">Keep these ready for a swift resolution</p>
          </div>

          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {Object.entries(docTabs).map(([key, data]) => (
              <button 
                key={key} onClick={() => setActiveDocTab(key)}
                className={`px-6 py-3 rounded-xl font-bold text-[14px] transition-all ${
                  activeDocTab === key ? 'bg-slate-900 text-white shadow-lg' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {data.title}
              </button>
            ))}
          </div>

          <div className="max-w-3xl mx-auto bg-slate-50 rounded-2xl p-6 md:p-8 border border-slate-100">
            <AnimatePresence mode="wait">
              <motion.div 
                key={activeDocTab}
                initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }}
                className="grid sm:grid-cols-2 gap-4"
              >
                {docTabs[activeDocTab].docs.map((doc, i) => (
                  <div key={i} className="flex items-center gap-3 bg-white px-4 py-3 rounded-xl border border-slate-200 shadow-sm">
                    <CheckSquare size={16} className="text-teal-500 flex-shrink-0" />
                    <span className="text-[13px] font-bold text-slate-700">{doc}</span>
                  </div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* --- REJECTIONS & TIPS --- */}
        <div className="grid lg:grid-cols-2 gap-8 mb-20">
          
          <div className="bg-red-50/50 rounded-3xl p-8 border border-red-100">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 bg-red-100 text-red-600 rounded-xl flex items-center justify-center">
                <XCircle size={24} />
              </div>
              <h2 className="text-2xl font-black text-slate-900">Reasons for Rejection</h2>
            </div>
            <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
              {rejections.map((item, i) => (
                <div key={i} className="bg-white p-4 rounded-xl border border-red-50 shadow-sm">
                  <h4 className="text-[14px] font-black text-slate-800 flex items-center gap-2 mb-1">
                    <AlertCircle size={14} className="text-red-500" /> {item.title}
                  </h4>
                  <p className="text-[12px] text-slate-500 font-medium pl-6">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-teal-50/50 rounded-3xl p-8 border border-teal-100">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 bg-teal-100 text-teal-600 rounded-xl flex items-center justify-center">
                <ShieldCheck size={24} />
              </div>
              <h2 className="text-2xl font-black text-slate-900">Important Claim Tips</h2>
            </div>
            <div className="grid gap-3">
              {[
                'Inform insurer immediately after accident.',
                'Take clear photographs of vehicle damage before moving it.',
                'Do not repair vehicle before survey approval.',
                'Keep original invoices and repair bills safe.',
                'Maintain complete and clean documentation.',
                'Cooperate with surveyor during inspection.'
              ].map((tip, i) => (
                <div key={i} className="flex items-start gap-3 bg-white p-4 rounded-xl border border-teal-50 shadow-sm">
                  <CheckCircle2 size={18} className="text-teal-500 flex-shrink-0 mt-0.5" />
                  <span className="text-[14px] font-bold text-slate-700">{tip}</span>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* --- SETTLEMENT TIMELINE & STATUS TRACKER MOCK --- */}
        <div className="grid md:grid-cols-2 gap-8 mb-20">
          <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-200">
            <h3 className="text-xl font-black text-slate-900 mb-6 flex items-center gap-2">
              <Clock size={20} className="text-slate-400" /> Settlement Timeline
            </h3>
            <div className="space-y-5">
              {[
                { label: 'Claim Registration', time: 'Same Day', color: 'bg-blue-500' },
                { label: 'Survey Appointment', time: '24–48 Hours', color: 'bg-indigo-500' },
                { label: 'Document Verification', time: '2–5 Days', color: 'bg-purple-500' },
                { label: 'Approval Process', time: '3–10 Days', color: 'bg-teal-500' },
                { label: 'Final Settlement', time: 'Varies', color: 'bg-emerald-500' }
              ].map((t, i) => (
                <div key={i} className="flex items-center justify-between group">
                  <div className="flex items-center gap-3">
                    <div className={`w-3 h-3 rounded-full ${t.color}`} />
                    <span className="text-[14px] font-bold text-slate-700 group-hover:text-slate-900">{t.label}</span>
                  </div>
                  <span className="px-3 py-1 bg-slate-50 border border-slate-100 rounded-lg text-[12px] font-black text-slate-500">{t.time}</span>
                </div>
              ))}
            </div>
            <p className="text-[11px] font-medium text-slate-400 mt-6 italic">* Actual timelines may vary based on insurer requirements and claim complexity.</p>
          </div>

          <div className="bg-slate-900 rounded-3xl p-8 shadow-xl border border-slate-800 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-teal-500/20 rounded-full blur-3xl"></div>
            <h3 className="text-xl font-black mb-6 flex items-center gap-2">
              <Activity size={20} className="text-teal-400" /> Track Claim Status
            </h3>
            <p className="text-[13px] text-slate-400 mb-6 font-medium">Log in to Customer Dashboard to track real-time status:</p>
            
            <div className="space-y-4">
              {['Registered', 'Survey Pending', 'Documents Pending', 'Under Review', 'Approved', 'Settled'].map((s, i) => (
                <div key={i} className="flex items-center gap-3 opacity-50">
                  <div className="w-4 h-4 rounded-full border-2 border-slate-600 flex-shrink-0" />
                  <span className="text-[13px] font-bold">{s}</span>
                </div>
              ))}
            </div>
            
            <a href="/login" className="mt-8 block text-center py-3 bg-white/10 hover:bg-white/20 border border-white/10 rounded-xl text-[13px] font-bold transition-colors">
              Login to Track Status
            </a>
          </div>
        </div>

        {/* --- ASSISTANCE & FAQs --- */}
        <div className="mb-20">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-black text-slate-900">Policy Perfect Claim Assistance</h2>
            <p className="text-slate-500 font-medium mt-2">Premium end-to-end support for our customers</p>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-16">
            {[
              { icon: PhoneCall, title: 'Free Claim Guidance' },
              { icon: FileSignature, title: 'Documentation Support' },
              { icon: Scale, title: 'Survey Coordination' },
              { icon: Activity, title: 'Claim Follow-Up Assistance' },
              { icon: AlertTriangle, title: 'Claim Escalation Support' },
              { icon: Settings, title: 'Customer Helpdesk Support' }
            ].map((item, i) => (
              <div key={i} className="bg-white p-5 rounded-2xl border border-slate-100 flex items-center gap-4 hover:border-teal-200 hover:shadow-md transition-all">
                <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center flex-shrink-0">
                  <item.icon size={18} />
                </div>
                <h4 className="text-[14px] font-black text-slate-800">{item.title}</h4>
              </div>
            ))}
          </div>

          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-black text-slate-900 text-center mb-8">Frequently Asked Questions</h2>
            <div className="space-y-4">
              {faqs.map((faq, idx) => (
                <div key={idx} className="bg-white border border-slate-200 rounded-2xl overflow-hidden transition-all hover:border-teal-200">
                  <button 
                    onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                    className="w-full px-6 py-5 flex items-center justify-between text-left focus:outline-none"
                  >
                    <span className="text-[14px] font-black text-slate-800 pr-4">{faq.q}</span>
                    {activeFaq === idx ? <ChevronUp size={18} className="text-teal-600 flex-shrink-0" /> : <ChevronDown size={18} className="text-slate-400 flex-shrink-0" />}
                  </button>
                  <AnimatePresence>
                    {activeFaq === idx && (
                      <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                        <div className="px-6 pb-5 pt-1 text-[13px] font-medium text-slate-600 leading-relaxed border-t border-slate-100">
                          {faq.a}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* --- DISCLAIMER --- */}
        <div className="border-t border-slate-200 pt-8 pb-4 text-center max-w-4xl mx-auto">
          <p className="text-[11px] font-medium text-slate-400 leading-relaxed uppercase tracking-wide">
            Disclaimer: Claim approval, admissibility and settlement are subject to policy terms, insurer guidelines, survey findings, documentation and applicable regulations. Final decision rests solely with the respective insurance company.
          </p>
        </div>

      </div>
    </div>
  );
};

export default ClaimSupport;
