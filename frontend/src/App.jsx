// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';

import LandingPage from './components/LandingPage/LandingPage';
import AuthPage from './components/AuthPage/AuthPage';
import ErrorPage from './components/ErrorPage/ErrorPage';
import HomePage from './components/HomePage/HomePage';
import PricingPage from './components/PricingPage/PricingPage';
import DevelopersPage from './components/DevelopersPage/DevelopersPage';
import ContactPage from './components/ContactPage/ContactPage';
import DocumentationPage from './components/DocumentationPage/DocumentationPage';
import HomeHeader from './components/HomePage/HomeHeader';
import VerifyPage from './components/AuthPage/VerifyPage';

const AppWrapper = () => {
  const location = useLocation();
  const pathname = location.pathname || '';

  // Hide header on root, any /auth route (covers /auth and /auth?view=...),
  // and any /verify route (covers /verify/:token)
  const shouldHideHeader =
    pathname === '/' || pathname.startsWith('/auth') || pathname.startsWith('/verify');

  return (
    <>
      {!shouldHideHeader && <HomeHeader />}

      <Routes>
        <Route path="/" element={<LandingPage />} />

        {/* Keep /auth if you still want that single URL */}
        <Route path="/auth" element={<AuthPage />} />

        {/* Explicit login/register routes (Option B) */}
        <Route path="/login" element={<AuthPage initialView="login" />} />
        <Route path="/register" element={<AuthPage initialView="register" />} />

        <Route path="/home" element={<HomePage />} />
        <Route path="/pricing" element={<PricingPage />} />
        <Route path="/developers" element={<DevelopersPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/documentation" element={<DocumentationPage />} />
        <Route path="/verify/:token" element={<VerifyPage />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </>
  );
};

const App = () => {
  return (
    <Router>
      <AppWrapper />
    </Router>
  );
};

export default App;
