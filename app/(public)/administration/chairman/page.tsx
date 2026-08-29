import { PageHero } from "@/components/public/shared/page-hero"
import { Quote } from "lucide-react"
import { getAdministrationData } from "@/lib/db/queries"

export const dynamic = 'force-dynamic'
export const metadata = { title: "Chairman's Message" }

export default async function ChairmanPage() {
  const data = await getAdministrationData()
  const photoUrl = data?.chairmanPhotoUrl || "/images/chairman.jpeg"

  return (
    <>
      <PageHero
        title="Chairman's Message"
        subtitle="A word from the visionary leader behind Guru Gorakshnath Gyanasthali."
        breadcrumbs={[{ label: "Administration", href: "/administration" }, { label: "Chairman's Message" }]}
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
                      alt="Shri Raghavendra Pratap Singh"
                      className="w-full h-full object-cover"
                    />
                  </div>
                ) : (
                  <div className="w-56 h-56 mx-auto rounded-2xl bg-gradient-to-br from-[#1a3c6e] to-[#0d1f3c] flex items-center justify-center shadow-xl mb-5">
                    <span className="text-[#c8a951] font-black text-6xl">RS</span>
                  </div>
                )}
                <h3 className="font-black text-[#1a3c6e] text-xl">Shri Raghavendra Pratap Singh</h3>
                <p className="text-[#c8a951] font-semibold text-sm">Chairman</p>
                <p className="text-xs text-gray-500 mt-1">Guru Gorakshnath Gyanasthali</p>
              </div>

              <div>
                <div className="relative bg-[#f8f9ff] rounded-2xl p-8 border border-gray-100">
                  <Quote className="absolute top-4 right-4 w-12 h-12 text-[#1a3c6e]/5" />
                  <div className="space-y-4 text-gray-700 leading-relaxed relative z-10">
                    <p>Dear Parents and Members of our School Community,</p>
                    <p>
                      Namaste. It is with great pride and a deep sense of purpose that I welcome you to Guru Gorakshnath Gyanasthali. This school was born from a belief that every child in our community deserves access to quality education in a caring and disciplined environment.
                    </p>
                    <p>
                      The name of our school is inspired by the great Guru Gorakshnath, whose teachings of discipline, perseverance, and selfless service continue to guide millions. We carry this legacy forward by dedicating ourselves to building an institution that serves the community with sincerity and excellence.
                    </p>
                    <p>
                      As a school established in 2024, we bring fresh energy, modern thinking, and an unwavering commitment to doing things right from the very beginning. We have carefully chosen dedicated teachers, built a safe and modern campus, and adopted the CBSE curriculum to give our students the best possible foundation.
                    </p>
                    <p>
                      My promise to every parent is this: your child will be treated with respect, given individual attention, and provided with every opportunity to grow. We are building this school not just for today, but for generations to come.
                    </p>
                    <p>
                      I invite you to be part of this journey. Together, we will create something truly meaningful for our children and our community.
                    </p>
                    <p className="font-semibold text-[#1a3c6e] pt-4">
                      With warm regards,<br />
                      Shri Raghavendra Pratap Singh<br />
                      <span className="text-sm font-normal text-gray-500">Chairman, Guru Gorakshnath Gyanasthali</span>
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
