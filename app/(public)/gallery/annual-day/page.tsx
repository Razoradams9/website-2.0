import { PageHero } from "@/components/public/shared/page-hero"
import { Camera, Music, Star } from "lucide-react"

export const metadata = { title: "Annual Day Gallery" }

const annualDayPhotos = [
  { id: "1", title: "Grand Opening — Lamp Lighting", color: "from-amber-500 to-orange-600" },
  { id: "2", title: "Welcome Dance Performance", color: "from-pink-500 to-rose-600" },
  { id: "3", title: "Drama — 'The Merchant of Venice'", color: "from-purple-500 to-violet-600" },
  { id: "4", title: "Classical Music Recital", color: "from-blue-500 to-indigo-600" },
  { id: "5", title: "Chief Guest Address", color: "from-emerald-500 to-teal-600" },
  { id: "6", title: "Prize Distribution Ceremony", color: "from-amber-500 to-yellow-600" },
  { id: "7", title: "Folk Dance — Bhangra", color: "from-orange-500 to-red-600" },
  { id: "8", title: "Western Dance Group", color: "from-fuchsia-500 to-pink-600" },
  { id: "9", title: "Students' Choir Performance", color: "from-cyan-500 to-blue-600" },
  { id: "10", title: "Finale — Grand Tableau", color: "from-rose-500 to-red-600" },
  { id: "11", title: "Backstage Moments", color: "from-slate-500 to-gray-600" },
  { id: "12", title: "Group Photo — All Performers", color: "from-indigo-500 to-violet-600" },
]

export default function AnnualDayGalleryPage() {
  return (
    <>
      <PageHero
        title="Annual Day Gallery"
        subtitle="Celebrating talent, creativity, and the spirit of togetherness."
        breadcrumbs={[{ label: "Gallery", href: "/gallery" }, { label: "Annual Day" }]}
      />

      <section className="py-14">
        <div className="container mx-auto px-4">
          {/* Info */}
          <div className="bg-[#eff6ff] rounded-2xl p-6 border border-[#1e40af]/10 mb-10 max-w-3xl mx-auto text-center">
            <div className="flex items-center justify-center gap-2 text-[#FF9933] mb-2">
              <Star className="w-4 h-4 fill-[#FF9933]" />
              <Star className="w-4 h-4 fill-[#FF9933]" />
              <Music className="w-5 h-5" />
              <Star className="w-4 h-4 fill-[#FF9933]" />
              <Star className="w-4 h-4 fill-[#FF9933]" />
            </div>
            <h3 className="font-bold text-[#1e40af] text-lg">Annual Day 2024 — "Wings of Dreams"</h3>
            <p className="text-sm text-gray-600 mt-1">December 20, 2024 • School Auditorium • Chief Guest: Dr. R.K. Sharma, IAS</p>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {annualDayPhotos.map((photo) => (
              <div key={photo.id} className="group relative overflow-hidden rounded-2xl aspect-square cursor-pointer hover:shadow-xl transition-all">
                <div className={`absolute inset-0 bg-gradient-to-br ${photo.color} opacity-85 group-hover:opacity-95 transition-opacity`} />
                <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-4 text-center">
                  <Camera className="w-8 h-8 mb-2 opacity-50 group-hover:opacity-80 group-hover:scale-110 transition-all" />
                  <p className="text-xs font-bold leading-tight">{photo.title}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
