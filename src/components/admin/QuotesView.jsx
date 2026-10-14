import React, { useState } from 'react';
import { Search, Download, Eye, Filter, X, Car, Phone, Mail, MapPin, Calendar, ShieldCheck, CheckCircle2, User, FileText, Heart, Shield, Building, Globe, Zap } from 'lucide-react';
import * as XLSX from 'xlsx';

const QuotesView = ({ leads, setLeads }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLead, setSelectedLead] = useState(null);

  const filteredLeads = leads.filter(l => 
    l.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    l.ownerName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    l.mobile?.includes(searchTerm) ||
    l.regNo?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    l.registrationNumber?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    l.productType?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    l.vehicleCategory?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    l.refNumber?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    l.id?.toString().includes(searchTerm)
  );

  const getProductBadgeColor = (productType = '') => {
    const p = productType.toLowerCase();
    if (p.includes('motor') || p.includes('car') || p.includes('bike')) return 'bg-blue-100 text-blue-800 border-blue-200';
    if (p.includes('health') || p.includes('senior') || p.includes('critical')) return 'bg-emerald-100 text-emerald-800 border-emerald-200';
    if (p.includes('life') || p.includes('term')) return 'bg-purple-100 text-purple-800 border-purple-200';
    if (p.includes('travel')) return 'bg-amber-100 text-amber-800 border-amber-200';
    return 'bg-teal-100 text-teal-800 border-teal-200';
  };

  const exportToExcel = () => {
    const exportData = filteredLeads.map(lead => ({
      'Reference ID': lead.refNumber || lead.id,
      'Date & Time': lead.date || lead.createdAt,
      'Product Type': lead.productType || 'Insurance Quote',
      'Vehicle/Product Category': lead.vehicleCategory || lead.insuranceType || 'N/A',
      'Customer Name': lead.ownerName || lead.name || 'Valued Customer',
      'Mobile Number': lead.mobile,
      'Email Address': lead.email || 'N/A',
      'City': lead.city || 'N/A',
      'PIN Code': lead.pincode || 'N/A',
      'State': lead.state || 'N/A',
      'Registration Number': lead.registrationNumber || lead.regNo || lead.details?.regNo || 'N/A',
      'Vehicle Make': lead.make || lead.details?.make || 'N/A',
      'Vehicle Model': lead.model || lead.details?.model || 'N/A',
      'Manufacturing Year': lead.mfgYear || lead.details?.regYear || 'N/A',
      'Fuel Type': lead.fuelType || lead.details?.fuelType || 'N/A',
      'Previous Insurer': lead.currentInsurer || lead.prevInsurer || lead.details?.existingInsurer || 'N/A',
      'Policy Expiry Date': lead.expiryDate || 'N/A',
      'Specific Details': lead.details ? JSON.stringify(lead.details) : 'N/A',
      'Request Status': lead.status || 'Pending'
    }));

    const worksheet = XLSX.utils.json_to_sheet(exportData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "All_Quote_Inquiries");
    
    const colWidths = [
      { wch: 18 }, { wch: 22 }, { wch: 22 }, { wch: 20 }, { wch: 22 },
      { wch: 15 }, { wch: 25 }, { wch: 15 }, { wch: 12 }, { wch: 15 },
      { wch: 18 }, { wch: 18 }, { wch: 18 }, { wch: 15 }, { wch: 12 },
      { wch: 22 }, { wch: 18 }, { wch: 30 }, { wch: 15 }
    ];
    worksheet['!cols'] = colWidths;

    XLSX.writeFile(workbook, `All_Insurance_Inquiries_${new Date().toISOString().split('T')[0]}.xlsx`);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-xl font-black text-slate-900">All Product Quote Inquiries (Admin)</h2>
          <p className="text-sm text-slate-600 mt-1">Real-time inquiries across Motor, Health, Term Life, Business & Travel Insurance</p>
        </div>
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <div className="relative flex-grow sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
            <input 
              type="text" 
              placeholder="Search product, name, mobile, reg..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm font-medium outline-none focus:border-teal-500 focus:ring-4 focus:ring-teal-500/10 transition-all"
            />
          </div>
          <button 
            onClick={exportToExcel}
            className="flex items-center gap-2 px-4 py-2.5 bg-teal-600 hover:bg-teal-700 text-white font-bold rounded-xl text-sm shadow-lg shadow-teal-600/30 transition-all cursor-pointer"
          >
            <Download size={16} /> Export Excel
          </button>
        </div>
      </div>

      <div className="bg-white/80 backdrop-blur-xl border border-slate-200/80 rounded-3xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-600">
            <thead className="bg-slate-50 border-b border-slate-100 text-xs font-bold uppercase text-slate-500 tracking-wider">
              <tr>
                <th className="px-6 py-4">Ref & Date</th>
                <th className="px-6 py-4">Insurance Product</th>
                <th className="px-6 py-4">Customer Info</th>
                <th className="px-6 py-4">Vehicle / Policy Details</th>
                <th className="px-6 py-4">City / Pincode</th>
                <th className="px-6 py-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-semibold">
              {filteredLeads.length > 0 ? (
                filteredLeads.map((l) => {
                  const reg = l.registrationNumber || l.regNo || l.details?.regNo;
                  const makeModel = (l.make || l.details?.make) ? `${l.make || l.details?.make} ${l.model || l.details?.model || ''}` : null;
                  const prodLabel = l.productType || l.vehicleCategory || 'Insurance';

                  return (
                    <tr key={l.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-xs font-black text-slate-900">{l.refNumber || `#${l.id}`}</div>
                        <div className="text-[11px] text-slate-400 font-medium mt-0.5">{l.date || l.createdAt}</div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-lg text-xs font-bold border ${getProductBadgeColor(prodLabel)}`}>
                          {prodLabel}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-slate-900 font-black">{l.ownerName || l.name || 'Valued Customer'}</div>
                        <div className="text-xs font-bold text-teal-700 mt-0.5">{l.mobile}</div>
                        {l.email && <div className="text-[11px] text-slate-400 font-normal">{l.email}</div>}
                      </td>
                      <td className="px-6 py-4 text-xs">
                        {reg ? (
                          <div className="space-y-1">
                            <span className="px-2 py-0.5 bg-amber-100 text-amber-900 border border-amber-300 font-black text-[11px] rounded uppercase">
                              {reg}
                            </span>
                            {makeModel && <div className="text-slate-800 font-bold">{makeModel}</div>}
                          </div>
                        ) : makeModel ? (
                          <div className="text-slate-900 font-bold">{makeModel}</div>
                        ) : l.details ? (
                          <div className="text-slate-700 font-bold">
                            {l.details.coverageType || l.details.sumInsured || l.details.coverAmount || l.details.companyName || 'Specific details in view'}
                          </div>
                        ) : (
                          <span className="text-slate-400">Standard Inquiry</span>
                        )}
                      </td>
                      <td className="px-6 py-4 text-xs">
                        <div className="text-slate-800 font-bold">{l.city || 'N/A'}</div>
                        <div className="text-slate-400 text-[11px]">{l.pincode ? `PIN: ${l.pincode}` : ''}</div>
                      </td>
                      <td className="px-6 py-4 text-center whitespace-nowrap">
                        <button 
                          onClick={() => setSelectedLead(l)}
                          className="px-3 py-1.5 bg-[#012e67] hover:bg-[#012452] text-white rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 mx-auto cursor-pointer shadow-sm"
                        >
                          <Eye size={14} /> Full Details
                        </button>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-slate-500">No quote inquiries found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* FULL INQUIRY DETAIL MODAL FOR ADMIN */}
      {selectedLead && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md overflow-y-auto">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl border border-slate-100 space-y-5 my-8">
            <div className="flex justify-between items-center border-b border-slate-100 pb-3">
              <div>
                <span className="px-2.5 py-0.5 rounded-full bg-teal-100 text-teal-800 font-mono text-[10px] font-bold">
                  Ref: #{selectedLead.refNumber || selectedLead.id}
                </span>
                <h3 className="text-lg font-black text-slate-900 mt-1">
                  {selectedLead.productType || selectedLead.vehicleCategory || 'Insurance'} Inquiry
                </h3>
              </div>
              <button 
                onClick={() => setSelectedLead(null)}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center transition-all"
              >
                <X size={16} />
              </button>
            </div>

            {/* CUSTOMER CONTACT CARD */}
            <div className="bg-blue-50/50 border border-blue-100 p-4 rounded-2xl space-y-2 text-xs">
              <h4 className="font-black text-[#012e67] uppercase tracking-wider text-[11px] flex items-center gap-1.5">
                <User size={14} /> Customer Contact Information
              </h4>
              <div className="grid grid-cols-2 gap-2.5 pt-1">
                <div>
                  <span className="text-slate-400 block font-semibold">Customer Name</span>
                  <span className="text-slate-900 font-extrabold text-sm">{selectedLead.ownerName || selectedLead.name || 'N/A'}</span>
                </div>
                <div>
                  <span className="text-slate-400 block font-semibold">Mobile Number</span>
                  <span className="text-teal-700 font-black text-sm">{selectedLead.mobile}</span>
                </div>
                <div>
                  <span className="text-slate-400 block font-semibold">Email Address</span>
                  <span className="text-slate-800 font-bold">{selectedLead.email || 'N/A'}</span>
                </div>
                <div>
                  <span className="text-slate-400 block font-semibold">City / PIN Code</span>
                  <span className="text-slate-800 font-bold">{selectedLead.city || 'N/A'} {selectedLead.pincode ? `(${selectedLead.pincode})` : ''}</span>
                </div>
                {selectedLead.preferredTime && (
                  <div>
                    <span className="text-slate-400 block font-semibold">Preferred Call Time</span>
                    <span className="text-slate-800 font-bold">{selectedLead.preferredTime}</span>
                  </div>
                )}
                {selectedLead.date && (
                  <div>
                    <span className="text-slate-400 block font-semibold">Inquiry Date</span>
                    <span className="text-slate-800 font-bold">{selectedLead.date}</span>
                  </div>
                )}
              </div>
            </div>

            {/* VEHICLE / ASSET SPECIFIC DETAILS */}
            <div className="bg-slate-50 border border-slate-200/80 p-4 rounded-2xl space-y-2 text-xs">
              <h4 className="font-black text-slate-700 uppercase tracking-wider text-[11px] flex items-center gap-1.5">
                <FileText size={14} className="text-[#012e67]" /> Detailed Requirements
              </h4>
              
              <div className="grid grid-cols-2 gap-2.5 pt-1">
                {/* Motor specific fields */}
                {(selectedLead.registrationNumber || selectedLead.regNo || selectedLead.details?.regNo) && (
                  <div>
                    <span className="text-slate-400 block font-semibold">Registration Number</span>
                    <span className="text-slate-900 font-black text-sm uppercase">
                      {selectedLead.registrationNumber || selectedLead.regNo || selectedLead.details?.regNo}
                    </span>
                  </div>
                )}
                
                {(selectedLead.make || selectedLead.details?.make) && (
                  <div>
                    <span className="text-slate-400 block font-semibold">Make & Model</span>
                    <span className="text-slate-900 font-extrabold">
                      {selectedLead.make || selectedLead.details?.make} {selectedLead.model || selectedLead.details?.model || ''}
                    </span>
                  </div>
                )}

                {(selectedLead.fuelType || selectedLead.details?.fuelType) && (
                  <div>
                    <span className="text-slate-400 block font-semibold">Fuel Type</span>
                    <span className="text-slate-800 font-bold">{selectedLead.fuelType || selectedLead.details?.fuelType}</span>
                  </div>
                )}

                {(selectedLead.mfgYear || selectedLead.details?.regYear) && (
                  <div>
                    <span className="text-slate-400 block font-semibold">Manufacturing / Reg Year</span>
                    <span className="text-slate-800 font-bold">{selectedLead.mfgYear || selectedLead.details?.regYear}</span>
                  </div>
                )}

                {(selectedLead.currentInsurer || selectedLead.prevInsurer || selectedLead.details?.existingInsurer) && (
                  <div>
                    <span className="text-slate-400 block font-semibold">Previous Insurer</span>
                    <span className="text-slate-800 font-bold">{selectedLead.currentInsurer || selectedLead.prevInsurer || selectedLead.details?.existingInsurer}</span>
                  </div>
                )}

                {/* Other Product Details object dump if available */}
                {selectedLead.details && Object.entries(selectedLead.details).map(([key, val]) => {
                  if (['regNo', 'make', 'model', 'fuelType', 'regYear', 'existingInsurer'].includes(key)) return null;
                  return (
                    <div key={key}>
                      <span className="text-slate-400 block font-semibold capitalize">{key.replace(/([A-Z])/g, ' $1')}</span>
                      <span className="text-slate-900 font-bold">{val?.toString() || 'N/A'}</span>
                    </div>
                  );
                })}
              </div>

              {selectedLead.remarks && (
                <div className="pt-2 border-t border-slate-200/60 mt-2">
                  <span className="text-slate-400 block font-semibold">Customer Remarks</span>
                  <p className="text-slate-800 font-medium bg-white p-2.5 rounded-xl border border-slate-200 mt-1">{selectedLead.remarks}</p>
                </div>
              )}
            </div>

            <div className="pt-2 text-right">
              <button
                onClick={() => setSelectedLead(null)}
                className="px-5 py-2.5 bg-[#012e67] hover:bg-[#012452] text-white font-bold rounded-xl text-xs uppercase tracking-wider transition-all"
              >
                Close Details
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuotesView;
