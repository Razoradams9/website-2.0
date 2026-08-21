import { PageHero } from "@/components/public/shared/page-hero"
import { Camera, Trophy, Medal } from "lucide-react"

export const metadata = { title: "Sports Day Gallery" }

const sportsDayPhotos = [
  { id: "1", title: "March Past — All Houses", color: "from-blue-500 to-indigo-600" },
  { id: "2", title: "100m Sprint — Boys Finals", color: "from-red-500 to-rose-600" },
  { id: "3", title: "Long Jump Competition", color: "from-emerald-500 to-green-600" },
  { id: "4", title: "Relay Race — Senior Girls", color: "from-purple-500 to-violet-600" },
  { id: "5", title: "Tug of War — Staff vs Students", color: "from-amber-500 to-orange-600" },
  { id: "6", title: "Yoga Demonstration", color: "from-teal-500 to-cyan-600" },
  { id: "7", title: "Shot Put & Discus Throw", color: "from-orange-500 to-red-600" },
  { id: "8", title: "Prize Distribution", color: "from-yellow-500 to-amber-600" },
  { id: "9", title: "Basketball Exhibition Match", color: "from-sky-500 to-blue-600" },
  { id: "10", title: "Kabaddi — Inter House", color: "from-green-500 to-emerald-600" },
  { id: "11", title: "Obstacle Race — Junior Wing", color: "from-pink-500 to-fuchsia-600" },
  { id: "12", title: "Victory Lap — Champions", color: "from-indigo-500 to-purple-600" },
]

export default function SportsDayGalleryPage() {
  return (
    <>
      <PageHero
        title="Sports Day Gallery"
        subtitle="Athletic spirit, sportsmanship, and a celebration of physical fitness."
        breadcrumbs={[{ label: "Gallery", href: "/gallery" }, { label: "Sports Day" }]}
      />

      <section className="py-14">
        <div className="container mx-auto px-4">
          {/* Info */}
          <div className="bg-[#f0f4ff] rounded-2xl p-6 border border-[#1a3c6e]/10 mb-10 max-w-3xl mx-auto text-center">
            <div className="flex items-center justify-center gap-3 text-[#c8a951] mb-2">
              <Medal className="w-5 h-5" />
              <Trophy className="w-6 h-6" />
              <Medal className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-[#1a3c6e] text-lg">Annual Sports Day 2024</h3>
            <p className="text-sm text-gray-600 mt-1">November 15, 2024 • School Sports Ground • 600+ participants from 4 houses</p>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {sportsDayPhotos.map((photo) => (
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
