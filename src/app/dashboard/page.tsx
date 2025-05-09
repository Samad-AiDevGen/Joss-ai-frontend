"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Heart, Play, Search, Bell, Upload, Menu, X } from "lucide-react"
import UploadDialog from "@/components/upload-dialog" // Upload Photo Dialog
import VideoGenerator from "@/components/video-generator" // Video Generator Dialog
import VideoCall from "@/components/video-call" // Video Call Component
import ExportVideo from "@/components/export-video" // Export Video Component

interface VideoCardProps {
  id: string
  title: string
  duration: string
  thumbnail: string
}

const VideoCard = ({
  id,
  title,
  duration,
  thumbnail,
  onPlay,
  onExport,
}: VideoCardProps & {
  onPlay: (video: VideoCardProps) => void
  onExport: (video: VideoCardProps) => void
}) => {
  return (
    <div className="relative group">
      <div className="relative w-full aspect-square rounded-lg overflow-hidden">
        <Image
          src={thumbnail || "/placeholder.svg"}
          alt={title}
          fill
          className="object-cover transition-transform group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <button
            className="bg-white rounded-full p-2 shadow-lg"
            onClick={() => onPlay({ id, title, duration, thumbnail })}
          >
            <Play className="h-6 w-6 text-purple-600 fill-purple-600" />
          </button>
        </div>
        {/* Green recording indicator */}
        <div className="absolute top-2 right-2 bg-green-400 rounded-full w-6 h-6 flex items-center justify-center">
          <div className="w-2 h-2 bg-white rounded-full"></div>
        </div>
        {/* Duration */}
        <div className="absolute bottom-2 right-2 bg-black/60 text-white text-xs px-1.5 py-0.5 rounded">{duration}</div>
      </div>
      <div className="mt-2">
        <h3 className="font-medium text-sm">{title}</h3>
        <div className="flex justify-between items-center mt-1">
          <span className="text-xs text-gray-500">{duration}</span>
          <div className="flex gap-1">
            <button
              className="bg-purple-600 text-white text-xs px-2 py-0.5 rounded"
              onClick={() => onExport({ id, title, duration, thumbnail })}
            >
              Export
            </button>
            <button className="bg-gray-200 text-gray-700 text-xs px-2 py-0.5 rounded">Edit</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function Dashboard() {
  const router = useRouter()
  const [isUploadDialogOpen, setIsUploadDialogOpen] = useState(false)
  const [isVideoGeneratorOpen, setIsVideoGeneratorOpen] = useState(false)
  const [activeVideoCall, setActiveVideoCall] = useState<VideoCardProps | null>(null)
  const [activeExportVideo, setActiveExportVideo] = useState<VideoCardProps | null>(null)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const recentVideos = [
    {
      id: "1",
      title: "Example Video 1",
      duration: "00:56",
      thumbnail: "/elderly-woman-portrait.png",
    },
    {
      id: "2",
      title: "Example Video 3",
      duration: "02:23",
      thumbnail: "/elderly-man-smiling-hat.png",
    },
    {
      id: "4",
      title: "Example Video 4",
      duration: "00:42",
      thumbnail: "/serious-elderly-man.png",
    },
    {
      id: "5",
      title: "Example Video 5",
      duration: "01:15",
      thumbnail: "/elderly-woman-glasses.png",
    },
    {
      id: "6",
      title: "Example Video 6",
      duration: "03:10",
      thumbnail: "/middle-aged-man-portrait.png",
    },
    {
      id: "7",
      title: "Example Video 7",
      duration: "02:35",
      thumbnail: "/elderly-man-beard.png",
    },
  ]

  const handleUploadComplete = (fileUrl: string) => {
    console.log("File uploaded:", fileUrl)
    // Navigate to generate page after upload
    router.push("/dashboard/generate")
  }

  const handlePlayVideo = (video: VideoCardProps) => {
    setActiveVideoCall(video)
  }

  const handleExportVideo = (video: VideoCardProps) => {
    setActiveExportVideo(video)
  }

  const handleVideoCallEnd = (videoId: string) => {
    // When a video call ends, we can offer to export it
    const video = recentVideos.find((v) => v.id === videoId)
    if (video) {
      setActiveVideoCall(null)
      setActiveExportVideo(video)
    } else {
      setActiveVideoCall(null)
    }
  }

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen)
  }

  return (
    <div className="relative">
      {/* Mobile Menu Button - Only visible on small screens */}
      <button
        className="fixed top-4 right-4 z-50 md:hidden bg-white p-2 rounded-full shadow-md"
        onClick={toggleMobileMenu}
      >
        {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 bg-black/50 z-40 md:hidden" onClick={() => setMobileMenuOpen(false)} />
      )}

      {/* Mobile Menu */}
      <div
        className={`fixed top-0 right-0 h-full w-[250px] bg-white z-40 transform transition-transform duration-300 ease-in-out ${mobileMenuOpen ? "translate-x-0" : "translate-x-full"} md:hidden overflow-auto`}
      >
        <div className="p-6 space-y-6">
          <div className="flex items-center gap-2 mb-8">
            <div className="w-10 h-10 rounded-full overflow-hidden">
              <Image src="/professional-headshot.png" alt="Rob John Gonzalez" width={40} height={40} />
            </div>
            <div>
              <p className="font-medium">Rob John Gonzalez</p>
              <p className="text-xs text-gray-500">Premium User</p>
            </div>
          </div>

          <button className="w-full bg-purple-100 text-purple-600 px-4 py-2 rounded-lg text-sm font-medium mb-4">
            Download App
          </button>

          {/* Storage Section from Sidebar */}
          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
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
              <h2 className="text-base font-bold">Storage</h2>
            </div>

            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mr-3 relative">
                  <div className="w-9 h-9 rounded-full bg-indigo-600 flex items-center justify-center text-white font-bold text-xs">
                    66%
                  </div>
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
                  <p className="font-bold text-sm">18.2 GB</p>
                  <p className="text-xs text-gray-500">of 27.5 GB</p>
                </div>
              </div>
            </div>
          </div>

          {/* Premium Upgrade from Sidebar */}
          <div className="bg-purple-600 rounded-xl p-4 text-white">
            <h2 className="text-lg font-bold mb-2">Upgrade Premium</h2>
            <p className="text-purple-200 text-sm mb-4">Enjoy full features & unlimited storage</p>
            <button className="bg-white text-purple-600 px-4 py-2 rounded-lg font-medium mb-2 w-full text-sm">
              Get Pro Now
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-col md:flex-row p-4 md:p-6">
        {/* Upload Dialog */}
        <UploadDialog
          isOpen={isUploadDialogOpen}
          onClose={() => setIsUploadDialogOpen(false)}
          onUploadComplete={handleUploadComplete}
        />

        {/* Video Call */}
        <VideoCall
          isOpen={!!activeVideoCall}
          onClose={() => handleVideoCallEnd(activeVideoCall?.id || "")}
          videoData={activeVideoCall || { id: "", title: "", thumbnail: "" }}
        />

        {/* Export Video */}
        <ExportVideo
          isOpen={!!activeExportVideo}
          onClose={() => setActiveExportVideo(null)}
          videoData={activeExportVideo || { id: "", title: "", thumbnail: "", duration: "" }}
        />

        {/* Main Content Area */}
        <div className="flex-1 md:pr-6">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6 md:mb-8 gap-4">
            <div className="flex flex-col md:flex-row md:items-center gap-4">
              <div>
                <h1 className="text-xl md:text-2xl font-bold">Joss AI</h1>
                <p className="text-sm text-gray-500">(Image to video generator)</p>
              </div>
              {/* Upload Photo Button */}
              <button
                className="self-start md:ml-6 border border-purple-600 text-purple-600 px-4 py-1.5 rounded-full text-sm font-medium flex items-center gap-1.5"
                onClick={() => setIsUploadDialogOpen(true)}
              >
                <Upload size={14} />
                Upload Photo
              </button>
            </div>

            {/* Desktop Header Actions - Hidden on mobile */}
            <div className="hidden md:flex items-center gap-4">
              <button className="bg-purple-100 text-purple-600 px-4 py-1.5 rounded-full text-sm font-medium">
                Download App
              </button>
              <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                <Search className="h-4 w-4 text-gray-600" />
              </div>
              <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                <Bell className="h-4 w-4 text-gray-600" />
              </div>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full overflow-hidden">
                  <Image src="/professional-headshot.png" alt="Rob John Gonzalez" width={32} height={32} />
                </div>
                <span className="text-sm font-medium">Rob John Gonzalez</span>
              </div>
            </div>

            {/* Mobile Header Actions */}
            <div className="flex md:hidden items-center justify-between">
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                  <Search className="h-4 w-4 text-gray-600" />
                </div>
                <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                  <Bell className="h-4 w-4 text-gray-600" />
                </div>
              </div>
            </div>
          </div>

          {/* Hero Banner */}
          <div className="relative bg-indigo-900 rounded-xl p-4 md:p-6 mb-6 md:mb-8 overflow-hidden">
            {/* Background Image */}
            <Image
              src="/ai-face-blue.png"
              alt="AI Face Background"
              fill
              className="object-cover scale-95 md:scale-100 opacity-20 z-0 transition-transform duration-300"
            />

            {/* Foreground Content */}
            <div className="relative z-10 max-w-md">
              <h2 className="text-xl md:text-2xl font-bold text-white mb-2">
                Ready to Meet the person you love? <Heart className="inline-block h-5 w-5 text-red-500 fill-red-500" />
              </h2>
              <p className="text-indigo-100 mb-4 text-sm md:text-base">
                Meet the ones you&apos;ve missed by converting ordinary photos into realistic videos.
              </p>
              <button
                className="bg-white text-indigo-900 px-4 py-2 rounded-lg font-medium text-sm"
                onClick={() => setIsVideoGeneratorOpen(true)}
              >
                Generate Now
              </button>
            </div>
          </div>

          {/* Recent Videos */}
          <div>
            <div className="flex items-center mb-4">
              <div className="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center mr-2">
                <Play className="h-3 w-3 text-purple-600 fill-purple-600" />
              </div>
              <h2 className="text-lg font-bold">Recent Videos</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {recentVideos.map((video) => (
                <VideoCard
                  key={video.id}
                  id={video.id}
                  title={video.title}
                  duration={video.duration}
                  thumbnail={video.thumbnail}
                  onPlay={handlePlayVideo}
                  onExport={handleExportVideo}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Right Sidebar - Hidden on mobile */}
        <div className="hidden md:flex md:w-[300px] flex-col gap-6">
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

      {/* Mobile Footer - Only visible on mobile */}
      <div className="block md:hidden mt-8 p-4 text-center text-xs text-gray-500">
        © 2024 JOSS AI. All Rights Reserved.
      </div>

      {/* Video Generator */}
      <VideoGenerator
        isOpen={isVideoGeneratorOpen}
        onClose={() => setIsVideoGeneratorOpen(false)}
        onGenerationComplete={(videoUrl) => {
          console.log("Video generated:", videoUrl)
          // Here you would typically update your state or trigger a refresh
          // to show the newly generated video in your videos list
        }}
      />
    </div>
  )
}
