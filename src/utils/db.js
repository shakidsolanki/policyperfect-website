import { firestore } from './firebase';
import { doc, setDoc, onSnapshot } from 'firebase/firestore';

// Database Simulation Utility for PolicyPerfect

export const initDb = () => {
  // Run migration to replace 'broker' with 'advisor' in localStorage
  try {
    const keysToMigrate = [
      'about_text', 'seo_settings', 'site_contact', 'system_settings', 'banner_settings', 
      'announcement_bar', 'homepage_offers', 'quick_links', 'insurance_products', 'faqs', 'testimonials'
    ];
    keysToMigrate.forEach(key => {
      const val = localStorage.getItem(key);
      if (val && val.toLowerCase().includes('broker')) {
        const replaced = val
          .replace(/brokers/g, 'Advisors')
          .replace(/Brokers/g, 'Advisors')
          .replace(/broker/g, 'advisor')
          .replace(/Broker/g, 'Advisor')
          .replace(/BROKER/g, 'ADVISOR');
        localStorage.setItem(key, replaced);
      }
    });
  } catch (e) {
    console.error('LocalStorage migration error:', e);
  }

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
      phone: '+91 7574948768',
      whatsapp: '7574948768',
      email: 'policyperfect.1@gmail.com',
      address: 'D-217, Joyos Hubtown, Modhera Circle, Nr GSRTC Bus Port, Mahesana, Gujarat. IN. 384001',
      legalName: 'Policy Perfect Insurance',
      businessHours: 'Monday - Saturday: 09:00 AM - 07:00 PM | Sunday: By Appointment'
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
      text: 'PolicyPerfect Insurance is an Insurance Advisory and Assistance Platform established on 01 August 2024 in Mahesana, Gujarat. We provide expert advice, assistance and support services to help you find and buy the best insurance coverage from India\'s top insurers.\n\nAll insurance quotations on our platform are provided completely free of cost. For quotation and policy renewal assistance, previous policy details, RC copies, vehicle details, and other required documents may be collected. Break-in insurance cases may require a physical vehicle inspection and photos of the vehicle.\n\nPlease note: PolicyPerfect Insurance is an Insurance Advisory and Assistance Platform. Insurance policies are issued by respective insurers. Premiums, underwriting decisions, policy issuance, and claim settlements are subject to insurer terms and conditions.'
    }));
  }

  // 13. System Users (RBAC)
  if (!localStorage.getItem('system_users')) {
    localStorage.setItem('system_users', JSON.stringify([
      { id: 'u1', name: 'Sakid Solanki', email: 'admin@policyperfect', password: 'Shakid@perfect', role: 'Super Admin', active: true },
      { id: 'u2', name: 'Content Manager', email: 'content@policyperfect', password: 'password123', role: 'Content Manager', active: true }
    ]));
  }

  // 14. Contact Inquiries
  if (!localStorage.getItem('contact_inquiries')) {
    localStorage.setItem('contact_inquiries', JSON.stringify([
      { id: 'inq1', date: '2026-06-18', name: 'Ramesh Patel', mobile: '9876543210', email: 'ramesh@test.com', subject: 'Corporate Health Plan', message: 'Need health insurance for 50 employees.', status: 'Pending' }
    ]));
  }

  // 15. Cashless Garages
  if (!localStorage.getItem('cashless_garages')) {
    localStorage.setItem('cashless_garages', JSON.stringify([
      { id: 'g1', name: 'Maruti Suzuki Service Center', city: 'Ahmedabad', state: 'Gujarat', address: 'S.G. Highway', phone: '079-23456789', companies: ['HDFC ERGO', 'ICICI Lombard'], status: 'Active' },
      { id: 'g2', name: 'Hyundai Motor Plaza', city: 'Surat', state: 'Gujarat', address: 'Ring Road', phone: '0261-23456789', companies: ['Tata AIG', 'HDFC ERGO'], status: 'Active' }
    ]));
  }

  // 16. Renewal Requests
  if (!localStorage.getItem('renewal_requests')) {
    localStorage.setItem('renewal_requests', JSON.stringify([
      { id: 'ren1', policyNo: 'PP-MOT-789320', date: '2026-06-15', name: 'Sakid Solanki', mobile: '7574948768', email: 'sakid@test.com', vehicleNo: 'GJ-01-XX-9999', expiryDate: '2026-06-11', prevInsurer: 'HDFC ERGO', ncb: '20%', status: 'In Progress' }
    ]));
  }

  // 17. Insurance Products
  if (!localStorage.getItem('insurance_products')) {
    localStorage.setItem('insurance_products', JSON.stringify([
      { id: 'prod_1', name: 'Motor Insurance', type: 'Motor', description: 'Comprehensive car and bike insurance with zero dep.', active: true },
      { id: 'prod_2', name: 'Health Insurance', type: 'Health', description: 'Family floater plans with cashless hospitalization.', active: true }
    ]));
  }

  // 18. Blogs
  if (!localStorage.getItem('blogs')) {
    localStorage.setItem('blogs', JSON.stringify([
      { id: 'b1', title: 'Why Zero Depreciation is a Must for New Cars', author: 'Sakid', date: '2026-06-10', status: 'Published' }
    ]));
  }

  // 19. FAQs
  if (!localStorage.getItem('faqs')) {
    localStorage.setItem('faqs', JSON.stringify([
      { id: 'f1', question: 'How do I claim my car insurance?', answer: 'You can intimate a claim from our portal or call support.', active: true }
    ]));
  }

  // 20. Testimonials
  if (!localStorage.getItem('testimonials')) {
    localStorage.setItem('testimonials', JSON.stringify([
      { id: 't1', name: 'Amit Shah', text: 'Great service and quick claim settlement!', rating: 5, active: true }
    ]));
  }

  // 21. System Settings
  if (!localStorage.getItem('system_settings')) {
    localStorage.setItem('system_settings', JSON.stringify({
      siteName: 'PolicyPerfect',
      supportEmail: 'policyperfect.1@gmail.com',
      supportPhone: '+91 7574948768',
      address: 'D-217, Joyos Hubtown, Modhera Circle, Nr GSRTC Bus Port, Mahesana, Gujarat. IN. 384001',
      legalName: 'Policy Perfect Insurance',
      businessHours: 'Monday - Saturday: 09:00 AM - 07:00 PM | Sunday: By Appointment',
      facebookUrl: '',
      twitterUrl: '',
      linkedinUrl: '',
      googleAnalyticsId: 'G-XXXXXXX'
    }));
  }

  // 22. SEO Settings
  if (!localStorage.getItem('seo_settings')) {
    localStorage.setItem('seo_settings', JSON.stringify({
      metaTitle: 'PolicyPerfect - Compare & Buy Best Insurance',
      metaDescription: 'India\'s premier online insurance comparison portal.',
      keywords: 'insurance, motor insurance, health insurance, policyperfect',
      ogImage: '/logo.png',
      canonicalUrl: 'https://policyperfect.co.in',
      schemaDescription: 'PolicyPerfect Insurance is an Insurance Advisory & Assistance Platform in Mahesana, Gujarat.'
    }));
  }
};

// Database Getters & Setters

const saveToFirebase = async (key, data) => {
  if (firestore) {
    try {
      await setDoc(doc(firestore, 'crm', key), { data });
    } catch (e) {
      console.error('Firebase save error for', key, e);
    }
  }
};

export const syncFromFirebase = () => {
  if (!firestore) return;
  const keys = ['banner_settings', 'active_policies', 'policy_leads', 'claim_intimations', 'endorsement_requests', 'support_chats', 'announcement_bar', 'homepage_offers', 'quick_links', 'site_contact', 'site_logo', 'about_text', 'system_users', 'contact_inquiries', 'cashless_garages', 'renewal_requests', 'insurance_products', 'blogs', 'faqs', 'testimonials', 'system_settings', 'seo_settings'];
  
  let loadedCount = 0;
  keys.forEach(key => {
    onSnapshot(doc(firestore, 'crm', key), (docSnap) => {
      if (docSnap.exists()) {
        localStorage.setItem(key, JSON.stringify(docSnap.data().data));
        window.dispatchEvent(new Event('db_updated'));
      }
    });
  });
};

export const db = {
  getBanner: () => JSON.parse(localStorage.getItem('banner_settings') || '{}'),
  setBanner: (settings) => { localStorage.setItem('banner_settings', JSON.stringify(settings)); saveToFirebase('banner_settings', settings); },

  getPolicies: () => JSON.parse(localStorage.getItem('active_policies') || '[]'),
  setPolicies: (policies) => { localStorage.setItem('active_policies', JSON.stringify(policies)); saveToFirebase('active_policies', policies); },

  getLeads: () => JSON.parse(localStorage.getItem('policy_leads') || '[]'),
  setLeads: (leads) => { localStorage.setItem('policy_leads', JSON.stringify(leads)); saveToFirebase('policy_leads', leads); },

  getClaims: () => JSON.parse(localStorage.getItem('claim_intimations') || '[]'),
  setClaims: (claims) => { localStorage.setItem('claim_intimations', JSON.stringify(claims)); saveToFirebase('claim_intimations', claims); },

  getEndorsements: () => JSON.parse(localStorage.getItem('endorsement_requests') || '[]'),
  setEndorsements: (reqs) => { localStorage.setItem('endorsement_requests', JSON.stringify(reqs)); saveToFirebase('endorsement_requests', reqs); },

  getChats: () => JSON.parse(localStorage.getItem('support_chats') || '[]'),
  setChats: (chats) => { localStorage.setItem('support_chats', JSON.stringify(chats)); saveToFirebase('support_chats', chats); },

  getAnnouncement: () => JSON.parse(localStorage.getItem('announcement_bar') || '{}'),
  setAnnouncement: (data) => { localStorage.setItem('announcement_bar', JSON.stringify(data)); saveToFirebase('announcement_bar', data); },

  getOffers: () => JSON.parse(localStorage.getItem('homepage_offers') || '[]'),
  setOffers: (offers) => { localStorage.setItem('homepage_offers', JSON.stringify(offers)); saveToFirebase('homepage_offers', offers); },

  getQuickLinks: () => JSON.parse(localStorage.getItem('quick_links') || '[]'),
  setQuickLinks: (links) => { localStorage.setItem('quick_links', JSON.stringify(links)); saveToFirebase('quick_links', links); },

  getContact: () => JSON.parse(localStorage.getItem('site_contact') || '{}'),
  setContact: (contact) => { localStorage.setItem('site_contact', JSON.stringify(contact)); saveToFirebase('site_contact', contact); },

  getLogo: () => JSON.parse(localStorage.getItem('site_logo') || '{"url":"/logo.png", "width":"180"}'),
  setLogo: (logo) => { localStorage.setItem('site_logo', JSON.stringify(logo)); saveToFirebase('site_logo', logo); },

  getAbout: () => JSON.parse(localStorage.getItem('about_text') || '{"text": ""}'),
  setAbout: (about) => { localStorage.setItem('about_text', JSON.stringify(about)); saveToFirebase('about_text', about); },

  getUsers: () => JSON.parse(localStorage.getItem('system_users') || '[]'),
  setUsers: (users) => { localStorage.setItem('system_users', JSON.stringify(users)); saveToFirebase('system_users', users); },

  getInquiries: () => JSON.parse(localStorage.getItem('contact_inquiries') || '[]'),
  setInquiries: (inq) => { localStorage.setItem('contact_inquiries', JSON.stringify(inq)); saveToFirebase('contact_inquiries', inq); },

  getGarages: () => JSON.parse(localStorage.getItem('cashless_garages') || '[]'),
  setGarages: (g) => { localStorage.setItem('cashless_garages', JSON.stringify(g)); saveToFirebase('cashless_garages', g); },

  getRenewals: () => JSON.parse(localStorage.getItem('renewal_requests') || '[]'),
  setRenewals: (r) => { localStorage.setItem('renewal_requests', JSON.stringify(r)); saveToFirebase('renewal_requests', r); },

  getProducts: () => JSON.parse(localStorage.getItem('insurance_products') || '[]'),
  setProducts: (p) => { localStorage.setItem('insurance_products', JSON.stringify(p)); saveToFirebase('insurance_products', p); },

  getBlogs: () => JSON.parse(localStorage.getItem('blogs') || '[]'),
  setBlogs: (b) => { localStorage.setItem('blogs', JSON.stringify(b)); saveToFirebase('blogs', b); },

  getFaqs: () => JSON.parse(localStorage.getItem('faqs') || '[]'),
  setFaqs: (f) => { localStorage.setItem('faqs', JSON.stringify(f)); saveToFirebase('faqs', f); },

  getTestimonials: () => JSON.parse(localStorage.getItem('testimonials') || '[]'),
  setTestimonials: (t) => { localStorage.setItem('testimonials', JSON.stringify(t)); saveToFirebase('testimonials', t); },

  getSettings: () => JSON.parse(localStorage.getItem('system_settings') || '{}'),
  setSettings: (s) => { localStorage.setItem('system_settings', JSON.stringify(s)); saveToFirebase('system_settings', s); },

  getSeo: () => JSON.parse(localStorage.getItem('seo_settings') || '{}'),
  setSeo: (s) => { localStorage.setItem('seo_settings', JSON.stringify(s)); saveToFirebase('seo_settings', s); },

  addLead: (lead) => {
    const leads = JSON.parse(localStorage.getItem('policy_leads') || '[]');
    leads.unshift(lead);
    localStorage.setItem('policy_leads', JSON.stringify(leads));
    saveToFirebase('policy_leads', leads);
  },
  addRenewal: (ren) => {
    const renewals = JSON.parse(localStorage.getItem('renewal_requests') || '[]');
    renewals.unshift(ren);
    localStorage.setItem('renewal_requests', JSON.stringify(renewals));
    saveToFirebase('renewal_requests', renewals);
  },
  addInquiry: (inq) => {
    const inquiries = JSON.parse(localStorage.getItem('contact_inquiries') || '[]');
    inquiries.unshift(inq);
    localStorage.setItem('contact_inquiries', JSON.stringify(inquiries));
    saveToFirebase('contact_inquiries', inquiries);
  }
};
