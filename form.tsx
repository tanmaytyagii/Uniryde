import type { User } from "@/types"
import { setCurrentUser } from "./auth"

// This is a fallback authentication method for testing when Microsoft auth is not working
export const fallbackLogin = (): User => {
  const user: User = {
    id: "fallback-user-id",
    name: "Test User",
    email: "test.user@university.edu",
    avatar: null,
  }

  setCurrentUser(user)
  return user
}

