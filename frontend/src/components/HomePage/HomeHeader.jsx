import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Mic, Menu, X, AlertTriangle, UserCircle, Zap } from 'lucide-react';

/**
 * Router-aware HomeHeader (React Router v6)
 *
 * Usage:
 *  - Ensure your App has routes for: "/", "/home", "/history", "/pricing",
 *    "/documentation", "/developers", "/contact", "/auth"
 *  - Import and use <HomeHeader /> (no onViewChange/currentView props required)
 */

const NAV_LINKS = [
  { name: 'Home', action: 'home', isPage: true, href: '/home' },
  { name: 'History', action: 'history', isPage: true, href: '/history' },
  { name: 'Pricing', isPage: false, href: '/pricing' },
  { name: 'Documentation', isPage: false, href: '/documentation' },
  { name: 'Developers', isPage: false, href: '/developers' },
  { name: 'Contact', isPage: false, href: '/contact' },
];

const HomeHeader = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  // Decide auth button behaviour (navigates by path)
  // If you want to check auth state here, swap this boolean with real auth check
  const isOnAuthPage = window.location.pathname === '/auth';
  const authButtonText = isOnAuthPage ? 'Go to Dashboard' : 'Login / Register';
  const authButtonTarget = isOnAuthPage ? '/home' : '/auth';
  const AuthButtonIcon = isOnAuthPage ? Zap : UserCircle;

  const navLinkClass = ({ isActive }) =>
    `text-sm font-semibold transition duration-150 flex items-center ${
      isActive ? 'text-blue-800 border-b-2 border-amber-500' : 'text-gray-600 hover:text-blue-800'
    }`;

  return (
    <header className="sticky top-0 z-50 bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Brand */}
          <div className="flex justify-start">
            <NavLink to="/home" className="text-2xl font-extrabold text-blue-800 flex items-center group">
              <Mic className="w-6 h-6 mr-2 text-amber-500 group-hover:scale-110 transition-transform" />
              FPT <span className="text-amber-500">AI</span> TTS
            </NavLink>
          </div>

          {/* Desktop nav */}
          <nav className="hidden lg:flex space-x-6">
            {NAV_LINKS.map((link) => (
              <NavLink key={link.name} to={link.href} className={navLinkClass}>
                {link.name}
              </NavLink>
            ))}
          </nav>

          {/* Right side buttons */}
          <div className="flex items-center space-x-3">
            <button
              onClick={() => navigate(authButtonTarget)}
              className="px-3 py-1.5 md:px-4 md:py-2 border border-transparent rounded-full shadow-lg text-sm md:text-base font-medium text-white bg-blue-800 hover:bg-blue-900 transition duration-300 transform hover:scale-[1.02] flex items-center"
            >
              <AuthButtonIcon className="w-4 h-4 mr-2" /> {authButtonText}
            </button>

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 rounded-full text-gray-600 hover:bg-gray-100 transition duration-150"
              aria-expanded={isMenuOpen}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="lg:hidden bg-white shadow-xl absolute w-full top-16 border-t border-gray-100 pb-4">
          <nav className="flex flex-col px-4 space-y-2">
            {NAV_LINKS.map((link) => (
              <NavLink
                key={link.name}
                to={link.href}
                className={({ isActive }) =>
                  `w-full py-2 px-3 text-base font-medium rounded-lg transition ${
                    isActive ? 'text-blue-800 bg-blue-50' : 'text-gray-700 hover:bg-blue-50 hover:text-blue-800'
                  }`
                }
                onClick={() => setIsMenuOpen(false)}
              >
                {link.name}
              </NavLink>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
};

export default HomeHeader;
