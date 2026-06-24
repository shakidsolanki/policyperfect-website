import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Lock, User, LogOut, Search, Trash2, Database, Eye, X, AlertCircle,
  Plus, Check, MessageSquare, Image, ShieldAlert, FileText, CheckCircle,
  RefreshCw, Megaphone, Link as LinkIcon, Phone, Tag, ToggleLeft, ToggleRight,
  Save, Bell, Layout, ChevronDown, ChevronUp
} from 'lucide-react';
import { db } from '../utils/db';
import HeroBackground from '../components/HeroBackground';
import DashboardView from '../components/admin/DashboardView';
import QuotesView from '../components/admin/QuotesView';
import InquiriesView from '../components/admin/InquiriesView';
import RenewalsView from '../components/admin/RenewalsView';
import ClaimsView from '../components/admin/ClaimsView';
import GaragesView from '../components/admin/GaragesView';
import ReportsView from '../components/admin/ReportsView';
import CmsView from '../components/admin/CmsView';
import ProductsView from '../components/admin/ProductsView';
import BlogsView from '../components/admin/BlogsView';
import SettingsView from '../components/admin/SettingsView';
import SeoView from '../components/admin/SeoView';

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
  const [inquiries, setInquiries] = useState([]);
  const [garages, setGarages] = useState([]);
  const [renewals, setRenewals] = useState([]);
  const [products, setProducts] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [faqs, setFaqs] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [settings, setSettings] = useState({});
  const [seo, setSeo] = useState({});
  const [banner, setBanner] = useState({ imageUrl: '', redirectUrl: '' });

  // Content Manager States
  const [announcement, setAnnouncement] = useState({ enabled: false, text: '', type: 'info', link: '', linkText: 'Know More' });
  const [offers, setOffers] = useState([]);
  const [quickLinks, setQuickLinks] = useState([]);
  const [contact, setContact] = useState({ phone: '', whatsapp: '', email: '', address: '' });
  const [siteLogo, setSiteLogo] = useState({ url: '/logo.png', width: '180' });
  const [aboutUs, setAboutUs] = useState({ text: '' });
  const [cmSaveMsg, setCmSaveMsg] = useState('');
  
  // Navigation
  const [activeTab, setActiveTab] = useState('dashboard');
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
    setInquiries(db.getInquiries ? db.getInquiries() : []);
    setGarages(db.getGarages ? db.getGarages() : []);
    setRenewals(db.getRenewals ? db.getRenewals() : []);
    setProducts(db.getProducts ? db.getProducts() : []);
    setBlogs(db.getBlogs ? db.getBlogs() : []);
    setFaqs(db.getFaqs ? db.getFaqs() : []);
    setTestimonials(db.getTestimonials ? db.getTestimonials() : []);
    setSettings(db.getSettings ? db.getSettings() : {});
    setSeo(db.getSeo ? db.getSeo() : {});
    setBanner(db.getBanner());
    try {
      setAnnouncement(db.getAnnouncement ? db.getAnnouncement() : { enabled:false, text:'', type:'info', link:'', linkText:'Know More' });
      setOffers(db.getOffers ? db.getOffers() : []);
      setQuickLinks(db.getQuickLinks ? db.getQuickLinks() : []);
      setContact(db.getContact ? db.getContact() : { phone:'', whatsapp:'', email:'', address:'' });
      setSiteLogo(db.getLogo ? db.getLogo() : { url: '/logo.png', width: '180' });
      setAboutUs(db.getAbout ? db.getAbout() : { text: '' });
    } catch(_) {}
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
      <div className="min-h-screen bg-[#fdfbf7] flex items-center justify-center p-4 font-sans relative overflow-hidden">
        {/* Dynamic Background Elements */}
        <HeroBackground isDark={false} icons={[Lock, ShieldAlert, Database]} />

        <motion.div 
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="bg-white/80 backdrop-blur-2xl border border-white p-8 sm:p-12 rounded-[2.5rem] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.05)] w-full max-w-md relative z-10"
        >
          <div className="absolute inset-0 bg-gradient-to-b from-white/60 to-white/10 rounded-[2.5rem] pointer-events-none"></div>
          
          <div className="text-center mb-10 relative">
            <motion.div 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.2 }}
              className="w-20 h-20 bg-gradient-to-br from-teal-500 to-blue-600 shadow-xl shadow-teal-500/30 text-white rounded-[1.5rem] flex items-center justify-center mx-auto mb-6 transform rotate-3 hover:rotate-0 transition-transform"
            >
              <Lock size={36} />
            </motion.div>
            <h2 className="text-3xl font-black text-slate-900 tracking-tight">Admin Portal</h2>
            <p className="text-slate-500 font-medium text-sm mt-2">Secure access for PolicyPerfect staff</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6 relative">
            {error && (
              <motion.div 
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-red-50 border border-red-100 text-red-600 p-4 rounded-2xl text-sm text-center font-bold shadow-sm"
              >
                {error}
              </motion.div>
            )}
            <div>
              <label className="block text-[11px] font-black uppercase tracking-wider text-slate-500 mb-2 ml-1">Username</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                  <User className="text-slate-400 group-focus-within:text-teal-600 transition-colors" size={20} />
                </div>
                <input 
                  type="text" 
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 bg-slate-50/50 border border-slate-200 rounded-2xl text-slate-900 outline-none focus:bg-white focus:border-teal-500 focus:ring-4 focus:ring-teal-500/10 transition-all font-semibold text-[15px]"
                  placeholder="admin@policyperfect"
                />
              </div>
            </div>
            <div>
              <label className="block text-[11px] font-black uppercase tracking-wider text-slate-500 mb-2 ml-1">Password</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                  <Lock className="text-slate-400 group-focus-within:text-teal-600 transition-colors" size={20} />
                </div>
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 bg-slate-50/50 border border-slate-200 rounded-2xl text-slate-900 outline-none focus:bg-white focus:border-teal-500 focus:ring-4 focus:ring-teal-500/10 transition-all font-semibold text-[15px] tracking-widest placeholder:tracking-normal"
                  placeholder="••••••••"
                />
              </div>
            </div>
            <button 
              type="submit"
              className="w-full bg-slate-900 text-white font-black text-[15px] py-4 rounded-2xl shadow-xl shadow-slate-900/20 hover:bg-teal-600 hover:shadow-teal-600/30 transition-all duration-300 transform hover:-translate-y-1 relative overflow-hidden group"
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                Secure Login <ChevronDown className="rotate-[-90deg] group-hover:translate-x-1 transition-transform" size={18} />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-teal-500 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>
          </form>
        </motion.div>
      </div>
    );
  }

  // MAIN PORTAL
  return (
    <div className="min-h-screen bg-[#fdfbf7] text-slate-900 font-sans pb-24 relative overflow-hidden">
      {/* Background Elements */}
      <HeroBackground isDark={false} icons={[Database, ShieldAlert, FileText]} />

      <div className="relative z-10">
        {/* Top Navbar */}
        <div className="bg-white/70 backdrop-blur-xl border-b border-white shadow-sm px-4 py-5 sm:px-6 lg:px-8">
        <div className="max-w-[1400px] mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-brand-gold text-brand-navy flex items-center justify-center">
              <Database className="text-slate-900" size={24} />
            </div>
            <div>
              <h1 className="text-lg font-black text-slate-900 leading-tight font-sans">PolicyPerfect Admin Dashboard</h1>
              <p className="text-xs text-slate-600">Manage all customer queries & setups</p>
            </div>
          </div>
          <button 
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 border border-slate-200 rounded-xl text-xs font-bold hover:bg-red-500/10 hover:border-red-500/30 hover:text-red-400 transition-all"
          >
            Logout <LogOut size={14} />
          </button>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 mt-10">
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Left Navigation Menu */}
          <div className="w-full lg:w-1/4 space-y-6">
            {[
              {
                title: "Overview",
                items: [
                  { id: 'dashboard', icon: Layout, label: 'Dashboard Overview' }
                ]
              },
              {
                title: "Customer Requests",
                items: [
                  { id: 'leads', icon: Database, label: 'Quote Requests', count: leads.length },
                  { id: 'renewals', icon: RefreshCw, label: 'Renewal Requests', count: renewals.length },
                  { id: 'inquiries', icon: MessageSquare, label: 'Contact Inquiries', count: inquiries.length },
                  { id: 'chats', icon: MessageSquare, label: 'Support Chats', count: chats.length }
                ]
              },
              {
                title: "Core Operations",
                items: [
                  { id: 'policies', icon: ShieldAlert, label: 'Active Policies', count: policies.length },
                  { id: 'claims', icon: AlertCircle, label: 'Claims Intimation', count: claims.length },
                  { id: 'endorsements', icon: FileText, label: 'Endorsements', count: endorsements.filter(r => r.status==='Pending').length },
                  { id: 'garages', icon: Tag, label: 'Cashless Garages', count: garages.length }
                ]
              },
              {
                title: "Website Management",
                items: [
                  { id: 'products', icon: ShieldAlert, label: 'Insurance Products', count: products.length },
                  { id: 'blogs', icon: FileText, label: 'Blog Management', count: blogs.length },
                  { id: 'content', icon: Layout, label: 'Website CMS' }
                ]
              },
              {
                title: "System & Analytics",
                items: [
                  { id: 'reports', icon: FileText, label: 'Reports Center' },
                  { id: 'seo', icon: Search, label: 'SEO Management' },
                  { id: 'settings', icon: Bell, label: 'Website Settings' }
                ]
              }
            ].map((group, groupIdx) => (
              <div key={groupIdx} className="space-y-2">
                <h4 className="px-2 text-[10px] font-black text-slate-400 uppercase tracking-widest">{group.title}</h4>
                <div className="space-y-1.5">
                  {group.items.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => { setActiveTab(tab.id); setSearchTerm(''); }}
                      className={`w-full flex items-center justify-between px-4 py-3.5 rounded-2xl font-bold text-sm transition-all text-left border ${
                        activeTab === tab.id
                          ? 'bg-teal-600 text-white shadow-lg shadow-teal-500/30 border-teal-500'
                          : 'bg-white/60 text-slate-600 hover:text-teal-600 hover:bg-white border-transparent hover:border-white shadow-sm'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <tab.icon size={16} />
                        {tab.label}
                      </div>
                      {tab.count !== undefined && (
                        <span className={`text-[10px] px-2 py-0.5 rounded-full font-black ${activeTab === tab.id ? 'bg-white text-teal-600' : 'bg-slate-100 text-slate-500'}`}>
                          {tab.count}
                        </span>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Right Workspace Area */}
          <div className="w-full lg:w-3/4">

            {/* TAB 0: DASHBOARD */}
            {activeTab === 'dashboard' && (
              <DashboardView 
                stats={{ 
                  leads: leads.length, 
                  policies: policies.length, 
                  endorsements: endorsements.filter(r => r.status==='Pending').length 
                }} 
              />
            )}

            {/* TAB 1: QUOTE REQUESTS */}
            {activeTab === 'leads' && (
              <QuotesView leads={leads} setLeads={setLeads} />
            )}

            {/* TAB 1.5: INQUIRIES */}
            {activeTab === 'inquiries' && (
              <InquiriesView inquiries={inquiries} setInquiries={setInquiries} />
            )}

            {/* TAB 2: POLICIES REGISTRY */}
            {activeTab === 'policies' && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-black">Active Policies</h2>
                  <button 
                    onClick={() => setShowAddPolicy(!showAddPolicy)}
                    className="px-4 py-2.5 bg-brand-gold text-brand-navy font-bold rounded-xl text-xs flex items-center gap-2 transition-all"
                  >
                    <Plus size={16} /> Create Policy
                  </button>
                </div>

                {showAddPolicy && (
                  <form onSubmit={handleAddPolicySubmit} className="bg-white border-slate-200 border border-slate-200 p-6 rounded-3xl space-y-4">
                    <h3 className="font-bold text-slate-900 mb-2">Policy Creation Form</h3>
                    <div className="grid md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-[11px] font-bold text-slate-600 uppercase tracking-wider mb-1">Policy Number *</label>
                        <input type="text" placeholder="e.g. PP-MOT-998822" required className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-slate-900" value={newPolicy.policyNo} onChange={(e) => setNewPolicy({...newPolicy, policyNo: e.target.value})} />
                      </div>
                      <div>
                        <label className="block text-[11px] font-bold text-slate-600 uppercase tracking-wider mb-1">Customer Name *</label>
                        <input type="text" placeholder="Full Name" required className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-slate-900" value={newPolicy.name} onChange={(e) => setNewPolicy({...newPolicy, name: e.target.value})} />
                      </div>
                      <div>
                        <label className="block text-[11px] font-bold text-slate-600 uppercase tracking-wider mb-1">Registered Mobile *</label>
                        <input type="tel" maxLength={10} placeholder="10-digit number" required className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-slate-900" value={newPolicy.mobile} onChange={(e) => setNewPolicy({...newPolicy, mobile: e.target.value.replace(/\D/g,'')})} />
                      </div>
                      <div>
                        <label className="block text-[11px] font-bold text-slate-600 uppercase tracking-wider mb-1">Partner Insurer</label>
                        <select className="w-full px-3 py-2 bg-brand-navy-light border border-slate-200 rounded-lg text-slate-900" value={newPolicy.insurer} onChange={(e) => setNewPolicy({...newPolicy, insurer: e.target.value})}>
                          <option value="HDFC ERGO">HDFC ERGO</option>
                          <option value="ICICI Lombard">ICICI Lombard</option>
                          <option value="Star Health">Star Health</option>
                          <option value="Tata AIG">Tata AIG</option>
                          <option value="Bajaj Allianz">Bajaj Allianz</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-[11px] font-bold text-slate-600 uppercase tracking-wider mb-1">Product Category</label>
                        <select className="w-full px-3 py-2 bg-brand-navy-light border border-slate-200 rounded-lg text-slate-900" value={newPolicy.productType} onChange={(e) => setNewPolicy({...newPolicy, productType: e.target.value})}>
                          <option value="Motor Insurance">Motor Insurance</option>
                          <option value="Health Insurance">Health Insurance</option>
                          <option value="Term Life Insurance">Term Life Insurance</option>
                          <option value="Fire Insurance">Fire Insurance</option>
                          <option value="Home Insurance">Home Insurance</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-[11px] font-bold text-slate-600 uppercase tracking-wider mb-1">Asset/Vehicle Details</label>
                        <input type="text" placeholder="e.g. Swift LXI, Home Structure" className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-slate-900" value={newPolicy.vehicleDetails} onChange={(e) => setNewPolicy({...newPolicy, vehicleDetails: e.target.value})} />
                      </div>
                      <div>
                        <label className="block text-[11px] font-bold text-slate-600 uppercase tracking-wider mb-1">Reg/License Plate (Optional)</label>
                        <input type="text" placeholder="e.g. DL-3C-AS-9988" className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-slate-900" value={newPolicy.regNo} onChange={(e) => setNewPolicy({...newPolicy, regNo: e.target.value})} />
                      </div>
                      <div>
                        <label className="block text-[11px] font-bold text-slate-600 uppercase tracking-wider mb-1">Premium Amount</label>
                        <input type="text" placeholder="e.g. ₹9,850" className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-slate-900" value={newPolicy.premium} onChange={(e) => setNewPolicy({...newPolicy, premium: e.target.value})} />
                      </div>
                      <div>
                        <label className="block text-[11px] font-bold text-slate-600 uppercase tracking-wider mb-1">Start Date</label>
                        <input type="date" className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-slate-900" value={newPolicy.startDate} onChange={(e) => setNewPolicy({...newPolicy, startDate: e.target.value})} />
                      </div>
                      <div>
                        <label className="block text-[11px] font-bold text-slate-600 uppercase tracking-wider mb-1">End Date</label>
                        <input type="date" className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-slate-900" value={newPolicy.endDate} onChange={(e) => setNewPolicy({...newPolicy, endDate: e.target.value})} />
                      </div>
                    </div>
                    <button type="submit" className="px-6 py-2.5 bg-brand-gold text-brand-navy font-bold rounded-xl text-xs transition-colors">
                      Register Policy
                    </button>
                  </form>
                )}

                <div className="bg-white border-slate-200 border border-slate-200 rounded-[2rem] overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm text-slate-600">
                      <thead className="bg-brand-navy-light text-slate-800 border-b border-slate-200 text-xs font-bold uppercase">
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
                            <tr key={p.id} className="hover:bg-white transition-colors">
                              <td className="px-6 py-4 text-slate-800 font-bold">{p.policyNo}</td>
                              <td className="px-6 py-4 text-slate-700">{p.name}</td>
                              <td className="px-6 py-4">{p.mobile}</td>
                              <td className="px-6 py-4 text-xs">{p.insurer}</td>
                              <td className="px-6 py-4 text-xs">{p.productType}</td>
                              <td className="px-6 py-4 text-right">
                                <button onClick={() => handleDeletePolicy(p.id)} className="text-red-400 hover:text-slate-900 p-2 rounded-lg bg-white hover:bg-red-600 transition-all">
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
                <div className="bg-white border-slate-200 border border-slate-200 rounded-[2rem] overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm text-slate-600">
                      <thead className="bg-brand-navy-light text-slate-800 border-b border-slate-200 text-xs font-bold uppercase">
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
                            <tr key={req.id} className="hover:bg-white transition-colors">
                              <td className="px-6 py-4 text-xs text-slate-500 whitespace-nowrap">{req.date}</td>
                              <td className="px-6 py-4 text-slate-800 font-bold">{req.policyNo}</td>
                              <td className="px-6 py-4 text-xs">{req.changeType}</td>
                              <td className="px-6 py-4 text-slate-700">{req.newValue}</td>
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
                                    <button onClick={() => handleApproveEndorsement(req)} className="text-green-400 hover:text-slate-900 p-2 rounded-lg bg-white hover:bg-green-600 transition-all mr-2" title="Approve & Merge">
                                      <Check size={16} />
                                    </button>
                                    <button onClick={() => handleRejectEndorsement(req.id)} className="text-red-400 hover:text-slate-900 p-2 rounded-lg bg-white hover:bg-red-600 transition-all" title="Reject">
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

            {/* TAB 3: RENEWAL REQUESTS */}
            {activeTab === 'renewals' && (
              <RenewalsView renewals={renewals} setRenewals={setRenewals} />
            )}

            {/* TAB 4: CLAIMS INTIMATION LOGS */}
            {activeTab === 'claims' && (
              <ClaimsView claims={claims} setClaims={setClaims} />
            )}

            {/* TAB 4.1: CASHLESS GARAGES */}
            {activeTab === 'garages' && (
              <GaragesView garages={garages} setGarages={setGarages} />
            )}

            {/* TAB 4.2: REPORTS CENTER */}
            {activeTab === 'reports' && (
              <ReportsView leads={leads} policies={policies} claims={claims} renewals={renewals} />
            )}

            {/* PHASE 3 & 4 COMPONENTS */}
            {activeTab === 'products' && <ProductsView products={products} setProducts={setProducts} />}
            {activeTab === 'blogs' && <BlogsView blogs={blogs} setBlogs={setBlogs} />}
            {activeTab === 'content' && <CmsView banner={banner} setBanner={setBanner} faqs={faqs} setFaqs={setFaqs} testimonials={testimonials} setTestimonials={setTestimonials} about={aboutUs} setAbout={setAboutUs} />}
            {activeTab === 'settings' && <SettingsView settings={settings} setSettings={setSettings} />}
            {activeTab === 'seo' && <SeoView seo={seo} setSeo={setSeo} />}

            {/* TAB 5: LIVE SUPPORT CHAT HUB */}
            {activeTab === 'chats' && (
              <div className="space-y-6">
                <h2 className="text-xl font-black">Live Support Messages</h2>
                <div className="flex bg-white border-slate-200 border border-slate-200 rounded-[2.5rem] overflow-hidden min-h-[500px]">
                  
                  {/* Active Chats List */}
                  <div className="w-1/3 border-r border-slate-200 flex flex-col">
                    <div className="p-4 border-b border-slate-200 font-bold text-slate-900 text-xs uppercase tracking-wider">Conversations</div>
                    <div className="flex-grow overflow-y-auto divide-y divide-white/5">
                      {chats.length === 0 ? (
                        <div className="p-4 text-center text-slate-500 text-xs font-semibold">No active chats.</div>
                      ) : (
                        chats.map(chat => (
                          <div 
                            key={chat.mobile}
                            onClick={() => setActiveChatId(chat.mobile)}
                            className={`p-4 cursor-pointer hover:bg-white transition-all ${activeChatId === chat.mobile ? 'bg-white' : ''}`}
                          >
                            <div className="font-bold text-slate-800 text-sm">{chat.name || 'Anonymous'}</div>
                            <div className="text-[11px] text-slate-600 mt-0.5">Mob: {chat.mobile}</div>
                            <div className="text-xs text-slate-500 truncate mt-1">
                              {chat.messages[chat.messages.length - 1]?.text}
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  </div>

                  {/* Active Chat Window */}
                  <div className="w-2/3 flex flex-col justify-between bg-brand-navy-light/40">
                    {activeChatId ? (() => {
                      const chat = chats.find(c => c.mobile === activeChatId);
                      return (
                        <>
                          {/* Chat Header */}
                          <div className="p-4 border-b border-slate-200 flex justify-between items-center bg-white border-slate-200">
                            <div>
                              <div className="font-bold text-slate-900 text-sm">{chat.name || 'Customer'}</div>
                              <div className="text-[10px] text-slate-600">Mobile: {chat.mobile}</div>
                            </div>
                          </div>

                          {/* Chat Messages */}
                          <div className="flex-grow p-4 overflow-y-auto space-y-4">
                            {chat.messages.map((m, idx) => (
                              <div key={idx} className={`flex flex-col ${m.sender === 'admin' ? 'items-end' : 'items-start'}`}>
                                <div className={`px-4 py-2.5 rounded-2xl max-w-sm text-xs font-semibold leading-relaxed ${
                                  m.sender === 'admin' ? 'bg-brand-gold text-brand-navy rounded-tr-none' : 'bg-white border-slate-200 border border-slate-200 text-slate-800 rounded-tl-none'
                                }`}>
                                  {m.text}
                                  {m.fileName && (
                                    <div className="mt-2 pt-2 border-t border-slate-200 flex items-center gap-1.5 text-[10px] text-blue-300 font-bold">
                                      <FileText size={12} /> Doc: {m.fileName}
                                    </div>
                                  )}
                                </div>
                                <span className="text-[9px] text-slate-500 mt-1">{m.time}</span>
                              </div>
                            ))}
                          </div>

                          {/* Chat Input */}
                          <form onSubmit={handleSendChatReply} className="p-4 border-t border-slate-200 bg-white border-slate-200 flex gap-3">
                            <input 
                              type="text" 
                              placeholder="Type your reply here..." 
                              value={chatReplyText}
                              onChange={(e) => setChatReplyText(e.target.value)}
                              className="flex-grow px-4 py-3 bg-white border border-slate-200 rounded-xl text-slate-900 outline-none focus:border-teal-500 text-xs font-medium"
                            />
                            <button type="submit" className="px-5 bg-brand-gold text-brand-navy transition-all">
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

          </div>
        </div>
      </div>

      {/* Leads view detail modal popup */}
      {selectedLead && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-brand-navy-light/70 backdrop-blur-sm">
          <div className="bg-white border-slate-200 border border-slate-200 rounded-[2.5rem] w-full max-w-2xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh]">
            <div className="bg-brand-navy-light text-slate-900 px-6 py-4 flex justify-between items-center border-b border-slate-200">
              <div>
                <span className="bg-brand-gold text-brand-navy text-[10px] font-extrabold px-2 py-0.5 rounded uppercase">{selectedLead.productType}</span>
                <h3 className="text-lg font-black mt-1">Lead Details (Ref: {selectedLead.id})</h3>
              </div>
              <button onClick={() => setSelectedLead(null)} className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-slate-700 hover:text-slate-900">
                <X size={18} />
              </button>
            </div>
            
            <div className="p-6 overflow-y-auto space-y-6 text-sm text-slate-700">
              <div className="grid grid-cols-2 gap-4">
                <div><span className="font-bold text-slate-500 block text-xs uppercase">Date Created</span><span className="font-semibold">{selectedLead.date}</span></div>
                <div><span className="font-bold text-slate-500 block text-xs uppercase">Full Name</span><span className="font-semibold text-slate-900">{selectedLead.name}</span></div>
                <div><span className="font-bold text-slate-500 block text-xs uppercase">Mobile</span><span className="font-semibold text-slate-900">{selectedLead.mobile}</span></div>
                <div><span className="font-bold text-slate-500 block text-xs uppercase">Email</span><span className="font-semibold">{selectedLead.email || '-'}</span></div>
                {selectedLead.pincode && <div><span className="font-bold text-slate-500 block text-xs uppercase">Location</span><span className="font-semibold">{selectedLead.city}, {selectedLead.state} - {selectedLead.pincode}</span></div>}
              </div>

              {selectedLead.make && (
                <div className="border-t border-slate-200 pt-4 space-y-2">
                  <h4 className="font-bold text-slate-900 text-xs uppercase">🚗 Vehicle Details</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div><span className="font-bold text-slate-500 block text-xs uppercase">Vehicle Make/Model</span><span>{selectedLead.make} {selectedLead.model}</span></div>
                    {selectedLead.variant && <div><span className="font-bold text-slate-500 block text-xs uppercase">Variant</span><span>{selectedLead.variant}</span></div>}
                    <div><span className="font-bold text-slate-500 block text-xs uppercase">Fuel & Year</span><span>{selectedLead.fuelType} ({selectedLead.mfgYear})</span></div>
                    {selectedLead.regNo && <div><span className="font-bold text-slate-500 block text-xs uppercase">Registration No</span><span className="text-brand-gold font-bold">{selectedLead.regNo}</span></div>}
                  </div>
                </div>
              )}

              {/* Health insurance details */}
              {selectedLead.members && (
                <div className="border-t border-slate-200 pt-4 space-y-2">
                  <h4 className="font-bold text-slate-900 text-xs uppercase">🩺 Health Cover Details</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div><span className="font-bold text-slate-500 block text-xs uppercase">Covered Members</span><span>{selectedLead.members}</span></div>
                    <div><span className="font-bold text-slate-500 block text-xs uppercase">Members Ages / DOB</span><span>{selectedLead.memberDetails}</span></div>
                    {selectedLead.preExisting && <div><span className="font-bold text-slate-500 block text-xs uppercase">Pre-existing Diseases</span><span className="text-red-400">{selectedLead.preExisting}</span></div>}
                  </div>
                </div>
              )}

              {/* Fire insurance details */}
              {selectedLead.propertyType && (
                <div className="border-t border-slate-200 pt-4 space-y-2">
                  <h4 className="font-bold text-slate-900 text-xs uppercase">🔥 Fire Risk details</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div><span className="font-bold text-slate-500 block text-xs uppercase">Property Type</span><span>{selectedLead.propertyType}</span></div>
                    <div><span className="font-bold text-slate-500 block text-xs uppercase">Construction Type</span><span>{selectedLead.constructionType}</span></div>
                    <div><span className="font-bold text-slate-500 block text-xs uppercase">Occupancy Type</span><span>{selectedLead.occupancy}</span></div>
                    <div><span className="font-bold text-slate-500 block text-xs uppercase">Sum Insured</span><span className="text-green-400">{selectedLead.sumInsured}</span></div>
                  </div>
                </div>
              )}
            </div>
            
            <div className="bg-brand-navy-light px-6 py-4 border-t border-slate-200 flex justify-end">
              <button onClick={() => setSelectedLead(null)} className="px-5 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-700 font-bold rounded-xl text-xs transition-colors">
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      </div>
    </div>
  );
};

export default AdminDashboard;
