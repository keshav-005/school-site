"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { GraduationCap, AlertCircle, Loader2 } from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form));

    try {
      const result = await signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: false,
      });

      if (result?.error) {
        setError("Invalid email or password");
        setLoading(false);
        return;
      }

      router.push("/admin/dashboard");
    } catch {
      setError("Something went wrong. Please try again.");
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-navy-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-10">
          <div className="w-14 h-14 bg-gold-400 flex items-center justify-center mx-auto mb-4">
            <GraduationCap className="text-navy-900" size={28} />
          </div>
          <h1 className="font-serif text-2xl text-white">Admin Panel</h1>
          <p className="text-white/40 text-sm mt-2">Triple M Public School</p>
        </div>

        <div className="bg-white p-8">
          {error && (
            <div className="bg-red-50 border border-red-200 p-4 mb-6 flex items-start gap-3">
              <AlertCircle size={18} className="text-red-500 shrink-0 mt-0.5" />
              <p className="text-sm text-red-700">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-xs font-sans font-semibold uppercase tracking-[0.15em] text-navy-600 mb-2">
                Email
              </label>
              <input
                name="email"
                type="email"
                required
                autoComplete="email"
                className="w-full px-4 py-3 bg-neutral-50 border border-neutral-200 text-sm text-navy-800 focus:outline-none focus:border-navy-400"
                placeholder="admin@triplemschool.in"
              />
            </div>

            <div>
              <label className="block text-xs font-sans font-semibold uppercase tracking-[0.15em] text-navy-600 mb-2">
                Password
              </label>
              <input
                name="password"
                type="password"
                required
                autoComplete="current-password"
                className="w-full px-4 py-3 bg-neutral-50 border border-neutral-200 text-sm text-navy-800 focus:outline-none focus:border-navy-400"
                placeholder="••••••••"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed justify-center"
            >
              {loading ? (
                <>
                  <Loader2 size={16} className="animate-spin mr-2" />
                  Signing in...
                </>
              ) : (
                "Sign In"
              )}
            </button>
          </form>
        </div>

        <p className="text-center text-white/30 text-xs mt-6">
          This panel is for authorized school administrators only.
        </p>
      </div>
    </div>
  );
}
