"use client"

import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function Home() {
  const router = useRouter()

  return (
    <main className="relative overflow-x-hidden">
      {/* Abstract Background */}
      <div className="absolute w-[1485px] h-[990px] -top-[207px] -left-[26px] z-0">
        <Image
          src="/colorful-abstract-texture.png"
          alt="Abstract Background"
          width={1485}
          height={990}
          className="opacity-35"
          priority
        />
      </div>

      {/* Navbar */}
      <nav className="w-full max-w-[1440px] h-[74px] flex justify-between items-center border-b-2 border-gray-200 py-[15px] px-[80px] relative z-10">
        <div className="flex items-center">
          <div className="flex items-center">
            <Image src="/joss-logo.png" alt="JOSS Logo" width={80} height={30} priority />
          </div>
        </div>

        <div className="flex space-x-8">
          <Link href="/dashboard/about-us" className="font-poppins text-sm">
            About Us
          </Link>
          <Link href="/dashboard/contact-us" className="font-poppins text-sm">
            Contact
          </Link>
        </div>

        <div className="flex items-center space-x-4">
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

      {/* Hero Section */}
      <section className="relative w-full max-w-[1440px] h-[613px] bg-white shadow-[0px_4px_20px_4px_rgba(0,0,0,0.1)] z-10">
        <div className="flex px-[80px] pt-[80px] relative">
          {/* Hero Text Content */}
          <div className="w-[586px] h-[253px] flex flex-col gap-[20px] z-10">
            <div>
              <h1 className="font-poppins font-bold text-5xl">
                <span className="text-purple-600">Great</span> Discover The
                <br />
                Future Of <span className="text-purple-600">Innovation</span>
              </h1>
              <p className="font-poppins text-gray-600 mt-4">Unveiling The Next Big Thing</p>
              <p className="font-poppins text-gray-500 mt-6 text-sm">
                A clean and convenient interface that would help users to talk to their loved ones, be it anything from
                full video, digital, or anything else.
              </p>
            </div>

            <button className="bg-purple-600 text-white font-poppins font-semibold text-[14px] leading-[14px] py-3 px-6 rounded-md w-[140px] mt-4">
              Let&apos;s get started!
            </button>
          </div>

          {/* Background Circle Art - Positioned correctly behind the AI face */}
          <div className="absolute w-[542px] h-[542px] top-[50px] right-[144px] z-[1]">
            <Image src="/bg-art.png" alt="Background Art" width={542} height={542} className="object-contain" />
          </div>

          {/* Main Illustration - Positioned to align with text */}
          <div className="absolute w-[497px] h-[500px] top-[20px] right-[80px] z-[2]">
            <Image
              src="/ai-face-gradient.png"
              alt="AI Illustration"
              width={497}
              height={500}
              className="object-contain"
            />
          </div>
        </div>

        {/* "Talk to your loved one" Text */}
        <div className="absolute w-[1355px] h-[180px] top-[482px] left-[51px] border-[3px] border-[#CDCDCD99] flex items-center justify-center z-[1]">
          <h2 className="font-poppins font-black text-[120px] leading-[100%] tracking-[0px] capitalize text-gray-200">
            Talk To Your Loved One
          </h2>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="w-full max-w-[1440px] py-20 px-[80px] bg-gray-50">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">
            How <span className="text-purple-600">It Works</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            A solution is an extension of yourself that can help you to operate it properly. Your website is your bridge
            between your marketing world.
          </p>
        </div>

        {/* Feature 1 */}
        <div className="flex items-center justify-between mb-24">
          <div className="w-[500px]">
            <Image src="/device-mockup-1.png" alt="Device Mockup" width={500} height={350} />
          </div>
          <div className="w-[500px]">
            <h3 className="text-2xl font-bold mb-4">
              Answers the given <span className="text-purple-600">Questions</span>
            </h3>
            <p className="text-gray-600">
              Send out your query, it might include questions that you want to know about your loved one. Our AI will
              analyze the best possible answers in the imaging and negative scenario.
            </p>
          </div>
        </div>

        {/* Feature 2 */}
        <div className="flex items-center justify-between mb-24 flex-row-reverse">
          <div className="w-[500px]">
            <Image src="/device-mockup-1.png" alt="Device Mockup" width={500} height={350} />
          </div>
          <div className="w-[500px]">
            <h3 className="text-2xl font-bold mb-4">
              Input & <span className="text-purple-600">Describe</span> your image
            </h3>
            <p className="text-gray-600">
              Send out of an image, it might include responses that you want to know about your loved one. Our AI will
              analyze the best possible answers in the imaging and negative scenario.
            </p>
          </div>
        </div>

        {/* Feature 3 */}
        <div className="flex items-center justify-between mb-24">
          <div className="w-[500px]">
            <Image src="/device-mockup-1.png" alt="Device Mockup" width={500} height={350} />
          </div>
          <div className="w-[500px]">
            <h3 className="text-2xl font-bold mb-4">
              Enjoy with your <span className="text-purple-600">Loved One&apos;s</span>
            </h3>
            <p className="text-gray-600">
              Send out your query, it might include questions that you want to know about your loved one. Our AI will
              analyze the best possible answers in the imaging and negative scenario.
            </p>
          </div>
        </div>

        {/* Feature 4 */}
        <div className="flex items-center justify-between mb-24 flex-row-reverse">
          <div className="w-[500px]">
            <Image src="/device-mockup-1.png" alt="Device Mockup" width={500} height={350} />
          </div>
          <div className="w-[500px]">
            <h3 className="text-2xl font-bold mb-4">
              AI Image <span className="text-purple-600">Generated</span>
            </h3>
            <p className="text-gray-600">
              Send out of an image, it might include responses that you want to know about your loved one. Our AI will
              analyze the best possible answers in the imaging and negative scenario.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full max-w-[1440px] py-16 px-[80px] bg-pink-100 rounded-lg relative overflow-hidden">
        {/* Background Image */}
        <div
          className="absolute"
          style={{ width: "1239px", height: "697px", top: "-104px", left: "1239px", transform: "rotate(180deg)" }}
        >
          <Image src="/Background.png" alt="Background" width={1239} height={697} className="object-cover" />
        </div>

        <div className="flex items-center justify-between relative z-10">
          <div className="w-[500px]">
            <h2 className="text-3xl font-bold mb-4">
              If you&apos;re considering to try <span className="text-purple-600">JOSS AI</span>, don&apos;t get ready.
            </h2>
            <p className="text-gray-600 mb-6">
              Frank C. Van der Grijspaarde Global TPM Manager, CS&L and Planning, Heineken
            </p>
            <button className="bg-purple-600 text-white font-poppins font-semibold text-[14px] py-3 px-6 rounded-md">
              Get started now
            </button>
          </div>
          <div className="w-[500px] relative">
            <div className="absolute inset-0 bg-gradient-to-r from-pink-300 to-purple-300 rounded-lg -z-10"></div>
            <div className="relative">
              <Image src="/cta-person.png" alt="Person" width={500} height={300} className="rounded-lg" />
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white bg-opacity-50 rounded-full p-3">
                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                  <div className="w-0 h-0 border-t-[8px] border-t-transparent border-l-[16px] border-l-purple-600 border-b-[8px] border-b-transparent ml-1"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Design and Development Approach */}
      <section className="w-full max-w-[1440px] py-20 px-[80px]">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">
            Design and <span className="text-purple-600">Development</span> Approach
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            A solution is an extension of yourself that can help you to operate it properly. Your website is your bridge
            between your marketing world.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-8">
          {/* Feature Card 1 - AI Reality Based Images */}
          <div className="bg-[#B25CD9] p-6 rounded-lg flex items-start">
            <div className="mr-4 mt-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
            </div>
            <div className="text-white">
              <h3 className="text-xl font-bold mb-2">AI Reality Based Images</h3>
              <p>
                Unlike other companies, we are a UI first development company. Projects are driven by designers and they
                make sure design and experiences translate to code.
              </p>
            </div>
          </div>

          {/* Feature Card 2 - Video Calls */}
          <div className="bg-[#FAFAFA] p-6 rounded-lg flex items-start">
            <div className="mr-4 mt-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 text-purple-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                />
              </svg>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-2">Video Calls</h3>
              <p className="text-gray-600">
                Unlike other companies, we are a UI first development company. Projects are driven by designers and they
                make sure design and experiences translate to code.
              </p>
            </div>
          </div>

          {/* Feature Card 3 - Feel in Reality */}
          <div className="bg-[#FAFAFA] p-6 rounded-lg flex items-start">
            <div className="mr-4 mt-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 text-purple-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-2">Feel in Reality</h3>
              <p className="text-gray-600">
                Unlike other companies, we are a UI first development company. Projects are driven by designers and they
                make sure design and experiences translate to code.
              </p>
            </div>
          </div>

          {/* Feature Card 4 - Your Loved One's in your Pocket */}
          <div className="bg-[#FAFAFA] p-6 rounded-lg flex items-start">
            <div className="mr-4 mt-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 text-purple-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
                />
              </svg>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-2">Your Loved One&apos;s in your Pocket</h3>
              <p className="text-gray-600">
                Unlike other companies, we are a UI first development company. Projects are driven by designers and they
                make sure design and experiences translate to code.
              </p>
            </div>
          </div>

          {/* Feature Card 5 - Fun with Friends and Family */}
          <div className="bg-[#FAFAFA] p-6 rounded-lg flex items-start">
            <div className="mr-4 mt-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 text-purple-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-2">Fun with Friends and Family</h3>
              <p className="text-gray-600">
                Unlike other companies, we are a UI first development company. Projects are driven by designers and they
                make sure design and experiences translate to code.
              </p>
            </div>
          </div>

          {/* Feature Card 6 - Enjoy with your Loved One's */}
          <div className="bg-[#FAFAFA] p-6 rounded-lg flex items-start">
            <div className="mr-4 mt-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 text-purple-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
              </svg>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-2">Enjoy with your Loved One&apos;s</h3>
              <p className="text-gray-600">
                Unlike other companies, we are a UI first development company. Projects are driven by designers and they
                make sure design and experiences translate to code.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Download App Section */}
      <section className="w-full max-w-[1440px] py-20 px-[80px] bg-[#0D0B21] text-white relative overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0" style={{ top: "1px" }}>
          <Image
            src="/bg.png"
            alt="Background"
            width={1439}
            height={454}
            className="w-full h-full object-contain"
            style={{ objectPosition: "center" }}
          />
        </div>

        <div className="flex items-center justify-between relative z-10">
          <div className="w-[500px]">
            <h2 className="text-3xl font-bold mb-4">
              Download Our App
              <br />
              <span className="text-purple-400">Design And Download</span>
              <br />
              Our App Free
            </h2>
            <div className="flex mt-8 space-x-4">
              <Link href="#">
                <Image src="/app-store.png" alt="App Store" width={150} height={50} />
              </Link>
              <Link href="#">
                <Image src="/play-store.png" alt="Play Store" width={150} height={50} />
              </Link>
            </div>
          </div>
          <div className="w-[500px]">
            <Image src="/Mobile.png" alt="App Mockup" width={300} height={600} className="mx-auto" />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full max-w-[1440px] py-16 px-[80px] bg-white border-t">
        <div className="grid grid-cols-4 gap-8 mb-12">
          <div>
            <Image src="/joss-logo.png" alt="JOSS Logo" width={80} height={30} className="mb-4" />
            <p className="text-gray-600 text-sm mb-4">
              JOSS AI is a platform that helps you connect with your loved ones through AI-powered technology.
            </p>
            <p className="text-gray-500 text-xs">© 2023 Copyright by JOSS AI. All rights reserved.</p>
          </div>

          <div>
            <h4 className="font-bold mb-4">Services</h4>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="text-gray-600 hover:text-purple-600">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-600 hover:text-purple-600">
                  How it works
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-600 hover:text-purple-600">
                  What&apos;s new
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-600 hover:text-purple-600">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4">About</h4>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="text-gray-600 hover:text-purple-600">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-600 hover:text-purple-600">
                  Features
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-600 hover:text-purple-600">
                  News
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-600 hover:text-purple-600">
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4">Contact us</h4>
            <p className="text-gray-600 mb-4">
              Lorem ipsum is simply dummy text of the printing and typesetting industry.
            </p>
            <p className="font-bold text-lg">+123 456 789</p>
            <div className="flex space-x-4 mt-4">
              <Link href="#" className="text-gray-600 hover:text-purple-600">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
                </svg>
              </Link>
              <Link href="#" className="text-gray-600 hover:text-purple-600">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                </svg>
              </Link>
              <Link href="#" className="text-gray-600 hover:text-purple-600">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </main>
  )
}
