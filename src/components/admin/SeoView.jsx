import React, { useState } from 'react';
import { Save, Check, Globe } from 'lucide-react';
import { db } from '../../utils/db';

const SeoView = ({ seo, setSeo }) => {
  const [saveMsg, setSaveMsg] = useState('');

  const handleSave = () => {
    if (db.setSeo) db.setSeo(seo);
    setSaveMsg('SEO metadata updated successfully!');
    setTimeout(() => setSaveMsg(''), 3000);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-xl font-black text-slate-900">SEO Management</h2>
          <p className="text-sm text-slate-600 mt-1">Optimize how your portal appears on search engines</p>
        </div>
      </div>

      {saveMsg && (
        <div className="bg-green-50 text-green-700 border border-green-200 px-4 py-3 rounded-xl text-sm font-bold flex items-center gap-2">
          <Check size={16} /> {saveMsg}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Form Area */}
        <div className="lg:col-span-2 bg-white/80 backdrop-blur-xl border border-white rounded-[2rem] p-8 shadow-[0_8px_30px_rgba(0,0,0,0.04)] space-y-6">
          <div>
            <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2">Global Meta Title</label>
            <input 
              type="text" 
              value={seo?.metaTitle || ''}
              onChange={(e) => setSeo({...seo, metaTitle: e.target.value})}
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:border-teal-500" 
            />
          </div>

          <div>
            <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2">Global Meta Description</label>
            <textarea 
              rows={4}
              value={seo?.metaDescription || ''}
              onChange={(e) => setSeo({...seo, metaDescription: e.target.value})}
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:border-teal-500" 
            />
            <p className="text-xs text-slate-400 mt-2 text-right">Recommended length: 150-160 characters</p>
          </div>

          <div>
            <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2">Meta Keywords (Comma separated)</label>
            <input 
              type="text" 
              value={seo?.keywords || ''}
              onChange={(e) => setSeo({...seo, keywords: e.target.value})}
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:border-teal-500" 
            />
          </div>

          <div>
            <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2">Open Graph Image URL</label>
            <input 
              type="text" 
              value={seo?.ogImage || ''}
              onChange={(e) => setSeo({...seo, ogImage: e.target.value})}
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:border-teal-500" 
            />
          </div>

          <div>
            <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2">Canonical URL</label>
            <input 
              type="text" 
              value={seo?.canonicalUrl || ''}
              onChange={(e) => setSeo({...seo, canonicalUrl: e.target.value})}
              placeholder="e.g. https://policyperfect.co.in"
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:border-teal-500" 
            />
          </div>

          <div>
            <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2">Schema Description</label>
            <textarea 
              rows={3}
              value={seo?.schemaDescription || ''}
              onChange={(e) => setSeo({...seo, schemaDescription: e.target.value})}
              placeholder="e.g. PolicyPerfect Insurance is an Insurance Advisory & Assistance Platform in Mahesana, Gujarat."
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:border-teal-500" 
            />
          </div>

          <div className="pt-4 flex justify-end">
            <button onClick={handleSave} className="flex items-center gap-2 px-8 py-3 bg-teal-600 hover:bg-teal-700 text-white font-bold rounded-xl text-sm shadow-lg shadow-teal-600/30 transition-all">
              <Save size={16} /> Update SEO
            </button>
          </div>
        </div>

        {/* Live Preview */}
        <div className="lg:col-span-1">
          <div className="bg-white border border-slate-200 rounded-[2rem] p-6 shadow-sm sticky top-6">
            <h3 className="flex items-center gap-2 text-sm font-black text-slate-900 uppercase tracking-wider mb-6 border-b border-slate-100 pb-3">
              <Globe size={16} className="text-blue-500" /> Search Preview
            </h3>
            
            <div className="space-y-1">
              <div className="text-xs text-slate-500 mb-2 font-medium break-words">https://www.policyperfect.co.in/</div>
              <div className="text-lg text-blue-600 font-medium leading-tight cursor-pointer hover:underline">
                {seo?.metaTitle || 'Default Page Title'}
              </div>
              <div className="text-sm text-slate-600 leading-snug mt-1">
                {seo?.metaDescription || 'No description provided. Search engines will generate an excerpt based on the page content.'}
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default SeoView;
