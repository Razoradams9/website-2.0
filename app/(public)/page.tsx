import { HeroSlider } from "@/components/public/home/hero-slider"
import { NewsTicker } from "@/components/public/home/news-ticker"
import {
  PrincipalMessage,
  WhyChooseUs,
  AcademicPrograms,
  Facilities,
  NewsEventsPreview,
  Testimonials,
  CTABanner,
} from "@/components/public/home/home-sections"
import { getMarqueeNotices, getPublishedNews, getUpcomingEvents, getPublishedTestimonials } from "@/lib/db/queries"

export default async function HomePage() {
  let tickerItems: { id: string; title: string; category: string }[] = []
  let newsItems: any[] = []
  let eventItems: any[] = []
  let testimonialItems: any[] = []

  try {
    const [marqueeNotices, news, events, testimonials] = await Promise.all([
      getMarqueeNotices(),
      getPublishedNews(3),
      getUpcomingEvents(4),
      getPublishedTestimonials(),
    ])

    tickerItems = marqueeNotices.map((n) => ({
      id: n.id,
      title: n.title,
      category: n.category,
    }))
    newsItems = news.map((n) => ({ id: n.id, title: n.title, publishedAt: n.publishedAt, excerpt: n.excerpt, featuredImage: n.featuredImage }))
    eventItems = events.map((e) => ({ id: e.id, title: e.title, startDate: e.startDate, venue: e.venue, shortDesc: e.shortDesc }))
    testimonialItems = testimonials.map((t) => ({ id: t.id, name: t.name, role: t.role, content: t.content, rating: t.rating, avatarUrl: t.avatarUrl }))
  } catch {
    // Database not available — show page without dynamic content
  }

  return (
    <>
      <HeroSlider />
      {tickerItems.length > 0 && <NewsTicker items={tickerItems} />}
      <PrincipalMessage />
      <WhyChooseUs />
      <AcademicPrograms />
      <Facilities />
      <NewsEventsPreview news={newsItems} events={eventItems} />
      <Testimonials items={testimonialItems} />
      <CTABanner />
    </>
  )
}
