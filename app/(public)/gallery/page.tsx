"use client"
import React, { useState, useEffect, useCallback } from "react"
import { Camera, Video, Play, X, ChevronLeft, ChevronRight } from "lucide-react"

const CATEGORIES = [
  { value: "ALL", label: "All" },
  { value: "ANNUAL_DAY", label: "Annual Day" },
  { value: "SPORTS_DAY", label: "Sports Day" },
  { value: "CULTURAL", label: "Cultural" },
  { value: "ACADEMICS", label: "Academics" },
  { value: "INFRASTRUCTURE", label: "Campus" },
  { value: "TOURS_TRIPS", label: "Tours & Trips" },
  { value: "ACHIEVEMENTS", label: "Achievements" },
  { value: "GENERAL", label: "General" },
]

interface GalleryItem {
  id: string
  title: string
  description: string | null
  mediaUrl: string
  thumbnailUrl: string | null
  category: string
  type: "PHOTO" | "VIDEO"
}

export default function GalleryPage() {
  const [photos, setPhotos] = useState<GalleryItem[]>([])
  const [videos, setVideos] = useState<GalleryItem[]>([])
  const [loading, setLoading] = useState(true)
  const [activeCategory, setActiveCategory] = useState("ALL")
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)
  const [videoLightbox, setVideoLightbox] = useState<GalleryItem | null>(null)

  const isOpen = lightboxIndex !== null

  useEffect(() => {
    async function fetchGallery() {
      setLoading(true)
      try {
        const categoryParam = activeCategory === "ALL" ? "" : `&category=${activeCategory}`
        const [photosRes, videosRes] = await Promise.all([
          fetch(`/api/gallery?type=PHOTO${categoryParam}`),
          fetch(`/api/gallery?type=VIDEO${categoryParam}`),
        ])
        if (photosRes.ok) setPhotos(await photosRes.json())
        if (videosRes.ok) setVideos(await videosRes.json())
      } catch {
        console.error("Failed to fetch gallery")
      } finally {
        setLoading(false)
      }
    }
    fetchGallery()
  }, [activeCategory])

  const close = useCallback(() => setLightboxIndex(null), [])
  const prev = useCallback(() => {
    setLightboxIndex((i) => (i !== null && i > 0 ? i - 1 : photos.length - 1))
  }, [photos.length])
  const next = useCallback(() => {
    setLightboxIndex((i) => (i !== null && i < photos.length - 1 ? i + 1 : 0))
  }, [photos.length])

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen && !videoLightbox) return
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") { close(); setVideoLightbox(null) }
      if (isOpen && e.key === "ArrowLeft") prev()
      if (isOpen && e.key === "ArrowRight") next()
    }
    document.addEventListener("keydown", handleKey)
    return () => document.removeEventListener("keydown", handleKey)
  }, [isOpen, videoLightbox, close, prev, next])

  // Prevent body scroll when lightbox is open
  useEffect(() => {
    if (isOpen || videoLightbox) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => { document.body.style.overflow = "" }
  }, [isOpen, videoLightbox])

  const currentPhoto = lightboxIndex !== null ? photos[lightboxIndex] : null

  return (
    <>
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-[#1e40af] via-[#1e3a8a] to-[#1e40af] text-white overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")" }} />
        <div className="container mx-auto px-4 py-16 md:py-20 relative">
          <nav className="flex items-center gap-1.5 text-xs text-gray-400 mb-4">
            <a href="/" className="hover:text-white">Home</a>
            <span className="text-gray-600">&rsaquo;</span>
            <span className="text-[#FF9933]">Gallery</span>
          </nav>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-black leading-tight">Photo &amp; Video Gallery</h1>
          <p className="mt-3 text-gray-300 text-base md:text-lg max-w-2xl">Capturing moments of learning, celebration, and achievement at Guru Gorakshnath Gyanasthali.</p>
        </div>
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 40" fill="none" className="w-full h-6 md:h-10 text-white"><path d="M0 40V20C360 0 720 0 1080 20C1260 30 1350 35 1440 40V40H0Z" fill="currentColor"/></svg>
        </div>
      </section>

      {/* Filter */}
      <section className="py-6 border-b border-gray-200 sticky top-16 lg:top-[72px] bg-white/95 backdrop-blur-sm z-30">
        <div className="container mx-auto px-4">
          <div className="flex gap-2 overflow-x-auto scrollbar-hide py-1">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.value}
                onClick={() => setActiveCategory(cat.value)}
                className={`flex-shrink-0 px-5 py-2 rounded-full text-sm font-semibold transition-colors ${
                  activeCategory === cat.value
                    ? "bg-[#1e40af] text-white"
                    : "bg-[#eff6ff] text-[#1e40af] hover:bg-[#1e40af] hover:text-white"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-14">
        <div className="container mx-auto px-4">
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <div className="w-8 h-8 border-4 border-[#1e40af] border-t-transparent rounded-full animate-spin" />
            </div>
          ) : photos.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {photos.map((photo, idx) => (
                <div
                  key={photo.id}
                  onClick={() => setLightboxIndex(idx)}
                  className="group relative overflow-hidden rounded-2xl aspect-square cursor-pointer hover:shadow-xl transition-all"
                >
                  <img
                    src={photo.thumbnailUrl || photo.mediaUrl}
                    alt={photo.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                    <div>
                      <p className="text-white text-sm font-semibold">{photo.title}</p>
                      <span className="text-white/70 text-xs">
                        {CATEGORIES.find((c) => c.value === photo.category)?.label}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {[
                { title: "Annual Day Celebration", category: "Annual Day", color: "from-pink-500 to-rose-600" },
                { title: "Republic Day Celebration", category: "General", color: "from-orange-500 to-amber-600" },
                { title: "Science Exhibition", category: "Academics", color: "from-blue-500 to-indigo-600" },
                { title: "Sports Day", category: "Sports Day", color: "from-emerald-500 to-teal-600" },
                { title: "Classroom Activities", category: "Academics", color: "from-purple-500 to-violet-600" },
                { title: "Art Exhibition", category: "Cultural", color: "from-fuchsia-500 to-pink-600" },
                { title: "School Building", category: "Campus", color: "from-slate-500 to-gray-600" },
                { title: "Green Campus", category: "Campus", color: "from-green-500 to-lime-600" },
              ].map((img, i) => (
                <div key={i} className="group relative overflow-hidden rounded-2xl aspect-square">
                  <div className={`absolute inset-0 bg-gradient-to-br ${img.color} opacity-85`} />
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-4 text-center">
                    <Camera className="w-8 h-8 mb-2 opacity-50" />
                    <p className="text-sm font-bold leading-tight">{img.title}</p>
                    <span className="text-[10px] mt-2 bg-white/20 px-2 py-0.5 rounded-full">{img.category}</span>
                  </div>
                </div>
              ))}
              <div className="col-span-full text-center py-8 text-gray-400">
                <p className="text-sm">Photos will appear here once uploaded by the admin.</p>
              </div>
            </div>
          )}

          {/* Video Section */}
          {videos.length > 0 && (
            <div className="mt-16">
              <h3 className="text-2xl font-black text-[#1e40af] mb-6 flex items-center gap-3">
                <Video className="w-6 h-6 text-[#FF9933]" /> Video Gallery
              </h3>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {videos.map((vid) => (
                  <div
                    key={vid.id}
                    onClick={() => setVideoLightbox(vid)}
                    className="group relative overflow-hidden rounded-2xl aspect-video bg-gray-900 cursor-pointer hover:shadow-xl transition-all"
                  >
                    <video
                      src={vid.mediaUrl}
                      className="w-full h-full object-cover opacity-70"
                      muted
                      preload="metadata"
                    />
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
                      <div className="w-14 h-14 rounded-full bg-white/20 flex items-center justify-center mb-3 group-hover:scale-110 group-hover:bg-[#FF9933]/80 transition-all">
                        <Play className="w-6 h-6 ml-0.5" />
                      </div>
                      <p className="text-sm font-bold">{vid.title}</p>
                      {vid.description && (
                        <p className="text-xs text-white/60 mt-1">{vid.description}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Photo Lightbox */}
      {isOpen && currentPhoto && (
        <div
          className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center"
          onClick={close}
        >
          <button
            onClick={close}
            className="absolute top-4 right-4 z-10 text-white/80 hover:text-white p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
            aria-label="Close lightbox"
          >
            <X className="w-6 h-6" />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); prev() }}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-10 text-white/80 hover:text-white p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
            aria-label="Previous image"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); next() }}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-10 text-white/80 hover:text-white p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
            aria-label="Next image"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
          <div
            className="max-w-[90vw] max-h-[85vh] flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={currentPhoto.mediaUrl}
              alt={currentPhoto.title}
              className="max-w-full max-h-[75vh] object-contain rounded-lg shadow-2xl"
            />
            <div className="mt-4 text-center">
              <p className="text-white text-lg font-semibold">{currentPhoto.title}</p>
              {currentPhoto.description && (
                <p className="text-white/60 text-sm mt-1">{currentPhoto.description}</p>
              )}
              <p className="text-white/40 text-xs mt-2">
                {lightboxIndex! + 1} / {photos.length}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Video Lightbox */}
      {videoLightbox && (
        <div
          className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center"
          onClick={() => setVideoLightbox(null)}
        >
          <button
            onClick={() => setVideoLightbox(null)}
            className="absolute top-4 right-4 z-10 text-white/80 hover:text-white p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
            aria-label="Close video"
          >
            <X className="w-6 h-6" />
          </button>
          <div
            className="max-w-[90vw] max-h-[85vh] flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <video
              src={videoLightbox.mediaUrl}
              controls
              autoPlay
              className="max-w-full max-h-[75vh] rounded-lg shadow-2xl"
            />
            <div className="mt-4 text-center">
              <p className="text-white text-lg font-semibold">{videoLightbox.title}</p>
              {videoLightbox.description && (
                <p className="text-white/60 text-sm mt-1">{videoLightbox.description}</p>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  )
}
