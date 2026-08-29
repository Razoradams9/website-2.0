"use client"
import React, { useState, useRef } from "react"
import { Upload, X, Image as ImageIcon, Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"

interface ImageUploadProps {
  onUploaded: (url: string) => void
  className?: string
}

export function ImageUpload({ onUploaded, className }: ImageUploadProps) {
  const [uploading, setUploading] = useState(false)
  const [preview, setPreview] = useState<string | null>(null)
  const [error, setError] = useState("")
  const inputRef = useRef<HTMLInputElement>(null)

  async function handleFile(file: File) {
    if (!file.type.startsWith("image/")) {
      setError("Please select an image file (JPG, PNG, etc.)")
      return
    }
    if (file.size > 10 * 1024 * 1024) {
      setError("File too large. Max 10MB.")
      return
    }

    setError("")
    setUploading(true)
    setPreview(URL.createObjectURL(file))

    try {
      const formData = new FormData()
      formData.append("file", file)

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      })

      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.error || "Upload failed")
      }

      const data = await res.json()
      onUploaded(data.url)
    } catch (err: any) {
      setError(err.message || "Upload failed. Try again.")
      setPreview(null)
    } finally {
      setUploading(false)
    }
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault()
    const file = e.dataTransfer.files[0]
    if (file) handleFile(file)
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (file) handleFile(file)
  }

  function clear() {
    setPreview(null)
    setError("")
    if (inputRef.current) inputRef.current.value = ""
  }

  return (
    <div className={cn("w-full", className)}>
      {preview ? (
        <div className="relative w-full h-40 rounded-xl border border-gray-200 overflow-hidden bg-gray-50">
          <img src={preview} alt="Preview" className="w-full h-full object-cover" />
          {uploading && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
              <div className="flex items-center gap-2 text-white text-sm font-medium">
                <Loader2 className="w-5 h-5 animate-spin" /> Uploading...
              </div>
            </div>
          )}
          {!uploading && (
            <button onClick={clear} className="absolute top-2 right-2 w-6 h-6 rounded-full bg-red-500 text-white flex items-center justify-center hover:bg-red-600">
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      ) : (
        <div
          onClick={() => inputRef.current?.click()}
          onDrop={handleDrop}
          onDragOver={(e) => e.preventDefault()}
          className="w-full h-40 rounded-xl border-2 border-dashed border-gray-300 hover:border-[#1e40af] hover:bg-[#eff6ff] flex flex-col items-center justify-center cursor-pointer transition-all"
        >
          <Upload className="w-8 h-8 text-gray-400 mb-2" />
          <p className="text-sm font-medium text-gray-600">Click to upload or drag & drop</p>
          <p className="text-xs text-gray-400 mt-1">JPG, PNG up to 10MB</p>
        </div>
      )}

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        onChange={handleChange}
        className="hidden"
      />

      {error && (
        <p className="text-xs text-red-500 mt-2">{error}</p>
      )}
    </div>
  )
}
