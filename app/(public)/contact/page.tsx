import { PageHero } from "@/components/public/shared/page-hero"
import { Phone, Mail, MapPin, Clock, MessageCircle } from "lucide-react"

export const metadata = { title: "Contact Us" }

export default function ContactPage() {
  return (
    <>
      <PageHero
        title="Contact Us"
        subtitle="Have questions? We're happy to help. Reach out anytime."
        breadcrumbs={[{ label: "Contact Us" }]}
      />

      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-black text-[#138808]">Get In <span className="text-[#FF9933]">Touch</span></h2>
              <p className="text-gray-600 mt-3">Feel free to contact us for any queries regarding admissions, academics, or general information.</p>
            </div>

            <div className="space-y-5">
              {/* Phone */}
              <a href="tel:9794335475" className="flex items-center gap-5 p-6 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all group">
                <div className="w-14 h-14 rounded-xl bg-emerald-50 flex items-center justify-center flex-shrink-0 group-hover:bg-emerald-100 transition-colors">
                  <Phone className="w-6 h-6 text-emerald-600" />
                </div>
                <div>
                  <h4 className="font-bold text-[#138808] text-lg">Call Us</h4>
                  <p className="text-gray-600 text-base mt-0.5">9794335475</p>
                  <p className="text-xs text-gray-400 mt-1">Available during school hours</p>
                </div>
              </a>

              {/* Email */}
              <a href="mailto:gggprincipal@gmail.com" className="flex items-center gap-5 p-6 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all group">
                <div className="w-14 h-14 rounded-xl bg-blue-50 flex items-center justify-center flex-shrink-0 group-hover:bg-blue-100 transition-colors">
                  <Mail className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h4 className="font-bold text-[#138808] text-lg">Email Us</h4>
                  <p className="text-gray-600 text-base mt-0.5">gggprincipal@gmail.com</p>
                  <p className="text-xs text-gray-400 mt-1">We usually respond within 24 hours</p>
                </div>
              </a>

              {/* WhatsApp */}
              <a href="https://wa.me/919794335475?text=Hello, I would like to know more about the school." target="_blank" rel="noopener noreferrer" className="flex items-center gap-5 p-6 bg-white rounded-2xl border border-green-200 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all group bg-green-50/30">
                <div className="w-14 h-14 rounded-xl bg-green-100 flex items-center justify-center flex-shrink-0 group-hover:bg-green-200 transition-colors">
                  <MessageCircle className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <h4 className="font-bold text-green-800 text-lg">WhatsApp</h4>
                  <p className="text-gray-600 text-base mt-0.5">9794335475</p>
                  <p className="text-xs text-gray-400 mt-1">Tap to chat with us directly</p>
                </div>
              </a>

              {/* Address */}
              <div className="flex items-center gap-5 p-6 bg-white rounded-2xl border border-gray-100 shadow-sm">
                <div className="w-14 h-14 rounded-xl bg-amber-50 flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-6 h-6 text-amber-600" />
                </div>
                <div>
                  <h4 className="font-bold text-[#138808] text-lg">Visit Us</h4>
                  <p className="text-gray-600 text-base mt-0.5">Deoria (Vrindavan), Domariaganj, Siddharthnagar, Uttar Pradesh</p>
                </div>
              </div>

              {/* School Hours */}
              <div className="flex items-center gap-5 p-6 bg-white rounded-2xl border border-gray-100 shadow-sm">
                <div className="w-14 h-14 rounded-xl bg-purple-50 flex items-center justify-center flex-shrink-0">
                  <Clock className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <h4 className="font-bold text-[#138808] text-lg">School Hours</h4>
                  <p className="text-gray-600 text-sm mt-0.5">Monday – Saturday: 7:30 AM – 2:30 PM</p>
                  <p className="text-gray-500 text-sm">Sunday & Holidays: Closed</p>
                </div>
              </div>
            </div>

            {/* Map */}
            <div className="mt-8 rounded-2xl overflow-hidden border border-gray-200 shadow-sm">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3000!2d82.85!3d27.0!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjfCsDAwJzAwLjAiTiA4MsKwNTEnMDAuMCJF!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                width="100%"
                height="300"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full"
                title="School Location"
              />
              <div className="bg-[#f0fdf4] px-5 py-3 flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#138808]" />
                <p className="text-sm text-[#138808] font-medium">Deoria (Vrindavan), Domariaganj, Siddharthnagar, U.P.</p>
                <a
                  href="https://share.google/CeejVfHG7kE03kE5n"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ml-auto text-xs text-[#FF9933] font-semibold hover:underline"
                >
                  Open in Google Maps →
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
