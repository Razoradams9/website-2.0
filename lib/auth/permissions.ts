import { Role } from "@prisma/client";

// ─── Route permission matrix ──────────────────────────────────
export const routePermissions: Record<string, Role[]> = {
  "/admin": [Role.SUPER_ADMIN, Role.ADMIN],
  "/admin/users": [Role.SUPER_ADMIN],
  "/admin/settings": [Role.SUPER_ADMIN, Role.ADMIN],
  "/admin/logs": [Role.SUPER_ADMIN],
  "/admin/content": [Role.SUPER_ADMIN, Role.ADMIN],
  "/admin/cbse": [Role.SUPER_ADMIN, Role.ADMIN],
  "/admin/admissions": [Role.SUPER_ADMIN, Role.ADMIN],
  "/admin/academics": [Role.SUPER_ADMIN, Role.ADMIN, Role.TEACHER],
  "/admin/students": [Role.SUPER_ADMIN, Role.ADMIN, Role.TEACHER],
  "/admin/teachers": [Role.SUPER_ADMIN, Role.ADMIN],
  "/admin/parents": [Role.SUPER_ADMIN, Role.ADMIN],
  "/admin/attendance": [Role.SUPER_ADMIN, Role.ADMIN, Role.TEACHER],
  "/admin/fees": [Role.SUPER_ADMIN, Role.ADMIN],
  "/admin/transport": [Role.SUPER_ADMIN, Role.ADMIN],
  "/admin/library": [Role.SUPER_ADMIN, Role.ADMIN],
  "/admin/grievances": [Role.SUPER_ADMIN, Role.ADMIN],
  "/portal/student": [Role.STUDENT],
  "/portal/parent": [Role.PARENT],
};

export function canAccess(userRole: Role, path: string): boolean {
  // Find the most specific matching route
  const matchingRoutes = Object.keys(routePermissions)
    .filter((route) => path.startsWith(route))
    .sort((a, b) => b.length - a.length); // longest match first

  if (matchingRoutes.length === 0) return true; // public route
  const requiredRoles = routePermissions[matchingRoutes[0]];
  return requiredRoles.includes(userRole);
}

export function isAdminRole(role: Role): boolean {
  return role === Role.SUPER_ADMIN || role === Role.ADMIN;
}

export function isSuperAdmin(role: Role): boolean {
  return role === Role.SUPER_ADMIN;
}

export function isTeacher(role: Role): boolean {
  return role === Role.TEACHER;
}

export function isStudentOrParent(role: Role): boolean {
  return role === Role.STUDENT || role === Role.PARENT;
}

// ─── Redirect destinations after login ───────────────────────
export function getLoginRedirect(role: Role): string {
  switch (role) {
    case Role.SUPER_ADMIN:
    case Role.ADMIN:
      return "/admin/dashboard";
    case Role.TEACHER:
      return "/admin/academics";
    case Role.STUDENT:
      return "/portal/student";
    case Role.PARENT:
      return "/portal/parent";
    default:
      return "/";
  }
}
