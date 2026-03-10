import { createClient } from "@supabase/supabase-js"
import type { RideSlot, Rider } from "@/types"

// Initialize Supabase client with proper error handling
let supabase: ReturnType<typeof createClient> | null = null
let tablesExist = false

// Fallback data for when Supabase is not configured or tables don't exist
const fallbackData: {
  rides: RideSlot[]
  userRides: Record<string, string[]>
  joinedRides: Record<string, string[]>
  userRideCount: Record<string, number>
} = {
  rides: [
    {
      id: "1",
      time: "8:00 A.M",
      from: "DLF Mall Of Noida",
      to: "Bennett University",
      price: 10,
      date: "22 March, 2025",
      waitingTime: "30 minutes",
      riders: [{ id: "user1", name: "Shivam Singh", email: "shivam@university.edu", status: "Confirmed" }],
      createdBy: "user1",
      maxRiders: 4,
      meetingPoint: "DLF Mall entrance",
      availableSeats: 3,
    },
    {
      id: "2",
      time: "12:00 P.M",
      from: "Bennett University",
      to: "DLF Mall Of Noida",
      price: 10,
      date: "22 March, 2025",
      waitingTime: "15 minutes",
      riders: [{ id: "user2", name: "Sneha Verma", email: "sneha@university.edu", status: "Confirmed" }],
      createdBy: "user2",
      maxRiders: 4,
      meetingPoint: "University main gate",
      availableSeats: 3,
    },
    {
      id: "3",
      time: "3:00 P.M",
      from: "Sector 18",
      to: "Bennett University",
      price: 15,
      date: "22 March, 2025",
      waitingTime: "20 minutes",
      riders: [{ id: "user3", name: "Kartik Kumar", email: "kartik@university.edu", status: "Confirmed" }],
      createdBy: "user3",
      maxRiders: 3,
      meetingPoint: "Sector 18 metro station",
      availableSeats: 2,
    },
  ],
  userRides: {},
  joinedRides: {},
  userRideCount: {},
}

try {
  // Get Supabase URL and key from environment variables or config
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ""
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ""

  // Only create client if both URL and key are provided
  if (supabaseUrl && supabaseKey) {
    supabase = createClient(supabaseUrl, supabaseKey)
    console.log("Supabase client initialized successfully")

    // Check if tables exist (we'll do this asynchronously)
    checkTablesExist()
  } else {
    console.warn("Supabase URL or key not provided, using fallback data")
  }
} catch (error) {
  console.error("Failed to initialize Supabase client:", error)
}

// Check if required tables exist
async function checkTablesExist() {
  if (!supabase) return

  try {
    // Try to query the rides table
    const { data, error } = await supabase.from("rides").select("id").limit(1)

    // If there's no error, the table exists
    if (!error) {
      tablesExist = true
      console.log("Supabase tables exist and are accessible")
    } else {
      console.warn("Supabase tables do not exist or are not accessible:", error.message)
      console.warn("Using fallback data instead")
    }
  } catch (error) {
    console.error("Error checking if tables exist:", error)
  }
}

// Helper function to check if Supabase is available and tables exist
const isSupabaseReady = () => !!supabase && tablesExist

// Rides table functions
export async function getAllRides() {
  if (!isSupabaseReady()) {
    console.log("Using fallback ride data")
    return fallbackData.rides
  }

  try {
    const { data, error } = await supabase!.from("rides").select("*").order("created_at", { ascending: false })

    if (error) {
      console.error("Error fetching rides:", error)
      return fallbackData.rides
    }

    return data as RideSlot[]
  } catch (error) {
    console.error("Error in getAllRides:", error)
    return fallbackData.rides
  }
}

export async function getRideById(id: string) {
  if (!isSupabaseReady()) {
    const ride = fallbackData.rides.find((ride) => ride.id === id) || null

    // Ensure riders array is always initialized
    if (ride && !Array.isArray(ride.riders)) {
      ride.riders = []
    }

    return ride
  }

  try {
    const { data, error } = await supabase!.from("rides").select("*").eq("id", id).single()

    if (error) {
      console.error("Error fetching ride:", error)
      const fallbackRide = fallbackData.rides.find((ride) => ride.id === id) || null

      // Ensure riders array is always initialized
      if (fallbackRide && !Array.isArray(fallbackRide.riders)) {
        fallbackRide.riders = []
      }

      return fallbackRide
    }

    // Ensure riders array is always initialized
    if (data && !Array.isArray(data.riders)) {
      data.riders = []
    }

    return data as RideSlot
  } catch (error) {
    console.error("Error in getRideById:", error)
    const fallbackRide = fallbackData.rides.find((ride) => ride.id === id) || null

    // Ensure riders array is always initialized
    if (fallbackRide && !Array.isArray(fallbackRide.riders)) {
      fallbackRide.riders = []
    }

    return fallbackRide
  }
}

export async function createRide(ride: Omit<RideSlot, "id">) {
  if (!isSupabaseReady()) {
    const newRide = {
      ...ride,
      id: `local-${Date.now()}`,
    }
    fallbackData.rides.push(newRide as RideSlot)

    // Track this ride as created by the user
    if (!fallbackData.userRides[ride.createdBy]) {
      fallbackData.userRides[ride.createdBy] = []
    }
    fallbackData.userRides[ride.createdBy].push(newRide.id)

    return newRide as RideSlot
  }

  try {
    const { data, error } = await supabase!.from("rides").insert([ride]).select().single()

    if (error) {
      console.error("Error creating ride:", error)
      // Fallback to local creation
      const newRide = {
        ...ride,
        id: `local-${Date.now()}`,
      }
      fallbackData.rides.push(newRide as RideSlot)
      return newRide as RideSlot
    }

    return data as RideSlot
  } catch (error) {
    console.error("Error in createRide:", error)
    // Fallback to local creation
    const newRide = {
      ...ride,
      id: `local-${Date.now()}`,
    }
    fallbackData.rides.push(newRide as RideSlot)
    return newRide as RideSlot
  }
}

export async function updateRide(id: string, updates: Partial<RideSlot>) {
  if (!isSupabaseReady()) {
    const rideIndex = fallbackData.rides.findIndex((ride) => ride.id === id)
    if (rideIndex >= 0) {
      fallbackData.rides[rideIndex] = {
        ...fallbackData.rides[rideIndex],
        ...updates,
      }
      return fallbackData.rides[rideIndex]
    }
    return null
  }

  try {
    const { data, error } = await supabase!.from("rides").update(updates).eq("id", id).select().single()

    if (error) {
      console.error("Error updating ride:", error)
      // Fallback to local update
      const rideIndex = fallbackData.rides.findIndex((ride) => ride.id === id)
      if (rideIndex >= 0) {
        fallbackData.rides[rideIndex] = {
          ...fallbackData.rides[rideIndex],
          ...updates,
        }
        return fallbackData.rides[rideIndex]
      }
      return null
    }

    return data as RideSlot
  } catch (error) {
    console.error("Error in updateRide:", error)
    // Fallback to local update
    const rideIndex = fallbackData.rides.findIndex((ride) => ride.id === id)
    if (rideIndex >= 0) {
      fallbackData.rides[rideIndex] = {
        ...fallbackData.rides[rideIndex],
        ...updates,
      }
      return fallbackData.rides[rideIndex]
    }
    return null
  }
}

export async function joinRide(rideId: string, rider: Rider) {
  if (!isSupabaseReady()) {
    const rideIndex = fallbackData.rides.findIndex((ride) => ride.id === rideId)
    if (rideIndex < 0) return null

    const ride = fallbackData.rides[rideIndex]

    // Check if rider is already in the ride
    const existingRiderIndex = ride.riders.findIndex((r) => r.id === rider.id)
    const updatedRiders = [...ride.riders]

    if (existingRiderIndex >= 0) {
      // Update existing rider
      updatedRiders[existingRiderIndex] = rider
    } else {
      // Add new rider
      updatedRiders.push(rider)
    }

    // Update available seats
    const availableSeats = Math.max(0, ride.maxRiders - updatedRiders.length)

    // Update the ride
    fallbackData.rides[rideIndex] = {
      ...ride,
      riders: updatedRiders,
      availableSeats,
    }

    // Track this ride as joined by the user
    if (!fallbackData.joinedRides[rider.id]) {
      fallbackData.joinedRides[rider.id] = []
    }
    if (!fallbackData.joinedRides[rider.id].includes(rideId)) {
      fallbackData.joinedRides[rider.id].push(rideId)
    }

    return fallbackData.rides[rideIndex]
  }

  // First get the current ride
  const ride = await getRideById(rideId)

  if (!ride) {
    return null
  }

  // Check if rider is already in the ride
  const existingRiderIndex = ride.riders.findIndex((r) => r.id === rider.id)
  const updatedRiders = [...ride.riders]

  if (existingRiderIndex >= 0) {
    // Update existing rider
    updatedRiders[existingRiderIndex] = rider
  } else {
    // Add new rider
    updatedRiders.push(rider)
  }

  // Update available seats
  const availableSeats = Math.max(0, ride.maxRiders - updatedRiders.length)

  // Update the ride
  return updateRide(rideId, {
    riders: updatedRiders,
    availableSeats,
  })
}

// User rides functions
export async function getRidesByUser(userId: string) {
  if (!isSupabaseReady()) {
    // Make sure we return an array
    return fallbackData.rides.filter((ride) => ride.createdBy === userId) || []
  }

  try {
    const { data, error } = await supabase!
      .from("rides")
      .select("*")
      .eq("createdBy", userId)
      .order("created_at", { ascending: false })

    if (error) {
      console.error("Error fetching user rides:", error)
      return fallbackData.rides.filter((ride) => ride.createdBy === userId) || []
    }

    // Ensure we return an array
    return Array.isArray(data) ? (data as RideSlot[]) : []
  } catch (error) {
    console.error("Error in getRidesByUser:", error)
    return fallbackData.rides.filter((ride) => ride.createdBy === userId) || []
  }
}

export async function getRidesJoinedByUser(userId: string) {
  if (!isSupabaseReady()) {
    // Make sure we return an array
    return (
      fallbackData.rides.filter((ride) => ride.riders.some((r) => r.id === userId) && ride.createdBy !== userId) || []
    )
  }

  try {
    const { data, error } = await supabase!
      .from("rides")
      .select("*")
      .filter("riders", "cs", `{"id":"${userId}"}`)
      .not("createdBy", "eq", userId)
      .order("created_at", { ascending: false })

    if (error) {
      console.error("Error fetching joined rides:", error)
      return (
        fallbackData.rides.filter((ride) => ride.riders.some((r) => r.id === userId) && ride.createdBy !== userId) || []
      )
    }

    // Ensure we return an array
    return Array.isArray(data) ? (data as RideSlot[]) : []
  } catch (error) {
    console.error("Error in getRidesJoinedByUser:", error)
    return (
      fallbackData.rides.filter((ride) => ride.riders.some((r) => r.id === userId) && ride.createdBy !== userId) || []
    )
  }
}

// User ride count functions
export async function getUserRideCount(userId: string) {
  if (!isSupabaseReady()) {
    return fallbackData.userRideCount[userId] || 0
  }

  try {
    const { data, error } = await supabase!.from("user_stats").select("ride_count").eq("user_id", userId).single()

    if (error) {
      if (error.code === "PGRST116") {
        // No record found, create one
        try {
          await supabase!.from("user_stats").insert([{ user_id: userId, ride_count: 0 }])
        } catch (insertError) {
          console.error("Error creating user stats record:", insertError)
          // If table doesn't exist, fall back to local data
          return fallbackData.userRideCount[userId] || 0
        }
        return 0
      }
      console.error("Error fetching user ride count:", error)
      return fallbackData.userRideCount[userId] || 0
    }

    return data.ride_count
  } catch (error) {
    console.error("Error in getUserRideCount:", error)
    return fallbackData.userRideCount[userId] || 0
  }
}

export async function incrementUserRideCount(userId: string) {
  if (!isSupabaseReady()) {
    fallbackData.userRideCount[userId] = (fallbackData.userRideCount[userId] || 0) + 1
    return fallbackData.userRideCount[userId]
  }

  try {
    const currentCount = await getUserRideCount(userId)

    const { data, error } = await supabase!
      .from("user_stats")
      .update({ ride_count: currentCount + 1 })
      .eq("user_id", userId)
      .select()
      .single()

    if (error) {
      console.error("Error updating user ride count:", error)
      fallbackData.userRideCount[userId] = (fallbackData.userRideCount[userId] || 0) + 1
      return fallbackData.userRideCount[userId]
    }

    return data.ride_count
  } catch (error) {
    console.error("Error in incrementUserRideCount:", error)
    fallbackData.userRideCount[userId] = (fallbackData.userRideCount[userId] || 0) + 1
    return fallbackData.userRideCount[userId]
  }
}

export async function isEligibleForFreeRide(userId: string) {
  const rideCount = await getUserRideCount(userId)
  return rideCount < 3 // First 3 rides are free
}

export async function getRidePriceForUser(userId: string, basePrice: number) {
  const isEligible = await isEligibleForFreeRide(userId)
  return isEligible ? 0 : basePrice
}

// Real-time subscriptions
export function subscribeToRide(rideId: string, callback: (ride: RideSlot) => void) {
  if (!isSupabaseReady()) {
    // For fallback, we'll just return a dummy unsubscribe function
    // In a real app, you might implement a polling mechanism here
    console.log("Real-time subscriptions not available in fallback mode")
    return {
      unsubscribe: () => {},
    }
  }

  return supabase!
    .channel(`ride:${rideId}`)
    .on(
      "postgres_changes",
      {
        event: "UPDATE",
        schema: "public",
        table: "rides",
        filter: `id=eq.${rideId}`,
      },
      (payload) => {
        callback(payload.new as RideSlot)
      },
    )
    .subscribe()
}

export function subscribeToRides(callback: (rides: RideSlot[]) => void) {
  // Initial fetch
  getAllRides().then(callback)

  if (!isSupabaseReady()) {
    // For fallback, we'll just return a dummy unsubscribe function
    console.log("Real-time subscriptions not available in fallback mode")
    return {
      unsubscribe: () => {},
    }
  }

  // Subscribe to changes
  return supabase!
    .channel("rides")
    .on(
      "postgres_changes",
      {
        event: "*",
        schema: "public",
        table: "rides",
      },
      () => {
        // Refetch all rides when any change happens
        getAllRides().then(callback)
      },
    )
    .subscribe()
}

