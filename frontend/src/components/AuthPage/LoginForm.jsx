import React, { useState } from 'react'
import { Mail, Lock, LogIn } from 'lucide-react'
import InputField from './InputField'
import { useNavigate } from 'react-router-dom'

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
    setLoading(true)

    try {
      const payload = { email, password }

      const res = await fetch('http://localhost:8000/user/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      // If backend returns non-JSON (rare), this may throw — keep catch below
      const data = await res.json()

      if (!res.ok) {
        const msg = data?.message || data?.error || 'Login failed'
        setError(msg)
        setLoading(false)
        return
      }

      // extract token
      const token = data?.data?.token ?? data?.token ?? null
      if (token) localStorage.setItem('token', token)

      // extract user
      const userObj = data?.data
        ? {
            username: data.data.username ?? null,
            email: data.data.email ?? null,
            id: data.data._id ?? null,
          }
        : null

      if (userObj) localStorage.setItem('user', JSON.stringify(userObj))

      // notify same-tab listeners immediately so header updates without reload
      try {
        window.dispatchEvent(new Event('authChanged'))
      } catch (e) {
        // ignore if dispatching custom event fails for any reason
        // (some older browsers or strict CSP might block)
        // console.warn('authChanged dispatch failed', e)
      }

      setSuccess(data?.message || 'Logged in successfully')
      setLoading(false)

      // navigate to home, then dispatch again after a short tick to cover race conditions
      setTimeout(() => {
        navigate('/home')
        try { window.dispatchEvent(new Event('authChanged')) } catch (e) {}
      }, 200)
    } catch (err) {
      console.error('Login error:', err)
      setError('Server error. Please try again later.')
      setLoading(false)
    }
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

      {error && <p className="text-sm text-red-500">{error}</p>}
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
