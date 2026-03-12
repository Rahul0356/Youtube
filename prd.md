# Product Requirement Document (PRD)

## Project: YouTube Clone (MERN Stack)

## 1. Product Overview

The goal of this project is to build a full-stack YouTube clone that
allows users to browse, watch, and interact with videos. The application
will replicate core features of YouTube using the MERN Stack (MongoDB,
Express.js, React.js, Node.js).

Users will be able to:

- Browse videos
- Search and filter videos
- Watch videos
- Like or dislike videos
- Comment on videos
- Create channels
- Upload and manage videos

------------------------------------------------------------------------

## 2. Objectives

-   Build a scalable full-stack video platform
-   Implement authentication using JWT
-   Implement CRUD operations for videos and comments
-   Provide responsive UI similar to YouTube
-   Use MongoDB for persistent storage

------------------------------------------------------------------------

## 3. Target Users

-   General users who want to watch videos
-   Content creators who want to upload videos
-   Registered users who want to interact with content

------------------------------------------------------------------------

## 4. Technology Stack

### Frontend

-   React
-   React Router
-   Axios
-   Vite

### Backend

-   Node.js
-   Express.js

### Database

-   MongoDB

### Authentication

-   JWT (JSON Web Token)

### Version Control

-   Git and GitHub

------------------------------------------------------------------------

## 5. Core Features

### 5.1 Home Page

**Header**

- Logo
- Search bar
- Sign-in button (if not logged in)
- Profile display (if logged in)

**Sidebar**

- Static sidebar menu
- Toggle via hamburger icon

**Filters**

- Minimum 6 filter buttons
- Filter videos by category

**Video Grid**

Each video card must display:

- Video Thumbnail
- Video Title
- Channel Name
- Number of Views

**Acceptance Criteria**

- Home page loads a grid of videos from the backend.
- Clicking a video navigates to the video player page.
- Filters update the video list without a full page refresh.

------------------------------------------------------------------------

### 5.2 User Authentication

Users should be able to:

- Register
- Login
- Authenticate using JWT

**Registration Fields**

- Username
- Email
- Password

**Requirements**

- Input validation
- Proper error messages
- After successful registration redirect to login page
- After login display username in header

**Acceptance Criteria**

- Invalid credentials show a clear error and do not log the user in.
- A valid login returns a JWT and the frontend stores it securely (e.g., in memory or localStorage).
- Protected actions (upload/edit/delete) require a valid token.

------------------------------------------------------------------------

### 5.3 Search and Filter

**Search**

- Search bar in the header
- Search videos by title

**Filters**

- Minimum 6 category buttons
- Clicking a filter shows videos from that category
- Uploaded videos appear dynamically

**Acceptance Criteria**

- Search results are returned from the backend (not hardcoded).
- Category filter and search can work together (e.g., filter + search).

------------------------------------------------------------------------

### 5.4 Video Player Page

Display:

- Video Player
- Video Title
- Description
- Channel Name
- Like Button
- Dislike Button
- Comment Section

**Comment Features**

Users should be able to:

- Add comment
- Edit comment
- Delete comment

Nested comments are not required.

**Acceptance Criteria**

- Like/dislike updates persist in the database and reflect on refresh.
- Users can only edit/delete their own comments.

------------------------------------------------------------------------

### 5.5 Channel Page

Users can create a channel only after login.

Channel page should display:

- Channel name
- Banner
- Description
- List of uploaded videos

**Video Management**

Users should be able to:

- Upload videos
- Edit videos
- Delete videos

**Acceptance Criteria**

- Only the channel owner can upload/edit/delete their videos.
- Deleting a video also removes/handles dependent data (e.g., comments for that video).

------------------------------------------------------------------------

## 6. Responsive Design

The application must support:

- Desktop
- Tablet
- Mobile

UI components should adapt to different screen sizes.

------------------------------------------------------------------------

## 7. Backend Requirements

### Authentication APIs

-   Register User
-   Login User
-   JWT Authentication

### Channel APIs

-   Create Channel
-   Get Channel Details

### Video APIs

-   Upload Video
-   Fetch Videos
-   Update Video
-   Delete Video

### Comment APIs

-   Add Comment
-   Fetch Comments

------------------------------------------------------------------------

## 8. Database Design (MongoDB)

Collections:

- Users
- Videos
- Channels
- Comments

Store metadata including:

- Video URL
- Thumbnail URL
- Upload date
- Likes and dislikes

------------------------------------------------------------------------

## 9. Submission Requirements

Students must submit:

- GitHub repository with full source code
- Detailed README
- Demo video showing application functionality

------------------------------------------------------------------------

## 10. Evaluation Rubric (400 Marks)

### Frontend -- 170 Marks

-   Home Page UI/UX -- 40
-   User Authentication -- 40
-   Video Player Page -- 50
-   Channel Page -- 40

### Backend -- 120 Marks

-   API Design -- 40
-   MongoDB Integration -- 40
-   JWT Authentication -- 40

### Search & Filter -- 40 Marks

-   Search by Title -- 20
-   Filter by Category -- 20

### Responsiveness -- 30 Marks

-   Mobile / Tablet / Desktop Layout -- 30

### Code Quality & Documentation -- 40 Marks

-   Code Structure -- 20
-   Documentation -- 20

------------------------------------------------------------------------

## 11. Important Guidelines

-   Use ES Modules (import/export)
-   Do not use Create React App; use Vite
-   Do not upload node_modules to GitHub
-   Implement both frontend and backend
-   Maintain at least 30 GitHub commits
-   Implement full CRUD operations for videos and comments
-   Authentication must be properly implemented

------------------------------------------------------------------------

## 12. Scope (In-Scope vs Out-of-Scope)

### In-Scope (Must Have)

- Authentication (Register/Login) with JWT
- Video browsing, search, category filters
- Video watch page with like/dislike and comments (CRUD)
- Channel creation and channel page
- Video CRUD (upload/edit/delete) tied to a channel/user
- Responsive UI (desktop/tablet/mobile)

### Out-of-Scope (Nice-to-Have / Not Required for This Capstone)

- Nested comments/replies
- Subscriptions / notifications
- Live streaming
- Monetization
- Full recommendation algorithm

------------------------------------------------------------------------

## 13. User Stories

### Viewer

- As a viewer, I can browse trending/latest videos on the home page.
- As a viewer, I can search videos by title so I can find relevant content.
- As a viewer, I can filter videos by category to narrow results.
- As a viewer, I can open a video and watch it with title/description and channel info.

### Registered User

- As a registered user, I can like/dislike a video and the count persists.
- As a registered user, I can add/edit/delete my comments on a video.
- As a registered user, I can create my channel and manage my profile data.

### Creator (Channel Owner)

- As a creator, I can upload videos to my channel.
- As a creator, I can edit video details (title/description/category/thumbnail).
- As a creator, I can delete my uploaded videos.

------------------------------------------------------------------------

## 14. Non-Functional Requirements (Marks-Safe)

- **Performance**: API responses should be paginated for video lists and comments to avoid slow loading.
- **Security**: Passwords must be hashed (bcrypt). JWT must be validated on protected routes.
- **Reliability**: Backend should return consistent error shapes with status codes.
- **Accessibility**: Basic a11y (keyboard navigation for key actions, alt text for thumbnails, readable contrast).
- **Maintainability**: Clear folder structure, reusable components, centralized API client on frontend.

------------------------------------------------------------------------

## 15. System Architecture (High-Level)

### Frontend (React + Vite)

- Pages: Home, Video Player, Channel, Auth (Login/Register)
- Components: Header, Sidebar, VideoGrid, VideoCard, CommentList, CommentForm
- State: local state + API fetch; token stored and attached to requests

### Backend (Node + Express)

- Layers: Routes → Controllers → Services (optional) → Models (Mongoose)
- Middleware: auth middleware (JWT), error handler, validation

### Data Flow (Example)

- Home page loads → `GET /api/videos` → backend queries MongoDB → returns paginated videos → frontend renders grid.

------------------------------------------------------------------------

## 16. API Specification (Detailed)

> Note: Endpoint names can be adjusted to match implementation. This section ensures the PRD contains a clear API contract for evaluation.

### Auth

- `POST /api/auth/register`
  - body: `{ username, email, password }`
  - returns: `{ message }`
- `POST /api/auth/login`
  - body: `{ email, password }`
  - returns: `{ token, user: { _id, username, email } }`
- `GET /api/auth/me` (protected)
  - returns: `{ user }`

### Channels

- `POST /api/channels` (protected)
  - body: `{ name, description, bannerUrl? }`
  - returns: `{ channel }`
- `GET /api/channels/:channelId`
  - returns: `{ channel, videos }`
- `PATCH /api/channels/:channelId` (protected, owner-only)
  - body: `{ name?, description?, bannerUrl? }`
  - returns: `{ channel }`

### Videos

- `GET /api/videos`
  - query: `page, limit, search, category`
  - returns: `{ items: [video], page, limit, total }`
- `GET /api/videos/:videoId`
  - returns: `{ video }`
- `POST /api/videos` (protected, channel owner)
  - body: `{ title, description, category, videoUrl, thumbnailUrl }`
  - returns: `{ video }`
- `PATCH /api/videos/:videoId` (protected, owner-only)
  - body: `{ title?, description?, category?, thumbnailUrl? }`
  - returns: `{ video }`
- `DELETE /api/videos/:videoId` (protected, owner-only)
  - returns: `{ message }`
- `POST /api/videos/:videoId/like` (protected)
  - returns: `{ likes, dislikes, userReaction }`
- `POST /api/videos/:videoId/dislike` (protected)
  - returns: `{ likes, dislikes, userReaction }`

### Comments

- `GET /api/videos/:videoId/comments`
  - query: `page, limit`
  - returns: `{ items: [comment], page, limit, total }`
- `POST /api/videos/:videoId/comments` (protected)
  - body: `{ text }`
  - returns: `{ comment }`
- `PATCH /api/comments/:commentId` (protected, owner-only)
  - body: `{ text }`
  - returns: `{ comment }`
- `DELETE /api/comments/:commentId` (protected, owner-only)
  - returns: `{ message }`

------------------------------------------------------------------------

## 17. Database Schema (Suggested Fields)

> This is a suggested schema for evaluation clarity. Actual implementation may vary but should include equivalent fields and relationships.

### User

- `_id`
- `username` (unique)
- `email` (unique)
- `passwordHash`
- `createdAt`, `updatedAt`

### Channel

- `_id`
- `ownerId` (ref: User)
- `name`
- `description`
- `bannerUrl` (optional)
- `createdAt`, `updatedAt`

### Video

- `_id`
- `channelId` (ref: Channel)
- `ownerId` (ref: User)
- `title`
- `description`
- `category` (string)
- `videoUrl`
- `thumbnailUrl`
- `views` (number)
- `likesCount`, `dislikesCount` (number)
- `createdAt`, `updatedAt`

### Comment

- `_id`
- `videoId` (ref: Video)
- `userId` (ref: User)
- `text`
- `createdAt`, `updatedAt`

------------------------------------------------------------------------

## 18. Validation, Error Handling & Edge Cases

### Validation

- Register: email format, password length, unique username/email
- Login: invalid email/password must return safe error (no sensitive details)
- Video create/update: title required, valid category, valid URLs
- Comment: non-empty text, max length limit (e.g., 1–500 chars)

### Error Response (Recommended Shape)

- `{ message: string }` for simple errors
- `{ message: string, details?: any }` for validation errors

### Edge Cases

- Deleting a video should also delete its comments (or handle orphaned comments).
- If a user is not logged in, like/dislike/comment buttons should prompt login.
- If a video/channel does not exist, show a 404-style UI.

------------------------------------------------------------------------

## 19. Security Requirements

- Password hashing using bcrypt (never store raw passwords).
- JWT verification middleware for protected endpoints.
- Authorization checks:
  - Only comment owner can edit/delete comment.
  - Only video owner/channel owner can edit/delete videos and update channel.
- Basic rate limiting (recommended) for auth routes.
- Environment variables for secrets (JWT secret, DB URL).

------------------------------------------------------------------------

## 20. Testing Plan (Minimum)

- **Backend**: test key endpoints (auth, videos list, comments CRUD) using Postman or automated tests if time allows.
- **Frontend**: manual test checklist:
  - Register → login → token persists
  - Search + filter works
  - Video watch works (likes/comments persist after refresh)
  - Channel video CRUD works and enforces owner-only rules
  - Responsive UI across breakpoints

------------------------------------------------------------------------

## 21. Deployment Plan (If Required)

- **Backend**: deploy on Render / Railway / Vercel Serverless / any Node hosting.
- **Frontend**: deploy on Vercel / Netlify.
- **Database**: MongoDB Atlas.
- **Config**: create `.env.example` for both backend and frontend with required keys.

------------------------------------------------------------------------

## 22. Risks & Mitigation

- **Large uploads / storage**: use hosted video URLs (e.g., Cloudinary/S3) or store links only.
- **Slow queries**: add pagination and indexes on `title`, `category`, `createdAt`.
- **Auth bugs**: centralize auth middleware and add consistent error handling.

------------------------------------------------------------------------

## 23. Future Enhancements (Optional)

- Subscriptions and personalized feed
- Watch history and “Continue watching”
- Playlists
- Reply threads on comments
- Admin dashboard / reporting
