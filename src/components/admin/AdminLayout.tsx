"use client";

import { useSession } from "next-auth/react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { signOut } from "next-auth/react";
import {
  GraduationCap,
  LayoutDashboard,
  Users,
  Image as ImageIcon,
  MessageSquare,
  BookOpen,
  LogOut,
  Loader2,
} from "lucide-react";

const sidebarLinks = [
  { label: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
  { label: "Messages", href: "/admin/messages", icon: MessageSquare },
  { label: "Admissions", href: "/admin/admissions", icon: BookOpen },
  { label: "Faculty", href: "/admin/faculty", icon: Users },
  { label: "Gallery", href: "/admin/gallery", icon: ImageIcon },
];

interface AdminLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle?: string;
}

/**
 * Shared admin layout with sidebar, auth guard, and loading state.
 * Eliminates ~50 lines of duplicated code per admin page.
 */
export default function AdminLayout({ children, title, subtitle }: AdminLayoutProps) {
  const { status } = useSession();
  const router = useRouter();
  const pathname = usePathname();

  if (status === "unauthenticated") {
    router.push("/admin/login");
    return null;
  }

  if (status === "loading") {
    return (
      <div className="min-h-screen bg-navy-950 flex items-center justify-center">
        <Loader2 size={32} className="text-gold-400 animate-spin" />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-neutral-50">
      {/* Sidebar */}
      <aside className="w-64 bg-navy-900 min-h-screen flex flex-col shrink-0">
        <div className="p-6 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-gold-400 flex items-center justify-center">
              <GraduationCap className="text-navy-900" size={18} />
            </div>
            <div>
              <span className="font-serif text-sm font-bold text-white block leading-none">
                TRIPLE M
              </span>
              <span className="text-[9px] font-sans uppercase tracking-[0.2em] text-gold-300">
                Admin Panel
              </span>
            </div>
          </div>
        </div>

        <nav className="flex-1 py-4">
          {sidebarLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`flex items-center gap-3 px-6 py-3 text-sm transition-colors ${
                pathname === link.href
                  ? "text-white bg-white/10"
                  : "text-white/60 hover:text-white hover:bg-white/5"
              }`}
            >
              <link.icon size={18} />
              <span>{link.label}</span>
            </Link>
          ))}
        </nav>

        <div className="p-4 border-t border-white/10">
          <button
            onClick={() => signOut({ callbackUrl: "/admin/login" })}
            className="flex items-center gap-3 px-2 py-2 text-sm text-white/40 hover:text-white transition-colors w-full"
          >
            <LogOut size={18} />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        <div className="mb-8">
          <h1 className="font-serif text-2xl text-navy-800">{title}</h1>
          {subtitle && (
            <p className="text-sm text-navy-400 mt-1">{subtitle}</p>
          )}
        </div>
        {children}
      </main>
    </div>
  );
}
