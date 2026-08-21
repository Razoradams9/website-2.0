import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, Plus, Search, Edit2, Trash2, MapPin, Clock } from "lucide-react"
import { Input } from "@/components/ui/input"

export const metadata = { title: "Manage Events" }

const events = [
  { id: "1", title: "Annual Sports Day 2025", date: "Nov 15, 2025", time: "8:00 AM", venue: "School Sports Ground", status: "PUBLISHED", important: true },
  { id: "2", title: "Annual Day & Cultural Program", date: "Dec 20, 2025", time: "4:00 PM", venue: "School Auditorium", status: "PUBLISHED", important: true },
  { id: "3", title: "Science Exhibition 2025", date: "Oct 5–6, 2025", time: "9:00 AM", venue: "Science Block", status: "PUBLISHED", important: false },
  { id: "4", title: "Inter-House Debate Competition", date: "Sep 28, 2025", time: "10:00 AM", venue: "Seminar Hall", status: "DRAFT", important: false },
  { id: "5", title: "National Mathematics Day", date: "Dec 22, 2025", time: "9:30 AM", venue: "Assembly Hall", status: "DRAFT", important: false },
]

export default function AdminEventsPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-[#1a3c6e] flex items-center gap-2">
            <Calendar className="w-6 h-6 text-[#c8a951]" /> Events
          </h1>
          <p className="text-sm text-gray-500 mt-0.5">Schedule and manage school events, programs, and important dates.</p>
        </div>
        <Button variant="gold" className="flex-shrink-0">
          <Plus className="w-4 h-4" /> Create Event
        </Button>
      </div>

      {/* Search */}
      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <Input placeholder="Search events..." className="pl-9" />
      </div>

      {/* Events Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {events.map((event) => (
          <Card key={event.id} className="group hover:shadow-lg transition-all hover:-translate-y-0.5">
            <CardContent className="p-0">
              {/* Top Color Bar */}
              <div className="h-2 bg-gradient-to-r from-[#1a3c6e] to-[#c8a951] rounded-t-xl" />
              <div className="p-5">
                <div className="flex items-start justify-between gap-2 mb-3">
                  <Badge variant={event.status === "PUBLISHED" ? "success" : "warning"} className="text-[10px]">
                    {event.status}
                  </Badge>
                  {event.important && <Badge variant="gold" className="text-[10px]">Important</Badge>}
                </div>

                <h3 className="font-bold text-[#1a3c6e] text-base leading-tight mb-3">{event.title}</h3>

                <div className="space-y-2 text-xs text-gray-500">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-3.5 h-3.5 text-[#c8a951]" />
                    <span>{event.date}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-3.5 h-3.5 text-[#c8a951]" />
                    <span>{event.time}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5 text-[#c8a951]" />
                    <span>{event.venue}</span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 mt-4 pt-3 border-t border-gray-100">
                  <Button variant="ghost" size="sm" className="h-7 text-xs gap-1 text-gray-400 hover:text-amber-600 flex-1">
                    <Edit2 className="w-3 h-3" /> Edit
                  </Button>
                  <Button variant="ghost" size="sm" className="h-7 text-xs gap-1 text-gray-400 hover:text-red-600 flex-1">
                    <Trash2 className="w-3 h-3" /> Delete
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}

        {/* Add New Card */}
        <div className="border-2 border-dashed border-gray-200 rounded-xl flex items-center justify-center min-h-[220px] hover:border-[#c8a951] hover:bg-[#c8a951]/5 transition-colors cursor-pointer group">
          <div className="text-center">
            <Plus className="w-8 h-8 text-gray-300 group-hover:text-[#c8a951] mx-auto mb-2 transition-colors" />
            <p className="text-sm font-medium text-gray-400 group-hover:text-[#c8a951] transition-colors">Add New Event</p>
          </div>
        </div>
      </div>
    </div>
  )
}
