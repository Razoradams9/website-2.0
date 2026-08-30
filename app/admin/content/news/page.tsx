"use client"
import React, { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Newspaper, Plus, Search, Edit2, Trash2, Calendar, ExternalLink, Save, X } from "lucide-react"

interface NewsItem {
  id: string
  title: string
  slug: string
  status: "PUBLISHED" | "DRAFT"
  tags: string[]
  excerpt: string
  publishedAt: string | null
}

function slugify(s: string) {
  return s.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "")
}

const emptyDraft = (): NewsItem => ({
  id: Date.now().toString(),
  title: "",
  slug: "",
  status: "DRAFT",
  tags: [],
  excerpt: "",
  publishedAt: null,
})

export default function AdminNewsPage() {
  const [newsItems, setNewsItems] = useState<NewsItem[]>([])
  const [query, setQuery] = useState("")
  const [showForm, setShowForm] = useState(false)
  const [draft, setDraft] = useState<NewsItem | null>(null)
  const [tagsInput, setTagsInput] = useState("")

  function startAdd() {
    setDraft(emptyDraft())
    setTagsInput("")
    setShowForm(true)
  }

  function startEdit(item: NewsItem) {
    setDraft({ ...item })
    setTagsInput(item.tags.join(", "))
    setShowForm(true)
  }

  function cancel() {
    setDraft(null)
    setShowForm(false)
  }

  function save() {
    if (!draft || !draft.title.trim()) return
    const finalized: NewsItem = {
      ...draft,
      slug: draft.slug.trim() || slugify(draft.title),
      tags: tagsInput.split(",").map((t) => t.trim()).filter(Boolean),
      publishedAt: draft.status === "PUBLISHED" ? (draft.publishedAt || new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })) : null,
    }
    setNewsItems((prev) => {
      const exists = prev.some((n) => n.id === finalized.id)
      return exists ? prev.map((n) => (n.id === finalized.id ? finalized : n)) : [...prev, finalized]
    })
    cancel()
  }

  function remove(id: string) {
    if (!confirm("Delete this article?")) return
    setNewsItems((prev) => prev.filter((n) => n.id !== id))
  }

  const filtered = newsItems.filter((n) => n.title.toLowerCase().includes(query.trim().toLowerCase()))

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-[#1e40af] flex items-center gap-2">
            <Newspaper className="w-6 h-6 text-[#FF9933]" /> News Articles
          </h1>
          <p className="text-sm text-gray-500 mt-0.5">Manage school news and announcements published on the website.</p>
        </div>
        <Button variant="gold" className="flex-shrink-0" onClick={startAdd}>
          <Plus className="w-4 h-4" /> New Article
        </Button>
      </div>

      {/* Add/Edit Form */}
      {showForm && draft && (
        <Card className="border-[#FF9933]/30 bg-[#fffdf5]">
          <CardContent className="p-6">
            <h3 className="font-bold text-[#1e40af] mb-4">{newsItems.some((n) => n.id === draft.id) ? "Edit Article" : "New Article"}</h3>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2">
                <Label>Title *</Label>
                <Input value={draft.title} onChange={(e) => setDraft({ ...draft, title: e.target.value })} placeholder="e.g. School wins Science Olympiad" className="mt-1" />
              </div>
              <div>
                <Label>Slug (URL) — auto if blank</Label>
                <Input value={draft.slug} onChange={(e) => setDraft({ ...draft, slug: e.target.value })} placeholder="science-olympiad-2025" className="mt-1" />
              </div>
              <div>
                <Label>Status</Label>
                <select
                  value={draft.status}
                  onChange={(e) => setDraft({ ...draft, status: e.target.value as NewsItem["status"] })}
                  className="mt-1 w-full h-10 px-3 rounded-lg border border-gray-200 text-sm bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#1e40af]"
                >
                  <option value="DRAFT">Draft</option>
                  <option value="PUBLISHED">Published</option>
                </select>
              </div>
              <div className="sm:col-span-2">
                <Label>Tags (comma separated)</Label>
                <Input value={tagsInput} onChange={(e) => setTagsInput(e.target.value)} placeholder="Achievement, Science" className="mt-1" />
              </div>
              <div className="sm:col-span-2">
                <Label>Excerpt / Summary</Label>
                <Textarea value={draft.excerpt} onChange={(e) => setDraft({ ...draft, excerpt: e.target.value })} placeholder="Short summary of the article..." className="mt-1" rows={3} />
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

      {/* Search */}
      {newsItems.length > 0 && (
        <div className="relative max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input placeholder="Search news..." className="pl-9" value={query} onChange={(e) => setQuery(e.target.value)} />
        </div>
      )}

      {/* News Cards */}
      {newsItems.length === 0 && !showForm ? (
        <div className="text-center py-16 text-gray-400">
          <Newspaper className="w-12 h-12 mx-auto mb-3 opacity-30" />
          <p className="text-sm">No news articles yet. Click &quot;New Article&quot; to add one.</p>
        </div>
      ) : (
        <div className="grid gap-4">
          {filtered.map((item) => (
            <Card key={item.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-5">
                <div className="flex gap-4">
                  <div className="w-24 h-24 rounded-xl bg-gradient-to-br from-[#1e40af] to-[#1e3a8a] flex items-center justify-center flex-shrink-0">
                    <Newspaper className="w-8 h-8 text-[#FF9933]/50" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <h3 className="font-bold text-[#1e40af] text-base truncate">{item.title}</h3>
                        <p className="text-xs text-gray-400 mt-0.5 flex items-center gap-2">
                          <span className="flex items-center gap-1">
                            <ExternalLink className="w-3 h-3" /> /{item.slug}
                          </span>
                          {item.publishedAt && (
                            <span className="flex items-center gap-1">
                              <Calendar className="w-3 h-3" /> {item.publishedAt}
                            </span>
                          )}
                        </p>
                      </div>
                      <Badge variant={item.status === "PUBLISHED" ? "success" : "warning"} className="text-[10px] flex-shrink-0">
                        {item.status}
                      </Badge>
                    </div>

                    {item.tags.length > 0 && (
                      <div className="flex items-center gap-1.5 mt-3 flex-wrap">
                        {item.tags.map((tag) => (
                          <Badge key={tag} variant="outline" className="text-[10px]">{tag}</Badge>
                        ))}
                      </div>
                    )}

                    <div className="flex items-center gap-2 mt-3 pt-3 border-t border-gray-100">
                      <Button variant="ghost" size="sm" className="h-7 text-xs gap-1.5 text-gray-500 hover:text-amber-600" onClick={() => startEdit(item)}>
                        <Edit2 className="w-3.5 h-3.5" /> Edit
                      </Button>
                      <Button variant="ghost" size="sm" className="h-7 text-xs gap-1.5 text-gray-500 hover:text-red-600" onClick={() => remove(item.id)}>
                        <Trash2 className="w-3.5 h-3.5" /> Delete
                      </Button>
                    </div>
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
