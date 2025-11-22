// src/components/LoginForm.jsx
import React, { useState } from 'react'
import { Mail, Lock, LogIn } from 'lucide-react'
import InputField from './InputField'
import { useNavigate } from 'react-router-dom'

const API = import.meta.env.VITE_API_URL || 'http://localhost:8000';


const LoginForm = () => {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setSuccess('')

    if (!email.trim() || !password.trim()) {
      setError('Please provide both email and password.')
      return
    }

    setLoading(true)
    try {
      const payload = { email, password }

      const res = await fetch(`${API}/user/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      // safe JSON parse
      let data = {}
      try {
        data = await res.json()
      } catch (err) {
        // non-JSON response
        data = {}
      }

      if (!res.ok) {
        const msg = data?.message || data?.error || 'Login failed'
        setError(msg)
        setLoading(false)
        return
      }

      // prefer accessToken/refreshToken (matches the backend you showed)
      const accessToken = data?.accessToken ?? data?.data?.accessToken ?? null
      const refreshToken = data?.refreshToken ?? data?.data?.refreshToken ?? null
      const user = data?.user ?? data?.data ?? null

      if (accessToken) localStorage.setItem('accessToken', accessToken)
      if (refreshToken) localStorage.setItem('refreshToken', refreshToken)
      // legacy key if other code expects 'token'
      if (accessToken) localStorage.setItem('token', accessToken)

      if (user) {
        const userObj = {
          username: user.username ?? user.name ?? null,
          email: user.email ?? null,
          id: user._id ?? user.id ?? null,
        }
        localStorage.setItem('user', JSON.stringify(userObj))
      }

      // notify other parts of the app
      try { window.dispatchEvent(new Event('authChanged')) } catch (e) {}

      setSuccess(data?.message || `Welcome back ${user?.username ?? ''}`)
      setLoading(false)

      navigate('/home')
    } catch (err) {
      console.error('Login error:', err)
      setError('Server error. Please try again later.')
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6" noValidate>
      <InputField
        icon={Mail}
        type="email"
        placeholder="you@company.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <InputField
        icon={Lock}
        type="password"
        placeholder="••••••••"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />

     <div className="text-right">
      <button
        type="button"
        onClick={() => navigate("/auth/forgot-password")}
        className="text-sm font-medium text-blue-700 hover:text-blue-800 transition-colors"
      >
        Forgot password?
      </button>
    </div>

      {error && <p className="text-sm text-red-500" role="alert">{error}</p>}
      {success && <p className="text-sm text-green-600">{success}</p>}

      <button
        type="submit"
        disabled={loading}
        className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-blue-700 text-white font-semibold rounded-xl shadow-lg hover:bg-blue-800 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
      >
        <LogIn className="w-5 h-5" />
        <span>{loading ? 'Signing in…' : 'Sign In'}</span>
      </button>
    </form>
  )
}

export default LoginForm
