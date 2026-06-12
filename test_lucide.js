import * as Lucide from 'lucide-react';
const required = ['Shield', 'CheckCircle2', 'AlertTriangle', 'ArrowRight', 'ChevronRight', 'HeartPulse', 'Home', 'Flame', 'Plane', 'Clock', 'Percent', 'Stethoscope', 'Banknote', 'HelpCircle'];
let missing = [];
required.forEach(req => {
  if (!Lucide[req]) missing.push(req);
});
if (missing.length > 0) {
  console.log('MISSING ICONS IN PRODUCT DETAIL:', missing);
} else {
  console.log('ALL PRODUCT DETAIL ICONS FOUND');
}

const requiredClaim = ['PhoneCall', 'MessageCircle', 'ShieldCheck', 'FileText', 'Clock', 'AlertTriangle', 'CheckCircle2', 'XCircle', 'ChevronDown', 'ChevronUp', 'AlertCircle', 'Camera', 'FileSignature', 'Landmark', 'Zap', 'CreditCard', 'Activity', 'FileSearch', 'PenTool', 'CheckSquare', 'Search', 'FileKey', 'Scale', 'Settings', 'MapPin'];
missing = [];
requiredClaim.forEach(req => {
  if (!Lucide[req]) missing.push(req);
});
if (missing.length > 0) {
  console.log('MISSING ICONS IN CLAIM SUPPORT:', missing);
} else {
  console.log('ALL CLAIM SUPPORT ICONS FOUND');
}
