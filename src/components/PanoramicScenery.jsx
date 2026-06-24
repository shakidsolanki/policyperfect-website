import React, { useState, useEffect } from 'react';
import { MapPin, Phone, Mail } from 'lucide-react';
import { db } from '../utils/db';

const PanoramicScenery = () => {
  const [contact, setContact] = useState({
    phone: '',
    whatsapp: '',
    email: '',
    address: '',
    googleMap: '',
    twitter: '',
    facebook: '',
    instagram: ''
  });

  useEffect(() => {
    const fetchContact = async () => {
      try {
        const contactData = await db.getContact();
        if (contactData) {
          setContact(prev => ({ ...prev, ...contactData }));
        }
      } catch (e) {
        console.error('Error fetching contact in PanoramicScenery:', e);
      }
    };
    fetchContact();
  }, []);

  return (
    <div className="w-full overflow-hidden bg-white border-t border-slate-100">
      <div className="max-w-[1000px] mx-auto py-4 px-6 select-none">
        {/* Sky, Illustrations & Road Area */}
        <div className="w-full">
          <img 
            src="/panoramic-scenery-vector.png?v=5" 
            className="w-full h-auto block pointer-events-none" 
            alt="PolicyPerfect Insurance Scenes Panoramic Footer Scenery" 
          />
        </div>
      </div>

      {/* Ground Line / Contact Info Bar */}
      <div className="w-full bg-[#EFE7DC] text-slate-700 py-5 px-6 relative z-10 border-t border-slate-200">
        <div className="max-w-[1320px] mx-auto flex flex-col md:flex-row justify-between items-center gap-6 text-xs font-semibold">
          {/* Address & Google Maps */}
          <div className="flex flex-col md:flex-row items-center md:items-start gap-2.5 text-center md:text-left">
            <div className="flex items-center gap-1.5">
              <MapPin size={16} className="text-amber-700" />
              <span className="text-slate-500 font-bold uppercase tracking-wider text-[10px]">Office Address</span>
            </div>
            <div className="flex flex-col">
              <span className="text-slate-700">{contact.address || 'Gujarat, India'}</span>
              {contact.googleMap && (
                <a 
                  href={contact.googleMap} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-amber-800 hover:text-amber-950 transition-colors flex items-center gap-1 mt-1 justify-center md:justify-start"
                >
                  📍 View Location on Google Maps
                </a>
              )}
            </div>
          </div>

          {/* Contact: Phone & Email */}
          <div className="flex flex-col sm:flex-row items-center gap-6 text-center">
            {contact.phone && (
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-white border border-slate-200 flex items-center justify-center text-amber-700 shadow-sm">
                  <Phone size={14} />
                </div>
                <div className="flex flex-col text-left">
                  <span className="text-[9px] uppercase font-black tracking-widest text-slate-500">Call Us</span>
                  <a href={`tel:${contact.phone.replace(/\s+/g, '')}`} className="text-slate-700 hover:text-amber-700 transition-colors">
                    {contact.phone}
                  </a>
                </div>
              </div>
            )}
            {contact.email && (
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-white border border-slate-200 flex items-center justify-center text-amber-700 shadow-sm">
                  <Mail size={14} />
                </div>
                <div className="flex flex-col text-left">
                  <span className="text-[9px] uppercase font-black tracking-widest text-slate-500">Email Us</span>
                  <a href={`mailto:${contact.email}`} className="text-slate-700 hover:text-amber-700 transition-colors break-all">
                    {contact.email}
                  </a>
                </div>
              </div>
            )}
          </div>

          {/* Social Icons */}
          <div className="flex items-center gap-3 justify-center">
            {contact.facebook && (
              <a 
                href={contact.facebook} 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-white border border-slate-200 hover:border-amber-600 hover:bg-[#dfb15b]/20 hover:text-amber-800 flex items-center justify-center transition-all duration-300 text-slate-500 shadow-sm"
                aria-label="Facebook"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/>
                </svg>
              </a>
            )}
            {contact.twitter && (
              <a 
                href={contact.twitter} 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-white border border-slate-200 hover:border-amber-600 hover:bg-[#dfb15b]/20 hover:text-amber-800 flex items-center justify-center transition-all duration-300 text-slate-500 shadow-sm"
                aria-label="Twitter/X"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
            )}
            {contact.instagram && (
              <a 
                href={contact.instagram} 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-white border border-slate-200 hover:border-amber-600 hover:bg-[#dfb15b]/20 hover:text-amber-800 flex items-center justify-center transition-all duration-300 text-slate-500 shadow-sm"
                aria-label="Instagram"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0 3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
            )}
            {contact.whatsapp && (
              <a 
                href={`https://wa.me/${contact.whatsapp.replace(/\D/g, '')}`} 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-white border border-slate-200 hover:border-amber-600 hover:bg-[#dfb15b]/20 hover:text-amber-800 flex items-center justify-center transition-all duration-300 text-slate-500 shadow-sm"
                aria-label="WhatsApp"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.457L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.37 9.864-9.799.002-2.63-1.023-5.101-2.885-6.965C16.59 1.978 14.121.954 11.996.954c-5.44 0-9.866 4.372-9.87 9.802 0 1.726.471 3.414 1.365 4.9l-.994 3.63 3.76-.932zm11.758-6.994c-.3-.15-1.772-.875-2.046-.975-.276-.1-.476-.15-.676.15-.2.3-.775.975-.95 1.175-.175.2-.35.225-.65.075-1.025-.512-1.747-.962-2.433-2.14-.175-.3-.175-.557-.025-.707.137-.137.3-.35.45-.525.15-.175.2-.3.3-.5.1-.2.05-.375-.025-.525-.075-.15-.676-1.625-.926-2.225-.244-.589-.493-.51-.676-.51-.175-.01-.375-.01-.575-.01-.2 0-.525.075-.8.375-.275.3-1.05 1.025-1.05 2.5s1.075 2.9 1.225 3.1c.15.2 2.11 3.224 5.112 4.521.714.308 1.272.492 1.707.63.717.228 1.368.196 1.883.119.574-.085 1.772-.725 2.022-1.425.25-.7 0-1.275-.075-1.425-.075-.15-.275-.225-.575-.375z"/>
                </svg>
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PanoramicScenery;
