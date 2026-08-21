import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { format, formatDistanceToNow } from "date-fns";

// ─── Tailwind class merge helper ──────────────────────────────
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// ─── Date formatters ──────────────────────────────────────────
export function formatDate(date: Date | string, fmt = "dd MMM yyyy") {
  return format(new Date(date), fmt);
}

export function formatDateTime(date: Date | string) {
  return format(new Date(date), "dd MMM yyyy, hh:mm a");
}

export function timeAgo(date: Date | string) {
  return formatDistanceToNow(new Date(date), { addSuffix: true });
}

// ─── String helpers ───────────────────────────────────────────
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function truncate(text: string, length: number): string {
  if (text.length <= length) return text;
  return text.slice(0, length).trim() + "…";
}

export function capitalize(text: string): string {
  return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
}

export function titleCase(text: string): string {
  return text.replace(/\b\w/g, (c) => c.toUpperCase());
}

export function generateReceiptNo(): string {
  const prefix = "RCP";
  const year = new Date().getFullYear().toString().slice(-2);
  const random = Math.floor(100000 + Math.random() * 900000);
  return `${prefix}${year}${random}`;
}

export function generateTicketNo(): string {
  const prefix = "GRV";
  const year = new Date().getFullYear().toString().slice(-2);
  const random = Math.floor(10000 + Math.random() * 90000);
  return `${prefix}${year}${random}`;
}

export function generateAdmissionNo(sequence: number): string {
  const year = new Date().getFullYear().toString().slice(-2);
  return `ADM${year}${String(sequence).padStart(4, "0")}`;
}

// ─── Number helpers ───────────────────────────────────────────
export function formatCurrency(amount: number, currency = "INR"): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function calculatePercentage(obtained: number, total: number): string {
  if (total === 0) return "0.00";
  return ((obtained / total) * 100).toFixed(2);
}

// ─── Grade calculation ────────────────────────────────────────
export function calculateGrade(percentage: number): {
  grade: string;
  gradePoint: number;
  remarks: string;
} {
  if (percentage >= 91)
    return { grade: "A1", gradePoint: 10, remarks: "Outstanding" };
  if (percentage >= 81)
    return { grade: "A2", gradePoint: 9, remarks: "Excellent" };
  if (percentage >= 71)
    return { grade: "B1", gradePoint: 8, remarks: "Very Good" };
  if (percentage >= 61)
    return { grade: "B2", gradePoint: 7, remarks: "Good" };
  if (percentage >= 51)
    return { grade: "C1", gradePoint: 6, remarks: "Average" };
  if (percentage >= 41)
    return { grade: "C2", gradePoint: 5, remarks: "Satisfactory" };
  if (percentage >= 33)
    return { grade: "D", gradePoint: 4, remarks: "Needs Improvement" };
  return { grade: "E", gradePoint: 0, remarks: "Fail" };
}

// ─── File helpers ─────────────────────────────────────────────
export function formatFileSize(bytes: number): string {
  if (bytes === 0) return "0 B";
  const k = 1024;
  const sizes = ["B", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + " " + sizes[i];
}

export function getFileExtension(filename: string): string {
  return filename.split(".").pop()?.toLowerCase() ?? "";
}

export function isPDF(fileUrl: string): boolean {
  return getFileExtension(fileUrl) === "pdf";
}

export function isImage(fileUrl: string): boolean {
  return ["jpg", "jpeg", "png", "gif", "webp", "svg"].includes(
    getFileExtension(fileUrl),
  );
}

// ─── Array helpers ────────────────────────────────────────────
export function groupBy<T>(
  array: T[],
  key: keyof T,
): Record<string, T[]> {
  return array.reduce(
    (groups, item) => {
      const groupKey = String(item[key]);
      return {
        ...groups,
        [groupKey]: [...(groups[groupKey] || []), item],
      };
    },
    {} as Record<string, T[]>,
  );
}

// ─── Academic year helper ─────────────────────────────────────
export function getCurrentAcademicYear(): string {
  const now = new Date();
  const month = now.getMonth(); // 0-indexed
  const year = now.getFullYear();
  // Indian academic year: April to March
  if (month >= 3) {
    return `${year}-${year + 1}`;
  }
  return `${year - 1}-${year}`;
}

// ─── Days of week ─────────────────────────────────────────────
export const DAYS_OF_WEEK = [
  { value: 1, label: "Monday" },
  { value: 2, label: "Tuesday" },
  { value: 3, label: "Wednesday" },
  { value: 4, label: "Thursday" },
  { value: 5, label: "Friday" },
  { value: 6, label: "Saturday" },
];

// ─── Indian states ────────────────────────────────────────────
export const INDIAN_STATES = [
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
  "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand",
  "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur",
  "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab",
  "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura",
  "Uttar Pradesh", "Uttarakhand", "West Bengal",
  "Delhi", "Chandigarh", "Jammu and Kashmir", "Ladakh",
  "Puducherry", "Andaman and Nicobar Islands", "Lakshadweep",
];
