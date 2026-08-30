"use client"
import React, { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ImageUpload } from "@/components/ui/image-upload"
import { Image as ImageIcon, Plus, Edit2, Trash2, ArrowUp, ArrowDown, Save, X } from "lucide-react"

interface SlideItem {
  id: string
  title: string
  subtitle: string
  imageUrl: string
  ctaLink: string
  status: "PUBLISHED" | "DRAFT"
}

const emptyDraft = (): SlideItem => ({
  id: Date.now().toString(),
  title: "",
  subtitle: "",
  imageUrl: "",
  ctaLink: "",
  status: "PUBLISHED",
})

export default function AdminSliderPage() {
  const [slides, setSlides] = useState<SlideItem[]>([])
  const [showForm, setShowForm] = useState(false)
  const [draft, setDraft] = useState<SlideItem | null>(null)

  function startAdd() {
    setDraft(emptyDraft())
    setShowForm(true)
  }

  function startEdit(s: SlideItem) {
    setDraft({ ...s })
    setShowForm(true)
  }

  function cancel() {
    setDraft(null)
    setShowForm(false)
  }

  function save() {
    if (!draft || !draft.title.trim()) return
    setSlides((prev) => {
      const exists = prev.some((s) => s.id === draft.id)
      return exists ? prev.map((s) => (s.id === draft.id ? draft : s)) : [...prev, draft]
    })
    cancel()
  }

  function remove(id: string) {
    if (!confirm("Delete this slide?")) return
    setSlides((prev) => prev.filter((s) => s.id !== id))
  }

  function move(index: number, dir: -1 | 1) {
    setSlides((prev) => {
      const next = [...prev]
      const target = index + dir
      if (target < 0 || target >= next.length) return prev
      ;[next[index], next[target]] = [next[target], next[index]]
      return next
    })
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-[#1e40af] flex items-center gap-2">
            <ImageIcon className="w-6 h-6 text-[#FF9933]" /> Hero Slider
          </h1>
          <p className="text-sm text-gray-500 mt-0.5">Manage the slides shown on the homepage hero section.</p>
        </div>
        <Button variant="gold" className="flex-shrink-0" onClick={startAdd}>
          <Plus className="w-4 h-4" /> Add Slide
        </Button>
      </div>

      {/* Info */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 text-sm text-blue-700 flex items-start gap-3">
        <ImageIcon className="w-5 h-5 mt-0.5 flex-shrink-0" />
        <div>
          <p className="font-semibold">Recommended image size: 1920 × 800px</p>
          <p className="text-xs text-blue-600 mt-0.5">Use high-quality images in JPG/PNG format. Maximum 3–5 slides recommended for best user experience.</p>
        </div>
      </div>

      {/* Add/Edit Form */}
      {showForm && draft && (
        <Card className="border-[#FF9933]/30 bg-[#fffdf5]">
          <CardContent className="p-6">
            <h3 className="font-bold text-[#1e40af] mb-4">{slides.some((s) => s.id === draft.id) ? "Edit Slide" : "Add Slide"}</h3>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2">
                <Label>Title *</Label>
                <Input value={draft.title} onChange={(e) => setDraft({ ...draft, title: e.target.value })} placeholder="e.g. Welcome to Our School" className="mt-1" />
              </div>
              <div className="sm:col-span-2">
                <Label>Subtitle</Label>
                <Input value={draft.subtitle} onChange={(e) => setDraft({ ...draft, subtitle: e.target.value })} placeholder="e.g. Shaping the Future" className="mt-1" />
              </div>
              <div className="sm:col-span-2">
                <Label>Slide Image</Label>
                {draft.imageUrl ? (
                  <div className="mt-1 rounded-xl border border-gray-200 bg-white p-3">
                    <img src={draft.imageUrl} alt="Slide" className="w-full max-h-48 object-contain rounded-lg" />
                    <button type="button" onClick={() => setDraft({ ...draft, imageUrl: "" })} className="mt-2 text-xs text-red-500 hover:text-red-700 font-medium flex items-center gap-1">
                      <X className="w-3 h-3" /> Remove image
                    </button>
                  </div>
                ) : (
                  <div className="mt-1">
                    <ImageUpload onUploaded={(url) => setDraft({ ...draft, imageUrl: url })} />
                  </div>
                )}
              </div>
              <div>
                <Label>CTA Link (optional)</Label>
                <Input value={draft.ctaLink} onChange={(e) => setDraft({ ...draft, ctaLink: e.target.value })} placeholder="/admissions" className="mt-1" />
              </div>
              <div>
                <Label>Status</Label>
                <select
                  value={draft.status}
                  onChange={(e) => setDraft({ ...draft, status: e.target.value as SlideItem["status"] })}
                  className="mt-1 w-full h-10 px-3 rounded-lg border border-gray-200 text-sm bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#1e40af]"
                >
                  <option value="PUBLISHED">Published</option>
                  <option value="DRAFT">Draft</option>
                </select>
              </div>
            </div>
            <div className="flex gap-3 mt-5">
              <Button onClick={save} disabled={!draft.title.trim()}>
                <Save className="w-4 h-4" /> Save
              </Button>
              <Button variant="ghost" onClick={cancel}>
                <X className="w-4 h-4" /> Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Slider Items */}
      {slides.length === 0 && !showForm ? (
        <div className="text-center py-16 text-gray-400">
          <ImageIcon className="w-12 h-12 mx-auto mb-3 opacity-30" />
          <p className="text-sm">No slides yet. Click &quot;Add Slide&quot; to create one.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {slides.map((item, index) => (
            <Card key={item.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-0">
                <div className="flex items-center gap-4 p-4">
                  <div className="w-8 h-8 rounded-lg bg-[#1e40af] flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                    {index + 1}
                  </div>

                  <div className="w-32 h-20 rounded-lg bg-gradient-to-br from-[#1e40af] to-[#1e3a8a] flex-shrink-0 flex items-center justify-center overflow-hidden">
                    {item.imageUrl ? (
                      <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover" />
                    ) : (
                      <ImageIcon className="w-8 h-8 text-[#FF9933]/30" />
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-[#1e40af] text-sm truncate">{item.title}</h3>
                    <p className="text-xs text-gray-500 mt-0.5 truncate">{item.subtitle}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <Badge variant={item.status === "PUBLISHED" ? "success" : "warning"} className="text-[10px]">{item.status}</Badge>
                      {item.ctaLink && <Badge variant="outline" className="text-[10px]">Has CTA Link</Badge>}
                    </div>
                  </div>

                  <div className="flex items-center gap-1 flex-shrink-0">
                    <button onClick={() => move(index, -1)} disabled={index === 0} className="p-2 rounded-md hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors disabled:opacity-30" title="Move Up">
                      <ArrowUp className="w-4 h-4" />
                    </button>
                    <button onClick={() => move(index, 1)} disabled={index === slides.length - 1} className="p-2 rounded-md hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors disabled:opacity-30" title="Move Down">
                      <ArrowDown className="w-4 h-4" />
                    </button>
                    <button onClick={() => startEdit(item)} className="p-2 rounded-md hover:bg-amber-50 text-gray-400 hover:text-amber-600 transition-colors" title="Edit">
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button onClick={() => remove(item.id)} className="p-2 rounded-md hover:bg-red-50 text-gray-400 hover:text-red-600 transition-colors" title="Delete">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
