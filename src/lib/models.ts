import mongoose, { Schema, Document, Model } from "mongoose";

// ─── Admin ───────────────────────────────────
export interface IAdmin extends Document {
  email: string;
  hashedPassword: string;
  name: string;
  role: "admin" | "superadmin";
  createdAt: Date;
  updatedAt: Date;
}

const AdminSchema = new Schema<IAdmin>(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    },
    hashedPassword: { type: String, required: true },
    name: { type: String, required: true, trim: true, maxlength: 100 },
    role: {
      type: String,
      enum: ["admin", "superadmin"],
      default: "admin",
    },
  },
  { timestamps: true, strict: true }
);

// ─── Faculty ─────────────────────────────────
export interface IFaculty extends Document {
  name: string;
  department: string;
  subject: string;
  qualifications?: string;
  photoUrl?: string;
  order: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const FacultySchema = new Schema<IFaculty>(
  {
    name: { type: String, required: true, trim: true, maxlength: 100 },
    department: {
      type: String,
      required: true,
      enum: ["Medical", "Non-Medical", "Arts", "Commerce", "General"],
    },
    subject: { type: String, required: true, trim: true, maxlength: 100 },
    qualifications: { type: String, trim: true, maxlength: 300 },
    photoUrl: { type: String, trim: true },
    order: { type: Number, default: 0, min: 0 },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true, strict: true }
);

FacultySchema.index({ department: 1, order: 1 });
FacultySchema.index({ isActive: 1 });

// ─── Gallery Image ───────────────────────────
export interface IGalleryImage extends Document {
  url: string;
  publicId: string;
  category: string;
  caption?: string;
  uploadedAt: Date;
}

const GalleryImageSchema = new Schema<IGalleryImage>(
  {
    url: { type: String, required: true },
    publicId: { type: String, required: true, unique: true },
    category: {
      type: String,
      required: true,
      enum: ["Events", "Sports", "Academics", "Campus", "Other"],
    },
    caption: { type: String, trim: true, maxlength: 300 },
    uploadedAt: { type: Date, default: Date.now },
  },
  { strict: true }
);

GalleryImageSchema.index({ category: 1, uploadedAt: -1 });

// ─── Contact Message ─────────────────────────
export interface IContactMessage extends Document {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  isRead: boolean;
  isReplied: boolean;
  createdAt: Date;
}

const ContactMessageSchema = new Schema<IContactMessage>(
  {
    name: { type: String, required: true, trim: true, maxlength: 100 },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      maxlength: 254,
    },
    phone: { type: String, trim: true, maxlength: 15 },
    subject: { type: String, required: true, trim: true, maxlength: 200 },
    message: { type: String, required: true, trim: true, maxlength: 2000 },
    isRead: { type: Boolean, default: false },
    isReplied: { type: Boolean, default: false },
  },
  { timestamps: true, strict: true }
);

ContactMessageSchema.index({ isRead: 1, createdAt: -1 });

// ─── Admission Inquiry ───────────────────────
export interface IAdmissionInquiry extends Document {
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
  createdAt: Date;
  updatedAt: Date;
}

const AdmissionInquirySchema = new Schema<IAdmissionInquiry>(
  {
    studentName: { type: String, required: true, trim: true, maxlength: 100 },
    dateOfBirth: { type: String, required: true },
    classApplying: { type: String, required: true, trim: true },
    parentName: { type: String, required: true, trim: true, maxlength: 100 },
    parentPhone: { type: String, required: true, trim: true, maxlength: 15 },
    parentEmail: { type: String, trim: true, lowercase: true, maxlength: 254 },
    address: { type: String, required: true, trim: true, maxlength: 500 },
    previousSchool: { type: String, trim: true, maxlength: 200 },
    remarks: { type: String, trim: true, maxlength: 1000 },
    status: {
      type: String,
      enum: ["new", "reviewed", "contacted", "enrolled", "rejected"],
      default: "new",
    },
  },
  { timestamps: true, strict: true }
);

AdmissionInquirySchema.index({ status: 1, createdAt: -1 });

// ─── Model Exports ───────────────────────────
// Prevent model recompilation in development
export const Admin: Model<IAdmin> =
  mongoose.models.Admin || mongoose.model<IAdmin>("Admin", AdminSchema);

export const Faculty: Model<IFaculty> =
  mongoose.models.Faculty ||
  mongoose.model<IFaculty>("Faculty", FacultySchema);

export const GalleryImage: Model<IGalleryImage> =
  mongoose.models.GalleryImage ||
  mongoose.model<IGalleryImage>("GalleryImage", GalleryImageSchema);

export const ContactMessage: Model<IContactMessage> =
  mongoose.models.ContactMessage ||
  mongoose.model<IContactMessage>("ContactMessage", ContactMessageSchema);

export const AdmissionInquiry: Model<IAdmissionInquiry> =
  mongoose.models.AdmissionInquiry ||
  mongoose.model<IAdmissionInquiry>(
    "AdmissionInquiry",
    AdmissionInquirySchema
  );
