# Future Fit Studio Website

Business website built with React frontend, Node.js backend API, and Firebase Authentication.

## Stack

- Frontend: React + Vite, Tailwind CSS, Framer Motion
- Backend: Node.js + Express (REST API)
- Auth: Firebase Authentication (Google + Email/Password)
- Storage: JSON file persistence in backend (`server/data/db.json`) with local browser fallback

## Features

- Multi-page responsive website: Home, Services, About, Gallery, Contact, Appointments
- Modern animated navbar and footer with premium motion effects
- Contact and appointment forms sent to backend API
- Admin login with Firebase auth
- Admin dashboard to view and manage backend submissions
- Sticky navbar, dark/light mode, animations, WhatsApp floating button, Google Maps embed

## Folder Structure

- `client/` frontend app
- `server/` backend API

## Environment Setup

Copy `client/.env.example` to `client/.env` and fill values:

- `VITE_ADMIN_EMAIL`
- `VITE_ADMIN_API_KEY` (optional, recommended to match backend)
- `VITE_API_BASE_URL` (default `/api`)
- Firebase web config (`VITE_FIREBASE_*`)

Copy `server/.env.example` to `server/.env` and fill values:

- `PORT` (default `4000`)
- `CLIENT_ORIGIN` (default `http://localhost:5173`)
- `ADMIN_EMAIL` (must match frontend admin email)
- `ADMIN_API_KEY` (optional, if used it must match `VITE_ADMIN_API_KEY`)

Optional business info values:

- `VITE_BUSINESS_NAME`
- `VITE_BUSINESS_TAGLINE`
- `VITE_BUSINESS_PHONE`
- `VITE_BUSINESS_EMAIL`
- `VITE_BUSINESS_ADDRESS`
- `VITE_BUSINESS_WHATSAPP`

## Run Locally

```bash
cd server
npm install
npm run dev
```

In another terminal:

```bash
cd client
npm install
npm run dev
```

App URL: `http://localhost:5173`
API URL: `http://localhost:4000/api`

## Deployment

Detailed guide:

- See `DEPLOYMENT_VERCEL_RENDER.md` for exact Vercel + Render steps.

### Frontend (Vercel)

1. Import `client/` project in Vercel.
2. Add all `VITE_*` environment variables.
3. Deploy.

### Backend

Deploy `server/` to any Node.js host (Render, Railway, Azure App Service, etc.), then set:

- `VITE_API_BASE_URL` in frontend to your deployed backend URL (example: `https://your-api.com/api`).

## Firebase Auth Notes

1. Enable Email/Password and Google provider in Firebase Console.
2. Set authorized admin email in frontend env:
   - `VITE_ADMIN_EMAIL`
