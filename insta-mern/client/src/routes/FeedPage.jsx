import { useEffect, useState } from 'react'
import { api } from '../services/api'
import { Link } from 'react-router-dom'

export default function FeedPage() {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let ignore = false
    api.get('/posts')
      .then(res => {
        if (!ignore) setPosts(res.data.posts || [])
      })
      .finally(() => !ignore && setLoading(false))
    return () => { ignore = true }
  }, [])

  if (loading) return <p>Loading...</p>

  return (
    <div className="space-y-6">
      {posts.map(p => (
        <article key={p._id} className="bg-white rounded shadow overflow-hidden">
          <header className="p-3 flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-gray-200" />
            <Link to={`/u/${p.author?.username || ''}`} className="font-semibold">{p.author?.username}</Link>
          </header>
          <img src={p.imageUrl} className="w-full object-cover max-h-[520px] bg-gray-100" alt="post" />
          <div className="p-3">
            <p className="font-semibold">{p.likes?.length || 0} likes</p>
            {p.caption && <p className="mt-1"><span className="font-semibold mr-2">{p.author?.username}</span>{p.caption}</p>}
          </div>
        </article>
      ))}
      {posts.length === 0 && <p>No posts yet.</p>}
    </div>
  )
}