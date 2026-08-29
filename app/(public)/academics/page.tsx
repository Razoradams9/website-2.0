import { PageHero } from "@/components/public/shared/page-hero"
import { BookOpen, GraduationCap, CheckCircle2, Palette, Dumbbell, Brain, Lightbulb, Users, Award, Heart } from "lucide-react"

export const metadata = { title: "Academics" }

export default function AcademicsPage() {
  return (
    <>
      <PageHero
        title="Academics"
        subtitle="CBSE curriculum delivered with care, creativity, and a focus on building strong foundations."
        breadcrumbs={[{ label: "Academics" }]}
      />

      {/* Curriculum Overview */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#FF9933] mb-3">
                <span className="w-8 h-0.5 bg-[#FF9933] rounded" /> Our Curriculum
              </div>
              <h2 className="text-3xl font-black text-[#1e40af] mb-6">CBSE <span className="text-[#FF9933]">Curriculum</span></h2>
              <p className="text-gray-600 leading-relaxed mb-6">
                We follow the CBSE (Central Board of Secondary Education) curriculum using NCERT textbooks. Our teaching approach focuses on conceptual clarity, practical application, and developing a genuine interest in learning rather than rote memorization.
              </p>
              <div className="space-y-3">
                {[
                  "NCERT textbooks for all core subjects",
                  "Activity-based and experiential learning methods",
                  "Regular class tests, projects, and assessments",
                  "Special attention to weak students through remedial classes",
                  "Spoken English and personality development sessions",
                  "Value education and moral science integrated into daily routine",
                  "Computer education from primary level onwards",
                  "Art, craft, music, and dance as part of the curriculum",
                ].map((item) => (
                  <div key={item} className="flex items-start gap-3 text-sm text-gray-700">
                    <CheckCircle2 className="w-4 h-4 text-[#FF9933] mt-0.5 flex-shrink-0" />
                    {item}
                  </div>
                ))}
              </div>
            </div>

            {/* Classes offered */}
            <div className="space-y-4">
              <h3 className="font-bold text-[#1e40af] text-lg mb-4">Classes & Subjects</h3>
              {[
                { level: "Pre-Primary (Nursery, LKG, UKG)", subjects: "English, Hindi, Mathematics, Drawing, Rhymes, GK, Storytelling, Physical Activities", approach: "Play-based learning with activity worksheets" },
                { level: "Primary (Class I – V)", subjects: "English, Hindi, Mathematics, EVS/Science, Social Studies, Computer, Art, Music, Physical Education", approach: "Concept-based teaching with regular practice" },
                { level: "Middle School (Class VI – VIII)", subjects: "English, Hindi, Mathematics, Science, Social Science, Sanskrit/Computer, Art, PE", approach: "Subject-specialist teachers, project work, lab practicals" },
                { level: "Secondary (Class IX – X)", subjects: "English, Hindi, Mathematics, Science (Physics, Chemistry, Biology), Social Science, Computer/IT", approach: "Board-oriented preparation with regular mock tests" },
              ].map((item) => (
                <div key={item.level} className="bg-[#eff6ff] rounded-xl p-5 border border-[#1e40af]/10 hover:shadow-md transition-shadow">
                  <h4 className="font-bold text-[#1e40af] mb-1 text-sm">{item.level}</h4>
                  <p className="text-xs text-gray-600 mb-2">{item.subjects}</p>
                  <p className="text-xs text-[#FF9933] font-semibold">{item.approach}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Teaching Methodology */}
      <section className="py-20 bg-[#f5f9ff]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-black text-[#1e40af]">Our Teaching <span className="text-[#FF9933]">Approach</span></h2>
            <p className="text-gray-600 mt-3 max-w-xl mx-auto">We don't just teach — we make sure every child truly understands and enjoys learning.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[
              { icon: Lightbulb, title: "Conceptual Learning", desc: "We focus on understanding 'why' and 'how', not just memorizing answers. Students learn to think, not just repeat.", color: "bg-amber-50 text-amber-600" },
              { icon: Users, title: "Small Class Sizes", desc: "Limited students per section ensures every child gets personal attention from the teacher.", color: "bg-blue-50 text-blue-600" },
              { icon: BookOpen, title: "Regular Assessments", desc: "Weekly tests, monthly exams, and project work help track each student's progress continuously.", color: "bg-purple-50 text-purple-600" },
              { icon: Heart, title: "Caring Environment", desc: "Teachers know every student by name. We build relationships first, then academics follow naturally.", color: "bg-rose-50 text-rose-600" },
              { icon: Award, title: "Recognition & Motivation", desc: "We celebrate effort, not just marks. Star of the week, monthly awards, and appreciation in assembly.", color: "bg-emerald-50 text-emerald-600" },
              { icon: GraduationCap, title: "Parent Involvement", desc: "Regular PTMs, progress reports, and open communication keep parents informed and involved.", color: "bg-cyan-50 text-cyan-600" },
            ].map((item) => {
              const Icon = item.icon
              return (
                <div key={item.title} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                  <div className={`w-12 h-12 rounded-xl ${item.color} flex items-center justify-center mb-4`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-bold text-[#1e40af] text-base mb-2">{item.title}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{item.desc}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Beyond Academics */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-black text-[#1e40af]">Beyond <span className="text-[#FF9933]">Textbooks</span></h2>
            <p className="text-gray-600 mt-3 max-w-xl mx-auto">Education is more than exams. Here's what else our students experience every week.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {[
              { icon: Palette, title: "Art & Craft", desc: "Drawing, painting, clay modeling, and creative projects" },
              { icon: Dumbbell, title: "Sports & Yoga", desc: "Daily PT period, yoga, and outdoor games" },
              { icon: Brain, title: "Life Skills", desc: "Communication, hygiene, teamwork, and basic safety" },
              { icon: BookOpen, title: "Library Hour", desc: "Weekly reading time to build knowledge and vocabulary" },
            ].map((item) => {
              const Icon = item.icon
              return (
                <div key={item.title} className="bg-[#eff6ff] rounded-2xl p-5 border border-[#1e40af]/10 text-center hover:shadow-md transition-shadow">
                  <div className="w-12 h-12 mx-auto rounded-xl bg-[#1e40af]/10 flex items-center justify-center mb-3">
                    <Icon className="w-6 h-6 text-[#1e40af]" />
                  </div>
                  <h4 className="font-bold text-[#1e40af] text-sm mb-1">{item.title}</h4>
                  <p className="text-xs text-gray-600">{item.desc}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Co-curricular & Activities */}
      <section className="py-20 bg-gradient-to-br from-[#1e40af] to-[#1e3a8a] text-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-black">Co-Curricular <span className="text-[#FF9933]">Activities</span></h2>
            <p className="text-gray-300 mt-3 max-w-xl mx-auto">We encourage students to explore their interests beyond the classroom through a variety of activities.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
            {[
              "Morning Assembly & Prayers",
              "Republic Day & Independence Day Celebrations",
              "Annual Sports Day",
              "Annual Day & Cultural Program",
              "Science & Maths Quiz Competitions",
              "Drawing & Essay Competitions",
              "Hindi Diwas & Teachers' Day",
              "Environment Day — Plantation Drives",
              "Inter-class Debate & Speech Competitions",
              "Festival Celebrations (Diwali, Holi, Eid, Christmas)",
              "Educational Field Trips",
              "Yoga Day Celebration",
            ].map((activity) => (
              <div key={activity} className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-lg p-3">
                <CheckCircle2 className="w-4 h-4 text-[#FF9933] flex-shrink-0" />
                <span className="text-sm text-gray-200">{activity}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Assessment Pattern */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-black text-[#1e40af]">Assessment <span className="text-[#FF9933]">Pattern</span></h2>
              <p className="text-gray-600 mt-3">We follow a continuous evaluation approach as per CBSE guidelines.</p>
            </div>

            <div className="space-y-4">
              {[
                { title: "Weekly Class Tests", desc: "Short tests every week to check understanding of recent topics. Helps identify and address gaps early.", freq: "Every Week" },
                { title: "Monthly Assessment", desc: "One written test per month covering the month's syllabus. Marks are shared with parents.", freq: "Monthly" },
                { title: "Half-Yearly Examination", desc: "Comprehensive exam in September/October covering the first half of the syllabus.", freq: "September" },
                { title: "Annual Examination", desc: "Final exam in March covering the full year's curriculum. Report card issued after results.", freq: "March" },
                { title: "Projects & Practicals", desc: "Hands-on projects, science practicals, and art portfolios are evaluated as part of overall grades.", freq: "Ongoing" },
              ].map((item) => (
                <div key={item.title} className="flex gap-4 p-5 bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex-shrink-0 w-16 text-center">
                    <span className="text-[10px] font-bold text-[#FF9933] bg-[#FF9933]/10 px-2 py-1 rounded">{item.freq}</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-[#1e40af] text-sm">{item.title}</h4>
                    <p className="text-xs text-gray-600 mt-1 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 bg-[#eff6ff] rounded-xl p-5 border border-[#1e40af]/10 text-center">
              <p className="text-sm text-gray-600">
                <strong className="text-[#1e40af]">Note:</strong> We believe in continuous improvement, not pressure. Every child is encouraged to do their personal best. Report cards reflect effort, behaviour, and participation alongside marks.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
