import React, { useState } from 'react';
import { Save, Plus, Edit2, Trash2, Check, X } from 'lucide-react';
import { db } from '../../utils/db';

const CmsView = ({ banner, setBanner, faqs, setFaqs, testimonials, setTestimonials, about, setAbout }) => {
  const [subTab, setSubTab] = useState('banner');
  const [saveMsg, setSaveMsg] = useState('');

  const handleSaveBanner = () => {
    if (db.setBanner) db.setBanner(banner);
    setSaveMsg('Banner settings saved successfully!');
    setTimeout(() => setSaveMsg(''), 3000);
  };

  const handleSaveAbout = () => {
    if (db.setAbout) db.setAbout(about);
    setSaveMsg('About Us text saved successfully!');
    setTimeout(() => setSaveMsg(''), 3000);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-black text-slate-900">Content Management System</h2>
        <p className="text-sm text-slate-600 mt-1">Manage website content, FAQs, and testimonials</p>
      </div>

      {/* Sub Tabs */}
      <div className="flex flex-wrap gap-2">
        {['banner', 'about', 'faqs', 'testimonials'].map(tab => (
          <button
            key={tab}
            onClick={() => setSubTab(tab)}
            className={`px-4 py-2 rounded-xl text-sm font-bold capitalize transition-all ${
              subTab === tab 
              ? 'bg-slate-900 text-white shadow-lg shadow-slate-900/20' 
              : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {saveMsg && (
        <div className="bg-green-50 text-green-700 border border-green-200 px-4 py-3 rounded-xl text-sm font-bold flex items-center gap-2">
          <Check size={16} /> {saveMsg}
        </div>
      )}

      {/* Banner Tab */}
      {subTab === 'banner' && (
        <div className="bg-white/80 backdrop-blur-xl border border-white rounded-[2rem] p-6 shadow-[0_8px_30px_rgba(0,0,0,0.04)]">
          <h3 className="text-lg font-bold text-slate-900 mb-4">Homepage Banner Details</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2">Image URL</label>
              <input 
                type="text" 
                value={banner?.imageUrl || ''}
                onChange={(e) => setBanner({...banner, imageUrl: e.target.value})}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:border-teal-500" 
              />
            </div>
            <div>
              <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2">Redirect URL (On Click)</label>
              <input 
                type="text" 
                value={banner?.redirectUrl || ''}
                onChange={(e) => setBanner({...banner, redirectUrl: e.target.value})}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:border-teal-500" 
              />
            </div>
            <button onClick={handleSaveBanner} className="flex items-center gap-2 px-6 py-3 bg-teal-600 hover:bg-teal-700 text-white font-bold rounded-xl text-sm transition-all">
              <Save size={16} /> Save Banner
            </button>
          </div>
        </div>
      )}

      {/* About Tab */}
      {subTab === 'about' && (
        <div className="bg-white/80 backdrop-blur-xl border border-white rounded-[2rem] p-6 shadow-[0_8px_30px_rgba(0,0,0,0.04)]">
          <h3 className="text-lg font-bold text-slate-900 mb-4">About Us Content</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2">About Us Text</label>
              <textarea 
                rows={6}
                value={about?.text || ''}
                onChange={(e) => setAbout({text: e.target.value})}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:border-teal-500" 
              />
            </div>
            <button onClick={handleSaveAbout} className="flex items-center gap-2 px-6 py-3 bg-teal-600 hover:bg-teal-700 text-white font-bold rounded-xl text-sm transition-all">
              <Save size={16} /> Save Content
            </button>
          </div>
        </div>
      )}

      {/* FAQs Tab */}
      {subTab === 'faqs' && (
        <div className="bg-white/80 backdrop-blur-xl border border-white rounded-[2rem] p-6 shadow-[0_8px_30px_rgba(0,0,0,0.04)]">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-bold text-slate-900">Manage FAQs</h3>
            <button className="flex items-center gap-2 px-4 py-2 bg-slate-900 text-white font-bold rounded-lg text-xs">
              <Plus size={14} /> Add FAQ
            </button>
          </div>
          <div className="space-y-4">
            {faqs.map(faq => (
              <div key={faq.id} className="p-4 border border-slate-200 rounded-xl bg-slate-50 flex justify-between items-start gap-4">
                <div>
                  <h4 className="font-bold text-slate-800 text-sm">{faq.question}</h4>
                  <p className="text-xs text-slate-600 mt-1">{faq.answer}</p>
                </div>
                <div className="flex items-center gap-2">
                  <button className="text-teal-600 hover:text-teal-800"><Edit2 size={16} /></button>
                  <button className="text-red-500 hover:text-red-700"><Trash2 size={16} /></button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Testimonials Tab */}
      {subTab === 'testimonials' && (
        <div className="bg-white/80 backdrop-blur-xl border border-white rounded-[2rem] p-6 shadow-[0_8px_30px_rgba(0,0,0,0.04)]">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-bold text-slate-900">Manage Testimonials</h3>
            <button className="flex items-center gap-2 px-4 py-2 bg-slate-900 text-white font-bold rounded-lg text-xs">
              <Plus size={14} /> Add Review
            </button>
          </div>
          <div className="space-y-4">
            {testimonials.map(t => (
              <div key={t.id} className="p-4 border border-slate-200 rounded-xl bg-slate-50 flex justify-between items-start gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="font-bold text-slate-800 text-sm">{t.name}</h4>
                    <span className="text-[10px] bg-brand-gold/20 text-brand-navy px-2 py-0.5 rounded font-black">{t.rating} Stars</span>
                  </div>
                  <p className="text-xs text-slate-600 mt-1 italic">"{t.text}"</p>
                </div>
                <div className="flex items-center gap-2">
                  <button className="text-teal-600 hover:text-teal-800"><Edit2 size={16} /></button>
                  <button className="text-red-500 hover:text-red-700"><Trash2 size={16} /></button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CmsView;
