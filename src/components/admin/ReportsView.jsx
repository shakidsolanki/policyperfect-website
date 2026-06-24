import React, { useState } from 'react';
import { Download, FileSpreadsheet, FileText, Calendar, Filter } from 'lucide-react';
import * as XLSX from 'xlsx';

const ReportsView = ({ leads, policies, claims, renewals }) => {
  const [dateRange, setDateRange] = useState('Last 30 Days');

  const exportAllData = () => {
    const workbook = XLSX.utils.book_new();

    // Sheet 1: Leads
    const leadsSheet = XLSX.utils.json_to_sheet(leads);
    XLSX.utils.book_append_sheet(workbook, leadsSheet, "Quotes");

    // Sheet 2: Policies
    const policiesSheet = XLSX.utils.json_to_sheet(policies);
    XLSX.utils.book_append_sheet(workbook, policiesSheet, "Active_Policies");

    // Sheet 3: Claims
    const claimsSheet = XLSX.utils.json_to_sheet(claims);
    XLSX.utils.book_append_sheet(workbook, claimsSheet, "Claims");

    // Sheet 4: Renewals
    const renewalsSheet = XLSX.utils.json_to_sheet(renewals);
    XLSX.utils.book_append_sheet(workbook, renewalsSheet, "Renewals");

    XLSX.writeFile(workbook, `PolicyPerfect_Master_Report_${new Date().toISOString().split('T')[0]}.xlsx`);
  };

  const reports = [
    { title: 'Quote Requests Report', description: 'Export all lead data including status and vehicle details.', count: leads.length, color: 'text-blue-600', bg: 'bg-blue-50' },
    { title: 'Active Policies List', description: 'Export complete registry of active policies with premiums.', count: policies.length, color: 'text-brand-gold', bg: 'bg-brand-gold/10' },
    { title: 'Claims Intimation Data', description: 'Export all lodged claims and their current review status.', count: claims.length, color: 'text-red-600', bg: 'bg-red-50' },
    { title: 'Upcoming Renewals', description: 'Export policies due for renewal with NCB percentages.', count: renewals.length, color: 'text-teal-600', bg: 'bg-teal-50' }
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-xl font-black text-slate-900">Reports Center</h2>
          <p className="text-sm text-slate-600 mt-1">Generate and download bulk system data</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="px-4 py-2.5 bg-white border border-slate-200 rounded-xl flex items-center gap-2 text-sm font-medium text-slate-700">
            <Calendar size={16} className="text-slate-400" />
            <select 
              value={dateRange} 
              onChange={(e) => setDateRange(e.target.value)}
              className="bg-transparent outline-none cursor-pointer"
            >
              <option>Today</option>
              <option>Last 7 Days</option>
              <option>Last 30 Days</option>
              <option>This Year</option>
              <option>All Time</option>
            </select>
          </div>
          <button 
            onClick={exportAllData}
            className="flex items-center gap-2 px-4 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl text-sm shadow-lg shadow-slate-900/20 transition-all"
          >
            <Download size={16} /> Master Export
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {reports.map((report, i) => (
          <div key={i} className="bg-white/80 backdrop-blur-xl border border-white rounded-[2rem] p-6 sm:p-8 shadow-[0_8px_30px_rgba(0,0,0,0.04)] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)] transition-all">
            <div className="flex items-start gap-4">
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0 ${report.bg} ${report.color}`}>
                <FileSpreadsheet size={28} />
              </div>
              <div>
                <h3 className="text-lg font-black text-slate-900">{report.title}</h3>
                <p className="text-sm text-slate-500 mt-1">{report.description}</p>
                <div className="mt-3 inline-flex items-center gap-1.5 px-2.5 py-1 bg-slate-100 rounded-lg text-xs font-bold text-slate-600">
                  <Filter size={12} /> {report.count} Records Found
                </div>
              </div>
            </div>
            <button className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-3 bg-white border border-slate-200 text-slate-700 font-bold rounded-xl text-sm hover:bg-slate-50 hover:text-teal-600 hover:border-teal-200 transition-all">
              <FileText size={16} /> CSV
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReportsView;
