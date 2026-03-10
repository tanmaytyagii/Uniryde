"use client"

import { useRouter } from "next/navigation"
import { useState } from "react"

export default function ProfileContent() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("account")

  function handleLogout() {
    if (typeof window !== "undefined") {
      localStorage.removeItem("uniryde_logged_in")
      router.push("/login")
    }
  }

  return (
    <main className="flex min-h-screen flex-col bg-white">
      <header className="p-4 flex items-center justify-between">
        <div className="flex items-center">
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
          <h1 className="font-semibold text-lg">Uniryde Account</h1>
        </div>
      </header>

      <div className="w-full border-b">
        <div className="grid w-full grid-cols-3">
          <button
            className={`py-2 text-center ${activeTab === "account" ? "border-b-2 border-blue-500 font-medium" : ""}`}
            onClick={() => setActiveTab("account")}
          >
            Account Info
          </button>
          <button
            className={`py-2 text-center ${activeTab === "security" ? "border-b-2 border-blue-500 font-medium" : ""}`}
            onClick={() => setActiveTab("security")}
          >
            Security
          </button>
          <button
            className={`py-2 text-center ${activeTab === "privacy" ? "border-b-2 border-blue-500 font-medium" : ""}`}
            onClick={() => setActiveTab("privacy")}
          >
            Privacy & Data
          </button>
        </div>
      </div>

      {activeTab === "account" && (
        <div className="p-4">
          <div className="flex flex-col items-center mb-6">
            <div className="h-24 w-24 rounded-full bg-gray-200 mb-3"></div>
            <h2 className="text-xl font-semibold">Aryan Khanna</h2>
            <div className="flex items-center mt-1">
              <div className="text-sm text-gray-500">4.5</div>
              <div className="flex ml-1">
                {[1, 2, 3, 4].map((star) => (
                  <svg key={star} className="w-3 h-3 text-yellow-500 fill-current" viewBox="0 0 24 24">
                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                  </svg>
                ))}
                <svg className="w-3 h-3 text-gray-300 fill-current" viewBox="0 0 24 24">
                  <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="mb-6">
            <h3 className="font-semibold mb-3">Account Info</h3>
            <div className="bg-gray-50 rounded-xl p-4">
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-500">Name</p>
                  <p className="font-medium">Aryan Khanna</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Phone number</p>
                  <div className="flex items-center">
                    <p className="font-medium">+91 9999999999</p>
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
                      className="text-green-500 ml-2"
                    >
                      <path d="M20 6 9 17l-5-5" />
                    </svg>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Email</p>
                  <p className="font-medium">aryan.khanna@gmail.com</p>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <button className="w-full mt-6 bg-red-500 text-white py-2 rounded-lg" onClick={handleLogout}>
              Logout
            </button>
          </div>
        </div>
      )}

      {activeTab === "security" && (
        <div className="p-4">
          <h3 className="font-semibold mb-3">Security Settings</h3>
          <div className="space-y-4">
            <div className="bg-gray-50 rounded-xl p-4">
              <h4 className="font-medium mb-2">Two-Factor Authentication</h4>
              <p className="text-sm text-gray-500 mb-3">Add an extra layer of security to your account</p>
              <button className="border rounded-md px-3 py-1 text-sm">Enable 2FA</button>
            </div>

            <div className="bg-gray-50 rounded-xl p-4">
              <h4 className="font-medium mb-2">Password</h4>
              <p className="text-sm text-gray-500 mb-3">Change your password</p>
              <button className="border rounded-md px-3 py-1 text-sm">Update Password</button>
            </div>
          </div>
        </div>
      )}

      {activeTab === "privacy" && (
        <div className="p-4">
          <h3 className="font-semibold mb-3">Privacy & Data</h3>
          <div className="space-y-4">
            <div className="bg-gray-50 rounded-xl p-4">
              <h4 className="font-medium mb-2">Privacy Settings</h4>
              <p className="text-sm text-gray-500 mb-3">Control who can see your profile information</p>
              <button className="border rounded-md px-3 py-1 text-sm">Manage Privacy</button>
            </div>

            <div className="bg-gray-50 rounded-xl p-4">
              <h4 className="font-medium mb-2">Data Usage</h4>
              <p className="text-sm text-gray-500 mb-3">Manage how your data is used</p>
              <button className="border rounded-md px-3 py-1 text-sm">Data Settings</button>
            </div>
          </div>
        </div>
      )}
    </main>
  )
}

