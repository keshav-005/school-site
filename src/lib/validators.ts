import { z } from "zod";

// ─── Contact Form ────────────────────────────
export const contactFormSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name must be under 100 characters")
    .regex(/^[a-zA-Z\s.'-]+$/, "Name contains invalid characters"),
  email: z
    .string()
    .email("Please enter a valid email address")
    .max(254, "Email is too long"),
  phone: z
    .string()
    .regex(/^[6-9]\d{9}$/, "Please enter a valid 10-digit Indian mobile number")
    .optional()
    .or(z.literal("")),
  subject: z
    .string()
    .min(3, "Subject must be at least 3 characters")
    .max(200, "Subject must be under 200 characters"),
  message: z
    .string()
    .min(10, "Message must be at least 10 characters")
    .max(2000, "Message must be under 2000 characters"),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;

// ─── Admission Inquiry ───────────────────────
export const admissionFormSchema = z.object({
  studentName: z
    .string()
    .min(2, "Student name must be at least 2 characters")
    .max(100, "Student name must be under 100 characters")
    .regex(/^[a-zA-Z\s.'-]+$/, "Name contains invalid characters"),
  dateOfBirth: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Please enter a valid date"),
  classApplying: z
    .string()
    .min(1, "Please select a class"),
  parentName: z
    .string()
    .min(2, "Parent name must be at least 2 characters")
    .max(100, "Parent name must be under 100 characters"),
  parentPhone: z
    .string()
    .regex(/^[6-9]\d{9}$/, "Please enter a valid 10-digit Indian mobile number"),
  parentEmail: z
    .string()
    .email("Please enter a valid email address")
    .max(254, "Email is too long")
    .optional()
    .or(z.literal("")),
  address: z
    .string()
    .min(10, "Address must be at least 10 characters")
    .max(500, "Address must be under 500 characters"),
  previousSchool: z
    .string()
    .max(200, "Previous school name must be under 200 characters")
    .optional()
    .or(z.literal("")),
  remarks: z
    .string()
    .max(1000, "Remarks must be under 1000 characters")
    .optional()
    .or(z.literal("")),
});

export type AdmissionFormData = z.infer<typeof admissionFormSchema>;

// ─── Faculty ─────────────────────────────────
export const facultySchema = z.object({
  name: z.string().min(2).max(100),
  department: z.enum(["Medical", "Non-Medical", "Arts", "Commerce", "General"]),
  subject: z.string().min(2).max(100),
  qualifications: z.string().max(300).optional(),
  photoUrl: z.string().url().optional().or(z.literal("")),
  order: z.number().int().min(0).default(0),
  isActive: z.boolean().default(true),
});

export type FacultyData = z.infer<typeof facultySchema>;

// ─── Gallery Image ───────────────────────────
export const galleryImageSchema = z.object({
  url: z.string().url(),
  publicId: z.string(),
  category: z.enum(["Events", "Sports", "Academics", "Campus", "Other"]),
  caption: z.string().max(300).optional().or(z.literal("")),
});

export type GalleryImageData = z.infer<typeof galleryImageSchema>;

// ─── Admin Login ─────────────────────────────
export const loginSchema = z.object({
  email: z.string().email("Please enter a valid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export type LoginData = z.infer<typeof loginSchema>;
