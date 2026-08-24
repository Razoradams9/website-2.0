import { PageHero } from "@/components/public/shared/page-hero"
import { Quote } from "lucide-react"
import { getAdministrationData } from "@/lib/db/queries"

export const dynamic = 'force-dynamic'
export const metadata = { title: "Principal's Message — Girish Nair Rishi" }

export default async function PrincipalPage() {
  const data = await getAdministrationData()
  const photoUrl = data?.principalPhotoUrl

  return (
    <>
      <PageHero
        title="Principal's Message"
        subtitle="From Shri Girish Nair Rishi — nurturing minds and building futures."
        breadcrumbs={[{ label: "Administration", href: "/administration" }, { label: "Principal's Message" }]}
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
                      alt="Shri Girish Nair Rishi"
                      className="w-full h-full object-cover"
                    />
                  </div>
                ) : (
                  <div className="w-56 h-56 mx-auto rounded-2xl bg-gradient-to-br from-[#1a3c6e] to-[#0d1f3c] flex items-center justify-center shadow-xl mb-5">
                    <span className="text-[#c8a951] font-black text-6xl">GR</span>
                  </div>
                )}
                <h3 className="font-black text-[#1a3c6e] text-xl">Shri Girish Nair Rishi</h3>
                <p className="text-[#c8a951] font-semibold text-sm">Principal</p>
                <p className="text-xs text-gray-500 mt-1">Guru Gorakshnath Gyanasthali</p>
              </div>

              <div>
                <div className="relative bg-[#f8f9ff] rounded-2xl p-8 border border-gray-100">
                  <Quote className="absolute top-4 right-4 w-12 h-12 text-[#1a3c6e]/5" />
                  <div className="space-y-4 text-gray-700 leading-relaxed relative z-10">
                    <p>Dear Students, Parents and Well-Wishers,</p>
                    <p>
                      It is my privilege to serve as the Principal of Guru Gorakshnath Gyanasthali. Education is not merely about textbooks and examinations — it is about shaping character, building confidence, and preparing young minds for the challenges of tomorrow.
                    </p>
                    <p>
                      At our school, we believe every child is unique and carries within them the potential to achieve great things. Our role as educators is to create an environment where curiosity is encouraged, discipline is valued, and compassion is practised daily.
                    </p>
                    <p>
                      We follow the CBSE curriculum with a holistic approach that balances academics with sports, arts, and moral education. Our dedicated faculty works tirelessly to ensure that every student receives personalised attention and the guidance they need to excel.
                    </p>
                    <p>
                      I encourage all parents to remain actively involved in their child's learning journey. Together, we can nurture responsible, knowledgeable, and confident individuals who will make our community proud.
                    </p>
                    <p>
                      Let us work hand in hand to create a brighter future for our children.
                    </p>
                    <p className="font-semibold text-[#1a3c6e] pt-4">
                      Warm regards,<br />
                      Shri Girish Nair Rishi<br />
                      <span className="text-sm font-normal text-gray-500">Principal, Guru Gorakshnath Gyanasthali</span>
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
