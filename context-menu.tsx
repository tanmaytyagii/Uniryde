// This file contains configuration settings for the app
// In a production environment, these would be environment variables

export const GOOGLE_MAPS_API_KEY = "YOUR_GOOGLE_MAPS_API_KEY"

// Instructions for updating API keys:
// 1. For Google Maps API: Get a key from https://console.cloud.google.com/google/maps-apis
// 2. For Google Auth: Set up OAuth credentials at https://console.cloud.google.com/apis/credentials
// 3. For Microsoft Auth: Register an app in Azure AD at https://portal.azure.com
// 4. For Supabase: Create a project at https://supabase.com and get your URL and anon key

export const AUTH_CONFIG = {
  googleClientId: "YOUR_GOOGLE_CLIENT_ID",
  microsoftClientId: process.env.NEXT_PUBLIC_AZURE_AD_CLIENT_ID || "",
  microsoftTenantId: process.env.NEXT_PUBLIC_AZURE_AD_TENANT_ID || "",
  redirectUri: process.env.NEXT_PUBLIC_REDIRECT_URI || "",
}

export const SUPABASE_CONFIG = {
  url: process.env.NEXT_PUBLIC_SUPABASE_URL || "",
  anonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "",
}

// How to update API keys:
// 1. Replace the placeholder values above with your actual API keys
// 2. For production, set these as environment variables in your hosting platform
// 3. For Vercel, add them in the project settings under Environment Variables
// 4. For local development, create a .env.local file with these values

