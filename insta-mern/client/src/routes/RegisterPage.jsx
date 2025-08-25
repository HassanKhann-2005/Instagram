import { useState } from 'react'
import { api } from '../services/api'
import { useNavigate, Link } from 'react-router-dom'

export default function RegisterPage() {
  const [form, setForm] = useState({ username: '', email: '', name: '', password: '' })
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const onSubmit = async (e) => {
    e.preventDefault()
    setError('')
    try {
      await api.post('/auth/register', form)
      navigate('/')
    } catch (e) {
      setError(e.response?.data?.message || 'Register failed')
    }
  }

  return (
    <div className="max-w-sm mx-auto">
      <h1 className="text-2xl font-bold mb-4">Create account</h1>
      <form onSubmit={onSubmit} className="space-y-3">
        <input className="input" placeholder="Username" value={form.username} onChange={e => setForm({ ...form, username: e.target.value })} />
        <input className="input" placeholder="Email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
        <input className="input" placeholder="Name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
        <input className="input" placeholder="Password" type="password" value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} />
        {error && <p className="text-red-600 text-sm">{error}</p>}
        <button className="btn w-full" type="submit">Create account</button>
      </form>
      <p className="mt-3 text-sm">Have an account? <Link to="/login" className="text-blue-600">Login</Link></p>
    </div>
  )
}