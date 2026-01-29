# VARA Application - Routing Documentation

## Architecture Overview

VARA uses a **hybrid routing architecture** combining:
- **Frontend Routing** (React Router) - For page navigation and UI
- **Backend Routing** (Express.js) - For API endpoints and business logic

This is the industry-standard approach for React + Node.js applications.

---

## Frontend Routing (React Router)

The frontend handles page navigation without full page reloads.

### Routes

| Route | Component | Auth Required | Description |
|-------|-----------|---------------|-------------|
| `/` | Redirect | No | Redirects to `/login` or `/dashboard` based on auth |
| `/login` | `Login.tsx` | No | User login page |
| `/register` | `Register.tsx` | No | User registration page |
| `/create-password` | `CreatePassword.tsx` | No | Password reset/creation page |
| `/dashboard` | `Dashboard` | Yes | Main user dashboard |
| `/user-dashboard` | `UserDashboard.tsx` | Yes | Detailed user dashboard |

### Route Protection

Routes are protected using the `token` from `authStore`:

```tsx
// Protected Route Example
<Route 
  path="/dashboard" 
  element={token ? <Dashboard /> : <Navigate to="/login" />} 
/>

// Public Route (redirects if logged in)
<Route 
  path="/login" 
  element={token ? <Navigate to="/dashboard" /> : <Login />} 
/>
```

---

## Backend Routing (Express.js API)

The backend handles all API requests, authentication, and database operations.

### Base URL
```
http://localhost:5000/api
```

### Authentication Routes (`/api/auth`)

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/api/auth/register` | No | Register a new user |
| POST | `/api/auth/login` | No | Login and get JWT token |
| GET | `/api/auth/profile` | Yes | Get current user profile |

### Health Check

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/health` | Server health check |

---

## API Request/Response Examples

### Register User

**Request:**
```http
POST /api/auth/register
Content-Type: multipart/form-data

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "phone": "+971501234567",
  "portfolioLink": "https://portfolio.com",
  "category": "designer",
  "otherCategory": ""
}
```

**Response:**
```json
{
  "success": true,
  "message": "Registration successful",
  "data": {
    "user": {
      "id": "uuid",
      "name": "John Doe",
      "email": "john@example.com",
      "phone": "+971501234567",
      "category": "designer",
      "created_at": "2026-01-28T00:00:00Z"
    },
    "token": "jwt_token_here"
  }
}
```

### Login User

**Request:**
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "user": {
      "id": "uuid",
      "name": "John Doe",
      "email": "john@example.com"
    },
    "token": "jwt_token_here"
  }
}
```

### Get Profile (Protected)

**Request:**
```http
GET /api/auth/profile
Authorization: Bearer jwt_token_here
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "+971501234567",
    "portfolio_link": "https://portfolio.com",
    "category": "designer",
    "is_verified": false,
    "created_at": "2026-01-28T00:00:00Z"
  }
}
```

---

## How Frontend & Backend Work Together

```
┌─────────────────────────────────────────────────────────────┐
│                         USER                                 │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                    FRONTEND (React)                          │
│                   http://localhost:5173                      │
│                                                              │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────────────┐  │
│  │   /login    │  │  /register  │  │     /dashboard      │  │
│  │  Login.tsx  │  │ Register.tsx│  │   Dashboard.tsx     │  │
│  └─────────────┘  └─────────────┘  └─────────────────────┘  │
│                                                              │
│              │ API Calls (axios) │                          │
└──────────────┼───────────────────┼──────────────────────────┘
               │                   │
               ▼                   ▼
┌─────────────────────────────────────────────────────────────┐
│                    BACKEND (Express)                         │
│                   http://localhost:5000                      │
│                                                              │
│  ┌──────────────────────────────────────────────────────┐   │
│  │                    /api/auth                          │   │
│  │  POST /register  │  POST /login  │  GET /profile     │   │
│  └──────────────────────────────────────────────────────┘   │
│                              │                               │
│                              ▼                               │
│  ┌──────────────────────────────────────────────────────┐   │
│  │                    SUPABASE                           │   │
│  │              (PostgreSQL Database)                    │   │
│  └──────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
```

---

## Running the Application

### Start Backend (Port 5000)
```bash
cd Backend
npm install
npm run dev
```

### Start Frontend (Port 5173)
```bash
cd Frontend
npm install
npm run dev
```

### Environment Variables

**Backend `.env`:**
```
PORT=5000
NODE_ENV=development
SUPABASE_URL=your_supabase_url
SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_KEY=your_service_key
JWT_SECRET=your_jwt_secret
```

---

## Why This Architecture?

| Aspect | Benefit |
|--------|---------|
| **Performance** | No full page reloads, instant navigation |
| **User Experience** | Smooth transitions, preserved state |
| **Security** | JWT tokens, protected API endpoints |
| **Scalability** | Frontend and backend can scale independently |
| **Maintainability** | Clear separation of concerns |
| **Modern Standards** | Used by Netflix, Airbnb, Facebook |
