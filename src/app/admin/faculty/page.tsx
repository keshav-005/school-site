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
  Plus,
  Trash2,
  Edit2,
  X,
  Check,
} from "lucide-react";

const sidebarLinks = [
  { label: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
  { label: "Messages", href: "/admin/messages", icon: MessageSquare },
  { label: "Admissions", href: "/admin/admissions", icon: BookOpen },
  { label: "Faculty", href: "/admin/faculty", icon: Users },
  { label: "Gallery", href: "/admin/gallery", icon: ImageIcon },
];

const departments = ["Medical", "Non-Medical", "Arts", "Commerce", "General"];

export default function AdminFacultyPage() {
  const { status } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [faculty, setFaculty] = useState<any[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [formLoading, setFormLoading] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState({
    name: "",
    department: "",
    subject: "",
    qualifications: "",
    photoUrl: "",
    order: 0,
  });
  const [filterDept, setFilterDept] = useState("All");

  useEffect(() => {
    if (status === "unauthenticated") router.push("/admin/login");
  }, [status, router]);

  useEffect(() => {
    async function fetchFaculty() {
      try {
        const res = await fetch("/api/faculty");
        const data = await res.json();
        setFaculty(data.faculty || []);
      } catch {
        setFaculty([]);
      } finally {
        setLoading(false);
      }
    }
    if (status === "authenticated") fetchFaculty();
  }, [status]);

  async function handleAdd(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setFormLoading(true);
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form));

    try {
      const res = await fetch("/api/faculty", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.name,
          department: data.department,
          subject: data.subject,
          qualifications: data.qualifications || "",
          photoUrl: data.photoUrl || "",
          order: parseInt(data.order as string) || 0,
          isActive: true,
        }),
      });

      if (res.ok) {
        const result = await res.json();
        setFaculty((prev) => [...prev, result.faculty]);
        setShowForm(false);
        form.reset();
      }
    } catch (err) {
      console.error(err);
    } finally {
      setFormLoading(false);
    }
  }

  function startEdit(f: any) {
    setEditingId(f._id);
    setEditForm({
      name: f.name,
      department: f.department,
      subject: f.subject,
      qualifications: f.qualifications || "",
      photoUrl: f.photoUrl || "",
      order: f.order || 0,
    });
  }

  async function handleUpdate() {
    if (!editingId) return;
    setFormLoading(true);
    try {
      const res = await fetch("/api/faculty", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: editingId, ...editForm }),
      });
      if (res.ok) {
        const result = await res.json();
        setFaculty((prev) =>
          prev.map((f) => (f._id === editingId ? result.faculty : f))
        );
        setEditingId(null);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setFormLoading(false);
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Remove this faculty member?")) return;
    try {
      const res = await fetch(`/api/faculty?id=${id}`, { method: "DELETE" });
      if (res.ok) {
        setFaculty((prev) => prev.filter((f) => f._id !== id));
      }
    } catch (err) {
      console.error(err);
    }
  }

  const filtered =
    filterDept === "All"
      ? faculty
      : faculty.filter((f) => f.department === filterDept);

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
                link.href === "/admin/faculty"
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
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="font-serif text-2xl text-navy-800">Faculty Management</h1>
            <p className="text-sm text-navy-400 mt-1">
              {faculty.length} member{faculty.length !== 1 ? "s" : ""} — add, edit, or remove faculty.
            </p>
          </div>
          <button
            onClick={() => setShowForm(!showForm)}
            className="btn-primary text-xs py-2.5 px-5"
          >
            <Plus size={16} className="mr-2" />
            Add Faculty
          </button>
        </div>

        {/* Department Filter */}
        <div className="flex gap-2 mb-6 flex-wrap">
          {["All", ...departments].map((dept) => (
            <button
              key={dept}
              onClick={() => setFilterDept(dept)}
              className={`px-4 py-2 text-xs font-semibold uppercase tracking-wider transition-colors ${
                filterDept === dept
                  ? "bg-navy-800 text-white"
                  : "bg-white text-navy-500 border border-neutral-200 hover:border-navy-300"
              }`}
            >
              {dept}
            </button>
          ))}
        </div>

        {/* Add Form */}
        {showForm && (
          <div className="bg-white border border-neutral-200 p-6 mb-6">
            <h3 className="font-serif text-lg text-navy-800 mb-4">Add New Faculty Member</h3>
            <form onSubmit={handleAdd} className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                name="name"
                required
                placeholder="Full Name"
                className="px-4 py-3 bg-neutral-50 border border-neutral-200 text-sm"
              />
              <select
                name="department"
                required
                className="px-4 py-3 bg-neutral-50 border border-neutral-200 text-sm"
              >
                <option value="">Department</option>
                {departments.map((d) => (
                  <option key={d} value={d}>{d}</option>
                ))}
              </select>
              <input
                name="subject"
                required
                placeholder="Subject / Designation"
                className="px-4 py-3 bg-neutral-50 border border-neutral-200 text-sm"
              />
              <input
                name="qualifications"
                placeholder="Qualifications (e.g. M.Sc., B.Ed.)"
                className="px-4 py-3 bg-neutral-50 border border-neutral-200 text-sm"
              />
              <input
                name="photoUrl"
                placeholder="Photo URL (optional)"
                className="px-4 py-3 bg-neutral-50 border border-neutral-200 text-sm"
              />
              <input
                name="order"
                type="number"
                placeholder="Display Order"
                defaultValue="0"
                className="px-4 py-3 bg-neutral-50 border border-neutral-200 text-sm"
              />
              <div className="md:col-span-2 flex gap-3">
                <button
                  type="submit"
                  disabled={formLoading}
                  className="btn-primary text-xs py-2.5 disabled:opacity-50"
                >
                  {formLoading ? "Adding..." : "Add Faculty Member"}
                </button>
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="btn-outline text-xs py-2.5"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Edit Modal */}
        {editingId && (
          <div className="fixed inset-0 bg-navy-950/60 z-50 flex items-center justify-center p-4">
            <div className="bg-white w-full max-w-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-serif text-lg text-navy-800">Edit Faculty Member</h3>
                <button
                  onClick={() => setEditingId(null)}
                  className="p-1.5 hover:bg-neutral-100 transition-colors"
                >
                  <X size={18} />
                </button>
              </div>

              {editForm.photoUrl && (
                <div className="w-20 h-20 bg-neutral-100 mb-4 overflow-hidden mx-auto">
                  <img
                    src={editForm.photoUrl}
                    alt={editForm.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}

              <div className="space-y-3">
                <div>
                  <label className="text-[10px] font-semibold uppercase tracking-wider text-navy-400 block mb-1">Name</label>
                  <input
                    value={editForm.name}
                    onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                    className="w-full px-4 py-3 bg-neutral-50 border border-neutral-200 text-sm"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[10px] font-semibold uppercase tracking-wider text-navy-400 block mb-1">Department</label>
                    <select
                      value={editForm.department}
                      onChange={(e) => setEditForm({ ...editForm, department: e.target.value })}
                      className="w-full px-4 py-3 bg-neutral-50 border border-neutral-200 text-sm"
                    >
                      {departments.map((d) => (
                        <option key={d} value={d}>{d}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="text-[10px] font-semibold uppercase tracking-wider text-navy-400 block mb-1">Subject</label>
                    <input
                      value={editForm.subject}
                      onChange={(e) => setEditForm({ ...editForm, subject: e.target.value })}
                      className="w-full px-4 py-3 bg-neutral-50 border border-neutral-200 text-sm"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-[10px] font-semibold uppercase tracking-wider text-navy-400 block mb-1">Qualifications</label>
                  <input
                    value={editForm.qualifications}
                    onChange={(e) => setEditForm({ ...editForm, qualifications: e.target.value })}
                    className="w-full px-4 py-3 bg-neutral-50 border border-neutral-200 text-sm"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-semibold uppercase tracking-wider text-navy-400 block mb-1">Photo URL</label>
                  <input
                    value={editForm.photoUrl}
                    onChange={(e) => setEditForm({ ...editForm, photoUrl: e.target.value })}
                    className="w-full px-4 py-3 bg-neutral-50 border border-neutral-200 text-sm"
                    placeholder="Paste new URL to replace photo"
                  />
                </div>
              </div>

              <div className="flex gap-3 mt-6">
                <button
                  onClick={handleUpdate}
                  disabled={formLoading}
                  className="btn-primary text-xs py-2.5 flex-1 disabled:opacity-50"
                >
                  <Check size={14} className="mr-2" />
                  {formLoading ? "Saving..." : "Save Changes"}
                </button>
                <button
                  onClick={() => setEditingId(null)}
                  className="btn-outline text-xs py-2.5"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Faculty Grid */}
        {loading ? (
          <div className="flex justify-center py-20">
            <Loader2 size={32} className="text-navy-300 animate-spin" />
          </div>
        ) : filtered.length === 0 ? (
          <div className="bg-white border border-neutral-200 p-12 text-center">
            <Users size={40} className="text-navy-200 mx-auto mb-4" />
            <h3 className="font-serif text-lg text-navy-800 mb-2">No faculty found</h3>
            <p className="text-sm text-navy-400">
              {filterDept !== "All"
                ? `No faculty in "${filterDept}" department.`
                : 'Click "Add Faculty" to add members.'}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filtered.map((f: any) => (
              <div key={f._id} className="bg-white border border-neutral-200 overflow-hidden group">
                {/* Photo */}
                <div className="aspect-square bg-neutral-100 relative overflow-hidden">
                  {f.photoUrl ? (
                    <img src={f.photoUrl} alt={f.name} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-navy-800">
                      <span className="text-4xl font-serif font-bold text-gold-300 select-none">
                        {f.name.replace(/^(Mr\.|Mrs\.|Ms\.|Dr\.|Prof\.)\s*/i, "").split(" ").map((w: string) => w[0]).filter(Boolean).slice(0, 2).join("")}
                      </span>
                    </div>
                  )}
                  {/* Action buttons on hover */}
                  <div className="absolute inset-0 bg-navy-950/0 group-hover:bg-navy-950/50 transition-all flex items-center justify-center gap-2">
                    <button
                      onClick={() => startEdit(f)}
                      className="opacity-0 group-hover:opacity-100 p-2.5 bg-white text-navy-800 hover:bg-gold-400 transition-all"
                      title="Edit member"
                    >
                      <Edit2 size={16} />
                    </button>
                    <button
                      onClick={() => handleDelete(f._id)}
                      className="opacity-0 group-hover:opacity-100 p-2.5 bg-white text-red-500 hover:bg-red-500 hover:text-white transition-all"
                      title="Delete member"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
                {/* Info */}
                <div className="p-4">
                  <h4 className="font-serif text-base text-navy-800 leading-tight">{f.name}</h4>
                  <p className="text-sm text-navy-500 mt-0.5">{f.subject}</p>
                  {f.qualifications && (
                    <p className="text-xs text-navy-400 mt-1">{f.qualifications}</p>
                  )}
                  <span className="inline-block mt-2 text-[10px] font-semibold uppercase tracking-wider text-gold-500 bg-gold-50 px-2 py-0.5">
                    {f.department}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
