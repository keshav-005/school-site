"use client";

import { usePathname } from "next/navigation";
import { ReactNode } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { MessageCircle } from "lucide-react";

export default function LayoutShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith("/admin");

  if (isAdmin) {
    return <>{children}</>;
  }

  return (
    <>
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />

      {/* WhatsApp Floating Button */}
      <a
        href="https://wa.me/919888299600?text=Hello%2C%20I%20am%20interested%20in%20admissions%20at%20Triple%20M%20Public%20School."
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className="fixed bottom-6 right-6 z-50 group"
      >
        <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-30 scale-110" />
        <span className="relative flex items-center gap-2.5 bg-[#25D366] text-white pl-4 pr-5 py-3 rounded-full shadow-xl shadow-[#25D366]/30 hover:shadow-[#25D366]/50 hover:scale-105 transition-all duration-300 font-sans text-sm font-semibold">
          <MessageCircle size={20} fill="white" className="shrink-0" />
          <span className="hidden sm:inline">Enquire Now</span>
        </span>
      </a>
    </>
  );
}
