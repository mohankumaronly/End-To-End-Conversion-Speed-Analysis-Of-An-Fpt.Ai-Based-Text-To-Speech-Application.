// src/components/HomePage/HomeHeader.jsx
import React, { useEffect, useRef, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Mic, Menu, X, User, LogOut, Settings, Zap } from 'lucide-react';

const BACKEND = 'http://localhost:8000';
const LOGOUT_URL = `${BACKEND}/user/logout`;

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
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  const readUserFromStorage = () => {
    try {
      const raw = localStorage.getItem('user');
      if (!raw) return null;
      return JSON.parse(raw);
    } catch (e) {
      return null;
    }
  };

  // Attach listeners (storage for cross-tab and authChanged for same-tab login), then read initial user
  useEffect(() => {
    const onStorageOrAuth = () => {
      setUser(readUserFromStorage());
    };

    window.addEventListener('storage', onStorageOrAuth);
    window.addEventListener('authChanged', onStorageOrAuth);

    // initial read AFTER listeners attached to avoid race
    setUser(readUserFromStorage());

    return () => {
      window.removeEventListener('storage', onStorageOrAuth);
      window.removeEventListener('authChanged', onStorageOrAuth);
    };
  }, []);

  // Close profile dropdown when clicking outside
  useEffect(() => {
    const handler = (e) => {
      if (isProfileOpen && dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsProfileOpen(false);
      }
    };
    window.addEventListener('mousedown', handler);
    return () => window.removeEventListener('mousedown', handler);
  }, [isProfileOpen]);

  const isOnAuthPage = window.location.pathname === '/auth';
  const authButtonText = isOnAuthPage ? 'Go to Dashboard' : 'Login / Register';
  const authButtonTarget = isOnAuthPage ? '/home' : '/auth';

  const navLinkClass = ({ isActive }) =>
    `text-sm font-semibold transition duration-150 flex items-center ${isActive ? 'text-blue-800 border-b-2 border-amber-500' : 'text-gray-600 hover:text-blue-800'
    }`;

  const handleProfileClick = () => setIsProfileOpen((s) => !s);

  // Logout: call backend (if token), clear client storage, then navigate to /auth
  // Do NOT dispatch authChanged or setUser(null) here — header will update after navigation
  const handleLogout = async () => {
    setIsLoggingOut(true);
    setIsProfileOpen(false);

    try {
      const token = localStorage.getItem('token');

      if (token) {
        await fetch(LOGOUT_URL, {
          method: 'POST', // change to GET if your API expects GET
          headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        }).catch(() => { });
      }

      // Clear client-side auth
      localStorage.removeItem('token');
      localStorage.removeItem('user');

      // Navigate to /auth so the header and page will re-evaluate auth state
      navigate('/auth');
    } catch (err) {
      console.error('Logout error', err);
      // Ensure cleanup & navigate even on error
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      navigate('/auth');
    } finally {
      setIsLoggingOut(false);
    }
  };

  const goToAccount = () => {
    setIsProfileOpen(false);
    navigate('/home');
  };

  return (
    <header className="sticky top-0 z-50 bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex justify-start">
            <NavLink to="/home" className="text-2xl font-extrabold text-blue-800 flex items-center group">
              <Mic className="w-6 h-6 mr-2 text-amber-500 group-hover:scale-110 transition-transform" />
              FPT <span className="text-amber-500">AI</span> TTS
            </NavLink>
          </div>

          <nav className="hidden lg:flex space-x-6">
            {NAV_LINKS.map((link) => (
              <NavLink key={link.name} to={link.href} className={navLinkClass}>
                {link.name}
              </NavLink>
            ))}
          </nav>

          <div className="flex items-center space-x-3">
            {user ? (
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={handleProfileClick}
                  className="flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 rounded-full border border-gray-200 bg-white hover:shadow-sm transition"
                  aria-expanded={isProfileOpen}
                >
                  <User className="w-5 h-5 text-gray-700" />
                  <span className="text-sm font-medium text-gray-700 hidden md:inline">
                    {user.username || user.email || 'Account'}
                  </span>
                </button>

                {isProfileOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white border border-gray-100 rounded-lg shadow-lg py-2 z-50">
                    <div className="px-4 py-2">
                      <div className="text-sm font-semibold text-gray-800">{user.username || 'User'}</div>
                      <div className="text-xs text-gray-500 truncate">{user.email || ''}</div>
                    </div>

                    <div className="border-t border-gray-100 my-1" />

                    <button
                      onClick={goToAccount}
                      className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2"
                    >
                      <Settings className="w-4 h-4" />
                      Account
                    </button>

                    <button
                      onClick={handleLogout}
                      disabled={isLoggingOut}
                      className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-50 flex items-center gap-2"
                    >
                      <LogOut className="w-4 h-4" />
                      {isLoggingOut ? 'Logging out…' : 'Logout'}
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <>
                <button
                  onClick={() => navigate(authButtonTarget)}
                  className="px-3 py-1.5 md:px-4 md:py-2 border border-transparent rounded-full shadow-lg text-sm md:text-base font-medium text-white bg-blue-800 hover:bg-blue-900 transition duration-300 transform hover:scale-[1.02] flex items-center"
                >
                  <Zap className="w-4 h-4 mr-2" /> {authButtonText}
                </button>

                <button
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="lg:hidden p-2 rounded-full text-gray-600 hover:bg-gray-100 transition duration-150"
                  aria-expanded={isMenuOpen}
                  aria-label="Toggle menu"
                >
                  {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="lg:hidden bg-white shadow-xl absolute w-full top-16 border-t border-gray-100 pb-4">
          <nav className="flex flex-col px-4 space-y-2">
            {NAV_LINKS.map((link) => (
              <NavLink
                key={link.name}
                to={link.href}
                className={({ isActive }) =>
                  `w-full py-2 px-3 text-base font-medium rounded-lg transition ${isActive ? 'text-blue-800 bg-blue-50' : 'text-gray-700 hover:bg-blue-50 hover:text-blue-800'
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
