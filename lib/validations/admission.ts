import { z } from "zod";

export const admissionEnquirySchema = z.object({
  studentName: z.string().min(2, "Student name is required"),
  dateOfBirth: z.string().refine((d) => !isNaN(Date.parse(d)), "Invalid date"),
  gender: z.enum(["MALE", "FEMALE", "OTHER"]),
  nationality: z.string().default("Indian"),
  religion: z.string().optional(),
  category: z.enum(["GENERAL", "OBC", "SC", "ST", "EWS"]).default("GENERAL"),
  applyingForClass: z.string().min(1, "Please select a class"),
  academicYear: z.string().min(1, "Academic year is required"),
  previousSchool: z.string().optional(),
  previousClass: z.string().optional(),
  previousPercentage: z.number().min(0).max(100).optional(),
  fatherName: z.string().min(2, "Father's name is required"),
  fatherOccupation: z.string().optional(),
  fatherPhone: z
    .string()
    .regex(/^[6-9]\d{9}$/, "Enter a valid 10-digit mobile number"),
  fatherEmail: z.string().email("Invalid email").optional().or(z.literal("")),
  motherName: z.string().min(2, "Mother's name is required"),
  motherOccupation: z.string().optional(),
  motherPhone: z
    .string()
    .regex(/^[6-9]\d{9}$/, "Enter a valid 10-digit mobile number")
    .optional()
    .or(z.literal("")),
  motherEmail: z.string().email("Invalid email").optional().or(z.literal("")),
  address: z.string().min(5, "Address is required"),
  city: z.string().min(2, "City is required"),
  state: z.string().min(2, "State is required"),
  pinCode: z
    .string()
    .regex(/^\d{6}$/, "Enter a valid 6-digit PIN code"),
  howDidYouHear: z.string().optional(),
  specialNeeds: z.string().optional(),
});

export type AdmissionEnquiryInput = z.infer<typeof admissionEnquirySchema>;
