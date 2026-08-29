import { PageHero } from "@/components/public/shared/page-hero"
import { Camera } from "lucide-react"

export const metadata = { title: "Photo Gallery" }

const photos = [
  { id: "1", title: "Annual Day 2024 — Cultural Performance", category: "Cultural", color: "from-pink-500 to-rose-600" },
  { id: "2", title: "Republic Day Flag Hoisting", category: "National Day", color: "from-orange-500 to-amber-600" },
  { id: "3", title: "Science Exhibition Projects", category: "Academics", color: "from-blue-500 to-indigo-600" },
  { id: "4", title: "Sports Day — March Past", category: "Sports", color: "from-emerald-500 to-teal-600" },
  { id: "5", title: "Classroom Learning Activities", category: "Daily Life", color: "from-purple-500 to-violet-600" },
  { id: "6", title: "Art & Craft Exhibition", category: "Cultural", color: "from-fuchsia-500 to-pink-600" },
  { id: "7", title: "Yoga Day Celebration", category: "Health", color: "from-teal-500 to-cyan-600" },
  { id: "8", title: "Tree Plantation Drive", category: "Environment", color: "from-green-500 to-lime-600" },
  { id: "9", title: "Independence Day Celebrations", category: "National Day", color: "from-amber-500 to-yellow-600" },
  { id: "10", title: "Library Reading Week", category: "Academics", color: "from-indigo-500 to-blue-600" },
  { id: "11", title: "Christmas Carnival", category: "Cultural", color: "from-red-500 to-rose-600" },
  { id: "12", title: "School Building — Aerial View", category: "Infrastructure", color: "from-slate-500 to-gray-600" },
  { id: "13", title: "Teachers' Day Program", category: "Cultural", color: "from-violet-500 to-purple-600" },
  { id: "14", title: "Inter-House Cricket Finals", category: "Sports", color: "from-lime-500 to-green-600" },
  { id: "15", title: "Parent-Teacher Meeting", category: "Events", color: "from-cyan-500 to-blue-600" },
  { id: "16", title: "Computer Lab Activities", category: "Academics", color: "from-sky-500 to-indigo-600" },
]

export default function PhotoGalleryPage() {
  return (
    <>
      <PageHero
        title="Photo Gallery"
        subtitle="Capturing moments of joy, learning, and celebration at Guru Gorakshnath Gyanasthali."
        breadcrumbs={[{ label: "Gallery", href: "/gallery" }, { label: "Photos" }]}
      />

      <section className="py-14">
        <div className="container mx-auto px-4">
          {/* Filter tabs */}
          <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-6 mb-8 border-b border-gray-100">
            {["All", "Cultural", "Sports", "Academics", "National Day", "Infrastructure", "Events"].map((tab, i) => (
              <button
                key={tab}
                className={`flex-shrink-0 px-5 py-2 rounded-full text-sm font-semibold transition-colors ${i === 0 ? "bg-[#1e40af] text-white" : "bg-[#eff6ff] text-[#1e40af] hover:bg-[#1e40af] hover:text-white"}`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {photos.map((photo) => (
              <div key={photo.id} className="group relative overflow-hidden rounded-2xl aspect-square cursor-pointer hover:shadow-xl transition-all">
                <div className={`absolute inset-0 bg-gradient-to-br ${photo.color} opacity-85 group-hover:opacity-95 transition-opacity`} />
                <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-4 text-center">
                  <Camera className="w-8 h-8 mb-2 opacity-50 group-hover:opacity-80 group-hover:scale-110 transition-all" />
                  <p className="text-sm font-bold leading-tight">{photo.title}</p>
                  <span className="text-[10px] mt-2 bg-white/20 px-2 py-0.5 rounded-full">{photo.category}</span>
                </div>
              </div>
            ))}
          </div>

          <p className="text-center text-sm text-gray-400 mt-10">Showing placeholder gallery. Actual photos will be uploaded by the admin.</p>
        </div>
      </section>
    </>
  )
}
