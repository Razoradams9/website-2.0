import { PageHero } from "@/components/public/shared/page-hero"
import { CheckCircle2 } from "lucide-react"

export const metadata = { title: "History & Vision" }

export default function HistoryPage() {
  return (
    <>
      <PageHero
        title="Our Story & Vision"
        subtitle="A new school with deep roots in tradition — Guru Gorakshnath Gyanasthali was born from a desire to serve the community through quality education."
        breadcrumbs={[{ label: "About Us", href: "/about" }, { label: "History & Vision" }]}
      />

      {/* Story */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-14">
              <h2 className="text-3xl font-black text-[#138808] mb-4">How It <span className="text-[#FF9933]">Began</span></h2>
            </div>

            <div className="space-y-6 text-gray-600 leading-relaxed">
              <p>
                Guru Gorakshnath Gyanasthali was established in <strong className="text-[#138808]">2024</strong> in Domariaganj, Siddharthnagar, Uttar Pradesh. The school is named in honor of <strong className="text-[#138808]">Guru Gorakshnath</strong>, the revered saint and yogi who symbolizes discipline, knowledge, and selfless service — values that form the foundation of our educational philosophy.
              </p>
              <p>
                The idea for this school grew from a simple observation: families in our community deserve access to quality CBSE education without having to send their children far from home. We set out to create an institution that combines the academic standards of top schools with the warmth and personal attention of a community-driven initiative.
              </p>
              <p>
                In our very first year, we welcomed over 120 students from Nursery to Class VIII, assembled a team of 12+ dedicated educators, and built a campus equipped with modern classrooms, labs, and play areas. The response from parents and the community has been encouraging.
              </p>
              <p>
                Though we are young, our aspirations are boundless. We are not in a rush — we are focused on building a strong foundation, one student at a time, one day at a time. Our goal is simple: to be the school that parents trust, students enjoy, and the community takes pride in.
              </p>
            </div>

            {/* Milestones */}
            <div className="mt-14 grid sm:grid-cols-3 gap-4">
              {[
                { label: "School Established", value: "2024", desc: "Doors opened with vision & purpose" },
                { label: "CBSE Affiliation", value: "Granted", desc: "Affiliation No: 2134601" },
                { label: "First Batch", value: "120+", desc: "Students enrolled in Year 1" },
              ].map((m) => (
                <div key={m.label} className="bg-[#f0fdf4] rounded-xl p-5 text-center border border-[#138808]/10">
                  <p className="text-2xl font-black text-[#FF9933]">{m.value}</p>
                  <p className="font-bold text-[#138808] text-sm mt-1">{m.label}</p>
                  <p className="text-xs text-gray-500 mt-0.5">{m.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Vision */}
      <section className="py-20 bg-gradient-to-br from-[#138808] to-[#0a4d0a] text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-black mb-6">Our <span className="text-[#FF9933]">Vision</span></h2>
            <p className="text-xl text-gray-200 italic leading-relaxed mb-10">
              "To grow into a school that the community trusts and takes pride in — a place where every child discovers their potential, builds strong values, and develops the confidence to make the world a better place."
            </p>
            <div className="grid sm:grid-cols-2 gap-4 text-left">
              {[
                "Provide accessible, quality CBSE education in Siddharthnagar",
                "Create a safe, joyful, and inclusive learning environment",
                "Nurture curiosity, creativity, and critical thinking",
                "Build character through discipline and Indian values",
                "Grow steadily while maintaining quality over quantity",
                "Strengthen the bond between school, parents, and community",
              ].map((item) => (
                <div key={item} className="flex items-start gap-3 bg-white/5 rounded-lg p-3 border border-white/10">
                  <CheckCircle2 className="w-4 h-4 text-[#FF9933] mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-gray-300">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Name Significance */}
      <section className="py-20 bg-[#f7fdf9]">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-2xl font-black text-[#138808] mb-6">Why <span className="text-[#FF9933]">"Guru Gorakshnath Gyanasthali"</span>?</h2>
            <p className="text-gray-600 leading-relaxed">
              <strong className="text-[#138808]">Guru Gorakshnath</strong> was a legendary saint, philosopher, and yogi deeply associated with Gorakhpur. He stood for discipline, knowledge, and selfless service. <strong className="text-[#138808]">"Gyanasthali"</strong> means "a place of knowledge." Together, our name reflects our aspiration — to be a sacred place of learning inspired by the timeless wisdom of Guru Gorakshnath.
            </p>
          </div>
        </div>
      </section>
    </>
  )
}
