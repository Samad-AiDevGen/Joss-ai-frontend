"use client"

import type React from "react"
import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Phone, MapPin, Mail, Send } from "lucide-react"

export default function ContactUs() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  })

  const [newsletterEmail, setNewsletterEmail] = useState("")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Contact form submitted:", formData)
    // Handle form submission logic here
  }

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Newsletter subscription:", newsletterEmail)
    // Handle newsletter subscription logic here
  }

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="flex items-center justify-between px-8 py-4 border-b">
        <div className="flex items-center">
          <Link href="/">
            <Image src="/joss-logo.png" alt="JOSS Logo" width={100} height={40} />
          </Link>
          <nav className="ml-10">
            <ul className="flex space-x-6">
              <li>
                <Link href="/" className="text-gray-600 hover:text-purple-600">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-600 hover:text-purple-600">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-purple-600 font-medium">
                  Contact
                </Link>
              </li>
            </ul>
          </nav>
        </div>
        <div className="flex items-center space-x-4">
          <Link href="/login" className="text-gray-600 hover:text-purple-600">
            Sign In
          </Link>
          <Link
            href="/signup"
            className="bg-[#B25CD9] text-white px-4 py-2 rounded-md hover:bg-purple-700 transition-colors"
          >
            Create Account
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <div className="relative w-full h-[320px] bg-[#4F46E5]">
        <div className="absolute inset-0 flex items-center">
          <div className="container mx-auto px-8">
            <div className="max-w-lg">
              <h1 className="text-4xl font-bold text-white mb-2">Contact Us</h1>
              <p className="text-white/80">We&apos;re here for you</p>
            </div>
          </div>
          <div className="absolute right-0 top-0 h-full w-1/3">
            <Image
              src="/customer-service-representative.png"
              alt="Customer Support"
              width={320}
              height={320}
              className="h-full w-full object-cover rounded-l-full"
            />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-grow">
        {/* Feel Free to Contact Section */}
        <section className="container mx-auto px-8 py-12">
          <h2 className="text-2xl font-bold text-center mb-6">Feel free to contact</h2>
          <p className="text-gray-600 max-w-3xl mx-auto text-center mb-12">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin vitae sapien hendrerit, dignissim erat sit
            amet, rhoncus nibh. Cras sagittatis erat in tortor. Vestibulum ante ipsum primis in faucibus orci luctus et
            ultrices posuere cubilia curae; Fusce a ante euismod, rhoncus tortor et, porta enim. Aenean a sem finibus,
            pulvinar dolor a, elementum velit.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="bg-white rounded-lg shadow-sm p-8">
              <h3 className="text-xl font-semibold mb-6">Let&apos;s talk with us</h3>
              <p className="text-gray-600 mb-6">
                Send us a message, feedback, or suggestion so that we can help you with your project or answer any
                questions.
              </p>

              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Name"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                    required
                  />
                </div>

                <div className="mb-4">
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Email"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                    required
                  />
                </div>

                <div className="mb-4">
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Phone Number"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>

                <div className="mb-6">
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Your Message"
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#B25CD9] text-white py-3 rounded-md hover:bg-purple-700 transition-colors flex items-center justify-center"
                >
                  <Send className="h-4 w-4 mr-2" />
                  Send Message
                </button>
              </form>
            </div>

            {/* Contact Information */}
            <div className="flex flex-col justify-center">
              <div className="mb-8">
                <div className="flex items-start mb-4">
                  <div className="bg-purple-100 p-3 rounded-full mr-4">
                    <MapPin className="h-6 w-6 text-purple-600" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 mb-1">Our Location</h4>
                    <p className="text-gray-600">Lorem ipsum is simply dummy text of the printing</p>
                  </div>
                </div>
              </div>

              <div className="mb-8">
                <div className="flex items-start mb-4">
                  <div className="bg-purple-100 p-3 rounded-full mr-4">
                    <Phone className="h-6 w-6 text-purple-600" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 mb-1">Phone Number</h4>
                    <p className="text-gray-600">+123 456 789</p>
                  </div>
                </div>
              </div>

              <div className="mb-8">
                <div className="flex items-start mb-4">
                  <div className="bg-purple-100 p-3 rounded-full mr-4">
                    <Mail className="h-6 w-6 text-purple-600" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 mb-1">Email Address</h4>
                    <p className="text-gray-600">contact@jossai.com</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Newsletter Section */}
        <section className="relative w-full py-16">
          <div className="absolute inset-0">
            <Image src="/low-bg.png" alt="Newsletter Background" fill className="object-cover" />
          </div>
          <div className="container mx-auto px-8 relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-2xl font-bold text-white mb-4">Subscribe to our Newsletter</h2>
              <p className="text-white/70 mb-8">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin vitae sapien hendrerit, dignissim erat
                sit amet, rhoncus nibh. Cras sagittatis erat in tortor. Vestibulum ante ipsum primis in faucibus orci.
              </p>
              <form onSubmit={handleNewsletterSubmit} className="flex max-w-md mx-auto">
                <input
                  type="email"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="flex-grow px-4 py-2 rounded-l-md focus:outline-none"
                  required
                />
                <button
                  type="submit"
                  className="bg-[#B25CD9] text-white px-6 py-2 rounded-r-md hover:bg-purple-700 transition-colors"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-white py-12 border-t">
        <div className="container mx-auto px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <Image src="/joss-logo.png" alt="JOSS Logo" width={120} height={48} className="mb-4" />
              <p className="text-gray-600 text-sm mb-4">
                Lorem ipsum is simply dummy text of the printing and typesetting industry.
              </p>
            </div>

            <div>
              <h4 className="font-semibold text-gray-900 mb-4">Services</h4>
              <ul className="space-y-2">
                <li>
                  <Link href="/services" className="text-gray-600 hover:text-purple-600 text-sm">
                    AI Solutions
                  </Link>
                </li>
                <li>
                  <Link href="/services" className="text-gray-600 hover:text-purple-600 text-sm">
                    Image to Video
                  </Link>
                </li>
                <li>
                  <Link href="/services" className="text-gray-600 hover:text-purple-600 text-sm">
                    Content Creation
                  </Link>
                </li>
                <li>
                  <Link href="/services" className="text-gray-600 hover:text-purple-600 text-sm">
                    API for Developers
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-gray-900 mb-4">About</h4>
              <ul className="space-y-2">
                <li>
                  <Link href="/about" className="text-gray-600 hover:text-purple-600 text-sm">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="/team" className="text-gray-600 hover:text-purple-600 text-sm">
                    Our Team
                  </Link>
                </li>
                <li>
                  <Link href="/blog" className="text-gray-600 hover:text-purple-600 text-sm">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link href="/careers" className="text-gray-600 hover:text-purple-600 text-sm">
                    Careers
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-gray-900 mb-4">Contact us</h4>
              <p className="text-gray-600 text-sm mb-2">Lorem ipsum is simply dummy text of the printing</p>
              <p className="text-gray-900 font-medium mb-4">+123 456 789</p>
              <div className="flex space-x-4">
                <Link href="#" className="text-gray-400 hover:text-purple-600">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    fill="currentColor"
                    viewBox="0 0 16 16"
                  >
                    <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z" />
                  </svg>
                </Link>
                <Link href="#" className="text-gray-400 hover:text-purple-600">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    fill="currentColor"
                    viewBox="0 0 16 16"
                  >
                    <path d="M5.026 15c6.038 0 9.341-5.003 9.341-9.334 0-.14 0-.282-.006-.422A6.685 6.685 0 0 0 16 3.542a6.658 6.658 0 0 1-1.889.518 3.301 3.301 0 0 0 1.447-1.817 6.533 6.533 0 0 1-2.087.793A3.286 3.286 0 0 0 7.875 6.03a9.325 9.325 0 0 1-6.767-3.429 3.289 3.289 0 0 0 1.018 4.382A3.323 3.323 0 0 1 .64 6.575v.045a3.288 3.288 0 0 0 2.632 3.218 3.203 3.203 0 0 1-.865.115 3.23 3.23 0 0 1-.614-.057 3.283 3.283 0 0 0 3.067 2.277A6.588 6.588 0 0 1 .78 13.58a6.32 6.32 0 0 1-.78-.045A9.344 9.344 0 0 0 5.026 15z" />
                  </svg>
                </Link>
                <Link href="#" className="text-gray-400 hover:text-purple-600">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    fill="currentColor"
                    viewBox="0 0 16 16"
                  >
                    <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.917 3.917 0 0 0-1.417.923A3.927 3.927 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.916 3.916 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.926 3.926 0 0 0-.923-1.417A3.911 3.911 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0h.003zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599.28.28.453.546.598.92.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.47 2.47 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.478 2.478 0 0 1-.92-.598 2.48 2.48 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233 0-2.136.008-2.388.046-3.231.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92.28-.28.546-.453.92-.598.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045v.002zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92zm-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217zm0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334z" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>

          <div className="border-t mt-12 pt-8 text-center">
            <p className="text-gray-500 text-sm">
              © 2024 Copyright by <span className="font-medium">JOSS AI</span>. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
