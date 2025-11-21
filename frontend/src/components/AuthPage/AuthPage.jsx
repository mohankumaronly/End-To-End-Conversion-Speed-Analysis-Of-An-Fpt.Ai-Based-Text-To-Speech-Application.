// src/components/AuthPage/AuthPage.jsx
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import TabButton from './TabButton';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';

const AuthPage = ({ initialView }) => {
  // initialView prop (from /login or /register) takes priority,
  // but query param `?view=` can override it.
  const [searchParams] = useSearchParams();
  const paramView = searchParams.get('view'); // 'login' or 'register'

  const [view, setView] = useState(initialView || 'login');
  const isLogin = view === 'login';

  useEffect(() => {
    if (paramView === 'login' || paramView === 'register') {
      setView(paramView);
    } else if (initialView) {
      // if there's no query param but initialView prop exists, ensure it's applied
      setView(initialView);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [paramView, initialView]);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4 sm:p-6 font-sans">
      <div className="w-full max-w-md bg-white p-8 sm:p-10 rounded-3xl shadow-2xl transition-all duration-300 transform scale-100 opacity-100">

        {/* Title */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-extrabold text-gray-900 mb-2">
            {isLogin ? 'Sign in to your account' : 'Create your free account'}
          </h1>
          <p className="text-sm text-gray-600">
            {isLogin ? 'Access your dashboard and API keys.' : 'Start synthesizing natural voice today.'}
          </p>
        </div>

        {/* Tabs */}
        <div className="flex justify-around mb-8 border-b border-gray-200">
          <TabButton isActive={isLogin} onClick={() => setView('login')}>Login</TabButton>
          <TabButton isActive={!isLogin} onClick={() => setView('register')}>Register</TabButton>
        </div>

        {/* Forms */}
        {isLogin ? <LoginForm /> : <RegisterForm />}

        {/* Toggle Links */}
        <div className="text-center mt-8">
          {isLogin ? (
            <p className="text-sm text-gray-600">
              New to FPT AI Voice?{' '}
              <a
                className="font-semibold text-orange-600 hover:text-orange-700 transition-colors cursor-pointer"
                onClick={() => setView('register')}
              >
                Create an account
              </a>
            </p>
          ) : (
            <p className="text-sm text-gray-600">
              Already have an account?{' '}
              <a
                className="font-semibold text-blue-700 hover:text-blue-800 transition-colors cursor-pointer"
                onClick={() => setView('login')}
              >
                Sign In
              </a>
            </p>
          )}
        </div>

      </div>
    </div>
  );
};

export default AuthPage;
