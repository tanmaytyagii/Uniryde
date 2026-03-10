import type { RideSlot, Rider } from "@/types"
import { getCurrentUser, setCurrentUser } from "@/lib/simple-auth"
import * as supabaseClient from "./supabase"

// Get all ride slots
export const getAllRideSlots = async (): Promise<RideSlot[]> => {
  try {
    return await supabaseClient.getAllRides()
  } catch (error) {
    console.error("Error in getAllRideSlots:", error)
    return []
  }
}

// Get a ride slot by ID
export const getRideSlotById = async (id: string): Promise<RideSlot | null> => {
  try {
    return await supabaseClient.getRideById(id)
  } catch (error) {
    console.error("Error in getRideSlotById:", error)
    return null
  }
}

// Create a new ride slot
export const createRideSlot = async (rideSlot: Omit<RideSlot, "id" | "availableSeats">): Promise<RideSlot | null> => {
  try {
    const newSlot = {
      ...rideSlot,
      availableSeats: rideSlot.maxRiders - 1, // Creator takes one seat
    }

    return await supabaseClient.createRide(newSlot)
  } catch (error) {
    console.error("Error in createRideSlot:", error)
    return null
  }
}

// Join a ride slot
export const joinRideSlot = async (slotId: string, rider: Rider): Promise<RideSlot | null> => {
  try {
    const updatedRide = await supabaseClient.joinRide(slotId, rider)

    if (updatedRide) {
      // Increment user ride count for free ride promo
      await supabaseClient.incrementUserRideCount(rider.id)

      // Update the user's ride count in the auth system
      const currentUser = getCurrentUser()
      if (currentUser && currentUser.id === rider.id) {
        const rideCount = await supabaseClient.getUserRideCount(rider.id)
        updateUserRideCount(rider.id, rideCount)
      }
    }

    return updatedRide
  } catch (error) {
    console.error("Error in joinRideSlot:", error)
    return null
  }
}

// Get rides created by a user
export const getRidesByUser = async (userId: string): Promise<RideSlot[]> => {
  try {
    const rides = await supabaseClient.getRidesByUser(userId)
    // Ensure we always return an array
    return Array.isArray(rides) ? rides : []
  } catch (error) {
    console.error("Error in getRidesByUser:", error)
    return []
  }
}

// Get rides joined by a user
export const getRidesJoinedByUser = async (userId: string): Promise<RideSlot[]> => {
  try {
    const rides = await supabaseClient.getRidesJoinedByUser(userId)
    // Ensure we always return an array
    return Array.isArray(rides) ? rides : []
  } catch (error) {
    console.error("Error in getRidesJoinedByUser:", error)
    return []
  }
}

// Get user ride count for free ride promo
export const getUserRideCount = async (userId: string): Promise<number> => {
  try {
    return await supabaseClient.getUserRideCount(userId)
  } catch (error) {
    console.error("Error in getUserRideCount:", error)
    return 0
  }
}

// Check if user is eligible for free ride
export const isEligibleForFreeRide = async (userId: string): Promise<boolean> => {
  try {
    return await supabaseClient.isEligibleForFreeRide(userId)
  } catch (error) {
    console.error("Error in isEligibleForFreeRide:", error)
    return false
  }
}

// Get ride price for user (0 if free ride eligible)
export const getRidePriceForUser = async (userId: string, basePrice: number): Promise<number> => {
  try {
    return await supabaseClient.getRidePriceForUser(userId, basePrice)
  } catch (error) {
    console.error("Error in getRidePriceForUser:", error)
    return basePrice
  }
}

// Update user ride count
export const updateUserRideCount = (userId: string, count: number): void => {
  const user = getCurrentUser()
  if (user && user.id === userId) {
    const updatedUser = { ...user, rideCount: count }
    setCurrentUser(updatedUser)
  }
}

// Subscribe to ride updates
export const subscribeToRide = (rideId: string, callback: (ride: RideSlot) => void) => {
  return supabaseClient.subscribeToRide(rideId, callback)
}

// Subscribe to all rides updates
export const subscribeToRides = (callback: (rides: RideSlot[]) => void) => {
  return supabaseClient.subscribeToRides(callback)
}

