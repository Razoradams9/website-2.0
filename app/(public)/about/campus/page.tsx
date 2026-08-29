import { PageHero } from "@/components/public/shared/page-hero"
import { MapPin, TreePine, Sun, Shield } from "lucide-react"

export const metadata = { title: "Campus & Facilities" }

const campusAreas = [
  { title: "Academic Block", desc: "Our main building houses well-lit classrooms, the science lab, computer lab, and the principal's office. Wide corridors and clean washrooms on every floor.", color: "from-blue-500 to-indigo-600" },
  { title: "Play Ground", desc: "An open ground for outdoor sports and physical education. Students play cricket, football, kho-kho, and participate in athletics here.", color: "from-emerald-500 to-teal-600" },
  { title: "Activity & Assembly Area", desc: "A covered area for morning assemblies, cultural events, and indoor activities. Used for Annual Day, Republic Day, and parent meetings.", color: "from-amber-500 to-orange-600" },
  { title: "Library Corner", desc: "A quiet reading space with a growing collection of books for all age groups. Students can borrow books and develop a love for reading.", color: "from-purple-500 to-violet-600" },
  { title: "Garden & Green Space", desc: "Plants, trees, and a small garden maintained by students. Teaches responsibility and connects children with nature.", color: "from-green-500 to-lime-600" },
  { title: "Transport Parking", desc: "Organized pickup and drop zone for school buses. Parents can also safely drop and collect children from the designated area.", color: "from-slate-500 to-gray-600" },
]

export default function CampusPage() {
  return (
    <>
      <PageHero
        title="Our Campus"
        subtitle="A clean, safe, and welcoming campus where children feel at home while they learn."
        breadcrumbs={[{ label: "About Us", href: "/about" }, { label: "Campus" }]}
      />

      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-14">
            <h2 className="text-3xl font-black text-[#1e40af] mb-4">Explore Our <span className="text-[#FF9933]">Campus</span></h2>
            <p className="text-gray-600 leading-relaxed">
              Located in Domariaganj, Siddharthnagar, our campus is designed with children in mind — spacious, safe, and filled with natural light and greenery. Every corner encourages learning, play, and personal growth.
            </p>
          </div>

          {/* Campus Areas */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {campusAreas.map((area) => (
              <div key={area.title} className="group relative overflow-hidden rounded-2xl cursor-default min-h-[200px]">
                <div className={`absolute inset-0 bg-gradient-to-br ${area.color} opacity-90`} />
                <div className="relative p-6 text-white h-full flex flex-col justify-end">
                  <h3 className="font-black text-lg mb-2">{area.title}</h3>
                  <p className="text-white/80 text-sm leading-relaxed">{area.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Campus Highlights */}
      <section className="py-20 bg-[#f5f9ff]">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-2xl font-black text-[#1e40af]">Campus <span className="text-[#FF9933]">Highlights</span></h2>
            </div>
            <div className="grid sm:grid-cols-2 gap-6">
              {[
                { icon: Shield, title: "Safe Environment", desc: "CCTV cameras, boundary walls, fire safety equipment, and a strict visitor entry system ensure complete safety." },
                { icon: Sun, title: "Natural Light & Ventilation", desc: "All classrooms have large windows providing fresh air and natural light — reducing the need for artificial lighting." },
                { icon: MapPin, title: "Convenient Location", desc: "Located in Deoria (Vrindavan), Domariaganj — easily accessible from surrounding villages and towns." },
                { icon: TreePine, title: "Clean & Green", desc: "Regular cleaning, dustbins on every floor, and a no-litter policy. Students learn cleanliness as a daily value." },
              ].map((item) => {
                const Icon = item.icon
                return (
                  <div key={item.title} className="flex gap-4 p-5 bg-white rounded-xl border border-gray-100 shadow-sm">
                    <div className="w-11 h-11 rounded-lg bg-[#1e40af]/10 flex items-center justify-center flex-shrink-0">
                      <Icon className="w-5 h-5 text-[#1e40af]" />
                    </div>
                    <div>
                      <h4 className="font-bold text-[#1e40af] text-sm mb-1">{item.title}</h4>
                      <p className="text-xs text-gray-600 leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
