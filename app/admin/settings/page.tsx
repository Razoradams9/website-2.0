"use client"
import React, { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Settings, Image, Save, Upload, Trash2 } from "lucide-react"

export default function AdminSettingsPage() {
  const [logoUrl, setLogoUrl] = useState("")
  const [newLogoUrl, setNewLogoUrl] = useState("")
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    const stored = localStorage.getItem("ggg_logo_url")
    if (stored) {
      setLogoUrl(stored)
      setNewLogoUrl(stored)
    }
  }, [])

  function handleSave() {
    localStorage.setItem("ggg_logo_url", newLogoUrl)
    setLogoUrl(newLogoUrl)
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  function handleRemove() {
    localStorage.removeItem("ggg_logo_url")
    setLogoUrl("")
    setNewLogoUrl("")
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-black text-[#138808] flex items-center gap-2">
          <Settings className="w-6 h-6 text-[#FF9933]" /> Site Settings
        </h1>
        <p className="text-sm text-gray-500 mt-0.5">Manage your school website logo and branding.</p>
      </div>

      {/* Logo Upload */}
      <Card>
        <CardContent className="p-6">
          <h3 className="font-bold text-[#138808] text-lg mb-4 flex items-center gap-2">
            <Image className="w-5 h-5 text-[#FF9933]" /> School Logo
          </h3>

          {/* Current Logo Preview */}
          <div className="mb-6">
            <Label className="text-sm text-gray-600 mb-2 block">Current Logo:</Label>
            <div className="w-32 h-32 rounded-xl border-2 border-dashed border-gray-300 flex items-center justify-center bg-gray-50 overflow-hidden">
              {logoUrl ? (
                <img src={logoUrl} alt="School Logo" className="w-full h-full object-contain p-2" />
              ) : (
                <div className="text-center text-gray-400">
                  <Image className="w-8 h-8 mx-auto mb-1 opacity-40" />
                  <p className="text-xs">No logo set</p>
                </div>
              )}
            </div>
          </div>

          {/* Upload Instructions */}
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-5">
            <h4 className="font-semibold text-blue-800 text-sm mb-2 flex items-center gap-2">
              <Upload className="w-4 h-4" /> How to add your logo:
            </h4>
            <ol className="text-xs text-blue-700 space-y-1.5 list-decimal ml-4">
              <li>Go to <a href="https://postimages.org" target="_blank" rel="noopener noreferrer" className="underline font-semibold">postimages.org</a> (free, no account needed)</li>
              <li>Upload your school logo image (PNG or JPG)</li>
              <li>After upload, copy the <strong>"Direct Link"</strong> (ends in .png or .jpg)</li>
              <li>Paste it in the field below and click Save</li>
            </ol>
          </div>

          {/* Logo URL Input */}
          <div className="space-y-3">
            <div>
              <Label>Logo Image URL</Label>
              <Input
                value={newLogoUrl}
                onChange={(e) => setNewLogoUrl(e.target.value)}
                placeholder="https://i.postimg.cc/your-logo.png"
                className="mt-1"
              />
              <p className="text-[10px] text-gray-400 mt-1">Paste the direct image link from PostImages, Imgur, or Google Drive</p>
            </div>

            {/* Preview of new URL */}
            {newLogoUrl && newLogoUrl !== logoUrl && (
              <div>
                <Label className="text-xs text-gray-500">Preview:</Label>
                <div className="mt-1 w-24 h-24 rounded-lg border border-gray-200 overflow-hidden bg-gray-50">
                  <img src={newLogoUrl} alt="Preview" className="w-full h-full object-contain p-1" onError={(e) => { (e.target as HTMLImageElement).style.display = "none" }} />
                </div>
              </div>
            )}

            <div className="flex gap-3">
              <Button onClick={handleSave} disabled={!newLogoUrl.trim()}>
                <Save className="w-4 h-4" /> Save Logo
              </Button>
              {logoUrl && (
                <Button variant="ghost" onClick={handleRemove} className="text-red-500 hover:text-red-700 hover:bg-red-50">
                  <Trash2 className="w-4 h-4" /> Remove
                </Button>
              )}
            </div>

            {saved && (
              <p className="text-sm text-emerald-600 font-medium">✓ Logo saved! Refresh the website to see it.</p>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Info */}
      <Card className="bg-[#f0fdf4] border-[#138808]/10">
        <CardContent className="p-4">
          <p className="text-sm text-gray-600">
            <strong className="text-[#138808]">Note:</strong> The logo appears in the website header, footer, and admin panel. Recommended size: 200×200px or larger, PNG format with transparent background works best.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
