"use client"
import React, { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Image as ImageIcon, Plus, Trash2, X, Save, Upload, Link as LinkIcon } from "lucide-react"

interface GalleryImage {
  id: string
  title: string
  imageUrl: string
  category: string
  createdAt: string
}

const categories = ["All", "Campus", "Events", "Cultural", "Sports", "Academics", "Infrastructure", "Other"]

export default function AdminGalleryPage() {
  const [images, setImages] = useState<GalleryImage[]>([])
  const [showAdd, setShowAdd] = useState(false)
  const [title, setTitle] = useState("")
  const [imageUrl, setImageUrl] = useState("")
  const [category, setCategory] = useState("Other")
  const [filterCat, setFilterCat] = useState("All")

  // Load from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("ggg_gallery")
    if (saved) setImages(JSON.parse(saved))
  }, [])

  // Save to localStorage
  function saveImages(newImages: GalleryImage[]) {
    setImages(newImages)
    localStorage.setItem("ggg_gallery", JSON.stringify(newImages))
  }

  function handleAdd() {
    if (!title.trim() || !imageUrl.trim()) return
    const newImage: GalleryImage = {
      id: Date.now().toString(),
      title: title.trim(),
      imageUrl: imageUrl.trim(),
      category,
      createdAt: new Date().toISOString(),
    }
    saveImages([newImage, ...images])
    setTitle("")
    setImageUrl("")
    setCategory("Other")
    setShowAdd(false)
  }

  function handleDelete(id: string) {
    if (!confirm("Delete this image?")) return
    saveImages(images.filter((img) => img.id !== id))
  }

  const filtered = filterCat === "All" ? images : images.filter((img) => img.category === filterCat)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-[#138808] flex items-center gap-2">
            <ImageIcon className="w-6 h-6 text-[#FF9933]" /> Gallery Manager
          </h1>
          <p className="text-sm text-gray-500 mt-0.5">Upload images to display on the school website gallery.</p>
        </div>
        <Button variant="gold" onClick={() => setShowAdd(true)}>
          <Plus className="w-4 h-4" /> Add Image
        </Button>
      </div>

      {/* Add Form */}
      {showAdd && (
        <Card className="border-[#FF9933]/30 bg-[#fffdf5]">
          <CardContent className="p-6">
            <h3 className="font-bold text-[#138808] mb-4">Add New Image</h3>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2">
                <Label>Image Title *</Label>
                <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="e.g. Annual Day 2024 — Group Photo" className="mt-1" />
              </div>
              <div className="sm:col-span-2">
                <Label>Image URL *</Label>
                <div className="relative mt-1">
                  <LinkIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} placeholder="Paste image link here (Google Drive, Imgur, etc.)" className="pl-10" />
                </div>
                <p className="text-[10px] text-gray-400 mt-1.5">
                  How to get a link: Upload image to <a href="https://imgur.com" target="_blank" rel="noopener noreferrer" className="text-[#FF9933] underline">Imgur</a>, <a href="https://drive.google.com" target="_blank" rel="noopener noreferrer" className="text-[#FF9933] underline">Google Drive</a> (make public), or <a href="https://postimages.org" target="_blank" rel="noopener noreferrer" className="text-[#FF9933] underline">PostImages</a> — then paste the direct image link here.
                </p>
              </div>
              <div>
                <Label>Category</Label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="mt-1 w-full h-10 px-3 rounded-lg border border-gray-200 text-sm bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#138808]"
                >
                  {categories.filter((c) => c !== "All").map((cat) => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Preview */}
            {imageUrl && (
              <div className="mt-4">
                <Label className="text-xs text-gray-500">Preview:</Label>
                <div className="mt-1 w-40 h-28 rounded-lg border border-gray-200 overflow-hidden bg-gray-50">
                  <img src={imageUrl} alt="Preview" className="w-full h-full object-cover" onError={(e) => { (e.target as HTMLImageElement).src = ""; (e.target as HTMLImageElement).alt = "Failed to load" }} />
                </div>
              </div>
            )}

            <div className="flex gap-3 mt-5">
              <Button onClick={handleAdd} disabled={!title.trim() || !imageUrl.trim()}>
                <Save className="w-4 h-4" /> Add to Gallery
              </Button>
              <Button variant="ghost" onClick={() => setShowAdd(false)}>
                <X className="w-4 h-4" /> Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* How-to Guide */}
      <Card className="bg-blue-50 border-blue-200">
        <CardContent className="p-4">
          <h4 className="font-bold text-blue-800 text-sm mb-2 flex items-center gap-2"><Upload className="w-4 h-4" /> How to upload images</h4>
          <ol className="text-xs text-blue-700 space-y-1.5 list-decimal ml-4">
            <li>Go to <a href="https://postimages.org" target="_blank" rel="noopener noreferrer" className="underline font-semibold">postimages.org</a> (free, no account needed)</li>
            <li>Click "Choose Images" and select your photo</li>
            <li>After upload, copy the "Direct Link" (ends in .jpg or .png)</li>
            <li>Come back here, click "Add Image", paste the link, give it a title and category</li>
            <li>Done! The image will appear on the website gallery</li>
          </ol>
        </CardContent>
      </Card>

      {/* Filter */}
      <div className="flex gap-2 overflow-x-auto scrollbar-hide py-1">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setFilterCat(cat)}
            className={`flex-shrink-0 px-4 py-1.5 rounded-full text-xs font-semibold transition-colors ${filterCat === cat ? "bg-[#138808] text-white" : "bg-[#f0fdf4] text-[#138808] hover:bg-[#138808] hover:text-white"}`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Gallery Grid */}
      {filtered.length === 0 ? (
        <div className="text-center py-16 text-gray-400">
          <ImageIcon className="w-16 h-16 mx-auto mb-4 opacity-30" />
          <p className="text-lg font-medium">No images yet</p>
          <p className="text-sm mt-1">Click "Add Image" to upload your first photo</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {filtered.map((img) => (
            <div key={img.id} className="group relative rounded-xl overflow-hidden border border-gray-200 shadow-sm hover:shadow-md transition-all">
              <div className="aspect-square bg-gray-100">
                <img src={img.imageUrl} alt={img.title} className="w-full h-full object-cover" />
              </div>
              <div className="p-3">
                <p className="text-xs font-semibold text-[#138808] truncate">{img.title}</p>
                <Badge variant="outline" className="text-[9px] mt-1">{img.category}</Badge>
              </div>
              {/* Delete button */}
              <button
                onClick={() => handleDelete(img.id)}
                className="absolute top-2 right-2 w-7 h-7 rounded-full bg-red-500 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-md hover:bg-red-600"
                title="Delete"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Count */}
      {images.length > 0 && (
        <p className="text-xs text-gray-400 text-center">Total: {images.length} images</p>
      )}
    </div>
  )
}
