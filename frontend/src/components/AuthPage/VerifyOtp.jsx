// src/pages/VerifyOtp.jsx
import React, { useState } from 'react'
// import InputField from '../components/InputField' // adjust path as needed
import { useNavigate, useParams } from 'react-router-dom'
// import { API, safeFetch } from '../lib/apiClient'
import { Key } from 'lucide-react'
import InputField from './InputField'
import { API, safeFetch } from '../../lib/apiClient'

const VerifyOtp = () => {
  const { email } = useParams() // routed as /auth/verify-otp/:email
  const decodedEmail = decodeURIComponent(email || '')
  const [otp, setOtp] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setSuccess('')

    if (!otp.trim()) {
      setError('Please enter the OTP.')
      return
    }

    setLoading(true)
    try {
      const { ok, data } = await safeFetch(`${API}/user/verify-otp/${encodeURIComponent(decodedEmail)}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ otp }),
      })

      if (!ok) {
        setError(data?.message || 'OTP verification failed')
        setLoading(false)
        return
      }

      setSuccess('OTP verified. You can now set a new password.')
      setLoading(false)

      // go to change-password page
      navigate(`/auth/change-password/${encodeURIComponent(decodedEmail)}`)
    } catch (err) {
      console.error('verify-otp error', err)
      setError('Server error. Please try again later.')
      setLoading(false)
    }
  }

  return (
    <div className="max-w-md mx-auto p-6">
      <h2 className="text-2xl font-semibold mb-4">Verify OTP</h2>
      <p className="text-sm text-gray-600 mb-3">
        Enter the 6-digit OTP sent to <strong>{decodedEmail}</strong>
      </p>

      <form onSubmit={handleSubmit} className="space-y-4" noValidate>
        <InputField
          icon={Key}
          placeholder="Enter OTP"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          required
        />

        {error && <p className="text-sm text-red-500" role="alert">{error}</p>}
        {success && <p className="text-sm text-green-600">{success}</p>}

        <button
          type="submit"
          disabled={loading}
          className="w-full px-4 py-3 bg-green-600 text-white rounded-lg disabled:opacity-50"
        >
          {loading ? 'Verifying…' : 'Verify OTP'}
        </button>
      </form>
    </div>
  )
}

export default VerifyOtp
