import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import PropertyListings from './pages/PropertyListings';
import PropertyDetails from './pages/PropertyDetails';
import PostProperty from './pages/PostProperty';
import PropertyUpload from './pages/PropertyUpload';
import PropertyGuide from './pages/PropertyGuide';
import AreaGuide from './pages/AreaGuide';
import LegalServices from './pages/LegalServices';
import HomeLoans from './pages/HomeLoans';
import PropertyValuation from './pages/PropertyValuation';
import ServicesPage from './pages/ServicesPage';
import HelpCenter from './pages/HelpCenter';
import SafetyTips from './pages/SafetyTips';
import TermsOfService from './pages/TermsOfService';
import PrivacyPolicy from './pages/PrivacyPolicy';
import Sitemap from './pages/Sitemap';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import ForgotPassword from './pages/ForgotPassword';
import Footer from './components/Footer';
import Aboutus from './pages/Aboutus';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <Routes>
            {/* Auth routes without header/footer */}
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />

            {/* Main app routes with header/footer */}
            <Route
              path="/*"
              element={
                <>
                  <Header />
                  <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/properties" element={<PropertyListings />} />
                    <Route path="/property/:id" element={<PropertyDetails />} />
                    <Route path="/post-property" element={<PostProperty />} />
                    <Route
                      path="/upload-property"
                      element={<PropertyUpload />}
                    />
                    <Route path="/property-guide" element={<PropertyGuide />} />
                    <Route path="/area-guide" element={<AreaGuide />} />
                    <Route path="/legal-services" element={<LegalServices />} />
                    <Route path="/home-loans" element={<HomeLoans />} />
                    <Route
                      path="/property-valuation"
                      element={<PropertyValuation />}
                    />
                    <Route path="/services" element={<ServicesPage />} />
                    {/* Support and Legal Pages */}
                    <Route path="/help" element={<HelpCenter />} />
                    <Route path="/safety" element={<SafetyTips />} />
                    <Route path="/terms" element={<TermsOfService />} />
                    <Route path="/privacy" element={<PrivacyPolicy />} />
                    <Route path="/sitemap" element={<Sitemap />} />
                    {/* Additional service routes */}
                    <Route path="/resources/*" element={<PropertyGuide />} />
                    <Route path="/location/*" element={<AreaGuide />} />
                    <Route path="/legal/*" element={<LegalServices />} />
                    <Route path="/mortgage/*" element={<HomeLoans />} />
                    <Route
                      path="/valuation/*"
                      element={<PropertyValuation />}
                    />
                  </Routes>
                  <Footer />
                </>
              }
            />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
