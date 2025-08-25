import { useState } from 'react'
import { api } from '../services/api'
import { useNavigate, Link } from 'react-router-dom'

export default function LoginPage() {
  const [emailOrUsername, setId] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const onSubmit = async (e) => {
    e.preventDefault()
    setError('')
    try {
      await api.post('/auth/login', { emailOrUsername, password })
      navigate('/')
    } catch (e) {
      setError(e.response?.data?.message || 'Login failed')
    }
  }

  return (
    <div className="max-w-sm mx-auto">
      <h1 className="text-2xl font-bold mb-4">Login</h1>
      <form onSubmit={onSubmit} className="space-y-3">
        <input className="input" placeholder="Email or username" value={emailOrUsername} onChange={e => setId(e.target.value)} />
        <input className="input" placeholder="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} />
        {error && <p className="text-red-600 text-sm">{error}</p>}
        <button className="btn w-full" type="submit">Sign in</button>
      </form>
      <p className="mt-3 text-sm">No account? <Link to="/register" className="text-blue-600">Register</Link></p>
    </div>
  )
}