import { PageHero } from "@/components/public/shared/page-hero"
import { Target, Heart, BookOpen, Users, Award, Lightbulb } from "lucide-react"

export const metadata = { title: "Mission & Objectives" }

export default function MissionPage() {
  return (
    <>
      <PageHero
        title="Mission & Objectives"
        subtitle="What drives us every day — a commitment to shaping confident, kind, and capable young minds."
        breadcrumbs={[{ label: "About Us", href: "/about" }, { label: "Mission & Objectives" }]}
      />

      {/* Mission */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <div className="w-16 h-16 mx-auto rounded-2xl bg-[#FF9933] flex items-center justify-center mb-6">
              <Target className="w-8 h-8 text-[#1e40af]" />
            </div>
            <h2 className="text-3xl font-black text-[#1e40af] mb-4">Our <span className="text-[#FF9933]">Mission</span></h2>
            <p className="text-lg text-gray-700 italic leading-relaxed">
              "To provide a nurturing and stimulating environment where every child receives quality education, develops strong values, and grows into a confident, compassionate individual ready to contribute to society."
            </p>
          </div>
        </div>
      </section>

      {/* Objectives */}
      <section className="py-20 bg-[#f5f9ff]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-black text-[#1e40af]">Our <span className="text-[#FF9933]">Objectives</span></h2>
            <p className="text-gray-600 mt-3 max-w-xl mx-auto">Everything we do is guided by these core objectives.</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[
              { icon: BookOpen, title: "Quality Education", desc: "Deliver the CBSE curriculum effectively through trained teachers and modern teaching methods that make learning engaging.", color: "bg-blue-50 text-blue-600" },
              { icon: Heart, title: "Character Building", desc: "Instill values of honesty, kindness, discipline, and respect through daily practices and personal example.", color: "bg-rose-50 text-rose-600" },
              { icon: Lightbulb, title: "Holistic Growth", desc: "Develop the intellectual, physical, emotional, and creative abilities of every child through a balanced approach.", color: "bg-amber-50 text-amber-600" },
              { icon: Users, title: "Inclusive Environment", desc: "Welcome every child regardless of background, and ensure each student feels safe, respected, and valued.", color: "bg-emerald-50 text-emerald-600" },
              { icon: Award, title: "Student Well-being", desc: "Prioritize the physical and emotional health of students. A happy child learns better.", color: "bg-purple-50 text-purple-600" },
              { icon: Target, title: "Community Trust", desc: "Build and maintain the trust of parents and the community through transparency, communication, and results.", color: "bg-cyan-50 text-cyan-600" },
            ].map((obj) => {
              const Icon = obj.icon
              return (
                <div key={obj.title} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                  <div className={`w-12 h-12 rounded-xl ${obj.color} flex items-center justify-center mb-4`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-bold text-[#1e40af] text-base mb-2">{obj.title}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{obj.desc}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Motto */}
      <section className="py-16 bg-gradient-to-r from-[#1e40af] to-[#1e3a8a] text-white text-center">
        <div className="container mx-auto px-4">
          <p className="text-sm text-[#FF9933] font-bold uppercase tracking-widest mb-3">Our Motto</p>
          <h3 className="text-3xl sm:text-4xl font-black italic">"ज्ञानं परम् बलम्"</h3>
          <p className="text-gray-300 mt-3 max-w-lg mx-auto text-base">Knowledge is the Greatest Strength</p>
          <p className="text-gray-400 mt-2 text-sm max-w-lg mx-auto">Inspired by the teachings of Guru Gorakshnath, this motto reminds us that true strength comes from wisdom, discipline, and continuous learning.</p>
        </div>
      </section>
    </>
  )
}
