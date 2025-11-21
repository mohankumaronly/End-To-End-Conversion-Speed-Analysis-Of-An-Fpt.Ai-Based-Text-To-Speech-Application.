import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

const BACKEND = 'http://localhost:8000' // change if your backend runs on another host/port

const tryRequest = async ({ method = 'GET', url, headers = {}, body = null }) => {
    try {
        const res = await fetch(url, {
            method,
            headers,
            body: body ? JSON.stringify(body) : undefined,
        })
        const text = await res.text()
        let parsed = null
        try { parsed = text ? JSON.parse(text) : null } catch (e) { parsed = null }
        return { ok: res.ok, status: res.status, bodyText: text, bodyJson: parsed }
    } catch (err) {
        return { ok: false, error: String(err) }
    }
}

const Spinner = ({ className = '' }) => (
    <svg
        className={`animate-spin h-8 w-8 ${className}`}
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
    >
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
    </svg>
)

const VerifyPage = () => {
    const { token } = useParams()
    const navigate = useNavigate()
    const [log, setLog] = useState([])
    const [done, setDone] = useState(false)
    const [message, setMessage] = useState('Starting verification attempts...')
    const [isAttempting, setIsAttempting] = useState(true)     // true while trying shapes
    const [isRedirecting, setIsRedirecting] = useState(false)  // true when about to navigate

    useEffect(() => {
        if (!token) {
            setMessage('No token provided in URL.')
            setIsAttempting(false)
            setDone(true)
            return
        }

        const safeToken = encodeURIComponent(token)

        const attempts = [
            {
                id: 'GET-header',
                desc: 'GET /user/verify with Authorization header',
                fn: () => tryRequest({
                    method: 'GET',
                    url: `${BACKEND}/user/verify`,
                    headers: { Accept: 'application/json', Authorization: `Bearer ${token}` },
                })
            },
            {
                id: 'POST-header',
                desc: 'POST /user/verify with Authorization header',
                fn: () => tryRequest({
                    method: 'POST',
                    url: `${BACKEND}/user/verify`,
                    headers: { Accept: 'application/json', 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
                })
            },
            {
                id: 'GET-query',
                desc: 'GET /user/verify?token=...',
                fn: () => tryRequest({
                    method: 'GET',
                    url: `${BACKEND}/user/verify?token=${safeToken}`,
                    headers: { Accept: 'application/json' },
                })
            },
            {
                id: 'POST-query',
                desc: 'POST /user/verify?token=...',
                fn: () => tryRequest({
                    method: 'POST',
                    url: `${BACKEND}/user/verify?token=${safeToken}`,
                    headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
                })
            },
            {
                id: 'GET-param',
                desc: 'GET /user/verify/:token',
                fn: () => tryRequest({
                    method: 'GET',
                    url: `${BACKEND}/user/verify/${safeToken}`,
                    headers: { Accept: 'application/json' },
                })
            },
            {
                id: 'POST-param',
                desc: 'POST /user/verify/:token',
                fn: () => tryRequest({
                    method: 'POST',
                    url: `${BACKEND}/user/verify/${safeToken}`,
                    headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
                })
            },
        ]

        const run = async () => {
            setIsAttempting(true)
            for (let a of attempts) {
                setMessage(`Attempting: ${a.desc}`)
                const res = await a.fn()
                setLog(prev => [...prev, { attempt: a.id, desc: a.desc, result: res }])

                if (res.ok) {
                    const isSuccess = (res.bodyJson && (res.bodyJson.success === true || res.bodyJson.message)) || res.ok
                    if (isSuccess) {
                        setMessage(res.bodyJson?.message || 'Verification successful.')
                        // show nice loading overlay and hide debug, then navigate
                        setIsRedirecting(true)
                        setIsAttempting(false)
                        setTimeout(() => {
                            navigate('/home')
                        }, 1200)
                        setDone(true)
                        return
                    }
                }
            }
            setMessage('All attempts finished. No successful verification.')
            setIsAttempting(false)
            setDone(true)
        }

        run()
    }, [token, navigate])

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 relative">
            <div className="max-w-3xl w-full bg-white p-6 rounded-xl shadow">
                <h2 className="text-xl font-semibold mb-4">Email Verification</h2>

                {/* Top status area */}
                <div className="flex items-center gap-3 mb-3">
                    <div>
                        <Spinner />
                    </div>
                    <div>
                        <div className="text-sm font-medium">{message}</div>
                        <div className="text-xs text-gray-500 mt-1">
                            {isAttempting ? 'Trying different verification methods...' : (isRedirecting ? 'Redirecting to homepage...' : 'Diagnostic complete.')}
                        </div>
                    </div>
                </div>

                {/* Show debug log only while not redirecting */}
                {!isRedirecting && (
                    <>
                        <div className="mb-4">
                            <strong>Token (truncated):</strong>
                            <div className="text-xs text-gray-500 break-words mt-1">{token?.slice(0, 40)}{token?.length > 40 ? '…' : ''}</div>
                        </div>

                        <div className="space-y-3">
                            {log.map((entry, i) => (
                                <div key={i} className="p-3 bg-gray-100 rounded">
                                    <div className="text-sm font-medium">{entry.desc}</div>
                                    <div className="text-xs text-gray-700 mt-1">
                                        {entry.result.error ? (
                                            <div>Error: {entry.result.error}</div>
                                        ) : (
                                            <>
                                                <div className="font-semibold">Status: {entry.result.status}</div>
                                                <div className="mt-1 whitespace-pre-wrap text-xs text-gray-700 bg-white p-2 rounded mt-2">
                                                    {entry.result.bodyText || JSON.stringify(entry.result.bodyJson) || '— empty response —'}
                                                </div>
                                            </>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </>
                )}

                {/* final tips */}
                {done && !isRedirecting && (
                    <div className="mt-4 text-sm text-gray-600">
                        <div>If verification did not succeed:</div>
                        <ul className="list-disc pl-5 mt-2 text-xs">
                            <li>Check backend is running on <code>{BACKEND}</code>.</li>
                            <li>Confirm the user verify route exists and which method it expects (GET or POST) and whether it uses header/query/param token.</li>
                            <li>Ensure backend has CORS enabled for cross-origin requests during dev: <code>app.use(require('cors')())</code>.</li>
                        </ul>
                    </div>
                )}
            </div>

            {/* Full-screen overlay shown when redirecting so user sees nice loader instead of debug */}
            {isRedirecting && (
                <div className="absolute inset-0 flex items-center justify-center bg-white/90">
                    <div className="text-center">
                        <div className="mb-4 flex items-center justify-center">
                            <Spinner className="h-12 w-12" />
                        </div>
                        <div className="text-lg font-semibold">Verification successful</div>
                        <div className="text-sm text-gray-600 mt-2">Redirecting you to the homepage…</div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default VerifyPage
