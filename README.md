# YouTube Clone (MERN Stack)

A full-stack **YouTube Clone** built with the **MERN** stack (MongoDB, Express, React, Node) that supports browsing and watching videos, search + filters, channels, video management, and comments.

This repository includes:

- `backend/` (Node.js + Express + MongoDB + JWT)
- `frontend/` (React + Vite + Tailwind)

## Features

- **Home page**
  - Header (logo, search, sign-in/profile)
  - Sidebar (collapsible)
  - Category filter buttons
  - Video grid (thumbnail, title, channel name, views)
- **Authentication**
  - Register and login with JWT
  - Protected actions require a token
- **Search & Filter**
  - Search videos by title
  - Filter videos by category
- **Video Player Page**
  - Watch video (supports YouTube embed when YouTube API is enabled)
  - Like / dislike UI
  - Comments: add / edit / delete (owner-only)
- **Channel**
  - Create / edit / delete channel
  - View channel details
  - Upload and manage videos (update/delete are owner-only)
- **Responsive UI** for desktop / tablet / mobile

## Tech Stack

- **Frontend**: React, React Router, Axios, Vite, TailwindCSS
- **Backend**: Node.js, Express.js
- **Database**: MongoDB (Mongoose)
- **Auth**: JWT + bcrypt

## Project Structure

```
Youtube/
  backend/
    controller/
    middleware/
    models/
    routes/
    index.js
  frontend/
    src/
      components/
      App.jsx
      main.jsx
```

## Prerequisites

- Node.js (LTS recommended)
- MongoDB (local) or MongoDB Atlas connection string

## Environment Variables

Create `backend/.env` using `backend/.env.example` as reference:

```env
PORT=5100
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_strong_secret
JWT_EXPIRES_IN=1h

# Optional: enables fetching videos from YouTube Data API
YOUTUBE_API_KEY=your_youtube_api_key
```

Notes:

- If `YOUTUBE_API_KEY` is set, the backend can return videos from YouTube API on `GET /api/getVideos` (and local DB videos when `source=db` is used).
- `JWT_SECRET` is required to run the backend.

## Installation & Run (Local)

### 1) Backend

```bash
cd backend
npm install
npm run dev
```

Backend runs on `http://localhost:5100` by default.

### 2) Frontend

```bash
cd frontend
npm install
npm run dev
```

Frontend runs on the Vite port shown in the terminal (commonly `http://localhost:5173`).

## API Endpoints (current implementation)

Base URL: `http://localhost:5100`

### Auth

- `POST /register`
  - body: `{ "username": "...", "email": "...", "password": "..." }`
- `POST /login`
  - body: `{ "username": "...", "password": "..." }`
  - returns: `{ "message": "...", "token": "..." }`

### Videos

- `GET /api/getVideos`
  - optional query: `q` (search term), `source=db` (force DB)
- `POST /api/createVideo` (protected)
- `PUT /api/updateVideo/:id` (protected, owner-only)
- `DELETE /api/deleteVideo/:videoId` (protected, owner-only; also removes related comments)
- `GET /api/getvideos/:channelId` (protected) — fetch videos for a channel

### Comments

- `GET /api/getComments/:id` — `id` is the videoId
- `POST /api/createComment` (protected)
- `PUT /api/editComment/:id` (protected, owner-only)
- `DELETE /api/deleteComment/:id` (protected, owner-only)

### Channels

- `POST /api/createChannel` (protected)
- `GET /api/getChannels` (protected)
- `GET /api/getChannels/:id` (protected)
- `PUT /api/updateChannel/:id` (protected)
- `DELETE /api/deleteChannel/:id` (protected)

## How to Use (Demo Flow)

1. Register a user → login → token stored in browser local storage.
2. Browse videos on the home page (search + filter).
3. Open a video → add/edit/delete comments.
4. Create a channel → view channel page → upload/manage videos.

## Testing Checklist (quick)

- Auth: register + login + token works on protected endpoints
- Videos: list loads; open player page; update/delete only works for owner
- Comments: add/edit/delete only works for owner
- Channels: create/edit/delete channel (requires login)
- Responsive UI: verify on mobile + tablet + desktop widths



