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

  // 7. Announcement Bar
  if (!localStorage.getItem('announcement_bar')) {
    localStorage.setItem('announcement_bar', JSON.stringify({
      enabled: false,
      text: '🎉 Monsoon Special: Get flat 20% off on Health Insurance! Limited time offer.',
      type: 'info',
      link: '',
      linkText: 'Know More'
    }));
  }

  // 8. Homepage Offers
  if (!localStorage.getItem('homepage_offers')) {
    const defaultOffers = [
      {
        id: 'off1',
        title: 'Monsoon Health Shield',
        description: 'Cover your entire family for just ₹999/month. Cashless treatment at 10,000+ hospitals.',
        badge: 'Most Popular',
        badgeColor: 'teal',
        icon: 'heart',
        link: '/product/health',
        btnText: 'Get Quote',
        active: true
      },
      {
        id: 'off2',
        title: 'Motor Renewal Offer',
        description: 'Renew your car or bike insurance before it expires and save up to 40% on premiums.',
        badge: 'Save 40%',
        badgeColor: 'amber',
        icon: 'car',
        link: '/renew',
        btnText: 'Renew Now',
        active: true
      },
      {
        id: 'off3',
        title: 'Term Life @ ₹20/Day',
        description: "Secure your family's future with ₹1 Crore life cover for less than the cost of a cup of tea.",
        badge: 'Best Value',
        badgeColor: 'blue',
        icon: 'trending-up',
        link: '/product/life',
        btnText: 'Start Now',
        active: true
      }
    ];
    localStorage.setItem('homepage_offers', JSON.stringify(defaultOffers));
  }

  // 9. Quick Links
  if (!localStorage.getItem('quick_links')) {
    const defaultQuickLinks = [
      { id: 'ql1', label: 'Renew Policy', link: '/renew', icon: 'refresh' },
      { id: 'ql2', label: 'Claim Support', link: '/claims', icon: 'shield' },
      { id: 'ql3', label: 'Track Claim', link: '/claims', icon: 'search' },
      { id: 'ql4', label: 'Customer Portal', link: '/login', icon: 'user' },
      { id: 'ql5', label: 'Call Us Now', link: 'tel:+917574948768', icon: 'phone' }
    ];
    localStorage.setItem('quick_links', JSON.stringify(defaultQuickLinks));
  }

  // 10. Site Contact
  if (!localStorage.getItem('site_contact')) {
    localStorage.setItem('site_contact', JSON.stringify({
      phone: '+91 75749 48768',
      whatsapp: '7574948768',
      email: 'support@policyperfect.co.in',
      address: 'Gujarat, India'
    }));
  }

  // 11. Site Logo
  if (!localStorage.getItem('site_logo')) {
    localStorage.setItem('site_logo', JSON.stringify({
      url: '/logo.png',
      width: '180'
    }));
  }

  // 12. About Us Text
  if (!localStorage.getItem('about_text')) {
    localStorage.setItem('about_text', JSON.stringify({
      text: 'PolicyPerfect is India\'s premier online insurance comparison and advisory portal. Established with a vision to simplify insurance, we empower you to compare, choose, and buy the best insurance plans from 25+ top insurers in India. Our mission is to provide 100% transparent rates, zero hidden fees, and dedicated claim support when you need it most.'
    }));
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
  setChats: (chats) => localStorage.setItem('support_chats', JSON.stringify(chats)),

  getAnnouncement: () => JSON.parse(localStorage.getItem('announcement_bar') || '{}'),
  setAnnouncement: (data) => localStorage.setItem('announcement_bar', JSON.stringify(data)),

  getOffers: () => JSON.parse(localStorage.getItem('homepage_offers') || '[]'),
  setOffers: (offers) => localStorage.setItem('homepage_offers', JSON.stringify(offers)),

  getQuickLinks: () => JSON.parse(localStorage.getItem('quick_links') || '[]'),
  setQuickLinks: (links) => localStorage.setItem('quick_links', JSON.stringify(links)),

  getContact: () => JSON.parse(localStorage.getItem('site_contact') || '{}'),
  setContact: (contact) => localStorage.setItem('site_contact', JSON.stringify(contact)),

  getLogo: () => JSON.parse(localStorage.getItem('site_logo') || '{"url":"/logo.png", "width":"180"}'),
  setLogo: (logo) => localStorage.setItem('site_logo', JSON.stringify(logo)),

  getAbout: () => JSON.parse(localStorage.getItem('about_text') || '{"text": ""}'),
  setAbout: (about) => localStorage.setItem('about_text', JSON.stringify(about))
};
