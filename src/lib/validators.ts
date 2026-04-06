import { z } from "zod";

// ─── Sanitizer ───────────────────────────────
// Strips HTML tags and dangerous characters from user input
export function sanitize(input: string): string {
  return input
    .replace(/<[^>]*>/g, "")           // Strip HTML tags
    .replace(/[&<>"'`]/g, (char) => {  // Escape special chars
      const escapeMap: Record<string, string> = {
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#x27;",
        "`": "&#x60;",
      };
      return escapeMap[char] || char;
    })
    .trim();
}

// Zod transformer that sanitizes string inputs
const safeString = (min: number, max: number) =>
  z
    .string()
    .min(min)
    .max(max)
    .transform(sanitize);

// ─── Contact Form ────────────────────────────
export const contactFormSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name must be under 100 characters")
    .regex(/^[a-zA-Z\s.'\-]+$/, "Name contains invalid characters")
    .transform(sanitize),
  email: z
    .string()
    .email("Please enter a valid email address")
    .max(254, "Email is too long")
    .transform((v) => v.toLowerCase().trim()),
  phone: z
    .string()
    .regex(/^[6-9]\d{9}$/, "Please enter a valid 10-digit Indian mobile number")
    .optional()
    .or(z.literal("")),
  subject: z
    .string()
    .min(3, "Subject must be at least 3 characters")
    .max(200, "Subject must be under 200 characters")
    .transform(sanitize),
  message: z
    .string()
    .min(10, "Message must be at least 10 characters")
    .max(2000, "Message must be under 2000 characters")
    .transform(sanitize),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;

// ─── Admission Inquiry ───────────────────────
const ALLOWED_CLASSES = [
  "Class VI", "Class VII", "Class VIII", "Class IX", "Class X",
  "Class XI — Medical", "Class XI — Non-Medical", "Class XI — Commerce",
  "Class XII — Medical", "Class XII — Non-Medical", "Class XII — Commerce",
] as const;

export const admissionFormSchema = z.object({
  studentName: z
    .string()
    .min(2, "Student name must be at least 2 characters")
    .max(100, "Student name must be under 100 characters")
    .regex(/^[a-zA-Z\s.'\-]+$/, "Name contains invalid characters")
    .transform(sanitize),
  dateOfBirth: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Please enter a valid date")
    .refine((d) => {
      const date = new Date(d);
      const now = new Date();
      const age = now.getFullYear() - date.getFullYear();
      return age >= 4 && age <= 25; // reasonable school age
    }, "Date of birth is not in a valid range"),
  classApplying: z.enum(ALLOWED_CLASSES, {
    message: "Please select a valid class",
  }),
  parentName: z
    .string()
    .min(2, "Parent name must be at least 2 characters")
    .max(100, "Parent name must be under 100 characters")
    .transform(sanitize),
  parentPhone: z
    .string()
    .regex(/^[6-9]\d{9}$/, "Please enter a valid 10-digit Indian mobile number"),
  parentEmail: z
    .string()
    .email("Please enter a valid email address")
    .max(254, "Email is too long")
    .transform((v) => v.toLowerCase().trim())
    .optional()
    .or(z.literal("")),
  address: z
    .string()
    .min(10, "Address must be at least 10 characters")
    .max(500, "Address must be under 500 characters")
    .transform(sanitize),
  previousSchool: z
    .string()
    .max(200, "Previous school name must be under 200 characters")
    .transform(sanitize)
    .optional()
    .or(z.literal("")),
  remarks: z
    .string()
    .max(1000, "Remarks must be under 1000 characters")
    .transform(sanitize)
    .optional()
    .or(z.literal("")),
});

export type AdmissionFormData = z.infer<typeof admissionFormSchema>;

// ─── Faculty ─────────────────────────────────
const ALLOWED_DEPARTMENTS = ["Medical", "Non-Medical", "Commerce", "General"] as const;

export const facultySchema = z.object({
  name: safeString(2, 100),
  department: z.enum(ALLOWED_DEPARTMENTS),
  subject: safeString(2, 100),
  qualifications: z.string().max(300).transform(sanitize).optional().or(z.literal("")),
  photoUrl: z
    .string()
    .max(500)
    .refine(
      (url) => url === "" || /^(https?:\/\/|\/images\/)/.test(url),
      "Photo URL must be a valid HTTP URL or local path"
    )
    .optional()
    .or(z.literal("")),
  order: z.number().int().min(0).max(999).default(0),
  isActive: z.boolean().default(true),
});

export type FacultyData = z.infer<typeof facultySchema>;

// ─── Gallery Image ───────────────────────────
const ALLOWED_CATEGORIES = ["Events", "Sports", "Academics", "Campus", "Other"] as const;

export const galleryImageSchema = z.object({
  url: z
    .string()
    .max(1000)
    .refine(
      (url) => /^(https?:\/\/|\/images\/)/.test(url),
      "Image URL must be a valid HTTP URL or local path"
    ),
  publicId: z
    .string()
    .max(200)
    .regex(/^[a-zA-Z0-9_\-\/]+$/, "Public ID contains invalid characters"),
  category: z.enum(ALLOWED_CATEGORIES),
  caption: z.string().max(300).transform(sanitize).optional().or(z.literal("")),
});

// Partial schema for updates — only allow specific fields
export const galleryUpdateSchema = z.object({
  url: z.string().max(1000).refine(
    (url) => /^(https?:\/\/|\/images\/)/.test(url),
    "Image URL must be a valid HTTP URL or local path"
  ).optional(),
  category: z.enum(ALLOWED_CATEGORIES).optional(),
  caption: z.string().max(300).transform(sanitize).optional(),
}).strict(); // .strict() rejects any unknown fields

export type GalleryImageData = z.infer<typeof galleryImageSchema>;

// ─── Admin Login ─────────────────────────────
export const loginSchema = z.object({
  email: z.string().email("Please enter a valid email").max(254),
  password: z.string().min(6, "Password must be at least 6 characters").max(128),
});

export type LoginData = z.infer<typeof loginSchema>;

// ─── Query Param Validators ──────────────────
export function clampPagination(params: URLSearchParams): { page: number; limit: number; skip: number } {
  const page = Math.max(1, Math.min(1000, parseInt(params.get("page") || "1") || 1));
  const limit = Math.max(1, Math.min(100, parseInt(params.get("limit") || "20") || 20));
  const skip = (page - 1) * limit;
  return { page, limit, skip };
}
