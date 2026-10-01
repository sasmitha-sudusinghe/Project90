# PROJECT 90 🚀

A comprehensive personal transformation, study, rugby, and gym tracking application built for university students balancing academic and athletic demands.

**Challenge Period:** October 1 – December 31, 2026.

---

## 🛠 Local Setup Instructions

1. **Install Dependencies**
   ```bash
   npm install
   ```
2. **Environment Variables**
   Copy the example environment file:
   ```bash
   cp .env.example .env.local
   ```
   *(Note: Without a configured `.env.local`, the application safely falls back to **Local Demo Mode** using your browser's local state.)*
3. **Run the Development Server**
   ```bash
   npm run dev
   ```
4. **Access the App**
   Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## ☁️ Supabase Configuration (Free Tier)

This app uses Supabase for database and authentication.

1. Create a free account at [Supabase](https://supabase.com/).
2. Create a new project.
3. Once the project is provisioned, go to **Project Settings > API** and copy your `URL` and `anon public` key. Paste these into your `.env.local` as `VITE_SUPABASE_URL` and `VITE_SUPABASE_PUBLISHABLE_KEY`.
4. Navigate to the **SQL Editor** in the Supabase dashboard.
5. Copy the contents of `supabase/migrations/20261001000000_initial_schema.sql` and run it. This will create all necessary tables and apply **Row Level Security (RLS)** so your data is securely isolated.
6. Enable Email/Password authentication in the **Authentication** settings.

---

## 💾 Data Backup Instructions

To avoid losing data and to prevent relying on paid backup features:
1. Navigate to the **Data Backup** tab in the application sidebar.
2. Click **Download JSON Backup**.
3. A JSON file containing all your chapters, habits, training logs, and weekly reviews will be saved locally.
4. If you need to restore your progress on a new device or browser, use the **Restore Progress** uploader on the same page. *(Warning: This overwrites existing local data).*

---

## 🌍 Free Deployment Instructions

You can host this application for free using **Vercel Hobby Tier**.

1. Create a free account on [Vercel](https://vercel.com).
2. Install the Vercel CLI or connect your GitHub repository directly in the Vercel dashboard.
3. Add a new project and select your `Project 90` repository.
4. Vercel will auto-detect Vite. Leave the build command (`npm run build`) and output directory (`dist`) as default.
5. In the **Environment Variables** section, add your `VITE_SUPABASE_URL` and `VITE_SUPABASE_PUBLISHABLE_KEY`.
6. Click **Deploy**.
7. **Important:** Go to your Supabase **Authentication -> URL Configuration** settings and add your newly generated Vercel domain to the **Site URL** and **Redirect URLs** so that logins work successfully.

---

## ⚠️ Free-Tier Limitations

This architecture is entirely free, but is subject to the following limitations:
* **Supabase Free Tier:** Pauses the database after 1 week of inactivity. You must sign in to the dashboard to unpause it. Limits include 500MB database space, 50,000 monthly active users, and 5GB bandwidth. (More than enough for a single-user productivity app).
* **Vercel Hobby:** Strictly for non-commercial/personal use. Limits include 100GB bandwidth per month and a limit on Serverless Function execution times (which this SPA does not heavily rely on).
* **Storage:** We do not use Supabase Storage for large media (like progress photos) by default to preserve the 1GB free storage limit. 

---

## 🧪 Testing Instructions

Before deploying, ensure you verify:
1. **Routing:** Click through every sidebar link to ensure pages render without crashing.
2. **Build:** Run `npm run build` to ensure TypeScript compilation passes.
3. **RLS Security:** Once Supabase is connected, create two separate accounts and verify that Account A cannot see Account B's subjects or training logs.
4. **Data Management:** Test the offline JSON export feature to verify the downloaded file contains the correct schema structure.
