"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { ChevronDown, X, Maximize2 } from "lucide-react"
import { Dialog, DialogContent } from "@/components/ui/dialog"

interface EditVideoProps {
  isOpen: boolean
  onClose: () => void
  videoData: {
    id: string
    title: string
    thumbnail: string
    duration: string
  }
}

type EditOption = "aspect-ratio" | "voice" | "background" | "music" | "export" | "adjust-background" | null

export default function EditVideo({ isOpen, onClose, videoData }: EditVideoProps) {
  const [activeOption, setActiveOption] = useState<EditOption>(null)
  const [emotion, setEmotion] = useState("Happy")
  const [facialExpression, setFacialExpression] = useState("Normal")
  const [isMobile, setIsMobile] = useState(false)
//   const [isEmotionMenuOpen, setIsEmotionMenuOpen] = useState(false)

  // Check if device is mobile
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 640)
    }

    // Initial check
    checkIfMobile()

    // Add event listener for window resize
    window.addEventListener("resize", checkIfMobile)

    // Cleanup
    return () => window.removeEventListener("resize", checkIfMobile)
  }, [])

  // Handle option click
  const handleOptionClick = (option: EditOption) => {
    setActiveOption(option)
  }

  // Close dialog for specific option
  const handleCloseOptionDialog = () => {
    setActiveOption(null)
  }

  // Start video call
  const handleStartCall = () => {
    console.log("Starting call with video:", videoData.id)
    // Implement call functionality
    onClose()
  }

  // Handle escape key to close modal
  useEffect(() => {
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        if (activeOption) {
          handleCloseOptionDialog()
        } else if (isOpen) {
          onClose()
        }
      }
    }

    window.addEventListener("keydown", handleEscKey)
    return () => window.removeEventListener("keydown", handleEscKey)
  }, [isOpen, activeOption, onClose])

  if (!isOpen) return null

  return (
    <>
      {/* Main Edit Video Screen - Positioned to align with sidebar and right container */}
      <div className="fixed inset-0 z-40 flex items-start justify-center overflow-hidden bg-black/50 p-0 sm:p-4">
        <div className="relative h-full w-full max-h-full sm:max-h-[95vh] overflow-y-auto rounded-none sm:rounded-lg bg-white shadow-xl sm:w-full sm:max-w-3xl sm:mx-auto sm:my-4">
          <div className="sticky top-0 z-10 flex justify-between items-center bg-white p-3 border-b">
            <h1 className="text-base sm:text-lg font-bold truncate max-w-[200px] sm:max-w-md">
              {videoData.title || "My Grand Mother"}
            </h1>
            <button
              onClick={onClose}
              className="rounded-full p-1 hover:bg-gray-100 transition-colors"
              aria-label="Close"
            >
              <X size={20} />
            </button>
          </div>

          <div className="p-2 sm:p-3 md:p-4">
            {/* Emotion and Expression Selectors - Responsive layout */}
            <div
              className={`flex flex-col sm:flex-row sm:items-center mb-4 ${isMobile ? "space-y-2" : "sm:space-x-8"}`}
            >
              <div className="flex items-center justify-between sm:justify-start sm:space-x-4">
                <span className="text-gray-500 text-sm">Emotions</span>
                <div className="relative">
                  <select
                    value={emotion}
                    onChange={(e) => setEmotion(e.target.value)}
                    className="border-none bg-transparent font-medium focus:outline-none focus:ring-0 pr-6 appearance-none"
                  >
                    <option value="Happy">Happy</option>
                    <option value="Sad">Sad</option>
                    <option value="Neutral">Neutral</option>
                    <option value="Angry">Angry</option>
                  </select>
                  <ChevronDown
                    size={16}
                    className="absolute right-0 top-1/2 transform -translate-y-1/2 text-gray-500 pointer-events-none"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between sm:justify-start sm:space-x-4">
                <span className="text-gray-500 text-sm">Facial Expression</span>
                <div className="relative">
                  <select
                    value={facialExpression}
                    onChange={(e) => setFacialExpression(e.target.value)}
                    className="border-none bg-transparent font-medium focus:outline-none focus:ring-0 pr-6 appearance-none"
                  >
                    <option value="Normal">Normal</option>
                    <option value="Smiling">Smiling</option>
                    <option value="Serious">Serious</option>
                  </select>
                  <ChevronDown
                    size={16}
                    className="absolute right-0 top-1/2 transform -translate-y-1/2 text-gray-500 pointer-events-none"
                  />
                </div>
              </div>
            </div>

            {/* Video Preview */}
            <div className="relative aspect-video bg-black rounded-lg overflow-hidden mb-4 sm:mb-6">
              <Image
                src={videoData.thumbnail || "/placeholder.svg?height=600&width=1200&query=elderly woman portrait"}
                alt={videoData.title || "Video preview"}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 768px) 80vw, 50vw"
                priority
                className="object-contain"
              />
              <button
                className="absolute bottom-2 sm:bottom-4 left-2 sm:left-4 w-6 h-6 sm:w-8 sm:h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center"
                aria-label="Play video"
              >
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="sm:w-4 sm:h-4"
                >
                  <path
                    d="M8 0C3.6 0 0 3.6 0 8C0 12.4 3.6 16 8 16C12.4 16 16 12.4 16 8C16 3.6 12.4 0 8 0ZM6 11.5V4.5L12 8L6 11.5Z"
                    fill="white"
                  />
                </svg>
              </button>
              <button
                className="absolute bottom-2 sm:bottom-4 right-2 sm:right-4 w-6 h-6 sm:w-8 sm:h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center"
                aria-label="Maximize video"
              >
                <Maximize2 className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
              </button>
            </div>

            {/* Editing Options - Responsive grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2 sm:gap-4 mb-6 sm:mb-8">
              <button
                onClick={() => handleOptionClick("aspect-ratio")}
                className="flex flex-col items-center justify-center p-2 sm:p-4 bg-white rounded-lg border border-gray-200 hover:border-indigo-200 hover:bg-indigo-50 transition-colors"
              >
                <div className="w-6 h-6 sm:w-8 sm:h-8 bg-indigo-100 rounded-full flex items-center justify-center mb-1 sm:mb-2">
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="sm:w-4 sm:h-4"
                  >
                    <path
                      d="M14 2H2C1.44772 2 1 2.44772 1 3V13C1 13.5523 1.44772 14 2 14H14C14.5523 14 15 13.5523 15 13V3C15 2.44772 14.5523 2 14 2Z"
                      stroke="#6366F1"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path d="M5 1V3" stroke="#6366F1" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M11 1V3" stroke="#6366F1" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M1 7H15" stroke="#6366F1" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <span className="text-xs font-medium">Aspect Ratio</span>
                <span className="text-xs text-gray-400 hidden sm:inline">16:9</span>
              </button>

              <button
                onClick={() => handleOptionClick("voice")}
                className="flex flex-col items-center justify-center p-2 sm:p-4 bg-white rounded-lg border border-gray-200 hover:border-indigo-200 hover:bg-indigo-50 transition-colors"
              >
                <div className="w-6 h-6 sm:w-8 sm:h-8 bg-indigo-100 rounded-full flex items-center justify-center mb-1 sm:mb-2">
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="sm:w-4 sm:h-4"
                  >
                    <path
                      d="M8 1C7.46957 1 6.96086 1.21071 6.58579 1.58579C6.21071 1.96086 6 2.46957 6 3V8C6 8.53043 6.21071 9.03914 6.58579 9.41421C6.96086 9.78929 7.46957 10 8 10C8.53043 10 9.03914 9.78929 9.41421 9.41421C9.78929 9.03914 10 8.53043 10 8V3C10 2.46957 9.78929 1.96086 9.41421 1.58579C9.03914 1.21071 8.53043 1 8 1Z"
                      stroke="#6366F1"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M13 7V8C13 9.32608 12.4732 10.5979 11.5355 11.5355C10.5979 12.4732 9.32608 13 8 13C6.67392 13 5.40215 12.4732 4.46447 11.5355C3.52678 10.5979 3 9.32608 3 8V7"
                      stroke="#6366F1"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M8 13V15"
                      stroke="#6366F1"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M5 15H11"
                      stroke="#6366F1"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <span className="text-xs font-medium">Voice</span>
                <span className="text-xs text-gray-400 hidden sm:inline">English (USA)</span>
              </button>

              <button
                onClick={() => handleOptionClick("background")}
                className="flex flex-col items-center justify-center p-2 sm:p-4 bg-white rounded-lg border border-gray-200 hover:border-indigo-200 hover:bg-indigo-50 transition-colors"
              >
                <div className="w-6 h-6 sm:w-8 sm:h-8 bg-indigo-100 rounded-full flex items-center justify-center mb-1 sm:mb-2">
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="sm:w-4 sm:h-4"
                  >
                    <path
                      d="M13 2H3C1.89543 2 1 2.89543 1 4V12C1 13.1046 1.89543 14 3 14H13C14.1046 14 15 13.1046 15 12V4C15 2.89543 14.1046 2 13 2Z"
                      stroke="#6366F1"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M1 10L4.5 6.5C4.89782 6.10218 5.44566 5.87868 6.01472 5.87868C6.58378 5.87868 7.13162 6.10218 7.52944 6.5L11.5 10.5"
                      stroke="#6366F1"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M9.5 8.5L10.5 7.5C10.8978 7.10218 11.4457 6.87868 12.0147 6.87868C12.5838 6.87868 13.1316 7.10218 13.5294 7.5L15 9"
                      stroke="#6366F1"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M5.5 5C6.32843 5 7 4.32843 7 3.5C7 2.67157 6.32843 2 5.5 2C4.67157 2 4 2.67157 4 3.5C4 4.32843 4.67157 5 5.5 5Z"
                      stroke="#6366F1"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <span className="text-xs font-medium">Background</span>
                <span className="text-xs text-gray-400 hidden sm:inline">None</span>
              </button>

              <button
                onClick={() => handleOptionClick("music")}
                className="flex flex-col items-center justify-center p-2 sm:p-4 bg-white rounded-lg border border-gray-200 hover:border-indigo-200 hover:bg-indigo-50 transition-colors"
              >
                <div className="w-6 h-6 sm:w-8 sm:h-8 bg-indigo-100 rounded-full flex items-center justify-center mb-1 sm:mb-2">
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="sm:w-4 sm:h-4"
                  >
                    <path
                      d="M6 13.5C7.10457 13.5 8 12.6046 8 11.5C8 10.3954 7.10457 9.5 6 9.5C4.89543 9.5 4 10.3954 4 11.5C4 12.6046 4.89543 13.5 6 13.5Z"
                      stroke="#6366F1"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M13 11C14.1046 11 15 10.1046 15 9C15 7.89543 14.1046 7 13 7C11.8954 7 11 7.89543 11 9C11 10.1046 11.8954 11 13 11Z"
                      stroke="#6366F1"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M8 11.5V3.5L15 1V9"
                      stroke="#6366F1"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <span className="text-xs font-medium">Music</span>
                <span className="text-xs text-gray-400 hidden sm:inline">None</span>
              </button>

              <button
                onClick={() => handleOptionClick("export")}
                className="flex flex-col items-center justify-center p-2 sm:p-4 bg-white rounded-lg border border-gray-200 hover:border-indigo-200 hover:bg-indigo-50 transition-colors"
              >
                <div className="w-6 h-6 sm:w-8 sm:h-8 bg-indigo-100 rounded-full flex items-center justify-center mb-1 sm:mb-2">
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="sm:w-4 sm:h-4"
                  >
                    <path
                      d="M14 10V12.6667C14 13.0203 13.8595 13.3594 13.6095 13.6095C13.3594 13.8595 13.0203 14 12.6667 14H3.33333C2.97971 14 2.64057 13.8595 2.39052 13.6095C2.14048 13.3594 2 13.0203 2 12.6667V10"
                      stroke="#6366F1"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M4.66699 6.66667L8.00033 10L11.3337 6.66667"
                      stroke="#6366F1"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path d="M8 10V2" stroke="#6366F1" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <span className="text-xs font-medium">Export</span>
                <span className="text-xs text-gray-400 hidden sm:inline">HD</span>
              </button>

              <button
                onClick={handleStartCall}
                className="flex flex-col items-center justify-center p-2 sm:p-4 bg-indigo-600 rounded-lg text-white hover:bg-indigo-700 transition-colors"
              >
                <div className="w-6 h-6 sm:w-8 sm:h-8 bg-white/20 rounded-full flex items-center justify-center mb-1 sm:mb-2">
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="sm:w-4 sm:h-4"
                  >
                    <path
                      d="M14.6667 11.28V13.28C14.6675 13.4657 14.6294 13.6495 14.5548 13.8196C14.4802 13.9897 14.3705 14.1424 14.2328 14.2679C14.095 14.3934 13.9321 14.489 13.7538 14.5485C13.5754 14.608 13.3857 14.6301 13.1973 14.6133C11.1619 14.3904 9.21438 13.6894 7.51973 12.56C5.94444 11.5305 4.62208 10.2081 3.59267 8.63267C2.45867 6.92909 1.75761 4.97115 1.53867 2.92667C1.52188 2.73862 1.54375 2.54929 1.60287 2.37119C1.66199 2.19309 1.75707 2.03028 1.88203 1.89264C2.00698 1.755 2.15905 1.64518 2.32857 1.57023C2.49809 1.49528 2.68139 1.45679 2.86667 1.45733H4.86667C5.18767 1.45422 5.49949 1.56973 5.73767 1.78153C5.97585 1.99333 6.12208 2.28451 6.14667 2.60267C6.19379 3.23981 6.31401 3.86684 6.50667 4.47333C6.59411 4.73736 6.60428 5.02053 6.53561 5.29038C6.46694 5.56023 6.32211 5.80348 6.12 5.992L5.32667 6.78533C6.28069 8.41799 7.58268 9.71998 9.21533 10.674L10.0087 9.88067C10.1972 9.67856 10.4404 9.53373 10.7103 9.46506C10.9801 9.39639 11.2633 9.40656 11.5273 9.494C12.1338 9.68666 12.7608 9.80688 13.398 9.854C13.7188 9.87875 14.0121 10.0271 14.2241 10.2682C14.4361 10.5093 14.5499 10.8241 14.5433 11.1467L14.6667 11.28Z"
                      stroke="white"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <span className="text-xs font-medium">Start Call</span>
              </button>
            </div>

            {/* Questions Section - Responsive grid */}
            <div className="mb-4 sm:mb-6">
              <div className="flex items-center mb-3 sm:mb-4">
                <h2 className="text-base sm:text-lg font-bold">Questions</h2>
                <div className="ml-2 w-5 h-5 bg-indigo-100 rounded-full flex items-center justify-center">
                  <span className="text-indigo-600 text-xs font-bold">3</span>
                </div>
                <div className="ml-auto">
                  <button className="px-3 sm:px-4 py-1 bg-indigo-600 text-white rounded-md text-xs sm:text-sm">
                    Edit
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
                <div className="bg-gray-50 p-3 sm:p-4 rounded-lg">
                  <p className="text-xs sm:text-sm font-medium mb-2">1. What did they wear?</p>
                  <div className="flex flex-wrap gap-2">
                    <button className="px-2 sm:px-3 py-1 bg-indigo-100 text-indigo-600 rounded-full text-xs">
                      Happy
                    </button>
                    <button className="px-2 sm:px-3 py-1 bg-gray-200 text-gray-700 rounded-full text-xs">
                      Serious
                    </button>
                  </div>
                </div>
                <div className="bg-gray-50 p-3 sm:p-4 rounded-lg">
                  <p className="text-xs sm:text-sm font-medium mb-2">2. What did they wear?</p>
                  <div className="flex flex-wrap gap-2">
                    <button className="px-2 sm:px-3 py-1 bg-indigo-100 text-indigo-600 rounded-full text-xs">
                      Happy
                    </button>
                    <button className="px-2 sm:px-3 py-1 bg-gray-200 text-gray-700 rounded-full text-xs">
                      Serious
                    </button>
                  </div>
                </div>
                <div className="bg-gray-50 p-3 sm:p-4 rounded-lg">
                  <p className="text-xs sm:text-sm font-medium mb-2">3. What did they wear?</p>
                  <div className="flex flex-wrap gap-2">
                    <button className="px-2 sm:px-3 py-1 bg-indigo-100 text-indigo-600 rounded-full text-xs">
                      Happy
                    </button>
                    <button className="px-2 sm:px-3 py-1 bg-gray-200 text-gray-700 rounded-full text-xs">
                      Serious
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Aspect Ratio Dialog - Responsive */}
      <Dialog open={activeOption === "aspect-ratio"} onOpenChange={handleCloseOptionDialog}>
        <DialogContent className="sm:max-w-md w-[calc(100%-32px)] p-0 rounded-lg sm:rounded-xl overflow-hidden max-h-[90vh] sm:max-h-[85vh]">
          <div className="flex flex-col h-full">
            <div className="flex justify-between items-center p-3 sm:p-4 border-b">
              <h1 className="text-base sm:text-lg font-bold">Aspect Ratio</h1>
              <button
                onClick={handleCloseOptionDialog}
                className="text-gray-500 hover:text-gray-700 rounded-full p-1 hover:bg-gray-100"
                aria-label="Close dialog"
              >
                <X size={18} />
              </button>
            </div>

            <div className="p-3 sm:p-4 overflow-y-auto">
              <div className="space-y-3 sm:space-y-4">
                <div className="flex items-center">
                  <div className="w-4 h-4 rounded-full bg-indigo-600 mr-2"></div>
                  <label className="text-sm font-medium">16:9</label>
                </div>

                <div className="flex items-center">
                  <div className="w-4 h-4 rounded-full border border-gray-300 mr-2"></div>
                  <label className="text-sm font-medium">4:3</label>
                </div>

                <div className="flex items-center">
                  <div className="w-4 h-4 rounded-full border border-gray-300 mr-2"></div>
                  <label className="text-sm font-medium">1:1</label>
                </div>

                <div className="flex items-center">
                  <div className="w-4 h-4 rounded-full border border-gray-300 mr-2"></div>
                  <label className="text-sm font-medium">9:16</label>
                </div>

                <div className="flex items-center">
                  <div className="w-4 h-4 rounded-full border border-gray-300 mr-2"></div>
                  <label className="text-sm font-medium">Custom</label>
                </div>
              </div>
            </div>

            <div className="flex justify-end items-center p-3 sm:p-4 border-t mt-auto">
              <button
                onClick={handleCloseOptionDialog}
                className="px-3 sm:px-4 py-1.5 sm:py-2 mr-2 border border-gray-300 rounded-md text-gray-700 text-sm"
              >
                Cancel
              </button>
              <button
                onClick={handleCloseOptionDialog}
                className="px-3 sm:px-4 py-1.5 sm:py-2 bg-indigo-600 text-white rounded-md text-sm"
              >
                Apply
              </button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Voice Dialog - Responsive */}
      <Dialog open={activeOption === "voice"} onOpenChange={handleCloseOptionDialog}>
        <DialogContent className="sm:max-w-md w-[calc(100%-32px)] p-0 rounded-lg sm:rounded-xl overflow-hidden max-h-[90vh] sm:max-h-[85vh]">
          <div className="flex flex-col h-full">
            <div className="flex justify-between items-center p-3 sm:p-4 border-b">
              <h1 className="text-base sm:text-lg font-bold">Voice</h1>
              <button
                onClick={handleCloseOptionDialog}
                className="text-gray-500 hover:text-gray-700 rounded-full p-1 hover:bg-gray-100"
                aria-label="Close dialog"
              >
                <X size={18} />
              </button>
            </div>

            <div className="p-3 sm:p-4 overflow-y-auto">
              <div className="space-y-3 sm:space-y-4">
                <div>
                  <label className="text-sm font-medium block mb-2">Select Voice</label>
                  <div className="relative">
                    <select className="w-full p-2 border border-gray-300 rounded-md appearance-none pr-8 text-sm">
                      <option>English (USA)</option>
                      <option>English (UK)</option>
                      <option>Spanish</option>
                      <option>French</option>
                      <option>German</option>
                    </select>
                    <ChevronDown
                      size={16}
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 pointer-events-none"
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-1">
                    <label className="text-sm font-medium">Pitch</label>
                    <span className="text-sm text-indigo-600">50%</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    defaultValue="50"
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                  />
                </div>

                <div>
                  <div className="flex justify-between items-center mb-1">
                    <label className="text-sm font-medium">Speed</label>
                    <span className="text-sm text-indigo-600">60%</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    defaultValue="60"
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                  />
                </div>

                <div>
                  <div className="flex justify-between items-center mb-1">
                    <label className="text-sm font-medium">Clarity</label>
                    <span className="text-sm text-indigo-600">75%</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    defaultValue="75"
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-end items-center p-3 sm:p-4 border-t mt-auto">
              <button
                onClick={handleCloseOptionDialog}
                className="px-3 sm:px-4 py-1.5 sm:py-2 mr-2 border border-gray-300 rounded-md text-gray-700 text-sm"
              >
                Cancel
              </button>
              <button
                onClick={handleCloseOptionDialog}
                className="px-3 sm:px-4 py-1.5 sm:py-2 bg-indigo-600 text-white rounded-md text-sm"
              >
                Apply
              </button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Background Dialog - Responsive */}
      <Dialog open={activeOption === "background"} onOpenChange={handleCloseOptionDialog}>
        <DialogContent className="sm:max-w-md w-[calc(100%-32px)] p-0 rounded-lg sm:rounded-xl overflow-hidden max-h-[90vh] sm:max-h-[85vh]">
          <div className="flex flex-col h-full">
            <div className="flex justify-between items-center p-3 sm:p-4 border-b">
              <h1 className="text-base sm:text-lg font-bold">Background</h1>
              <button
                onClick={handleCloseOptionDialog}
                className="text-gray-500 hover:text-gray-700 rounded-full p-1 hover:bg-gray-100"
                aria-label="Close dialog"
              >
                <X size={18} />
              </button>
            </div>

            <div className="p-3 sm:p-4 overflow-y-auto">
              <div className="space-y-3 sm:space-y-4">
                <div className="flex items-center">
                  <div className="w-4 h-4 rounded-full bg-indigo-600 mr-2"></div>
                  <label className="text-sm font-medium">Original</label>
                </div>

                <div className="flex items-center">
                  <div className="w-4 h-4 rounded-full border border-gray-300 mr-2"></div>
                  <label className="text-sm font-medium">Blur</label>
                </div>

                <div className="flex items-center">
                  <div className="w-4 h-4 rounded-full border border-gray-300 mr-2"></div>
                  <label className="text-sm font-medium">Remove</label>
                </div>

                <div className="flex items-center">
                  <div className="w-4 h-4 rounded-full border border-gray-300 mr-2"></div>
                  <label className="text-sm font-medium">Custom</label>
                </div>
              </div>
            </div>

            <div className="flex justify-end items-center p-3 sm:p-4 border-t mt-auto">
              <button
                onClick={handleCloseOptionDialog}
                className="px-3 sm:px-4 py-1.5 sm:py-2 mr-2 border border-gray-300 rounded-md text-gray-700 text-sm"
              >
                Cancel
              </button>
              <button
                onClick={handleCloseOptionDialog}
                className="px-3 sm:px-4 py-1.5 sm:py-2 bg-indigo-600 text-white rounded-md text-sm"
              >
                Apply
              </button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Adjust Background Dialog - Responsive */}
      <Dialog open={activeOption === "adjust-background"} onOpenChange={handleCloseOptionDialog}>
        <DialogContent className="sm:max-w-md w-[calc(100%-32px)] p-0 rounded-lg sm:rounded-xl overflow-hidden max-h-[90vh] sm:max-h-[85vh]">
          <div className="flex flex-col">
            <div className="flex justify-between items-center p-3 sm:p-4 border-b">
              <h1 className="text-base sm:text-lg font-bold">Adjust Background</h1>
              <button
                onClick={handleCloseOptionDialog}
                className="text-gray-500 hover:text-gray-700 rounded-full p-1 hover:bg-gray-100"
                aria-label="Close dialog"
              >
                <X size={18} />
              </button>
            </div>

            <div className="p-3 sm:p-4 overflow-y-auto">
              <div className="space-y-3 sm:space-y-4">
                <div>
                  <label className="text-sm font-medium block mb-2">Colors</label>
                  <div className="flex flex-wrap gap-2">
                    {[
                      "#FF5733",
                      "#33FF57",
                      "#3357FF",
                      "#F3FF33",
                      "#FF33F3",
                      "#33FFF3",
                      "#FF3333",
                      "#33FF33",
                      "#3333FF",
                      "#FFFF33",
                      "#FF33FF",
                      "#33FFFF",
                    ].map((color, index) => (
                      <div
                        key={index}
                        className="w-5 h-5 sm:w-6 sm:h-6 rounded-full cursor-pointer"
                        style={{ backgroundColor: color }}
                      ></div>
                    ))}
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-1">
                    <label className="text-sm font-medium">Brightness</label>
                    <span className="text-sm text-indigo-600">70%</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    defaultValue="70"
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                  />
                </div>

                <div>
                  <div className="flex justify-between items-center mb-1">
                    <label className="text-sm font-medium">Contrast</label>
                    <span className="text-sm text-indigo-600">50%</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    defaultValue="50"
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-end items-center p-3 sm:p-4 border-t mt-auto">
              <button
                onClick={handleCloseOptionDialog}
                className="px-3 sm:px-4 py-1.5 sm:py-2 mr-2 border border-gray-300 rounded-md text-gray-700 text-sm"
              >
                Cancel
              </button>
              <button
                onClick={handleCloseOptionDialog}
                className="px-3 sm:px-4 py-1.5 sm:py-2 bg-indigo-600 text-white rounded-md text-sm"
              >
                Apply
              </button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Music Dialog - Responsive */}
      <Dialog open={activeOption === "music"} onOpenChange={handleCloseOptionDialog}>
        <DialogContent className="sm:max-w-md w-[calc(100%-32px)] p-0 rounded-lg sm:rounded-xl overflow-hidden max-h-[90vh] sm:max-h-[85vh]">
          <div className="flex flex-col">
            <div className="flex justify-between items-center p-3 sm:p-4 border-b">
              <h1 className="text-base sm:text-lg font-bold">Music</h1>
              <button
                onClick={handleCloseOptionDialog}
                className="text-gray-500 hover:text-gray-700 rounded-full p-1 hover:bg-gray-100"
                aria-label="Close dialog"
              >
                <X size={18} />
              </button>
            </div>

            <div className="p-3 sm:p-4 overflow-y-auto">
              <div className="space-y-3 sm:space-y-4">
                <div className="flex items-center">
                  <div className="w-4 h-4 rounded-full bg-indigo-600 mr-2"></div>
                  <label className="text-sm font-medium">No Music</label>
                </div>

                <div className="flex items-center">
                  <div className="w-4 h-4 rounded-full border border-gray-300 mr-2"></div>
                  <label className="text-sm font-medium">Peaceful Piano</label>
                </div>

                <div className="flex items-center">
                  <div className="w-4 h-4 rounded-full border border-gray-300 mr-2"></div>
                  <label className="text-sm font-medium">Acoustic Guitar</label>
                </div>

                <div className="flex items-center">
                  <div className="w-4 h-4 rounded-full border border-gray-300 mr-2"></div>
                  <label className="text-sm font-medium">Ambient</label>
                </div>

                <div className="flex items-center">
                  <div className="w-4 h-4 rounded-full border border-gray-300 mr-2"></div>
                  <label className="text-sm font-medium">Classical</label>
                </div>
              </div>

              <div className="mt-4">
                <div className="flex justify-between items-center mb-1">
                  <label className="text-sm font-medium">Volume</label>
                  <span className="text-sm text-indigo-600">60%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  defaultValue="60"
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
              </div>
            </div>

            <div className="flex justify-end items-center p-3 sm:p-4 border-t mt-auto">
              <button
                onClick={handleCloseOptionDialog}
                className="px-3 sm:px-4 py-1.5 sm:py-2 mr-2 border border-gray-300 rounded-md text-gray-700 text-sm"
              >
                Cancel
              </button>
              <button
                onClick={handleCloseOptionDialog}
                className="px-3 sm:px-4 py-1.5 sm:py-2 bg-indigo-600 text-white rounded-md text-sm"
              >
                Apply
              </button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Export Dialog - Responsive */}
      <Dialog open={activeOption === "export"} onOpenChange={handleCloseOptionDialog}>
        <DialogContent className="sm:max-w-md w-[calc(100%-32px)] p-0 rounded-lg sm:rounded-xl overflow-hidden max-h-[90vh] sm:max-h-[85vh]">
          <div className="flex flex-col">
            <div className="flex justify-between items-center p-3 sm:p-4 border-b">
              <h1 className="text-base sm:text-lg font-bold">Export Quality</h1>
              <button
                onClick={handleCloseOptionDialog}
                className="text-gray-500 hover:text-gray-700 rounded-full p-1 hover:bg-gray-100"
                aria-label="Close dialog"
              >
                <X size={18} />
              </button>
            </div>

            <div className="p-3 sm:p-4 overflow-y-auto">
              <div className="space-y-3 sm:space-y-4">
                <div className="flex items-center">
                  <div className="w-4 h-4 rounded-full bg-indigo-600 mr-2"></div>
                  <label className="text-sm font-medium">HD (720p)</label>
                </div>

                <div className="flex items-center">
                  <div className="w-4 h-4 rounded-full border border-gray-300 mr-2"></div>
                  <label className="text-sm font-medium">Full HD (1080p)</label>
                </div>

                <div className="flex items-center">
                  <div className="w-4 h-4 rounded-full border border-gray-300 mr-2"></div>
                  <label className="text-sm font-medium">4K</label>
                </div>

                <div className="flex items-center">
                  <div className="w-4 h-4 rounded-full border border-gray-300 mr-2"></div>
                  <label className="text-sm font-medium">SD (480p)</label>
                </div>
              </div>

              <div className="mt-4">
                <div className="flex justify-between items-center mb-1">
                  <label className="text-sm font-medium">Bitrate</label>
                  <span className="text-sm text-indigo-600">5 Mbps</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  defaultValue="50"
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
              </div>
            </div>

            <div className="flex justify-end items-center p-3 sm:p-4 border-t mt-auto">
              <button
                onClick={handleCloseOptionDialog}
                className="px-3 sm:px-4 py-1.5 sm:py-2 mr-2 border border-gray-300 rounded-md text-gray-700 text-sm"
              >
                Cancel
              </button>
              <button
                onClick={handleCloseOptionDialog}
                className="px-3 sm:px-4 py-1.5 sm:py-2 bg-indigo-600 text-white rounded-md text-sm"
              >
                Apply
              </button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
