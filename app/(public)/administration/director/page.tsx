import { PageHero } from "@/components/public/shared/page-hero"
import { Quote } from "lucide-react"
import { getAdministrationData } from "@/lib/db/queries"

export const metadata = { title: "Director's Message — Pradeep Kumar Singh" }

export default async function DirectorPage() {
  const data = await getAdministrationData()
  const photoUrl = data?.director1PhotoUrl

  return (
    <>
      <PageHero
        title="Director's Message"
        subtitle="From Shri Pradeep Kumar Singh — on building a school with heart and purpose."
        breadcrumbs={[{ label: "Administration", href: "/administration" }, { label: "Director — Pradeep Kumar Singh" }]}
      />

      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-[280px_1fr] gap-10 items-start">
              <div className="text-center">
                {photoUrl ? (
                  <div className="w-56 h-56 mx-auto rounded-2xl overflow-hidden shadow-xl mb-5">
                    <img
                      src={photoUrl}
                      alt="Shri Pradeep Kumar Singh"
                      className="w-full h-full object-cover"
                    />
                  </div>
                ) : (
                  <div className="w-56 h-56 mx-auto rounded-2xl bg-gradient-to-br from-[#1a3c6e] to-[#0d1f3c] flex items-center justify-center shadow-xl mb-5">
                    <span className="text-[#c8a951] font-black text-6xl">PS</span>
                  </div>
                )}
                <h3 className="font-black text-[#1a3c6e] text-xl">Shri Pradeep Kumar Singh</h3>
                <p className="text-[#c8a951] font-semibold text-sm">Director</p>
                <p className="text-xs text-gray-500 mt-1">Guru Gorakshnath Gyanasthali</p>
              </div>

              <div>
                <div className="relative bg-[#f8f9ff] rounded-2xl p-8 border border-gray-100">
                  <Quote className="absolute top-4 right-4 w-12 h-12 text-[#1a3c6e]/5" />
                  <div className="space-y-4 text-gray-700 leading-relaxed relative z-10">
                    <p>Dear Parents and Students,</p>
                    <p>
                      When we set out to build Guru Gorakshnath Gyanasthali, we asked ourselves a simple question: what kind of school would we want for our own children? The answer guided every decision — from hiring the right teachers to designing the classrooms to choosing the curriculum.
                    </p>
                    <p>
                      I believe strongly in open communication. If you have a concern, a suggestion, or simply want to know how your child is doing — our doors are always open. A school grows stronger when parents and teachers work as a team.
                    </p>
                    <p>
                      We are a CBSE-affiliated school, which means our students follow the nationally recognized curriculum. But beyond academics, we place equal importance on discipline, manners, physical health, and emotional well-being. A child who is happy and confident will naturally do well in studies.
                    </p>
                    <p>
                      We are just getting started, and every day we learn, improve, and grow — just like our students. I am grateful for the trust that families have placed in us, and I assure you that we will work sincerely to honour it.
                    </p>
                    <p className="font-semibold text-[#1a3c6e] pt-4">
                      With best wishes,<br />
                      Shri Pradeep Kumar Singh<br />
                      <span className="text-sm font-normal text-gray-500">Director, Guru Gorakshnath Gyanasthali</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
