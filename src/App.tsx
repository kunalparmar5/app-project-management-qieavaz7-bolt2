import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useRoutes,
} from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import Header from "./components/Header";
import HomePage from "./pages/HomePage";
import PropertyListings from "./pages/PropertyListings";
import PropertyDetails from "./pages/PropertyDetails";
import PostProperty from "./pages/PostProperty";
import PropertyUpload from "./pages/PropertyUpload";
import PropertyGuide from "./pages/PropertyGuide";
import AreaGuide from "./pages/AreaGuide";
import LegalServices from "./pages/LegalServices";
import HomeLoans from "./pages/HomeLoans";
import PropertyValuation from "./pages/PropertyValuation";
import ServicesPage from "./pages/ServicesPage";
import HelpCenter from "./pages/HelpCenter";
import SafetyTips from "./pages/SafetyTips";
import TermsOfService from "./pages/TermsOfService";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import Sitemap from "./pages/Sitemap";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import ForgotPassword from "./pages/ForgotPassword";
import Footer from "./components/Footer";
import AboutUs from "./pages/AboutUs";
import Blog from "./pages/Blog";
import Careers from "./pages/Careers";
import Press from "./pages/Press";
import Contact from "./pages/Contact";
import routes from "tempo-routes";

// Component to handle Tempo routes within Router context
function TempoRoutes() {
  const tempoRoutes = useRoutes(routes);
  if (!import.meta.env.VITE_TEMPO) {
    return null;
  }
  return tempoRoutes;
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <TempoRoutes />
          <Routes>
            {/* Auth routes without header/footer */}
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />

            {/* Main app routes with header/footer */}
            <Route
              path="/"
              element={
                <>
                  <Header />
                  <HomePage />
                  <Footer />
                </>
              }
            />
            <Route
              path="/properties"
              element={
                <>
                  <Header />
                  <PropertyListings />
                  <Footer />
                </>
              }
            />
            <Route
              path="/property/:id"
              element={
                <>
                  <Header />
                  <PropertyDetails />
                  <Footer />
                </>
              }
            />
            <Route
              path="/post-property"
              element={
                <>
                  <Header />
                  <PostProperty />
                  <Footer />
                </>
              }
            />
            <Route
              path="/upload-property"
              element={
                <>
                  <Header />
                  <PropertyUpload />
                  <Footer />
                </>
              }
            />
            <Route
              path="/property-guide"
              element={
                <>
                  <Header />
                  <PropertyGuide />
                  <Footer />
                </>
              }
            />
            <Route
              path="/area-guide"
              element={
                <>
                  <Header />
                  <AreaGuide />
                  <Footer />
                </>
              }
            />
            <Route
              path="/legal-services"
              element={
                <>
                  <Header />
                  <LegalServices />
                  <Footer />
                </>
              }
            />
            <Route
              path="/home-loans"
              element={
                <>
                  <Header />
                  <HomeLoans />
                  <Footer />
                </>
              }
            />
            <Route
              path="/property-valuation"
              element={
                <>
                  <Header />
                  <PropertyValuation />
                  <Footer />
                </>
              }
            />
            <Route
              path="/services"
              element={
                <>
                  <Header />
                  <ServicesPage />
                  <Footer />
                </>
              }
            />
            {/* Support and Legal Pages */}
            <Route
              path="/help"
              element={
                <>
                  <Header />
                  <HelpCenter />
                  <Footer />
                </>
              }
            />
            <Route
              path="/safety"
              element={
                <>
                  <Header />
                  <SafetyTips />
                  <Footer />
                </>
              }
            />
            <Route
              path="/terms"
              element={
                <>
                  <Header />
                  <TermsOfService />
                  <Footer />
                </>
              }
            />
            <Route
              path="/privacy"
              element={
                <>
                  <Header />
                  <PrivacyPolicy />
                  <Footer />
                </>
              }
            />
            <Route
              path="/sitemap"
              element={
                <>
                  <Header />
                  <Sitemap />
                  <Footer />
                </>
              }
            />
            <Route
              path="/about"
              element={
                <>
                  <Header />
                  <AboutUs />
                  <Footer />
                </>
              }
            />
            <Route
              path="/blog"
              element={
                <>
                  <Header />
                  <Blog />
                  <Footer />
                </>
              }
            />
            <Route
              path="/careers"
              element={
                <>
                  <Header />
                  <Careers />
                  <Footer />
                </>
              }
            />
            <Route
              path="/press"
              element={
                <>
                  <Header />
                  <Press />
                  <Footer />
                </>
              }
            />
            <Route
              path="/contact"
              element={
                <>
                  <Header />
                  <Contact />
                  <Footer />
                </>
              }
            />
            {/* Additional service routes */}
            <Route
              path="/resources/*"
              element={
                <>
                  <Header />
                  <PropertyGuide />
                  <Footer />
                </>
              }
            />
            <Route
              path="/location/*"
              element={
                <>
                  <Header />
                  <AreaGuide />
                  <Footer />
                </>
              }
            />
            <Route
              path="/legal/*"
              element={
                <>
                  <Header />
                  <LegalServices />
                  <Footer />
                </>
              }
            />
            <Route
              path="/mortgage/*"
              element={
                <>
                  <Header />
                  <HomeLoans />
                  <Footer />
                </>
              }
            />
            <Route
              path="/valuation/*"
              element={
                <>
                  <Header />
                  <PropertyValuation />
                  <Footer />
                </>
              }
            />

            {/* Tempo route for storyboards */}
            {import.meta.env.VITE_TEMPO && <Route path="/tempobook/*" />}
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
