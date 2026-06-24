import React, { useState, useEffect } from 'react';
import { Heart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { db } from '../utils/db';

const Footer = () => {
  const [logo, setLogo] = useState({ url: '/logo.png', width: '150' });
  const [aboutText, setAboutText] = useState('PolicyPerfect is India\'s premier online insurance comparison and advisory portal.');
  const [contact, setContact] = useState({
    phone: '+91 7574948768',
    email: 'policyperfect.1@gmail.com',
    address: 'D-217, Joyos Hubtown, Modhera Circle, Nr GSRTC Bus Port, Mahesana, Gujarat. IN. 384001',
    legalName: 'Policy Perfect Insurance'
  });

  useEffect(() => {
    try { 
      const logoData = db.getLogo();
      if (logoData && logoData.url) {
        // If logo in DB is logo-white, force logo.png for light footer background
        const logoUrl = logoData.url.includes('white') ? '/logo.png' : logoData.url;
        setLogo({ url: logoUrl, width: logoData.width || '150' });
      }
    } catch(e){}
    try { 
      const aboutData = db.getAbout();
      if(aboutData && aboutData.text) setAboutText(aboutData.text); 
    } catch(e){}
    try {
      const contactData = db.getContact();
      if (contactData && contactData.phone) {
        setContact(contactData);
      }
    } catch(e){}
  }, []);

  return (
    <footer className="bg-[#EFE7DC] text-slate-700 pt-16 pb-8 border-t border-slate-200 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          
          <div className="col-span-1 md:col-span-1 space-y-4">
            <Link to="/" className="flex items-center">
              <img src={logo.url} alt="Policy Perfect" style={{ width: `${logo.width}px`, maxWidth: '100%' }} className="h-auto object-contain" />
            </Link>
            <p className="text-sm text-slate-600 leading-relaxed">
              Compare and buy the best insurance policies online. We help you find the right coverage at the best price.
            </p>
            <div className="text-xs text-slate-650 space-y-2 pt-2 border-t border-slate-300">
              <p className="font-bold text-slate-800">{contact.legalName || 'Policy Perfect Insurance'}</p>
              <p>📍 {contact.address || 'D-217, Joyos Hubtown, Modhera Circle, Nr GSRTC Bus Port, Mahesana, Gujarat. IN. 384001'}</p>
              <p>📞 Phone: <a href={`tel:${contact.phone?.replace(/\s+/g, '') || '+917574948768'}`} className="hover:text-amber-800 font-bold">{contact.phone || '+91 7574948768'}</a></p>
              <p>✉️ Email: <a href={`mailto:${contact.email || 'policyperfect.1@gmail.com'}`} className="hover:text-amber-800 font-bold">{contact.email || 'policyperfect.1@gmail.com'}</a></p>
            </div>
          </div>

          <div>
            <h3 className="text-slate-900 font-bold mb-4 uppercase text-sm tracking-wider">Insurance</h3>
            <ul className="space-y-3">
              <li><Link to="/motor-insurance" className="text-sm text-slate-600 hover:text-amber-800 transition-colors">Car Insurance</Link></li>
              <li><Link to="/motor-insurance" className="text-sm text-slate-600 hover:text-amber-800 transition-colors">Bike Insurance</Link></li>
              <li><Link to="/health-insurance" className="text-sm text-slate-600 hover:text-amber-800 transition-colors">Health Insurance</Link></li>
              <li><Link to="/life-insurance" className="text-sm text-slate-600 hover:text-amber-800 transition-colors">Life Insurance</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-slate-900 font-bold mb-4 uppercase text-sm tracking-wider">Company</h3>
            <ul className="space-y-3">
              <li><Link to="/about-us" className="text-sm text-slate-600 hover:text-amber-800 transition-colors">About Us</Link></li>
              <li><Link to="/info/careers" className="text-sm text-slate-600 hover:text-amber-800 transition-colors">Careers</Link></li>
              <li><Link to="/contact-us" className="text-sm text-slate-600 hover:text-amber-800 transition-colors">Contact Us</Link></li>
              <li><Link to="/info/partners" className="text-sm text-slate-600 hover:text-amber-800 transition-colors">Partners</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-slate-900 font-bold mb-4 uppercase text-sm tracking-wider">Legal</h3>
            <ul className="space-y-3">
              <li><Link to="/terms-and-conditions" className="text-sm text-slate-600 hover:text-amber-800 transition-colors">Terms & Conditions</Link></li>
              <li><Link to="/privacy-policy" className="text-sm text-slate-600 hover:text-amber-800 transition-colors">Privacy Policy</Link></li>
              <li><Link to="/disclaimer" className="text-sm text-slate-600 hover:text-amber-800 transition-colors">Disclaimer</Link></li>
              <li><Link to="/refund-cancellation-policy" className="text-sm text-slate-600 hover:text-amber-800 transition-colors">Refund & Cancellation Policy</Link></li>
              <li><Link to="/grievance-redressal" className="text-sm text-slate-600 hover:text-amber-800 transition-colors">Grievance Redressal</Link></li>
              <li><Link to="/cookie-policy" className="text-sm text-slate-600 hover:text-amber-800 transition-colors">Cookie Policy</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-300 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-slate-500 text-center md:text-left max-w-3xl leading-relaxed">
            *Standard T&C Apply. Insurance is the subject matter of solicitation. {contact.legalName || 'Policy Perfect Insurance'} acts as an online insurance comparison and advisory portal and does not directly issue policies or guarantee claim settlements. All premium rates and details are subject to underwriting guidelines of the respective insurer.
          </p>
          <div className="flex items-center gap-1 text-sm text-slate-500">
            Made with <Heart size={14} className="text-red-500 fill-current" /> in India
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
