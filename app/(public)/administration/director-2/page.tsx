import { PageHero } from "@/components/public/shared/page-hero"
import { Quote } from "lucide-react"
import { getAdministrationData } from "@/lib/db/queries"

export const dynamic = 'force-dynamic'
export const metadata = { title: "Director's Message — Praveen Pandey" }

export default async function Director2Page() {
  const data = await getAdministrationData()
  const photoUrl = data?.director2PhotoUrl

  return (
    <>
      <PageHero
        title="Director's Message"
        subtitle="From Shri Praveen Pandey — on nurturing the leaders of tomorrow."
        breadcrumbs={[{ label: "Administration", href: "/administration" }, { label: "Director — Praveen Pandey" }]}
      />

      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8 sm:p-10">
              {/* Photo above the message */}
              <div className="text-center mb-8">
                {photoUrl ? (
                  <div className="w-56 h-56 mx-auto rounded-2xl overflow-hidden shadow-lg mb-5">
                    <img
                      src={photoUrl}
                      alt="Shri Praveen Pandey"
                      className="w-full h-full object-cover"
                    />
                  </div>
                ) : (
                  <div className="w-56 h-56 mx-auto rounded-2xl bg-gradient-to-br from-[#1a3c6e] to-[#0d1f3c] flex items-center justify-center shadow-lg mb-5">
                    <span className="text-[#c8a951] font-black text-6xl">PP</span>
                  </div>
                )}
                <h3 className="font-black text-[#1a3c6e] text-xl">Shri Praveen Pandey</h3>
                <p className="text-[#c8a951] font-semibold text-sm">Director</p>
                <p className="text-xs text-gray-500 mt-1">Guru Gorakshnath Gyanasthali</p>
              </div>

              {/* Message */}
              <div className="relative border-t border-gray-100 pt-8">
                <Quote className="absolute top-6 right-0 w-12 h-12 text-[#1a3c6e]/5" />
                <div className="space-y-4 text-gray-700 leading-relaxed relative z-10">
                    <p>Dear Parents and Well-wishers,</p>
                    <p>
                      It gives me great joy to be part of Guru Gorakshnath Gyanasthali. Education has the power to transform lives, and I consider it a privilege to contribute to this noble cause in our community.
                    </p>
                    <p>
                      My focus has always been on ensuring that our school remains a place where children feel safe, respected, and motivated. Every child learns differently, and our teachers are trained to recognize and support each student's unique way of learning.
                    </p>
                    <p>
                      Beyond academics, we emphasize values that will serve our students throughout their lives — honesty, hard work, respect for elders, and kindness towards others. These are the qualities that make a truly educated person, not just marks on a report card.
                    </p>
                    <p>
                      I encourage every parent to stay connected with the school. Ask your children about their day, attend parent-teacher meetings, and share your feedback with us. Together, we can give our children the strong foundation they deserve.
                    </p>
                    <p>
                      The journey has just begun, and the best is yet to come.
                    </p>
                    <p className="font-semibold text-[#1a3c6e] pt-4">
                      With warm wishes,<br />
                      Shri Praveen Pandey<br />
                      <span className="text-sm font-normal text-gray-500">Director, Guru Gorakshnath Gyanasthali</span>
                    </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
