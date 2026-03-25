# Deployment Guide (Vercel + Render)

This guide deploys:
- Frontend (`client/`) on Vercel
- Backend (`server/`) on Render

## 1) Prerequisites

- GitHub repository with this project pushed
- Vercel account
- Render account
- Firebase project with Authentication enabled

## 2) Deploy Backend on Render

1. Open Render dashboard.
2. Click **New +** -> **Blueprint**.
3. Connect your GitHub repo.
4. Render auto-detects [render.yaml](render.yaml) and creates `future-fit-backend`.
5. In Render service env vars, set:
   - `CLIENT_ORIGIN` = your frontend URL after Vercel deploy (for now you can set a temporary value and update later)
   - `ADMIN_EMAIL` = `vikashkr30112003@gmail.com`
   - `ADMIN_API_KEY` = any strong string (optional but recommended)
6. Deploy and wait until status is **Live**.
7. Copy backend URL, for example:
   - `https://future-fit-backend.onrender.com`

Health check:
- Open `https://future-fit-backend.onrender.com/api/health`
- Expected response: `{ "ok": true }`

## 3) Deploy Frontend on Vercel

1. Open Vercel dashboard.
2. Click **Add New...** -> **Project**.
3. Import the same GitHub repo.
4. Set **Root Directory** to `client`.
5. Framework preset: `Vite`.
6. Add environment variables in Vercel Project Settings:
   - `VITE_ADMIN_EMAIL` = `vikashkr30112003@gmail.com`
   - `VITE_ADMIN_API_KEY` = same as Render `ADMIN_API_KEY`
   - `VITE_API_BASE_URL` = `https://future-fit-backend.onrender.com/api`
   - `VITE_FIREBASE_API_KEY` = from Firebase
   - `VITE_FIREBASE_AUTH_DOMAIN` = from Firebase
   - `VITE_FIREBASE_PROJECT_ID` = from Firebase
   - `VITE_FIREBASE_STORAGE_BUCKET` = from Firebase
   - `VITE_FIREBASE_MESSAGING_SENDER_ID` = from Firebase
   - `VITE_FIREBASE_APP_ID` = from Firebase
   - `VITE_FIREBASE_MEASUREMENT_ID` = from Firebase
7. Deploy.

Note:
- [client/vercel.json](client/vercel.json) is included for React Router SPA rewrites.

## 4) Firebase Authentication Settings

In Firebase Console:

1. Authentication -> Sign-in method:
   - Enable **Email/Password**
   - Enable **Google**
2. Authentication -> Settings -> Authorized domains:
   - Add your Vercel domain (example: `your-app.vercel.app`)
   - `localhost` can remain for local testing

## 5) Final CORS Update on Render

After frontend deploy, set Render backend `CLIENT_ORIGIN` to include both domains (comma-separated):

`https://your-app.vercel.app,http://localhost:5173`

Then redeploy backend.

## 6) Verify End-to-End

1. Open frontend URL.
2. Test Admin login with `vikashkr30112003@gmail.com`.
3. Test Google sign-in.
4. Submit Contact and Appointment forms.
5. Open Admin dashboard and verify records are visible.

## 7) Troubleshooting

- Google popup/auth error:
  - Verify Vercel domain is added in Firebase authorized domains.
- Admin login denied:
  - Ensure `VITE_ADMIN_EMAIL` and `ADMIN_EMAIL` are identical.
- API blocked by CORS:
  - Ensure `CLIENT_ORIGIN` exactly matches deployed frontend URL.
- Data resets after deploy:
   - Render free plan uses ephemeral filesystem; JSON data may reset on restart/redeploy.
   - For persistent data, upgrade plan with disk support or move to managed DB (MongoDB/Postgres).
