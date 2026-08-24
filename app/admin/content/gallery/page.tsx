"use client"
import React, { useState, useEffect, useRef } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import {
  Image as ImageIcon, Plus, Trash2, Edit2, Save, X, Upload,
  Loader2, FolderPlus, Layers, Eye, EyeOff
} from "lucide-react"

const CATEGORIES = [
  { value: "ANNUAL_DAY", label: "Annual Day" },
  { value: "SPORTS_DAY", label: "Sports Day" },
  { value: "CULTURAL", label: "Cultural" },
  { value: "ACADEMICS", label: "Academics" },
  { value: "TOURS_TRIPS", label: "Tours & Trips" },
  { value: "INFRASTRUCTURE", label: "Infrastructure" },
  { value: "ACHIEVEMENTS", label: "Achievements" },
  { value: "GENERAL", label: "General" },
]

interface GalleryItem {
  id: string
  title: string
  description: string | null
  mediaUrl: string
  thumbnailUrl: string | null
  type: "PHOTO" | "VIDEO"
  category: string
  albumId: string | null
  sortOrder: number
  status: "DRAFT" | "PUBLISHED" | "ARCHIVED"
  album?: { id: string; title: string } | null
  createdAt: string
}

interface Album {
  id: string
  title: string
  description: string | null
  coverImage: string | null
  category: string
  status: "DRAFT" | "PUBLISHED" | "ARCHIVED"
  _count: { items: number }
  createdAt: string
}

export default function AdminGalleryPage() {
  const [items, setItems] = useState<GalleryItem[]>([])
  const [albums, setAlbums] = useState<Album[]>([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState<"photos" | "albums">("photos")

  // Upload state
  const [uploading, setUploading] = useState(false)
  const [showUploadForm, setShowUploadForm] = useState(false)
  const [uploadTitle, setUploadTitle] = useState("")
  const [uploadDesc, setUploadDesc] = useState("")
  const [uploadCategory, setUploadCategory] = useState("GENERAL")
  const [uploadAlbumId, setUploadAlbumId] = useState("")
  const [selectedFiles, setSelectedFiles] = useState<File[]>([])
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Album form state
  const [showAlbumForm, setShowAlbumForm] = useState(false)
  const [albumTitle, setAlbumTitle] = useState("")
  const [albumDesc, setAlbumDesc] = useState("")
  const [albumCategory, setAlbumCategory] = useState("GENERAL")
  const [editingAlbumId, setEditingAlbumId] = useState<string | null>(null)

  // Filter
  const [filterCategory, setFilterCategory] = useState("")
  const [filterAlbum, setFilterAlbum] = useState("")

  useEffect(() => {
    fetchData()
  }, [])

  async function fetchData() {
    try {
      const [itemsRes, albumsRes] = await Promise.all([
        fetch("/api/admin/gallery"),
        fetch("/api/admin/gallery/albums"),
      ])
      if (itemsRes.ok) setItems(await itemsRes.json())
      if (albumsRes.ok) setAlbums(await albumsRes.json())
    } catch {
      console.error("Failed to load gallery data")
    } finally {
      setLoading(false)
    }
  }

  function resetUploadForm() {
    setShowUploadForm(false)
    setUploadTitle("")
    setUploadDesc("")
    setUploadCategory("GENERAL")
    setUploadAlbumId("")
    setSelectedFiles([])
    if (fileInputRef.current) fileInputRef.current.value = ""
  }

  function resetAlbumForm() {
    setShowAlbumForm(false)
    setAlbumTitle("")
    setAlbumDesc("")
    setAlbumCategory("GENERAL")
    setEditingAlbumId(null)
  }

  async function handleUpload() {
    if (selectedFiles.length === 0) return
    setUploading(true)

    try {
      for (let i = 0; i < selectedFiles.length; i++) {
        const file = selectedFiles[i]

        // Upload to Cloudinary
        const formData = new FormData()
        formData.append("file", file)
        formData.append("folder", "school-portal/gallery")

        const uploadRes = await fetch("/api/admin/upload", {
          method: "POST",
          body: formData,
        })

        if (!uploadRes.ok) {
          const err = await uploadRes.json()
          alert(`Failed to upload ${file.name}: ${err.error}`)
          continue
        }

        const uploadData = await uploadRes.json()

        // Create gallery item in DB
        const title = selectedFiles.length === 1 && uploadTitle
          ? uploadTitle
          : uploadTitle
            ? `${uploadTitle} (${i + 1})`
            : file.name.replace(/\.[^/.]+$/, "")

        await fetch("/api/admin/gallery", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            title,
            description: uploadDesc || null,
            mediaUrl: uploadData.url,
            thumbnailUrl: uploadData.url,
            type: "PHOTO",
            category: uploadCategory,
            albumId: uploadAlbumId || null,
            status: "PUBLISHED",
          }),
        })
      }

      resetUploadForm()
      fetchData()
    } catch {
      alert("Upload failed. Please try again.")
    } finally {
      setUploading(false)
    }
  }

  async function handleDeleteItem(id: string) {
    if (!confirm("Delete this photo? This cannot be undone.")) return
    try {
      await fetch("/api/admin/gallery", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      })
      fetchData()
    } catch {
      alert("Delete failed")
    }
  }

  async function handleToggleStatus(item: GalleryItem) {
    const newStatus = item.status === "PUBLISHED" ? "DRAFT" : "PUBLISHED"
    try {
      await fetch("/api/admin/gallery", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...item, id: item.id, status: newStatus }),
      })
      fetchData()
    } catch {
      alert("Update failed")
    }
  }

  async function handleSaveAlbum() {
    if (!albumTitle.trim()) return
    try {
      const body = {
        title: albumTitle,
        description: albumDesc || null,
        category: albumCategory,
        status: "PUBLISHED",
      }

      if (editingAlbumId) {
        await fetch("/api/admin/gallery/albums", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id: editingAlbumId, ...body }),
        })
      } else {
        await fetch("/api/admin/gallery/albums", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        })
      }
      resetAlbumForm()
      fetchData()
    } catch {
      alert("Save failed")
    }
  }

  async function handleDeleteAlbum(id: string) {
    if (!confirm("Delete this album? Photos will be unlinked but not deleted.")) return
    try {
      await fetch("/api/admin/gallery/albums", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      })
      fetchData()
    } catch {
      alert("Delete failed")
    }
  }

  function startEditAlbum(album: Album) {
    setEditingAlbumId(album.id)
    setAlbumTitle(album.title)
    setAlbumDesc(album.description || "")
    setAlbumCategory(album.category)
    setShowAlbumForm(true)
  }

  // Filtered items
  const filteredItems = items.filter((item) => {
    if (filterCategory && item.category !== filterCategory) return false
    if (filterAlbum && item.albumId !== filterAlbum) return false
    return true
  })

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="w-6 h-6 animate-spin text-[#1a3c6e]" />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-[#1a3c6e] flex items-center gap-2">
            <ImageIcon className="w-6 h-6 text-[#c8a951]" /> Photo Gallery
          </h1>
          <p className="text-sm text-gray-500 mt-0.5">
            Upload photos, organize into albums, and manage the gallery.
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={() => { resetAlbumForm(); setShowAlbumForm(true) }}
          >
            <FolderPlus className="w-4 h-4" /> New Album
          </Button>
          <Button variant="gold" onClick={() => { resetUploadForm(); setShowUploadForm(true) }}>
            <Upload className="w-4 h-4" /> Upload Photos
          </Button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-gray-100 p-1 rounded-lg w-fit">
        <button
          onClick={() => setActiveTab("photos")}
          className={`px-4 py-2 rounded-md text-sm font-semibold transition-all ${
            activeTab === "photos"
              ? "bg-white text-[#1a3c6e] shadow-sm"
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          <ImageIcon className="w-4 h-4 inline mr-1.5" />
          Photos ({items.length})
        </button>
        <button
          onClick={() => setActiveTab("albums")}
          className={`px-4 py-2 rounded-md text-sm font-semibold transition-all ${
            activeTab === "albums"
              ? "bg-white text-[#1a3c6e] shadow-sm"
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          <Layers className="w-4 h-4 inline mr-1.5" />
          Albums ({albums.length})
        </button>
      </div>

      {/* Upload Form */}
      {showUploadForm && (
        <Card className="border-[#c8a951]/30 bg-[#fffdf5]">
          <CardContent className="p-6">
            <h3 className="font-bold text-[#1a3c6e] mb-4 flex items-center gap-2">
              <Upload className="w-4 h-4" /> Upload Photos
            </h3>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2">
                <Label>Select Images *</Label>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/jpeg,image/png,image/webp,image/gif"
                  multiple
                  onChange={(e) => setSelectedFiles(Array.from(e.target.files || []))}
                  className="mt-1 w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-[#1a3c6e] file:text-white hover:file:bg-[#0d1f3c] file:cursor-pointer"
                />
                {selectedFiles.length > 0 && (
                  <p className="text-xs text-gray-500 mt-1">{selectedFiles.length} file(s) selected</p>
                )}
              </div>
              <div>
                <Label>Title (optional for batch)</Label>
                <Input
                  value={uploadTitle}
                  onChange={(e) => setUploadTitle(e.target.value)}
                  placeholder="e.g. Annual Day 2025"
                  className="mt-1"
                />
              </div>
              <div>
                <Label>Category *</Label>
                <select
                  value={uploadCategory}
                  onChange={(e) => setUploadCategory(e.target.value)}
                  className="mt-1 w-full h-10 px-3 rounded-lg border border-gray-200 text-sm bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#1a3c6e]"
                >
                  {CATEGORIES.map((c) => (
                    <option key={c.value} value={c.value}>{c.label}</option>
                  ))}
                </select>
              </div>
              <div>
                <Label>Album (optional)</Label>
                <select
                  value={uploadAlbumId}
                  onChange={(e) => setUploadAlbumId(e.target.value)}
                  className="mt-1 w-full h-10 px-3 rounded-lg border border-gray-200 text-sm bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#1a3c6e]"
                >
                  <option value="">No album</option>
                  {albums.map((a) => (
                    <option key={a.id} value={a.id}>{a.title}</option>
                  ))}
                </select>
              </div>
              <div>
                <Label>Description (optional)</Label>
                <Textarea
                  value={uploadDesc}
                  onChange={(e) => setUploadDesc(e.target.value)}
                  placeholder="Brief description..."
                  className="mt-1"
                  rows={2}
                />
              </div>
            </div>
            <div className="flex gap-3 mt-5">
              <Button
                onClick={handleUpload}
                disabled={selectedFiles.length === 0 || uploading}
              >
                {uploading ? (
                  <><Loader2 className="w-4 h-4 animate-spin" /> Uploading...</>
                ) : (
                  <><Save className="w-4 h-4" /> Upload {selectedFiles.length > 0 && `(${selectedFiles.length})`}</>
                )}
              </Button>
              <Button variant="ghost" onClick={resetUploadForm}>
                <X className="w-4 h-4" /> Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Album Form */}
      {showAlbumForm && (
        <Card className="border-[#c8a951]/30 bg-[#fffdf5]">
          <CardContent className="p-6">
            <h3 className="font-bold text-[#1a3c6e] mb-4 flex items-center gap-2">
              <FolderPlus className="w-4 h-4" /> {editingAlbumId ? "Edit Album" : "Create Album"}
            </h3>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <Label>Album Title *</Label>
                <Input
                  value={albumTitle}
                  onChange={(e) => setAlbumTitle(e.target.value)}
                  placeholder="e.g. Annual Day 2025"
                  className="mt-1"
                />
              </div>
              <div>
                <Label>Category</Label>
                <select
                  value={albumCategory}
                  onChange={(e) => setAlbumCategory(e.target.value)}
                  className="mt-1 w-full h-10 px-3 rounded-lg border border-gray-200 text-sm bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#1a3c6e]"
                >
                  {CATEGORIES.map((c) => (
                    <option key={c.value} value={c.value}>{c.label}</option>
                  ))}
                </select>
              </div>
              <div className="sm:col-span-2">
                <Label>Description (optional)</Label>
                <Textarea
                  value={albumDesc}
                  onChange={(e) => setAlbumDesc(e.target.value)}
                  placeholder="Brief description of this album..."
                  className="mt-1"
                  rows={2}
                />
              </div>
            </div>
            <div className="flex gap-3 mt-5">
              <Button onClick={handleSaveAlbum} disabled={!albumTitle.trim()}>
                <Save className="w-4 h-4" /> {editingAlbumId ? "Update" : "Create"}
              </Button>
              <Button variant="ghost" onClick={resetAlbumForm}>
                <X className="w-4 h-4" /> Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Photos Tab */}
      {activeTab === "photos" && (
        <>
          {/* Filters */}
          <div className="flex flex-wrap gap-3">
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="h-9 px-3 rounded-lg border border-gray-200 text-sm bg-white text-gray-700"
            >
              <option value="">All Categories</option>
              {CATEGORIES.map((c) => (
                <option key={c.value} value={c.value}>{c.label}</option>
              ))}
            </select>
            <select
              value={filterAlbum}
              onChange={(e) => setFilterAlbum(e.target.value)}
              className="h-9 px-3 rounded-lg border border-gray-200 text-sm bg-white text-gray-700"
            >
              <option value="">All Albums</option>
              {albums.map((a) => (
                <option key={a.id} value={a.id}>{a.title}</option>
              ))}
            </select>
          </div>

          {/* Photo Grid */}
          {filteredItems.length === 0 ? (
            <div className="text-center py-16 text-gray-400">
              <ImageIcon className="w-12 h-12 mx-auto mb-3 opacity-30" />
              <p>No photos yet. Click "Upload Photos" to get started.</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {filteredItems.map((item) => (
                <div
                  key={item.id}
                  className="group relative rounded-xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-lg transition-all bg-white"
                >
                  <div className="aspect-square relative">
                    <img
                      src={item.mediaUrl}
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                    {item.status === "DRAFT" && (
                      <Badge className="absolute top-2 left-2 text-[10px]" variant="secondary">
                        Draft
                      </Badge>
                    )}
                    {/* Hover overlay */}
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                      <button
                        onClick={() => handleToggleStatus(item)}
                        className="p-2 rounded-lg bg-white/20 hover:bg-white/30 text-white transition-colors"
                        title={item.status === "PUBLISHED" ? "Unpublish" : "Publish"}
                      >
                        {item.status === "PUBLISHED" ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                      <button
                        onClick={() => handleDeleteItem(item.id)}
                        className="p-2 rounded-lg bg-white/20 hover:bg-red-500/80 text-white transition-colors"
                        title="Delete"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  <div className="p-2.5">
                    <p className="text-xs font-semibold text-gray-800 truncate">{item.title}</p>
                    <p className="text-[10px] text-gray-400 mt-0.5">
                      {CATEGORIES.find((c) => c.value === item.category)?.label}
                      {item.album && ` • ${item.album.title}`}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      )}

      {/* Albums Tab */}
      {activeTab === "albums" && (
        <>
          {albums.length === 0 ? (
            <div className="text-center py-16 text-gray-400">
              <Layers className="w-12 h-12 mx-auto mb-3 opacity-30" />
              <p>No albums yet. Click "New Album" to create one.</p>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {albums.map((album) => (
                <Card key={album.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="h-32 bg-gradient-to-br from-[#1a3c6e] to-[#0d1f3c] flex items-center justify-center">
                    {album.coverImage ? (
                      <img src={album.coverImage} alt={album.title} className="w-full h-full object-cover" />
                    ) : (
                      <Layers className="w-10 h-10 text-white/30" />
                    )}
                  </div>
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0">
                        <h4 className="font-bold text-[#1a3c6e] truncate">{album.title}</h4>
                        <p className="text-xs text-gray-500 mt-0.5">
                          {CATEGORIES.find((c) => c.value === album.category)?.label} • {album._count.items} photos
                        </p>
                        {album.description && (
                          <p className="text-xs text-gray-400 mt-1 line-clamp-2">{album.description}</p>
                        )}
                      </div>
                      <div className="flex gap-1 flex-shrink-0">
                        <button
                          onClick={() => startEditAlbum(album)}
                          className="p-1.5 rounded-md hover:bg-amber-50 text-gray-400 hover:text-amber-600 transition-colors"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDeleteAlbum(album.id)}
                          className="p-1.5 rounded-md hover:bg-red-50 text-gray-400 hover:text-red-600 transition-colors"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  )
}
