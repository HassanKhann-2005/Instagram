import { useEffect, useState } from 'react'
import { api } from '../services/api'
import { useParams } from 'react-router-dom'

export default function ProfilePage() {
  const { username } = useParams()
  const [user, setUser] = useState(null)
  const [posts, setPosts] = useState([])

  useEffect(() => {
    api.get(`/users/${username}`).then(res => setUser(res.data.user))
    api.get('/posts').then(res => setPosts((res.data.posts || []).filter(p => p.author?.username === username)))
  }, [username])

  if (!user) return <p>Loading...</p>

  return (
    <div>
      <div className="flex items-center gap-5 mb-6">
        <div className="w-20 h-20 rounded-full bg-gray-200" />
        <div>
          <h1 className="text-2xl font-bold">{user.username}</h1>
          <p className="text-gray-600">{user.name}</p>
          <p className="mt-2 max-w-xl">{user.bio}</p>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-1">
        {posts.map(p => (
          <img key={p._id} src={p.imageUrl} className="aspect-square object-cover" />
        ))}
      </div>
    </div>
  )
}