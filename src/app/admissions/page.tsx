"use client";

import { useState } from "react";
import { ScrollReveal, SectionHeading, PageHero } from "@/components/shared";
import {
  FileText,
  Phone,
  CheckCircle2,
  ArrowRight,
  ClipboardList,
  UserCheck,
  MessageCircle,
  BookOpenCheck,
  AlertCircle,
  FlaskConical,
  Calculator,
  TrendingUp,
  BookOpen,
  ChevronDown,
} from "lucide-react";
import { SCHOOL_INFO } from "@/lib/utils";

const steps = [
  {
    icon: ClipboardList,
    title: "Submit Inquiry",
    desc: "Fill out the registration form below or visit the school office. We will need basic student and parent information.",
  },
  {
    icon: MessageCircle,
    title: "Counselling Call",
    desc: "Our admissions team will contact you within 48 hours to discuss streams, subjects, and answer your questions.",
  },
  {
    icon: UserCheck,
    title: "Campus Visit & Interaction",
    desc: "Visit the campus. Meet the faculty. See the labs and classrooms. We encourage parents to assess the school firsthand.",
  },
  {
    icon: BookOpenCheck,
    title: "Enrollment",
    desc: "Complete the documentation, submit required certificates, and finalise the admission. Welcome to Triple M.",
  },
];

const documents = [
  "Birth certificate (original + 2 copies)",
  "Aadhaar card of student and parent",
  "Previous school's Transfer Certificate (TC)",
  "Report card of last class attended",
  "4 passport-size photographs",
  "Address proof (electricity bill / ration card)",
  "Caste certificate (if applicable)",
];

const classOptions = [
  "Class VI", "Class VII", "Class VIII", "Class IX", "Class X",
  "Class XI — Medical", "Class XI — Non-Medical",
  "Class XI — Commerce",
  "Class XII — Medical", "Class XII — Non-Medical",
  "Class XII — Commerce",
];

// ─── Streams Data ─────────────────────────────
const streams = [
  {
    id: "medical",
    icon: FlaskConical,
    name: "Medical",
    classes: "Class XI & XII",
    color: "emerald",
    tagline: "For future doctors, pharmacists & life scientists.",
    subjects: [
      { name: "Physics", type: "Core" },
      { name: "Chemistry", type: "Core" },
      { name: "Biology", type: "Core" },
      { name: "English", type: "Core" },
      { name: "Punjabi / Hindi", type: "Core" },
      { name: "Physical Education", type: "Optional" },
    ],
    careers: ["MBBS / BDS", "B.Pharm", "B.Sc Nursing", "Biotechnology", "Veterinary Science"],
    note: "Best suited for students targeting NEET.",
  },
  {
    id: "nonmedical",
    icon: Calculator,
    name: "Non-Medical",
    classes: "Class XI & XII",
    color: "blue",
    tagline: "For future engineers, architects & scientists.",
    subjects: [
      { name: "Physics", type: "Core" },
      { name: "Chemistry", type: "Core" },
      { name: "Mathematics", type: "Core" },
      { name: "English", type: "Core" },
      { name: "Punjabi / Hindi", type: "Core" },
      { name: "Computer Science", type: "Optional" },
    ],
    careers: ["B.Tech / B.E.", "B.Arch", "B.Sc Mathematics", "NDA / CDS", "Data Science"],
    note: "Best suited for students targeting JEE / CET.",
  },
  {
    id: "commerce",
    icon: TrendingUp,
    name: "Commerce",
    classes: "Class XI & XII",
    color: "gold",
    tagline: "For future CAs, bankers & entrepreneurs.",
    subjects: [
      { name: "Accountancy", type: "Core" },
      { name: "Business Studies", type: "Core" },
      { name: "Economics", type: "Core" },
      { name: "English", type: "Core" },
      { name: "Punjabi / Hindi", type: "Core" },
      { name: "Mathematics", type: "Optional" },
    ],
    careers: ["CA / CMA / CS", "BBA / MBA", "B.Com", "Banking & Finance", "Entrepreneurship"],
    note: "Maths optional strengthens career options in finance.",
  },
];

const colorMap: Record<string, { bg: string; border: string; text: string; badge: string; tag: string }> = {
  emerald: {
    bg: "hover:bg-emerald-50",
    border: "border-emerald-200",
    text: "text-emerald-600",
    badge: "bg-emerald-600",
    tag: "bg-emerald-50 text-emerald-700",
  },
  blue: {
    bg: "hover:bg-blue-50",
    border: "border-blue-200",
    text: "text-blue-600",
    badge: "bg-blue-600",
    tag: "bg-blue-50 text-blue-700",
  },
  gold: {
    bg: "hover:bg-gold-50",
    border: "border-gold-200",
    text: "text-gold-600",
    badge: "bg-gold-500",
    tag: "bg-gold-50 text-gold-700",
  },
};

function StreamsSection() {
  const [open, setOpen] = useState<string | null>(null);

  return (
    <section className="section bg-white">
      <div className="container-wide">
        <ScrollReveal>
          <SectionHeading
            label="Streams Available"
            title="Choose your path."
            description="Triple M offers all four major streams for Class XI & XII under the PSEB curriculum. Each stream is taught by subject specialists with a focus on board results and competitive exam preparation."
            align="center"
          />
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-neutral-200">
          {streams.map((stream, i) => {
            const colors = colorMap[stream.color];
            const isOpen = open === stream.id;
            return (
              <ScrollReveal key={stream.id} delay={i * 0.08}>
                <div
                  className={`bg-white border-0 transition-colors duration-300 ${colors.bg} h-full flex flex-col`}
                >
                  {/* Header */}
                  <div className="p-8 pb-6">
                    <div className="flex items-start justify-between gap-4 mb-5">
                      <div className={`w-12 h-12 rounded-sm flex items-center justify-center ${colors.badge}`}>
                        <stream.icon size={22} className="text-white" strokeWidth={1.5} />
                      </div>
                      <span className="text-xs font-sans font-semibold uppercase tracking-[0.15em] text-navy-400 pt-1">
                        {stream.classes}
                      </span>
                    </div>
                    <h3 className="font-serif text-2xl text-navy-800 mb-1">{stream.name}</h3>
                    <p className="text-sm text-navy-500 leading-relaxed">{stream.tagline}</p>
                  </div>

                  {/* Subjects */}
                  <div className="px-8 pb-2">
                    <div className="flex items-center gap-2 mb-3">
                      <BookOpen size={13} className={colors.text} />
                      <span className="text-[11px] font-sans font-bold uppercase tracking-[0.15em] text-navy-400">Subjects</span>
                    </div>
                    <div className="flex flex-wrap gap-2 mb-5">
                      {stream.subjects.map((s) => (
                        <span
                          key={s.name}
                          className={`text-xs px-2.5 py-1 font-sans ${
                            s.type === "Core" ? colors.tag : "bg-neutral-100 text-navy-500"
                          }`}
                        >
                          {s.name}
                          {s.type === "Optional" && <span className="ml-1 opacity-50">(opt)</span>}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Career paths — expandable */}
                  <div className="px-8 pb-8 mt-auto">
                    <button
                      onClick={() => setOpen(isOpen ? null : stream.id)}
                      className={`flex items-center gap-2 text-xs font-sans font-semibold uppercase tracking-[0.15em] ${colors.text} hover:opacity-80 transition-opacity`}
                    >
                      Career paths
                      <ChevronDown
                        size={14}
                        className={`transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
                      />
                    </button>
                    {isOpen && (
                      <div className="mt-4 space-y-2">
                        {stream.careers.map((career) => (
                          <div key={career} className="flex items-center gap-2 text-sm text-navy-600">
                            <CheckCircle2 size={13} className={colors.text} />
                            {career}
                          </div>
                        ))}
                        <p className={`text-xs mt-3 pt-3 border-t border-neutral-100 ${colors.text} italic`}>
                          {stream.note}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </ScrollReveal>
            );
          })}
        </div>

        {/* Bottom callout */}
        <ScrollReveal delay={0.2}>
          <div className="mt-8 bg-navy-800 p-6 md:p-8 flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-8">
            <div className="flex-1">
              <p className="text-white font-serif text-lg">Not sure which stream to choose?</p>
              <p className="text-white/50 text-sm mt-1">
                Our counselling team helps students and parents evaluate the right stream based on interest, aptitude, and career goals — free of charge.
              </p>
            </div>
            <a
              href={`https://wa.me/91${SCHOOL_INFO.phone}?text=I%20need%20guidance%20on%20choosing%20a%20stream%20at%20Triple%20M%20School.`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-gold shrink-0 whitespace-nowrap"
            >
              Get Free Counselling
            </a>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

export default function AdmissionsPage() {
  const [formState, setFormState] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [formError, setFormError] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setFormState("submitting");
    setFormError("");

    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form));

    try {
      const res = await fetch("/api/admissions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.error || "Something went wrong");
      }

      setFormState("success");
      form.reset();
    } catch (err: unknown) {
      setFormState("error");
      setFormError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    }
  }

  return (
    <>
      <PageHero
        title="Admissions"
        subtitle="Admissions open for the 2025–26 session. Classes VI through XII."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Admissions" },
        ]}
      />

      {/* Process */}
      <section className="section bg-white">
        <div className="container-wide">
          <ScrollReveal>
            <SectionHeading
              label="Process"
              title="Four steps. No surprises."
              align="center"
            />
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-neutral-200 max-w-5xl mx-auto">
            {steps.map((step, i) => (
              <ScrollReveal key={step.title} delay={i * 0.1}>
                <div className="bg-white p-8 h-full relative">
                  <span className="font-serif text-5xl text-navy-100 absolute top-4 right-6">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <step.icon size={24} className="text-gold-400 mb-5" strokeWidth={1.5} />
                  <h3 className="font-serif text-lg text-navy-800 mb-2">
                    {step.title}
                  </h3>
                  <p className="text-sm text-navy-500 leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Streams */}
      <StreamsSection />

      {/* Registration Form */}
      <section className="section bg-cream" id="register">
        <div className="container-wide">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-16">
            <div className="lg:col-span-3">
              <ScrollReveal>
                <SectionHeading
                  label="Registration"
                  title="Start the application."
                  description="Fill out this form and we will get back to you within 48 hours. All fields marked with * are required."
                />
              </ScrollReveal>

              {formState === "success" ? (
                <ScrollReveal>
                  <div className="bg-emerald-50 border border-emerald-200 p-8 text-center">
                    <CheckCircle2 size={40} className="text-emerald-500 mx-auto mb-4" />
                    <h3 className="font-serif text-xl text-navy-800 mb-2">
                      Inquiry submitted successfully.
                    </h3>
                    <p className="text-sm text-navy-500">
                      Our admissions team will contact you within 48 hours at the phone number you provided.
                    </p>
                  </div>
                </ScrollReveal>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {formState === "error" && (
                    <div className="bg-red-50 border border-red-200 p-4 flex items-start gap-3">
                      <AlertCircle size={18} className="text-red-500 shrink-0 mt-0.5" />
                      <p className="text-sm text-red-700">{formError}</p>
                    </div>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-sans font-semibold uppercase tracking-[0.15em] text-navy-600 mb-2">
                        Student Name *
                      </label>
                      <input
                        name="studentName"
                        required
                        className="w-full px-4 py-3 bg-white border border-neutral-200 text-sm text-navy-800 focus:outline-none focus:border-navy-400 transition-colors"
                        placeholder="Full name of the student"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-sans font-semibold uppercase tracking-[0.15em] text-navy-600 mb-2">
                        Date of Birth *
                      </label>
                      <input
                        name="dateOfBirth"
                        type="date"
                        required
                        className="w-full px-4 py-3 bg-white border border-neutral-200 text-sm text-navy-800 focus:outline-none focus:border-navy-400 transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-sans font-semibold uppercase tracking-[0.15em] text-navy-600 mb-2">
                      Class Applying For *
                    </label>
                    <select
                      name="classApplying"
                      required
                      className="w-full px-4 py-3 bg-white border border-neutral-200 text-sm text-navy-800 focus:outline-none focus:border-navy-400 transition-colors"
                    >
                      <option value="">Select a class</option>
                      {classOptions.map((c) => (
                        <option key={c} value={c}>{c}</option>
                      ))}
                    </select>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-sans font-semibold uppercase tracking-[0.15em] text-navy-600 mb-2">
                        Parent / Guardian Name *
                      </label>
                      <input
                        name="parentName"
                        required
                        className="w-full px-4 py-3 bg-white border border-neutral-200 text-sm text-navy-800 focus:outline-none focus:border-navy-400 transition-colors"
                        placeholder="Full name"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-sans font-semibold uppercase tracking-[0.15em] text-navy-600 mb-2">
                        Phone Number *
                      </label>
                      <input
                        name="parentPhone"
                        type="tel"
                        required
                        pattern="[6-9][0-9]{9}"
                        className="w-full px-4 py-3 bg-white border border-neutral-200 text-sm text-navy-800 focus:outline-none focus:border-navy-400 transition-colors"
                        placeholder="10 digit mobile number"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-sans font-semibold uppercase tracking-[0.15em] text-navy-600 mb-2">
                      Email (optional)
                    </label>
                    <input
                      name="parentEmail"
                      type="email"
                      className="w-full px-4 py-3 bg-white border border-neutral-200 text-sm text-navy-800 focus:outline-none focus:border-navy-400 transition-colors"
                      placeholder="your@email.com"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-sans font-semibold uppercase tracking-[0.15em] text-navy-600 mb-2">
                      Address *
                    </label>
                    <textarea
                      name="address"
                      required
                      rows={3}
                      className="w-full px-4 py-3 bg-white border border-neutral-200 text-sm text-navy-800 focus:outline-none focus:border-navy-400 transition-colors resize-none"
                      placeholder="Full residential address"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-sans font-semibold uppercase tracking-[0.15em] text-navy-600 mb-2">
                      Previous School (optional)
                    </label>
                    <input
                      name="previousSchool"
                      className="w-full px-4 py-3 bg-white border border-neutral-200 text-sm text-navy-800 focus:outline-none focus:border-navy-400 transition-colors"
                      placeholder="Name of previous school"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-sans font-semibold uppercase tracking-[0.15em] text-navy-600 mb-2">
                      Any Remarks (optional)
                    </label>
                    <textarea
                      name="remarks"
                      rows={2}
                      className="w-full px-4 py-3 bg-white border border-neutral-200 text-sm text-navy-800 focus:outline-none focus:border-navy-400 transition-colors resize-none"
                      placeholder="Anything else you'd like us to know"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={formState === "submitting"}
                    className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {formState === "submitting" ? "Submitting..." : "Submit Application"}
                    {formState !== "submitting" && <ArrowRight size={16} className="ml-2" />}
                  </button>
                </form>
              )}
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-2 space-y-8">
              {/* Documents Required */}
              <ScrollReveal delay={0.1}>
                <div className="bg-white border border-neutral-200 p-8">
                  <h3 className="font-serif text-xl text-navy-800 mb-4 flex items-center gap-2">
                    <FileText size={20} className="text-gold-400" />
                    Documents Required
                  </h3>
                  <ul className="space-y-3">
                    {documents.map((doc) => (
                      <li key={doc} className="flex items-start gap-3 text-sm text-navy-600">
                        <CheckCircle2 size={14} className="text-gold-400 mt-0.5 shrink-0" />
                        <span>{doc}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </ScrollReveal>

              {/* Contact */}
              <ScrollReveal delay={0.2}>
                <div className="bg-navy-800 p-8">
                  <h3 className="font-serif text-xl text-white mb-4 flex items-center gap-2">
                    <Phone size={20} className="text-gold-400" />
                    Questions?
                  </h3>
                  <p className="text-sm text-white/60 mb-6">
                    Call the admissions desk directly. We are available Monday to Saturday, 8 AM to 3 PM.
                  </p>
                  <a
                    href={`tel:${SCHOOL_INFO.phone}`}
                    className="btn-gold w-full text-center"
                  >
                    Call {SCHOOL_INFO.phone}
                  </a>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
