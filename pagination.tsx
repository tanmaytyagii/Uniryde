"use client"

import type React from "react"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"

export default function SignupPage() {
  const router = useRouter()
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  function handleSignup(e: React.FormEvent) {
    e.preventDefault()

    // Simple signup - just store a flag in localStorage
    localStorage.setItem("uniryde_logged_in", "true")
    router.push("/home")
  }

  function handleMicrosoftLogin() {
    localStorage.setItem("uniryde_logged_in", "true")
    router.push("/home")
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-start p-6 bg-white">
      <div className="w-full max-w-md">
        <div className="mb-6">
          <button
            onClick={() => router.back()}
            className="p-0 h-8 w-8 flex items-center justify-center rounded-full hover:bg-gray-100"
          >
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
        </div>

        <div className="flex justify-center mb-6">
          <div className="flex space-x-3">
            <div className="w-12 h-12 rounded-full bg-gray-200"></div>
            <div className="w-12 h-12 rounded-full bg-gray-200"></div>
            <div className="w-12 h-12 rounded-full bg-gray-200"></div>
            <div className="w-12 h-12 rounded-full bg-gray-200"></div>
          </div>
        </div>

        <h1 className="text-2xl font-semibold text-center mb-6">Let&apos;s Sign you up.</h1>

        <form onSubmit={handleSignup} className="space-y-4">
          <div>
            <p className="text-xs text-gray-500 mb-1">Name</p>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-green-50 border-0 rounded-xl p-2"
              placeholder="Enter your full name"
            />
          </div>

          <div>
            <p className="text-xs text-gray-500 mb-1">Email</p>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-green-50 border-0 rounded-xl p-2"
              placeholder="Enter your email"
            />
          </div>

          <div>
            <p className="text-xs text-gray-500 mb-1">Password</p>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-green-50 border-0 rounded-xl p-2"
              placeholder="Create a password"
            />
          </div>

          <div className="pt-4">
            <button type="submit" className="w-full bg-black text-white hover:bg-gray-800 rounded-xl p-2">
              REGISTER
            </button>
          </div>
        </form>

        <div className="mt-6 relative flex items-center justify-center">
          <div className="border-t border-gray-300 w-full absolute"></div>
          <span className="bg-white px-2 text-xs text-gray-500 relative">or sign up with</span>
        </div>

        <div className="flex justify-center space-x-4 mt-6">
          <button
            className="rounded-full border border-gray-300 h-10 w-10 flex items-center justify-center"
            onClick={handleMicrosoftLogin}
          >
            <span className="text-xs">MS</span>
          </button>
          <button className="rounded-full border border-gray-300 h-10 w-10 flex items-center justify-center">
            <span className="text-xs">G</span>
          </button>
          <button className="rounded-full border border-gray-300 h-10 w-10 flex items-center justify-center">
            <span className="text-xs">FB</span>
          </button>
        </div>

        <div className="mt-8 text-center">
          <p className="text-sm">
            Already have an account?{" "}
            <Link href="/login" className="text-blue-600 font-medium">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </main>
  )
}

