import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPhone(phone: string): string {
  return phone.replace(/(\d{5})(\d{5})/, "$1 $2");
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();
}

export function truncate(str: string, length: number): string {
  if (str.length <= length) return str;
  return str.slice(0, length) + "…";
}

export const SCHOOL_INFO = {
  name: "Triple M Public School",
  tagline: "The best place to brighten up your future.",
  phone: "9888299600",
  phoneAlt: "01882-245100",
  email: "triplem_school@yahoo.in",
  address:
    "Fatehgarh Road, Opp. New Saini Hospital & Narad Hospital, Near Session Chowk, Bansi Nagar, Hoshiarpur, Punjab 146001",
  established: 2012,
  mapEmbedUrl:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3405.5!2d75.911!3d31.532!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x391ad5313cce6d27%3A0x7e1dce513b5c9f22!2sTriple+M+Public+School!5e0!3m2!1sen!2sin!4v1",
  transportRoutes: [
    "Talwara", "Mukerian", "Dasuya", "Hazipur", "Khudda",
    "Tanda", "Bhogpur", "Nanda Chaur", "Garhshankar", "Mahilpur",
    "Kot Fatuhi", "Amb", "Gagret", "Phagwara", "Mehtiana", "Adampur",
  ],
} as const;
