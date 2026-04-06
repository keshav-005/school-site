"use client";

import { useState, useEffect } from "react";
import { ScrollReveal, PageHero } from "@/components/shared";

const departments = ["All", "Medical", "Non-Medical", "Commerce", "General"];

export default function FacultyPage() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [faculty, setFaculty] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadFaculty() {
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
    loadFaculty();
  }, []);

  const filtered =
    activeFilter === "All"
      ? faculty
      : faculty.filter((f: any) => f.department === activeFilter);

  return (
    <>
      <PageHero
        title="Faculty"
        subtitle="The teachers here were chosen for their classrooms, not their CVs."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Faculty" },
        ]}
      />

      <section className="section bg-white">
        <div className="container-wide">
          {/* Filter Tabs */}
          <ScrollReveal>
            <div className="flex flex-wrap gap-2 mb-12 md:mb-16">
              {departments.map((dept) => (
                <button
                  key={dept}
                  onClick={() => setActiveFilter(dept)}
                  className={`px-5 py-2.5 text-xs font-sans font-semibold uppercase tracking-[0.15em] transition-all duration-200 ${
                    activeFilter === dept
                      ? "bg-navy-800 text-white"
                      : "bg-neutral-100 text-navy-500 hover:bg-neutral-200"
                  }`}
                >
                  {dept}
                </button>
              ))}
            </div>
          </ScrollReveal>

          {/* Loading */}
          {loading ? (
            <div className="flex justify-center py-20">
              <div className="w-8 h-8 border-2 border-navy-200 border-t-navy-800 rounded-full animate-spin" />
            </div>
          ) : (
            <>
              {/* Faculty Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-neutral-200">
                {filtered.map((person: any, i: number) => (
                  <ScrollReveal key={person._id || person.name} delay={i * 0.06}>
                    <div className="bg-white group">
                      <div className="aspect-[3/4] overflow-hidden bg-neutral-100">
                        {person.photoUrl ? (
                          <img
                            src={person.photoUrl}
                            alt={person.name}
                            className="img-editorial group-hover:scale-105 transition-transform duration-700"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center bg-navy-800">
                            <span className="text-5xl font-serif font-bold text-gold-300 select-none">
                              {person.name
                                .replace(/^(Mr\.|Mrs\.|Ms\.|Dr\.|Prof\.)\s*/i, "")
                                .split(" ")
                                .map((w: string) => w[0])
                                .filter(Boolean)
                                .slice(0, 2)
                                .join("")}
                            </span>
                          </div>
                        )}
                      </div>
                      <div className="p-5 md:p-6">
                        <h3 className="font-serif text-lg text-navy-800">
                          {person.name}
                        </h3>
                        <p className="text-sm text-navy-500 mt-1">
                          {person.subject}
                        </p>
                        {person.qualifications && (
                          <p className="text-xs text-navy-400 mt-1">
                            {person.qualifications}
                          </p>
                        )}
                        <span className="inline-block mt-3 text-[10px] font-sans font-semibold uppercase tracking-[0.2em] text-gold-500 bg-gold-50 px-2 py-1">
                          {person.department}
                        </span>
                      </div>
                    </div>
                  </ScrollReveal>
                ))}
              </div>

              {filtered.length === 0 && (
                <div className="text-center py-20">
                  <p className="text-navy-400">No faculty found in this department.</p>
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </>
  );
}
