import { z } from "zod";

export const noticeSchema = z.object({
  title: z.string().min(3, "Title is required"),
  content: z.string().min(10, "Content is required"),
  category: z.enum(["GENERAL", "EXAM", "ADMISSION", "HOLIDAY", "URGENT"]).default("GENERAL"),
  fileUrl: z.string().url("Invalid URL").optional().or(z.literal("")),
  isMarquee: z.boolean().default(false),
  isPinned: z.boolean().default(false),
  targetAudience: z
    .enum(["ALL", "STUDENT", "PARENT", "TEACHER", "STAFF"])
    .default("ALL"),
  publishedAt: z.string().optional(),
  expiresAt: z.string().optional(),
  status: z.enum(["DRAFT", "PUBLISHED", "ARCHIVED"]).default("PUBLISHED"),
});

export const newsSchema = z.object({
  title: z.string().min(3, "Title is required"),
  slug: z
    .string()
    .min(3)
    .regex(/^[a-z0-9-]+$/, "Slug must be lowercase letters, numbers, and hyphens"),
  content: z.string().min(20, "Content is required"),
  excerpt: z.string().max(300).optional(),
  featuredImage: z.string().url().optional().or(z.literal("")),
  tags: z.array(z.string()).default([]),
  status: z.enum(["DRAFT", "PUBLISHED", "ARCHIVED"]).default("DRAFT"),
  publishedAt: z.string().optional(),
});

export const eventSchema = z.object({
  title: z.string().min(3, "Title is required"),
  slug: z
    .string()
    .min(3)
    .regex(/^[a-z0-9-]+$/, "Slug must be lowercase letters, numbers, and hyphens"),
  description: z.string().min(10, "Description is required"),
  shortDesc: z.string().max(200).optional(),
  featuredImage: z.string().url().optional().or(z.literal("")),
  venue: z.string().optional(),
  startDate: z.string().refine((d) => !isNaN(Date.parse(d)), "Invalid start date"),
  endDate: z.string().optional(),
  status: z.enum(["DRAFT", "PUBLISHED", "ARCHIVED"]).default("DRAFT"),
  isImportant: z.boolean().default(false),
  tags: z.array(z.string()).default([]),
});

export const sliderItemSchema = z.object({
  title: z.string().min(2, "Title is required"),
  subtitle: z.string().optional(),
  description: z.string().optional(),
  imageUrl: z.string().min(1, "Image is required"),
  linkUrl: z.string().url().optional().or(z.literal("")),
  linkText: z.string().optional(),
  sortOrder: z.number().int().default(0),
  status: z.enum(["DRAFT", "PUBLISHED", "ARCHIVED"]).default("PUBLISHED"),
});

export const staffMemberSchema = z.object({
  name: z.string().min(2, "Name is required"),
  designation: z.string().min(2, "Designation is required"),
  qualification: z.string().optional(),
  department: z.string().optional(),
  category: z.enum(["TEACHING", "NON_TEACHING", "ADMINISTRATIVE", "MANAGEMENT"]),
  photoUrl: z.string().url().optional().or(z.literal("")),
  email: z.string().email().optional().or(z.literal("")),
  phone: z.string().optional(),
  bio: z.string().optional(),
  sortOrder: z.number().int().default(0),
  showOnWebsite: z.boolean().default(true),
  status: z.enum(["DRAFT", "PUBLISHED", "ARCHIVED"]).default("PUBLISHED"),
});

export type NoticeInput = z.infer<typeof noticeSchema>;
export type NewsInput = z.infer<typeof newsSchema>;
export type EventInput = z.infer<typeof eventSchema>;
export type SliderItemInput = z.infer<typeof sliderItemSchema>;
export type StaffMemberInput = z.infer<typeof staffMemberSchema>;
