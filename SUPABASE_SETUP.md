# Uniryde - University Ride Sharing App

Uniryde is a ride-sharing application designed specifically for university students to connect and share cab expenses.

## Features

- User authentication (Email, Google, Guest)
- Create and join rides
- In-app chat for ride participants
- Contact sharing with privacy controls
- Free ride promotion for new users
- Google Maps integration for route visualization
- Payment system integration

## Setup Instructions

### 1. API Keys Configuration

To fully utilize all features of Uniryde, you'll need to set up the following API keys:

#### Google Maps API

1. Go to the [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the following APIs:
   - Maps JavaScript API
   - Places API
   - Geocoding API
4. Create an API key with appropriate restrictions
5. Update the `GOOGLE_MAPS_API_KEY` in `lib/config.ts`

#### Google Authentication

1. Go to the [Google Cloud Console](https://console.cloud.google.com/)
2. Navigate to "APIs & Services" > "Credentials"
3. Create an OAuth 2.0 Client ID
4. Add authorized JavaScript origins and redirect URIs for your app
5. Update the `googleClientId` in `lib/config.ts`

#### Microsoft Authentication (Azure AD)

1. Go to the [Azure Portal](https://portal.azure.com/)
2. Navigate to "Azure Active Directory" > "App registrations"
3. Register a new application
4. Configure the authentication settings for a single-page application
5. Add the following environment variables to your project:
   - `NEXT_PUBLIC_AZURE_AD_CLIENT_ID`
   - `NEXT_PUBLIC_AZURE_AD_TENANT_ID`
   - `NEXT_PUBLIC_REDIRECT_URI`

### 2. Environment Variables

For local development, create a `.env.local` file in the root directory with the following variables:

### 3. Supabase Database Setup

For the app to work with Supabase, you need to set up the required database tables:

1. Create a Supabase account at [https://supabase.com](https://supabase.com)
2. Create a new project
3. Set up the required tables by following the instructions in `SUPABASE_SETUP.md`
4. Add your Supabase URL and anon key to your environment variables:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`

If you don't set up Supabase, the app will still work with local fallback data, but changes won't persist between sessions.

