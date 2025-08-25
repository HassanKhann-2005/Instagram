import { useState } from 'react'
import { api } from '../services/api'
import { useNavigate } from 'react-router-dom'

export default function NewPostPage() {
  const [file, setFile] = useState(null)
  const [caption, setCaption] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const onSubmit = async (e) => {
    e.preventDefault()
    setError('')
    if (!file) return setError('Select an image')
    const formData = new FormData()
    formData.append('image', file)
    formData.append('caption', caption)
    try {
      await api.post('/posts', formData, { headers: { 'Content-Type': 'multipart/form-data' } })
      navigate('/')
    } catch (e) {
      setError(e.response?.data?.message || 'Create post failed')
    }
  }

  return (
    <div className="max-w-sm mx-auto">
      <h1 className="text-2xl font-bold mb-4">New Post</h1>
      <form onSubmit={onSubmit} className="space-y-3">
        <input type="file" accept="image/*" onChange={e => setFile(e.target.files?.[0] || null)} />
        <textarea className="input min-h-[120px]" placeholder="Write a caption..." value={caption} onChange={e => setCaption(e.target.value)} />
        {error && <p className="text-red-600 text-sm">{error}</p>}
        <button className="btn w-full" type="submit">Share</button>
      </form>
    </div>
  )
}