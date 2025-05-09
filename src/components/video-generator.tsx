"use client"

import type React from "react"

import { useState, useRef } from "react"
import Image from "next/image"
import { X, Upload, HelpCircle, Menu } from "lucide-react"

type EmotionType = "Happy" | "Sad" | "Neutral" | "Angry" | "Surprised"
type ExpressionType = "Normal" | "Smiling" | "Serious" | "Laughing"

interface VideoGeneratorProps {
  isOpen: boolean
  onClose: () => void
  onGenerationComplete?: (videoUrl: string) => void
  initialImage?: string
}

export default function VideoGenerator({ isOpen, onClose, onGenerationComplete, initialImage }: VideoGeneratorProps) {
  const [selectedImage, setSelectedImage] = useState<string>(initialImage || "")
  const [videoTitle, setVideoTitle] = useState<string>("")
  const [emotion, setEmotion] = useState<EmotionType>("Happy")
  const [expression, setExpression] = useState<ExpressionType>("Normal")
  const [isGenerating, setIsGenerating] = useState(false)
  const [progress, setProgress] = useState(0)
  const [showMobileSidebar, setShowMobileSidebar] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  if (!isOpen) return null

  const questions = [
    { id: 1, question: "What did they wear?", answer: "" },
    { id: 2, question: "What did they wear?", answer: "" },
    { id: 3, question: "What did they wear?", answer: "" },
    { id: 4, question: "What did they wear?", answer: "" },
    { id: 5, question: "What did they wear?", answer: "" },
    { id: 6, question: "What did they wear?", answer: "" },
  ]

  const handleFileSelect = () => {
    fileInputRef.current?.click()
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      const imageUrl = URL.createObjectURL(file)
      setSelectedImage(imageUrl)
    }
  }

  const handleRemoveImage = () => {
    setSelectedImage("")
  }

  const handleGenerate = () => {
    setIsGenerating(true)
    setProgress(0)

    // Simulate progress
    const interval = setInterval(() => {
      setProgress((prev) => {
        const newProgress = prev + 10
        if (newProgress >= 100) {
          clearInterval(interval)

          // Simulate completion after reaching 100%
          setTimeout(() => {
            if (onGenerationComplete) {
              onGenerationComplete("https://example.com/generated-video.mp4")
            }
            setIsGenerating(false)
            onClose()
          }, 500)
        }
        return newProgress > 100 ? 100 : newProgress
      })
    }, 800)
  }

  const toggleMobileSidebar = () => {
    setShowMobileSidebar(!showMobileSidebar)
  }

  return (
    <div className="fixed inset-0 bg-white z-50 overflow-auto">
      <div className="flex flex-col md:flex-row min-h-screen">
        {/* Mobile Header with Menu Button */}
        <div className="md:hidden flex items-center justify-between p-4 border-b">
          <button onClick={toggleMobileSidebar} className="p-2">
            <Menu size={24} />
          </button>
          <Image src="/joss-logo.png" alt="JOSS" width={80} height={30} priority />
          <button onClick={onClose} className="p-2 text-gray-500">
            <X size={24} />
          </button>
        </div>

        {/* Left Sidebar - Hidden on mobile unless toggled */}
        <div
          className={`${
            showMobileSidebar ? "fixed inset-0 z-50 bg-white" : "hidden"
          } md:relative md:block md:w-[240px] md:min-h-screen border-r border-gray-200 bg-white flex-shrink-0`}
        >
          {/* Mobile sidebar header */}
          <div className="flex md:hidden items-center justify-between p-4 border-b">
            <Image src="/joss-logo.png" alt="JOSS" width={80} height={30} priority />
            <button onClick={toggleMobileSidebar} className="p-2">
              <X size={24} />
            </button>
          </div>

          {/* Desktop sidebar header */}
          <div className="hidden md:block p-6">
            <Image src="/joss-logo.png" alt="JOSS" width={80} height={30} priority />
          </div>

          <nav className="flex-1 px-3">
            <div className="space-y-1">{/* Sidebar items would go here */}</div>
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex flex-col md:flex-row flex-1 p-4 md:p-6 overflow-auto">
          {/* Main Content Area */}
          <div className="flex-1 md:pr-6 mb-8 md:mb-0">
            {/* Header - Hidden on mobile as we have a mobile header */}
            <div className="hidden md:flex justify-between items-center mb-8">
              <h1 className="text-xl md:text-2xl font-bold">
                Ready to Meet the person you Love? <span className="text-red-500">❤️</span>
              </h1>
              <button onClick={onClose} className="bg-purple-600 text-white px-4 py-2 rounded-md text-sm font-medium">
                Cancel
              </button>
            </div>

            {/* Mobile Title - Shown only on mobile */}
            <h1 className="md:hidden text-xl font-bold mb-4">
              Ready to Meet the person you Love? <span className="text-red-500">❤️</span>
            </h1>

            <p className="text-gray-600 mb-8">
              Meet the Joss AI chat app revolutionizing conversations with the love ones.
            </p>

            {/* Upload Image Details */}
            <div className="mb-8">
              <div className="flex items-center mb-4">
                <div className="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center mr-2">
                  <Upload className="h-3 w-3 text-purple-600" />
                </div>
                <h3 className="font-bold">Upload Image Details</h3>
              </div>

              <div className="flex flex-col md:flex-row gap-4 md:gap-8">
                <div className="flex-1 space-y-4">
                  {/* Video Title */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Video Title</label>
                    <input
                      type="text"
                      value={videoTitle}
                      onChange={(e) => setVideoTitle(e.target.value)}
                      placeholder="Enter video title"
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                  </div>

                  {/* Select File */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Select File</label>
                    <div className="flex items-center">
                      <button
                        onClick={handleFileSelect}
                        className="bg-purple-100 text-purple-600 px-4 py-2 rounded-md text-sm font-medium"
                      >
                        Browse Files
                      </button>
                      <input
                        ref={fileInputRef}
                        type="file"
                        className="hidden"
                        accept="image/*"
                        onChange={handleFileChange}
                      />
                    </div>
                  </div>

                  {/* Image Emotions */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Image Emotions</label>
                    <select
                      value={emotion}
                      onChange={(e) => setEmotion(e.target.value as EmotionType)}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    >
                      <option value="Happy">Happy</option>
                      <option value="Sad">Sad</option>
                      <option value="Neutral">Neutral</option>
                      <option value="Angry">Angry</option>
                      <option value="Surprised">Surprised</option>
                    </select>
                  </div>

                  {/* Image Facial Expression */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Image Facial Expression</label>
                    <select
                      value={expression}
                      onChange={(e) => setExpression(e.target.value as ExpressionType)}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    >
                      <option value="Normal">Normal</option>
                      <option value="Smiling">Smiling</option>
                      <option value="Serious">Serious</option>
                      <option value="Laughing">Laughing</option>
                    </select>
                  </div>
                </div>

                {/* Image Preview */}
                <div className="w-full md:w-64">
                  {selectedImage ? (
                    <div className="relative w-full max-w-[240px] mx-auto md:mx-0 aspect-square rounded-lg overflow-hidden">
                      <Image
                        src={selectedImage || "/placeholder.svg"}
                        alt="Selected image"
                        fill
                        className="object-cover"
                      />
                      <button
                        onClick={handleRemoveImage}
                        className="absolute top-2 right-2 bg-white rounded-full p-1 shadow-md"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  ) : (
                    <div className="w-full max-w-[240px] mx-auto md:mx-0 aspect-square bg-gray-100 rounded-lg flex items-center justify-center">
                      <p className="text-gray-400 text-sm">No image selected</p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Questionnaire */}
            <div className="mb-8">
              <div className="flex items-center mb-4">
                <div className="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center mr-2">
                  <HelpCircle className="h-3 w-3 text-purple-600" />
                </div>
                <h3 className="font-bold">Questionnaire</h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {questions.map((q) => (
                  <div key={q.id} className="bg-gray-50 p-3 rounded-md">
                    <p className="text-sm font-medium mb-2">
                      {q.id}. {q.question}
                    </p>
                    <textarea
                      placeholder="Write the answer here..."
                      className="w-full text-sm border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                      rows={3}
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Generate Button */}
            <div className="flex justify-center">
              <button
                onClick={handleGenerate}
                disabled={!selectedImage}
                className={`px-8 py-2.5 rounded-md font-medium text-white ${
                  selectedImage ? "bg-purple-600 hover:bg-purple-700" : "bg-gray-400 cursor-not-allowed"
                }`}
              >
                Generate
              </button>
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="w-full md:w-[300px] flex flex-col gap-6">
            {/* Storage Section */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="flex items-center mb-4">
                <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center mr-3">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M8 0C3.6 0 0 3.6 0 8C0 12.4 3.6 16 8 16C12.4 16 16 12.4 16 8C16 3.6 12.4 0 8 0ZM8 14C4.7 14 2 11.3 2 8C2 4.7 4.7 2 8 2C11.3 2 14 4.7 14 8C14 11.3 11.3 14 8 14Z"
                      fill="#4F46E5"
                    />
                    <path d="M8 4C6.9 4 6 4.9 6 6C6 7.1 6.9 8 8 8C9.1 8 10 7.1 10 6C10 4.9 9.1 4 8 4Z" fill="#4F46E5" />
                    <path d="M8 9C5.9 9 4 10.3 4 12V13H12V12C12 10.3 10.1 9 8 9Z" fill="#4F46E5" />
                  </svg>
                </div>
                <h2 className="text-lg font-bold">Storage</h2>
              </div>

              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mr-4 relative">
                    <div className="w-12 h-12 rounded-full bg-indigo-600 flex items-center justify-center text-white font-bold">
                      66%
                    </div>
                    {/* Blue segment overlay */}
                    <svg className="absolute inset-0" width="64" height="64" viewBox="0 0 64 64">
                      <circle
                        cx="32"
                        cy="32"
                        r="28"
                        fill="none"
                        stroke="#4F46E5"
                        strokeWidth="8"
                        strokeDasharray="175.9 175.9"
                        strokeDashoffset="60"
                        transform="rotate(-90 32 32)"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="font-bold">18.2 GB</p>
                    <p className="text-sm text-gray-500">of 27.5 GB</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Premium Upgrade */}
            <div className="bg-purple-600 rounded-xl p-6 text-white">
              <h2 className="text-xl font-bold mb-2">Upgrade Premium to Get More Features</h2>
              <p className="text-purple-200 mb-4">Enjoy full features & unlimited storage for your videos</p>
              <button className="bg-white text-purple-600 px-4 py-2 rounded-lg font-medium mb-4 w-full">
                Get Pro Now
              </button>
              <p className="text-xs text-purple-200 text-center">© 2024 JOSS AI. All Rights Reserved.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Processing Modal */}
      {isGenerating && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[60]">
          <div className="bg-white rounded-lg p-8 max-w-md text-center">
            <h3 className="text-lg font-bold mb-4">Please wait while AI made your video with magic</h3>
            <div className="relative w-20 h-20 mx-auto">
              <div className="absolute inset-0 rounded-full border-4 border-gray-200"></div>
              <div
                className="absolute inset-0 rounded-full border-4 border-purple-600 border-t-transparent"
                style={{
                  transform: "rotate(0deg)",
                  animation: "spin 1s linear infinite",
                }}
              ></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-purple-600 font-bold">{progress}%</span>
              </div>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  )
}
