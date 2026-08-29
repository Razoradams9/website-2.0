import { PageHero } from "@/components/public/shared/page-hero"
import { Play } from "lucide-react"

export const metadata = { title: "Video Gallery" }

const videos = [
  { id: "1", title: "Annual Day 2024 — Full Highlights", duration: "12:34", category: "Events" },
  { id: "2", title: "Sports Day 2024 — Best Moments", duration: "8:21", category: "Sports" },
  { id: "3", title: "Campus Tour — Virtual Walk-through", duration: "5:48", category: "Campus" },
  { id: "4", title: "Science Exhibition 2024", duration: "6:12", category: "Academics" },
  { id: "5", title: "Independence Day Celebration", duration: "4:32", category: "National Day" },
  { id: "6", title: "Teachers' Day — Student Performances", duration: "7:15", category: "Cultural" },
]

export default function VideoGalleryPage() {
  return (
    <>
      <PageHero
        title="Video Gallery"
        subtitle="Watch the highlights, events, and special moments from school life."
        breadcrumbs={[{ label: "Gallery", href: "/gallery" }, { label: "Videos" }]}
      />

      <section className="py-14">
        <div className="container mx-auto px-4">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {videos.map((video) => (
              <div key={video.id} className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm group cursor-pointer hover:shadow-lg transition-all hover:-translate-y-0.5">
                <div className="aspect-video bg-gradient-to-br from-[#1e40af] to-[#1e3a8a] flex items-center justify-center relative">
                  <div className="w-16 h-16 rounded-full bg-white/15 border-2 border-white/30 flex items-center justify-center group-hover:scale-110 group-hover:bg-[#FF9933]/30 transition-all">
                    <Play className="w-7 h-7 text-white fill-white ml-1" />
                  </div>
                  <span className="absolute bottom-3 right-3 bg-black/60 text-white text-xs px-2 py-0.5 rounded font-medium">{video.duration}</span>
                  <span className="absolute top-3 left-3 bg-[#FF9933]/90 text-[#1e40af] text-[10px] px-2 py-0.5 rounded font-bold">{video.category}</span>
                </div>
                <div className="p-4">
                  <p className="font-semibold text-[#1e40af] text-sm group-hover:text-[#FF9933] transition-colors">{video.title}</p>
                </div>
              </div>
            ))}
          </div>

          <p className="text-center text-sm text-gray-400 mt-10">Videos will be embedded from YouTube once uploaded by admin.</p>
        </div>
      </section>
    </>
  )
}
