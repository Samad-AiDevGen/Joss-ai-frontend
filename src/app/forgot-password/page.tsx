// src/app/forgot-password/page.tsx
"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
// import { useRouter } from "next/navigation"

export default function ForgotPassword() {
//   const router = useRouter()
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [successMessage, setSuccessMessage] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")
    setSuccessMessage("")

    try {
      const response = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Failed to process request")
      }

      setSuccessMessage(data.message || "If your email is registered with us, you will receive a password reset link shortly.")
      setEmail("")
    } catch (err) {
      console.error("Forgot password error:", err)
      setError(err instanceof Error ? err.message : "An unexpected error occurred")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-white flex flex-col lg:flex-row">
      {/* Left Side - Form */}
      <div className="relative flex flex-col w-full lg:w-1/2 px-6 py-8 md:px-8 lg:px-12 order-2 lg:order-1">
        <div className="w-full max-w-md mx-auto flex flex-col justify-center h-full">
          <h1 className="text-2xl font-bold text-[#0D0B21] mb-2">Forgot Password</h1>
          <p className="text-gray-500 mb-6">Enter your email to receive a password reset link</p>

          {/* Error message */}
          {error && (
            <div className="mb-4 p-3 bg-red-100 border border-red-300 text-red-700 rounded">
              {error}
            </div>
          )}

          {/* Success message */}
          {successMessage && (
            <div className="mb-4 p-3 bg-green-100 border border-green-300 text-green-700 rounded">
              {successMessage}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email*
              </label>
              <div className="mt-1">
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className="w-full px-3 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-purple-500"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className={`w-full bg-[#B25CD9] text-white py-2.5 rounded-md hover:bg-purple-700 transition-colors font-medium ${
                isLoading ? "opacity-70 cursor-not-allowed" : ""
              }`}
            >
              {isLoading ? "Sending..." : "Send Reset Link"}
            </button>
          </form>

          <p className="text-center text-gray-600 mt-6">
            Remember your password?{" "}
            <Link href="/login" className="text-purple-600 hover:underline">
              Back to Sign In
            </Link>
          </p>

          <p className="text-center text-xs text-gray-400 mt-8">© 2024 Joss AI. All rights Reserved.</p>
        </div>
      </div>

      {/* Right Side - Image */}
      <div className="relative w-full lg:w-1/2 h-[30vh] md:h-[40vh] lg:h-screen order-1 lg:order-2 overflow-hidden">
        <Image
          src="/Right.png"
          alt="Joss AI"
          fill
          className="object-contain object-center"
          priority
          sizes="(max-width: 1024px) 100vw, 50vw"
          quality={100}
        />
      </div>
    </div>
  )
}