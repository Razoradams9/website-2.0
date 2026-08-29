"use client"
import React, { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Award, Plus, Edit2, Trash2, Save, X, Upload, FileText } from "lucide-react"

const categoryOptions = [
  { value: "GENERAL_INFO", label: "A. General Information" },
  { value: "DOCUMENTS_AND_CERTIFICATES", label: "B. Documents & Certificates" },
  { value: "RESULT_AND_ACADEMICS", label: "C. Result & Academics" },
  { value: "STAFF_DETAILS", label: "D. Staff Details" },
  { value: "SCHOOL_INFRASTRUCTURE", label: "E. School Infrastructure" },
  { value: "FEE_STRUCTURE", label: "F. Fee Structure" },
  { value: "CBSE_SELF_DECLARATION", label: "G. Self Declaration" },
]

interface DisclosureItem {
  id: string
  title: string
  description: string | null
  category: string
  fileUrl: string | null
  externalUrl: string | null
  sortOrder: number
  isPublic: boolean
}

export default function AdminCBSEPage() {
  const [items, setItems] = useState<DisclosureItem[]>([])
  const [loading, setLoading] = useState(true)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [showAdd, setShowAdd] = useState(false)

  // Form state
  const [formTitle, setFormTitle] = useState("")
  const [formDescription, setFormDescription] = useState("")
  const [formCategory, setFormCategory] = useState("GENERAL_INFO")
  const [formFileUrl, setFormFileUrl] = useState("")
  const [formExternalUrl, setFormExternalUrl] = useState("")
  const [formSortOrder, setFormSortOrder] = useState(0)

  useEffect(() => {
    fetchItems()
  }, [])

  async function fetchItems() {
    try {
      const res = await fetch("/api/admin/cbse")
      if (res.ok) {
        const data = await res.json()
        setItems(data)
      }
    } catch (e) {
      console.error("Failed to fetch disclosures")
    } finally {
      setLoading(false)
    }
  }

  function resetForm() {
    setFormTitle("")
    setFormDescription("")
    setFormCategory("GENERAL_INFO")
    setFormFileUrl("")
    setFormExternalUrl("")
    setFormSortOrder(0)
    setEditingId(null)
    setShowAdd(false)
  }

  function startEdit(item: DisclosureItem) {
    setEditingId(item.id)
    setFormTitle(item.title)
    setFormDescription(item.description || "")
    setFormCategory(item.category)
    setFormFileUrl(item.fileUrl || "")
    setFormExternalUrl(item.externalUrl || "")
    setFormSortOrder(item.sortOrder)
    setShowAdd(true)
  }

  async function handleSave() {
    const body = {
      title: formTitle,
      description: formDescription || null,
      category: formCategory,
      fileUrl: formFileUrl || null,
      externalUrl: formExternalUrl || null,
      sortOrder: formSortOrder,
      isPublic: true,
    }

    try {
      if (editingId) {
        await fetch("/api/admin/cbse", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id: editingId, ...body }),
        })
      } else {
        await fetch("/api/admin/cbse", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        })
      }
      resetForm()
      fetchItems()
    } catch (e) {
      console.error("Save failed")
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Are you sure you want to delete this item?")) return
    try {
      await fetch("/api/admin/cbse", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      })
      fetchItems()
    } catch (e) {
      console.error("Delete failed")
    }
  }

  const grouped: Record<string, DisclosureItem[]> = {}
  items.forEach((item) => {
    if (!grouped[item.category]) grouped[item.category] = []
    grouped[item.category].push(item)
  })

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-[#1e40af] flex items-center gap-2">
            <Award className="w-6 h-6 text-[#FF9933]" /> CBSE Mandatory Disclosure
          </h1>
          <p className="text-sm text-gray-500 mt-0.5">Add, edit, or upload documents for the public disclosure page.</p>
        </div>
        <Button variant="gold" onClick={() => { resetForm(); setShowAdd(true) }}>
          <Plus className="w-4 h-4" /> Add Item
        </Button>
      </div>

      {/* Add/Edit Form */}
      {showAdd && (
        <Card className="border-[#FF9933]/30 bg-[#fffdf5]">
          <CardContent className="p-6">
            <h3 className="font-bold text-[#1e40af] mb-4">{editingId ? "Edit Item" : "Add New Disclosure Item"}</h3>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2">
                <Label>Title / Particulars *</Label>
                <Input value={formTitle} onChange={(e) => setFormTitle(e.target.value)} placeholder="e.g. Name of the School" className="mt-1" />
              </div>
              <div className="sm:col-span-2">
                <Label>Details / Description (shown as text if no file uploaded)</Label>
                <Textarea value={formDescription} onChange={(e) => setFormDescription(e.target.value)} placeholder="e.g. GURU GORAKSHNATH GYANASTHALI" className="mt-1" rows={2} />
              </div>
              <div>
                <Label>Category *</Label>
                <select
                  value={formCategory}
                  onChange={(e) => setFormCategory(e.target.value)}
                  className="mt-1 w-full h-10 px-3 rounded-lg border border-gray-200 text-sm bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#1e40af]"
                >
                  {categoryOptions.map((opt) => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                  ))}
                </select>
              </div>
              <div>
                <Label>Sort Order</Label>
                <Input type="number" value={formSortOrder} onChange={(e) => setFormSortOrder(Number(e.target.value))} className="mt-1" />
              </div>
              <div>
                <Label>File URL (PDF/Image link)</Label>
                <Input value={formFileUrl} onChange={(e) => setFormFileUrl(e.target.value)} placeholder="https://... or /uploads/file.pdf" className="mt-1" />
                <p className="text-[10px] text-gray-400 mt-1">Upload your file to Google Drive or any host, paste link here</p>
              </div>
              <div>
                <Label>External URL (optional)</Label>
                <Input value={formExternalUrl} onChange={(e) => setFormExternalUrl(e.target.value)} placeholder="https://..." className="mt-1" />
              </div>
            </div>
            <div className="flex gap-3 mt-5">
              <Button onClick={handleSave} disabled={!formTitle.trim()}>
                <Save className="w-4 h-4" /> {editingId ? "Update" : "Save"}
              </Button>
              <Button variant="ghost" onClick={resetForm}>
                <X className="w-4 h-4" /> Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Items List */}
      {loading ? (
        <div className="text-center py-12 text-gray-400">Loading...</div>
      ) : items.length === 0 ? (
        <div className="text-center py-16 text-gray-400">
          <FileText className="w-12 h-12 mx-auto mb-3 opacity-30" />
          <p>No disclosure items yet. Click "Add Item" to get started.</p>
        </div>
      ) : (
        <div className="space-y-8">
          {categoryOptions.map(({ value, label }) => {
            const catItems = grouped[value]
            if (!catItems || catItems.length === 0) return null
            return (
              <div key={value}>
                <h3 className="text-sm font-bold text-[#1e40af] mb-3 flex items-center gap-2">
                  <FileText className="w-4 h-4 text-[#FF9933]" /> {label}
                  <Badge variant="outline" className="text-[10px] ml-1">{catItems.length}</Badge>
                </h3>
                <div className="space-y-2">
                  {catItems.map((item, i) => (
                    <div key={item.id} className="flex items-center gap-3 p-3 bg-white rounded-lg border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                      <span className="w-7 h-7 rounded bg-[#eff6ff] flex items-center justify-center text-xs font-bold text-[#1e40af] flex-shrink-0">{i + 1}</span>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-800 truncate">{item.title}</p>
                        {item.description && <p className="text-xs text-gray-500 truncate">{item.description}</p>}
                        {item.fileUrl && (
                          <a href={item.fileUrl} target="_blank" rel="noopener noreferrer" className="text-[10px] text-[#FF9933] font-semibold hover:underline flex items-center gap-1 mt-0.5">
                            <Upload className="w-3 h-3" /> File uploaded
                          </a>
                        )}
                      </div>
                      <div className="flex gap-1 flex-shrink-0">
                        <button onClick={() => startEdit(item)} className="p-2 rounded-md hover:bg-amber-50 text-gray-400 hover:text-amber-600 transition-colors" title="Edit">
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button onClick={() => handleDelete(item.id)} className="p-2 rounded-md hover:bg-red-50 text-gray-400 hover:text-red-600 transition-colors" title="Delete">
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
