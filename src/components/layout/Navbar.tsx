"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Phone,
  Mail,
  Menu,
  X,
  ChevronRight,
  GraduationCap,
} from "lucide-react";
import { SCHOOL_INFO } from "@/lib/utils";

const navItems = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Faculty", href: "/faculty" },
  { label: "Facilities", href: "/facilities" },
  { label: "Admissions", href: "/admissions", highlight: true },
  { label: "Gallery", href: "/gallery" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <>
      {/* Top Info Bar */}
      <div className="bg-navy-800 text-white/90 text-xs py-2 hidden md:block">
        <div className="container-wide flex items-center justify-between">
          <div className="flex items-center gap-6">
            <a
              href={`tel:${SCHOOL_INFO.phone}`}
              className="flex items-center gap-1.5 hover:text-gold-300 transition-colors"
            >
              <Phone size={12} />
              <span>{SCHOOL_INFO.phone}</span>
            </a>
            <a
              href={`mailto:${SCHOOL_INFO.email}`}
              className="flex items-center gap-1.5 hover:text-gold-300 transition-colors"
            >
              <Mail size={12} />
              <span>{SCHOOL_INFO.email}</span>
            </a>
          </div>
          <div className="flex items-center gap-4">
            <Link
              href="/admin/login"
              className="hover:text-gold-300 transition-colors font-medium tracking-wide"
            >
              Admin
            </Link>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <header
        className={`sticky top-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-white/95 backdrop-blur-md shadow-[0_1px_0_rgba(0,0,0,0.08)]"
            : "bg-white"
        }`}
      >
        <div className="container-wide flex items-center justify-between h-18 lg:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 bg-navy-800 flex items-center justify-center">
              <GraduationCap className="text-gold-300" size={22} />
            </div>
            <div>
              <span className="font-serif text-lg font-bold text-navy-800 tracking-tight block leading-none">
                TRIPLE M
              </span>
              <span className="text-[10px] font-sans font-medium uppercase tracking-[0.25em] text-navy-500 leading-none">
                Public School
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`
                    relative px-4 py-2 font-sans text-[13px] font-semibold uppercase tracking-[0.1em] transition-colors duration-200
                    ${
                      item.highlight
                        ? "text-navy-800 bg-gold-300/20 hover:bg-gold-300/30"
                        : isActive
                        ? "text-navy-800"
                        : "text-navy-600 hover:text-navy-800"
                    }
                  `}
                >
                  {item.label}
                  {isActive && !item.highlight && (
                    <motion.div
                      layoutId="nav-underline"
                      className="absolute bottom-0 left-4 right-4 h-[2px] bg-gold-400"
                      transition={{
                        type: "spring",
                        stiffness: 380,
                        damping: 30,
                      }}
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* CTA + Mobile Toggle */}
          <div className="flex items-center gap-4">
            <Link
              href="/admissions"
              className="hidden md:inline-flex btn-primary text-xs py-2.5 px-6"
            >
              Apply Now
            </Link>
            <button
              onClick={() => setMobileOpen(true)}
              className="lg:hidden p-2 text-navy-800"
              aria-label="Open menu"
            >
              <Menu size={24} />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-navy-950/50 z-50 lg:hidden"
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 250 }}
              className="fixed top-0 right-0 bottom-0 w-80 max-w-[85vw] bg-white z-50 lg:hidden flex flex-col"
            >
              <div className="flex items-center justify-between px-6 h-18 border-b border-neutral-100">
                <span className="font-serif text-lg font-bold text-navy-800">
                  Menu
                </span>
                <button
                  onClick={() => setMobileOpen(false)}
                  className="p-2 text-navy-600"
                  aria-label="Close menu"
                >
                  <X size={20} />
                </button>
              </div>
              <nav className="flex-1 overflow-y-auto py-4">
                {navItems.map((item) => {
                  const isActive = pathname === item.href;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`
                        flex items-center justify-between px-6 py-4 text-sm font-semibold uppercase tracking-[0.1em] transition-colors border-l-2
                        ${
                          isActive
                            ? "text-navy-800 border-gold-400 bg-navy-50/50"
                            : "text-navy-600 border-transparent hover:text-navy-800 hover:border-navy-200"
                        }
                      `}
                    >
                      <span>{item.label}</span>
                      <ChevronRight
                        size={14}
                        className={isActive ? "text-gold-400" : "text-navy-300"}
                      />
                    </Link>
                  );
                })}
              </nav>
              <div className="px-6 py-6 border-t border-neutral-100 space-y-3">
                <a
                  href={`tel:${SCHOOL_INFO.phone}`}
                  className="flex items-center gap-2 text-sm text-navy-600"
                >
                  <Phone size={14} />
                  <span>{SCHOOL_INFO.phone}</span>
                </a>
                <a
                  href={`mailto:${SCHOOL_INFO.email}`}
                  className="flex items-center gap-2 text-sm text-navy-600"
                >
                  <Mail size={14} />
                  <span>{SCHOOL_INFO.email}</span>
                </a>
                <Link
                  href="/admissions"
                  className="btn-gold w-full text-center text-xs mt-4"
                >
                  Apply Now
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
