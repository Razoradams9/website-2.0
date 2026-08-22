import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Image, Plus, GripVertical, Edit2, Trash2, Eye, EyeOff, ArrowUp, ArrowDown } from "lucide-react"

export const metadata = { title: "Manage Hero Slider" }

const sliderItems = [
  { id: "1", title: "Welcome to DAV Public School", subtitle: "Shaping the Future, One Child at a Time", status: "PUBLISHED", order: 1, hasLink: false },
  { id: "2", title: "Admissions Open 2025-2026", subtitle: "Enroll Your Child Today", status: "PUBLISHED", order: 2, hasLink: true },
  { id: "3", title: "Academic Excellence", subtitle: "100% Board Results Consistently", status: "PUBLISHED", order: 3, hasLink: true },
]

export default function AdminSliderPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-[#138808] flex items-center gap-2">
            <Image className="w-6 h-6 text-[#FF9933]" /> Hero Slider
          </h1>
          <p className="text-sm text-gray-500 mt-0.5">Manage the slides shown on the homepage hero section. Drag to reorder.</p>
        </div>
        <Button variant="gold" className="flex-shrink-0">
          <Plus className="w-4 h-4" /> Add Slide
        </Button>
      </div>

      {/* Info */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 text-sm text-blue-700 flex items-start gap-3">
        <Image className="w-5 h-5 mt-0.5 flex-shrink-0" />
        <div>
          <p className="font-semibold">Recommended image size: 1920 × 800px</p>
          <p className="text-xs text-blue-600 mt-0.5">Use high-quality images in JPG/PNG format. Maximum 3–5 slides recommended for best user experience.</p>
        </div>
      </div>

      {/* Slider Items */}
      <div className="space-y-3">
        {sliderItems.map((item) => (
          <Card key={item.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-0">
              <div className="flex items-center gap-4 p-4">
                {/* Drag Handle */}
                <div className="cursor-grab text-gray-300 hover:text-gray-500 transition-colors">
                  <GripVertical className="w-5 h-5" />
                </div>

                {/* Order */}
                <div className="w-8 h-8 rounded-lg bg-[#138808] flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                  {item.order}
                </div>

                {/* Image Preview */}
                <div className="w-32 h-20 rounded-lg bg-gradient-to-br from-[#138808] to-[#0a4d0a] flex-shrink-0 flex items-center justify-center overflow-hidden">
                  <Image className="w-8 h-8 text-[#FF9933]/30" />
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-[#138808] text-sm truncate">{item.title}</h3>
                  <p className="text-xs text-gray-500 mt-0.5 truncate">{item.subtitle}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <Badge variant={item.status === "PUBLISHED" ? "success" : "warning"} className="text-[10px]">{item.status}</Badge>
                    {item.hasLink && <Badge variant="outline" className="text-[10px]">Has CTA Link</Badge>}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-1 flex-shrink-0">
                  <button className="p-2 rounded-md hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors" title="Move Up">
                    <ArrowUp className="w-4 h-4" />
                  </button>
                  <button className="p-2 rounded-md hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors" title="Move Down">
                    <ArrowDown className="w-4 h-4" />
                  </button>
                  <button className="p-2 rounded-md hover:bg-amber-50 text-gray-400 hover:text-amber-600 transition-colors" title="Edit">
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button className="p-2 rounded-md hover:bg-red-50 text-gray-400 hover:text-red-600 transition-colors" title="Delete">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Tips */}
      <div className="bg-[#f0fdf4] rounded-xl p-5 border border-[#138808]/10">
        <h4 className="font-bold text-[#138808] text-sm mb-2">Tips for effective sliders:</h4>
        <ul className="space-y-1.5 text-xs text-gray-600">
          <li>• Keep text concise — visitors spend 3–5 seconds per slide</li>
          <li>• Use high-contrast images with clear focal points</li>
          <li>• Include a strong call-to-action button on each slide</li>
          <li>• Limit to 3–5 slides maximum for best engagement</li>
          <li>• Auto-advance interval is set to 6 seconds</li>
        </ul>
      </div>
    </div>
  )
}
