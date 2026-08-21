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
  const [marqueeNotices, news, events, testimonials] = await Promise.all([
    getMarqueeNotices(),
    getPublishedNews(3),
    getUpcomingEvents(4),
    getPublishedTestimonials(),
  ])

  const tickerItems = marqueeNotices.map((n) => ({
    id: n.id,
    title: n.title,
    category: n.category,
  }))

  return (
    <>
      <HeroSlider />
      <NewsTicker items={tickerItems} />
      <PrincipalMessage />
      <WhyChooseUs />
      <AcademicPrograms />
      <Facilities />
      <NewsEventsPreview
        news={news.map((n) => ({ id: n.id, title: n.title, publishedAt: n.publishedAt, excerpt: n.excerpt, featuredImage: n.featuredImage }))}
        events={events.map((e) => ({ id: e.id, title: e.title, startDate: e.startDate, venue: e.venue, shortDesc: e.shortDesc }))}
      />
      <Testimonials items={testimonials.map((t) => ({ id: t.id, name: t.name, role: t.role, content: t.content, rating: t.rating, avatarUrl: t.avatarUrl }))} />
      <CTABanner />
    </>
  )
}
