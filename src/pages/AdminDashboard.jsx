import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Lock, User, LogOut, Search, Trash2, Database, Eye, X, 
  Plus, Check, MessageSquare, Image, ShieldAlert, FileText, CheckCircle 
} from 'lucide-react';
import { db } from '../utils/db';

const AdminDashboard = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  
  // Database States
  const [leads, setLeads] = useState([]);
  const [policies, setPolicies] = useState([]);
  const [endorsements, setEndorsements] = useState([]);
  const [claims, setClaims] = useState([]);
  const [chats, setChats] = useState([]);
  const [banner, setBanner] = useState({ imageUrl: '', redirectUrl: '' });
  
  // Navigation
  const [activeTab, setActiveTab] = useState('leads'); // leads, policies, endorsements, claims, chats, banner
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLead, setSelectedLead] = useState(null);
  
  // New Policy form state
  const [newPolicy, setNewPolicy] = useState({
    policyNo: '',
    mobile: '',
    name: '',
    insurer: 'HDFC ERGO',
    productType: 'Motor Insurance',
    vehicleDetails: '',
    regNo: '',
    premium: '',
    startDate: '',
    endDate: '',
    status: 'Active'
  });
  const [showAddPolicy, setShowAddPolicy] = useState(false);
  
  // Active chat session
  const [activeChatId, setActiveChatId] = useState(null);
  const [chatReplyText, setChatReplyText] = useState('');

  useEffect(() => {
    const auth = sessionStorage.getItem('admin_auth');
    if (auth === 'true') {
      setIsAuthenticated(true);
      loadAllData();
    }
  }, []);

  const loadAllData = () => {
    setLeads(db.getLeads());
    setPolicies(db.getPolicies());
    setEndorsements(db.getEndorsements());
    setClaims(db.getClaims());
    setChats(db.getChats());
    setBanner(db.getBanner());
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (username === 'admin@policyperfect' && password === 'Shakid@perfect') {
      sessionStorage.setItem('admin_auth', 'true');
      setIsAuthenticated(true);
      setError('');
      loadAllData();
    } else {
      setError('Invalid credentials. Hint: admin@policyperfect / Shakid@perfect');
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem('admin_auth');
    setIsAuthenticated(false);
    setUsername('');
    setPassword('');
  };

  // LEADS ACTIONS
  const handleDeleteLead = (id) => {
    if (window.confirm('Delete this lead?')) {
      const updated = leads.filter(l => l.id !== id);
      db.setLeads(updated);
      setLeads(updated);
    }
  };

  // POLICY ACTIONS
  const handleAddPolicySubmit = (e) => {
    e.preventDefault();
    if (!newPolicy.policyNo || !newPolicy.mobile || !newPolicy.name) {
      alert('Policy Number, Mobile Number, and Customer Name are required');
      return;
    }
    const policy = {
      id: 'pol_' + Date.now(),
      ...newPolicy
    };
    const updated = [policy, ...policies];
    db.setPolicies(updated);
    setPolicies(updated);
    setShowAddPolicy(false);
    setNewPolicy({
      policyNo: '',
      mobile: '',
      name: '',
      insurer: 'HDFC ERGO',
      productType: 'Motor Insurance',
      vehicleDetails: '',
      regNo: '',
      premium: '',
      startDate: '',
      endDate: '',
      status: 'Active'
    });
    alert('Policy registered successfully!');
  };

  const handleDeletePolicy = (id) => {
    if (window.confirm('Remove this policy?')) {
      const updated = policies.filter(p => p.id !== id);
      db.setPolicies(updated);
      setPolicies(updated);
    }
  };

  // ENDORSEMENTS ACTIONS
  const handleApproveEndorsement = (req) => {
    if (!window.confirm('Approve and merge changes into policy?')) return;
    
    // 1. Update the actual policy in active_policies
    const updatedPolicies = policies.map(p => {
      if (p.policyNo === req.policyNo) {
        let updatedVal = { ...p };
        if (req.changeType === 'Name Correction' || req.changeType === 'Policy Transfer') {
          updatedVal.name = req.newValue;
        } else if (req.changeType === 'Address Correction') {
          updatedVal.address = req.newValue;
        } else if (req.changeType === 'Vehicle/Reg details Update') {
          updatedVal.vehicleDetails = req.newValue;
        }
        return updatedVal;
      }
      return p;
    });
    db.setPolicies(updatedPolicies);
    setPolicies(updatedPolicies);

    // 2. Update endorsement request status
    const updatedReqs = endorsements.map(r => {
      if (r.id === req.id) {
        return { ...r, status: 'Approved' };
      }
      return r;
    });
    db.setEndorsements(updatedReqs);
    setEndorsements(updatedReqs);
    alert('Endorsement approved and merged successfully!');
  };

  const handleRejectEndorsement = (id) => {
    if (!window.confirm('Reject this request?')) return;
    const updatedReqs = endorsements.map(r => {
      if (r.id === id) {
        return { ...r, status: 'Rejected' };
      }
      return r;
    });
    db.setEndorsements(updatedReqs);
    setEndorsements(updatedReqs);
  };

  // BANNER ACTIONS
  const handleBannerSave = (e) => {
    e.preventDefault();
    db.setBanner(banner);
    alert('Homepage Banner Settings updated successfully!');
  };

  // CHAT ACTIONS
  const handleSendChatReply = (e) => {
    e.preventDefault();
    if (!chatReplyText.trim() || !activeChatId) return;

    const updatedChats = chats.map(chat => {
      if (chat.mobile === activeChatId) {
        return {
          ...chat,
          messages: [
            ...chat.messages,
            { sender: 'admin', text: chatReplyText, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }
          ]
        };
      }
      return chat;
    });

    db.setChats(updatedChats);
    setChats(updatedChats);
    setChatReplyText('');
  };

  // FILTERING BY SEARCH
  const filteredLeads = leads.filter(l => 
    l.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    l.mobile?.includes(searchTerm) ||
    l.productType?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredPolicies = policies.filter(p => 
    p.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.mobile?.includes(searchTerm) ||
    p.policyNo?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // LOGIN SCREEN
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#0f172a] flex items-center justify-center p-4 font-sans">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-slate-900 border border-white/10 p-8 rounded-[2.5rem] shadow-2xl w-full max-w-md relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl"></div>
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-blue-500/10 border border-blue-500/20 text-blue-400 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Lock size={32} />
            </div>
            <h2 className="text-2xl font-black text-white">Admin Portal</h2>
            <p className="text-slate-400 text-sm mt-1">Manage leads, policies, claims, & banners</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            {error && (
              <div className="bg-red-500/10 border border-red-500/25 text-red-400 p-3.5 rounded-xl text-xs text-center font-bold">
                {error}
              </div>
            )}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Username</label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input 
                  type="text" 
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full pl-12 pr-4 py-3.5 bg-white/5 border border-white/10 rounded-xl text-white outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all font-medium"
                  placeholder="admin@policyperfect"
                />
              </div>
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-12 pr-4 py-3.5 bg-white/5 border border-white/10 rounded-xl text-white outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all font-medium"
                  placeholder="••••••••"
                />
              </div>
            </div>
            <button 
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-3.5 rounded-xl shadow-lg shadow-blue-500/20 transition-all"
            >
              Sign In
            </button>
          </form>
        </motion.div>
      </div>
    );
  }

  // MAIN PORTAL
  return (
    <div className="min-h-screen bg-[#0f172a] text-slate-100 font-sans pb-24">
      {/* Top Navbar */}
      <div className="bg-slate-900 border-b border-white/10 px-4 py-5 sm:px-6 lg:px-8">
        <div className="max-w-[1400px] mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center">
              <Database className="text-white" size={24} />
            </div>
            <div>
              <h1 className="text-lg font-black text-white leading-tight font-sans">PolicyPerfect Admin Dashboard</h1>
              <p className="text-xs text-slate-400">Manage all customer queries & setups</p>
            </div>
          </div>
          <button 
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 border border-white/10 rounded-xl text-xs font-bold hover:bg-red-500/10 hover:border-red-500/30 hover:text-red-400 transition-all"
          >
            Logout <LogOut size={14} />
          </button>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 mt-10">
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Left Navigation Menu */}
          <div className="w-full lg:w-1/4 space-y-2.5">
            {[
              { id: 'leads', title: `Leads (${leads.length})`, icon: FileText },
              { id: 'policies', title: `Customer Policies (${policies.length})`, icon: Database },
              { id: 'endorsements', title: `Endorsements (${endorsements.filter(e => e.status === 'Pending').length})`, icon: RefreshCw },
              { id: 'claims', title: `Claims Intimated (${claims.length})`, icon: ShieldAlert },
              { id: 'chats', title: `Live Chat Widget (${chats.length})`, icon: MessageSquare },
              { id: 'banner', title: 'Banner Settings', icon: Image }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => { setActiveTab(tab.id); setSearchTerm(''); }}
                className={`w-full flex items-center gap-3.5 px-5 py-4 rounded-2xl font-bold text-sm transition-all text-left ${
                  activeTab === tab.id
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20'
                    : 'bg-slate-900 border border-white/10 hover:bg-slate-800 text-slate-400 hover:text-slate-100'
                }`}
              >
                <tab.icon size={18} />
                {tab.title}
              </button>
            ))}
          </div>

          {/* Right Workspace Area */}
          <div className="w-full lg:w-3/4">

            {/* TAB 1: LEADS MANAGEMENT */}
            {activeTab === 'leads' && (
              <div className="space-y-6">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <h2 className="text-xl font-black">Insurance Leads</h2>
                  <div className="relative w-full sm:w-72">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                    <input 
                      type="text" 
                      placeholder="Search name, product, mobile..." 
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 bg-slate-900 border border-white/10 rounded-xl text-slate-200 outline-none focus:border-blue-500 text-sm"
                    />
                  </div>
                </div>

                <div className="bg-slate-900 border border-white/10 rounded-[2rem] overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm text-slate-400">
                      <thead className="bg-slate-950 text-slate-200 border-b border-white/10 text-xs font-bold uppercase">
                        <tr>
                          <th className="px-6 py-4">Date</th>
                          <th className="px-6 py-4">Product</th>
                          <th className="px-6 py-4">Name</th>
                          <th className="px-6 py-4">Mobile</th>
                          <th className="px-6 py-4 text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-white/5 font-semibold">
                        {filteredLeads.length > 0 ? (
                          filteredLeads.map((l) => (
                            <tr key={l.id} className="hover:bg-white/5 transition-colors">
                              <td className="px-6 py-4 text-xs text-slate-500 whitespace-nowrap">{l.date}</td>
                              <td className="px-6 py-4">
                                <span className="bg-blue-500/10 text-blue-400 border border-blue-500/20 px-2.5 py-0.5 rounded text-[11px]">
                                  {l.productType}
                                </span>
                              </td>
                              <td className="px-6 py-4 text-slate-200">{l.name}</td>
                              <td className="px-6 py-4">{l.mobile}</td>
                              <td className="px-6 py-4 text-right whitespace-nowrap">
                                <button onClick={() => setSelectedLead(l)} className="text-blue-400 hover:text-white p-2 rounded-lg bg-white/5 hover:bg-blue-600 transition-all mr-2">
                                  <Eye size={16} />
                                </button>
                                <button onClick={() => handleDeleteLead(l.id)} className="text-red-400 hover:text-white p-2 rounded-lg bg-white/5 hover:bg-red-600 transition-all">
                                  <Trash2 size={16} />
                                </button>
                              </td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td colSpan={5} className="px-6 py-12 text-center text-slate-500">No leads found.</td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 2: POLICIES REGISTRY */}
            {activeTab === 'policies' && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-black">Active Policies</h2>
                  <button 
                    onClick={() => setShowAddPolicy(!showAddPolicy)}
                    className="px-4 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl text-xs flex items-center gap-2 transition-all"
                  >
                    <Plus size={16} /> Create Policy
                  </button>
                </div>

                {showAddPolicy && (
                  <form onSubmit={handleAddPolicySubmit} className="bg-slate-900 border border-white/10 p-6 rounded-3xl space-y-4">
                    <h3 className="font-bold text-white mb-2">Policy Creation Form</h3>
                    <div className="grid md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">Policy Number *</label>
                        <input type="text" placeholder="e.g. PP-MOT-998822" required className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white" value={newPolicy.policyNo} onChange={(e) => setNewPolicy({...newPolicy, policyNo: e.target.value})} />
                      </div>
                      <div>
                        <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">Customer Name *</label>
                        <input type="text" placeholder="Full Name" required className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white" value={newPolicy.name} onChange={(e) => setNewPolicy({...newPolicy, name: e.target.value})} />
                      </div>
                      <div>
                        <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">Registered Mobile *</label>
                        <input type="tel" maxLength={10} placeholder="10-digit number" required className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white" value={newPolicy.mobile} onChange={(e) => setNewPolicy({...newPolicy, mobile: e.target.value.replace(/\D/g,'')})} />
                      </div>
                      <div>
                        <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">Partner Insurer</label>
                        <select className="w-full px-3 py-2 bg-slate-950 border border-white/10 rounded-lg text-white" value={newPolicy.insurer} onChange={(e) => setNewPolicy({...newPolicy, insurer: e.target.value})}>
                          <option value="HDFC ERGO">HDFC ERGO</option>
                          <option value="ICICI Lombard">ICICI Lombard</option>
                          <option value="Star Health">Star Health</option>
                          <option value="Tata AIG">Tata AIG</option>
                          <option value="Bajaj Allianz">Bajaj Allianz</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">Product Category</label>
                        <select className="w-full px-3 py-2 bg-slate-950 border border-white/10 rounded-lg text-white" value={newPolicy.productType} onChange={(e) => setNewPolicy({...newPolicy, productType: e.target.value})}>
                          <option value="Motor Insurance">Motor Insurance</option>
                          <option value="Health Insurance">Health Insurance</option>
                          <option value="Term Life Insurance">Term Life Insurance</option>
                          <option value="Fire Insurance">Fire Insurance</option>
                          <option value="Home Insurance">Home Insurance</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">Asset/Vehicle Details</label>
                        <input type="text" placeholder="e.g. Swift LXI, Home Structure" className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white" value={newPolicy.vehicleDetails} onChange={(e) => setNewPolicy({...newPolicy, vehicleDetails: e.target.value})} />
                      </div>
                      <div>
                        <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">Reg/License Plate (Optional)</label>
                        <input type="text" placeholder="e.g. DL-3C-AS-9988" className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white" value={newPolicy.regNo} onChange={(e) => setNewPolicy({...newPolicy, regNo: e.target.value})} />
                      </div>
                      <div>
                        <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">Premium Amount</label>
                        <input type="text" placeholder="e.g. ₹9,850" className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white" value={newPolicy.premium} onChange={(e) => setNewPolicy({...newPolicy, premium: e.target.value})} />
                      </div>
                      <div>
                        <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">Start Date</label>
                        <input type="date" className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white" value={newPolicy.startDate} onChange={(e) => setNewPolicy({...newPolicy, startDate: e.target.value})} />
                      </div>
                      <div>
                        <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">End Date</label>
                        <input type="date" className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white" value={newPolicy.endDate} onChange={(e) => setNewPolicy({...newPolicy, endDate: e.target.value})} />
                      </div>
                    </div>
                    <button type="submit" className="px-6 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl text-xs transition-colors">
                      Register Policy
                    </button>
                  </form>
                )}

                <div className="bg-slate-900 border border-white/10 rounded-[2rem] overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm text-slate-400">
                      <thead className="bg-slate-950 text-slate-200 border-b border-white/10 text-xs font-bold uppercase">
                        <tr>
                          <th className="px-6 py-4">Policy No</th>
                          <th className="px-6 py-4">Customer</th>
                          <th className="px-6 py-4">Mobile</th>
                          <th className="px-6 py-4">Insurers</th>
                          <th className="px-6 py-4">Type</th>
                          <th className="px-6 py-4 text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-white/5 font-semibold">
                        {filteredPolicies.length > 0 ? (
                          filteredPolicies.map((p) => (
                            <tr key={p.id} className="hover:bg-white/5 transition-colors">
                              <td className="px-6 py-4 text-slate-200 font-bold">{p.policyNo}</td>
                              <td className="px-6 py-4 text-slate-300">{p.name}</td>
                              <td className="px-6 py-4">{p.mobile}</td>
                              <td className="px-6 py-4 text-xs">{p.insurer}</td>
                              <td className="px-6 py-4 text-xs">{p.productType}</td>
                              <td className="px-6 py-4 text-right">
                                <button onClick={() => handleDeletePolicy(p.id)} className="text-red-400 hover:text-white p-2 rounded-lg bg-white/5 hover:bg-red-600 transition-all">
                                  <Trash2 size={16} />
                                </button>
                              </td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td colSpan={6} className="px-6 py-12 text-center text-slate-500">No policies registered.</td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 3: ENDORSEMENTS */}
            {activeTab === 'endorsements' && (
              <div className="space-y-6">
                <h2 className="text-xl font-black">Endorsement / Policy Update Requests</h2>
                <div className="bg-slate-900 border border-white/10 rounded-[2rem] overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm text-slate-400">
                      <thead className="bg-slate-950 text-slate-200 border-b border-white/10 text-xs font-bold uppercase">
                        <tr>
                          <th className="px-6 py-4">Date</th>
                          <th className="px-6 py-4">Policy No</th>
                          <th className="px-6 py-4">Change Type</th>
                          <th className="px-6 py-4">New Value</th>
                          <th className="px-6 py-4">Status</th>
                          <th className="px-6 py-4 text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-white/5 font-semibold">
                        {endorsements.length > 0 ? (
                          endorsements.map((req) => (
                            <tr key={req.id} className="hover:bg-white/5 transition-colors">
                              <td className="px-6 py-4 text-xs text-slate-500 whitespace-nowrap">{req.date}</td>
                              <td className="px-6 py-4 text-slate-200 font-bold">{req.policyNo}</td>
                              <td className="px-6 py-4 text-xs">{req.changeType}</td>
                              <td className="px-6 py-4 text-slate-300">{req.newValue}</td>
                              <td className="px-6 py-4">
                                <span className={`px-2 py-0.5 text-[10px] font-bold rounded ${
                                  req.status === 'Approved' ? 'bg-green-500/10 text-green-400 border border-green-500/20' : 
                                  req.status === 'Rejected' ? 'bg-red-500/10 text-red-400 border border-red-500/20' :
                                  'bg-yellow-500/10 text-yellow-400 border border-yellow-500/20'
                                }`}>
                                  {req.status}
                                </span>
                              </td>
                              <td className="px-6 py-4 text-right whitespace-nowrap">
                                {req.status === 'Pending' && (
                                  <>
                                    <button onClick={() => handleApproveEndorsement(req)} className="text-green-400 hover:text-white p-2 rounded-lg bg-white/5 hover:bg-green-600 transition-all mr-2" title="Approve & Merge">
                                      <Check size={16} />
                                    </button>
                                    <button onClick={() => handleRejectEndorsement(req.id)} className="text-red-400 hover:text-white p-2 rounded-lg bg-white/5 hover:bg-red-600 transition-all" title="Reject">
                                      <X size={16} />
                                    </button>
                                  </>
                                )}
                              </td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td colSpan={6} className="px-6 py-12 text-center text-slate-500">No endorsement requests.</td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 4: CLAIMS INTIMATION LOGS */}
            {activeTab === 'claims' && (
              <div className="space-y-6">
                <h2 className="text-xl font-black">Claim Intimation Logs</h2>
                <div className="space-y-4">
                  {claims.length === 0 ? (
                    <div className="bg-slate-900 border border-white/10 rounded-3xl p-12 text-center text-slate-500 font-semibold">
                      No claims reported yet.
                    </div>
                  ) : (
                    claims.map((c) => (
                      <div key={c.id} className="bg-slate-900 border border-white/10 rounded-3xl p-6 space-y-4">
                        <div className="flex justify-between items-start border-b border-white/5 pb-4">
                          <div>
                            <span className="bg-red-500/10 text-red-400 border border-red-500/20 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                              Claim ID: {c.id}
                            </span>
                            <h3 className="text-base font-black mt-2 text-white">Policy: {c.policyNo} ({c.productType})</h3>
                          </div>
                          <div className="text-xs text-slate-500 font-bold">{c.date}</div>
                        </div>

                        <div className="grid md:grid-cols-3 gap-4 text-xs font-bold text-slate-400">
                          <div><span className="block text-[10px] text-slate-500 mb-1">CUSTOMER</span><span className="text-slate-200">{c.name} (Mob: {c.mobile})</span></div>
                          {c.vehicleDetails && <div><span className="block text-[10px] text-slate-500 mb-1">ASSET/VEHICLE</span><span className="text-slate-200">{c.vehicleDetails}</span></div>}
                          <div><span className="block text-[10px] text-slate-500 mb-1">ACCIDENT DATETIME</span><span className="text-slate-200">{c.accidentDate} @ {c.accidentTime}</span></div>
                          <div><span className="block text-[10px] text-slate-500 mb-1">ACCIDENT LOCATION</span><span className="text-slate-200">{c.location}</span></div>
                          {c.driverDetails && <div><span className="block text-[10px] text-slate-500 mb-1">DRIVER INFO</span><span className="text-slate-200">{c.driverDetails}</span></div>}
                          {c.witnessContact && <div><span className="block text-[10px] text-slate-500 mb-1">CONTACTS</span><span className="text-slate-200">{c.witnessContact}</span></div>}
                        </div>

                        <div className="bg-slate-950 p-4 rounded-xl border border-white/5">
                          <span className="block text-[10px] font-bold text-slate-500 mb-1">INCIDENT DESCRIPTION</span>
                          <p className="text-slate-300 text-xs font-semibold leading-relaxed">{c.description}</p>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}

            {/* TAB 5: LIVE SUPPORT CHAT HUB */}
            {activeTab === 'chats' && (
              <div className="space-y-6">
                <h2 className="text-xl font-black">Live Support Messages</h2>
                <div className="flex bg-slate-900 border border-white/10 rounded-[2.5rem] overflow-hidden min-h-[500px]">
                  
                  {/* Active Chats List */}
                  <div className="w-1/3 border-r border-white/10 flex flex-col">
                    <div className="p-4 border-b border-white/10 font-bold text-white text-xs uppercase tracking-wider">Conversations</div>
                    <div className="flex-grow overflow-y-auto divide-y divide-white/5">
                      {chats.length === 0 ? (
                        <div className="p-4 text-center text-slate-500 text-xs font-semibold">No active chats.</div>
                      ) : (
                        chats.map(chat => (
                          <div 
                            key={chat.mobile}
                            onClick={() => setActiveChatId(chat.mobile)}
                            className={`p-4 cursor-pointer hover:bg-white/5 transition-all ${activeChatId === chat.mobile ? 'bg-white/5' : ''}`}
                          >
                            <div className="font-bold text-slate-200 text-sm">{chat.name || 'Anonymous'}</div>
                            <div className="text-[11px] text-slate-400 mt-0.5">Mob: {chat.mobile}</div>
                            <div className="text-xs text-slate-500 truncate mt-1">
                              {chat.messages[chat.messages.length - 1]?.text}
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  </div>

                  {/* Active Chat Window */}
                  <div className="w-2/3 flex flex-col justify-between bg-slate-950/40">
                    {activeChatId ? (() => {
                      const chat = chats.find(c => c.mobile === activeChatId);
                      return (
                        <>
                          {/* Chat Header */}
                          <div className="p-4 border-b border-white/10 flex justify-between items-center bg-slate-900">
                            <div>
                              <div className="font-bold text-white text-sm">{chat.name || 'Customer'}</div>
                              <div className="text-[10px] text-slate-400">Mobile: {chat.mobile}</div>
                            </div>
                          </div>

                          {/* Chat Messages */}
                          <div className="flex-grow p-4 overflow-y-auto space-y-4">
                            {chat.messages.map((m, idx) => (
                              <div key={idx} className={`flex flex-col ${m.sender === 'admin' ? 'items-end' : 'items-start'}`}>
                                <div className={`px-4 py-2.5 rounded-2xl max-w-sm text-xs font-semibold leading-relaxed ${
                                  m.sender === 'admin' ? 'bg-blue-600 text-white rounded-tr-none' : 'bg-slate-900 border border-white/10 text-slate-200 rounded-tl-none'
                                }`}>
                                  {m.text}
                                  {m.fileName && (
                                    <div className="mt-2 pt-2 border-t border-white/10 flex items-center gap-1.5 text-[10px] text-blue-300 font-bold">
                                      <FileText size={12} /> Doc: {m.fileName}
                                    </div>
                                  )}
                                </div>
                                <span className="text-[9px] text-slate-500 mt-1">{m.time}</span>
                              </div>
                            ))}
                          </div>

                          {/* Chat Input */}
                          <form onSubmit={handleSendChatReply} className="p-4 border-t border-white/10 bg-slate-900 flex gap-3">
                            <input 
                              type="text" 
                              placeholder="Type your reply here..." 
                              value={chatReplyText}
                              onChange={(e) => setChatReplyText(e.target.value)}
                              className="flex-grow px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white outline-none focus:border-blue-500 text-xs font-medium"
                            />
                            <button type="submit" className="px-5 bg-blue-600 hover:bg-blue-500 rounded-xl font-bold text-xs text-white transition-all">
                              Send
                            </button>
                          </form>
                        </>
                      );
                    })() : (
                      <div className="flex-grow flex items-center justify-center text-slate-500 text-xs font-semibold">
                        Select a chat to begin responding.
                      </div>
                    )}
                  </div>

                </div>
              </div>
            )}

            {/* TAB 6: BANNER SETTINGS */}
            {activeTab === 'banner' && (
              <div className="bg-slate-900 border border-white/10 rounded-[2.5rem] p-8 max-w-2xl">
                <h2 className="text-xl font-black mb-1">Homepage Hero Banner Control</h2>
                <p className="text-xs text-slate-400 mb-6 font-semibold">Change the main image and redirect URL of the website's Hero section.</p>

                <form onSubmit={handleBannerSave} className="space-y-5">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Hero Image Banner URL *</label>
                    <input 
                      type="url"
                      required
                      placeholder="Enter image URL (e.g. Unsplash URL)"
                      value={banner.imageUrl}
                      onChange={(e) => setBanner({...banner, imageUrl: e.target.value})}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white outline-none focus:border-blue-500 text-xs font-medium"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Click Redirection Path / Link *</label>
                    <input 
                      type="text"
                      required
                      placeholder="e.g. /claims or external https link"
                      value={banner.redirectUrl}
                      onChange={(e) => setBanner({...banner, redirectUrl: e.target.value})}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white outline-none focus:border-blue-500 text-xs font-medium"
                    />
                  </div>

                  <button 
                    type="submit"
                    className="px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl text-xs transition-colors"
                  >
                    Save Changes
                  </button>
                </form>
              </div>
            )}

          </div>
        </div>
      </div>

      {/* Leads view detail modal popup */}
      {selectedLead && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm">
          <div className="bg-slate-900 border border-white/10 rounded-[2.5rem] w-full max-w-2xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh]">
            <div className="bg-slate-950 text-white px-6 py-4 flex justify-between items-center border-b border-white/10">
              <div>
                <span className="bg-blue-600 text-white text-[10px] font-extrabold px-2 py-0.5 rounded uppercase">{selectedLead.productType}</span>
                <h3 className="text-lg font-black mt-1">Lead Details (Ref: {selectedLead.id})</h3>
              </div>
              <button onClick={() => setSelectedLead(null)} className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-slate-300 hover:text-white">
                <X size={18} />
              </button>
            </div>
            
            <div className="p-6 overflow-y-auto space-y-6 text-sm text-slate-300">
              <div className="grid grid-cols-2 gap-4">
                <div><span className="font-bold text-slate-500 block text-xs uppercase">Date Created</span><span className="font-semibold">{selectedLead.date}</span></div>
                <div><span className="font-bold text-slate-500 block text-xs uppercase">Full Name</span><span className="font-semibold text-white">{selectedLead.name}</span></div>
                <div><span className="font-bold text-slate-500 block text-xs uppercase">Mobile</span><span className="font-semibold text-white">{selectedLead.mobile}</span></div>
                <div><span className="font-bold text-slate-500 block text-xs uppercase">Email</span><span className="font-semibold">{selectedLead.email || '-'}</span></div>
                {selectedLead.pincode && <div><span className="font-bold text-slate-500 block text-xs uppercase">Location</span><span className="font-semibold">{selectedLead.city}, {selectedLead.state} - {selectedLead.pincode}</span></div>}
              </div>

              {selectedLead.make && (
                <div className="border-t border-white/10 pt-4 space-y-2">
                  <h4 className="font-bold text-white text-xs uppercase">🚗 Vehicle Details</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div><span className="font-bold text-slate-500 block text-xs uppercase">Vehicle Make/Model</span><span>{selectedLead.make} {selectedLead.model}</span></div>
                    {selectedLead.variant && <div><span className="font-bold text-slate-500 block text-xs uppercase">Variant</span><span>{selectedLead.variant}</span></div>}
                    <div><span className="font-bold text-slate-500 block text-xs uppercase">Fuel & Year</span><span>{selectedLead.fuelType} ({selectedLead.mfgYear})</span></div>
                    {selectedLead.regNo && <div><span className="font-bold text-slate-500 block text-xs uppercase">Registration No</span><span className="text-blue-400 font-bold">{selectedLead.regNo}</span></div>}
                  </div>
                </div>
              )}

              {/* Health insurance details */}
              {selectedLead.members && (
                <div className="border-t border-white/10 pt-4 space-y-2">
                  <h4 className="font-bold text-white text-xs uppercase">🩺 Health Cover Details</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div><span className="font-bold text-slate-500 block text-xs uppercase">Covered Members</span><span>{selectedLead.members}</span></div>
                    <div><span className="font-bold text-slate-500 block text-xs uppercase">Members Ages / DOB</span><span>{selectedLead.memberDetails}</span></div>
                    {selectedLead.preExisting && <div><span className="font-bold text-slate-500 block text-xs uppercase">Pre-existing Diseases</span><span className="text-red-400">{selectedLead.preExisting}</span></div>}
                  </div>
                </div>
              )}

              {/* Fire insurance details */}
              {selectedLead.propertyType && (
                <div className="border-t border-white/10 pt-4 space-y-2">
                  <h4 className="font-bold text-white text-xs uppercase">🔥 Fire Risk details</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div><span className="font-bold text-slate-500 block text-xs uppercase">Property Type</span><span>{selectedLead.propertyType}</span></div>
                    <div><span className="font-bold text-slate-500 block text-xs uppercase">Construction Type</span><span>{selectedLead.constructionType}</span></div>
                    <div><span className="font-bold text-slate-500 block text-xs uppercase">Occupancy Type</span><span>{selectedLead.occupancy}</span></div>
                    <div><span className="font-bold text-slate-500 block text-xs uppercase">Sum Insured</span><span className="text-green-400">{selectedLead.sumInsured}</span></div>
                  </div>
                </div>
              )}
            </div>
            
            <div className="bg-slate-950 px-6 py-4 border-t border-white/10 flex justify-end">
              <button onClick={() => setSelectedLead(null)} className="px-5 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold rounded-xl text-xs transition-colors">
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
