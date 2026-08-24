"use client"
import React, { useState, useEffect, useRef } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Users, Save, Upload, X, Loader2, Camera } from "lucide-react"

interface LeaderData {
  name: string
  message: string
  photoUrl: string
}

interface AdministrationData {
  chairmanName: string | null
  chairmanMessage: string | null
  chairmanPhotoUrl: string | null
  director1Name: string | null
  director1Message: string | null
  director1PhotoUrl: string | null
  director2Name: string | null
  director2Message: string | null
  director2PhotoUrl: string | null
  principalName: string | null
  principalMessage: string | null
  principalPhotoUrl: string | null
}

function PhotoUploader({
  currentUrl,
  onUpload,
  label,
}: {
  currentUrl: string
  onUpload: (url: string) => void
  label: string
}) {
  const [uploading, setUploading] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return

    setUploading(true)
    try {
      const formData = new FormData()
      formData.append("file", file)
      formData.append("folder", "school-portal/administration")

      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData,
      })

      if (res.ok) {
        const data = await res.json()
        onUpload(data.url)
      } else {
        const err = await res.json()
        alert(err.error || "Upload failed")
      }
    } catch {
      alert("Upload failed. Please try again.")
    } finally {
      setUploading(false)
      if (inputRef.current) inputRef.current.value = ""
    }
  }

  return (
    <div className="flex flex-col items-center gap-3">
      <div className="relative w-36 h-36 rounded-2xl overflow-hidden border-2 border-dashed border-gray-200 bg-gray-50 flex items-center justify-center group">
        {currentUrl ? (
          <>
            <img
              src={currentUrl}
              alt={label}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <Camera className="w-6 h-6 text-white" />
            </div>
          </>
        ) : (
          <div className="text-center p-3">
            <Camera className="w-8 h-8 text-gray-300 mx-auto mb-1" />
            <p className="text-[10px] text-gray-400">No photo</p>
          </div>
        )}
        {uploading && (
          <div className="absolute inset-0 bg-white/80 flex items-center justify-center">
            <Loader2 className="w-6 h-6 animate-spin text-[#1a3c6e]" />
          </div>
        )}
      </div>
      <div className="flex gap-2">
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => inputRef.current?.click()}
          disabled={uploading}
          className="text-xs"
        >
          <Upload className="w-3 h-3" /> {currentUrl ? "Change" : "Upload"}
        </Button>
        {currentUrl && (
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => onUpload("")}
            className="text-xs text-red-500 hover:text-red-700"
          >
            <X className="w-3 h-3" /> Remove
          </Button>
        )}
      </div>
      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp,image/gif"
        className="hidden"
        onChange={handleFileChange}
      />
    </div>
  )
}

function LeaderSection({
  title,
  leader,
  onChange,
  roleLabel,
}: {
  title: string
  leader: LeaderData
  onChange: (data: LeaderData) => void
  roleLabel: string
}) {
  return (
    <Card className="border-gray-100">
      <CardContent className="p-6">
        <h3 className="font-bold text-[#1a3c6e] text-lg mb-5 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#c8a951]" />
          {title}
        </h3>
        <div className="grid md:grid-cols-[180px_1fr] gap-6">
          <PhotoUploader
            currentUrl={leader.photoUrl}
            onUpload={(url) => onChange({ ...leader, photoUrl: url })}
            label={roleLabel}
          />
          <div className="space-y-4">
            <div>
              <Label className="text-xs font-semibold text-gray-600">Full Name</Label>
              <Input
                value={leader.name}
                onChange={(e) => onChange({ ...leader, name: e.target.value })}
                placeholder={`Enter ${roleLabel.toLowerCase()} name`}
                className="mt-1"
              />
            </div>
            <div>
              <Label className="text-xs font-semibold text-gray-600">Message</Label>
              <Textarea
                value={leader.message}
                onChange={(e) => onChange({ ...leader, message: e.target.value })}
                placeholder={`Enter ${roleLabel.toLowerCase()}'s message...`}
                className="mt-1"
                rows={5}
              />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default function AdminAdministrationPage() {
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [chairman, setChairman] = useState<LeaderData>({ name: "", message: "", photoUrl: "" })
  const [director1, setDirector1] = useState<LeaderData>({ name: "", message: "", photoUrl: "" })
  const [director2, setDirector2] = useState<LeaderData>({ name: "", message: "", photoUrl: "" })
  const [principal, setPrincipal] = useState<LeaderData>({ name: "", message: "", photoUrl: "" })

  useEffect(() => {
    fetchData()
  }, [])

  async function fetchData() {
    try {
      const res = await fetch("/api/admin/administration")
      if (res.ok) {
        const data: AdministrationData = await res.json()
        setChairman({
          name: data.chairmanName || "",
          message: data.chairmanMessage || "",
          photoUrl: data.chairmanPhotoUrl || "",
        })
        setDirector1({
          name: data.director1Name || "",
          message: data.director1Message || "",
          photoUrl: data.director1PhotoUrl || "",
        })
        setDirector2({
          name: data.director2Name || "",
          message: data.director2Message || "",
          photoUrl: data.director2PhotoUrl || "",
        })
        setPrincipal({
          name: data.principalName || "",
          message: data.principalMessage || "",
          photoUrl: data.principalPhotoUrl || "",
        })
      }
    } catch {
      console.error("Failed to load administration data")
    } finally {
      setLoading(false)
    }
  }

  async function handleSave() {
    setSaving(true)
    try {
      const res = await fetch("/api/admin/administration", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chairmanName: chairman.name || null,
          chairmanMessage: chairman.message || null,
          chairmanPhotoUrl: chairman.photoUrl || null,
          director1Name: director1.name || null,
          director1Message: director1.message || null,
          director1PhotoUrl: director1.photoUrl || null,
          director2Name: director2.name || null,
          director2Message: director2.message || null,
          director2PhotoUrl: director2.photoUrl || null,
          principalName: principal.name || null,
          principalMessage: principal.message || null,
          principalPhotoUrl: principal.photoUrl || null,
        }),
      })

      if (res.ok) {
        alert("Administration data saved successfully!")
      } else {
        alert("Failed to save. Please try again.")
      }
    } catch {
      alert("Failed to save. Please try again.")
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="w-6 h-6 animate-spin text-[#1a3c6e]" />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-[#1a3c6e] flex items-center gap-2">
            <Users className="w-6 h-6 text-[#c8a951]" /> Administration
          </h1>
          <p className="text-sm text-gray-500 mt-0.5">
            Manage photos and messages for Chairman, Directors, and Principal.
          </p>
        </div>
        <Button variant="gold" onClick={handleSave} disabled={saving}>
          {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
          {saving ? "Saving..." : "Save All Changes"}
        </Button>
      </div>

      {/* Leader Sections */}
      <LeaderSection
        title="Chairman"
        leader={chairman}
        onChange={setChairman}
        roleLabel="Chairman"
      />
      <LeaderSection
        title="Director (1)"
        leader={director1}
        onChange={setDirector1}
        roleLabel="Director"
      />
      <LeaderSection
        title="Director (2)"
        leader={director2}
        onChange={setDirector2}
        roleLabel="Director"
      />
      <LeaderSection
        title="Principal"
        leader={principal}
        onChange={setPrincipal}
        roleLabel="Principal"
      />
    </div>
  )
}
