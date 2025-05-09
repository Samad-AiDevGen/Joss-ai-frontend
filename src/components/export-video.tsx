"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import { ArrowLeft, Trash2, Volume2, Play, Pause, RotateCcw, Maximize2, Share2 } from "lucide-react"
import ShareDialog from "./share-dialog"

interface ExportVideoProps {
  isOpen: boolean
  onClose: () => void
  videoData: {
    id: string
    title: string
    thumbnail: string
    duration: string
    date?: string
    emotion?: string
    facialExpression?: string
  }
}

export default function ExportVideo({ isOpen, onClose, videoData }: ExportVideoProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [isShareDialogOpen, setIsShareDialogOpen] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)
  const progressRef = useRef<HTMLInputElement>(null)

  // Format for displaying time as MM:SS
  const formatTime = (timeInSeconds: number) => {
    const minutes = Math.floor(timeInSeconds / 60)
    const seconds = Math.floor(timeInSeconds % 60)
    return `${minutes}:${seconds.toString().padStart(2, "0")}`
  }

  // Toggle play/pause
  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause()
      } else {
        videoRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  // Update progress bar as video plays
  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime)
      if (progressRef.current) {
        progressRef.current.value = String(videoRef.current.currentTime)
      }
    }
  }

  // Handle seeking when user drags the progress bar
  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const seekTime = Number(e.target.value)
    setCurrentTime(seekTime)
    if (videoRef.current) {
      videoRef.current.currentTime = seekTime
    }
  }

  // Reset video to beginning
  const handleReset = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0
      setCurrentTime(0)
      if (progressRef.current) {
        progressRef.current.value = "0"
      }
    }
  }

  // Set up video duration when metadata is loaded
  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration)
    }
  }

  // Handle export action
  const handleExport = () => {
    // In a real app, this would trigger the export process
    console.log("Exporting video:", videoData.id)
    // Don't close the dialog or show an alert
    // We want to keep the user in the export view
  }

  // Handle delete action
  const handleDelete = () => {
    if (confirm("Are you sure you want to delete this video?")) {
      console.log("Deleting video:", videoData.id)
      onClose()
    }
  }

  // Handle share action
  const handleShare = () => {
    setIsShareDialogOpen(true)
  }

  // Clean up when component unmounts
  useEffect(() => {
    return () => {
      if (videoRef.current) {
        videoRef.current.pause()
      }
    }
  }, [])

  if (!isOpen) return null

  // For demo purposes, we'll use the thumbnail as a static video frame
  // In a real implementation, you would use an actual video file
  const videoSrc = videoData.thumbnail

  return (
    <div className="fixed inset-0 bg-white z-50 overflow-auto">
      <div className="flex flex-col min-h-screen">
        {/* Header */}
        <header className="flex items-center justify-between p-4 border-b">
          <div className="flex items-center">
            <Image src="/joss-logo.png" alt="JOSS" width={80} height={30} priority />
            <h1 className="text-xl font-bold ml-4">Export Video</h1>
          </div>
          <div className="flex items-center gap-4">
            <button className="p-2">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="text-gray-700"
              >
                <path
                  d="M18 8C18 6.4087 17.3679 4.88258 16.2426 3.75736C15.1174 2.63214 13.5913 2 12 2C10.4087 2 8.88258 2.63214 7.75736 3.75736C6.63214 4.88258 6 6.4087 6 8C6 15 3 17 3 17H21C21 17 18 15 18 8Z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M13.73 21C13.5542 21.3031 13.3019 21.5547 12.9982 21.7295C12.6946 21.9044 12.3504 21.9965 12 21.9965C11.6496 21.9965 11.3054 21.9044 11.0018 21.7295C10.6982 21.5547 10.4458 21.3031 10.27 21"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full overflow-hidden">
                <Image src="/professional-headshot.png" alt="User" width={32} height={32} />
              </div>
              <span className="text-sm font-medium hidden md:inline">Alex Jack Abimanyu</span>
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="text-gray-700"
              >
                <path
                  d="M5 7.5L10 12.5L15 7.5"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <div className="flex flex-col md:flex-row flex-1 p-4">
          {/* Left Sidebar */}
          <div className="hidden md:block w-[200px] pr-4">
            <div className="bg-purple-50 rounded-lg p-3 mb-4">
              <div className="flex items-center gap-3 text-purple-600">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="2.5" y="2.5" width="6.25" height="6.25" rx="1.25" fill="currentColor" fillOpacity="0.2" />
                  <rect x="2.5" y="11.25" width="6.25" height="6.25" rx="1.25" fill="currentColor" fillOpacity="0.2" />
                  <rect x="11.25" y="2.5" width="6.25" height="6.25" rx="1.25" fill="currentColor" fillOpacity="0.2" />
                  <rect
                    x="11.25"
                    y="11.25"
                    width="6.25"
                    height="6.25"
                    rx="1.25"
                    fill="currentColor"
                    fillOpacity="0.2"
                  />
                </svg>
                <span className="font-medium">Dashboard</span>
              </div>
            </div>

            <div className="p-3 mb-4">
              <div className="flex items-center gap-3 text-gray-600">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M17.5 12.5V15.8333C17.5 16.2754 17.3244 16.6993 17.0118 17.0118C16.6993 17.3244 16.2754 17.5 15.8333 17.5H4.16667C3.72464 17.5 3.30072 17.3244 2.98816 17.0118C2.67559 16.6993 2.5 16.2754 2.5 15.8333V4.16667C2.5 3.72464 2.67559 3.30072 2.98816 2.98816C3.30072 2.67559 3.72464 2.5 4.16667 2.5H7.5"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M10 12.5H12.5L17.5 7.5C17.8978 7.10217 18.1213 6.56259 18.1213 6C18.1213 5.43741 17.8978 4.89782 17.5 4.5C17.1022 4.10217 16.5626 3.87868 16 3.87868C15.4374 3.87868 14.8978 4.10217 14.5 4.5L9.5 9.5V12H12L17.5 6.5"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span className="font-medium">Storage</span>
              </div>
            </div>

            <div className="p-3 mb-4">
              <div className="flex items-center gap-3 text-gray-600">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M17.5 5H2.5C2.5 6.38071 3.61929 7.5 5 7.5H15C16.3807 7.5 17.5 8.61929 17.5 10V15C17.5 16.3807 16.3807 17.5 15 17.5H5C3.61929 17.5 2.5 16.3807 2.5 15V5C2.5 3.61929 3.61929 2.5 5 2.5H15C16.3807 2.5 17.5 3.61929 17.5 5Z"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M12.5 12.5C12.5 13.8807 11.3807 15 10 15C8.61929 15 7.5 13.8807 7.5 12.5C7.5 11.1193 8.61929 10 10 10C11.3807 10 12.5 11.1193 12.5 12.5Z"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span className="font-medium">Payment</span>
              </div>
            </div>

            <div className="p-3 mb-4">
              <div className="flex items-center gap-3 text-gray-600">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M10 17.5C14.1421 17.5 17.5 14.1421 17.5 10C17.5 5.85786 14.1421 2.5 10 2.5C5.85786 2.5 2.5 5.85786 2.5 10C2.5 14.1421 5.85786 17.5 10 17.5Z"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M9.375 9.375H10V13.75H10.625"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M9.84375 7.5C10.2579 7.5 10.5938 7.16421 10.5938 6.75C10.5938 6.33579 10.2579 6 9.84375 6C9.42954 6 9.09375 6.33579 9.09375 6.75C9.09375 7.16421 9.42954 7.5 9.84375 7.5Z"
                    fill="currentColor"
                  />
                </svg>
                <span className="font-medium">Help Center</span>
              </div>
            </div>

            <div className="mt-auto">
              <button className="flex items-center gap-2 bg-red-500 text-white rounded-lg py-2 px-4 w-full justify-center">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M13.5938 6.71875L16.875 10L13.5938 13.2812"
                    stroke="white"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M8.125 10H16.875"
                    stroke="white"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M8.125 16.875H3.75C3.58424 16.875 3.42527 16.8092 3.30806 16.6919C3.19085 16.5747 3.125 16.4158 3.125 16.25V3.75C3.125 3.58424 3.19085 3.42527 3.30806 3.30806C3.42527 3.19085 3.58424 3.125 3.75 3.125H8.125"
                    stroke="white"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span>Logout</span>
              </button>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="flex-1 flex flex-col md:flex-row">
            {/* Video Player Section */}
            <div className="flex-1 md:pr-4">
              <div className="flex items-center justify-between mb-4">
                <button onClick={onClose} className="flex items-center text-blue-600 font-medium">
                  <ArrowLeft className="mr-1" size={16} />
                  Back
                </button>
                <div className="flex gap-2">
                  <button
                    onClick={handleShare}
                    className="bg-blue-600 text-white px-4 py-1.5 rounded-md flex items-center"
                  >
                    <Share2 className="mr-1" size={16} />
                    Share
                  </button>
                  <button
                    onClick={handleDelete}
                    className="bg-red-500 text-white px-4 py-1.5 rounded-md flex items-center"
                  >
                    <Trash2 className="mr-1" size={16} />
                    Delete
                  </button>
                </div>
              </div>

              {/* Video Player */}
              <div className="relative bg-black rounded-lg overflow-hidden aspect-video">
                {/* Using an image as placeholder for the video */}
                <Image src={videoSrc || "/placeholder.svg"} alt={videoData.title} fill className="object-contain" />

                {/* JOSS Logo Watermark */}
                <div className="absolute top-4 right-4">
                  <Image src="/joss-logo.png" alt="JOSS" width={80} height={30} />
                </div>

                {/* User Picture-in-Picture */}
                <div className="absolute bottom-16 right-4 w-[120px] h-[80px] rounded-lg overflow-hidden border-2 border-white/20">
                  <Image src="/woman-pink-background.png" alt="User" fill className="object-cover" />
                </div>

                {/* Video Controls */}
                <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white p-2">
                  {/* Progress Bar */}
                  <div className="relative mb-2">
                    <input
                      ref={progressRef}
                      type="range"
                      min="0"
                      max={duration || 100}
                      value={currentTime}
                      onChange={handleSeek}
                      className="w-full h-1 bg-gray-600 rounded-full appearance-none cursor-pointer"
                      style={{
                        background: `linear-gradient(to right, white ${(currentTime / (duration || 100)) * 100}%, gray ${(currentTime / (duration || 100)) * 100}%)`,
                      }}
                    />
                  </div>

                  {/* Time Display and Controls */}
                  <div className="flex items-center justify-between">
                    <span className="text-xs">
                      {formatTime(currentTime)}/{videoData.duration || "01:15"}
                    </span>
                    <div className="flex items-center gap-4">
                      <button onClick={handleReset} className="p-1">
                        <RotateCcw size={18} />
                      </button>
                      <button onClick={togglePlay} className="p-1">
                        {isPlaying ? <Pause size={18} /> : <Play size={18} />}
                      </button>
                      <button className="p-1">
                        <Volume2 size={18} />
                      </button>
                      <button className="p-1">
                        <Maximize2 size={18} />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Hidden video element for handling actual video (not used in this demo) */}
                <video
                  ref={videoRef}
                  className="hidden"
                  onTimeUpdate={handleTimeUpdate}
                  onLoadedMetadata={handleLoadedMetadata}
                >
                  <source src="" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
            </div>

            {/* Right Info Panel */}
            <div className="w-full md:w-[300px] mt-6 md:mt-0">
              <div className="bg-white rounded-lg p-4">
                <div className="flex items-center mb-4">
                  <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center mr-2">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M8 14C11.3137 14 14 11.3137 14 8C14 4.68629 11.3137 2 8 2C4.68629 2 2 4.68629 2 8C2 11.3137 4.68629 14 8 14Z"
                        stroke="#B25CD9"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M8 5.5V8.5L10 10.5"
                        stroke="#B25CD9"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <h2 className="text-lg font-bold">Export Video</h2>
                </div>

                <h3 className="text-lg font-medium mb-1">{videoData.title || "My Grand Mother"}</h3>
                <p className="text-sm text-gray-500 mb-4">{videoData.date || "2024-08-22"}</p>

                <div className="text-right mb-4">
                  <button className="text-blue-600 text-sm">More Details</button>
                </div>

                <div className="space-y-3 mb-6">
                  <div className="flex items-center justify-between bg-gray-100 rounded-md p-3">
                    <span className="text-sm text-gray-600">Emotions:</span>
                    <span className="text-sm font-medium">{videoData.emotion || "Happy"}</span>
                  </div>
                  <div className="flex items-center justify-between bg-gray-100 rounded-md p-3">
                    <span className="text-sm text-gray-600">Facial Expression:</span>
                    <span className="text-sm font-medium">{videoData.facialExpression || "Normal"}</span>
                  </div>
                  <div className="flex items-center justify-between bg-gray-100 rounded-md p-3">
                    <span className="text-sm text-gray-600">Duration:</span>
                    <span className="text-sm font-medium">{videoData.duration || "1m 15s"}</span>
                  </div>
                </div>

                <button
                  onClick={handleExport}
                  className="w-full bg-purple-600 text-white py-3 rounded-lg font-medium flex items-center justify-center"
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="mr-2"
                  >
                    <path
                      d="M17.5 12.5V15.8333C17.5 16.2754 17.3244 16.6993 17.0118 17.0118C16.6993 17.3244 16.2754 17.5 15.8333 17.5H4.16667C3.72464 17.5 3.30072 17.3244 2.98816 17.0118C2.67559 16.6993 2.5 16.2754 2.5 15.8333V12.5"
                      stroke="white"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M5.83301 8.33334L9.99967 12.5L14.1663 8.33334"
                      stroke="white"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M10 12.5V2.5"
                      stroke="white"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  Export Video
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Share Dialog */}
      <ShareDialog
        isOpen={isShareDialogOpen}
        onClose={() => setIsShareDialogOpen(false)}
        videoId={videoData.id}
        videoTitle={videoData.title}
      />
    </div>
  )
}
