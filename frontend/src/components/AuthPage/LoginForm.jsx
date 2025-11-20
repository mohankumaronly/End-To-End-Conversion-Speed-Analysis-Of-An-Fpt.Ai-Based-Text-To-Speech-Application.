import React, { useState } from 'react'
import { Mail, Lock, LogIn } from 'lucide-react'
import InputField from './InputField'

const LoginForm = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Signing In:', { email, password })
    alert('Sign In clicked! (Check console for data)')
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <InputField
        icon={Mail}
        type="email"
        placeholder="you@company.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <InputField
        icon={Lock}
        type="password"
        placeholder="••••••••"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <div className="text-right">
        <a href="#" className="text-sm font-medium text-blue-700 hover:text-blue-800 transition-colors">
          Forgot password?
        </a>
      </div>

      <button
        type="submit"
        className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-blue-700 text-white font-semibold rounded-xl shadow-lg hover:bg-blue-800 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        <LogIn className="w-5 h-5" />
        <span>Sign In</span>
      </button>
    </form>
  )
}

export default LoginForm
