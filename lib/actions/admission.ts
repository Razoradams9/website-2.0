"use server";

import { prisma } from "@/lib/db/prisma";
import { admissionEnquirySchema } from "@/lib/validations/admission";
import { sendAdmissionConfirmationEmail } from "@/lib/email/mailer";
import { createAuditLog } from "./audit";
import type { ApiResponse } from "@/types";

export async function submitAdmissionEnquiry(
  formData: unknown,
): Promise<ApiResponse<{ applicationNo: string }>> {
  const parsed = admissionEnquirySchema.safeParse(formData);

  if (!parsed.success) {
    return {
      success: false,
      error: "Validation failed",
      fieldErrors: parsed.error.flatten().fieldErrors as Record<string, string[]>,
    };
  }

  const data = parsed.data;

  try {
    const enquiry = await prisma.admissionEnquiry.create({
      data: {
        ...data,
        dateOfBirth: new Date(data.dateOfBirth),
        previousPercentage: data.previousPercentage
          ? data.previousPercentage
          : undefined,
      },
    });

    // Send confirmation email
    if (data.fatherEmail) {
      await sendAdmissionConfirmationEmail(
        data.fatherEmail,
        data.studentName,
        enquiry.applicationNo,
      ).catch(() => {
        /* non-critical */
      });
    }

    await createAuditLog({
      action: "ADMISSION_ENQUIRY_SUBMITTED",
      entity: "AdmissionEnquiry",
      entityId: enquiry.id,
      newValues: { applicationNo: enquiry.applicationNo, studentName: data.studentName },
    });

    return {
      success: true,
      data: { applicationNo: enquiry.applicationNo },
      message: "Application submitted successfully!",
    };
  } catch (error) {
    console.error("Admission enquiry error:", error);
    return {
      success: false,
      error: "Failed to submit application. Please try again.",
    };
  }
}

export async function updateEnquiryStatus(
  enquiryId: string,
  status: string,
  reviewNotes?: string,
): Promise<ApiResponse> {
  try {
    await prisma.admissionEnquiry.update({
      where: { id: enquiryId },
      data: { status: status as any, reviewNotes },
    });

    await createAuditLog({
      action: "ADMISSION_STATUS_UPDATED",
      entity: "AdmissionEnquiry",
      entityId: enquiryId,
      newValues: { status, reviewNotes },
    });

    return { success: true, data: undefined };
  } catch {
    return { success: false, error: "Failed to update status." };
  }
}
