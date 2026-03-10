import type { User } from "@/types"

// Store the current user in memory (in a real app, this would be in a database)
let currentUser: User | null = null

export const getCurrentUser = (): User | null => {
  return currentUser
}

export const setCurrentUser = (user: User | null): void => {
  currentUser = user

  // Also save to localStorage for persistence
  if (typeof window !== "undefined") {
    if (user) {
      localStorage.setItem("uniryde_user", JSON.stringify(user))
    } else {
      localStorage.removeItem("uniryde_user")
    }
  }
}

// Check if we're in a browser environment
const isBrowser = typeof window !== "undefined"

// Get user from localStorage
export const getUser = (): User | null => {
  if (!isBrowser) return null

  try {
    const user = localStorage.getItem("uniryde_user")
    return user ? JSON.parse(user) : null
  } catch (error) {
    console.error("Failed to parse user from localStorage", error)
    return null
  }
}

// Check if user is authenticated
export const isAuthenticated = (): boolean => {
  return !!currentUser || !!getUser()
}

// Logout function
export const logout = (): void => {
  currentUser = null
  if (isBrowser) {
    localStorage.removeItem("uniryde_user")
  }
}

