"use client"

import type React from "react"
import { useState, useRef } from "react"
import { X, Upload, Loader2, AlertCircle } from "lucide-react"

type UploadStatus = "idle" | "selected" | "uploading" | "success" | "error"

interface UploadDialogProps {
  isOpen: boolean
  onClose: () => void
  onUploadComplete?: (imageUrl: string) => void
}

export default function UploadDialog({ isOpen, onClose, onUploadComplete }: UploadDialogProps) {
  const [uploadStatus, setUploadStatus] = useState<UploadStatus>("idle")
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [dragActive, setDragActive] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")
  const fileInputRef = useRef<HTMLInputElement>(null)

  if (!isOpen) return null

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()

    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileChange(e.dataTransfer.files[0])
    }
  }

  const handleFileChange = (file: File) => {
    // Check file type and size
    const validTypes = ['image/jpeg', 'image/png', 'image/svg+xml'];
    const maxSize = 10 * 1024 * 1024; // 10MB
    
    if (!validTypes.includes(file.type)) {
      setErrorMessage("Invalid file type. Only JPG, PNG, and SVG are supported.");
      setUploadStatus("error");
      return;
    }
    
    if (file.size > maxSize) {
      setErrorMessage("File is too large. Maximum size is 10MB.");
      setUploadStatus("error");
      return;
    }
    
    setSelectedFile(file)
    setUploadStatus("selected")
  }

  const handleBrowseClick = () => {
    fileInputRef.current?.click()
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFileChange(e.target.files[0])
    }
  }

  const handleUpload = async () => {
    if (!selectedFile) return

    setUploadStatus("uploading")
    
    try {
      // Get JWT token
      const token = localStorage.getItem("Joss_Id");
      if (!token) {
        throw new Error("Authentication required");
      }
      
      // Create form data
      const formData = new FormData();
      formData.append('file', selectedFile);
      formData.append('title', selectedFile.name);
      
      // Send request to API
      const response = await fetch('/api/photos', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || "Failed to upload photo");
      }
      
      // Success
      setUploadStatus("success");
      
      if (onUploadComplete) {
        onUploadComplete(data.photo.imageUrl);
      }
      
      // Close dialog after success
      setTimeout(() => {
        onClose();
        // Reset state for next upload
        setSelectedFile(null);
        setUploadStatus("idle");
      }, 1000);
      
    } catch (error) {
      console.error("Upload error:", error);
      setErrorMessage(error instanceof Error ? error.message : "Failed to upload photo");
      setUploadStatus("error");
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-md p-4">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Media Upload</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={20} />
          </button>
        </div>

        {/* Upload Area */}
        {uploadStatus === "idle" && (
          <div
            className={`border-2 border-dashed ${dragActive ? "border-purple-500 bg-purple-50" : "border-gray-300"} 
                        rounded-lg p-8 flex flex-col items-center justify-center cursor-pointer`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
            onClick={handleBrowseClick}
          >
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-4">
              <Upload className="h-6 w-6 text-purple-600" />
            </div>
            <p className="text-center mb-2">Drag your file(s) or Browse</p>
            <p className="text-xs text-gray-500">Only support jpg, png, svg and max 10mb files</p>
            <input
              ref={fileInputRef}
              type="file"
              className="hidden"
              accept="image/jpeg,image/png,image/svg+xml"
              onChange={handleInputChange}
            />
          </div>
        )}

        {/* Selected File */}
        {uploadStatus === "selected" && selectedFile && (
          <div className="border-2 border-purple-200 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center mr-3">
                  <Upload className="h-5 w-5 text-purple-600" />
                </div>
                <div className="truncate">
                  <p className="font-medium truncate">{selectedFile.name}</p>
                  <p className="text-xs text-gray-500">{(selectedFile.size / 1024 / 1024).toFixed(2)} MB</p>
                </div>
              </div>
              <button onClick={handleUpload} className="bg-purple-600 text-white px-4 py-1.5 rounded text-sm">
                Upload
              </button>
            </div>
          </div>
        )}

        {/* Uploading */}
        {uploadStatus === "uploading" && (
          <div className="border-2 border-purple-200 rounded-lg p-8 flex flex-col items-center justify-center">
            <div className="mb-4">
              <Loader2 className="h-8 w-8 text-purple-600 animate-spin" />
            </div>
            <p className="font-medium">Uploading...</p>
            <p className="text-xs text-gray-500 mt-1">Please wait</p>
          </div>
        )}
        
        {/* Success */}
        {uploadStatus === "success" && (
          <div className="border-2 border-green-200 rounded-lg p-8 flex flex-col items-center justify-center">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M20 6L9 17L4 12" stroke="#10B981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <p className="font-medium">Upload Successful!</p>
          </div>
        )}
        
        {/* Error */}
        {uploadStatus === "error" && (
          <div className="border-2 border-red-200 rounded-lg p-8 flex flex-col items-center justify-center">
            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mb-4">
              <AlertCircle className="h-6 w-6 text-red-600" />
            </div>
            <p className="font-medium">Upload Failed</p>
            <p className="text-xs text-red-500 mt-1 text-center">{errorMessage}</p>
            <button onClick={() => setUploadStatus("idle")} className="mt-4 text-sm text-purple-600">
              Try Again
            </button>
          </div>
        )}

        {/* Footer */}
        <p className="text-xs text-gray-500 mt-4 text-center">Only support jpg, png, svg and max 10mb files</p>
      </div>
    </div>
  )
}