import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Lock, User, LogOut, Search, Trash2, Database, Eye, X } from 'lucide-react';

const AdminDashboard = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [leads, setLeads] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLead, setSelectedLead] = useState(null);

  useEffect(() => {
    // Check if already logged in via session storage
    const auth = sessionStorage.getItem('admin_auth');
    if (auth === 'true') {
      setIsAuthenticated(true);
      loadLeads();
    }
  }, []);

  const loadLeads = () => {
    const savedLeads = JSON.parse(localStorage.getItem('policy_leads') || '[]');
    setLeads(savedLeads);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (username === 'admin@policyperfect' && password === 'Shakid@perfect') {
      sessionStorage.setItem('admin_auth', 'true');
      setIsAuthenticated(true);
      setError('');
      loadLeads();
    } else {
      setError('Invalid credentials');
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem('admin_auth');
    setIsAuthenticated(false);
    setUsername('');
    setPassword('');
  };

  const handleDelete = (id) => {
    if(window.confirm('Are you sure you want to delete this lead?')) {
      const updatedLeads = leads.filter(lead => lead.id !== id);
      localStorage.setItem('policy_leads', JSON.stringify(updatedLeads));
      setLeads(updatedLeads);
    }
  };

  const filteredLeads = leads.filter(lead => 
    lead.name?.toLowerCase().includes(searchTerm.toLowerCase()) || 
    lead.mobile?.includes(searchTerm) ||
    lead.productType?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md border border-slate-200"
        >
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Lock size={32} />
            </div>
            <h2 className="text-2xl font-bold text-slate-800">Admin Login</h2>
            <p className="text-slate-500 text-sm mt-1">Access the lead management portal</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            {error && (
              <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm text-center border border-red-100">
                {error}
              </div>
            )}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Username</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                  <User size={18} />
                </div>
                <input 
                  type="text" 
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  placeholder="admin@policyperfect"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                  <Lock size={18} />
                </div>
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  placeholder="••••••••"
                />
              </div>
            </div>
            <button 
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 rounded-lg transition-colors"
            >
              Sign In
            </button>
          </form>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Admin Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <h1 className="text-xl font-bold text-slate-800 flex items-center gap-2">
              <Database className="text-blue-600" />
              Lead Dashboard
            </h1>
            <button 
              onClick={handleLogout}
              className="flex items-center gap-2 text-slate-600 hover:text-red-600 transition-colors text-sm font-medium"
            >
              <LogOut size={18} /> Logout
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Controls */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
          <div className="flex items-center gap-3">
            <div className="bg-blue-100 text-blue-700 px-4 py-2 rounded-lg font-bold text-lg">
              {leads.length} <span className="text-sm font-medium text-blue-600">Total Leads</span>
            </div>
          </div>
          
          <div className="relative w-full sm:w-72">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
              <Search size={18} />
            </div>
            <input 
              type="text" 
              placeholder="Search by name, product, or mobile..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm"
            />
          </div>
        </div>

        {/* Leads Table */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-600">
              <thead className="bg-slate-50 text-slate-700 border-b border-slate-200 uppercase text-xs font-semibold">
                <tr>
                  <th className="px-6 py-4">Date</th>
                  <th className="px-6 py-4">Product</th>
                  <th className="px-6 py-4">Name</th>
                  <th className="px-6 py-4">Mobile</th>
                  <th className="px-6 py-4">Extra Details</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredLeads.length > 0 ? (
                  filteredLeads.map((lead) => (
                    <motion.tr 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      key={lead.id} 
                      className="hover:bg-slate-50 transition-colors"
                    >
                      <td className="px-6 py-4 whitespace-nowrap text-xs text-slate-500">{lead.date}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="bg-blue-50 text-blue-700 border border-blue-100 px-2.5 py-1 rounded-md text-xs font-medium">
                          {lead.productType}
                        </span>
                      </td>
                      <td className="px-6 py-4 font-medium text-slate-800">{lead.name || '-'}</td>
                      <td className="px-6 py-4">{lead.mobile || '-'}</td>
                      <td className="px-6 py-4 text-xs text-slate-500">
                        {lead.regNo && <div><span className="font-medium">Reg:</span> {lead.regNo}</div>}
                        {lead.make && <div><span className="font-medium">Vehicle:</span> {lead.make} {lead.model}</div>}
                        {lead.age && <div><span className="font-medium">Age:</span> {lead.age}</div>}
                        {lead.annualIncome && <div><span className="font-medium">Income:</span> ₹{lead.annualIncome}</div>}
                        {lead.destination && <div><span className="font-medium">Dest:</span> {lead.destination} ({lead.duration} days)</div>}
                        {lead.propertyValue && <div><span className="font-medium">Prop Value:</span> ₹{lead.propertyValue}</div>}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button 
                          onClick={() => setSelectedLead(lead)}
                          className="text-blue-500 hover:text-blue-700 hover:bg-blue-50 p-2 rounded-lg transition-colors mr-2 inline-flex items-center"
                          title="View Details"
                        >
                          <Eye size={18} />
                        </button>
                        <button 
                          onClick={() => handleDelete(lead.id)}
                          className="text-red-500 hover:text-red-700 hover:bg-red-50 p-2 rounded-lg transition-colors inline-flex items-center"
                          title="Delete Lead"
                        >
                          <Trash2 size={18} />
                        </button>
                      </td>
                    </motion.tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="px-6 py-12 text-center text-slate-500">
                      <Database size={32} className="mx-auto mb-3 text-slate-300" />
                      No leads found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

      </main>

      {/* Lead Detail Modal */}
      {selectedLead && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="bg-white rounded-2xl w-full max-w-2xl shadow-2xl overflow-hidden border border-slate-200 flex flex-col max-h-[85vh]">
            <div className="bg-[#012e67] text-white px-6 py-4 flex justify-between items-center">
              <div>
                <span className="bg-blue-900 text-blue-250 text-[10px] font-extrabold px-2 py-0.5 rounded uppercase">{selectedLead.productType}</span>
                <h3 className="text-lg font-black mt-1">Lead Details (Ref: {selectedLead.refNo || selectedLead.id})</h3>
              </div>
              <button onClick={() => setSelectedLead(null)} className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20">
                <X size={18} />
              </button>
            </div>
            
            <div className="p-6 overflow-y-auto space-y-6 text-sm text-slate-700">
              <div className="grid grid-cols-2 gap-4">
                <div><span className="font-bold text-slate-400 block text-xs uppercase">Date Created</span><span className="font-semibold">{selectedLead.date}</span></div>
                <div><span className="font-bold text-slate-400 block text-xs uppercase">Source Page</span><span className="font-semibold">{selectedLead.source || 'Standard Form'}</span></div>
                <div><span className="font-bold text-slate-400 block text-xs uppercase">Lead Status</span><span className="font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-100">{selectedLead.status || 'New Lead'}</span></div>
              </div>
              
              <div className="border-t border-slate-100 pt-4 space-y-4">
                <h4 className="font-black text-slate-800 uppercase text-xs tracking-wider">👤 Personal Information</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div><span className="font-bold text-slate-400 block text-xs uppercase">Full Name</span><span className="font-semibold text-slate-800">{selectedLead.name}</span></div>
                  <div><span className="font-bold text-slate-400 block text-xs uppercase">Mobile Number</span><span className="font-semibold text-slate-800">{selectedLead.mobile}</span></div>
                  {selectedLead.altMobile && <div><span className="font-bold text-slate-400 block text-xs uppercase">Alt Mobile</span><span className="font-semibold">{selectedLead.altMobile}</span></div>}
                  <div><span className="font-bold text-slate-400 block text-xs uppercase">Email Address</span><span className="font-semibold">{selectedLead.email || '-'}</span></div>
                  <div className="col-span-2"><span className="font-bold text-slate-400 block text-xs uppercase">Location</span><span className="font-semibold">{selectedLead.city}, {selectedLead.state} - {selectedLead.pincode}</span></div>
                  {selectedLead.address && <div className="col-span-2"><span className="font-bold text-slate-400 block text-xs uppercase">Address</span><span className="font-semibold">{selectedLead.address}</span></div>}
                </div>
              </div>

              {/* Vehicle specific details */}
              {selectedLead.make && (
                <div className="border-t border-slate-100 pt-4 space-y-4">
                  <h4 className="font-black text-slate-800 uppercase text-xs tracking-wider">🚗 Vehicle Information</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div><span className="font-bold text-slate-400 block text-xs uppercase">Vehicle Type</span><span className="font-semibold text-slate-800">{selectedLead.vehicleType}</span></div>
                    <div><span className="font-bold text-slate-400 block text-xs uppercase">Make & Model</span><span className="font-semibold text-slate-800">{selectedLead.make} {selectedLead.model}</span></div>
                    {selectedLead.variant && <div><span className="font-bold text-slate-400 block text-xs uppercase">Variant</span><span className="font-semibold">{selectedLead.variant}</span></div>}
                    <div><span className="font-bold text-slate-400 block text-xs uppercase">Fuel & Mfg Year</span><span className="font-semibold">{selectedLead.fuel} ({selectedLead.mfgYear})</span></div>
                    <div><span className="font-bold text-slate-400 block text-xs uppercase">Registration No</span><span className="font-semibold text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-100 font-bold">{selectedLead.regNo}</span></div>
                  </div>
                </div>
              )}

              {/* Policy specific details */}
              {selectedLead.currentInsurer && (
                <div className="border-t border-slate-100 pt-4 space-y-4">
                  <h4 className="font-black text-slate-800 uppercase text-xs tracking-wider">🛡️ Policy & NCB Details</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div><span className="font-bold text-slate-400 block text-xs uppercase">Previous Insurer</span><span className="font-semibold text-slate-800">{selectedLead.currentInsurer}</span></div>
                    <div><span className="font-bold text-slate-400 block text-xs uppercase">Expiry Date</span><span className="font-semibold">{selectedLead.expiryDate}</span></div>
                    <div><span className="font-bold text-slate-400 block text-xs uppercase">Policy Type</span><span className="font-semibold">{selectedLead.policyType}</span></div>
                    <div><span className="font-bold text-slate-400 block text-xs uppercase">Claim History</span><span className="font-semibold">{selectedLead.claimHistory}</span></div>
                    <div><span className="font-bold text-slate-400 block text-xs uppercase">Current NCB</span><span className="font-semibold text-green-700">{selectedLead.ncb}</span></div>
                  </div>
                </div>
              )}
            </div>
            
            <div className="bg-slate-50 px-6 py-4 border-t border-slate-100 flex justify-end">
              <button onClick={() => setSelectedLead(null)} className="px-5 py-2 bg-slate-200 hover:bg-slate-300 text-slate-700 font-bold rounded-xl text-sm transition-colors">
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
