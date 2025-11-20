import React, { useState } from 'react'
import TabButton from './TabButton'
import LoginForm from './LoginForm'
import RegisterForm from './RegisterForm'
import { useNavigate } from "react-router-dom";

const AuthPage = () => {
  const [view, setView] = useState('login')
  const isLogin = view === 'login'
  const navigate = useNavigate();

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
                className="font-semibold text-orange-600 hover:text-orange-700 transition-colors"
                onClick={() => setView('register')}
              >
                Create an account
              </a>
            </p>
          ) : (
            <p className="text-sm text-gray-600">
              Already have an account?{' '}
              <a
                className="font-semibold text-blue-700 hover:text-blue-800 transition-colors"
                onClick={() => setView('login')}
              >
                Sign In
              </a>
            </p>
          )}
        </div>

        {/* 🔵 Back to Landing Page Button */}
        <div className="text-center mt-6">
          <button
            onClick={() => navigate("/")}
            className="text-sm font-semibold text-blue-700 hover:text-blue-800 transition-colors"
          >
            ← Back to Landing Page
          </button>
        </div>

      </div>
    </div>
  )
}

export default AuthPage
