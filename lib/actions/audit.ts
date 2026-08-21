"use server";

import { prisma } from "@/lib/db/prisma";
import { auth } from "@/lib/auth/auth";

interface AuditLogInput {
  action: string;
  entity: string;
  entityId?: string;
  oldValues?: Record<string, unknown>;
  newValues?: Record<string, unknown>;
  ipAddress?: string;
  userAgent?: string;
}

export async function createAuditLog(input: AuditLogInput) {
  try {
    const session = await auth();
    await prisma.auditLog.create({
      data: {
        userId: session?.user?.id ?? null,
        action: input.action,
        entity: input.entity,
        entityId: input.entityId,
        oldValues: input.oldValues ?? undefined,
        newValues: input.newValues ?? undefined,
        ipAddress: input.ipAddress,
        userAgent: input.userAgent,
      },
    });
  } catch {
    // Audit log failures should not crash the main operation
    console.warn("Failed to write audit log:", input.action);
  }
}
