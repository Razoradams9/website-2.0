import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Newspaper, Plus, Search, Edit2, Trash2, Eye, Calendar, ExternalLink } from "lucide-react"
import { Input } from "@/components/ui/input"

export const metadata = { title: "Manage News" }

const newsItems = [
  { id: "1", title: "School Bags National Science Olympiad Gold", slug: "science-olympiad-gold-2025", status: "PUBLISHED", tags: ["Achievement", "Science"], publishedAt: "Aug 18, 2025", image: true },
  { id: "2", title: "Annual Sports Day 2025 — Highlights & Winners", slug: "sports-day-2025", status: "PUBLISHED", tags: ["Sports", "Events"], publishedAt: "Aug 12, 2025", image: true },
  { id: "3", title: "CBSE Board Results: 100% Pass Rate Again!", slug: "board-results-2025", status: "PUBLISHED", tags: ["Results", "Achievement"], publishedAt: "Jul 25, 2025", image: true },
  { id: "4", title: "New Computer Lab Inaugurated", slug: "new-computer-lab", status: "DRAFT", tags: ["Infrastructure"], publishedAt: null, image: false },
  { id: "5", title: "Teachers' Day Celebration 2025", slug: "teachers-day-2025", status: "DRAFT", tags: ["Events", "Cultural"], publishedAt: null, image: false },
]

export default function AdminNewsPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-[#1e40af] flex items-center gap-2">
            <Newspaper className="w-6 h-6 text-[#FF9933]" /> News Articles
          </h1>
          <p className="text-sm text-gray-500 mt-0.5">Manage school news and announcements published on the website.</p>
        </div>
        <Button variant="gold" className="flex-shrink-0">
          <Plus className="w-4 h-4" /> New Article
        </Button>
      </div>

      {/* Search */}
      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <Input placeholder="Search news..." className="pl-9" />
      </div>

      {/* News Cards */}
      <div className="grid gap-4">
        {newsItems.map((item) => (
          <Card key={item.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-5">
              <div className="flex gap-4">
                {/* Thumbnail */}
                <div className="w-24 h-24 rounded-xl bg-gradient-to-br from-[#1e40af] to-[#1e3a8a] flex items-center justify-center flex-shrink-0">
                  {item.image ? (
                    <Newspaper className="w-8 h-8 text-[#FF9933]/50" />
                  ) : (
                    <span className="text-gray-500 text-xs">No Image</span>
                  )}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <h3 className="font-bold text-[#1e40af] text-base truncate">{item.title}</h3>
                      <p className="text-xs text-gray-400 mt-0.5 flex items-center gap-2">
                        <span className="flex items-center gap-1">
                          <ExternalLink className="w-3 h-3" /> /{item.slug}
                        </span>
                        {item.publishedAt && (
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" /> {item.publishedAt}
                          </span>
                        )}
                      </p>
                    </div>
                    <Badge variant={item.status === "PUBLISHED" ? "success" : "warning"} className="text-[10px] flex-shrink-0">
                      {item.status}
                    </Badge>
                  </div>

                  {/* Tags */}
                  <div className="flex items-center gap-1.5 mt-3 flex-wrap">
                    {item.tags.map((tag) => (
                      <Badge key={tag} variant="outline" className="text-[10px]">{tag}</Badge>
                    ))}
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2 mt-3 pt-3 border-t border-gray-100">
                    <Button variant="ghost" size="sm" className="h-7 text-xs gap-1.5 text-gray-500 hover:text-blue-600">
                      <Eye className="w-3.5 h-3.5" /> Preview
                    </Button>
                    <Button variant="ghost" size="sm" className="h-7 text-xs gap-1.5 text-gray-500 hover:text-amber-600">
                      <Edit2 className="w-3.5 h-3.5" /> Edit
                    </Button>
                    <Button variant="ghost" size="sm" className="h-7 text-xs gap-1.5 text-gray-500 hover:text-red-600">
                      <Trash2 className="w-3.5 h-3.5" /> Delete
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
