"use client"
import React, { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { UserCheck, Plus, Trash2, Pencil, Save, X } from "lucide-react"

interface StaffMember {
  id: string
  name: string
  designation: string
  department: string
  qualification: string
  phone: string
}

const initialStaff: StaffMember[] = [
  { id: "1", name: "Shri Girish Nair Rishi", designation: "Principal", department: "Administration", qualification: "M.A., B.Ed.", phone: "9794335475" },
]

export default function AdminStaffPage() {
  const [staff, setStaff] = useState<StaffMember[]>(initialStaff)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [draft, setDraft] = useState<StaffMember | null>(null)

  function startAdd() {
    const newMember: StaffMember = {
      id: Date.now().toString(),
      name: "",
      designation: "",
      department: "",
      qualification: "",
      phone: "",
    }
    setStaff((prev) => [...prev, newMember])
    setEditingId(newMember.id)
    setDraft(newMember)
  }

  function startEdit(member: StaffMember) {
    setEditingId(member.id)
    setDraft({ ...member })
  }

  function cancelEdit() {
    // If a brand-new blank row was being added, drop it on cancel.
    setStaff((prev) => prev.filter((m) => m.name.trim() !== "" || m.id !== editingId))
    setEditingId(null)
    setDraft(null)
  }

  function saveEdit() {
    if (!draft) return
    setStaff((prev) => prev.map((m) => (m.id === draft.id ? draft : m)))
    setEditingId(null)
    setDraft(null)
  }

  function removeMember(id: string) {
    setStaff((prev) => prev.filter((m) => m.id !== id))
    if (editingId === id) {
      setEditingId(null)
      setDraft(null)
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-[#1e40af] flex items-center gap-2">
            <UserCheck className="w-6 h-6 text-[#FF9933]" /> Staff Details
          </h1>
          <p className="text-sm text-gray-500 mt-0.5">
            Manage teaching and non-teaching staff records.
          </p>
        </div>
        <Button variant="gold" onClick={startAdd}>
          <Plus className="w-4 h-4" /> Add Staff Member
        </Button>
      </div>

      {/* List */}
      <div className="space-y-3">
        {staff.length === 0 && (
          <Card className="border-gray-100">
            <CardContent className="p-8 text-center text-sm text-gray-400">
              No staff members yet. Click &quot;Add Staff Member&quot; to create one.
            </CardContent>
          </Card>
        )}

        {staff.map((member) => {
          const isEditing = editingId === member.id && draft
          return (
            <Card key={member.id} className="border-gray-100">
              <CardContent className="p-5">
                {isEditing ? (
                  <div className="space-y-4">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <Label className="text-xs font-semibold text-gray-600">Full Name</Label>
                        <Input
                          value={draft!.name}
                          onChange={(e) => setDraft({ ...draft!, name: e.target.value })}
                          placeholder="e.g. Smt. Anjali Sharma"
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label className="text-xs font-semibold text-gray-600">Designation</Label>
                        <Input
                          value={draft!.designation}
                          onChange={(e) => setDraft({ ...draft!, designation: e.target.value })}
                          placeholder="e.g. TGT Science"
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label className="text-xs font-semibold text-gray-600">Department</Label>
                        <Input
                          value={draft!.department}
                          onChange={(e) => setDraft({ ...draft!, department: e.target.value })}
                          placeholder="e.g. Science"
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label className="text-xs font-semibold text-gray-600">Qualification</Label>
                        <Input
                          value={draft!.qualification}
                          onChange={(e) => setDraft({ ...draft!, qualification: e.target.value })}
                          placeholder="e.g. M.Sc., B.Ed."
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label className="text-xs font-semibold text-gray-600">Phone</Label>
                        <Input
                          value={draft!.phone}
                          onChange={(e) => setDraft({ ...draft!, phone: e.target.value })}
                          placeholder="e.g. 9876543210"
                          className="mt-1"
                        />
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="default" size="sm" onClick={saveEdit}>
                        <Save className="w-3.5 h-3.5" /> Save
                      </Button>
                      <Button variant="ghost" size="sm" onClick={cancelEdit} className="text-gray-500">
                        <X className="w-3.5 h-3.5" /> Cancel
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-4 min-w-0">
                      <div className="w-11 h-11 rounded-xl bg-[#1e40af] flex items-center justify-center text-white font-bold flex-shrink-0">
                        {member.name.trim() ? member.name.trim().charAt(0).toUpperCase() : "?"}
                      </div>
                      <div className="min-w-0">
                        <p className="font-bold text-gray-800 truncate">{member.name || "Unnamed"}</p>
                        <p className="text-xs text-gray-500 truncate">
                          {[member.designation, member.department].filter(Boolean).join(" · ") || "No designation"}
                        </p>
                        <p className="text-[11px] text-gray-400 truncate">
                          {[member.qualification, member.phone].filter(Boolean).join(" · ")}
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-1.5 flex-shrink-0">
                      <button
                        onClick={() => startEdit(member)}
                        className="p-2 rounded-lg text-gray-500 hover:bg-[#eff6ff] hover:text-[#1e40af] transition-colors"
                        aria-label="Edit"
                      >
                        <Pencil className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => removeMember(member.id)}
                        className="p-2 rounded-lg text-gray-500 hover:bg-red-50 hover:text-red-600 transition-colors"
                        aria-label="Delete"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
