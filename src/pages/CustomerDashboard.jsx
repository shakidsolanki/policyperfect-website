import React, { useState, useEffect } from 'react';
import { db } from '../utils/db';
import { 
  Phone, KeyRound, ShieldCheck, Download, AlertCircle, 
  Send, RefreshCw, LogOut, CheckCircle, FileText, UserCheck, MessageSquare 
} from 'lucide-react';

const CustomerDashboard = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [mobile, setMobile] = useState('');
  const [otp, setOtp] = useState('');
  const [sentOtp, setSentOtp] = useState('');
  const [otpStep, setOtpStep] = useState(1); // 1: Enter mobile, 2: Enter OTP
  const [activeTab, setActiveTab] = useState('policies'); // policies, intimate-claim, endorsements
  const [policies, setPolicies] = useState([]);
  
  // Claim Form State
  const [claimForm, setClaimForm] = useState({
    policyId: '',
    accidentDate: '',
    accidentTime: '',
    location: '',
    description: '',
    driverDetails: '',
    witnessContact: ''
  });
  
  // Endorsement Form State
  const [endorsementForm, setEndorsementForm] = useState({
    policyId: '',
    changeType: 'Name Correction',
    newValue: '',
    documentName: ''
  });

  const [notification, setNotification] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    // Check session
    const savedMobile = sessionStorage.getItem('customer_mobile');
    if (savedMobile) {
      setIsLoggedIn(true);
      setMobile(savedMobile);
      loadCustomerPolicies(savedMobile);
    }
  }, []);

  const loadCustomerPolicies = (mob) => {
    const allPolicies = db.getPolicies();
    const customerPolicies = allPolicies.filter(p => p.mobile === mob);
    setPolicies(customerPolicies);
    if (customerPolicies.length > 0) {
      setClaimForm(prev => ({ ...prev, policyId: customerPolicies[0].id }));
      setEndorsementForm(prev => ({ ...prev, policyId: customerPolicies[0].id }));
    }
  };

  const handleSendOtp = (e) => {
    e.preventDefault();
    if (mobile.length !== 10) {
      setError('Please enter a valid 10-digit mobile number');
      return;
    }
    setError('');
    
    // Generate a random 6-digit OTP
    const generatedOtp = Math.floor(100000 + Math.random() * 900000).toString();
    setSentOtp(generatedOtp);
    setOtpStep(2);
    setNotification(`OTP Sent! Your mock OTP is: ${generatedOtp}`);
  };

  const handleVerifyOtp = (e) => {
    e.preventDefault();
    if (otp === sentOtp || otp === '123456') { // Fallback standard OTP
      setError('');
      setIsLoggedIn(true);
      sessionStorage.setItem('customer_mobile', mobile);
      loadCustomerPolicies(mobile);
      setNotification('Logged in successfully!');
      setTimeout(() => setNotification(''), 3000);
    } else {
      setError('Invalid OTP code. Please try again.');
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setMobile('');
    setOtp('');
    setSentOtp('');
    setOtpStep(1);
    sessionStorage.removeItem('customer_mobile');
  };

  const handleDownloadPolicy = (policy) => {
    const policyContent = `
========================================
       POLICYPERFECT INSURANCE CORP     
========================================
POLICY COPY (DIGITAL REPLICA)
----------------------------------------
Policy Number : ${policy.policyNo}
Insured Name  : ${policy.name}
Insurer Partner: ${policy.insurer}
Product Type  : ${policy.productType}
Details       : ${policy.vehicleDetails}
Registration  : ${policy.regNo || 'N/A'}
Premium Paid  : ${policy.premium}
Start Date    : ${policy.startDate}
End Date      : ${policy.endDate}
Status        : ${policy.status}
----------------------------------------
Thank you for choosing PolicyPerfect.
For claim support, call +91 75749 48768
========================================
`;
    const blob = new Blob([policyContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Policy_${policy.policyNo}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    
    setNotification('Policy document downloaded successfully!');
    setTimeout(() => setNotification(''), 3000);
  };

  const handleClaimSubmit = (e) => {
    e.preventDefault();
    const selectedPolicy = policies.find(p => p.id === claimForm.policyId);
    if (!selectedPolicy) return;

    const newClaim = {
      id: 'CLM-' + Date.now().toString().slice(-6),
      policyNo: selectedPolicy.policyNo,
      productType: selectedPolicy.productType,
      mobile: mobile,
      name: selectedPolicy.name,
      vehicleDetails: selectedPolicy.vehicleDetails,
      date: new Date().toLocaleString(),
      ...claimForm
    };

    const currentClaims = db.getClaims();
    db.setClaims([newClaim, ...currentClaims]);

    setNotification(`Claim registered successfully! Ref No: ${newClaim.id}`);
    setClaimForm({
      policyId: policies[0]?.id || '',
      accidentDate: '',
      accidentTime: '',
      location: '',
      description: '',
      driverDetails: '',
      witnessContact: ''
    });
    setTimeout(() => setNotification(''), 5000);
  };

  const handleEndorsementSubmit = (e) => {
    e.preventDefault();
    const selectedPolicy = policies.find(p => p.id === endorsementForm.policyId);
    if (!selectedPolicy) return;

    const newRequest = {
      id: 'END-' + Date.now().toString().slice(-6),
      policyNo: selectedPolicy.policyNo,
      productType: selectedPolicy.productType,
      mobile: mobile,
      name: selectedPolicy.name,
      date: new Date().toLocaleString(),
      status: 'Pending',
      ...endorsementForm
    };

    const currentReqs = db.getEndorsements();
    db.setEndorsements([newRequest, ...currentReqs]);

    setNotification(`Change Request Submitted! Ref No: ${newRequest.id}`);
    setEndorsementForm({
      policyId: policies[0]?.id || '',
      changeType: 'Name Correction',
      newValue: '',
      documentName: ''
    });
    setTimeout(() => setNotification(''), 5000);
  };

  // RENDER LOGIN PORTAL
  if (!isLoggedIn) {
    return (
      <div className="min-h-[85vh] bg-[#0f172a] flex items-center justify-center px-4 py-20 font-sans">
        <div className="max-w-md w-full bg-slate-900/80 backdrop-blur-xl border border-white/10 p-8 rounded-[2.5rem] shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl"></div>
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-cyan-500/10 rounded-full blur-2xl"></div>

          <div className="text-center mb-8 relative z-10">
            <div className="w-16 h-16 bg-blue-500/10 border border-blue-500/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <ShieldCheck className="text-blue-400" size={32} />
            </div>
            <h1 className="text-2xl font-black text-white">Customer Portal</h1>
            <p className="text-slate-400 text-sm mt-1">Manage policies, claims, & downloads</p>
          </div>

          {error && (
            <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-3.5 rounded-xl text-xs flex items-center gap-2.5 mb-6">
              <AlertCircle size={16} />
              <span className="font-semibold">{error}</span>
            </div>
          )}

          {notification && (
            <div className="bg-green-500/10 border border-green-500/20 text-green-400 p-3.5 rounded-xl text-xs flex items-center gap-2.5 mb-6">
              <CheckCircle size={16} />
              <span className="font-semibold">{notification}</span>
            </div>
          )}

          {otpStep === 1 ? (
            <form onSubmit={handleSendOtp} className="space-y-5 relative z-10">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Registered Mobile Number</label>
                <div className="relative">
                  <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                  <input 
                    type="tel" 
                    placeholder="Enter 10-digit number"
                    maxLength={10}
                    value={mobile}
                    onChange={(e) => setMobile(e.target.value.replace(/\D/g, ''))}
                    className="w-full pl-12 pr-4 py-3.5 bg-white/5 border border-white/10 rounded-xl text-white outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all font-semibold"
                  />
                </div>
              </div>
              <button 
                type="submit" 
                className="w-full py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-bold shadow-lg shadow-blue-500/20 transition-all flex items-center justify-center gap-2"
              >
                Send Verification OTP <Send size={16} />
              </button>
            </form>
          ) : (
            <form onSubmit={handleVerifyOtp} className="space-y-5 relative z-10">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Enter 6-Digit OTP *</label>
                <div className="relative">
                  <KeyRound className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                  <input 
                    type="text" 
                    placeholder="Enter OTP (or 123456)"
                    maxLength={6}
                    value={otp}
                    onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                    className="w-full pl-12 pr-4 py-3.5 bg-white/5 border border-white/10 rounded-xl text-white outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all font-semibold text-center tracking-[0.5em] text-lg"
                  />
                </div>
              </div>
              <button 
                type="submit" 
                className="w-full py-4 bg-green-600 hover:bg-green-500 text-white rounded-xl font-bold shadow-lg shadow-green-500/20 transition-all flex items-center justify-center gap-2"
              >
                Verify & Login <ShieldCheck size={16} />
              </button>
              <button 
                type="button"
                onClick={() => setOtpStep(1)}
                className="w-full text-center text-xs font-bold text-slate-400 hover:text-white transition-colors"
              >
                Change Mobile Number
              </button>
            </form>
          )}

          <div className="mt-8 pt-6 border-t border-white/5 text-center">
            <p className="text-[11px] text-slate-500 font-semibold">
              Tip: Login with mobile <span className="text-slate-300">7574948768</span> to see loaded test policies!
            </p>
          </div>
        </div>
      </div>
    );
  }

  // RENDER LOGGED-IN CUSTOMER PORTAL
  return (
    <div className="min-h-screen bg-[#0f172a] text-slate-100 font-sans pb-24">
      
      {/* Top Navbar */}
      <div className="bg-slate-900 border-b border-white/10 px-4 py-5 sm:px-6 lg:px-8">
        <div className="max-w-[1400px] mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center">
              <ShieldCheck className="text-white" size={24} />
            </div>
            <div>
              <h1 className="text-lg font-black text-white leading-tight">PolicyPerfect Portal</h1>
              <p className="text-xs text-slate-400">Mobile: +91 {mobile}</p>
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
        
        {/* Dynamic Alerts */}
        {notification && (
          <div className="max-w-2xl mx-auto mb-8 bg-green-500/10 border border-green-500/20 text-green-400 p-4 rounded-2xl text-sm flex items-center gap-3 shadow-lg shadow-green-500/5">
            <CheckCircle size={18} />
            <span className="font-semibold">{notification}</span>
          </div>
        )}

        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Left Tab selector Menu */}
          <div className="w-full lg:w-1/4 space-y-3">
            {[
              { id: 'policies', title: 'My Active Policies', icon: FileText },
              { id: 'intimate-claim', title: 'Register a Claim', icon: AlertCircle },
              { id: 'endorsements', title: 'Request Changes', icon: RefreshCw }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
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

          {/* Right Content View */}
          <div className="w-full lg:w-3/4">
            
            {/* VIEW 1: MY POLICIES */}
            {activeTab === 'policies' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between mb-2">
                  <h2 className="text-xl font-black">Your Policies ({policies.length})</h2>
                </div>

                {policies.length === 0 ? (
                  <div className="bg-slate-900 border border-white/10 rounded-3xl p-12 text-center text-slate-500">
                    <FileText size={48} className="mx-auto mb-4 opacity-35 text-slate-400" />
                    <p className="font-bold">No active policies found for this mobile number.</p>
                    <p className="text-xs text-slate-500 mt-2">Create policies in the Admin dashboard to link them.</p>
                  </div>
                ) : (
                  <div className="grid md:grid-cols-2 gap-6">
                    {policies.map((p) => (
                      <div key={p.id} className="bg-slate-900 border border-white/10 rounded-[2rem] p-6 hover:border-blue-500/30 transition-all flex flex-col justify-between">
                        <div>
                          <div className="flex items-center justify-between mb-4">
                            <span className="text-xs font-bold bg-blue-500/10 text-blue-400 border border-blue-500/20 px-3 py-1 rounded-full uppercase tracking-wider">
                              {p.insurer}
                            </span>
                            <span className="text-xs font-bold text-green-400 flex items-center gap-1.5">
                              <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
                              Active
                            </span>
                          </div>
                          
                          <h3 className="text-lg font-black text-white mb-1">{p.productType}</h3>
                          <div className="text-xs text-slate-400 font-bold mb-4">Policy No: {p.policyNo}</div>
                          
                          <div className="border-t border-white/5 pt-4 space-y-2">
                            <div className="flex justify-between text-xs font-semibold">
                              <span className="text-slate-400">Details:</span>
                              <span className="text-slate-200">{p.vehicleDetails}</span>
                            </div>
                            {p.regNo && (
                              <div className="flex justify-between text-xs font-semibold">
                                <span className="text-slate-400">Reg No:</span>
                                <span className="text-slate-200">{p.regNo}</span>
                              </div>
                            )}
                            <div className="flex justify-between text-xs font-semibold">
                              <span className="text-slate-400">Valid Till:</span>
                              <span className="text-slate-200">{p.endDate}</span>
                            </div>
                            <div className="flex justify-between text-xs font-semibold">
                              <span className="text-slate-400">Premium Paid:</span>
                              <span className="text-blue-400 font-bold">{p.premium}</span>
                            </div>
                          </div>
                        </div>

                        <button
                          onClick={() => handleDownloadPolicy(p)}
                          className="mt-6 w-full py-3 bg-white/5 border border-white/10 hover:bg-white/10 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all"
                        >
                          <Download size={14} /> Download Document
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* VIEW 2: INTIMATE CLAIM */}
            {activeTab === 'intimate-claim' && (
              <div className="bg-slate-900 border border-white/10 rounded-[2.5rem] p-8 max-w-3xl">
                <h2 className="text-xl font-black mb-1">Intimate a Claim</h2>
                <p className="text-xs text-slate-400 mb-6 font-semibold">Report accident or damage details to start claim assistance.</p>
                
                {policies.length === 0 ? (
                  <p className="text-slate-500 text-sm font-semibold">You need an active policy to intimate a claim.</p>
                ) : (
                  <form onSubmit={handleClaimSubmit} className="space-y-5">
                    <div className="grid md:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Select Covered Policy *</label>
                        <select
                          value={claimForm.policyId}
                          onChange={(e) => setClaimForm({...claimForm, policyId: e.target.value})}
                          className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all font-medium"
                        >
                          {policies.map(p => (
                            <option key={p.id} value={p.id} className="bg-slate-950">{p.productType} ({p.policyNo})</option>
                          ))}
                        </select>
                      </div>
                      
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Accident Date *</label>
                        <input
                          type="date"
                          required
                          value={claimForm.accidentDate}
                          onChange={(e) => setClaimForm({...claimForm, accidentDate: e.target.value})}
                          className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all font-medium"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Accident Time *</label>
                        <input
                          type="time"
                          required
                          value={claimForm.accidentTime}
                          onChange={(e) => setClaimForm({...claimForm, accidentTime: e.target.value})}
                          className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all font-medium"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Accident Location *</label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. Sector 5, Noida"
                          value={claimForm.location}
                          onChange={(e) => setClaimForm({...claimForm, location: e.target.value})}
                          className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all font-medium"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Who was driving? (For Motor Insurance)</label>
                      <input
                        type="text"
                        placeholder="Driver Name and License details"
                        value={claimForm.driverDetails}
                        onChange={(e) => setClaimForm({...claimForm, driverDetails: e.target.value})}
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all font-medium"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Detailed Accident Description *</label>
                      <textarea
                        rows={3}
                        required
                        placeholder="Explain how the incident happened in details..."
                        value={claimForm.description}
                        onChange={(e) => setClaimForm({...claimForm, description: e.target.value})}
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all font-medium resize-none"
                      />
                    </div>

                    <button
                      type="submit"
                      className="px-8 py-3.5 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl shadow-lg shadow-blue-500/20 transition-all"
                    >
                      Intimate Claim
                    </button>
                  </form>
                )}
              </div>
            )}

            {/* VIEW 3: ENDORSEMENTS */}
            {activeTab === 'endorsements' && (
              <div className="bg-slate-900 border border-white/10 rounded-[2.5rem] p-8 max-w-3xl">
                <h2 className="text-xl font-black mb-1">Request Policy Endorsement</h2>
                <p className="text-xs text-slate-400 mb-6 font-semibold">Need to correct typo errors, change address or transfer policy owner?</p>

                {policies.length === 0 ? (
                  <p className="text-slate-500 text-sm font-semibold">You need an active policy to request updates.</p>
                ) : (
                  <form onSubmit={handleEndorsementSubmit} className="space-y-5">
                    <div className="grid md:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Select Policy *</label>
                        <select
                          value={endorsementForm.policyId}
                          onChange={(e) => setEndorsementForm({...endorsementForm, policyId: e.target.value})}
                          className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all font-medium"
                        >
                          {policies.map(p => (
                            <option key={p.id} value={p.id} className="bg-slate-950">{p.productType} ({p.policyNo})</option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Type of Modification *</label>
                        <select
                          value={endorsementForm.changeType}
                          onChange={(e) => setEndorsementForm({...endorsementForm, changeType: e.target.value})}
                          className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all font-medium"
                        >
                          <option value="Name Correction" className="bg-slate-950">Name Correction</option>
                          <option value="Address Correction" className="bg-slate-950">Address Correction</option>
                          <option value="Vehicle/Reg details Update" className="bg-slate-950">Vehicle/Reg Details Update</option>
                          <option value="Nominee Correction" className="bg-slate-950">Nominee Correction</option>
                          <option value="Policy Transfer" className="bg-slate-950">Policy Owner Transfer</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">New Corrected Value *</label>
                      <input
                        type="text"
                        required
                        placeholder="Enter correct details exactly as in ID proof"
                        value={endorsementForm.newValue}
                        onChange={(e) => setEndorsementForm({...endorsementForm, newValue: e.target.value})}
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all font-medium"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Upload Support ID Proof (Aadhaar, RC, etc.) *</label>
                      <input
                        type="file"
                        required
                        onChange={(e) => setEndorsementForm({...endorsementForm, documentName: e.target.files[0]?.name || ''})}
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all font-medium"
                      />
                    </div>

                    <button
                      type="submit"
                      className="px-8 py-3.5 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl shadow-lg shadow-blue-500/20 transition-all"
                    >
                      Submit Modification Request
                    </button>
                  </form>
                )}
              </div>
            )}

          </div>
        </div>

      </div>
    </div>
  );
};

export default CustomerDashboard;
