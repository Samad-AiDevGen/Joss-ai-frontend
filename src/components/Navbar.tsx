"use client"

import Image from "next/image"
import Link from "next/link"
import { useRouter, usePathname } from "next/navigation"

export default function Navbar() {
  const router = useRouter()
  const pathname = usePathname()

  return (
    <nav className="w-full max-w-[1440px] h-auto min-h-[74px] flex flex-col md:flex-row justify-between items-center border-b-2 border-gray-200 py-[15px] px-4 md:px-[80px] relative z-10">
      <div className="flex items-center mb-4 md:mb-0">
        <div className="flex items-center">
          <Image src="/joss-logo.png" alt="JOSS Logo" width={80} height={30} priority />
        </div>
      </div>

      {/* Improved spacing for mobile */}
      <div className="flex space-x-6 md:space-x-8 mb-4 md:mb-0">
        <Link
          href="/"
          className={`font-poppins text-sm relative ${pathname === "/" ? 'after:absolute after:content-[""] after:h-[3px] after:w-full after:bg-[#4338CA] after:bottom-[-18px] after:left-0' : ""}`}
        >
          Home
        </Link>
        <Link
          href="/about-us"
          className={`font-poppins text-sm relative ${pathname === "/about-us" ? 'after:absolute after:content-[""] after:h-[3px] after:w-full after:bg-[#4338CA] after:bottom-[-18px] after:left-0' : ""}`}
        >
          About Us
        </Link>
        <Link
          href="/contact-us"
          className={`font-poppins text-sm relative ${pathname === "/contact-us" ? 'after:absolute after:content-[""] after:h-[3px] after:w-full after:bg-[#4338CA] after:bottom-[-18px] after:left-0' : ""}`}
        >
          Contact
        </Link>
      </div>

      {/* Improved spacing for mobile */}
      <div className="flex items-center space-x-4 md:space-x-4">
        <Link href="/login" className="font-poppins text-sm text-purple-600">
          Login
        </Link>
        <Link href="/signup" className="font-poppins text-sm text-purple-600">
          Sign Up
        </Link>
        <button
          className="bg-purple-600 text-white font-poppins text-sm py-2 px-4 rounded-md"
          onClick={() => router.push("/download")}
        >
          Download App
        </button>
      </div>
    </nav>
  )
}
