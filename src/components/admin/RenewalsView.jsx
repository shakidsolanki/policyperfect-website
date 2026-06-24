import React, { useState } from 'react';
import { Search, Download, Eye, Filter } from 'lucide-react';
import * as XLSX from 'xlsx';

const RenewalsView = ({ renewals, setRenewals }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredRenewals = renewals.filter(r => 
    r.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    r.policyNo?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    r.mobile?.includes(searchTerm)
  );

  const exportToExcel = () => {
    const exportData = filteredRenewals.map(r => ({
      'Renewal ID': r.id,
      'Date': r.date,
      'Customer Name': r.name,
      'Mobile Number': r.mobile,
      'Email': r.email,
      'Vehicle Number': r.vehicleNo,
      'Insurance Type': 'Motor',
      'Previous Insurance Company': r.prevInsurer,
      'Policy Expiry Date': r.expiryDate,
      'NCB': r.ncb,
      'Renewal Status': r.status
    }));

    const worksheet = XLSX.utils.json_to_sheet(exportData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Renewal_Requests");
    
    const colWidths = [
      { wch: 15 }, { wch: 15 }, { wch: 20 }, { wch: 15 }, 
      { wch: 25 }, { wch: 18 }, { wch: 15 }, { wch: 30 },
      { wch: 20 }, { wch: 10 }, { wch: 18 }
    ];
    worksheet['!cols'] = colWidths;

    XLSX.writeFile(workbook, `Renewal_Requests_${new Date().toISOString().split('T')[0]}.xlsx`);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-xl font-black text-slate-900">Renewal Management</h2>
          <p className="text-sm text-slate-600 mt-1">Track and process policy renewals</p>
        </div>
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <div className="relative flex-grow sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
            <input 
              type="text" 
              placeholder="Search policy, name..." 
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
            className="flex items-center gap-2 px-4 py-2.5 bg-teal-600 hover:bg-teal-700 text-white font-bold rounded-xl text-sm shadow-lg shadow-teal-600/30 transition-all"
          >
            <Download size={16} /> Export
          </button>
        </div>
      </div>

      <div className="bg-white/80 backdrop-blur-xl border border-white rounded-[2rem] shadow-[0_8px_30px_rgba(0,0,0,0.04)] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-600">
            <thead className="bg-slate-50 border-b border-slate-100 text-xs font-bold uppercase text-slate-500 tracking-wider">
              <tr>
                <th className="px-6 py-4">Policy Info</th>
                <th className="px-6 py-4">Customer</th>
                <th className="px-6 py-4">Vehicle & NCB</th>
                <th className="px-6 py-4">Expiry Date</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-semibold">
              {filteredRenewals.length > 0 ? (
                filteredRenewals.map((r) => (
                  <tr key={r.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="text-slate-900 font-bold">{r.policyNo}</div>
                      <div className="text-xs text-slate-500 mt-0.5">{r.prevInsurer}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-slate-900">{r.name}</div>
                      <div className="text-xs text-slate-500 mt-0.5">{r.mobile}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-slate-800">{r.vehicleNo}</div>
                      <div className="text-xs text-brand-gold font-black mt-0.5">NCB: {r.ncb}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-red-500 font-bold">{r.expiryDate}</div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-lg text-[11px] font-bold ${
                        r.status === 'Completed' ? 'bg-green-50 text-green-700 border border-green-100' :
                        'bg-amber-50 text-amber-700 border border-amber-100'
                      }`}>
                        {r.status || 'Pending'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right whitespace-nowrap">
                      <button className="text-brand-gold hover:text-brand-navy p-2 rounded-lg bg-brand-gold/10 hover:bg-brand-gold/20 transition-all">
                        <Eye size={16} />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-slate-500">No renewal requests found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default RenewalsView;
