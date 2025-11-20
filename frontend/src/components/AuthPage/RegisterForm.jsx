import React, { useState } from 'react'
import InputField from './InputField'
import { User, Mail, Lock, UserPlus } from 'lucide-react'

const RegisterForm = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Registering:', { name, email, password })
    alert('Create Account clicked! (Check console for data)')
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <InputField
        icon={User}
        placeholder="John Doe"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
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
        placeholder="Minimum 8 characters"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <p className="text-xs text-gray-500">
        By clicking "Create Account", you agree to our{' '}
        <a href="#" className="font-medium text-blue-700 hover:underline">Terms of Service</a> and{' '}
        <a href="#" className="font-medium text-blue-700 hover:underline">Privacy Policy</a>.
      </p>

      <button
        type="submit"
        className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-[#f59e0b] text-white font-semibold rounded-xl shadow-lg hover:bg-yellow-700 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 cursor-pointer"
      >
        <UserPlus className="w-5 h-5" />
        <span>Create Account</span>
      </button>
    </form>
  )
}

export default RegisterForm
