import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ClipboardList, Search, Download, Eye, CheckCircle, XCircle, Clock, Filter, Users } from "lucide-react"
import { Input } from "@/components/ui/input"

export const metadata = { title: "Admission Enquiries" }

const enquiries = [
  { id: "1", appNo: "APP2025001", name: "Aarav Sharma", class: "Class 6", father: "Ramesh Sharma", phone: "9876543001", status: "SUBMITTED", date: "Aug 19, 2025" },
  { id: "2", appNo: "APP2025002", name: "Priya Gupta", class: "Class 1", father: "Vikash Gupta", phone: "9876543002", status: "UNDER_REVIEW", date: "Aug 18, 2025" },
  { id: "3", appNo: "APP2025003", name: "Rohit Verma", class: "Class 9", father: "Sunil Verma", phone: "9876543003", status: "SHORTLISTED", date: "Aug 16, 2025" },
  { id: "4", appNo: "APP2025004", name: "Ananya Singh", class: "Class 11 (Sci)", father: "Manoj Singh", phone: "9876543004", status: "APPROVED", date: "Aug 14, 2025" },
  { id: "5", appNo: "APP2025005", name: "Karan Patel", class: "Class 4", father: "Deepak Patel", phone: "9876543005", status: "REJECTED", date: "Aug 12, 2025" },
  { id: "6", appNo: "APP2025006", name: "Meera Joshi", class: "Nursery", father: "Rajesh Joshi", phone: "9876543006", status: "ENROLLED", date: "Aug 10, 2025" },
]

const statusConfig: Record<string, { variant: string; icon: any }> = {
  SUBMITTED: { variant: "info", icon: Clock },
  UNDER_REVIEW: { variant: "warning", icon: Clock },
  SHORTLISTED: { variant: "gold", icon: CheckCircle },
  APPROVED: { variant: "success", icon: CheckCircle },
  REJECTED: { variant: "danger", icon: XCircle },
  ENROLLED: { variant: "default", icon: Users },
}

export default function AdminAdmissionsPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-[#1a3c6e] flex items-center gap-2">
            <ClipboardList className="w-6 h-6 text-[#c8a951]" /> Admission Enquiries
          </h1>
          <p className="text-sm text-gray-500 mt-0.5">Review and manage admission applications.</p>
        </div>
        <Button variant="outline" className="flex-shrink-0">
          <Download className="w-4 h-4" /> Export to Excel
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-3">
        {[
          { label: "Total", value: "23", color: "bg-gray-50 text-gray-700" },
          { label: "Submitted", value: "8", color: "bg-blue-50 text-blue-700" },
          { label: "Under Review", value: "5", color: "bg-amber-50 text-amber-700" },
          { label: "Shortlisted", value: "4", color: "bg-[#c8a951]/10 text-[#c8a951]" },
          { label: "Approved", value: "4", color: "bg-emerald-50 text-emerald-700" },
          { label: "Enrolled", value: "2", color: "bg-[#1a3c6e]/10 text-[#1a3c6e]" },
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
              <Input placeholder="Search by name, application no, phone..." className="pl-9" />
            </div>
            <select className="h-10 px-3 rounded-lg border border-gray-200 text-sm bg-white text-gray-700">
              <option value="">All Status</option>
              <option value="SUBMITTED">Submitted</option>
              <option value="UNDER_REVIEW">Under Review</option>
              <option value="SHORTLISTED">Shortlisted</option>
              <option value="APPROVED">Approved</option>
              <option value="REJECTED">Rejected</option>
              <option value="ENROLLED">Enrolled</option>
            </select>
            <select className="h-10 px-3 rounded-lg border border-gray-200 text-sm bg-white text-gray-700">
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
                {enquiries.map((e) => {
                  const config = statusConfig[e.status] || statusConfig["SUBMITTED"]
                  return (
                    <tr key={e.id} className="hover:bg-[#f8f9ff] transition-colors">
                      <td className="px-5 py-3">
                        <span className="text-xs font-mono font-medium text-[#1a3c6e]">{e.appNo}</span>
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
          <div className="flex items-center justify-between px-5 py-3 border-t border-gray-100">
            <p className="text-xs text-gray-500">Showing 1–6 of 23 enquiries</p>
            <div className="flex gap-1">
              <button className="px-3 py-1.5 rounded-md text-xs font-medium bg-[#1a3c6e] text-white">1</button>
              <button className="px-3 py-1.5 rounded-md text-xs font-medium text-gray-500 hover:bg-gray-100">2</button>
              <button className="px-3 py-1.5 rounded-md text-xs font-medium text-gray-500 hover:bg-gray-100">3</button>
              <button className="px-3 py-1.5 rounded-md text-xs font-medium text-gray-500 hover:bg-gray-100">4</button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
