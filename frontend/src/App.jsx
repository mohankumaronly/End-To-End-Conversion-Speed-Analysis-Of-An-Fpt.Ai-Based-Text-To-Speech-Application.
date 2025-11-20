import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import LandingPage from './components/LandingPage/LandingPage';
import AuthPage from './components/AuthPage/AuthPage';
import ErrorPage from './components/ErrorPage/ErrorPage';
import HomePage from './components/HomePage/HomePage';
import PricingPage from './components/PricingPage/PricingPage';
import DevelopersPage from './components/DevelopersPage/DevelopersPage';
import ContactPage from './components/ContactPage/ContactPage';
import DocumentationPage from './components/DocumentationPage/DocumentationPage';
import HomeHeader from './components/HomePage/HomeHeader';

const App = () => {
  return (
    <Router>
      {/* Show header on all pages except landing & login */}
      {window.location.pathname !== "/" &&
        window.location.pathname !== "/auth" && <HomeHeader />}

      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/pricing" element={<PricingPage />} />
        <Route path="/developers" element={<DevelopersPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/documentation" element={<DocumentationPage />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </Router>
  );
};

export default App;
