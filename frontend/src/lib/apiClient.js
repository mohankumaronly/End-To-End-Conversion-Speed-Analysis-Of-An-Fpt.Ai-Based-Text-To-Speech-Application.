// src/lib/apiClient.js
// env-safe API base (works with Vite or CRA) + safeFetch helper
export const API =
  (typeof import.meta !== 'undefined' && import.meta.env?.VITE_API_URL) ||
  process.env?.REACT_APP_API_URL ||
  'http://localhost:8000'

// safeFetch returns { ok, status, data, raw }
export async function safeFetch(url, options = {}) {
  const res = await fetch(url, options)
  let data = {}
  try {
    data = await res.json()
  } catch (err) {
    // non-JSON or empty body
    data = {}
  }
  return { ok: res.ok, status: res.status, data, raw: res }
}
