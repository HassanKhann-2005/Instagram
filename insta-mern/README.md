# InstaMERN Template

A minimal Instagram-style MERN template. Includes auth, feed, profiles, new post upload, likes, and comments API.

## Stack
- Server: Node.js, Express, Mongoose, JWT, Multer, CORS, Helmet
- Client: React + Vite, React Router, Axios, TailwindCSS

## Setup

1) Prerequisites
- Node 18+
- MongoDB running locally at `mongodb://127.0.0.1:27017`

2) Install
```bash
cd server && npm i && cd ..
cd client && npm i && cd ..
```

3) Configure envs
- Copy `server/.env.example` to `server/.env` and set values
- Copy `client/.env.example` to `client/.env`

4) Run dev
In two terminals:
```bash
cd server && npm run dev
```
```bash
cd client && npm run dev
```
- API: `http://localhost:5000`
- Web: `http://localhost:5173`

## API Highlights
- `POST /api/auth/register` { username, email, name, password }
- `POST /api/auth/login` { emailOrUsername, password }
- `GET /api/auth/me` cookie auth
- `POST /api/auth/logout`
- `GET /api/posts` feed
- `POST /api/posts` multipart form-data (`image`, `caption`) [auth]
- `POST /api/posts/:postId/like|unlike` [auth]
- `GET/POST /api/posts/:postId/comments` [auth for POST]
- `GET /api/users/:username` profile

## Notes
- Images are saved under `server/uploads` and served at `/uploads/...`
- Auth uses httpOnly cookie `token` with JWT
- This is a starter; extend with explore, stories, messaging, etc.