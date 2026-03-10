import {
  PublicClientApplication,
  type AuthenticationResult,
  type AccountInfo,
  InteractionRequiredAuthError,
} from "@azure/msal-browser"
import type { User } from "@/types"
import { setCurrentUser } from "./auth"

// MSAL configuration
const msalConfig = {
  auth: {
    clientId: process.env.NEXT_PUBLIC_AZURE_AD_CLIENT_ID || "",
    authority: `https://login.microsoftonline.com/${process.env.NEXT_PUBLIC_AZURE_AD_TENANT_ID}`,
    redirectUri: process.env.NEXT_PUBLIC_REDIRECT_URI || (typeof window !== "undefined" ? window.location.origin : ""),
  },
  cache: {
    cacheLocation: "sessionStorage",
    storeAuthStateInCookie: true,
  },
}

// Create the MSAL application object
let msalInstance: PublicClientApplication | null = null

// Initialize MSAL
export const initializeMicrosoftAuth = async (): Promise<boolean> => {
  try {
    if (typeof window !== "undefined") {
      console.log("Initializing MSAL with config:", {
        clientId: msalConfig.auth.clientId,
        tenantId: process.env.NEXT_PUBLIC_AZURE_AD_TENANT_ID,
        redirectUri: msalConfig.auth.redirectUri,
      })

      msalInstance = new PublicClientApplication(msalConfig)
      await msalInstance.initialize()

      // Handle the redirect flow
      await msalInstance
        .handleRedirectPromise()
        .then(handleResponse)
        .catch((err) => {
          console.error("Error handling redirect:", err)
        })

      // Check if there's a cached user
      const accounts = msalInstance.getAllAccounts()
      if (accounts.length > 0) {
        const account = accounts[0]
        const user = mapAccountToUser(account)
        setCurrentUser(user)
        return true
      }
    }
    return false
  } catch (error) {
    console.error("Error initializing Microsoft authentication:", error)
    return false
  }
}

// Handle the response from authentication
const handleResponse = (response: AuthenticationResult | null) => {
  if (response) {
    // Create user account
    const user = mapAccountToUser(response.account)
    setCurrentUser(user)
    return user
  }
  return null
}

// Login with Microsoft using redirect
export const loginWithMicrosoft = async (): Promise<void> => {
  try {
    if (!msalInstance) {
      await initializeMicrosoftAuth()
    }

    if (msalInstance) {
      // Use loginRedirect instead of loginPopup
      await msalInstance.loginRedirect({
        scopes: ["user.read"],
        prompt: "select_account",
      })
    }
  } catch (error) {
    // Handle specific errors
    if (error instanceof InteractionRequiredAuthError) {
      console.error("Interaction required:", error)
    } else {
      console.error("Error logging in with Microsoft:", error)
    }
    throw error
  }
}

// Get current authenticated user
export const getAuthenticatedUser = (): User | null => {
  try {
    if (!msalInstance) {
      return null
    }

    const accounts = msalInstance.getAllAccounts()
    if (accounts.length > 0) {
      return mapAccountToUser(accounts[0])
    }

    return null
  } catch (error) {
    console.error("Error getting authenticated user:", error)
    return null
  }
}

// Logout
export const logout = async (): Promise<void> => {
  try {
    if (msalInstance) {
      const logoutRequest = {
        account: msalInstance.getActiveAccount() || undefined,
        postLogoutRedirectUri: window.location.origin,
      }

      await msalInstance.logoutRedirect(logoutRequest)
      setCurrentUser(null)
    }
  } catch (error) {
    console.error("Error logging out:", error)
  }
}

// Map MSAL account to our User type
const mapAccountToUser = (account: AccountInfo | null): User => {
  if (!account) {
    throw new Error("Account is null")
  }

  return {
    id: account.homeAccountId,
    name: account.name || "Microsoft User",
    email: account.username,
    avatar: null,
  }
}

