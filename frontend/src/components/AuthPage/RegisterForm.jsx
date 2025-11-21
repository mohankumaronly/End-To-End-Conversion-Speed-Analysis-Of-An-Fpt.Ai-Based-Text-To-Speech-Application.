import React, { useState } from 'react'
import InputField from './InputField'
import { User, Mail, Lock, UserPlus } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const RegisterForm = () => {
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setSuccess('')
    setLoading(true)

    try {
      const payload = {
        username: name, // backend expects "username"
        email,
        password,
      }

      const res = await fetch('http://localhost:8000/user/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      })

      const data = await res.json()

      if (!res.ok) {
        // backend might return message or errors object
        const msg = data?.message || data?.error || 'Registration failed'
        setError(msg)
        setLoading(false)
        return
      }

      // success
      setSuccess(data?.message || 'Registered successfully')

      // Optionally save token if backend returns one:
      if (data?.data?.token) {
        // save token for later requests
        localStorage.setItem('token', data.data.token)
        // if you want to save user info:
        localStorage.setItem('user', JSON.stringify({
          username: data.data.username,
          email: data.data.email,
        }))
      }

      setLoading(false)

      // navigate to login or dashboard — adjust path as needed
      // give user a short moment to see success
      setTimeout(() => navigate('/auth?view=login'), 900)

    } catch (err) {
      console.error(err)
      setError('Server error. Please try again later.')
      setLoading(false)
    }
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

      {error && <p className="text-sm text-red-500">{error}</p>}
      {success && <p className="text-sm text-green-600">{success}</p>}

      <p className="text-xs text-gray-500">
        By clicking "Create Account", you agree to our{' '}
        <a href="#" className="font-medium text-blue-700 hover:underline">Terms of Service</a> and{' '}
        <a href="#" className="font-medium text-blue-700 hover:underline">Privacy Policy</a>.
      </p>

      <button
        type="submit"
        disabled={loading}
        className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-[#f59e0b] text-white font-semibold rounded-xl shadow-lg hover:bg-yellow-700 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 cursor-pointer disabled:opacity-50"
      >
        <UserPlus className="w-5 h-5" />
        <span>{loading ? 'Creating...' : 'Create Account'}</span>
      </button>
    </form>
  )
}

export default RegisterForm
