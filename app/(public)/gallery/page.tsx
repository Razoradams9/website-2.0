import { Camera, Video, Play } from "lucide-react"
import { prisma } from "@/lib/db/prisma"
import { GalleryGrid } from "@/components/public/gallery-grid"

export const dynamic = "force-dynamic"
export const metadata = { title: "Photo & Video Gallery" }

const CATEGORIES = [
  { value: "ALL", label: "All" },
  { value: "ANNUAL_DAY", label: "Annual Day" },
  { value: "SPORTS_DAY", label: "Sports Day" },
  { value: "CULTURAL", label: "Cultural" },
  { value: "ACADEMICS", label: "Academics" },
  { value: "INFRASTRUCTURE", label: "Campus" },
  { value: "TOURS_TRIPS", label: "Tours & Trips" },
  { value: "ACHIEVEMENTS", label: "Achievements" },
  { value: "GENERAL", label: "General" },
]

async function getGalleryPhotos() {
  try {
    return await prisma.galleryItem.findMany({
      where: { status: "PUBLISHED", type: "PHOTO" },
      orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }],
    })
  } catch {
    return []
  }
}

export default async function GalleryPage({
  searchParams,
}: {
  searchParams: { category?: string }
}) {
  const photos = await getGalleryPhotos()
  const activeCategory = searchParams.category || "ALL"

  const filtered = activeCategory === "ALL"
    ? photos
    : photos.filter((p) => p.category === activeCategory)

  return (
    <>
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-[#138808] via-[#0a4d0a] to-[#138808] text-white overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")" }} />
        <div className="container mx-auto px-4 py-16 md:py-20 relative">
          <nav className="flex items-center gap-1.5 text-xs text-gray-400 mb-4">
            <a href="/" className="hover:text-white">Home</a>
            <span className="text-gray-600">&rsaquo;</span>
            <span className="text-[#FF9933]">Gallery</span>
          </nav>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-black leading-tight">Photo &amp; Video Gallery</h1>
          <p className="mt-3 text-gray-300 text-base md:text-lg max-w-2xl">Capturing moments of learning, celebration, and achievement at Guru Gorakshnath Gyanasthali.</p>
        </div>
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 40" fill="none" className="w-full h-6 md:h-10 text-white"><path d="M0 40V20C360 0 720 0 1080 20C1260 30 1350 35 1440 40V40H0Z" fill="currentColor"/></svg>
        </div>
      </section>

      {/* Filter */}
      <section className="py-6 border-b border-gray-200 sticky top-16 lg:top-[72px] bg-white/95 backdrop-blur-sm z-30">
        <div className="container mx-auto px-4">
          <div className="flex gap-2 overflow-x-auto scrollbar-hide py-1">
            {CATEGORIES.map((cat) => (
              <a
                key={cat.value}
                href={cat.value === "ALL" ? "/gallery" : `/gallery?category=${cat.value}`}
                className={`flex-shrink-0 px-5 py-2 rounded-full text-sm font-semibold transition-colors ${
                  activeCategory === cat.value
                    ? "bg-[#138808] text-white"
                    : "bg-[#f0fdf4] text-[#138808] hover:bg-[#138808] hover:text-white"
                }`}
              >
                {cat.label}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-14">
        <div className="container mx-auto px-4">
          {filtered.length > 0 ? (
            <GalleryGrid photos={filtered.map((p) => ({
              id: p.id,
              title: p.title,
              description: p.description,
              mediaUrl: p.mediaUrl,
              thumbnailUrl: p.thumbnailUrl,
              category: p.category,
            }))} />
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {[
                { title: "Annual Day Celebration", category: "Annual Day", color: "from-pink-500 to-rose-600" },
                { title: "Republic Day Celebration", category: "General", color: "from-orange-500 to-amber-600" },
                { title: "Science Exhibition", category: "Academics", color: "from-blue-500 to-indigo-600" },
                { title: "Sports Day", category: "Sports Day", color: "from-emerald-500 to-teal-600" },
                { title: "Classroom Activities", category: "Academics", color: "from-purple-500 to-violet-600" },
                { title: "Art Exhibition", category: "Cultural", color: "from-fuchsia-500 to-pink-600" },
                { title: "School Building", category: "Campus", color: "from-slate-500 to-gray-600" },
                { title: "Green Campus", category: "Campus", color: "from-green-500 to-lime-600" },
              ].map((img, i) => (
                <div key={i} className="group relative overflow-hidden rounded-2xl aspect-square">
                  <div className={`absolute inset-0 bg-gradient-to-br ${img.color} opacity-85`} />
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-4 text-center">
                    <Camera className="w-8 h-8 mb-2 opacity-50" />
                    <p className="text-sm font-bold leading-tight">{img.title}</p>
                    <span className="text-[10px] mt-2 bg-white/20 px-2 py-0.5 rounded-full">{img.category}</span>
                  </div>
                </div>
              ))}
              <div className="col-span-full text-center py-8 text-gray-400">
                <p className="text-sm">Photos will appear here once uploaded by the admin.</p>
              </div>
            </div>
          )}

          {/* Video Section */}
          <div className="mt-16">
            <h3 className="text-2xl font-black text-[#138808] mb-6 flex items-center gap-3">
              <Video className="w-6 h-6 text-[#FF9933]" /> Video Gallery
            </h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { title: "Campus Tour", desc: "A walkthrough of our facilities" },
                { title: "Annual Day Highlights", desc: "Best moments from Annual Day" },
                { title: "Student Activities", desc: "Learning beyond the classroom" },
              ].map((vid, i) => (
                <div key={i} className="group relative overflow-hidden rounded-2xl aspect-video bg-gradient-to-br from-gray-800 to-gray-900 cursor-pointer hover:shadow-xl transition-all">
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
                    <div className="w-14 h-14 rounded-full bg-white/20 flex items-center justify-center mb-3 group-hover:scale-110 group-hover:bg-[#FF9933]/80 transition-all">
                      <Play className="w-6 h-6 ml-0.5" />
                    </div>
                    <p className="text-sm font-bold">{vid.title}</p>
                    <p className="text-xs text-white/60 mt-1">{vid.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
