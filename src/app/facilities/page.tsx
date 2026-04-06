"use client";

import { ScrollReveal, SectionHeading, PageHero } from "@/components/shared";
import {
  Bus,
  Monitor,
  FlaskConical,
  ShieldCheck,
  MessageSquare,
  Cctv,
  BookOpen,
  ClipboardCheck,
  MapPin,
} from "lucide-react";
import { SCHOOL_INFO } from "@/lib/utils";

const facilities = [
  {
    icon: Bus,
    title: "Transport Network",
    desc: "16 daily bus routes covering all major towns around Hoshiarpur. Our fleet ensures students from Talwara to Phagwara can access quality education without commute being a barrier.",
    image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=800&q=80",
  },
  {
    icon: Monitor,
    title: "Smart Classrooms",
    desc: "Every classroom is equipped with digital boards and audio-visual systems. Teachers use these daily — not as a novelty, but as a standard teaching tool for diagrams, videos, and interactive lessons.",
    image: "https://images.unsplash.com/photo-1580537659466-0a9bfa916a54?w=800&q=80",
  },
  {
    icon: FlaskConical,
    title: "Science Laboratories",
    desc: "Purpose-built Physics, Chemistry, and Biology labs with full equipment. Students perform experiments hands-on as part of the regular curriculum, not just before exams.",
    image: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=800&q=80",
  },
  {
    icon: ShieldCheck,
    title: "Secure Campus",
    desc: "Controlled main gate with staff. Visitor logs. Clear emergency protocols. The campus is designed so parents don't need to worry during school hours.",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=800&q=80",
  },
  {
    icon: MessageSquare,
    title: "Parent SMS Alerts",
    desc: "Daily attendance updates, exam results, fee reminders, and school announcements — all sent directly to parents via SMS. No missed communication.",
    image: "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=800&q=80",
  },
  {
    icon: Cctv,
    title: "CCTV Surveillance",
    desc: "Cameras in every classroom, corridor, and common area. Footage is monitored and stored. Full transparency, full accountability — for everyone.",
    image: "https://images.unsplash.com/photo-1557597774-9d273605dfa9?w=800&q=80",
  },
  {
    icon: BookOpen,
    title: "Library",
    desc: "A well-stocked library with textbooks, reference books, and periodicals. Students have daily access during library periods and after school hours.",
    image: "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?w=800&q=80",
  },
  {
    icon: ClipboardCheck,
    title: "Online Tests",
    desc: "Regular online assessments complement classroom teaching. Students get familiar with computer-based testing formats used in competitive exams.",
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&q=80",
  },
];

export default function FacilitiesPage() {
  return (
    <>
      <PageHero
        title="Facilities"
        subtitle="What we have. What we use. What matters."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Facilities" },
        ]}
      />

      {/* Facilities List */}
      <section className="bg-white">
        {facilities.map((facility, i) => (
          <div
            key={facility.title}
            className={`border-b border-neutral-100 ${
              i % 2 === 0 ? "" : "bg-cream"
            }`}
          >
            <div className="container-wide">
              <ScrollReveal>
                <div
                  className={`grid grid-cols-1 lg:grid-cols-2 gap-0 items-stretch ${
                    i % 2 !== 0 ? "lg:direction-rtl" : ""
                  }`}
                >
                  <div
                    className={`py-12 md:py-20 pr-0 lg:pr-16 flex flex-col justify-center ${
                      i % 2 !== 0 ? "lg:order-2 lg:pl-16 lg:pr-0" : ""
                    }`}
                  >
                    <facility.icon
                      size={32}
                      className="text-gold-400 mb-5"
                      strokeWidth={1.5}
                    />
                    <h2 className="font-serif text-heading-lg text-navy-800 mb-4">
                      {facility.title}
                    </h2>
                    <p className="text-navy-500 leading-relaxed text-[15px]">
                      {facility.desc}
                    </p>
                  </div>
                  <div
                    className={`aspect-[16/10] lg:aspect-auto overflow-hidden ${
                      i % 2 !== 0 ? "lg:order-1" : ""
                    }`}
                  >
                    <img
                      src={facility.image}
                      alt={facility.title}
                      className="img-editorial h-full"
                    />
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </div>
        ))}
      </section>

      {/* Transport Routes */}
      <section className="section bg-navy-800">
        <div className="container-wide">
          <ScrollReveal>
            <SectionHeading
              label="Transport Coverage"
              title="16 routes. Every major town."
              description="Our bus network covers all key areas around Hoshiarpur so distance is never the reason for missing school."
              dark
              align="center"
            />
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <div className="max-w-4xl mx-auto">
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-px bg-white/10">
                {SCHOOL_INFO.transportRoutes.map((route) => (
                  <div
                    key={route}
                    className="bg-navy-800 p-5 flex items-center gap-3 group hover:bg-navy-700 transition-colors"
                  >
                    <MapPin
                      size={14}
                      className="text-gold-400 shrink-0"
                    />
                    <span className="text-sm text-white/70 group-hover:text-white transition-colors">
                      {route}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
