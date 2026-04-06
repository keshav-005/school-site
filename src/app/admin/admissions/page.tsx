"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
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
  UserCheck,
} from "lucide-react";

const sidebarLinks = [
  { label: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
  { label: "Messages", href: "/admin/messages", icon: MessageSquare },
  { label: "Admissions", href: "/admin/admissions", icon: BookOpen },
  { label: "Faculty", href: "/admin/faculty", icon: Users },
  { label: "Gallery", href: "/admin/gallery", icon: ImageIcon },
];

const statusColors: Record<string, string> = {
  new: "bg-blue-100 text-blue-700",
  reviewed: "bg-amber-100 text-amber-700",
  contacted: "bg-purple-100 text-purple-700",
  enrolled: "bg-emerald-100 text-emerald-700",
  rejected: "bg-red-100 text-red-700",
};

export default function AdminAdmissionsPage() {
  const { status } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [inquiries, setInquiries] = useState<any[]>([]);

  useEffect(() => {
    if (status === "unauthenticated") router.push("/admin/login");
  }, [status, router]);

  useEffect(() => {
    setLoading(false);
    setInquiries([]);
  }, []);

  if (status === "loading" || status === "unauthenticated") {
    return (
      <div className="min-h-screen bg-navy-950 flex items-center justify-center">
        <Loader2 size={32} className="text-gold-400 animate-spin" />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-neutral-50">
      <aside className="w-64 bg-navy-900 min-h-screen flex flex-col shrink-0">
        <div className="p-6 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-gold-400 flex items-center justify-center">
              <GraduationCap className="text-navy-900" size={18} />
            </div>
            <div>
              <span className="font-serif text-sm font-bold text-white block leading-none">TRIPLE M</span>
              <span className="text-[9px] font-sans uppercase tracking-[0.2em] text-gold-300">Admin Panel</span>
            </div>
          </div>
        </div>
        <nav className="flex-1 py-4">
          {sidebarLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`flex items-center gap-3 px-6 py-3 text-sm transition-colors ${
                link.href === "/admin/admissions"
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
          <button onClick={() => signOut({ callbackUrl: "/admin/login" })} className="flex items-center gap-3 px-2 py-2 text-sm text-white/40 hover:text-white transition-colors w-full">
            <LogOut size={18} /><span>Sign Out</span>
          </button>
        </div>
      </aside>

      <main className="flex-1 p-8">
        <div className="mb-8">
          <h1 className="font-serif text-2xl text-navy-800">Admission Inquiries</h1>
          <p className="text-sm text-navy-400 mt-1">Manage admission applications and track their status.</p>
        </div>

        {/* Filter tabs */}
        <div className="flex flex-wrap gap-2 mb-6">
          {["All", "new", "reviewed", "contacted", "enrolled", "rejected"].map((s) => (
            <button
              key={s}
              className="px-4 py-2 text-xs font-sans font-semibold uppercase tracking-[0.12em] bg-white border border-neutral-200 text-navy-500 hover:bg-neutral-50 transition-colors"
            >
              {s === "All" ? "All" : s.charAt(0).toUpperCase() + s.slice(1)}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <Loader2 size={32} className="text-navy-300 animate-spin" />
          </div>
        ) : inquiries.length === 0 ? (
          <div className="bg-white border border-neutral-200 p-12 text-center">
            <UserCheck size={40} className="text-navy-200 mx-auto mb-4" />
            <h3 className="font-serif text-lg text-navy-800 mb-2">No inquiries yet</h3>
            <p className="text-sm text-navy-400">
              Admission form submissions will appear here once your MongoDB database is connected.
            </p>
          </div>
        ) : (
          <div className="bg-white border border-neutral-200 overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-neutral-100">
                  <th className="text-left px-6 py-3 text-xs font-sans font-semibold uppercase tracking-[0.15em] text-navy-400">Student</th>
                  <th className="text-left px-6 py-3 text-xs font-sans font-semibold uppercase tracking-[0.15em] text-navy-400">Class</th>
                  <th className="text-left px-6 py-3 text-xs font-sans font-semibold uppercase tracking-[0.15em] text-navy-400">Parent</th>
                  <th className="text-left px-6 py-3 text-xs font-sans font-semibold uppercase tracking-[0.15em] text-navy-400">Phone</th>
                  <th className="text-left px-6 py-3 text-xs font-sans font-semibold uppercase tracking-[0.15em] text-navy-400">Status</th>
                  <th className="text-left px-6 py-3 text-xs font-sans font-semibold uppercase tracking-[0.15em] text-navy-400">Date</th>
                </tr>
              </thead>
              <tbody>
                {inquiries.map((inq: any) => (
                  <tr key={inq._id} className="border-b border-neutral-50 hover:bg-neutral-50">
                    <td className="px-6 py-4 text-sm text-navy-800 font-medium">{inq.studentName}</td>
                    <td className="px-6 py-4 text-sm text-navy-500">{inq.classApplying}</td>
                    <td className="px-6 py-4 text-sm text-navy-500">{inq.parentName}</td>
                    <td className="px-6 py-4 text-sm text-navy-500">{inq.parentPhone}</td>
                    <td className="px-6 py-4">
                      <span className={`text-[10px] font-semibold uppercase tracking-wider px-2 py-1 ${statusColors[inq.status] || ""}`}>
                        {inq.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-navy-400">
                      {new Date(inq.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </div>
  );
}
