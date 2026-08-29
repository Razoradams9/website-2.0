import { PageHero } from "@/components/public/shared/page-hero"
import { Building2, FlaskConical, Library, Wifi, Dumbbell, Bus, Shield, Music, Monitor, TreePine } from "lucide-react"
import { cn } from "@/lib/utils"

export const metadata = { title: "Infrastructure" }

const facilities = [
  { icon: Building2, title: "Spacious Classrooms", desc: "Well-ventilated, naturally lit classrooms with comfortable seating, designed for effective teaching and focused learning.", color: "bg-blue-50 text-blue-600" },
  { icon: Monitor, title: "Smart Classrooms", desc: "Select classrooms equipped with digital boards and projectors to make lessons more interactive and engaging.", color: "bg-purple-50 text-purple-600" },
  { icon: FlaskConical, title: "Science Laboratory", desc: "A well-equipped science lab where students perform experiments and develop a hands-on understanding of concepts.", color: "bg-emerald-50 text-emerald-600" },
  { icon: Monitor, title: "Computer Lab", desc: "Modern computer lab with internet access, giving students early exposure to digital literacy and basic programming.", color: "bg-cyan-50 text-cyan-600" },
  { icon: Library, title: "Library", desc: "A growing collection of textbooks, storybooks, reference material, and newspapers to encourage a reading habit.", color: "bg-amber-50 text-amber-600" },
  { icon: Dumbbell, title: "Sports Area", desc: "Outdoor play area for cricket, football, and athletics. Indoor games like chess and carrom are also available.", color: "bg-rose-50 text-rose-600" },
  { icon: Music, title: "Activity Room", desc: "A dedicated space for music, dance, art & craft activities — letting students explore their creative side.", color: "bg-pink-50 text-pink-600" },
  { icon: Bus, title: "Transport Facility", desc: "School buses covering major areas of Gorakhpur. GPS-tracked for safety with trained drivers and attendants.", color: "bg-orange-50 text-orange-600" },
  { icon: Shield, title: "Safety & Security", desc: "CCTV cameras, boundary walls, security guards, fire extinguishers, and a first-aid room ensure student safety at all times.", color: "bg-red-50 text-red-600" },
  { icon: TreePine, title: "Green Surroundings", desc: "Trees, plants, and a small garden on campus provide a peaceful, healthy environment for children.", color: "bg-green-50 text-green-600" },
]

export default function InfrastructurePage() {
  return (
    <>
      <PageHero
        title="Our Infrastructure"
        subtitle="A modern, purpose-built campus providing everything students need to learn and grow in a safe environment."
        breadcrumbs={[{ label: "About Us", href: "/about" }, { label: "Infrastructure" }]}
      />

      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-black text-[#1e40af]">Facilities & <span className="text-[#FF9933]">Amenities</span></h2>
            <p className="text-gray-600 mt-3 max-w-xl mx-auto">Our campus is designed to support every aspect of a child's development — academic, physical, and creative.</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {facilities.map((f) => {
              const Icon = f.icon
              return (
                <div key={f.title} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group">
                  <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center mb-4", f.color)}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-bold text-[#1e40af] text-base mb-2 group-hover:text-[#FF9933] transition-colors">{f.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{f.desc}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Note */}
      <section className="py-12 bg-[#f5f9ff]">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-500 text-sm max-w-xl mx-auto">
            As a school established in 2024, we are continuously improving and expanding our facilities. Our goal is to provide the best possible learning environment for our students.
          </p>
        </div>
      </section>
    </>
  )
}
