"use client";

import { useState } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import type { AdmissionInquiry } from "@/lib/types";
import { ADMISSION_STATUSES } from "@/lib/types";
import { Loader2, UserCheck } from "lucide-react";

const STATUS_COLORS: Record<string, string> = {
  new: "bg-blue-100 text-blue-700",
  reviewed: "bg-amber-100 text-amber-700",
  contacted: "bg-purple-100 text-purple-700",
  enrolled: "bg-emerald-100 text-emerald-700",
  rejected: "bg-red-100 text-red-700",
};

const FILTER_OPTIONS = ["All", ...ADMISSION_STATUSES] as const;

function capitalize(s: string): string {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

export default function AdminAdmissionsPage() {
  const [loading] = useState(false);
  const [inquiries] = useState<AdmissionInquiry[]>([]);
  const [activeFilter, setActiveFilter] = useState("All");

  const filtered =
    activeFilter === "All"
      ? inquiries
      : inquiries.filter((inq) => inq.status === activeFilter);

  return (
    <AdminLayout
      title="Admission Inquiries"
      subtitle="Manage admission applications and track their status."
    >
      {/* Filter tabs */}
      <div className="flex flex-wrap gap-2 mb-6">
        {FILTER_OPTIONS.map((s) => (
          <button
            key={s}
            onClick={() => setActiveFilter(s)}
            className={`px-4 py-2 text-xs font-sans font-semibold uppercase tracking-[0.12em] border transition-colors ${
              activeFilter === s
                ? "bg-navy-800 text-white border-navy-800"
                : "bg-white border-neutral-200 text-navy-500 hover:bg-neutral-50"
            }`}
          >
            {s === "All" ? "All" : capitalize(s)}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="flex justify-center py-20">
          <Loader2 size={32} className="text-navy-300 animate-spin" />
        </div>
      ) : filtered.length === 0 ? (
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
                {["Student", "Class", "Parent", "Phone", "Status", "Date"].map((h) => (
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
              {filtered.map((inq) => (
                <tr key={inq._id} className="border-b border-neutral-50 hover:bg-neutral-50">
                  <td className="px-6 py-4 text-sm text-navy-800 font-medium">{inq.studentName}</td>
                  <td className="px-6 py-4 text-sm text-navy-500">{inq.classApplying}</td>
                  <td className="px-6 py-4 text-sm text-navy-500">{inq.parentName}</td>
                  <td className="px-6 py-4 text-sm text-navy-500">{inq.parentPhone}</td>
                  <td className="px-6 py-4">
                    <span className={`text-[10px] font-semibold uppercase tracking-wider px-2 py-1 ${STATUS_COLORS[inq.status] || ""}`}>
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
    </AdminLayout>
  );
}
