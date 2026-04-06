// ─── Shared Types ────────────────────────────
// Single source of truth for all data types used across the app.
// Replaces `any` usage in components and API routes.

export interface FacultyMember {
  _id: string;
  name: string;
  department: "Medical" | "Non-Medical" | "Commerce" | "General";
  subject: string;
  qualifications?: string;
  photoUrl?: string;
  order: number;
  isActive: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface GalleryImage {
  _id: string;
  url: string;
  publicId: string;
  category: "Events" | "Sports" | "Academics" | "Campus" | "Other";
  caption?: string;
  uploadedAt: string;
}

export interface AdmissionInquiry {
  _id: string;
  studentName: string;
  dateOfBirth: string;
  classApplying: string;
  parentName: string;
  parentPhone: string;
  parentEmail?: string;
  address: string;
  previousSchool?: string;
  remarks?: string;
  status: "new" | "reviewed" | "contacted" | "enrolled" | "rejected";
  createdAt: string;
  updatedAt: string;
}

export interface ContactMessage {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  isRead: boolean;
  isReplied: boolean;
  createdAt: string;
}

// ─── API Response Types ──────────────────────

export interface PaginatedResponse<T> {
  pagination: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
  [key: string]: T[] | PaginatedResponse<T>["pagination"];
}

export interface FacultyListResponse {
  faculty: FacultyMember[];
}

export interface GalleryListResponse {
  images: GalleryImage[];
  pagination: PaginatedResponse<GalleryImage>["pagination"];
}

export interface AdmissionListResponse {
  inquiries: AdmissionInquiry[];
  pagination: PaginatedResponse<AdmissionInquiry>["pagination"];
}

export interface ApiSuccessResponse {
  success: true;
  message?: string;
  id?: string;
}

export interface ApiErrorResponse {
  error: string;
  errors?: Record<string, string[]>;
  code?: string;
}

// ─── Department & Category Constants ─────────
// Use these instead of magic strings throughout the app.

export const DEPARTMENTS = ["Medical", "Non-Medical", "Commerce", "General"] as const;
export type Department = (typeof DEPARTMENTS)[number];

export const GALLERY_CATEGORIES = ["Events", "Sports", "Academics", "Campus", "Other"] as const;
export type GalleryCategory = (typeof GALLERY_CATEGORIES)[number];

export const ADMISSION_STATUSES = ["new", "reviewed", "contacted", "enrolled", "rejected"] as const;
export type AdmissionStatus = (typeof ADMISSION_STATUSES)[number];

// ─── Helper: Extract initials from name ──────
export function getInitials(name: string): string {
  return name
    .replace(/^(Mr\.|Mrs\.|Ms\.|Dr\.|Prof\.)\s*/i, "")
    .split(" ")
    .map((w) => w[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("");
}
