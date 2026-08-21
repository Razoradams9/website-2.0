import type { Role, AccountStatus, PublishStatus } from "@prisma/client";

// ─── NextAuth type augmentation ───────────────────────────────
declare module "next-auth" {
  interface User {
    id: string;
    role: Role;
  }
  interface Session {
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
      role: Role;
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    role: Role;
  }
}

// ─── API Response types ───────────────────────────────────────
export type ApiResponse<T = void> =
  | { success: true; data: T; message?: string }
  | { success: false; error: string; fieldErrors?: Record<string, string[]> };

export type PaginatedResponse<T> = {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
};

// ─── Common filter types ──────────────────────────────────────
export interface PaginationParams {
  page?: number;
  pageSize?: number;
  search?: string;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}

export interface DateRangeFilter {
  startDate?: Date;
  endDate?: Date;
}

// ─── Dashboard stats ──────────────────────────────────────────
export interface DashboardStats {
  totalStudents: number;
  totalTeachers: number;
  totalParents: number;
  pendingEnquiries: number;
  openGrievances: number;
  unreadMessages: number;
}

// ─── Navigation ───────────────────────────────────────────────
export interface NavItem {
  label: string;
  href: string;
  icon?: string;
  children?: NavItem[];
  badge?: string | number;
  requiredRole?: Role[];
}

// ─── Table column definition ──────────────────────────────────
export interface TableColumn<T> {
  key: keyof T | string;
  label: string;
  sortable?: boolean;
  render?: (value: unknown, row: T) => React.ReactNode;
  className?: string;
}

// ─── File upload ──────────────────────────────────────────────
export interface UploadedFile {
  url: string;
  name: string;
  size: number;
  type: string;
  key?: string;
}

// ─── Breadcrumb ───────────────────────────────────────────────
export interface BreadcrumbItem {
  label: string;
  href?: string;
}

// ─── Notification ─────────────────────────────────────────────
export type NotificationType = "success" | "error" | "warning" | "info";

export interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  message?: string;
  createdAt: Date;
  isRead: boolean;
}

// ─── Re-export Prisma enums for convenience ───────────────────
export type { Role, AccountStatus, PublishStatus };
