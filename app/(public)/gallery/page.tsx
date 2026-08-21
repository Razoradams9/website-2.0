import { PageHero } from "@/components/public/shared/page-hero"
import { getGalleryAlbums, getPublishedGalleryItems } from "@/lib/db/queries"
import { Image as ImageIcon, Video, Camera } from "lucide-react"

export const metadata = { title: "Gallery" }

export default async function GalleryPage() {
  const [albums, items] = await Promise.all([getGalleryAlbums(), getPublishedGalleryItems(20)])

  const placeholderImages = [
    { id: "1", title: "Annual Day Celebration 2024", category: "ANNUAL_DAY", color: "from-pink-500 to-rose-600" },
    { id: "2", title: "Sports Day — Track Events", category: "SPORTS_DAY", color: "from-orange-500 to-amber-600" },
    { id: "3", title: "Science Exhibition 2024", category: "ACADEMICS", color: "from-blue-500 to-indigo-600" },
    { id: "4", title: "Independence Day Celebration", category: "CULTURAL", color: "from-green-500 to-emerald-600" },
    { id: "5", title: "Classroom Activities", category: "ACADEMICS", color: "from-purple-500 to-violet-600" },
    { id: "6", title: "Award Ceremony", category: "ACHIEVEMENTS", color: "from-amber-500 to-yellow-600" },
    { id: "7", title: "Annual Tour — Jaipur", category: "TOURS_TRIPS", color: "from-teal-500 to-cyan-600" },
    { id: "8", title: "Infrastructure — New Building", category: "INFRASTRUCTURE", color: "from-slate-500 to-gray-600" },
    { id: "9", title: "Cultural Fest Performances", category: "CULTURAL", color: "from-fuchsia-500 to-pink-600" },
    { id: "10", title: "Sports — Cricket Championship", category: "SPORTS_DAY", color: "from-lime-500 to-green-600" },
    { id: "11", title: "Teachers' Day Celebration", category: "CULTURAL", color: "from-red-500 to-rose-600" },
    { id: "12", title: "Art & Craft Exhibition", category: "GENERAL", color: "from-indigo-500 to-blue-600" },
  ]

  return (
    <>
      <PageHero
        title="Photo & Video Gallery"
        subtitle="Capturing moments of learning, celebration, and achievement at DAV Public School."
        breadcrumbs={[{ label: "Gallery" }]}
      />

      {/* Category Tabs */}
      <section className="py-6 border-b border-gray-200 sticky top-20 lg:top-24 bg-white/95 backdrop-blur-sm z-30">
        <div className="container mx-auto px-4">
          <div className="flex gap-3 overflow-x-auto scrollbar-hide py-1">
            {["All", "Annual Day", "Sports Day", "Cultural", "Academics", "Tours", "Infrastructure"].map((cat) => (
              <button
                key={cat}
                className="flex-shrink-0 px-5 py-2 rounded-full text-sm font-semibold bg-[#f0f4ff] text-[#1a3c6e] hover:bg-[#1a3c6e] hover:text-white transition-colors first:bg-[#1a3c6e] first:text-white"
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-14">
        <div className="container mx-auto px-4">
          {items.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {items.map((item) => (
                <div key={item.id} className="group relative overflow-hidden rounded-2xl aspect-square bg-gray-100 cursor-pointer hover:shadow-xl transition-all">
                  <img src={item.mediaUrl} alt={item.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                    <p className="text-white text-sm font-semibold">{item.title}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            /* Placeholder Gallery */
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {placeholderImages.map((img) => (
                <div key={img.id} className="group relative overflow-hidden rounded-2xl aspect-square cursor-pointer hover:shadow-xl transition-all">
                  <div className={`absolute inset-0 bg-gradient-to-br ${img.color} opacity-80`} />
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-4 text-center">
                    <Camera className="w-10 h-10 mb-3 opacity-60" />
                    <p className="text-sm font-bold leading-tight">{img.title}</p>
                    <span className="text-xs mt-1 bg-white/20 px-2 py-0.5 rounded-full">{img.category.replace("_", " ")}</span>
                  </div>
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300" />
                </div>
              ))}
            </div>
          )}

          {/* Video Section */}
          <div className="mt-16">
            <h3 className="text-2xl font-black text-[#1a3c6e] mb-6 flex items-center gap-3">
              <Video className="w-6 h-6 text-[#c8a951]" /> Video Gallery
            </h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { title: "Annual Day 2024 — Highlights", duration: "4:32" },
                { title: "Sports Day 2024 — Best Moments", duration: "3:15" },
                { title: "Campus Tour — Virtual Walk-through", duration: "5:48" },
              ].map((video) => (
                <div key={video.title} className="bg-gray-100 rounded-2xl overflow-hidden group cursor-pointer hover:shadow-lg transition-shadow">
                  <div className="aspect-video bg-gradient-to-br from-[#1a3c6e] to-[#0d1f3c] flex items-center justify-center relative">
                    <div className="w-14 h-14 rounded-full bg-white/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <div className="w-0 h-0 border-l-[18px] border-l-white border-t-[10px] border-t-transparent border-b-[10px] border-b-transparent ml-1" />
                    </div>
                    <span className="absolute bottom-3 right-3 bg-black/60 text-white text-xs px-2 py-0.5 rounded">{video.duration}</span>
                  </div>
                  <div className="p-4">
                    <p className="font-semibold text-[#1a3c6e] text-sm">{video.title}</p>
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
