"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Mic, MicOff, Camera, CameraOff, MoreVertical, PhoneOff, Volume2 } from "lucide-react"

interface VideoCallProps {
  isOpen: boolean
  onClose: () => void
  videoData: {
    id: string
    title: string
    thumbnail: string
  }
}

export default function VideoCall({ isOpen, onClose, videoData }: VideoCallProps) {
  const [callTime, setCallTime] = useState(0)
  const [isMuted, setIsMuted] = useState(false)
  const [isCameraOff, setIsCameraOff] = useState(false)

  // Timer effect
  useEffect(() => {
    if (!isOpen) return

    const timer = setInterval(() => {
      setCallTime((prev) => prev + 1)
    }, 1000)

    return () => clearInterval(timer)
  }, [isOpen])

  // Format time as MM:SS
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  // Toggle microphone
  const toggleMicrophone = () => {
    setIsMuted(!isMuted)
  }

  // Toggle camera
  const toggleCamera = () => {
    setIsCameraOff(!isCameraOff)
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black z-50 flex items-center justify-center">
      {/* Main container with proper aspect ratio */}
      <div className="relative w-full max-w-[1200px] h-[calc(100vh-48px)] mx-auto rounded-lg overflow-hidden">
        {/* Left black sidebar */}
        <div className="absolute left-0 top-0 bottom-0 w-[20%] bg-black z-10"></div>

        {/* Right black sidebar */}
        <div className="absolute right-0 top-0 bottom-0 w-[20%] bg-black z-10"></div>

        {/* AI Person Video (Center area) */}
        <div className="absolute left-[20%] right-[20%] top-0 bottom-0">
          <Image
            src={videoData.thumbnail || "/placeholder.svg"}
            alt={videoData.title}
            fill
            className="object-cover object-center"
            priority
          />
        </div>

        {/* Top bar */}
        <div className="absolute top-6 left-0 right-0 flex justify-between items-center px-6 z-20">
          <div className="flex items-center">
            {/* Recording indicator */}
            <div className="bg-gray-700/80 text-white text-sm py-1.5 px-3 rounded-md flex items-center">
              This call is being recorded
            </div>
            <button className="ml-2 bg-red-600 text-white text-sm py-1.5 px-4 rounded-md">Stop</button>
          </div>

          {/* Timer */}
          <div className="text-white text-xl font-medium">{formatTime(callTime)}</div>

          {/* Logo */}
          <div>
            <Image src="/joss-logo.png" alt="JOSS" width={100} height={40} />
          </div>
        </div>

        {/* User video (small) */}
        <div className="absolute bottom-24 right-6 w-[180px] h-[120px] rounded-lg overflow-hidden border-2 border-white/20 z-20">
          {!isCameraOff ? (
            <Image src="/woman-pink-background.png" alt="User camera" fill className="object-cover" />
          ) : (
            <div className="w-full h-full bg-gray-800 flex items-center justify-center">
              <CameraOff className="h-8 w-8 text-white/60" />
            </div>
          )}
          {/* Camera indicator */}
          <div
            className={`absolute top-2 right-2 w-3 h-3 ${isCameraOff ? "bg-red-500" : "bg-green-500"} rounded-full`}
          ></div>
        </div>

        {/* Volume control (bottom left) */}
        <div className="absolute bottom-6 left-6 z-20">
          <button className="bg-gray-700/80 p-3 rounded-full">
            <Volume2 className="h-5 w-5 text-white" />
          </button>
        </div>

        {/* Call controls (bottom center) */}
        <div className="absolute bottom-6 left-0 right-0 flex justify-center items-center space-x-4 z-20">
          {/* Screenshot/Camera */}
          <button className="bg-red-600 p-3 rounded-full">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z"
                fill="white"
              />
              <path
                d="M20 4H16.83L15.59 2.65C15.22 2.24 14.68 2 14.12 2H9.88C9.32 2 8.78 2.24 8.41 2.65L7.17 4H4C2.9 4 2 4.9 2 6V18C2 19.1 2.9 20 4 20H20C21.1 20 22 19.1 22 18V6C22 4.9 21.1 4 20 4ZM12 17C9.24 17 7 14.76 7 12C7 9.24 9.24 7 12 7C14.76 7 17 9.24 17 12C17 14.76 14.76 17 12 17Z"
                fill="white"
              />
            </svg>
          </button>

          {/* Video camera */}
          <button
            className={`p-3 rounded-full ${isCameraOff ? "bg-gray-700/80" : "bg-blue-600"}`}
            onClick={toggleCamera}
            aria-label={isCameraOff ? "Turn camera on" : "Turn camera off"}
          >
            {isCameraOff ? <CameraOff className="h-5 w-5 text-white" /> : <Camera className="h-5 w-5 text-white" />}
          </button>

          {/* Microphone */}
          <button
            className={`p-3 rounded-full ${isMuted ? "bg-gray-700/80" : "bg-white"}`}
            onClick={toggleMicrophone}
            aria-label={isMuted ? "Unmute microphone" : "Mute microphone"}
          >
            {isMuted ? <MicOff className="h-5 w-5 text-white" /> : <Mic className="h-5 w-5 text-gray-800" />}
          </button>

          {/* More options */}
          <button className="bg-white p-3 rounded-full">
            <MoreVertical className="h-5 w-5 text-gray-800" />
          </button>

          {/* End call */}
          <button className="bg-red-600 p-3 rounded-full" onClick={onClose}>
            <PhoneOff className="h-5 w-5 text-white" />
          </button>
        </div>
      </div>
    </div>
  )
}
