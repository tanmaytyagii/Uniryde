# 🚗 Uniryde - University Ride Sharing App

Uniryde is a ride-sharing application designed specifically for university students to connect and share cab expenses.

---

## 🌟 Features

* User authentication (Email, Google, Guest)
* Create and join rides
* In-app chat for ride participants
* Contact sharing with privacy controls
* Free ride promotion for new users
* Google Maps integration for route visualization
* Payment system integration

---

## ⚙️ Setup Instructions

### 1. API Keys Configuration

To fully utilize all features of Uniryde, you'll need to set up the following API keys:

#### 🗺️ Google Maps API

1. Go to https://console.cloud.google.com/
2. Create a new project or select an existing one
3. Enable the following APIs:

   * Maps JavaScript API
   * Places API
   * Geocoding API
4. Create an API key with appropriate restrictions
5. Update the `GOOGLE_MAPS_API_KEY` in `lib/config.ts`

---

#### 🔐 Google Authentication

1. Go to https://console.cloud.google.com/
2. Navigate to **APIs & Services → Credentials**
3. Create an OAuth 2.0 Client ID
4. Add authorized JavaScript origins and redirect URIs
5. Update the `googleClientId` in `lib/config.ts`

---

#### 🏢 Microsoft Authentication (Azure AD)

1. Go to https://portal.azure.com/
2. Navigate to **Azure Active Directory → App registrations**
3. Register a new application
4. Configure authentication for a single-page application
5. Add the following environment variables:

```env
NEXT_PUBLIC_AZURE_AD_CLIENT_ID=
NEXT_PUBLIC_AZURE_AD_TENANT_ID=
NEXT_PUBLIC_REDIRECT_URI=
```

---

### 2. Environment Variables

Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
NEXT_PUBLIC_AZURE_AD_CLIENT_ID=
NEXT_PUBLIC_AZURE_AD_TENANT_ID=
NEXT_PUBLIC_REDIRECT_URI=
```

---

### 3. Supabase Database Setup

1. Create an account at https://supabase.com
2. Create a new project
3. Follow instructions from `SUPABASE_SETUP.md`
4. Add credentials to `.env.local`

> ⚠️ Without Supabase, the app will run in fallback mode and data will not persist.

---

## 🚀 Running the Project

```bash
npm install
npm run dev
```

---

## 👨‍💻 Contribution

This repository is originally created by the main author.

My contributions include:

* Updated and improved `utils.ts`
* Refactored utility logic for better readability
* Minor fixes and optimizations

---

## 📄 License

This project is licensed under the MIT License.
