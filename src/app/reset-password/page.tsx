// src/app/reset-password/page.tsx
"use client"

import { useState, useEffect, Suspense } from "react"
import Image from "next/image"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { Eye, EyeOff } from "lucide-react"

// Create a separate component that uses useSearchParams
function ResetPasswordForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [token, setToken] = useState("")
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  })
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [successMessage, setSuccessMessage] = useState("")

  useEffect(() => {
    // Get token from URL
    const tokenFromUrl = searchParams.get("token")
    if (tokenFromUrl) {
      setToken(tokenFromUrl)
    } else {
      setError("Invalid or missing reset token")
    }
  }, [searchParams])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
    // Clear errors when user types
    if (error) setError("")
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Check if passwords match
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match")
      return
    }
    
    // Check password length
    if (formData.password.length < 8) {
      setError("Password must be at least 8 characters")
      return
    }
    
    setIsLoading(true)
    setError("")
    setSuccessMessage("")

    try {
      const response = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token,
          password: formData.password,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Failed to reset password")
      }

      setSuccessMessage("Password reset successful! Redirecting to login...")
      
      // Clear form
      setFormData({
        password: "",
        confirmPassword: "",
      })
      
      // Redirect to login after 2 seconds
      setTimeout(() => {
        router.push("/login")
      }, 2000)
    } catch (err) {
      console.error("Password reset error:", err)
      setError(err instanceof Error ? err.message : "An unexpected error occurred")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="w-full max-w-md mx-auto flex flex-col justify-center h-full">
      <h1 className="text-2xl font-bold text-[#0D0B21] mb-2">Reset Password</h1>
      <p className="text-gray-500 mb-6">Enter your new password below</p>

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
          <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
            New Password*
          </label>
          <div className="mt-1 relative">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Min. 8 characters"
              className="w-full px-3 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-purple-500"
              minLength={8}
              required
              disabled={!token || isLoading}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 px-4 flex items-center focus:outline-none"
            >
              {showPassword ? (
                <EyeOff className="h-5 w-5 text-gray-500" />
              ) : (
                <Eye className="h-5 w-5 text-gray-500" />
              )}
            </button>
          </div>
        </div>

        <div>
          <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
            Confirm Password*
          </label>
          <div className="mt-1 relative">
            <input
              type={showPassword ? "text" : "password"}
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm your password"
              className="w-full px-3 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-purple-500"
              minLength={8}
              required
              disabled={!token || isLoading}
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={!token || isLoading}
          className={`w-full bg-[#B25CD9] text-white py-2.5 rounded-md hover:bg-purple-700 transition-colors font-medium ${
            (!token || isLoading) ? "opacity-70 cursor-not-allowed" : ""
          }`}
        >
          {isLoading ? "Resetting..." : "Reset Password"}
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
  )
}

// Loading fallback for suspense
function LoadingResetForm() {
  return (
    <div className="w-full max-w-md mx-auto flex flex-col justify-center h-full">
      <h1 className="text-2xl font-bold text-[#0D0B21] mb-2">Reset Password</h1>
      <p className="text-gray-500 mb-6">Loading reset form...</p>
      <div className="flex justify-center">
        <div className="w-8 h-8 border-4 border-purple-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    </div>
  )
}

// Main component with Suspense wrapper
export default function ResetPassword() {
  return (
    <div className="min-h-screen bg-white flex flex-col lg:flex-row">
      {/* Left Side - Form */}
      <div className="relative flex flex-col w-full lg:w-1/2 px-6 py-8 md:px-8 lg:px-12 order-2 lg:order-1">
        <Suspense fallback={<LoadingResetForm />}>
          <ResetPasswordForm />
        </Suspense>
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