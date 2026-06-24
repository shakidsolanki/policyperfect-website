import React, { useState } from 'react';
import { Search, Download, Edit, Filter, Plus, MapPin, Phone } from 'lucide-react';
import * as XLSX from 'xlsx';

const GaragesView = ({ garages, setGarages }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredGarages = garages.filter(g => 
    g.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    g.city?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    g.companies?.some(c => c.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const exportToExcel = () => {
    const exportData = filteredGarages.map(g => ({
      'Garage ID': g.id,
      'Name': g.name,
      'City': g.city,
      'State': g.state,
      'Address': g.address,
      'Phone': g.phone,
      'Supported Companies': g.companies.join(', '),
      'Status': g.status
    }));

    const worksheet = XLSX.utils.json_to_sheet(exportData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Cashless_Garages");
    
    const colWidths = [
      { wch: 10 }, { wch: 30 }, { wch: 15 }, { wch: 15 }, 
      { wch: 40 }, { wch: 15 }, { wch: 30 }, { wch: 10 }
    ];
    worksheet['!cols'] = colWidths;

    XLSX.writeFile(workbook, `Cashless_Garages_${new Date().toISOString().split('T')[0]}.xlsx`);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-xl font-black text-slate-900">Cashless Garage Network</h2>
          <p className="text-sm text-slate-600 mt-1">Manage the network of approved workshops</p>
        </div>
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <div className="relative flex-grow sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
            <input 
              type="text" 
              placeholder="Search garage, city, insurer..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm font-medium outline-none focus:border-teal-500 focus:ring-4 focus:ring-teal-500/10 transition-all"
            />
          </div>
          <button className="p-2.5 bg-white border border-slate-200 rounded-xl text-slate-600 hover:text-teal-600 hover:border-teal-200 transition-colors">
            <Filter size={18} />
          </button>
          <button 
            onClick={exportToExcel}
            className="flex items-center gap-2 px-4 py-2.5 bg-white border border-slate-200 text-slate-700 font-bold rounded-xl text-sm hover:bg-slate-50 transition-all"
          >
            <Download size={16} /> Export
          </button>
          <button className="flex items-center gap-2 px-4 py-2.5 bg-teal-600 hover:bg-teal-700 text-white font-bold rounded-xl text-sm shadow-lg shadow-teal-600/30 transition-all">
            <Plus size={16} /> Add Garage
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredGarages.map(g => (
          <div key={g.id} className="bg-white/80 backdrop-blur-xl border border-white rounded-[2rem] p-6 shadow-[0_8px_30px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)] transition-all">
            <div className="flex justify-between items-start mb-4">
              <div className="w-12 h-12 bg-teal-50 text-teal-600 rounded-2xl flex items-center justify-center">
                <MapPin size={24} />
              </div>
              <span className={`px-2.5 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider ${g.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                {g.status}
              </span>
            </div>
            
            <h3 className="text-lg font-bold text-slate-900 mb-1">{g.name}</h3>
            <p className="text-sm text-slate-500 mb-4 h-10">{g.address}, {g.city}, {g.state}</p>
            
            <div className="space-y-3 mb-6">
              <div className="flex items-center gap-2 text-sm text-slate-600 font-medium">
                <Phone size={14} className="text-slate-400" />
                {g.phone}
              </div>
              <div>
                <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">Supported Insurers</p>
                <div className="flex flex-wrap gap-2">
                  {g.companies.map((c, i) => (
                    <span key={i} className="px-2 py-1 bg-slate-100 text-slate-600 text-xs font-semibold rounded-md">
                      {c}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 flex justify-end">
              <button className="flex items-center gap-1.5 text-brand-gold hover:text-brand-navy font-bold text-sm transition-colors">
                <Edit size={14} /> Edit
              </button>
            </div>
          </div>
        ))}

        {filteredGarages.length === 0 && (
          <div className="col-span-full py-12 text-center text-slate-500">
            No cashless garages found matching your search.
          </div>
        )}
      </div>
    </div>
  );
};

export default GaragesView;
