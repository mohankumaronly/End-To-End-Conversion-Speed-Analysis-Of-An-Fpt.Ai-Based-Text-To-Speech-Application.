// src/pages/ForgotPassword.jsx
import React, { useState } from 'react'
// import InputField from '../components/InputField' // adjust path as needed
import { Mail } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
// import { API, safeFetch } from '../lib/apiClient'
import InputField from './InputField'
import { API, safeFetch } from '../../lib/apiClient'

const ForgotPassword = () => {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setSuccess('')

    if (!email.trim()) {
      setError('Please enter your registered email.')
      return
    }

    setLoading(true)
    try {
      const { ok, data } = await safeFetch(`${API}/user/forgot-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })

      if (!ok) {
        setError(data?.message || 'Failed to send OTP. Please try again.')
        setLoading(false)
        return
      }

      setSuccess('OTP sent to your email. It is valid for 10 minutes.')
      setLoading(false)

      // navigate to OTP page, pass email in route param (encoded)
      navigate(`/auth/verify-otp/${encodeURIComponent(email)}`)
    } catch (err) {
      console.error('forgot-password error', err)
      setError('Server error. Please try again later.')
      setLoading(false)
    }
  }

  return (
    <div className="max-w-md mx-auto p-6">
      <h2 className="text-2xl font-semibold mb-4">Forgot password</h2>
      <p className="text-sm text-gray-600 mb-4">Enter your registered email — we'll send a 6-digit OTP to reset your password.</p>

      <form onSubmit={handleSubmit} className="space-y-4" noValidate>
        <InputField
          icon={Mail}
          type="email"
          placeholder="you@company.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        {error && <p className="text-sm text-red-500" role="alert">{error}</p>}
        {success && <p className="text-sm text-green-600">{success}</p>}

        <button
          type="submit"
          disabled={loading}
          className="w-full px-4 py-3 bg-blue-600 text-white rounded-lg disabled:opacity-50"
        >
          {loading ? 'Sending OTP…' : 'Send OTP'}
        </button>
      </form>
    </div>
  )
}

export default ForgotPassword
