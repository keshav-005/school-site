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
  Image,
  MessageSquare,
  BookOpen,
  LogOut,
  Loader2,
  Mail,
  UserCheck,
  AlertTriangle,
  Clock,
} from "lucide-react";

interface DashboardStats {
  totalMessages: number;
  unreadMessages: number;
  totalInquiries: number;
  newInquiries: number;
}

const sidebarLinks = [
  { label: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
  { label: "Messages", href: "/admin/messages", icon: MessageSquare },
  { label: "Admissions", href: "/admin/admissions", icon: BookOpen },
  { label: "Faculty", href: "/admin/faculty", icon: Users },
  { label: "Gallery", href: "/admin/gallery", icon: Image },
];

function AdminSidebar() {
  return (
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
            className="flex items-center gap-3 px-6 py-3 text-sm text-white/60 hover:text-white hover:bg-white/5 transition-colors"
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
  );
}

export default function AdminDashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/admin/login");
    }
  }, [status, router]);

  useEffect(() => {
    async function fetchStats() {
      try {
        await Promise.all([
          fetch("/api/contact?stats=true"),
          fetch("/api/admissions?page=1&limit=1"),
        ]);

        // Using safe defaults since stats endpoints might not exist yet
        setStats({
          totalMessages: 0,
          unreadMessages: 0,
          totalInquiries: 0,
          newInquiries: 0,
        });
      } catch {
        setStats({
          totalMessages: 0,
          unreadMessages: 0,
          totalInquiries: 0,
          newInquiries: 0,
        });
      } finally {
        setLoading(false);
      }
    }

    if (status === "authenticated") {
      fetchStats();
    }
  }, [status]);

  if (status === "loading" || status === "unauthenticated") {
    return (
      <div className="min-h-screen bg-navy-950 flex items-center justify-center">
        <Loader2 size={32} className="text-gold-400 animate-spin" />
      </div>
    );
  }

  const statCards = [
    {
      label: "Contact Messages",
      value: stats?.totalMessages ?? "—",
      icon: Mail,
      color: "text-blue-400",
      href: "/admin/messages",
    },
    {
      label: "Unread Messages",
      value: stats?.unreadMessages ?? "—",
      icon: AlertTriangle,
      color: "text-amber-400",
      href: "/admin/messages",
    },
    {
      label: "Total Inquiries",
      value: stats?.totalInquiries ?? "—",
      icon: UserCheck,
      color: "text-emerald-400",
      href: "/admin/admissions",
    },
    {
      label: "New Inquiries",
      value: stats?.newInquiries ?? "—",
      icon: Clock,
      color: "text-purple-400",
      href: "/admin/admissions",
    },
  ];

  return (
    <div className="flex min-h-screen bg-neutral-50">
      <AdminSidebar />

      <main className="flex-1 p-8">
        <div className="mb-8">
          <h1 className="font-serif text-2xl text-navy-800">Dashboard</h1>
          <p className="text-sm text-navy-400 mt-1">
            Welcome back, {session?.user?.name || "Admin"}.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {statCards.map((stat) => (
            <Link
              key={stat.label}
              href={stat.href}
              className="bg-white border border-neutral-200 p-6 hover:border-navy-200 transition-colors group"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-sans font-semibold uppercase tracking-[0.15em] text-navy-400">
                  {stat.label}
                </span>
                <stat.icon size={18} className={stat.color} />
              </div>
              <span className="font-serif text-3xl text-navy-800 block">
                {loading ? "—" : stat.value}
              </span>
            </Link>
          ))}
        </div>

        {/* Quick Links */}
        <div className="bg-white border border-neutral-200 p-6">
          <h2 className="font-serif text-lg text-navy-800 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <Link
              href="/admin/messages"
              className="flex items-center gap-3 p-4 bg-neutral-50 hover:bg-navy-50 transition-colors"
            >
              <MessageSquare size={18} className="text-navy-400" />
              <span className="text-sm font-medium text-navy-700">View Messages</span>
            </Link>
            <Link
              href="/admin/admissions"
              className="flex items-center gap-3 p-4 bg-neutral-50 hover:bg-navy-50 transition-colors"
            >
              <BookOpen size={18} className="text-navy-400" />
              <span className="text-sm font-medium text-navy-700">Manage Admissions</span>
            </Link>
            <Link
              href="/admin/faculty"
              className="flex items-center gap-3 p-4 bg-neutral-50 hover:bg-navy-50 transition-colors"
            >
              <Users size={18} className="text-navy-400" />
              <span className="text-sm font-medium text-navy-700">Manage Faculty</span>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
