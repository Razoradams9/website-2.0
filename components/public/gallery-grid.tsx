"use client"
import React, { useState, useEffect, useCallback } from "react"
import { X, ChevronLeft, ChevronRight } from "lucide-react"

interface GalleryPhoto {
  id: string
  title: string
  description: string | null
  mediaUrl: string
  thumbnailUrl: string | null
  category: string
}

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

export function GalleryGrid({ photos }: { photos: GalleryPhoto[] }) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)

  const isOpen = lightboxIndex !== null

  const close = useCallback(() => setLightboxIndex(null), [])
  const prev = useCallback(() => {
    setLightboxIndex((i) => (i !== null && i > 0 ? i - 1 : photos.length - 1))
  }, [photos.length])
  const next = useCallback(() => {
    setLightboxIndex((i) => (i !== null && i < photos.length - 1 ? i + 1 : 0))
  }, [photos.length])

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") close()
      if (e.key === "ArrowLeft") prev()
      if (e.key === "ArrowRight") next()
    }
    document.addEventListener("keydown", handleKey)
    return () => document.removeEventListener("keydown", handleKey)
  }, [isOpen, close, prev, next])

  // Prevent body scroll when lightbox is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => { document.body.style.overflow = "" }
  }, [isOpen])

  const currentPhoto = lightboxIndex !== null ? photos[lightboxIndex] : null

  return (
    <>
      {/* Image Grid */}
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

      {/* Lightbox */}
      {isOpen && currentPhoto && (
        <div
          className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center"
          onClick={close}
        >
          {/* Close button */}
          <button
            onClick={close}
            className="absolute top-4 right-4 z-10 text-white/80 hover:text-white p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
            aria-label="Close lightbox"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Previous button */}
          <button
            onClick={(e) => { e.stopPropagation(); prev() }}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-10 text-white/80 hover:text-white p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
            aria-label="Previous image"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Next button */}
          <button
            onClick={(e) => { e.stopPropagation(); next() }}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-10 text-white/80 hover:text-white p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
            aria-label="Next image"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Image */}
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
    </>
  )
}
