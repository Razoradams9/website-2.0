"use client"
import React, { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ClipboardList, Search, Download, Eye, CheckCircle, XCircle, Clock, Users } from "lucide-react"
import { Input } from "@/components/ui/input"

interface Enquiry {
  id: string
  appNo: string
  name: string
  class: string
  father: string
  phone: string
  status: string
  date: string
}

const statusConfig: Record<string, { variant: string; icon: any }> = {
  SUBMITTED: { variant: "info", icon: Clock },
  UNDER_REVIEW: { variant: "warning", icon: Clock },
  SHORTLISTED: { variant: "gold", icon: CheckCircle },
  APPROVED: { variant: "success", icon: CheckCircle },
  REJECTED: { variant: "danger", icon: XCircle },
  ENROLLED: { variant: "default", icon: Users },
}

export default function AdminAdmissionsPage() {
  // Starts empty — real enquiries arrive from the public admission form.
  const [enquiries] = useState<Enquiry[]>([])
  const [query, setQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("")
  const [classFilter, setClassFilter] = useState("")

  const filtered = enquiries.filter((e) => {
    const q = query.trim().toLowerCase()
    const matchesQuery =
      !q ||
      e.name.toLowerCase().includes(q) ||
      e.appNo.toLowerCase().includes(q) ||
      e.phone.includes(q)
    const matchesStatus = !statusFilter || e.status === statusFilter
    const matchesClass = !classFilter || e.class.includes(classFilter)
    return matchesQuery && matchesStatus && matchesClass
  })

  const countBy = (status: string) => enquiries.filter((e) => e.status === status).length

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-[#1e40af] flex items-center gap-2">
            <ClipboardList className="w-6 h-6 text-[#FF9933]" /> Admission Enquiries
          </h1>
          <p className="text-sm text-gray-500 mt-0.5">Review and manage admission applications.</p>
        </div>
        <Button variant="outline" className="flex-shrink-0" disabled={enquiries.length === 0}>
          <Download className="w-4 h-4" /> Export to Excel
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-3">
        {[
          { label: "Total", value: enquiries.length, color: "bg-gray-50 text-gray-700" },
          { label: "Submitted", value: countBy("SUBMITTED"), color: "bg-blue-50 text-blue-700" },
          { label: "Under Review", value: countBy("UNDER_REVIEW"), color: "bg-amber-50 text-amber-700" },
          { label: "Shortlisted", value: countBy("SHORTLISTED"), color: "bg-[#FF9933]/10 text-[#FF9933]" },
          { label: "Approved", value: countBy("APPROVED"), color: "bg-emerald-50 text-emerald-700" },
          { label: "Enrolled", value: countBy("ENROLLED"), color: "bg-[#1e40af]/10 text-[#1e40af]" },
        ].map((s) => (
          <div key={s.label} className={`rounded-xl p-3 text-center ${s.color}`}>
            <p className="text-xl font-black">{s.value}</p>
            <p className="text-[10px] font-medium">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                placeholder="Search by name, application no, phone..."
                className="pl-9"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </div>
            <select
              className="h-10 px-3 rounded-lg border border-gray-200 text-sm bg-white text-gray-700"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="">All Status</option>
              <option value="SUBMITTED">Submitted</option>
              <option value="UNDER_REVIEW">Under Review</option>
              <option value="SHORTLISTED">Shortlisted</option>
              <option value="APPROVED">Approved</option>
              <option value="REJECTED">Rejected</option>
              <option value="ENROLLED">Enrolled</option>
            </select>
            <select
              className="h-10 px-3 rounded-lg border border-gray-200 text-sm bg-white text-gray-700"
              value={classFilter}
              onChange={(e) => setClassFilter(e.target.value)}
            >
              <option value="">All Classes</option>
              <option value="Nursery">Nursery</option>
              <option value="Class 1">Class 1</option>
              <option value="Class 6">Class 6</option>
              <option value="Class 9">Class 9</option>
              <option value="Class 11">Class 11</option>
            </select>
          </div>
        </CardContent>
      </Card>

      {/* Table */}
      <Card>
        <CardContent className="p-0">
          {filtered.length === 0 ? (
            <div className="text-center py-16 text-gray-400">
              <ClipboardList className="w-12 h-12 mx-auto mb-3 opacity-30" />
              <p className="text-sm">No admission enquiries yet.</p>
              <p className="text-xs mt-1">Applications submitted through the website will appear here.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="border-b border-gray-100 bg-gray-50/50">
                  <tr>
                    <th className="text-left px-5 py-3 font-semibold text-gray-600">App No.</th>
                    <th className="text-left px-3 py-3 font-semibold text-gray-600">Student Name</th>
                    <th className="text-center px-3 py-3 font-semibold text-gray-600">Class</th>
                    <th className="text-left px-3 py-3 font-semibold text-gray-600">Father</th>
                    <th className="text-center px-3 py-3 font-semibold text-gray-600">Phone</th>
                    <th className="text-center px-3 py-3 font-semibold text-gray-600">Status</th>
                    <th className="text-center px-3 py-3 font-semibold text-gray-600">Date</th>
                    <th className="text-center px-3 py-3 font-semibold text-gray-600">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {filtered.map((e) => {
                    const config = statusConfig[e.status] || statusConfig["SUBMITTED"]
                    return (
                      <tr key={e.id} className="hover:bg-[#f5f9ff] transition-colors">
                        <td className="px-5 py-3">
                          <span className="text-xs font-mono font-medium text-[#1e40af]">{e.appNo}</span>
                        </td>
                        <td className="px-3 py-3 font-medium text-gray-800">{e.name}</td>
                        <td className="text-center px-3 py-3 text-gray-600">{e.class}</td>
                        <td className="px-3 py-3 text-gray-600">{e.father}</td>
                        <td className="text-center px-3 py-3 text-gray-500 text-xs">{e.phone}</td>
                        <td className="text-center px-3 py-3">
                          <Badge variant={config.variant as any} className="text-[10px]">{e.status.replace("_", " ")}</Badge>
                        </td>
                        <td className="text-center px-3 py-3 text-xs text-gray-500">{e.date}</td>
                        <td className="text-center px-3 py-3">
                          <div className="flex items-center justify-center gap-1">
                            <button className="p-1.5 rounded-md hover:bg-blue-50 text-gray-400 hover:text-blue-600 transition-colors" title="View Details">
                              <Eye className="w-3.5 h-3.5" />
                            </button>
                            <button className="p-1.5 rounded-md hover:bg-emerald-50 text-gray-400 hover:text-emerald-600 transition-colors" title="Approve">
                              <CheckCircle className="w-3.5 h-3.5" />
                            </button>
                            <button className="p-1.5 rounded-md hover:bg-red-50 text-gray-400 hover:text-red-600 transition-colors" title="Reject">
                              <XCircle className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
