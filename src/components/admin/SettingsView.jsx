import React, { useState } from 'react';
import { Save, Check } from 'lucide-react';
import { db } from '../../utils/db';

const SettingsView = ({ settings, setSettings }) => {
  const [saveMsg, setSaveMsg] = useState('');

  const handleSave = () => {
    if (db.setSettings) db.setSettings(settings);
    if (db.setContact) {
      db.setContact({
        phone: settings.supportPhone || '',
        whatsapp: settings.supportPhone?.replace(/\D/g, '').slice(-10) || '',
        email: settings.supportEmail || '',
        address: settings.address || '',
        legalName: settings.legalName || '',
        businessHours: settings.businessHours || ''
      });
    }
    setSaveMsg('System settings updated successfully!');
    setTimeout(() => setSaveMsg(''), 3000);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-black text-slate-900">Website Settings</h2>
        <p className="text-sm text-slate-600 mt-1">Configure global platform settings</p>
      </div>

      {saveMsg && (
        <div className="bg-green-50 text-green-700 border border-green-200 px-4 py-3 rounded-xl text-sm font-bold flex items-center gap-2">
          <Check size={16} /> {saveMsg}
        </div>
      )}

      <div className="bg-white/80 backdrop-blur-xl border border-white rounded-[2rem] p-8 shadow-[0_8px_30px_rgba(0,0,0,0.04)] space-y-8">
        
        {/* Core Info */}
        <div>
          <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider mb-4 border-b border-slate-100 pb-2">Basic Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2">Platform Name</label>
              <input 
                type="text" 
                value={settings?.siteName || ''}
                onChange={(e) => setSettings({...settings, siteName: e.target.value})}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:border-teal-500" 
              />
            </div>
            <div>
              <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2">Legal Entity Name</label>
              <input 
                type="text" 
                value={settings?.legalName || ''}
                onChange={(e) => setSettings({...settings, legalName: e.target.value})}
                placeholder="e.g. Policy Perfect Insurance"
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:border-teal-500" 
              />
            </div>
          </div>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider mb-4 border-b border-slate-100 pb-2">Contact Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2">Support Email</label>
              <input 
                type="email" 
                value={settings?.supportEmail || ''}
                onChange={(e) => setSettings({...settings, supportEmail: e.target.value})}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:border-teal-500" 
              />
            </div>
            <div>
              <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2">Support Phone</label>
              <input 
                type="text" 
                value={settings?.supportPhone || ''}
                onChange={(e) => setSettings({...settings, supportPhone: e.target.value})}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:border-teal-500" 
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2">Admin Notification Email (For Leads & Claims)</label>
              <input 
                type="email" 
                value={settings?.notificationEmail || ''}
                onChange={(e) => setSettings({...settings, notificationEmail: e.target.value})}
                placeholder="admin@policyperfect.co.in"
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:border-teal-500" 
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2">Business Hours</label>
              <input 
                type="text" 
                value={settings?.businessHours || ''}
                onChange={(e) => setSettings({...settings, businessHours: e.target.value})}
                placeholder="e.g. Monday - Saturday: 09:00 AM - 07:00 PM"
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:border-teal-500" 
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2">Office Address</label>
              <input 
                type="text" 
                value={settings?.address || ''}
                onChange={(e) => setSettings({...settings, address: e.target.value})}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:border-teal-500" 
              />
            </div>
          </div>
        </div>

        {/* Third Party */}
        <div>
          <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider mb-4 border-b border-slate-100 pb-2">Integrations</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2">Google Analytics ID</label>
              <input 
                type="text" 
                value={settings?.googleAnalyticsId || ''}
                onChange={(e) => setSettings({...settings, googleAnalyticsId: e.target.value})}
                placeholder="G-XXXXXXXXXX"
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:border-teal-500" 
              />
            </div>
          </div>
        </div>

        <div className="pt-4 flex justify-end">
          <button onClick={handleSave} className="flex items-center gap-2 px-8 py-3 bg-teal-600 hover:bg-teal-700 text-white font-bold rounded-xl text-sm shadow-lg shadow-teal-600/30 transition-all">
            <Save size={16} /> Save Configuration
          </button>
        </div>
      </div>
    </div>
  );
};

export default SettingsView;
