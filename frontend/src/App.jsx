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
import ForgotPassword from './components/AuthPage/ForgotPassword';
import VerifyOtp from './components/AuthPage/VerifyOtp';
import ChangePassword from './components/AuthPage/ChangePassword';


const AppWrapper = () => {
  const location = useLocation();
  let pathname = location.pathname || '';

  // normalize (remove trailing slash) to be safe
  if (pathname.length > 1 && pathname.endsWith('/')) pathname = pathname.replace(/\/$/, '');

  // Hide header on root, any /auth route, and any /verify route
  const shouldHideHeader =
    pathname === '/' || pathname.startsWith('/auth') || pathname.startsWith('/verify');

  return (
    <>
      {!shouldHideHeader && <HomeHeader />}

      <Routes>
        <Route path="/" element={<LandingPage />} />

        {/* General auth container */}
        <Route path="/auth" element={<AuthPage />} />

        {/* Explicit login/register paths (optional) */}
        <Route path="/login" element={<AuthPage initialView="login" />} />
        <Route path="/register" element={<AuthPage initialView="register" />} />

        <Route path="/home" element={<HomePage />} />
        <Route path="/pricing" element={<PricingPage />} />
        <Route path="/developers" element={<DevelopersPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/documentation" element={<DocumentationPage />} />

        {/* Email verification link (verify token) */}
        <Route path="/verify/:token" element={<VerifyPage />} />

        {/* Forgot password flow */}
        <Route path="/auth/forgot-password" element={<ForgotPassword />} />
        <Route path="/auth/verify-otp/:email" element={<VerifyOtp />} />
        <Route path="/auth/change-password/:email" element={<ChangePassword />} />

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
