import type { User } from "@/types"

// In-memory storage for demo users
const demoUsers = [
  {
    id: "user1",
    email: "demo@university.edu",
    password: "password123",
    name: "Demo User",
    avatar: null,
    rideCount: 0,
  },
]

// Store the current user in memory and localStorage
let currentUser: User | null = null

// Check if we're in a browser environment
const isBrowser = typeof window !== "undefined"

// Get current user
export const getCurrentUser = (): User | null => {
  if (!currentUser && isBrowser) {
    // Try to get from localStorage
    const storedUser = localStorage.getItem("uniryde_user")
    if (storedUser) {
      try {
        currentUser = JSON.parse(storedUser)
      } catch (error) {
        console.error("Failed to parse user from localStorage", error)
      }
    }
  }
  return currentUser
}

// Set current user
export const setCurrentUser = (user: User | null): void => {
  currentUser = user

  if (isBrowser) {
    if (user) {
      localStorage.setItem("uniryde_user", JSON.stringify(user))
      localStorage.setItem("uniryde_logged_in", "true")
    } else {
      localStorage.removeItem("uniryde_user")
      localStorage.removeItem("uniryde_logged_in")
    }
  }
}

// Check if user is authenticated
export const isAuthenticated = (): boolean => {
  if (currentUser) return true

  if (isBrowser) {
    return localStorage.getItem("uniryde_logged_in") === "true"
  }

  return false
}

// Manual login with email and password
export const loginWithCredentials = (email: string, password: string): User | null => {
  const user = demoUsers.find((u) => u.email === email && u.password === password)

  if (user) {
    const authUser: User = {
      id: user.id,
      name: user.name,
      email: user.email,
      avatar: user.avatar,
      rideCount: user.rideCount,
    }

    setCurrentUser(authUser)
    return authUser
  }

  return null
}

// Login as guest/demo user
export const loginAsGuest = (): User => {
  const guestUser: User = {
    id: "guest-" + Date.now(),
    name: "Guest User",
    email: "guest@university.edu",
    avatar: null,
    rideCount: 0,
  }

  setCurrentUser(guestUser)
  return guestUser
}

// Google login simulation
export const loginWithGoogle = (): User => {
  const googleUser: User = {
    id: "google-" + Date.now(),
    name: "Google User",
    email: "google.user@university.edu",
    avatar: null,
    rideCount: 0,
  }

  setCurrentUser(googleUser)
  return googleUser
}

// Logout
export const logout = (): void => {
  setCurrentUser(null)
}

// Update user ride count
export const updateUserRideCount = (userId: string, count: number): void => {
  if (currentUser && currentUser.id === userId) {
    currentUser.rideCount = count
    setCurrentUser(currentUser)
  }
}

