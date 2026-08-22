import { PageHero } from "@/components/public/shared/page-hero"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

export const metadata = { title: "Administration" }

const leaders = [
  {
    name: "Shri Raghavendra Pratap Singh",
    role: "Chairman",
    href: "/administration/chairman",
    initials: "RS",
    quote: "Education is the greatest service to society.",
  },
  {
    name: "Shri Pradeep Kumar Singh",
    role: "Director",
    href: "/administration/director",
    initials: "PS",
    quote: "Building an institution the community can be proud of.",
  },
  {
    name: "Shri Praveen Pandey",
    role: "Director",
    href: "/administration/director-2",
    initials: "PP",
    quote: "Every child has unlimited potential waiting to be unlocked.",
  },
]

export default function AdministrationPage() {
  return (
    <>
      <PageHero
        title="Our Administration"
        subtitle="Meet the dedicated team behind Guru Gorakshnath Gyanasthali."
        breadcrumbs={[{ label: "Administration" }]}
      />

      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-black text-[#138808]">School <span className="text-[#FF9933]">Leadership</span></h2>
            <p className="text-gray-600 mt-3 max-w-xl mx-auto">Committed leaders working together to build a school that serves every child with care and purpose.</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {leaders.map((leader) => (
              <Link
                key={leader.name}
                href={leader.href}
                className="group bg-white rounded-2xl p-8 border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all text-center"
              >
                <div className="w-24 h-24 mx-auto rounded-full bg-gradient-to-br from-[#138808] to-[#0a4d0a] flex items-center justify-center text-white font-black text-2xl mb-5 group-hover:scale-105 transition-transform shadow-lg">
                  {leader.initials}
                </div>
                <h3 className="font-bold text-[#138808] text-lg group-hover:text-[#FF9933] transition-colors">{leader.name}</h3>
                <p className="text-sm text-[#FF9933] font-semibold mt-1">{leader.role}</p>
                <p className="text-xs text-gray-500 italic mt-3 leading-relaxed">"{leader.quote}"</p>
                <div className="mt-5 inline-flex items-center gap-1.5 text-xs font-semibold text-[#138808] group-hover:text-[#FF9933] transition-colors">
                  Read Message <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
