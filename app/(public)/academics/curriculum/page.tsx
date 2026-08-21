import { PageHero } from "@/components/public/shared/page-hero"
import { CheckCircle2, BookOpen, Lightbulb, Award, Users } from "lucide-react"

export const metadata = { title: "Curriculum" }

export default function CurriculumPage() {
  return (
    <>
      <PageHero
        title="Our Curriculum"
        subtitle="CBSE-prescribed NCERT curriculum delivered through modern, child-friendly teaching methods."
        breadcrumbs={[{ label: "Academics", href: "/academics" }, { label: "Curriculum" }]}
      />

      {/* Overview */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-black text-[#1a3c6e] mb-6">CBSE <span className="text-[#c8a951]">Framework</span></h2>
            <p className="text-gray-600 leading-relaxed mb-6">
              Guru Gorakshnath Gyanasthali follows the curriculum prescribed by the Central Board of Secondary Education (CBSE), New Delhi. All subjects are taught using NCERT textbooks, supplemented with additional resources where needed to strengthen understanding.
            </p>
            <p className="text-gray-600 leading-relaxed mb-8">
              Our approach goes beyond textbook learning. We believe children learn best when they understand concepts rather than memorize them. Teachers use activities, visual aids, stories, and real-life examples to make lessons come alive.
            </p>

            <div className="space-y-3 mb-10">
              {[
                "Complete adherence to CBSE syllabus and guidelines",
                "NCERT textbooks for all subjects across all classes",
                "Focus on understanding concepts, not rote learning",
                "Regular revision and practice through worksheets",
                "Integrated value education and moral science",
                "Environmental awareness as part of daily learning",
                "Hindi and English as medium of instruction (bilingual approach)",
                "Computer education introduced from Class I",
                "Art, music, and physical education are compulsory",
                "Continuous and Comprehensive Evaluation (CCE) pattern followed",
              ].map((item) => (
                <div key={item} className="flex items-start gap-3 text-sm text-gray-700">
                  <CheckCircle2 className="w-4 h-4 text-[#c8a951] mt-0.5 flex-shrink-0" />
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Teaching Methodology */}
      <section className="py-20 bg-[#f8f9ff]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-black text-[#1a3c6e]">How We <span className="text-[#c8a951]">Teach</span></h2>
            <p className="text-gray-600 mt-3 max-w-xl mx-auto">Our teachers are trained to make every lesson engaging and meaningful for children of all ages.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {[
              { icon: Lightbulb, title: "Learn by Doing", desc: "Activities, experiments, and hands-on projects make abstract concepts easy to grasp." },
              { icon: Users, title: "Individual Attention", desc: "Small class sizes allow teachers to address each child's strengths and weaknesses." },
              { icon: BookOpen, title: "Regular Practice", desc: "Daily homework, weekly tests, and revision ensure concepts are retained long-term." },
              { icon: Award, title: "Positive Reinforcement", desc: "We praise effort, celebrate improvement, and build confidence through encouragement." },
            ].map((item) => {
              const Icon = item.icon
              return (
                <div key={item.title} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm text-center">
                  <div className="w-12 h-12 mx-auto rounded-xl bg-[#1a3c6e]/10 flex items-center justify-center mb-3">
                    <Icon className="w-6 h-6 text-[#1a3c6e]" />
                  </div>
                  <h4 className="font-bold text-[#1a3c6e] text-sm mb-2">{item.title}</h4>
                  <p className="text-xs text-gray-600 leading-relaxed">{item.desc}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Language Policy */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-black text-[#1a3c6e] mb-6">Medium of <span className="text-[#c8a951]">Instruction</span></h2>
            <div className="bg-[#f0f4ff] rounded-xl p-6 border border-[#1a3c6e]/10">
              <p className="text-gray-600 text-sm leading-relaxed">
                The primary medium of instruction is <strong className="text-[#1a3c6e]">English</strong>, with <strong className="text-[#1a3c6e]">Hindi</strong> used to support understanding where needed, especially in junior classes. We believe a bilingual approach helps children from diverse backgrounds feel comfortable while gradually building English proficiency. From Class VI onwards, English is the primary language for all subjects except Hindi and Sanskrit.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
