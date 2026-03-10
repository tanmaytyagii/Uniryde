"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

// Define simple types
interface Rider {
  id: string
  name: string
  status: string
}

interface RideDetails {
  id: string
  date: string
  waitingTime: string
  from: string
  to: string
  price: number
  riders: Rider[]
}

export default function RideDetailContent({ id }: { id: string }) {
  const router = useRouter()
  const [rideDetails, setRideDetails] = useState<RideDetails | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate loading ride details
    setTimeout(() => {
      setRideDetails({
        id: id,
        date: "22 March, 8:00 A.M",
        waitingTime: "30 minutes",
        from: "DLF Mall Of Noida",
        to: "Bennett University",
        price: 10,
        riders: [
          { id: "1", name: "Shivam Singh", status: "Confirmed" },
          { id: "2", name: "Sneha Verma", status: "Joining" },
          { id: "3", name: "Kartik Kumar", status: "Joined" },
        ],
      })
      setIsLoading(false)
    }, 500)
  }, [id])

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    )
  }

  if (!rideDetails) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold">Ride not found</h2>
          <Link href="/home" className="mt-4 inline-block bg-blue-500 text-white px-4 py-2 rounded">
            Go back home
          </Link>
        </div>
      </div>
    )
  }

  return (
    <main className="flex min-h-screen flex-col bg-white">
      <header className="p-4 flex items-center">
        <button onClick={() => router.back()} className="mr-2 p-2 rounded-full hover:bg-gray-100">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="m12 19-7-7 7-7" />
            <path d="M19 12H5" />
          </svg>
        </button>
        <h1 className="font-semibold text-lg">Ride Details</h1>
      </header>

      <div className="h-64 w-full bg-gray-200 flex items-center justify-center">
        <p className="text-gray-500">Map View</p>
      </div>

      <div className="p-4">
        <div className="mb-6">
          <h2 className="text-xl font-semibold">{rideDetails.date}</h2>
          <p className="text-sm text-gray-500">Waiting Time: {rideDetails.waitingTime}</p>
        </div>

        <div className="space-y-4 mb-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
            </div>
            <div>
              <p className="text-sm text-gray-500">{rideDetails.from}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-orange-500 flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
            </div>
            <div>
              <p className="text-sm text-gray-500">{rideDetails.to}</p>
            </div>
          </div>
        </div>

        <div className="mb-6">
          <h3 className="font-semibold mb-2">Riders</h3>
          <div className="space-y-3">
            {rideDetails.riders.map((rider) => (
              <div key={rider.id} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded-full bg-gray-200"></div>
                  <div>
                    <p className="text-sm font-medium">{rider.name}</p>
                  </div>
                </div>
                <div
                  className={`px-2 py-1 rounded-full text-xs font-medium
                    ${rider.status === "Confirmed" ? "bg-green-100 text-green-800" : ""}
                    ${rider.status === "Joining" ? "bg-yellow-100 text-yellow-800" : ""}
                    ${rider.status === "Joined" ? "bg-blue-100 text-blue-800" : ""}
                  `}
                >
                  {rider.status}
                </div>
              </div>
            ))}
          </div>
        </div>

        <Link
          href={`/payment/${id}`}
          className="w-full bg-green-500 hover:bg-green-600 text-white py-2 rounded flex items-center justify-center"
        >
          Book
        </Link>
      </div>
    </main>
  )
}

