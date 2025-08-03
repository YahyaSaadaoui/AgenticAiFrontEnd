"use client"
import type React from "react"

import { Upload } from "lucide-react"
import { useState } from "react"

interface MediaUploadProps {
  onFileSelect: (file: File) => void
}

export function MediaUpload({ onFileSelect }: MediaUploadProps) {
  const [dragOver, setDragOver] = useState(false)

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setDragOver(false)
    const files = Array.from(e.dataTransfer.files)
    if (files.length > 0) {
      onFileSelect(files[0])
    }
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setDragOver(true)
  }

  const handleDragLeave = () => {
    setDragOver(false)
  }

  return (
    <div
      className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
        dragOver ? "border-blue-500 bg-blue-500/10" : "border-slate-600 hover:border-slate-500"
      }`}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
    >
      <Upload className="h-12 w-12 mx-auto mb-4 text-slate-400" />
      <p className="text-slate-300 mb-2">Drop files here or click to upload</p>
      <p className="text-sm text-slate-500">Supports images, audio, and documents</p>
    </div>
  )
}
