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

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-slate-50">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/product/car" element={<MotorInsurance />} />
            <Route path="/product/bike" element={<MotorInsurance />} />
            <Route path="/product/:type" element={<ProductDetail />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/renew" element={<RenewPolicy />} />
            <Route path="/claims" element={<ClaimSupport />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
