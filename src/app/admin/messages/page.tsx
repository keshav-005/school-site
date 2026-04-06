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
  Mail,
  Clock,
  CheckCircle2,
} from "lucide-react";

interface Message {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  isRead: boolean;
  createdAt: string;
}

const sidebarLinks = [
  { label: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
  { label: "Messages", href: "/admin/messages", icon: MessageSquare },
  { label: "Admissions", href: "/admin/admissions", icon: BookOpen },
  { label: "Faculty", href: "/admin/faculty", icon: Users },
  { label: "Gallery", href: "/admin/gallery", icon: ImageIcon },
];

export default function AdminMessagesPage() {
  const { status } = useSession();
  const router = useRouter();
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [_selected, setSelected] = useState<Message | null>(null);

  useEffect(() => {
    if (status === "unauthenticated") router.push("/admin/login");
  }, [status, router]);

  useEffect(() => {
    // Messages would be fetched from API in production
    setLoading(false);
    setMessages([]);
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
      {/* Sidebar */}
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
                link.href === "/admin/messages"
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

      <main className="flex-1 p-8">
        <div className="mb-8">
          <h1 className="font-serif text-2xl text-navy-800">Contact Messages</h1>
          <p className="text-sm text-navy-400 mt-1">
            Messages submitted through the contact form.
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <Loader2 size={32} className="text-navy-300 animate-spin" />
          </div>
        ) : messages.length === 0 ? (
          <div className="bg-white border border-neutral-200 p-12 text-center">
            <Mail size={40} className="text-navy-200 mx-auto mb-4" />
            <h3 className="font-serif text-lg text-navy-800 mb-2">No messages yet</h3>
            <p className="text-sm text-navy-400">
              Contact form submissions will appear here once your MongoDB database is connected.
            </p>
          </div>
        ) : (
          <div className="bg-white border border-neutral-200">
            <table className="w-full">
              <thead>
                <tr className="border-b border-neutral-100">
                  <th className="text-left px-6 py-3 text-xs font-sans font-semibold uppercase tracking-[0.15em] text-navy-400">Status</th>
                  <th className="text-left px-6 py-3 text-xs font-sans font-semibold uppercase tracking-[0.15em] text-navy-400">Name</th>
                  <th className="text-left px-6 py-3 text-xs font-sans font-semibold uppercase tracking-[0.15em] text-navy-400">Subject</th>
                  <th className="text-left px-6 py-3 text-xs font-sans font-semibold uppercase tracking-[0.15em] text-navy-400">Date</th>
                  <th className="text-left px-6 py-3 text-xs font-sans font-semibold uppercase tracking-[0.15em] text-navy-400">Action</th>
                </tr>
              </thead>
              <tbody>
                {messages.map((msg) => (
                  <tr key={msg._id} className="border-b border-neutral-50 hover:bg-neutral-50">
                    <td className="px-6 py-4">
                      {msg.isRead ? (
                        <CheckCircle2 size={16} className="text-emerald-500" />
                      ) : (
                        <Clock size={16} className="text-amber-500" />
                      )}
                    </td>
                    <td className="px-6 py-4 text-sm text-navy-800 font-medium">{msg.name}</td>
                    <td className="px-6 py-4 text-sm text-navy-500">{msg.subject}</td>
                    <td className="px-6 py-4 text-sm text-navy-400">
                      {new Date(msg.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => setSelected(msg)}
                        className="text-xs font-semibold text-navy-600 uppercase tracking-wide hover:text-navy-800"
                      >
                        View
                      </button>
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
