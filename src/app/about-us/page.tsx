"use client"

import Image from "next/image"
import Link from "next/link"
// import { useRouter } from "next/navigation"
import Navbar from "@/components/Navbar"

export default function AboutUs() {
  // const router = useRouter()

  return (
    <main className="flex flex-col items-center w-full bg-white">
      {/* Navigation Bar */}
      <Navbar />

      {/* Hero Section */}
      <section className="w-full bg-[#4338CA] bg-gradient-to-r from-[#4338CA] to-[#6366F1] relative overflow-hidden">
        <div className="max-w-[1440px] mx-auto px-4 md:px-[80px] py-16 md:py-24 flex flex-col md:flex-row items-center justify-between">
          <div className="z-10 mb-8 md:mb-0">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">About Us</h1>
            <p className="text-xl text-white/90">Unveiling the Next Big Thing</p>
          </div>
          {/* Little Issue here background overrides!!!! */}
          {/* <div className="relative w-full md:w-1/2 h-[200px] md:h-[300px]">
            <Image
              src="/ai-robot-computer.png"
              alt="AI robot with computer screen"
              fill
              className="object-contain"
              priority
            />
          </div> */}
        </div>
        {/* Wave pattern overlay */}
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <Image src="/blue-wave-pattern.png" alt="Wave pattern background" fill className="object-cover" />
        </div>
      </section>

      {/* Who We Are Section */}
      <section className="w-full max-w-[1440px] px-4 md:px-[80px] py-16 md:py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-[#0D0B21] mb-8">
          <span className="text-[#B25CD9]">Who</span> we are
        </h2>
        <p className="text-gray-600 text-center max-w-4xl mx-auto">
          Lorem ipsum dolor sit amet consectetur. Tellus velit aliquet pharetra elit malesuada risus dolor. Feugiat amet
          a in sem tortor est pellentesque. Vel augue cras ac est. Nunc vitae ac purus mauris bibendum vitae. Laoreet
          tempor elit justo in orci. Turpis in sed odio facilisi ac suscipit purus pulvinar arcu. Lectus a arci amet et
          dictum tortor praesent nec.
        </p>
        <div className="absolute left-0 opacity-10 pointer-events-none">
          <Image src="/placeholder.svg?key=4yeny" alt="Decorative dots pattern" width={200} height={200} />
        </div>
      </section>

      {/* Services Section */}
      <section className="w-full bg-gray-50 py-16 md:py-24 relative overflow-hidden">
        <div className="max-w-[1440px] mx-auto px-4 md:px-[80px] flex flex-col md:flex-row items-center gap-8 md:gap-16">
          <div className="w-full md:w-1/2 relative">
            <div className="rounded-full overflow-hidden w-full max-w-[500px] h-[400px] relative mx-auto">
              <Image src="/genAi.png" alt="Generative AI laptop interface" fill className="object-cover" />
            </div>
            <div className="absolute -top-10 -left-10 opacity-20 pointer-events-none">
              <Image src="/group82.png" alt="Decorative dots pattern" width={150} height={150} />
            </div>
          </div>
          <div className="w-full md:w-1/2">
            <h2 className="text-3xl md:text-4xl font-bold text-[#0D0B21] mb-4">
              We offer the best <span className="text-[#B25CD9]">Services</span>
            </h2>
            <p className="text-gray-600 mb-8">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin consectetur justo quis euismod vehicula.
              Quisque diam dui, imperdiet et hendrerit in, accumsan tempus erat.Nullam ornare blandit urna.
            </p>
            <ul className="space-y-4">
              <li className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-[#B25CD9] flex items-center justify-center">
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M10 3L4.5 8.5L2 6"
                      stroke="white"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <span className="text-gray-800 font-medium">Post Marital Coaching</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-[#B25CD9] flex items-center justify-center">
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M10 3L4.5 8.5L2 6"
                      stroke="white"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <span className="text-gray-800 font-medium">Pre Marital Coaching</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-[#B25CD9] flex items-center justify-center">
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M10 3L4.5 8.5L2 6"
                      stroke="white"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <span className="text-gray-800 font-medium">Virtual Coaching</span>
              </li>
            </ul>
            <button className="mt-8 bg-[#B25CD9] text-white font-medium py-3 px-6 rounded-md">
              Let&apos;s get started!
            </button>
          </div>
        </div>
        <div className="absolute right-0 bottom-0 opacity-10 pointer-events-none">
          <Image src="/placeholder.svg?key=cnxd9" alt="Decorative dots pattern" width={200} height={200} />
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="w-full max-w-[1440px] px-4 md:px-[80px] py-16 md:py-24 relative">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-[#0D0B21] mb-4">
          What our <span className="text-[#B25CD9]">Customers</span> say about us
        </h2>
        <p className="text-gray-600 text-center max-w-4xl mx-auto mb-16">
          Lorem ipsum dolor sit amet consectetur. Tellus velit aliquet pharetra elit malesuada risus dolor. Feugiat amet
          a in sem tortor est pellentesque. Vel augue cras ac est.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Testimonial 1 */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
                <Image
                  src="/african-man-smiling.png"
                  alt="ChiChi from South Africa"
                  width={48}
                  height={48}
                  className="object-cover"
                />
              </div>
              <div>
                <h3 className="font-bold text-[#0D0B21]">ChiChi</h3>
                <p className="text-sm text-gray-500">South Africa</p>
              </div>
              <div className="ml-auto text-[#B25CD9] text-2xl">&quot;</div>
            </div>
            <p className="text-gray-600">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin consectetur justo quis euismod vehicula.
              Quisque diam dui, imperdiet et.
            </p>
          </div>

          {/* Testimonial 2 */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
                <Image
                  src="/american-woman-smiling.png"
                  alt="Queen Rita from USA"
                  width={48}
                  height={48}
                  className="object-cover"
                />
              </div>
              <div>
                <h3 className="font-bold text-[#0D0B21]">Queen Rita</h3>
                <p className="text-sm text-gray-500">USA</p>
              </div>
              <div className="ml-auto text-[#B25CD9] text-2xl">&quot;</div>
            </div>
            <p className="text-gray-600">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin consectetur justo quis euismod vehicula.
              Quisque diam dui, imperdiet et.
            </p>
          </div>

          {/* Testimonial 3 */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
                <Image src="/hello.png" alt="Gloria Uko from Nigeria" width={48} height={48} className="object-cover" />
              </div>
              <div>
                <h3 className="font-bold text-[#0D0B21]">Gloria Uko</h3>
                <p className="text-sm text-gray-500">Nigeria</p>
              </div>
              <div className="ml-auto text-[#B25CD9] text-2xl">&quot;</div>
            </div>
            <p className="text-gray-600">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin consectetur justo quis euismod vehicula.
              Quisque diam dui, imperdiet et.
            </p>
          </div>
        </div>

        <div className="absolute right-0 top-0 opacity-10 pointer-events-none">
          <Image src="/placeholder.svg?key=x4cc8" alt="Decorative dots pattern" width={200} height={200} />
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="w-full bg-[#0D0B21] py-16 md:py-24 relative">
        <div className="max-w-[1440px] mx-auto px-4 md:px-[80px] text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Subscribe to our Newsletter</h2>
          <p className="text-white/80 max-w-2xl mx-auto mb-8">
            Lorem ipsum dolor sit amet consectetur. Tellus velit aliquet pharetra elit malesuada risus dolor. Feugiat
            amet a in sem tortor est pellentesque. Vel augue cras ac est.
          </p>
          <div className="flex flex-col md:flex-row gap-4 max-w-xl mx-auto">
            <input
              type="email"
              placeholder="Enter your email address"
              className="flex-1 px-4 py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-[#B25CD9]"
            />
            <button className="bg-[#B25CD9] text-white font-medium py-3 px-6 rounded-md">Subscribe</button>
          </div>
        </div>
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <Image src="/code-on-screen.png" alt="Code background" fill className="object-cover" />
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full bg-white pt-16 pb-8">
        <div className="max-w-[1440px] mx-auto px-4 md:px-[80px]">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
            {/* Logo and Description */}
            <div>
              <Image src="/joss-logo.png" alt="JOSS Logo" width={120} height={45} className="mb-4" />
              <p className="text-gray-600 text-sm">
                Lorem ipsum is simply dummy text of the printing and typesetting industry.
              </p>
            </div>

            {/* Services Links */}
            <div>
              <h4 className="font-bold text-[#0D0B21] mb-4">Services</h4>
              <ul className="space-y-2">
                <li>
                  <Link href="/dashboard/about-us" className="text-gray-600 hover:text-[#B25CD9]">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="/services" className="text-gray-600 hover:text-[#B25CD9]">
                    Services
                  </Link>
                </li>
                <li>
                  <Link href="/case-studies" className="text-gray-600 hover:text-[#B25CD9]">
                    Case Studies
                  </Link>
                </li>
                <li>
                  <Link href="/how-it-works" className="text-gray-600 hover:text-[#B25CD9]">
                    How it works
                  </Link>
                </li>
                <li>
                  <Link href="/blog" className="text-gray-600 hover:text-[#B25CD9]">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link href="/careers" className="text-gray-600 hover:text-[#B25CD9]">
                    Careers
                  </Link>
                </li>
                <li>
                  <Link href="/areas-we-serve" className="text-gray-600 hover:text-[#B25CD9]">
                    Areas We Serve
                  </Link>
                </li>
              </ul>
            </div>

            {/* About Links */}
            <div>
              <h4 className="font-bold text-[#0D0B21] mb-4">About</h4>
              <ul className="space-y-2">
                <li>
                  <Link href="/dashboard/about-us" className="text-gray-600 hover:text-[#B25CD9]">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="/services" className="text-gray-600 hover:text-[#B25CD9]">
                    Services
                  </Link>
                </li>
                <li>
                  <Link href="/how-it-works" className="text-gray-600 hover:text-[#B25CD9]">
                    How it works
                  </Link>
                </li>
                <li>
                  <Link href="/blog" className="text-gray-600 hover:text-[#B25CD9]">
                    Blog
                  </Link>
                </li>
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h4 className="font-bold text-[#0D0B21] mb-4">Contact us</h4>
              <p className="text-gray-600 mb-4">
                Lorem ipsum is simply dummy text of the printing and typesetting industry.
              </p>
              <p className="font-bold text-xl text-[#0D0B21]">+123 456 787</p>
              <div className="flex space-x-4 mt-4">
                <Link href="#" className="text-gray-600 hover:text-[#B25CD9]">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
                  </svg>
                </Link>
                <Link href="#" className="text-gray-600 hover:text-[#B25CD9]">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </Link>
                <Link href="#" className="text-gray-600 hover:text-[#B25CD9]">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                  </svg>
                </Link>
                <Link href="#" className="text-gray-600 hover:text-[#B25CD9]">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>

          {/* Copyright */}
          <div className="border-t border-gray-200 pt-8 text-center">
            <p className="text-gray-600 text-sm">
              © 2024 Copyright by <span className="font-bold">JOSS AI</span>. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </main>
  )
}
