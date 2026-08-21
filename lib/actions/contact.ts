"use server";

import { prisma } from "@/lib/db/prisma";
import { contactMessageSchema } from "@/lib/validations/contact";
import type { ApiResponse } from "@/types";

export async function submitContactForm(formData: unknown): Promise<ApiResponse> {
  const parsed = contactMessageSchema.safeParse(formData);

  if (!parsed.success) {
    return {
      success: false,
      error: "Please check your input",
      fieldErrors: parsed.error.flatten().fieldErrors as Record<string, string[]>,
    };
  }

  try {
    await prisma.contactMessage.create({ data: parsed.data });
    return { success: true, data: undefined, message: "Message sent successfully!" };
  } catch {
    return { success: false, error: "Failed to send message. Please try again." };
  }
}
