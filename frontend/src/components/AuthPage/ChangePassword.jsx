// src/pages/ChangePassword.jsx
import React, { useState } from 'react'
// import InputField from '../components/InputField' // adjust path as needed
import { useNavigate, useParams } from 'react-router-dom'
// import { API, safeFetch } from '../lib/apiClient'
import { Lock } from 'lucide-react'
import InputField from './InputField'
import { API, safeFetch } from '../../lib/apiClient'

const ChangePassword = () => {
  const { email } = useParams() // /auth/change-password/:email
  const decodedEmail = decodeURIComponent(email || '')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setSuccess('')

    if (!newPassword || !confirmPassword) {
      setError('Please fill both password fields.')
      return
    }
    if (newPassword.length < 8) {
      setError('Password must be at least 8 characters.')
      return
    }
    if (newPassword !== confirmPassword) {
      setError('Passwords do not match.')
      return
    }

    setLoading(true)
    try {
      const { ok, data } = await safeFetch(`${API}/user/change-password/${encodeURIComponent(decodedEmail)}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ newPassword, confirmPassword }),
      })

      if (!ok) {
        setError(data?.message || 'Failed to change password.')
        setLoading(false)
        return
      }

      setSuccess('Password changed successfully. Redirecting to login...')
      setLoading(false)

      setTimeout(() => navigate('/auth?view=login'), 1100)
    } catch (err) {
      console.error('change-password error', err)
      setError('Server error. Please try again later.')
      setLoading(false)
    }
  }

  return (
    <div className="max-w-md mx-auto p-6">
      <h2 className="text-2xl font-semibold mb-4">Set new password</h2>
      <p className="text-sm text-gray-600 mb-3">Create a new password for <strong>{decodedEmail}</strong></p>

      <form onSubmit={handleSubmit} className="space-y-4" noValidate>
        <InputField
          icon={Lock}
          type="password"
          placeholder="New password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
        />

        <InputField
          icon={Lock}
          type="password"
          placeholder="Confirm password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />

        {error && <p className="text-sm text-red-500" role="alert">{error}</p>}
        {success && <p className="text-sm text-green-600">{success}</p>}

        <button
          type="submit"
          disabled={loading}
          className="w-full px-4 py-3 bg-yellow-600 text-white rounded-lg disabled:opacity-50"
        >
          {loading ? 'Saving…' : 'Save new password'}
        </button>
      </form>
    </div>
  )
}

export default ChangePassword
