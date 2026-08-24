/**
 * Reusable DB query helpers — keeps Server Actions and API routes thin.
 */
import { prisma } from "./prisma";
import { PublishStatus, Role } from "@prisma/client";

// ─── Site Settings ────────────────────────────────────────────
export async function getSiteSettings() {
  const settings = await prisma.siteSettings.findFirst();
  return settings;
}

// ─── Administration Leaders ───────────────────────────────────
export async function getAdministrationData() {
  const settings = await prisma.siteSettings.findFirst({
    select: {
      chairmanName: true,
      chairmanMessage: true,
      chairmanPhotoUrl: true,
      director1Name: true,
      director1Message: true,
      director1PhotoUrl: true,
      director2Name: true,
      director2Message: true,
      director2PhotoUrl: true,
      principalName: true,
      principalMessage: true,
      principalPhotoUrl: true,
    },
  });
  return settings;
}

// ─── Slider ───────────────────────────────────────────────────
export async function getPublishedSliderItems() {
  return prisma.sliderItem.findMany({
    where: { status: PublishStatus.PUBLISHED },
    orderBy: { sortOrder: "asc" },
  });
}

// ─── Notices ──────────────────────────────────────────────────
export async function getPublishedNotices(limit = 10) {
  return prisma.notice.findMany({
    where: {
      status: PublishStatus.PUBLISHED,
      OR: [{ expiresAt: null }, { expiresAt: { gt: new Date() } }],
    },
    orderBy: [{ isPinned: "desc" }, { publishedAt: "desc" }],
    take: limit,
  });
}

export async function getMarqueeNotices() {
  return prisma.notice.findMany({
    where: {
      status: PublishStatus.PUBLISHED,
      isMarquee: true,
      OR: [{ expiresAt: null }, { expiresAt: { gt: new Date() } }],
    },
    orderBy: { publishedAt: "desc" },
    take: 20,
  });
}

// ─── News ─────────────────────────────────────────────────────
export async function getPublishedNews(limit = 10) {
  return prisma.news.findMany({
    where: { status: PublishStatus.PUBLISHED },
    orderBy: { publishedAt: "desc" },
    take: limit,
  });
}

export async function getNewsBySlug(slug: string) {
  return prisma.news.findUnique({ where: { slug } });
}

// ─── Events ───────────────────────────────────────────────────
export async function getUpcomingEvents(limit = 6) {
  return prisma.event.findMany({
    where: {
      status: PublishStatus.PUBLISHED,
      startDate: { gte: new Date() },
    },
    orderBy: { startDate: "asc" },
    take: limit,
  });
}

export async function getAllPublishedEvents() {
  return prisma.event.findMany({
    where: { status: PublishStatus.PUBLISHED },
    orderBy: { startDate: "desc" },
  });
}

// ─── Gallery ──────────────────────────────────────────────────
export async function getPublishedGalleryItems(limit = 12) {
  return prisma.galleryItem.findMany({
    where: { status: PublishStatus.PUBLISHED },
    orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }],
    take: limit,
  });
}

export async function getGalleryAlbums() {
  return prisma.galleryAlbum.findMany({
    where: { status: PublishStatus.PUBLISHED },
    include: { items: { take: 1, where: { status: PublishStatus.PUBLISHED } } },
    orderBy: { createdAt: "desc" },
  });
}

// ─── Testimonials ─────────────────────────────────────────────
export async function getPublishedTestimonials() {
  return prisma.testimonial.findMany({
    where: { status: PublishStatus.PUBLISHED },
    orderBy: { sortOrder: "asc" },
  });
}

// ─── Staff ────────────────────────────────────────────────────
export async function getPublishedStaff() {
  return prisma.staffMember.findMany({
    where: { status: PublishStatus.PUBLISHED, showOnWebsite: true },
    orderBy: [{ category: "asc" }, { sortOrder: "asc" }],
  });
}

// ─── CBSE Disclosures ─────────────────────────────────────────
export async function getCBSEDisclosures() {
  return prisma.mandatoryDisclosure.findMany({
    where: { isPublic: true },
    orderBy: [{ category: "asc" }, { sortOrder: "asc" }],
  });
}

// ─── Pages ────────────────────────────────────────────────────
export async function getPageBySlug(slug: string) {
  return prisma.page.findUnique({
    where: { slug, status: PublishStatus.PUBLISHED },
  });
}

// ─── Circulars ────────────────────────────────────────────────
export async function getCirculars(audience?: string) {
  return prisma.circular.findMany({
    where: {
      status: PublishStatus.PUBLISHED,
      ...(audience && {
        OR: [{ targetAudience: "ALL" }, { targetAudience: audience }],
      }),
    },
    orderBy: { issueDate: "desc" },
  });
}

// ─── Admin — Admission Enquiries ─────────────────────────────
export async function getAdmissionEnquiries(filters?: {
  status?: string;
  academicYear?: string;
  applyingForClass?: string;
}) {
  return prisma.admissionEnquiry.findMany({
    where: {
      ...(filters?.status && { status: filters.status as any }),
      ...(filters?.academicYear && { academicYear: filters.academicYear }),
      ...(filters?.applyingForClass && {
        applyingForClass: filters.applyingForClass,
      }),
    },
    include: { documents: true },
    orderBy: { createdAt: "desc" },
  });
}

// ─── Student Portal ───────────────────────────────────────────
export async function getStudentHomeworks(sectionId: string) {
  return prisma.homework.findMany({
    where: { sectionId, dueDate: { gte: new Date() } },
    include: { subject: true, teacher: { include: { user: true } } },
    orderBy: { dueDate: "asc" },
  });
}

export async function getStudentResults(studentId: string) {
  return prisma.examResult.findMany({
    where: { studentId },
    include: {
      subject: true,
      examSchedule: true,
    },
    orderBy: { createdAt: "desc" },
  });
}

export async function getStudentAttendance(studentId: string, month?: Date) {
  const start = month
    ? new Date(month.getFullYear(), month.getMonth(), 1)
    : new Date(new Date().getFullYear(), 0, 1);
  const end = month
    ? new Date(month.getFullYear(), month.getMonth() + 1, 0)
    : new Date();

  return prisma.attendance.findMany({
    where: { studentId, date: { gte: start, lte: end } },
    orderBy: { date: "asc" },
  });
}

// ─── Admin — Users ────────────────────────────────────────────
export async function getUserById(id: string) {
  return prisma.user.findUnique({
    where: { id },
    include: {
      studentProfile: { include: { section: { include: { gradeLevel: true } } } },
      teacherProfile: true,
      parentProfile: true,
    },
  });
}

export async function getUsersByRole(role: Role) {
  return prisma.user.findMany({
    where: { role },
    orderBy: { createdAt: "desc" },
  });
}

// ─── Dashboard Stats ──────────────────────────────────────────
export async function getDashboardStats() {
  const [
    totalStudents,
    totalTeachers,
    totalParents,
    pendingEnquiries,
    openGrievances,
    unreadMessages,
  ] = await Promise.all([
    prisma.studentProfile.count({ where: { isActive: true } }),
    prisma.teacherProfile.count({ where: { isActive: true } }),
    prisma.parentProfile.count(),
    prisma.admissionEnquiry.count({ where: { status: "SUBMITTED" } }),
    prisma.grievance.count({ where: { status: "OPEN" } }),
    prisma.contactMessage.count({ where: { isRead: false } }),
  ]);

  return {
    totalStudents,
    totalTeachers,
    totalParents,
    pendingEnquiries,
    openGrievances,
    unreadMessages,
  };
}
