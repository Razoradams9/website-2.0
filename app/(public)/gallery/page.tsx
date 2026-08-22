"use client"
import React, { useState, useEffect } from "react"
import { Camera, Video, Play } from "lucide-react"

interface GalleryImage {
  id: string
  title: string
  imageUrl: string
  category: string
}

const categories = ["All", "Campus", "Events", "Cultural", "Sports", "Academics", "Infrastructure", "Other"]

const placeholderImages = [
  { id: "p1", title: "Annual Day Celebration 2024", category: "Cultural", color: "from-pink-500 to-rose-600" },
  { id: "p2", title: "Republic Day Flag Hoisting", category: "Events", color: "from-orange-500 to-amber-600" },
  { id: "p3", title: "Science Exhibition Projects", category: "Academics", color: "from-blue-500 to-indigo-600" },
  { id: "p4", title: "Sports Day — March Past", category: "Sports", color: "from-emerald-500 to-teal-600" },
  { id: "p5", title: "Classroom Learning Activities", category: "Academics", color: "from-purple-500 to-violet-600" },
  { id: "p6", title: "Art & Craft Exhibition", category: "Cultural", color: "from-fuchsia-500 to-pink-600" },
  { id: "p7", title: "School Building", category: "Infrastructure", color: "from-slate-500 to-gray-600" },
  { id: "p8", title: "Campus Green Area", category: "Campus", color: "from-green-500 to-lime-600" },
]

export default function GalleryPage() {
  const [uploadedImages, setUploadedImages] = useState<GalleryImage[]>([])
  const [filterCat, setFilterCat] = useState("All")

  useEffect(() => {
    const saved = localStorage.getItem("ggg_gallery")
    if (saved) setUploadedImages(JSON.parse(saved))
  }, [])

  const hasUploaded = uploadedImages.length > 0
  const filteredUploaded = filterCat === "All" ? uploadedImages : uploadedImages.filter((img) => img.category === filterCat)
  const filteredPlaceholders = filterCat === "All" ? placeholderImages : placeholderImages.filter((img) => img.category === filterCat)

  return (
    <>
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-[#138808] via-[#0a4d0a] to-[#138808] text-white overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")" }} />
        <div className="container mx-auto px-4 py-16 md:py-20 relative">
          <nav className="flex items-center gap-1.5 text-xs text-gray-400 mb-4">
            <a href="/" className="hover:text-white">Home</a>
            <span className="text-gray-600">›</span>
            <span className="text-[#FF9933]">Gallery</span>
          </nav>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-black leading-tight">Photo & Video Gallery</h1>
          <p className="mt-3 text-gray-300 text-base md:text-lg max-w-2xl">Capturing moments of learning, celebration, and achievement at Guru Gorakshnath Gyanasthali.</p>
        </div>
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 40" fill="none" className="w-full h-6 md:h-10 text-white"><path d="M0 40V20C360 0 720 0 1080 20C1260 30 1350 35 1440 40V40H0Z" fill="currentColor"/></svg>
        </div>
      </section>

      {/* Filter Tabs */}
      <section className="py-6 border-b border-gray-200 sticky top-20 lg:top-24 bg-white/95 backdrop-blur-sm z-30">
        <div className="container mx-auto px-4">
          <div className="flex gap-2 overflow-x-auto scrollbar-hide py-1">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilterCat(cat)}
                className={`flex-shrink-0 px-5 py-2 rounded-full text-sm font-semibold transition-colors ${filterCat === cat ? "bg-[#138808] text-white" : "bg-[#f0fdf4] text-[#138808] hover:bg-[#138808] hover:text-white"}`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-14">
        <div className="container mx-auto px-4">
          {/* Uploaded Images */}
          {hasUploaded && filteredUploaded.length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-10">
              {filteredUploaded.map((img) => (
                <div key={img.id} className="group relative overflow-hidden rounded-2xl aspect-square cursor-pointer hover:shadow-xl transition-all">
                  <img src={img.imageUrl} alt={img.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                    <div>
                      <p className="text-white text-sm font-semibold">{img.title}</p>
                      <span className="text-white/70 text-xs">{img.category}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Placeholder Images (shown when no uploads or as fallback) */}
          {(!hasUploaded || filteredUploaded.length === 0) && (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {filteredPlaceholders.map((img) => (
                <div key={img.id} className="group relative overflow-hidden rounded-2xl aspect-square cursor-pointer hover:shadow-xl transition-all">
                  <div className={`absolute inset-0 bg-gradient-to-br ${img.color} opacity-85 group-hover:opacity-95 transition-opacity`} />
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-4 text-center">
                    <Camera className="w-8 h-8 mb-2 opacity-50 group-hover:opacity-80 group-hover:scale-110 transition-all" />
                    <p className="text-sm font-bold leading-tight">{img.title}</p>
                    <span className="text-[10px] mt-2 bg-white/20 px-2 py-0.5 rounded-full">{img.category}</span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Video Section */}
          <div className="mt-16">
            <h3 className="text-2xl font-black text-[#138808] mb-6 flex items-center gap-3">
              <Video className="w-6 h-6 text-[#FF9933]" /> Video Gallery
            </h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { title: "School Campus Tour", duration: "3:45" },
                { title: "Annual Day 2024 Highlights", duration: "5:20" },
                { title: "Sports Day Celebrations", duration: "4:10" },
              ].map((video) => (
                <div key={video.title} className="bg-gray-100 rounded-2xl overflow-hidden group cursor-pointer hover:shadow-lg transition-shadow">
                  <div className="aspect-video bg-gradient-to-br from-[#138808] to-[#0a4d0a] flex items-center justify-center relative">
                    <div className="w-14 h-14 rounded-full bg-white/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Play className="w-6 h-6 text-white fill-white ml-1" />
                    </div>
                    <span className="absolute bottom-3 right-3 bg-black/60 text-white text-xs px-2 py-0.5 rounded">{video.duration}</span>
                  </div>
                  <div className="p-4">
                    <p className="font-semibold text-[#138808] text-sm">{video.title}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
