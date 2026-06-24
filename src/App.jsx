import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import ProductDetail from './pages/ProductDetail';
import MotorInsurance from './pages/MotorInsurance';
import AdminDashboard from './pages/AdminDashboard';
import RenewPolicy from './pages/RenewPolicy';
import ClaimSupport from './pages/ClaimSupport';
import CustomerDashboard from './pages/CustomerDashboard';
import CashlessNetwork from './pages/CashlessNetwork';
import ChatWidget from './components/ChatWidget';
import AnnouncementBar from './components/AnnouncementBar';
import InfoPage from './pages/InfoPage';
import QuotesPage from './pages/QuotesPage';

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-white">
        <AnnouncementBar />
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about-us" element={<InfoPage type="about" />} />
            <Route path="/contact-us" element={<InfoPage type="contact" />} />
            <Route path="/privacy-policy" element={<InfoPage type="privacy" />} />
            <Route path="/terms-and-conditions" element={<InfoPage type="terms" />} />
            <Route path="/disclaimer" element={<InfoPage type="disclaimer" />} />
            <Route path="/refund-cancellation-policy" element={<InfoPage type="refund" />} />
            <Route path="/support" element={<InfoPage type="support" />} />
            <Route path="/grievance-redressal" element={<InfoPage type="grievance" />} />
            <Route path="/cookie-policy" element={<InfoPage type="cookie" />} />
            <Route path="/motor-insurance" element={<MotorInsurance />} />
            
            <Route path="/health-insurance" element={<ProductDetail type="health" />} />
            <Route path="/life-insurance" element={<ProductDetail type="life" />} />
            <Route path="/travel-insurance" element={<ProductDetail type="travel" />} />
            <Route path="/home-insurance" element={<ProductDetail type="home" />} />
            <Route path="/marine-insurance" element={<ProductDetail type="marine" />} />
            <Route path="/fire-insurance" element={<ProductDetail type="fire" />} />
            <Route path="/business-insurance" element={<ProductDetail type="business" />} />
            
            <Route path="/product/car" element={<MotorInsurance />} />
            <Route path="/product/bike" element={<MotorInsurance />} />
            <Route path="/product/:type" element={<ProductDetail />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/renew" element={<RenewPolicy />} />
            <Route path="/policy-renewal" element={<RenewPolicy />} />
            <Route path="/claims" element={<ClaimSupport />} />
            <Route path="/claim-assistance" element={<ClaimSupport />} />
            <Route path="/get-quote" element={<QuotesPage />} />
            <Route path="/login" element={<CustomerDashboard />} />
            <Route path="/dashboard" element={<CustomerDashboard />} />
            <Route path="/cashless" element={<CashlessNetwork />} />
            <Route path="/info/:type" element={<InfoPage />} />
          </Routes>
        </main>
        <Footer />
        <ChatWidget />
      </div>
    </Router>
  );
}

export default App;
