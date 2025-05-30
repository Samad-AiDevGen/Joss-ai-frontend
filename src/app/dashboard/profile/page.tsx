"use client"

import Image from "next/image"
import { Edit2, MoreHorizontal, Camera } from "lucide-react" // Added Camera icon
import NavbarDashboard from "@/components/NavbarDashboard"
import { useEffect, useState, useRef } from "react" // Added useRef

export default function ProfilePage() {
  const [profileData, setProfileData] = useState({
    name: "",
    username: "",
    followers: 17,
    email: "",
    birthday: "20 July 1985",
    organization: "Simple Web",
    language: "English",
    profilePicture: "" // Added profilePicture field
  })
  
  const [uploading, setUploading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        // Get user data from localStorage
        const userString = localStorage.getItem("user")
        const token = localStorage.getItem("Joss_Id")
        
        if (!userString || !token) {
          console.error("User data not found in localStorage")
          return
        }

        const user = JSON.parse(userString)
        
        // Fetch profile data from API
        const response = await fetch(`/api/profile?id=${user.id}`)
        const data = await response.json()
        
        if (data.success) {
          setProfileData({
            ...profileData,
            name: data.profile.name,
            username: data.profile.username,
            email: data.profile.email,
            profilePicture: data.profile.profilePicture || "" // Get profilePicture if available
          })
        } else {
          console.error("Failed to fetch profile data:", data.error)
        }
      } catch (error) {
        console.error("Error fetching profile data:", error)
      }
    }

    fetchProfileData()
  }, [])

  // Handle profile picture upload
  const handleProfilePictureUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    
    setUploading(true)
    
    try {
      const token = localStorage.getItem("Joss_Id")
      const userString = localStorage.getItem("user")
      
      if (!token || !userString) {
        console.error("User data not found in localStorage")
        return
      }
      
      const user = JSON.parse(userString)
      
      // Create form data for upload
      const formData = new FormData()
      formData.append('file', file)
      formData.append('userId', user.id)
      
      // Upload to Cloudinary through our API
      const response = await fetch('/api/upload/profile-picture', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData
      })
      
      const data = await response.json()
      
      if (data.success) {
        // Update profile data with new profile picture URL
        setProfileData({
          ...profileData,
          profilePicture: data.imageUrl
        })
      } else {
        console.error("Failed to upload profile picture:", data.error)
      }
    } catch (error) {
      console.error("Error uploading profile picture:", error)
    } finally {
      setUploading(false)
    }
  }

  // Trigger file input click
  const triggerFileInput = () => {
    fileInputRef.current?.click()
  }

  const recentVideos = [
    {
      id: 1,
      title: "Example Photo 1",
      projectId: "#1",
      thumbnail: "/elderly-woman-portrait.png",
    },
    {
      id: 2,
      title: "Example Photo 2",
      projectId: "#2",
      thumbnail: "/elderly-man-smiling-hat.png",
    },
    {
      id: 3,
      title: "Example Photo 3",
      projectId: "#3",
      thumbnail: "/serious-elderly-man.png",
    },
  ]

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header - Using NavbarDashboard directly */}
        <div className="border-b bg-white px-6 py-3">
          <NavbarDashboard 
            title="Profile" 
            showUploadButton={false} 
            user={{ 
              name: profileData.name, 
              email: profileData.email, 
              avatarUrl: profileData.profilePicture || "/professional-headshot.png" // Use uploaded picture if available
            }} 
          />
        </div>

        {/* Content */}
        <main className="flex-1 bg-gray-50 p-6">
          <div className="max-w-6xl mx-auto">
            {/* Profile Banner */}
            <div className="relative mb-16">
              <div className="h-60 w-full rounded-lg overflow-hidden bg-gradient-to-r from-blue-900 to-indigo-800">
                <Image src="/abstract-blue-gradient.png" alt="Profile Banner" fill className="object-cover" />
              </div>
              <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2">
                <div className="relative h-24 w-24 rounded-full border-4 border-white overflow-hidden bg-white">
                  <Image 
                    src={profileData.profilePicture || "/professional-headshot.png"} 
                    alt={profileData.name} 
                    fill 
                    className="object-cover" 
                  />
                  
                  {/* Upload button overlay */}
                  <div 
                    className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity cursor-pointer"
                    onClick={triggerFileInput}
                  >
                    <Camera className="text-white" size={20} />
                    {uploading && <span className="text-white text-xs mt-1">Uploading...</span>}
                  </div>
                  
                  {/* Hidden file input */}
                  <input 
                    type="file" 
                    accept="image/*" 
                    ref={fileInputRef} 
                    className="hidden" 
                    onChange={handleProfilePictureUpload} 
                    disabled={uploading}
                  />
                </div>
              </div>
            </div>

            {/* Profile Info */}
            <div className="text-center mb-8">
              <h1 className="text-2xl font-bold">{profileData.name}</h1>
              <p className="text-gray-500">@{profileData.username}</p>
              <div className="mt-2 flex justify-center items-center">
                <span className="font-bold text-xl">{profileData.followers}</span>
                <span className="text-gray-500 ml-1">Followers</span>
              </div>
            </div>

            {/* Rest of your profile page content remains the same */}
            {/* ... */}
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Recent Video Section */}
              <div className="md:col-span-2 bg-white rounded-lg p-6 shadow-sm relative">
                <div className="flex justify-between items-center mb-4">
                  <div className="flex items-center">
                    <div className="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center mr-2">
                      <svg width="12" height="12" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M10 17.5C14.1421 17.5 17.5 14.1421 17.5 10C17.5 5.85786 14.1421 2.5 10 2.5C5.85786 2.5 2.5 5.85786 2.5 10C2.5 14.1421 5.85786 17.5 10 17.5Z"
                          stroke="#9333EA"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                    <h2 className="text-lg font-bold">Recent Video</h2>
                  </div>
                  <button className="text-purple-600">
                    <MoreHorizontal size={20} />
                  </button>
                </div>
                <p className="text-gray-500 text-sm mb-6">Here you can find more details about your projects.</p>

                <div className="space-y-4">
                  {recentVideos.map((video) => (
                    <div key={video.id} className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="h-16 w-16 rounded-md overflow-hidden mr-4">
                          <Image
                            src={video.thumbnail || "/placeholder.svg"}
                            alt={video.title}
                            width={64}
                            height={64}
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <h3 className="font-medium">{video.title}</h3>
                          <p className="text-sm text-gray-500">
                            Project {video.projectId} · <span className="text-purple-600">See details</span>
                          </p>
                        </div>
                      </div>
                      <button className="text-gray-400 hover:text-purple-600">
                        <Edit2 size={16} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* General Information Section */}
              <div className="bg-white rounded-lg p-6 shadow-sm relative">
                <div className="flex justify-between items-center mb-4">
                  <div className="flex items-center">
                    <div className="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center mr-2">
                      <svg width="12" height="12" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M10 17.5C14.1421 17.5 17.5 14.1421 17.5 10C17.5 5.85786 14.1421 2.5 10 2.5C5.85786 2.5 2.5 5.85786 2.5 10C2.5 14.1421 5.85786 17.5 10 17.5Z"
                          stroke="#9333EA"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                    <h2 className="text-lg font-bold">General Information</h2>
                  </div>
                  <button className="text-purple-600">
                    <MoreHorizontal size={20} />
                  </button>
                </div>
                <p className="text-gray-500 text-sm mb-6">
                  As we live, our hearts turn colder. Cause pain is what we go through as we become older. We get
                  insulted by others, lose trust for those others. We get back stabbed by friends.
                </p>

                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm text-gray-500 mb-1">Username</label>
                      <p className="font-medium">{profileData.username}</p>
                    </div>

                    <div>
                      <label className="block text-sm text-gray-500 mb-1">Name</label>
                      <p className="font-medium">{profileData.name}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-4">
                    <div>
                      <label className="block text-sm text-gray-500 mb-1">Email</label>
                      <p className="font-medium truncate">{profileData.email}</p>
                    </div>

                    <div>
                      <label className="block text-sm text-gray-500 mb-1">Birthday</label>
                      <p className="font-medium">20 July 1985</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm text-gray-500 mb-1">Organization</label>
                      <p className="font-medium">Simple Web</p>
                    </div>

                    <div>
                      <label className="block text-sm text-gray-500 mb-1">Language</label>
                      <p className="font-medium">English</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Right Sidebar */}
      <div className="hidden lg:block w-72 border-l bg-white p-6">
        {/* Right sidebar content remains the same */}
        {/* ... */}
        <div className="flex flex-col h-full">
          <div className="flex flex-col items-center mb-6">
            <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="text-blue-600"
              >
                <path
                  d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <h2 className="text-lg font-bold">Your Storage</h2>
            <p className="text-center text-sm text-gray-500 mt-2">
              Supervise your drive space
              <br />
              in the easiest way
            </p>
          </div>

          <div className="mt-6">
            <div className="w-full mb-2 flex justify-between text-xs text-gray-500">
              <span>25.6 Gb</span>
              <span>50 Gb</span>
            </div>
            <div className="w-full h-2 bg-gray-100 rounded-full">
              <div className="h-full w-1/2 bg-purple-600 rounded-full"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}