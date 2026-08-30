"use client"
import React, { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Calendar, Plus, Search, Edit2, Trash2, MapPin, Clock, Save, X } from "lucide-react"

interface EventItem {
  id: string
  title: string
  date: string
  time: string
  venue: string
  status: "PUBLISHED" | "DRAFT"
  important: boolean
}

const emptyDraft = (): EventItem => ({
  id: Date.now().toString(),
  title: "",
  date: "",
  time: "",
  venue: "",
  status: "DRAFT",
  important: false,
})

export default function AdminEventsPage() {
  const [events, setEvents] = useState<EventItem[]>([])
  const [query, setQuery] = useState("")
  const [showForm, setShowForm] = useState(false)
  const [draft, setDraft] = useState<EventItem | null>(null)

  function startAdd() {
    setDraft(emptyDraft())
    setShowForm(true)
  }

  function startEdit(ev: EventItem) {
    setDraft({ ...ev })
    setShowForm(true)
  }

  function cancel() {
    setDraft(null)
    setShowForm(false)
  }

  function save() {
    if (!draft || !draft.title.trim()) return
    setEvents((prev) => {
      const exists = prev.some((e) => e.id === draft.id)
      return exists ? prev.map((e) => (e.id === draft.id ? draft : e)) : [...prev, draft]
    })
    cancel()
  }

  function remove(id: string) {
    if (!confirm("Delete this event?")) return
    setEvents((prev) => prev.filter((e) => e.id !== id))
  }

  const filtered = events.filter((e) => e.title.toLowerCase().includes(query.trim().toLowerCase()))

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-[#1e40af] flex items-center gap-2">
            <Calendar className="w-6 h-6 text-[#FF9933]" /> Events
          </h1>
          <p className="text-sm text-gray-500 mt-0.5">Schedule and manage school events, programs, and important dates.</p>
        </div>
        <Button variant="gold" className="flex-shrink-0" onClick={startAdd}>
          <Plus className="w-4 h-4" /> Create Event
        </Button>
      </div>

      {/* Add/Edit Form */}
      {showForm && draft && (
        <Card className="border-[#FF9933]/30 bg-[#fffdf5]">
          <CardContent className="p-6">
            <h3 className="font-bold text-[#1e40af] mb-4">{events.some((e) => e.id === draft.id) ? "Edit Event" : "Create Event"}</h3>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2">
                <Label>Title *</Label>
                <Input value={draft.title} onChange={(e) => setDraft({ ...draft, title: e.target.value })} placeholder="e.g. Annual Sports Day" className="mt-1" />
              </div>
              <div>
                <Label>Date</Label>
                <Input value={draft.date} onChange={(e) => setDraft({ ...draft, date: e.target.value })} placeholder="e.g. Nov 15, 2025" className="mt-1" />
              </div>
              <div>
                <Label>Time</Label>
                <Input value={draft.time} onChange={(e) => setDraft({ ...draft, time: e.target.value })} placeholder="e.g. 8:00 AM" className="mt-1" />
              </div>
              <div>
                <Label>Venue</Label>
                <Input value={draft.venue} onChange={(e) => setDraft({ ...draft, venue: e.target.value })} placeholder="e.g. School Sports Ground" className="mt-1" />
              </div>
              <div>
                <Label>Status</Label>
                <select
                  value={draft.status}
                  onChange={(e) => setDraft({ ...draft, status: e.target.value as EventItem["status"] })}
                  className="mt-1 w-full h-10 px-3 rounded-lg border border-gray-200 text-sm bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#1e40af]"
                >
                  <option value="DRAFT">Draft</option>
                  <option value="PUBLISHED">Published</option>
                </select>
              </div>
              <div className="sm:col-span-2 flex items-center gap-2">
                <input
                  id="important"
                  type="checkbox"
                  checked={draft.important}
                  onChange={(e) => setDraft({ ...draft, important: e.target.checked })}
                  className="w-4 h-4 accent-[#1e40af]"
                />
                <Label htmlFor="important" className="cursor-pointer">Mark as important</Label>
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
      {events.length > 0 && (
        <div className="relative max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input placeholder="Search events..." className="pl-9" value={query} onChange={(e) => setQuery(e.target.value)} />
        </div>
      )}

      {/* Events Grid */}
      {events.length === 0 && !showForm ? (
        <div className="text-center py-16 text-gray-400">
          <Calendar className="w-12 h-12 mx-auto mb-3 opacity-30" />
          <p className="text-sm">No events yet. Click &quot;Create Event&quot; to add one.</p>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((event) => (
            <Card key={event.id} className="group hover:shadow-lg transition-all hover:-translate-y-0.5">
              <CardContent className="p-0">
                <div className="h-2 bg-gradient-to-r from-[#1e40af] to-[#FF9933] rounded-t-xl" />
                <div className="p-5">
                  <div className="flex items-start justify-between gap-2 mb-3">
                    <Badge variant={event.status === "PUBLISHED" ? "success" : "warning"} className="text-[10px]">
                      {event.status}
                    </Badge>
                    {event.important && <Badge variant="gold" className="text-[10px]">Important</Badge>}
                  </div>

                  <h3 className="font-bold text-[#1e40af] text-base leading-tight mb-3">{event.title}</h3>

                  <div className="space-y-2 text-xs text-gray-500">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-3.5 h-3.5 text-[#FF9933]" />
                      <span>{event.date || "—"}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-3.5 h-3.5 text-[#FF9933]" />
                      <span>{event.time || "—"}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-3.5 h-3.5 text-[#FF9933]" />
                      <span>{event.venue || "—"}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 mt-4 pt-3 border-t border-gray-100">
                    <Button variant="ghost" size="sm" className="h-7 text-xs gap-1 text-gray-400 hover:text-amber-600 flex-1" onClick={() => startEdit(event)}>
                      <Edit2 className="w-3 h-3" /> Edit
                    </Button>
                    <Button variant="ghost" size="sm" className="h-7 text-xs gap-1 text-gray-400 hover:text-red-600 flex-1" onClick={() => remove(event.id)}>
                      <Trash2 className="w-3 h-3" /> Delete
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}

          {/* Add New Card */}
          <button
            onClick={startAdd}
            className="border-2 border-dashed border-gray-200 rounded-xl flex items-center justify-center min-h-[220px] hover:border-[#FF9933] hover:bg-[#FF9933]/5 transition-colors group"
          >
            <div className="text-center">
              <Plus className="w-8 h-8 text-gray-300 group-hover:text-[#FF9933] mx-auto mb-2 transition-colors" />
              <p className="text-sm font-medium text-gray-400 group-hover:text-[#FF9933] transition-colors">Add New Event</p>
            </div>
          </button>
        </div>
      )}
    </div>
  )
}
