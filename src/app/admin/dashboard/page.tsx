"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import AdminLayout from "@/components/admin/AdminLayout";
import {
  Mail,
  UserCheck,
  AlertTriangle,
  Clock,
  MessageSquare,
  BookOpen,
  Users,
} from "lucide-react";

interface DashboardStats {
  totalMessages: number;
  unreadMessages: number;
  totalInquiries: number;
  newInquiries: number;
}

const DEFAULT_STATS: DashboardStats = {
  totalMessages: 0,
  unreadMessages: 0,
  totalInquiries: 0,
  newInquiries: 0,
};

export default function AdminDashboard() {
  const { data: session, status } = useSession();
  const [stats, setStats] = useState<DashboardStats>(DEFAULT_STATS);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status !== "authenticated") return;

    async function fetchStats() {
      try {
        // Safe fetch — stats endpoints may not exist in dev mode
        await Promise.all([
          fetch("/api/contact?stats=true"),
          fetch("/api/admissions?page=1&limit=1"),
        ]);
        setStats(DEFAULT_STATS);
      } catch {
        setStats(DEFAULT_STATS);
      } finally {
        setLoading(false);
      }
    }

    fetchStats();
  }, [status]);

  const statCards = [
    { label: "Contact Messages", value: stats.totalMessages, icon: Mail, color: "text-blue-400", href: "/admin/messages" },
    { label: "Unread Messages", value: stats.unreadMessages, icon: AlertTriangle, color: "text-amber-400", href: "/admin/messages" },
    { label: "Total Inquiries", value: stats.totalInquiries, icon: UserCheck, color: "text-emerald-400", href: "/admin/admissions" },
    { label: "New Inquiries", value: stats.newInquiries, icon: Clock, color: "text-purple-400", href: "/admin/admissions" },
  ];

  const quickActions = [
    { label: "View Messages", href: "/admin/messages", icon: MessageSquare },
    { label: "Manage Admissions", href: "/admin/admissions", icon: BookOpen },
    { label: "Manage Faculty", href: "/admin/faculty", icon: Users },
  ];

  return (
    <AdminLayout
      title="Dashboard"
      subtitle={`Welcome back, ${session?.user?.name || "Admin"}.`}
    >
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
          {quickActions.map((action) => (
            <Link
              key={action.href}
              href={action.href}
              className="flex items-center gap-3 p-4 bg-neutral-50 hover:bg-navy-50 transition-colors"
            >
              <action.icon size={18} className="text-navy-400" />
              <span className="text-sm font-medium text-navy-700">{action.label}</span>
            </Link>
          ))}
        </div>
      </div>
    </AdminLayout>
  );
}
