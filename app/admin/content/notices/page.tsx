"use client"
import React, { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Bell, Plus, Search, Edit2, Trash2, Pin, Volume2, Save, X } from "lucide-react"

interface Notice {
  id: string
  title: string
  category: string
  status: "PUBLISHED" | "DRAFT" | "ARCHIVED"
  audience: string
  isPinned: boolean
  isMarquee: boolean
  date: string
}

const categoryColors: Record<string, string> = {
  GENERAL: "info",
  EXAM: "warning",
  ADMISSION: "success",
  HOLIDAY: "gold",
  URGENT: "danger",
}

const emptyDraft = (): Notice => ({
  id: Date.now().toString(),
  title: "",
  category: "GENERAL",
  status: "PUBLISHED",
  audience: "ALL",
  isPinned: false,
  isMarquee: false,
  date: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
})

export default function AdminNoticesPage() {
  const [notices, setNotices] = useState<Notice[]>([])
  const [query, setQuery] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("")
  const [statusFilter, setStatusFilter] = useState("")
  const [showForm, setShowForm] = useState(false)
  const [draft, setDraft] = useState<Notice | null>(null)

  function startAdd() {
    setDraft(emptyDraft())
    setShowForm(true)
  }

  function startEdit(n: Notice) {
    setDraft({ ...n })
    setShowForm(true)
  }

  function cancel() {
    setDraft(null)
    setShowForm(false)
  }

  function save() {
    if (!draft || !draft.title.trim()) return
    setNotices((prev) => {
      const exists = prev.some((n) => n.id === draft.id)
      return exists ? prev.map((n) => (n.id === draft.id ? draft : n)) : [...prev, draft]
    })
    cancel()
  }

  function remove(id: string) {
    if (!confirm("Delete this notice?")) return
    setNotices((prev) => prev.filter((n) => n.id !== id))
  }

  const filtered = notices.filter((n) => {
    const q = query.trim().toLowerCase()
    return (
      (!q || n.title.toLowerCase().includes(q)) &&
      (!categoryFilter || n.category === categoryFilter) &&
      (!statusFilter || n.status === statusFilter)
    )
  })

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-[#1e40af] flex items-center gap-2">
            <Bell className="w-6 h-6 text-[#FF9933]" /> Notices
          </h1>
          <p className="text-sm text-gray-500 mt-0.5">Create and manage school notices, announcements, and circulars.</p>
        </div>
        <Button variant="gold" className="flex-shrink-0" onClick={startAdd}>
          <Plus className="w-4 h-4" /> Create Notice
        </Button>
      </div>

      {/* Add/Edit Form */}
      {showForm && draft && (
        <Card className="border-[#FF9933]/30 bg-[#fffdf5]">
          <CardContent className="p-6">
            <h3 className="font-bold text-[#1e40af] mb-4">{notices.some((n) => n.id === draft.id) ? "Edit Notice" : "Create Notice"}</h3>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2">
                <Label>Title *</Label>
                <Input value={draft.title} onChange={(e) => setDraft({ ...draft, title: e.target.value })} placeholder="e.g. Admissions Open for 2025-26" className="mt-1" />
              </div>
              <div>
                <Label>Category</Label>
                <select
                  value={draft.category}
                  onChange={(e) => setDraft({ ...draft, category: e.target.value })}
                  className="mt-1 w-full h-10 px-3 rounded-lg border border-gray-200 text-sm bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#1e40af]"
                >
                  <option value="GENERAL">General</option>
                  <option value="EXAM">Exam</option>
                  <option value="ADMISSION">Admission</option>
                  <option value="HOLIDAY">Holiday</option>
                  <option value="URGENT">Urgent</option>
                </select>
              </div>
              <div>
                <Label>Status</Label>
                <select
                  value={draft.status}
                  onChange={(e) => setDraft({ ...draft, status: e.target.value as Notice["status"] })}
                  className="mt-1 w-full h-10 px-3 rounded-lg border border-gray-200 text-sm bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#1e40af]"
                >
                  <option value="PUBLISHED">Published</option>
                  <option value="DRAFT">Draft</option>
                  <option value="ARCHIVED">Archived</option>
                </select>
              </div>
              <div>
                <Label>Audience</Label>
                <select
                  value={draft.audience}
                  onChange={(e) => setDraft({ ...draft, audience: e.target.value })}
                  className="mt-1 w-full h-10 px-3 rounded-lg border border-gray-200 text-sm bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#1e40af]"
                >
                  <option value="ALL">All</option>
                  <option value="PARENT">Parents</option>
                  <option value="STUDENT">Students</option>
                  <option value="TEACHER">Teachers</option>
                </select>
              </div>
              <div className="flex items-end gap-4 pb-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" checked={draft.isPinned} onChange={(e) => setDraft({ ...draft, isPinned: e.target.checked })} className="w-4 h-4 accent-[#1e40af]" />
                  <span className="text-sm text-gray-700">Pinned</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" checked={draft.isMarquee} onChange={(e) => setDraft({ ...draft, isMarquee: e.target.checked })} className="w-4 h-4 accent-[#1e40af]" />
                  <span className="text-sm text-gray-700">Show in ticker</span>
                </label>
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

      {/* Filters */}
      {notices.length > 0 && (
        <Card>
          <CardContent className="p-4">
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input placeholder="Search notices..." className="pl-9" value={query} onChange={(e) => setQuery(e.target.value)} />
              </div>
              <div className="flex gap-2">
                <select value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)} className="h-10 px-3 rounded-lg border border-gray-200 text-sm bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#1e40af]">
                  <option value="">All Categories</option>
                  <option value="GENERAL">General</option>
                  <option value="EXAM">Exam</option>
                  <option value="ADMISSION">Admission</option>
                  <option value="HOLIDAY">Holiday</option>
                  <option value="URGENT">Urgent</option>
                </select>
                <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="h-10 px-3 rounded-lg border border-gray-200 text-sm bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#1e40af]">
                  <option value="">All Status</option>
                  <option value="PUBLISHED">Published</option>
                  <option value="DRAFT">Draft</option>
                  <option value="ARCHIVED">Archived</option>
                </select>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Table */}
      <Card>
        <CardContent className="p-0">
          {filtered.length === 0 ? (
            <div className="text-center py-16 text-gray-400">
              <Bell className="w-12 h-12 mx-auto mb-3 opacity-30" />
              <p className="text-sm">No notices yet. Click &quot;Create Notice&quot; to add one.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="border-b border-gray-100 bg-gray-50/50">
                  <tr>
                    <th className="text-left px-5 py-3 font-semibold text-gray-600">Notice</th>
                    <th className="text-center px-3 py-3 font-semibold text-gray-600 w-24">Category</th>
                    <th className="text-center px-3 py-3 font-semibold text-gray-600 w-24">Status</th>
                    <th className="text-center px-3 py-3 font-semibold text-gray-600 w-24">Audience</th>
                    <th className="text-center px-3 py-3 font-semibold text-gray-600 w-20">Flags</th>
                    <th className="text-center px-3 py-3 font-semibold text-gray-600 w-24">Date</th>
                    <th className="text-center px-3 py-3 font-semibold text-gray-600 w-28">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {filtered.map((notice) => (
                    <tr key={notice.id} className="hover:bg-[#f5f9ff] transition-colors">
                      <td className="px-5 py-4">
                        <p className="font-medium text-gray-800 truncate max-w-xs">{notice.title}</p>
                      </td>
                      <td className="text-center px-3 py-4">
                        <Badge variant={(categoryColors[notice.category] || "info") as any} className="text-[10px]">
                          {notice.category}
                        </Badge>
                      </td>
                      <td className="text-center px-3 py-4">
                        <Badge
                          variant={notice.status === "PUBLISHED" ? "success" : notice.status === "DRAFT" ? "warning" : "secondary"}
                          className="text-[10px]"
                        >
                          {notice.status}
                        </Badge>
                      </td>
                      <td className="text-center px-3 py-4">
                        <span className="text-xs text-gray-500">{notice.audience}</span>
                      </td>
                      <td className="text-center px-3 py-4">
                        <div className="flex items-center justify-center gap-1.5">
                          {notice.isPinned && <Pin className="w-3.5 h-3.5 text-[#1e40af]" />}
                          {notice.isMarquee && <Volume2 className="w-3.5 h-3.5 text-[#FF9933]" />}
                        </div>
                      </td>
                      <td className="text-center px-3 py-4">
                        <span className="text-xs text-gray-500">{notice.date}</span>
                      </td>
                      <td className="text-center px-3 py-4">
                        <div className="flex items-center justify-center gap-1">
                          <button onClick={() => startEdit(notice)} className="p-1.5 rounded-md hover:bg-amber-50 text-gray-400 hover:text-amber-600 transition-colors" title="Edit">
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>
                          <button onClick={() => remove(notice.id)} className="p-1.5 rounded-md hover:bg-red-50 text-gray-400 hover:text-red-600 transition-colors" title="Delete">
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
