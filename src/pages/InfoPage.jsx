import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Info, Shield, CheckCircle2, ChevronRight, 
  PhoneCall, Mail, MapPin, MessageSquare, Send, Check, Clock 
} from 'lucide-react';
import HeroBackground from '../components/HeroBackground';
import { db } from '../utils/db';
import SEO from '../components/SEO';

const PAGE_CONTENT = {
  about: {
    title: 'About PolicyPerfect',
    icon: Info,
    color: 'text-blue-600 bg-blue-50',
    description: 'Learn about our mission to simplify insurance for every Indian.',
    dbKey: 'about'
  },
  contact: {
    title: 'Contact Us',
    icon: PhoneCall,
    color: 'text-amber-600 bg-amber-50',
    description: 'Get in touch with PolicyPerfect experts for support, quotes, or claims.',
    dbKey: 'contact'
  },
  careers: {
    title: 'Join the PolicyPerfect Team',
    icon: Shield,
    color: 'text-emerald-600 bg-emerald-50',
    description: 'Explore career opportunities and build the future of insurance technology.',
    text: 'We are always looking for passionate people to help us revolutionize the insurance industry in India. We have open positions across software engineering, digital marketing, sales, and operations. Send your resume to careers@policyperfect.co.in or call +91 75749 48768 to speak to our HR team.'
  },
  partners: {
    title: 'Our Insurance Partners',
    icon: CheckCircle2,
    color: 'text-sky-600 bg-sky-50',
    description: 'We work with India\'s top insurers to bring you the best plans.',
    text: 'We work with 25+ leading insurance providers in India to bring you the best rates and comprehensive coverage options: HDFC ERGO, ICICI Lombard, IndusInd General, Tata AIG, Bajaj Allianz, Digit Insurance, SBI General, IFFCO Tokio, Kotak General, Universal Sompo, and many more.'
  },
  terms: {
    title: 'Terms of Use',
    icon: Info,
    color: 'text-violet-600 bg-violet-50',
    description: 'Read the terms and conditions for using the PolicyPerfect platform.',
    text: 'Welcome to PolicyPerfect. By accessing this website (policyperfect.co.in), you agree to comply with our terms of service. The comparison data, premium calculations, and materials on this site are provided for informational purposes. We make every effort to display accurate premiums, but final rates are determined by the respective insurance companies based on underwriting guidelines.'
  },
  privacy: {
    title: 'Privacy Policy',
    icon: Shield,
    color: 'text-teal-600 bg-teal-50',
    description: 'Your privacy is our top priority. Read how we protect your personal data.',
    text: 'Your privacy is of utmost importance to us. PolicyPerfect collects basic contact details (name, email, phone) and vehicle/health information solely to fetch premium quotes from our insurance partners and save leads for follow-up support. We do not sell or share your personal data with unauthorized third parties. All lead data is encrypted and securely stored.'
  },
  disclaimer: {
    title: 'Disclaimer',
    icon: Info,
    color: 'text-rose-600 bg-rose-50',
    description: 'Important legal notices and disclaimers regarding our services.',
    text: 'Insurance is the subject matter of solicitation. PolicyPerfect acts as an online comparison and advisory portal and does not directly issue policies or guarantee claim settlements. The information displayed is based on details provided by insurers. Customers are advised to read policy terms and conditions carefully before purchasing.'
  },
  refund: {
    title: 'Refund and Cancellation Policy',
    icon: Info,
    color: 'text-violet-600 bg-violet-50',
    description: 'Read our terms regarding refund and cancellation of insurance bookings.',
    text: 'At PolicyPerfect, we strive to provide the best comparison and advisory services. Since premiums are paid directly to the insurance companies, refunds and cancellations are governed by the respective insurance provider\'s policy. If you wish to cancel a policy or seek a refund, you must submit a written request. Refunds will be processed by the insurer according to their guidelines. Feel free to contact our customer support for any assistance.'
  },
  support: {
    title: 'Customer Support',
    icon: Shield,
    color: 'text-blue-600 bg-blue-50',
    description: 'Reach our helpdesk for policy issues, claims, or general questions.',
    text: 'Our dedicated customer support team is here to assist you with all your insurance needs. Whether you need help purchasing a policy, renewing an existing plan, or tracking a claim settlement, we are available 24/7. You can reach out to us at policyperfect.1@gmail.com or call our hotline at +91 75749 48768.'
  },
  isnp: {
    title: 'ISNP Details',
    icon: CheckCircle2,
    color: 'text-indigo-600 bg-indigo-50',
    description: 'Guidelines and disclosures for Insurance Self-Network Platforms (ISNP).',
    text: 'PolicyPerfect is compliant with the regulatory guidelines for Insurance Self-Network Platforms (ISNP).\n\nPlatform Name: Policy Perfect Insurance\nBusiness Type: Insurance Advisory & Assistance Services\nStatus: Active.'
  },
  grievance: {
    title: 'Grievance Redressal',
    icon: Shield,
    color: 'text-rose-600 bg-rose-50',
    description: 'Our customer grievance redressal mechanism and contact points.',
    text: `For any complaint, service issue, policy assistance, or support request, customers may contact:

Policy Perfect Insurance

Email: policyperfect.1@gmail.com

Phone: +91 7574948768

Address:
D-217, Joyos Hubtown,
Modhera Circle,
Near GSRTC Bus Port,
Mahesana,
Gujarat - 384001

Response Time:
Within 24-48 business hours.`
  },
  cookie: {
    title: 'Cookie Policy',
    icon: Info,
    color: 'text-amber-600 bg-amber-50',
    description: 'Learn how we use cookies to improve your user experience.',
    text: `PolicyPerfect uses cookies to enhance your browsing experience, serve personalized content, and analyze our traffic. 

By continuing to visit this site, you agree to our use of cookies. We use cookies to remember your preferences and secure our interactive tools. We do not use cookies to collect personal data without your consent.`
  }
};

function ContactLayout({ contact }) {
  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');
  const [email, setEmail] = useState('');
  const [msg, setMsg] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !mobile) {
      alert('Please enter Name and Mobile number.');
      return;
    }
    setLoading(true);
    try {
      const nowString = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });
      const nowISO = new Date().toISOString().split('T')[0];
      
      const newInquiry = {
        id: 'INQ-' + Date.now().toString().slice(-6),
        date: nowISO,
        name,
        mobile,
        email: email || 'N/A',
        subject: 'Website Contact Form',
        message: msg || 'No message provided',
        status: 'Pending'
      };
      
      const newLead = {
        id: 'L-' + Date.now().toString().slice(-6),
        productType: 'Contact Form',
        date: nowString,
        name,
        mobile,
        email: email || 'N/A',
        insuranceType: 'Contact Inquiry',
        vehicleNumber: 'N/A',
        message: msg || 'No message provided',
        status: 'New',
        createdDate: nowString,
        assignedUser: 'Unassigned'
      };
      
      if (db.addInquiry) {
        await db.addInquiry(newInquiry);
      }
      if (db.addLead) {
        await db.addLead(newLead);
      }
      setSubmitted(true);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-4 not-prose">
      {/* Left side: Contact details */}
      <div className="space-y-6">
        <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100 space-y-4">
          <h3 className="text-lg font-black text-slate-800 flex items-center gap-2">
            <PhoneCall className="text-[#dfb15b]" size={20} />
            Call or WhatsApp
          </h3>
          <div className="space-y-3 font-semibold text-sm">
            <p className="text-slate-600">Call our support helpline for instant guidance:</p>
            <a href={`tel:${contact.phone?.replace(/\s+/g, '') || '+917574948768'}`} className="inline-block px-5 py-2.5 bg-[#0c1b33] text-white hover:bg-[#162a4a] rounded-xl text-center transition-colors">
              📞 {contact.phone || '+91 75749 48768'}
            </a>
            {contact.whatsapp && (
              <div>
                <p className="text-slate-600 mt-2">Or chat with our team on WhatsApp:</p>
                <a 
                  href={`https://wa.me/${contact.whatsapp.replace(/\D/g, '')}`} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#0d9488] text-white hover:bg-[#0f766e] rounded-xl text-center transition-colors"
                >
                  <MessageSquare size={16} /> Chat on WhatsApp
                </a>
              </div>
            )}
          </div>
        </div>

        <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100 space-y-4">
          <h3 className="text-lg font-black text-slate-800 flex items-center gap-2">
            <Mail className="text-teal-600" size={20} />
            Email Address
          </h3>
          <div className="space-y-2 font-semibold text-sm">
            <p className="text-slate-600">Send us your queries, claims, or feedback:</p>
            <a href={`mailto:${contact.email || 'policyperfect.1@gmail.com'}`} className="text-[#dfb15b] hover:text-[#cfa14a] transition-colors break-all">
              {contact.email || 'policyperfect.1@gmail.com'}
            </a>
          </div>
        </div>

        <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100 space-y-4">
          <h3 className="text-lg font-black text-slate-800 flex items-center gap-2">
            <MapPin className="text-rose-600" size={20} />
            Office Address
          </h3>
          <div className="space-y-3 font-semibold text-sm">
            {contact.legalName && (
              <p className="text-slate-800 font-bold">{contact.legalName}</p>
            )}
            <p className="text-slate-600">{contact.address || 'D-217, Joyos Hubtown, Modhera Circle, Nr GSRTC Bus Port, Mahesana, Gujarat. IN. 384001'}</p>
            
            <div className="mt-3">
              <iframe 
                src="https://maps.google.com/maps?q=Joyos%20Hubtown%20Modhera%20Circle%20Mehsana&t=&z=15&ie=UTF8&iwloc=&output=embed" 
                width="100%" 
                height="220" 
                style={{ border: 0 }} 
                allowFullScreen="" 
                loading="lazy" 
                title="Policy Perfect Insurance Office Location"
                className="rounded-xl border border-slate-200"
              />
            </div>
            
            {contact.googleMap && (
              <a 
                href={contact.googleMap} 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-[#dfb15b] hover:text-[#cfa14a] transition-colors"
              >
                📍 Open Location in Google Maps
              </a>
            )}
          </div>
        </div>

        <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100 space-y-4">
          <h3 className="text-lg font-black text-slate-800 flex items-center gap-2">
            <Clock className="text-indigo-600" size={20} />
            Business Hours
          </h3>
          <div className="space-y-2 font-semibold text-sm">
            <p className="text-slate-600">{contact.businessHours || 'Monday - Saturday: 09:00 AM - 07:00 PM | Sunday: By Appointment'}</p>
          </div>
        </div>
      </div>

      {/* Right side: Contact form */}
      <div className="bg-slate-50/50 rounded-3xl border border-slate-100 p-6 sm:p-8">
        {submitted ? (
          <div className="h-full flex flex-col items-center justify-center text-center space-y-3 py-8">
            <div className="w-14 h-14 bg-green-50 text-green-600 rounded-full flex items-center justify-center border border-green-100">
              <Check size={28} strokeWidth={3} />
            </div>
            <h3 className="text-xl font-black text-slate-800">Inquiry Submitted!</h3>
            <p className="text-slate-500 font-semibold text-sm max-w-xs leading-relaxed">
              Thank you for contacting PolicyPerfect. Our expert advisors will get in touch with you shortly.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <h3 className="text-lg font-black text-slate-800">Send us a Message</h3>
            <p className="text-slate-500 text-xs font-semibold leading-relaxed">Fill out the form below and our customer support team will reply within 24 hours.</p>
            
            <div className="space-y-1.5">
              <label className="text-[11px] font-black uppercase text-slate-400">Full Name *</label>
              <input 
                type="text" 
                required 
                value={name} 
                onChange={e => setName(e.target.value)}
                placeholder="Enter your name" 
                className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl font-semibold text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-[#dfb15b]/20 focus:border-[#dfb15b] transition-all"
              />
            </div>

            <div className="grid grid-cols-1 gap-4">
              <div className="space-y-1.5">
                <label className="text-[11px] font-black uppercase text-slate-400">Mobile Number *</label>
                <input 
                  type="tel" 
                  required 
                  value={mobile}
                  onChange={e => setMobile(e.target.value)}
                  placeholder="Enter 10-digit mobile" 
                  className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl font-semibold text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-[#dfb15b]/20 focus:border-[#dfb15b] transition-all"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-[11px] font-black uppercase text-slate-400">Email Address</label>
                <input 
                  type="email" 
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="Enter email address" 
                  className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl font-semibold text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-[#dfb15b]/20 focus:border-[#dfb15b] transition-all"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-[11px] font-black uppercase text-slate-400">Your Message / Requirement</label>
              <textarea 
                rows={3} 
                value={msg}
                onChange={e => setMsg(e.target.value)}
                placeholder="Tell us what you are looking for..." 
                className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl font-semibold text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-[#dfb15b]/20 focus:border-[#dfb15b] transition-all resize-none"
              />
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className="w-full py-3 bg-[#dfb15b] hover:bg-[#cfa14a] text-slate-900 font-black rounded-xl text-sm transition-colors shadow-md shadow-amber-500/10 flex items-center justify-center gap-2"
            >
              {loading ? 'Submitting...' : <><Send size={15} /> Send Inquiry</>}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

export default function InfoPage({ type: propType }) {
  const { type: paramType, pageKey } = useParams();
  const activeType = propType || paramType || pageKey || 'about';
  const [content, setContent] = useState('');
  const [contact, setContact] = useState({
    phone: '',
    whatsapp: '',
    email: '',
    address: '',
    googleMap: '',
    twitter: '',
    facebook: '',
    instagram: '',
    legalName: '',
    businessHours: ''
  });
  const pageData = PAGE_CONTENT[activeType] || PAGE_CONTENT['about'];
  const Icon = pageData.icon;

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchContent = async () => {
      if (pageData.dbKey === 'about') {
        try {
          const aboutData = await db.getAbout();
          if (aboutData && aboutData.text) {
            setContent(aboutData.text);
            return;
          }
        } catch (e) {}
        setContent('PolicyPerfect is India\'s premier online insurance comparison and advisory portal. Established with a vision to simplify insurance, we empower you to compare, choose, and buy the best insurance plans from 25+ top insurers in India. Our mission is to provide 100% transparent rates, zero hidden fees, and dedicated claim support when you need it most.');
      } else if (pageData.dbKey === 'contact') {
        try {
          const contactData = await db.getContact();
          if (contactData) {
            setContact(contactData);
          }
        } catch (e) {}
      } else {
        setContent(pageData.text || '');
      }
    };
    fetchContent();
  }, [activeType, pageData]);

  return (
    <div className="bg-transparent min-h-screen pb-16 sm:pb-24">
      <SEO 
        title={`${pageData.title} | PolicyPerfect`} 
        description={pageData.description}
      />

      {/* Header Banner */}
      <div className="bg-[#0c1b33] text-white py-16 sm:py-20 relative overflow-hidden">
        <HeroBackground isDark={true} icons={[Info, Shield, CheckCircle2, PhoneCall, Mail]} />
        <div className="absolute inset-0 opacity-10 z-0">
          <div className="absolute top-0 right-1/4 w-80 h-80 bg-white/20 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-1/4 w-60 h-60 bg-white/20 rounded-full blur-2xl" />
        </div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="flex items-center justify-center gap-2 text-xs font-black uppercase tracking-widest text-teal-400 mb-4">
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight size={10} />
            <span className="text-slate-400">{pageData.title}</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight leading-none mb-4">
            {pageData.title}
          </h1>
          <p className="text-slate-300 text-sm sm:text-base font-semibold max-w-2xl mx-auto">
            {pageData.description}
          </p>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-20">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-[2rem] shadow-xl border border-slate-100 p-8 sm:p-12"
        >
          <div className="flex items-start gap-6 mb-8">
            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0 border border-slate-100 ${pageData.color}`}>
              <Icon size={28} />
            </div>
            <div>
              <span className="text-[11px] font-black uppercase tracking-wider text-teal-600 block mb-1">Official Document</span>
              <h2 className="text-xl sm:text-2xl font-black text-slate-800 leading-tight">PolicyPerfect Advisory Statement</h2>
            </div>
          </div>

          <div className="prose prose-slate max-w-none">
            {pageData.dbKey === 'contact' ? (
              <ContactLayout contact={contact} />
            ) : (
              <p className="text-[15px] sm:text-[16px] text-slate-600 leading-relaxed font-semibold whitespace-pre-line">
                {content}
              </p>
            )}
          </div>

          <div className="border-t border-slate-100 pt-8 mt-12 flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="text-xs text-slate-400 font-bold">
              Last Updated: June 15, 2026
            </div>
            <Link 
              to="/" 
              className="px-6 py-3 bg-[#dfb15b] hover:bg-[#cfa14a] text-slate-900 font-black rounded-xl text-sm transition-colors shadow-md shadow-amber-500/10 flex items-center gap-2"
            >
              Back to Homepage
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

