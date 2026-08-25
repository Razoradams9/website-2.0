import { PageHero } from "@/components/public/shared/page-hero"
import { CheckCircle2, Target, Eye, Heart, BookOpen, Users, Award, Building2 } from "lucide-react"

export const metadata = { title: "About Us" }

export default function AboutPage() {
  return (
    <>
      <PageHero
        title="About Our School"
        subtitle="Guru Gorakshnath Gyanasthali — a new-generation CBSE school in Siddharthnagar built on the foundation of knowledge, values, and care."
        breadcrumbs={[{ label: "About Us" }]}
      />

      {/* Our Story */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#FF9933] mb-3">
                <span className="w-8 h-0.5 bg-[#FF9933] rounded" /> Our Story
              </div>
              <h2 className="text-3xl font-black text-[#138808] mb-6">A Fresh Beginning with a <span className="text-[#FF9933]">Clear Purpose</span></h2>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>
                  Guru Gorakshnath Gyanasthali was established in 2024 in Siddharthnagar, Uttar Pradesh, with a vision to bring quality CBSE education to the community. Named after the revered saint Guru Gorakshnath, our school draws inspiration from the timeless values of discipline, knowledge, and service.
                </p>
                <p>
                  Though we are a young institution, our foundation is strong. We have assembled a team of dedicated educators, built modern infrastructure, and designed a curriculum that balances academic rigor with creative expression and physical well-being.
                </p>
                <p>
                  We believe that a school should be more than a place of study — it should be a second home where children feel safe, respected, and excited to learn. Every decision we make is guided by one question: "Is this best for our students?"
                </p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { year: "2024", event: "School Established", desc: "Doors opened with a clear mission" },
                { year: "CBSE", event: "Affiliation Granted", desc: "Affiliation No: 2134601" },
                { year: "120+", event: "Students Enrolled", desc: "Growing community of learners" },
                { year: "12+", event: "Faculty Members", desc: "Experienced & passionate teachers" },
              ].map((item) => (
                <div key={item.event} className="bg-[#f0fdf4] rounded-2xl p-5 text-center border border-[#138808]/10">
                  <p className="text-2xl font-black text-[#FF9933]">{item.year}</p>
                  <p className="font-bold text-[#138808] text-sm mt-1">{item.event}</p>
                  <p className="text-xs text-gray-500 mt-0.5">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="py-20 bg-[#f7fdf9]">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Vision */}
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
              <div className="w-14 h-14 rounded-xl bg-[#138808] flex items-center justify-center mb-5">
                <Eye className="w-7 h-7 text-[#FF9933]" />
              </div>
              <h3 className="text-2xl font-black text-[#138808] mb-4">Our Vision</h3>
              <p className="text-gray-600 leading-relaxed mb-5">
                To be a trusted centre of learning in Siddharthnagar that nurtures confident, responsible, and well-rounded individuals ready to contribute positively to society.
              </p>
              <ul className="space-y-2.5">
                {["Develop curious minds who love learning", "Build strong character rooted in Indian values", "Create a joyful and inclusive environment", "Prepare students for a bright future"].map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-sm text-gray-600">
                    <CheckCircle2 className="w-4 h-4 text-[#FF9933] mt-0.5 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Mission */}
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
              <div className="w-14 h-14 rounded-xl bg-[#FF9933] flex items-center justify-center mb-5">
                <Target className="w-7 h-7 text-[#138808]" />
              </div>
              <h3 className="text-2xl font-black text-[#138808] mb-4">Our Mission</h3>
              <p className="text-gray-600 leading-relaxed mb-5">
                To provide quality education through caring teachers, modern methods, and a safe campus — helping every child grow academically, emotionally, and socially.
              </p>
              <ul className="space-y-2.5">
                {["Follow CBSE curriculum with innovative teaching", "Focus on each child's individual growth", "Encourage sports, arts & extra-curricular activities", "Build a strong school-parent partnership"].map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-sm text-gray-600">
                    <CheckCircle2 className="w-4 h-4 text-[#138808] mt-0.5 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-widest text-[#FF9933] mb-3">
              <span className="w-8 h-0.5 bg-[#FF9933] rounded" /> Our Values <span className="w-8 h-0.5 bg-[#FF9933] rounded" />
            </div>
            <h2 className="text-3xl font-black text-[#138808]">What We <span className="text-[#FF9933]">Stand For</span></h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Heart, title: "Compassion", desc: "Kindness and empathy in every interaction", color: "bg-rose-50 text-rose-600" },
              { icon: Award, title: "Discipline", desc: "Building responsible habits from a young age", color: "bg-amber-50 text-amber-600" },
              { icon: Users, title: "Respect", desc: "For elders, peers, teachers, and oneself", color: "bg-emerald-50 text-emerald-600" },
              { icon: BookOpen, title: "Curiosity", desc: "Encouraging questions and a love for learning", color: "bg-blue-50 text-blue-600" },
            ].map((v) => {
              const Icon = v.icon
              return (
                <div key={v.title} className="text-center p-6 rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all">
                  <div className={`w-14 h-14 mx-auto rounded-xl ${v.color} flex items-center justify-center mb-4`}>
                    <Icon className="w-7 h-7" />
                  </div>
                  <h4 className="font-bold text-[#138808] text-lg mb-2">{v.title}</h4>
                  <p className="text-sm text-gray-600">{v.desc}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Infrastructure Quick Look */}
      <section className="py-20 bg-gradient-to-br from-[#138808] to-[#0a4d0a] text-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-black">Our <span className="text-[#FF9933]">Campus</span></h2>
            <p className="text-gray-300 mt-3 max-w-xl mx-auto">A modern, purpose-built campus designed for comfortable and effective learning.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { icon: Building2, label: "Modern Classrooms", sub: "Well-ventilated & spacious" },
              { icon: BookOpen, label: "Science & Computer Labs", sub: "Hands-on learning" },
              { icon: Award, label: "Play Areas & Sports Ground", sub: "For physical development" },
              { icon: Users, label: "Safe & Secure Campus", sub: "CCTV & trained staff" },
            ].map((item) => {
              const Icon = item.icon
              return (
                <div key={item.label} className="bg-white/5 border border-white/10 rounded-2xl p-6 text-center hover:bg-white/10 transition-colors">
                  <div className="w-12 h-12 mx-auto rounded-xl bg-[#FF9933]/20 flex items-center justify-center mb-3">
                    <Icon className="w-6 h-6 text-[#FF9933]" />
                  </div>
                  <p className="font-bold text-white text-sm">{item.label}</p>
                  <p className="text-xs text-gray-400 mt-1">{item.sub}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>
    </>
  )
}
