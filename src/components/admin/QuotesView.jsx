import React, { useState } from 'react';
import { Search, Download, Eye, Filter } from 'lucide-react';
import * as XLSX from 'xlsx';

const QuotesView = ({ leads, setLeads }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredLeads = leads.filter(l => 
    l.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    l.mobile?.includes(searchTerm) ||
    l.productType?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const exportToExcel = () => {
    // Required Excel Export Fields: Request ID, Date, Customer Name, Mobile Number, Email, City, Insurance Type, Vehicle Type, Vehicle Number, Previous Insurance Company, Policy Expiry Date, Request Status
    const exportData = filteredLeads.map(lead => ({
      'Request ID': lead.id,
      'Date': lead.date,
      'Customer Name': lead.name,
      'Mobile Number': lead.mobile,
      'Email': lead.email || 'N/A',
      'City': lead.city || 'N/A',
      'Insurance Type': lead.productType,
      'Vehicle Type': lead.make ? `${lead.make} ${lead.model}` : 'N/A',
      'Vehicle Number': lead.regNo || 'N/A',
      'Previous Insurance Company': lead.prevInsurer || 'N/A',
      'Policy Expiry Date': lead.expiryDate || 'N/A',
      'Request Status': lead.status || 'Pending'
    }));

    const worksheet = XLSX.utils.json_to_sheet(exportData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Quote_Requests");
    
    // Auto-size columns
    const colWidths = [
      { wch: 15 }, { wch: 25 }, { wch: 20 }, { wch: 15 }, { wch: 25 },
      { wch: 15 }, { wch: 20 }, { wch: 25 }, { wch: 15 }, { wch: 25 },
      { wch: 15 }, { wch: 15 }
    ];
    worksheet['!cols'] = colWidths;

    XLSX.writeFile(workbook, `Quote_Requests_${new Date().toISOString().split('T')[0]}.xlsx`);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-xl font-black text-slate-900">Quote Request Management</h2>
          <p className="text-sm text-slate-600 mt-1">Manage and export customer insurance leads</p>
        </div>
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <div className="relative flex-grow sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
            <input 
              type="text" 
              placeholder="Search name, mobile, product..." 
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
                <th className="px-6 py-4">Request Date</th>
                <th className="px-6 py-4">Product Type</th>
                <th className="px-6 py-4">Customer Info</th>
                <th className="px-6 py-4">Vehicle/Asset Details</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-semibold">
              {filteredLeads.length > 0 ? (
                filteredLeads.map((l) => (
                  <tr key={l.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4 text-xs text-slate-500 whitespace-nowrap">{l.date}</td>
                    <td className="px-6 py-4">
                      <span className="bg-teal-50 text-teal-700 border border-teal-100 px-3 py-1 rounded-lg text-[11px] font-bold">
                        {l.productType}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-slate-900">{l.name}</div>
                      <div className="text-xs text-slate-500 mt-0.5">{l.mobile}</div>
                    </td>
                    <td className="px-6 py-4 text-xs">
                      {l.make ? `${l.make} ${l.model} (${l.regNo || 'New'})` : 'N/A'}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-lg text-[11px] font-bold ${
                        l.status === 'Converted' ? 'bg-green-50 text-green-700 border border-green-100' :
                        l.status === 'Lost' ? 'bg-red-50 text-red-700 border border-red-100' :
                        'bg-amber-50 text-amber-700 border border-amber-100'
                      }`}>
                        {l.status || 'Pending'}
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
                  <td colSpan={6} className="px-6 py-12 text-center text-slate-500">No quote requests found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default QuotesView;
