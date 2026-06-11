// Database Simulation Utility for PolicyPerfect

export const initDb = () => {
  // 1. Initial Banner Settings
  if (!localStorage.getItem('banner_settings')) {
    localStorage.setItem('banner_settings', JSON.stringify({
      imageUrl: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=1200',
      redirectUrl: '/claims'
    }));
  }

  // 2. Initial Active Policies (mapped to test mobile number: 7574948768)
  if (!localStorage.getItem('active_policies')) {
    const defaultPolicies = [
      {
        id: 'pol_1',
        policyNo: 'PP-MOT-789320',
        mobile: '7574948768',
        name: 'Sakid Solanki',
        insurer: 'HDFC ERGO',
        productType: 'Motor Insurance',
        vehicleDetails: 'Maruti Swift (Petrol, 2024)',
        regNo: 'GJ-01-XX-9999',
        premium: '₹8,450',
        startDate: '2025-06-12',
        endDate: '2026-06-11',
        status: 'Active'
      },
      {
        id: 'pol_2',
        policyNo: 'PP-HEA-104928',
        mobile: '7574948768',
        name: 'Sakid Solanki',
        insurer: 'Star Health',
        productType: 'Health Insurance',
        vehicleDetails: 'Family Floater (Self + Spouse)',
        premium: '₹14,200',
        startDate: '2025-01-15',
        endDate: '2026-01-14',
        status: 'Active'
      }
    ];
    localStorage.setItem('active_policies', JSON.stringify(defaultPolicies));
  }

  // 3. Initial Leads
  if (!localStorage.getItem('policy_leads')) {
    const defaultLeads = [
      {
        id: 1718012938000,
        productType: 'Motor Insurance',
        name: 'Rajesh Kumar',
        mobile: '9876543210',
        date: '2026-06-11, 10:20:00 AM',
        insuranceType: 'car',
        make: 'Hyundai',
        model: 'Creta',
        variant: 'SX',
        fuelType: 'Petrol',
        regNo: 'DL-01-AB-1234',
        mfgYear: '2023'
      }
    ];
    localStorage.setItem('policy_leads', JSON.stringify(defaultLeads));
  }

  // 4. Initial Endorsement Requests
  if (!localStorage.getItem('endorsement_requests')) {
    localStorage.setItem('endorsement_requests', JSON.stringify([]));
  }

  // 5. Initial Claim Intimations
  if (!localStorage.getItem('claim_intimations')) {
    localStorage.setItem('claim_intimations', JSON.stringify([]));
  }

  // 6. Initial Support Chats
  if (!localStorage.getItem('support_chats')) {
    localStorage.setItem('support_chats', JSON.stringify([]));
  }
};

// Database Getters & Setters
export const db = {
  getBanner: () => JSON.parse(localStorage.getItem('banner_settings') || '{}'),
  setBanner: (settings) => localStorage.setItem('banner_settings', JSON.stringify(settings)),
  
  getPolicies: () => JSON.parse(localStorage.getItem('active_policies') || '[]'),
  setPolicies: (policies) => localStorage.setItem('active_policies', JSON.stringify(policies)),
  
  getLeads: () => JSON.parse(localStorage.getItem('policy_leads') || '[]'),
  setLeads: (leads) => localStorage.setItem('policy_leads', JSON.stringify(leads)),
  
  getClaims: () => JSON.parse(localStorage.getItem('claim_intimations') || '[]'),
  setClaims: (claims) => localStorage.setItem('claim_intimations', JSON.stringify(claims)),
  
  getEndorsements: () => JSON.parse(localStorage.getItem('endorsement_requests') || '[]'),
  setEndorsements: (reqs) => localStorage.setItem('endorsement_requests', JSON.stringify(reqs)),
  
  getChats: () => JSON.parse(localStorage.getItem('support_chats') || '[]'),
  setChats: (chats) => localStorage.setItem('support_chats', JSON.stringify(chats))
};
