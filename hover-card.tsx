"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"

// Define a simple type for ride slots
interface RideSlot {
  id: string
  time: string
  from: string
  to: string
  price: number
  save: string
}

// Sample data
const sampleSlots: RideSlot[] = [
  {
    id: "1",
    time: "8:00 A.M",
    from: "DLF Mall Of Noida",
    to: "Bennett University",
    price: 10,
    save: "₹100/person",
  },
  {
    id: "2",
    time: "12:00 P.M",
    from: "Bennett University",
    to: "",
    price: 10,
    save: "₹100/person",
  },
  {
    id: "3",
    time: "3:00 P.M",
    from: "Sector 18",
    to: "Bennett University",
    price: 15,
    save: "₹150/person",
  },
]

export default function HomeContent() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState<"search" | "create">("search")
  const [fromLocation, setFromLocation] = useState("")
  const [toLocation, setToLocation] = useState("")

  return (
    <main className="flex min-h-screen flex-col bg-white">
      <header className="p-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <button className="rounded-full p-2 hover:bg-gray-100">
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
              <line x1="4" x2="20" y1="12" y2="12" />
              <line x1="4" x2="20" y1="6" y2="6" />
              <line x1="4" x2="20" y1="18" y2="18" />
            </svg>
          </button>
          <h1 className="font-semibold">Where to?</h1>
        </div>
        <Link href="/profile" className="h-8 w-8 rounded-full bg-gray-200 block"></Link>
      </header>

      <div className="px-4 py-2">
        <div className="bg-blue-100 rounded-full p-1 flex mb-4">
          <button
            className={`rounded-full flex-1 py-2 flex items-center justify-center ${activeTab === "search" ? "bg-blue-500 text-white" : "text-gray-700"}`}
            onClick={() => setActiveTab("search")}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="mr-2"
            >
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.3-4.3" />
            </svg>
            Search
          </button>
          <button
            className={`rounded-full flex-1 py-2 flex items-center justify-center ${activeTab === "create" ? "bg-blue-500 text-white" : "text-gray-700"}`}
            onClick={() => setActiveTab("create")}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="mr-2"
            >
              <path d="M5 12h14" />
              <path d="M12 5v14" />
            </svg>
            Create
          </button>
        </div>

        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <div className="flex flex-col items-center">
              <div className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center">
                <div className="w-2 h-2 rounded-full bg-black"></div>
              </div>
              <div className="w-0.5 h-10 bg-gray-300"></div>
              <div className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center">
                <div className="w-2 h-2 rounded-full bg-black"></div>
              </div>
            </div>
            <div className="flex-1 space-y-3">
              <div className="relative">
                <input
                  placeholder="From Location"
                  value={fromLocation}
                  onChange={(e) => setFromLocation(e.target.value)}
                  className="w-full pl-3 pr-10 py-2 border rounded-xl"
                />
                <button className="absolute right-2 top-1/2 transform -translate-y-1/2 h-6 w-6 flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                </button>
              </div>
              <div className="relative">
                <input
                  placeholder="To Location"
                  value={toLocation}
                  onChange={(e) => setToLocation(e.target.value)}
                  className="w-full pl-3 pr-10 py-2 border rounded-xl"
                />
                <button className="absolute right-2 top-1/2 transform -translate-y-1/2 h-6 w-6 flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 bg-gray-50 p-4">
        <div className="bg-pink-50 rounded-xl p-4 mb-4">
          <h2 className="font-semibold mb-2">Upcoming Slots</h2>
          <div className="space-y-3">
            {sampleSlots.map((slot) => (
              <div key={slot.id} className="bg-white rounded-xl p-3 shadow-sm">
                <div className="flex justify-between items-center">
                  <div>
                    <div className="font-semibold">{slot.time}</div>
                    <div className="text-sm text-gray-600">{slot.from}</div>
                    {slot.to && <div className="text-sm text-gray-600">{slot.to}</div>}
                  </div>
                  <div className="text-right">
                    <div className="text-xs text-gray-500">Save</div>
                    <div className="text-xs font-semibold">{slot.save}</div>
                  </div>
                </div>
                <div className="flex justify-between items-center mt-2">
                  <div className="flex items-center">
                    <div className="bg-gray-100 rounded-full px-2 py-0.5 text-xs font-medium">₹{slot.price}</div>
                  </div>
                  <Link
                    href={`/ride/${slot.id}`}
                    className="bg-orange-500 hover:bg-orange-600 text-white rounded-md text-sm px-3 py-1"
                  >
                    Book
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  )
}

