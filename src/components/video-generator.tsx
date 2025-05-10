"use client"

import type React from "react"

import { useState, useRef } from "react"
import Image from "next/image"
import { X, Upload, HelpCircle } from "lucide-react"
import { Dialog, DialogContent } from "@/components/ui/dialog"

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
  const fileInputRef = useRef<HTMLInputElement>(null)

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

  const resetForm = () => {
    setSelectedImage(initialImage || "")
    setVideoTitle("")
    setEmotion("Happy")
    setExpression("Normal")
    setIsGenerating(false)
    setProgress(0)
  }

  const handleClose = () => {
    resetForm()
    onClose()
  }

  return (
    <>
      <Dialog open={isOpen} onOpenChange={handleClose}>
        <DialogContent className="max-w-4xl p-0 h-[90vh] max-h-[90vh] overflow-hidden">
          <div className="flex flex-col h-full overflow-hidden">
            {/* Header */}
            <div className="flex justify-between items-center p-4 border-b">
              <h1 className="text-xl font-bold">
                Ready to Meet the person you Love? <span className="text-red-500">❤️</span>
              </h1>
              <button onClick={handleClose} className="text-gray-500 hover:text-gray-700">
                <X size={24} />
              </button>
            </div>

            {/* Content */}
            <div className="flex flex-col md:flex-row flex-1 overflow-hidden">
              {/* Main Content Area */}
              <div className="flex-1 p-4 overflow-y-auto">
                <p className="text-gray-600 mb-6">
                  Meet the Joss AI chat app revolutionizing conversations with the love ones.
                </p>

                {/* Upload Image Details */}
                <div className="mb-6">
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
                <div className="mb-6">
                  <div className="flex items-center mb-4">
                    <div className="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center mr-2">
                      <HelpCircle className="h-3 w-3 text-purple-600" />
                    </div>
                    <h3 className="font-bold">Questionnaire</h3>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
              <div className="hidden md:block w-[240px] border-l border-gray-200 p-4 overflow-y-auto">
                {/* Storage Section */}
                <div className="bg-white rounded-xl p-4 shadow-sm mb-4">
                  <div className="flex items-center mb-3">
                    <div className="w-6 h-6 bg-indigo-100 rounded-full flex items-center justify-center mr-2">
                      <svg width="12" height="12" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M8 0C3.6 0 0 3.6 0 8C0 12.4 3.6 16 8 16C12.4 16 16 12.4 16 8C16 3.6 12.4 0 8 0ZM8 14C4.7 14 2 11.3 2 8C2 4.7 4.7 2 8 2C11.3 2 14 4.7 14 8C14 11.3 11.3 14 8 14Z"
                          fill="#4F46E5"
                        />
                        <path
                          d="M8 4C6.9 4 6 4.9 6 6C6 7.1 6.9 8 8 8C9.1 8 10 7.1 10 6C10 4.9 9.1 4 8 4Z"
                          fill="#4F46E5"
                        />
                        <path d="M8 9C5.9 9 4 10.3 4 12V13H12V12C12 10.3 10.1 9 8 9Z" fill="#4F46E5" />
                      </svg>
                    </div>
                    <h2 className="text-sm font-bold">Storage</h2>
                  </div>

                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center">
                      <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mr-3 relative">
                        <div className="w-9 h-9 rounded-full bg-indigo-600 flex items-center justify-center text-white font-bold text-xs">
                          66%
                        </div>
                        {/* Blue segment overlay */}
                        <svg className="absolute inset-0" width="48" height="48" viewBox="0 0 48 48">
                          <circle
                            cx="24"
                            cy="24"
                            r="21"
                            fill="none"
                            stroke="#4F46E5"
                            strokeWidth="6"
                            strokeDasharray="131.9 131.9"
                            strokeDashoffset="45"
                            transform="rotate(-90 24 24)"
                          />
                        </svg>
                      </div>
                      <div>
                        <p className="font-bold text-xs">18.2 GB</p>
                        <p className="text-xs text-gray-500">of 27.5 GB</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Premium Upgrade */}
                <div className="bg-purple-600 rounded-xl p-4 text-white">
                  <h2 className="text-sm font-bold mb-2">Upgrade Premium</h2>
                  <p className="text-purple-200 text-xs mb-3">Enjoy full features & unlimited storage</p>
                  <button className="bg-white text-purple-600 px-3 py-1.5 rounded-lg text-xs font-medium mb-2 w-full">
                    Get Pro Now
                  </button>
                  <p className="text-[10px] text-purple-200 text-center">© 2024 JOSS AI. All Rights Reserved.</p>
                </div>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

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
    </>
  )
}
