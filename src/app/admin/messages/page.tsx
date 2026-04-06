"use client";

import { useState } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import type { ContactMessage } from "@/lib/types";
import { Loader2, Mail, Clock, CheckCircle2 } from "lucide-react";

const TABLE_HEADERS = ["Status", "Name", "Subject", "Date", "Action"];

export default function AdminMessagesPage() {
  const [messages] = useState<ContactMessage[]>([]);
  const [loading] = useState(false);
  const [, setSelected] = useState<ContactMessage | null>(null);

  return (
    <AdminLayout
      title="Contact Messages"
      subtitle="Messages submitted through the contact form."
    >
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
                {TABLE_HEADERS.map((h) => (
                  <th
                    key={h}
                    className="text-left px-6 py-3 text-xs font-sans font-semibold uppercase tracking-[0.15em] text-navy-400"
                  >
                    {h}
                  </th>
                ))}
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
    </AdminLayout>
  );
}
