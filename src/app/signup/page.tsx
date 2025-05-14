// src/app/signup/page.tsx
"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Eye, EyeOff } from "lucide-react"
import { useRouter } from "next/navigation"
import { signIn } from "next-auth/react" // Add this import

export default function Signup() {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    agreeToTerms: false,
  })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  // Add this function for Google sign in
  const handleGoogleSignIn = async () => {
    try {
      await signIn("google", { callbackUrl: "/dashboard" })
    } catch (err) {
      console.error("Google sign in error:", err)
      setError(err instanceof Error ? err.message : "An unexpected error occurred")
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    try {
      const response = await fetch("/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: formData.username,
          email: formData.email,
          password: formData.password,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Failed to create account")
      }

      // If signup successful, redirect to login page
      alert("Account created successfully! Please check your email to verify your account.")
      router.push("/login")
    } catch (err) {
      console.error("Signup error:", err)
      setError(err instanceof Error ? err.message : "An unexpected error occurred")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-white flex flex-col lg:flex-row">
      {/* Left Side - Signup Form */}
      <div className="relative flex flex-col w-full lg:w-1/2 px-6 py-8 md:px-8 lg:px-12 order-2 lg:order-1">
        <div className="w-full max-w-md mx-auto flex flex-col justify-center h-full">
          <h1 className="text-2xl font-bold text-[#0D0B21] mb-2">Sign Up</h1>
          <p className="text-gray-500 mb-6">Enter your email and password to sign up!</p>

          {/* Social Login Buttons */}
          <div className="flex gap-4 mb-6">
            <button 
              type="button" 
              onClick={handleGoogleSignIn} // Add this onClick handler
              className="flex-1 flex items-center justify-center gap-2 bg-[#B25CD9] hover:bg-purple-700 text-white py-2.5 px-4 rounded-md transition-colors"
            >
              <span>G</span>
            </button>
            <button type="button" className="flex-1 flex items-center justify-center gap-2 bg-[#F4F7FE] hover:bg-gray-100 text-gray-700 py-2.5 px-4 rounded-md transition-colors">
              <span>Apple</span>
            </button>
          </div>

          <div className="relative flex items-center mb-6">
            <div className="flex-grow border-t border-gray-300"></div>
            <span className="flex-shrink mx-4 text-gray-400 text-sm">or</span>
            <div className="flex-grow border-t border-gray-300"></div>
          </div>

          {/* Error message */}
          {error && (
            <div className="mb-4 p-3 bg-red-100 border border-red-300 text-red-700 rounded">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
                Username*
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  placeholder="johndoe"
                  className="w-full px-3 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-purple-500"
                  required
                />
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email*
              </label>
              <div className="mt-1">
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="mail@simmmple.com"
                  className="w-full px-3 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-purple-500"
                  required
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Password*
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

            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  id="terms"
                  name="agreeToTerms"
                  type="checkbox"
                  checked={formData.agreeToTerms}
                  onChange={handleChange}
                  className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
                  required
                />
              </div>
              <label htmlFor="terms" className="ml-2 block text-sm text-gray-700">
                I agree to Joss AI{" "}
                <Link href="/terms" className="text-purple-600 hover:underline">
                  Terms
                </Link>{" "}
                &{" "}
                <Link href="/privacy" className="text-purple-600 hover:underline">
                  Privacy Policy
                </Link>
              </label>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className={`w-full bg-[#B25CD9] text-white py-2.5 rounded-md hover:bg-purple-700 transition-colors font-medium ${
                isLoading ? "opacity-70 cursor-not-allowed" : ""
              }`}
            >
              {isLoading ? "Creating Account..." : "Sign Up"}
            </button>
          </form>

          <p className="text-center text-gray-600 mt-6">
            Do you have an account?{" "}
            <Link href="/login" className="text-purple-600 hover:underline">
              Sign In
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