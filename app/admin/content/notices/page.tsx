import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Bell, Plus, Search, Filter, Edit2, Trash2, Eye, Pin, Volume2 } from "lucide-react"
import { Input } from "@/components/ui/input"

export const metadata = { title: "Manage Notices" }

const notices = [
  { id: "1", title: "Admissions Open for Session 2025-26", category: "ADMISSION", status: "PUBLISHED", audience: "ALL", isPinned: true, isMarquee: true, date: "Aug 20, 2025" },
  { id: "2", title: "Half Yearly Examination Schedule", category: "EXAM", status: "PUBLISHED", audience: "ALL", isPinned: false, isMarquee: true, date: "Aug 18, 2025" },
  { id: "3", title: "Independence Day Celebration", category: "GENERAL", status: "PUBLISHED", audience: "ALL", isPinned: false, isMarquee: false, date: "Aug 10, 2025" },
  { id: "4", title: "Parent-Teacher Meeting — Classes 9 & 11", category: "GENERAL", status: "PUBLISHED", audience: "PARENT", isPinned: false, isMarquee: false, date: "Aug 8, 2025" },
  { id: "5", title: "Summer Vacation Homework Submission", category: "HOLIDAY", status: "ARCHIVED", audience: "STUDENT", isPinned: false, isMarquee: false, date: "Jul 15, 2025" },
  { id: "6", title: "Annual Day Rehearsals — Schedule", category: "GENERAL", status: "DRAFT", audience: "TEACHER", isPinned: false, isMarquee: false, date: "Aug 5, 2025" },
]

const categoryColors: Record<string, string> = {
  GENERAL: "info",
  EXAM: "warning",
  ADMISSION: "success",
  HOLIDAY: "gold",
  URGENT: "danger",
}

export default function AdminNoticesPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-[#1a3c6e] flex items-center gap-2">
            <Bell className="w-6 h-6 text-[#c8a951]" /> Notices
          </h1>
          <p className="text-sm text-gray-500 mt-0.5">Create and manage school notices, announcements, and circulars.</p>
        </div>
        <Button variant="gold" className="flex-shrink-0">
          <Plus className="w-4 h-4" /> Create Notice
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input placeholder="Search notices..." className="pl-9" />
            </div>
            <div className="flex gap-2">
              <select className="h-10 px-3 rounded-lg border border-gray-200 text-sm bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#1a3c6e]">
                <option value="">All Categories</option>
                <option value="GENERAL">General</option>
                <option value="EXAM">Exam</option>
                <option value="ADMISSION">Admission</option>
                <option value="HOLIDAY">Holiday</option>
                <option value="URGENT">Urgent</option>
              </select>
              <select className="h-10 px-3 rounded-lg border border-gray-200 text-sm bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#1a3c6e]">
                <option value="">All Status</option>
                <option value="PUBLISHED">Published</option>
                <option value="DRAFT">Draft</option>
                <option value="ARCHIVED">Archived</option>
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Table */}
      <Card>
        <CardContent className="p-0">
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
                {notices.map((notice) => (
                  <tr key={notice.id} className="hover:bg-[#f8f9ff] transition-colors">
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
                        {notice.isPinned && <Pin className="w-3.5 h-3.5 text-[#1a3c6e]" />}
                        {notice.isMarquee && <Volume2 className="w-3.5 h-3.5 text-[#c8a951]" />}
                      </div>
                    </td>
                    <td className="text-center px-3 py-4">
                      <span className="text-xs text-gray-500">{notice.date}</span>
                    </td>
                    <td className="text-center px-3 py-4">
                      <div className="flex items-center justify-center gap-1">
                        <button className="p-1.5 rounded-md hover:bg-blue-50 text-gray-400 hover:text-blue-600 transition-colors" title="View">
                          <Eye className="w-3.5 h-3.5" />
                        </button>
                        <button className="p-1.5 rounded-md hover:bg-amber-50 text-gray-400 hover:text-amber-600 transition-colors" title="Edit">
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button className="p-1.5 rounded-md hover:bg-red-50 text-gray-400 hover:text-red-600 transition-colors" title="Delete">
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {/* Pagination */}
          <div className="flex items-center justify-between px-5 py-3 border-t border-gray-100">
            <p className="text-xs text-gray-500">Showing 1–6 of 6 notices</p>
            <div className="flex gap-1">
              <button className="px-3 py-1.5 rounded-md text-xs font-medium bg-[#1a3c6e] text-white">1</button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
