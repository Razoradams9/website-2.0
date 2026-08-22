import { PageHero } from "@/components/public/shared/page-hero"

export const metadata = { title: "Classes & Subjects" }

const classData = [
  {
    level: "Pre-Primary",
    classes: "Nursery, LKG, UKG",
    age: "3 – 6 years",
    color: "from-pink-500 to-rose-600",
    icon: "🌸",
    subjects: [
      "English (alphabet, phonics, simple words)",
      "Hindi (वर्णमाला, मात्राएं, simple words)",
      "Mathematics (counting, shapes, basic addition)",
      "General Knowledge & Awareness",
      "Drawing & Colouring",
      "Rhymes & Storytelling",
      "Physical Activities & Free Play",
    ],
  },
  {
    level: "Primary",
    classes: "Class I – V",
    age: "6 – 11 years",
    color: "from-orange-500 to-amber-600",
    icon: "📚",
    subjects: [
      "English (reading, writing, grammar, comprehension)",
      "Hindi (पाठ, व्याकरण, लेखन)",
      "Mathematics (arithmetic, geometry, word problems)",
      "Environmental Studies / Science",
      "Social Studies (Class IV–V)",
      "Computer Science (basics, MS Paint, typing)",
      "Art & Craft",
      "Music & Dance",
      "Physical Education & Games",
      "Moral Science / Value Education",
    ],
  },
  {
    level: "Middle School",
    classes: "Class VI – VIII",
    age: "11 – 14 years",
    color: "from-blue-500 to-indigo-600",
    icon: "🔬",
    subjects: [
      "English (literature, grammar, writing skills)",
      "Hindi (साहित्य, व्याकरण, निबंध)",
      "Mathematics (algebra, geometry, data handling)",
      "Science (Physics, Chemistry, Biology basics)",
      "Social Science (History, Geography, Civics)",
      "Sanskrit / Computer Science (optional)",
      "Art Education",
      "Physical Education & Sports",
      "Work Education / Life Skills",
    ],
  },
  {
    level: "Secondary",
    classes: "Class IX – X",
    age: "14 – 16 years",
    color: "from-violet-500 to-purple-600",
    icon: "🎯",
    subjects: [
      "English (Language & Literature)",
      "Hindi (Course A / Course B)",
      "Mathematics",
      "Science (Physics, Chemistry, Biology)",
      "Social Science (History, Geography, Political Science, Economics)",
      "Information Technology / Computer Applications (Skill Subject)",
      "Art Education",
      "Physical Education & Health",
    ],
  },
]

export default function ClassesPage() {
  return (
    <>
      <PageHero
        title="Classes & Subjects"
        subtitle="A detailed look at what we teach at each level — from Nursery to Class X."
        breadcrumbs={[{ label: "Academics", href: "/academics" }, { label: "Classes & Subjects" }]}
      />

      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto space-y-10">
            {classData.map((level) => (
              <div key={level.level} className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                {/* Header */}
                <div className={`bg-gradient-to-r ${level.color} p-5 text-white`}>
                  <div className="flex items-center gap-3">
                    <span className="text-3xl">{level.icon}</span>
                    <div>
                      <h3 className="font-black text-xl">{level.level}</h3>
                      <p className="text-white/80 text-sm">{level.classes} • Age: {level.age}</p>
                    </div>
                  </div>
                </div>
                {/* Subjects */}
                <div className="p-6">
                  <h4 className="font-bold text-[#138808] text-sm mb-3 uppercase tracking-wide">Subjects Taught</h4>
                  <div className="grid sm:grid-cols-2 gap-2">
                    {level.subjects.map((subject) => (
                      <div key={subject} className="flex items-start gap-2 text-sm text-gray-700">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#FF9933] mt-2 flex-shrink-0" />
                        {subject}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Note */}
          <div className="max-w-4xl mx-auto mt-10">
            <div className="bg-[#f0fdf4] rounded-xl p-5 border border-[#138808]/10 text-center">
              <p className="text-sm text-gray-600">
                <strong className="text-[#138808]">Note:</strong> Subjects and syllabus follow CBSE/NCERT guidelines and may be updated as per board instructions. The school currently offers classes from Nursery to Class VIII and will progressively add higher classes in upcoming sessions.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
