import Link from "next/link";
import {
  Phone,
  Mail,
  MapPin,
  GraduationCap,
  ArrowUpRight,
} from "lucide-react";
import { SCHOOL_INFO } from "@/lib/utils";

const quickLinks = [
  { label: "About Us", href: "/about" },
  { label: "Faculty", href: "/faculty" },
  { label: "Facilities", href: "/facilities" },
  { label: "Admissions", href: "/admissions" },
  { label: "Gallery", href: "/gallery" },
  { label: "Contact", href: "/contact" },
];

const academics = [
  { label: "Science (Medical)" },
  { label: "Science (Non-Medical)" },
  { label: "Arts Stream" },
  { label: "Commerce Stream" },
  { label: "Secondary (VI–X)" },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-navy-900 text-white/80">
      {/* Main Footer */}
      <div className="container-wide py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {/* Column 1: Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-gold-400 flex items-center justify-center">
                <GraduationCap className="text-navy-900" size={22} />
              </div>
              <div>
                <span className="font-serif text-lg font-bold text-white block leading-none">
                  TRIPLE M
                </span>
                <span className="text-[10px] font-sans font-medium uppercase tracking-[0.25em] text-gold-300 leading-none">
                  Public School
                </span>
              </div>
            </div>
            <p className="text-sm leading-relaxed text-white/60 mb-6">
              Established in 2012, Triple M Public School has been shaping young
              minds in Hoshiarpur with a commitment to academic rigour,
              discipline, and character development.
            </p>
            <div className="divider bg-gold-400/30 mb-0" />
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 className="text-label text-gold-300 mb-6">Quick Links</h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/60 hover:text-gold-300 transition-colors duration-200 flex items-center gap-1 group"
                  >
                    <span>{link.label}</span>
                    <ArrowUpRight
                      size={12}
                      className="opacity-0 group-hover:opacity-100 transition-opacity"
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Academics */}
          <div>
            <h4 className="text-label text-gold-300 mb-6">Academics</h4>
            <ul className="space-y-3">
              {academics.map((item) => (
                <li
                  key={item.label}
                  className="text-sm text-white/60"
                >
                  {item.label}
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact */}
          <div>
            <h4 className="text-label text-gold-300 mb-6">Get in Touch</h4>
            <div className="space-y-4">
              <a
                href={`tel:${SCHOOL_INFO.phone}`}
                className="flex items-start gap-3 text-sm text-white/60 hover:text-gold-300 transition-colors"
              >
                <Phone size={16} className="mt-0.5 shrink-0" />
                <div>
                  <span className="block">{SCHOOL_INFO.phone}</span>
                  <span className="block">{SCHOOL_INFO.phoneAlt}</span>
                </div>
              </a>
              <a
                href={`mailto:${SCHOOL_INFO.email}`}
                className="flex items-start gap-3 text-sm text-white/60 hover:text-gold-300 transition-colors"
              >
                <Mail size={16} className="mt-0.5 shrink-0" />
                <span>{SCHOOL_INFO.email}</span>
              </a>
              <div className="flex items-start gap-3 text-sm text-white/60">
                <MapPin size={16} className="mt-0.5 shrink-0" />
                <span>{SCHOOL_INFO.address}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="container-wide py-5 flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-xs text-white/40 text-center md:text-left">
            © {currentYear} Triple M Public School, Hoshiarpur. All rights
            reserved.
          </p>
          <div className="flex items-center gap-6 text-xs text-white/40">
            <Link
              href="/contact"
              className="hover:text-white/60 transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="/contact"
              className="hover:text-white/60 transition-colors"
            >
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
