"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { signOut } from "next-auth/react";
import type { GalleryImage } from "@/lib/types";
import {
  GraduationCap,
  LayoutDashboard,
  Users,
  Image as ImageIcon,
  MessageSquare,
  BookOpen,
  LogOut,
  Loader2,
  Upload,
  Trash2,
  RefreshCw,
  X,
  Check,
  Edit2,
} from "lucide-react";

const sidebarLinks = [
  { label: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
  { label: "Messages", href: "/admin/messages", icon: MessageSquare },
  { label: "Admissions", href: "/admin/admissions", icon: BookOpen },
  { label: "Faculty", href: "/admin/faculty", icon: Users },
  { label: "Gallery", href: "/admin/gallery", icon: ImageIcon },
];

const categories = ["Events", "Sports", "Academics", "Campus", "Other"];

export default function AdminGalleryPage() {
  const { status } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [images, setImages] = useState<any[]>([]);
  const [showUploadForm, setShowUploadForm] = useState(false);
  const [formLoading, setFormLoading] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState({ url: "", caption: "", category: "" });
  const [filterCategory, setFilterCategory] = useState("All");

  useEffect(() => {
    if (status === "unauthenticated") router.push("/admin/login");
  }, [status, router]);

  useEffect(() => {
    async function fetchImages() {
      try {
        const res = await fetch("/api/gallery");
        const data = await res.json();
        setImages(data.images || []);
      } catch {
        setImages([]);
      } finally {
        setLoading(false);
      }
    }
    if (status === "authenticated") fetchImages();
  }, [status]);

  async function handleUpload(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setFormLoading(true);
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form));

    try {
      const res = await fetch("/api/gallery", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          url: data.url,
          publicId: `manual-${Date.now()}`,
          category: data.category,
          caption: data.caption || "",
        }),
      });

      if (res.ok) {
        const result = await res.json();
        setImages((prev) => [result.image, ...prev]);
        setShowUploadForm(false);
        form.reset();
      }
    } catch (err) {
      console.error(err);
    } finally {
      setFormLoading(false);
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this image?")) return;
    try {
      const res = await fetch(`/api/gallery?id=${id}`, { method: "DELETE" });
      if (res.ok) {
        setImages((prev) => prev.filter((img) => img._id !== id));
      }
    } catch (err) {
      console.error(err);
    }
  }

  function startEdit(img: GalleryImage) {
    setEditingId(img._id);
    setEditForm({ url: img.url, caption: img.caption || "", category: img.category });
  }

  async function handleReplace() {
    if (!editingId) return;
    setFormLoading(true);
    try {
      const res = await fetch("/api/gallery", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: editingId,
          url: editForm.url,
          caption: editForm.caption,
          category: editForm.category,
        }),
      });

      if (res.ok) {
        const result = await res.json();
        setImages((prev) =>
          prev.map((img) => (img._id === editingId ? result.image : img))
        );
        setEditingId(null);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setFormLoading(false);
    }
  }

  const filtered =
    filterCategory === "All"
      ? images
      : images.filter((img) => img.category === filterCategory);

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
                link.href === "/admin/gallery"
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
            <h1 className="font-serif text-2xl text-navy-800">Gallery Management</h1>
            <p className="text-sm text-navy-400 mt-1">
              {images.length} image{images.length !== 1 ? "s" : ""} — click edit to replace any image.
            </p>
          </div>
          <button
            onClick={() => setShowUploadForm(!showUploadForm)}
            className="btn-primary text-xs py-2.5 px-5"
          >
            <Upload size={16} className="mr-2" />
            Add Image
          </button>
        </div>

        {/* Category Filter */}
        <div className="flex gap-2 mb-6 flex-wrap">
          {["All", ...categories].map((cat) => (
            <button
              key={cat}
              onClick={() => setFilterCategory(cat)}
              className={`px-4 py-2 text-xs font-semibold uppercase tracking-wider transition-colors ${
                filterCategory === cat
                  ? "bg-navy-800 text-white"
                  : "bg-white text-navy-500 border border-neutral-200 hover:border-navy-300"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Upload Form */}
        {showUploadForm && (
          <div className="bg-white border border-neutral-200 p-6 mb-6">
            <h3 className="font-serif text-lg text-navy-800 mb-4">Add New Image</h3>
            <form onSubmit={handleUpload} className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                name="url"
                required
                placeholder="Image URL"
                className="px-4 py-3 bg-neutral-50 border border-neutral-200 text-sm md:col-span-2"
              />
              <select
                name="category"
                required
                className="px-4 py-3 bg-neutral-50 border border-neutral-200 text-sm"
              >
                <option value="">Select Category</option>
                {categories.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
              <input
                name="caption"
                placeholder="Caption (optional)"
                className="px-4 py-3 bg-neutral-50 border border-neutral-200 text-sm"
              />
              <div className="md:col-span-2 flex gap-3">
                <button
                  type="submit"
                  disabled={formLoading}
                  className="btn-primary text-xs py-2.5 disabled:opacity-50"
                >
                  {formLoading ? "Adding..." : "Add Image"}
                </button>
                <button
                  type="button"
                  onClick={() => setShowUploadForm(false)}
                  className="btn-outline text-xs py-2.5"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Edit/Replace Modal */}
        {editingId && (
          <div className="fixed inset-0 bg-navy-950/60 z-50 flex items-center justify-center p-4">
            <div className="bg-white w-full max-w-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-serif text-lg text-navy-800">
                  <RefreshCw size={18} className="inline mr-2" />
                  Replace Image
                </h3>
                <button onClick={() => setEditingId(null)} className="p-1.5 hover:bg-neutral-100 transition-colors">
                  <X size={18} />
                </button>
              </div>

              {/* Preview */}
              <div className="aspect-video bg-neutral-100 mb-4 overflow-hidden">
                <img src={editForm.url} alt="Preview" className="w-full h-full object-cover" />
              </div>

              <div className="space-y-3">
                <div>
                  <label className="text-[10px] font-semibold uppercase tracking-wider text-navy-400 block mb-1">
                    Image URL
                  </label>
                  <input
                    value={editForm.url}
                    onChange={(e) => setEditForm({ ...editForm, url: e.target.value })}
                    className="w-full px-4 py-3 bg-neutral-50 border border-neutral-200 text-sm"
                    placeholder="Paste new image URL to replace"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-semibold uppercase tracking-wider text-navy-400 block mb-1">
                    Caption
                  </label>
                  <input
                    value={editForm.caption}
                    onChange={(e) => setEditForm({ ...editForm, caption: e.target.value })}
                    className="w-full px-4 py-3 bg-neutral-50 border border-neutral-200 text-sm"
                    placeholder="Image caption"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-semibold uppercase tracking-wider text-navy-400 block mb-1">
                    Category
                  </label>
                  <select
                    value={editForm.category}
                    onChange={(e) => setEditForm({ ...editForm, category: e.target.value })}
                    className="w-full px-4 py-3 bg-neutral-50 border border-neutral-200 text-sm"
                  >
                    {categories.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="flex gap-3 mt-6">
                <button
                  onClick={handleReplace}
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

        {/* Images Grid */}
        {loading ? (
          <div className="flex justify-center py-20">
            <Loader2 size={32} className="text-navy-300 animate-spin" />
          </div>
        ) : filtered.length === 0 ? (
          <div className="bg-white border border-neutral-200 p-12 text-center">
            <ImageIcon size={40} className="text-navy-200 mx-auto mb-4" />
            <h3 className="font-serif text-lg text-navy-800 mb-2">No images found</h3>
            <p className="text-sm text-navy-400">
              {filterCategory !== "All"
                ? `No images in "${filterCategory}" category.`
                : "Upload images to populate the gallery."}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filtered.map((img: GalleryImage) => (
              <div
                key={img._id}
                className="relative group bg-neutral-100 aspect-square overflow-hidden"
              >
                <img src={img.url} alt={img.caption || ""} className="w-full h-full object-cover" />
                {/* Hover overlay with actions */}
                <div className="absolute inset-0 bg-navy-950/0 group-hover:bg-navy-950/60 transition-all duration-200 flex items-center justify-center gap-2">
                  <button
                    onClick={() => startEdit(img)}
                    className="opacity-0 group-hover:opacity-100 p-2.5 bg-white text-navy-800 hover:bg-gold-400 transition-all"
                    title="Replace image"
                  >
                    <Edit2 size={16} />
                  </button>
                  <button
                    onClick={() => handleDelete(img._id)}
                    className="opacity-0 group-hover:opacity-100 p-2.5 bg-white text-red-500 hover:bg-red-500 hover:text-white transition-all"
                    title="Delete image"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
                {/* Bottom info bar */}
                <div className="absolute bottom-0 left-0 right-0 p-2 bg-white/90">
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-gold-500 block">
                    {img.category}
                  </span>
                  {img.caption && (
                    <span className="text-[11px] text-navy-600 leading-tight block truncate">
                      {img.caption}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
