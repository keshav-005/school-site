"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Bus,
  Monitor,
  FlaskConical,
  ShieldCheck,
  MessageSquare,
  Cctv,
  BookOpen,
  Users,
  Trophy,
  Clock,
  ArrowRight,
  Star,
  ChevronRight,
  Bell,
  Medal,
  GraduationCap,
  CalendarDays,
} from "lucide-react";
import {
  ScrollReveal,
  AnimatedCounter,
  SectionHeading,
} from "@/components/shared";
import { SCHOOL_INFO } from "@/lib/utils";

// ─── Hero ────────────────────────────────────
function Hero() {
  return (
    <section className="relative h-[90vh] min-h-[600px] max-h-[900px] bg-navy-950 overflow-hidden">
      {/* Background image with slow zoom */}
      <div className="absolute inset-0 animate-slow-zoom">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('/images/campus/triple-m-building.png')",
          }}
        />
      </div>
      <div className="overlay-gradient" />

      {/* Content */}
      <div className="relative h-full container-wide flex flex-col justify-end pb-16 md:pb-24">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <span className="text-label text-gold-300 mb-4 block">
            Est. 2012 · Hoshiarpur, Punjab
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="font-serif text-4xl md:text-display-lg lg:text-display-xl text-white max-w-4xl"
        >
          Where discipline
          <br />
          meets distinction.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.7 }}
          className="mt-6 text-base md:text-lg text-white/60 max-w-xl leading-relaxed"
        >
          Triple M Public School has built a tradition of academic rigour,
          experienced faculty, and an environment that prepares students
          for what comes next.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1 }}
          className="flex flex-wrap gap-4 mt-10"
        >
          <Link href="/admissions" className="btn-gold">
            Begin Application
            <ArrowRight size={16} className="ml-2" />
          </Link>
          <Link href="/about" className="btn-outline border-white/30 text-white hover:bg-white/10 hover:border-white/50">
            Explore the School
          </Link>
        </motion.div>

        {/* Stats Row */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.3 }}
          className="mt-16 pt-8 border-t border-white/10 grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-12"
        >
          {[
            { value: 13, suffix: "+", label: "Years" },
            { value: 1000, suffix: "+", label: "Students Taught" },
            { value: 50, suffix: "+", label: "Faculty Members" },
            { value: 16, suffix: "", label: "Transport Routes" },
          ].map((stat) => (
            <div key={stat.label}>
              <span className="font-serif text-3xl md:text-4xl text-white block">
                <AnimatedCounter
                  end={stat.value}
                  suffix={stat.suffix}
                  duration={2.5}
                />
              </span>
              <span className="text-xs text-white/40 uppercase tracking-widest mt-1 block font-sans">
                {stat.label}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// ─── Admissions Ticker ───────────────────────
function AdmissionsTicker() {
  const items = Array(6).fill(
    "Admissions Open 2025–26  ·  Classes VI to XII  ·  Call 9888299600"
  );
  return (
    <div className="bg-gold-400 text-navy-900 py-3 overflow-hidden">
      <div className="marquee-track whitespace-nowrap">
        {items.map((text, i) => (
          <span
            key={i}
            className="text-sm font-sans font-bold uppercase tracking-[0.15em] mx-8"
          >
            {text}
          </span>
        ))}
      </div>
    </div>
  );
}

// ─── Notices Section ─────────────────────────
const notices = [
  {
    date: "Apr 10, 2025",
    tag: "Exam",
    text: "Class X & XII Board Practical Examinations begin April 15. Students must carry admit cards.",
  },
  {
    date: "Apr 5, 2025",
    tag: "Holiday",
    text: "School closed on April 14 (Baisakhi). Regular classes resume April 15.",
  },
  {
    date: "Mar 28, 2025",
    tag: "Admissions",
    text: "Admissions for 2025–26 session now open. Classes VI to XII. Limited seats — apply early.",
  },
  {
    date: "Mar 20, 2025",
    tag: "Event",
    text: "Annual Sports Day scheduled for April 25. Students to report in sports uniform.",
  },
];

const tagColors: Record<string, string> = {
  Exam: "bg-red-50 text-red-600",
  Holiday: "bg-emerald-50 text-emerald-600",
  Admissions: "bg-gold-50 text-gold-600",
  Event: "bg-blue-50 text-blue-600",
};

function NoticesSection() {
  return (
    <section className="section bg-cream border-b border-neutral-200">
      <div className="container-wide">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-12 lg:gap-20 items-start">
          <ScrollReveal>
            <div className="lg:sticky lg:top-8">
              <span className="text-label text-gold-400 block mb-3">Latest Updates</span>
              <h2 className="font-serif text-heading-lg md:text-display text-navy-800">
                Notices &
                <br />Announcements
              </h2>
              <div className="divider bg-gold-400 mt-6 mb-6" />
              <p className="text-navy-500 text-sm leading-relaxed">
                Stay up to date with exam schedules, holidays, events, and important school communications.
              </p>
              <div className="mt-8 flex items-center gap-3 text-navy-400">
                <Bell size={16} className="text-gold-400" />
                <span className="text-xs font-sans uppercase tracking-widest">Updated regularly</span>
              </div>
            </div>
          </ScrollReveal>

          <div className="space-y-px bg-neutral-200">
            {notices.map((notice, i) => (
              <ScrollReveal key={i} delay={i * 0.08}>
                <div className="bg-white p-6 md:p-8 flex gap-5 group hover:bg-navy-800 transition-colors duration-500">
                  <div className="flex flex-col items-center gap-2 shrink-0">
                    <CalendarDays size={18} className="text-gold-400 group-hover:text-gold-300 transition-colors" />
                    <span className="text-[10px] font-sans text-navy-400 group-hover:text-white/40 transition-colors text-center leading-tight">{notice.date}</span>
                  </div>
                  <div>
                    <span className={`inline-block text-[10px] font-bold uppercase tracking-[0.15em] px-2 py-0.5 rounded-sm mb-2 ${tagColors[notice.tag] || "bg-neutral-100 text-navy-500"}`}>
                      {notice.tag}
                    </span>
                    <p className="text-sm text-navy-700 leading-relaxed group-hover:text-white/80 transition-colors">
                      {notice.text}
                    </p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Welcome Section ─────────────────────────
function Welcome() {
  return (
    <section className="section bg-white">
      <div className="container-wide">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <ScrollReveal>
            <div>
              <SectionHeading
                label="Welcome"
                title="A school that takes itself seriously."
                description="Triple M Public School was founded in 2012 with a clear purpose: provide Hoshiarpur with a school that combines discipline, strong academics, and faculty who have actually spent decades in the classroom."
              />
              <div className="space-y-4 text-navy-600 text-[15px] leading-relaxed">
                <p>
                  We are not a franchise. We are not a coaching centre pretending
                  to be a school. We are a properly equipped institution with
                  science labs, a library, smart classrooms, and transport
                  covering 16 routes across the district — because access matters.
                </p>
                <p>
                  Our students sit for state board examinations and the results
                  speak clearly. When the faculty is experienced and the
                  infrastructure is real, outcomes follow.
                </p>
              </div>
              <Link
                href="/about"
                className="inline-flex items-center gap-2 mt-8 text-sm font-semibold text-navy-800 uppercase tracking-[0.1em] group"
              >
                Read more about us
                <ChevronRight
                  size={14}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </Link>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <div className="relative">
              <div className="aspect-[4/5] overflow-hidden">
                <img
                  src="/images/campus/triple-m-building.png"
                  alt="Students in classroom"
                  className="img-editorial"
                />
              </div>
              {/* Accent block */}
              <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-gold-300 -z-10 hidden md:block" />
              <div className="absolute -top-6 -right-6 w-24 h-24 bg-navy-800 -z-10 hidden md:block" />
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}

// ─── Facilities Grid ─────────────────────────
const facilities = [
  {
    icon: Bus,
    title: "Transport Network",
    desc: "16 bus routes covering Talwara, Mukerian, Dasuya, Tanda, Phagwara, and more. Door-step pickup across the district.",
  },
  {
    icon: Monitor,
    title: "Smart Classrooms",
    desc: "Digital boards and AV-equipped rooms. Concepts taught with visual aids, not just chalk and talk.",
  },
  {
    icon: FlaskConical,
    title: "Science Laboratories",
    desc: "Fully equipped Physics, Chemistry, and Biology labs. Students do the experiments — not just read about them.",
  },
  {
    icon: ShieldCheck,
    title: "Secure Campus",
    desc: "Controlled entry, trained staff, and clear safety protocols. Parents can be at ease.",
  },
  {
    icon: MessageSquare,
    title: "Parent SMS Alerts",
    desc: "Attendance, results, and announcements sent directly to parents via SMS. No information gaps.",
  },
  {
    icon: Cctv,
    title: "CCTV Surveillance",
    desc: "All classrooms and corridors covered. Full visibility, full accountability.",
  },
];

function FacilitiesGrid() {
  return (
    <section className="section bg-cream">
      <div className="container-wide">
        <ScrollReveal>
          <SectionHeading
            label="Facilities"
            title="Built for learning, not for show."
            description="Every facility serves a purpose. No decorative swimming pools or unused auditoriums — just what students and teachers actually need."
            align="center"
          />
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-neutral-200">
          {facilities.map((item, i) => (
            <ScrollReveal key={item.title} delay={i * 0.08}>
              <div className="bg-white p-8 md:p-10 h-full group hover:bg-navy-800 transition-colors duration-500">
                <item.icon
                  size={28}
                  className="text-gold-400 mb-6 group-hover:text-gold-300 transition-colors"
                  strokeWidth={1.5}
                />
                <h3 className="font-serif text-xl text-navy-800 mb-3 group-hover:text-white transition-colors">
                  {item.title}
                </h3>
                <p className="text-sm text-navy-500 leading-relaxed group-hover:text-white/60 transition-colors">
                  {item.desc}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal>
          <div className="text-center mt-12">
            <Link href="/facilities" className="btn-outline">
              View All Facilities
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

// ─── Why Choose Us ───────────────────────────
function WhyChooseUs() {
  return (
    <section className="relative section bg-navy-800 overflow-hidden">
      <div className="absolute inset-0 opacity-[0.03]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(45deg, #fff 25%, transparent 25%), linear-gradient(-45deg, #fff 25%, transparent 25%)",
            backgroundSize: "60px 60px",
          }}
        />
      </div>
      <div className="container-wide relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <ScrollReveal>
            <div>
              <SectionHeading
                label="Why Triple M"
                title="The numbers, plainly."
                dark
              />
              <div className="grid grid-cols-2 gap-8 mt-2">
                {[
                  {
                    icon: Users,
                    value: 50,
                    suffix: "+",
                    label: "Experienced Faculty",
                  },
                  {
                    icon: Trophy,
                    value: 95,
                    suffix: "%",
                    label: "Pass Rate",
                  },
                  {
                    icon: BookOpen,
                    value: 5,
                    suffix: "",
                    label: "Academic Streams",
                  },
                  {
                    icon: Clock,
                    value: 13,
                    suffix: "+",
                    label: "Years Running",
                  },
                ].map((stat) => (
                  <div
                    key={stat.label}
                    className="border-t border-white/10 pt-6"
                  >
                    <stat.icon
                      size={20}
                      className="text-gold-400 mb-3"
                      strokeWidth={1.5}
                    />
                    <span className="font-serif text-3xl text-white block">
                      <AnimatedCounter
                        end={stat.value}
                        suffix={stat.suffix}
                        duration={2}
                      />
                    </span>
                    <span className="text-xs text-white/40 uppercase tracking-widest mt-1 block">
                      {stat.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.15}>
            <div className="space-y-6">
              {[
                {
                  title: "Faculty who have been at this for decades",
                  text: "Prof. Manoj Kapoor, Prof. S.K. Sharma, Prof. Jarnail Singh, Prof. O.P. Sharma — these are teachers whose track record is their introduction. They don't need a bio; their students speak for them.",
                },
                {
                  title: "Infrastructure that works",
                  text: "Science labs with actual equipment. A library with actual books. Smart classrooms with actual projectors. We invested in what matters.",
                },
                {
                  title: "Transport that reaches your doorstep",
                  text: "From Talwara to Phagwara, our buses cover 16 routes daily. Distance should not be the reason a student misses a good school.",
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="border-l-2 border-gold-400/30 pl-6 py-2"
                >
                  <h4 className="font-serif text-lg text-white mb-2">
                    {item.title}
                  </h4>
                  <p className="text-sm text-white/50 leading-relaxed">
                    {item.text}
                  </p>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}

// ─── Faculty Preview ─────────────────────────
const faculty = [
  {
    name: "Mr. Manoj Kapoor",
    role: "Director",
    image: "/images/faculty/manoj-kapoor.png",
  },
  {
    name: "Mr. S.K. Sharma",
    role: "Principal",
    image: "/images/faculty/sk-sharma.png",
  },
  {
    name: "Mr. Jairnail Singh",
    role: "Senior Faculty",
    image: "/images/faculty/jairnail-singh.png",
  },
  {
    name: "Mr. O.P. Sharma",
    role: "Senior Faculty",
    image: "/images/faculty/op-sharma.png",
  },
];

function FacultyPreview() {
  return (
    <section className="section bg-white">
      <div className="container-wide">
        <ScrollReveal>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12 md:mb-16">
            <SectionHeading
              label="Faculty"
              title="The people behind the results."
            />
            <Link
              href="/faculty"
              className="inline-flex items-center gap-2 text-sm font-semibold text-navy-800 uppercase tracking-[0.1em] group shrink-0"
            >
              View all faculty
              <ArrowRight
                size={14}
                className="group-hover:translate-x-1 transition-transform"
              />
            </Link>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-neutral-200">
          {faculty.map((person, i) => (
            <ScrollReveal key={person.name} delay={i * 0.1}>
              <div className="bg-white group">
                <div className="aspect-[3/4] overflow-hidden">
                  <img
                    src={person.image}
                    alt={person.name}
                    className="img-editorial group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
                <div className="p-4 md:p-6">
                  <h4 className="font-serif text-base md:text-lg text-navy-800">
                    {person.name}
                  </h4>
                  <p className="text-xs text-navy-400 uppercase tracking-widest mt-1">
                    {person.role}
                  </p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Board Results ───────────────────────────
const toppers = [
  { name: "Amandeep Kaur", stream: "Medical (Class XII)", score: "97.4%", year: "2024", subject: "Top in Biology" },
  { name: "Rohit Sharma",  stream: "Non-Medical (Class XII)", score: "96.8%", year: "2024", subject: "Top in Physics" },
  { name: "Gurpreet Singh", stream: "Commerce (Class XII)",  score: "95.2%", year: "2024", subject: "Top in Accounts" },
  { name: "Simran Gill",   stream: "Commerce (Class XII)",      score: "94.6%", year: "2024", subject: "Top in English" },
  { name: "Navjot Kaur",  stream: "Class X",               score: "93.8%", year: "2024", subject: "School Topper" },
  { name: "Arjun Thakur", stream: "Non-Medical (Class XII)", score: "93.2%", year: "2023", subject: "District Rank 3" },
];

function BoardResults() {
  return (
    <section className="section bg-navy-950 relative overflow-hidden">
      {/* Subtle background */}
      <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "radial-gradient(circle at 20% 50%, #C9A84C 0%, transparent 60%), radial-gradient(circle at 80% 50%, #C9A84C 0%, transparent 60%)" }} />

      <div className="container-wide relative">
        <ScrollReveal>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12 md:mb-16">
            <div>
              <span className="text-label text-gold-400 block mb-3">Academic Excellence</span>
              <h2 className="font-serif text-heading-lg md:text-display text-white">
                Board Results 2024
              </h2>
              <div className="divider bg-gold-400/40 mt-6" />
            </div>
            <div className="mt-6 md:mt-0 flex items-center gap-3 bg-white/5 border border-white/10 px-5 py-3">
              <Trophy size={18} className="text-gold-400" />
              <span className="text-sm text-white/70 font-sans">95%+ overall pass rate</span>
            </div>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-white/10">
          {toppers.map((topper, i) => (
            <ScrollReveal key={topper.name} delay={i * 0.08}>
              <div className="bg-navy-900 p-8 group hover:bg-navy-800 transition-colors duration-500 h-full">
                <div className="flex items-start justify-between mb-4">
                  <Medal size={22} className="text-gold-400" />
                  <span className="text-xs font-sans text-white/30 uppercase tracking-widest">{topper.year}</span>
                </div>
                <div className="font-serif text-4xl text-gold-300 mb-1">{topper.score}</div>
                <div className="font-serif text-lg text-white mt-3">{topper.name}</div>
                <div className="text-sm text-white/50 mt-1">{topper.stream}</div>
                <div className="mt-4 pt-4 border-t border-white/10">
                  <span className="text-xs text-gold-400 uppercase tracking-[0.15em] font-sans">{topper.subject}</span>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal delay={0.3}>
          <div className="mt-10 text-center">
            <p className="text-white/30 text-sm font-sans">
              Results shown are representative. Actual board results verified with school records.
            </p>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

// ─── School Timings & Calendar ──────────────────
const timings = [
  { day: "Monday – Friday", time: "8:00 AM – 2:30 PM", note: "Regular classes" },
  { day: "Saturday",        time: "8:00 AM – 12:30 PM", note: "Classes + activities" },
  { day: "Sunday",          time: "Closed",             note: "" },
];

const calendarEvents = [
  { month: "Apr", event: "New session begins", type: "session" },
  { month: "Apr", event: "Annual Sports Day",  type: "event" },
  { month: "May", event: "Unit Test 1",        type: "exam" },
  { month: "Jun", event: "Summer vacation begins", type: "holiday" },
  { month: "Jul", event: "School reopens",     type: "session" },
  { month: "Aug", event: "Independence Day celebration", type: "event" },
  { month: "Sep", event: "Half-yearly exams",  type: "exam" },
  { month: "Oct", event: "Diwali break",       type: "holiday" },
  { month: "Nov", event: "Unit Test 2",        type: "exam" },
  { month: "Dec", event: "Winter vacation",    type: "holiday" },
  { month: "Jan", event: "Pre-board exams start", type: "exam" },
  { month: "Mar", event: "PSEB Board exams",   type: "exam" },
];

const calTypeStyle: Record<string, string> = {
  exam:    "bg-red-50 text-red-600 border-red-100",
  event:   "bg-blue-50 text-blue-600 border-blue-100",
  session: "bg-emerald-50 text-emerald-600 border-emerald-100",
  holiday: "bg-gold-50 text-gold-600 border-gold-100",
};

function SchoolTimings() {
  return (
    <section className="section bg-white border-y border-neutral-100">
      <div className="container-wide">
        <ScrollReveal>
          <SectionHeading
            label="Know Before You Visit"
            title="Timings & calendar."
            description="School hours, key dates, and the full academic year at a glance."
          />
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Timings */}
          <ScrollReveal>
            <div>
              <h3 className="font-serif text-xl text-navy-800 mb-6 flex items-center gap-2">
                <Clock size={18} className="text-gold-400" />
                School Hours
              </h3>
              <div className="space-y-px bg-neutral-100">
                {timings.map((t) => (
                  <div key={t.day} className="bg-white p-5 flex justify-between items-center">
                    <div>
                      <p className="text-sm font-sans font-semibold text-navy-800">{t.day}</p>
                      {t.note && <p className="text-xs text-navy-400 mt-0.5">{t.note}</p>}
                    </div>
                    <span className={`text-sm font-mono font-bold ${
                      t.time === "Closed" ? "text-red-400" : "text-navy-700"
                    }`}>{t.time}</span>
                  </div>
                ))}
              </div>

              <div className="mt-6 bg-gold-50 border border-gold-200 p-5">
                <p className="text-sm text-gold-700">
                  <span className="font-semibold">Gate closes at 8:15 AM.</span> Students arriving after 8:15 AM must report to the office with a parent/guardian.
                </p>
              </div>
            </div>
          </ScrollReveal>

          {/* Calendar */}
          <ScrollReveal delay={0.1}>
            <div>
              <h3 className="font-serif text-xl text-navy-800 mb-6 flex items-center gap-2">
                <CalendarDays size={18} className="text-gold-400" />
                Academic Calendar 2025–26
              </h3>
              <div className="grid grid-cols-2 gap-px bg-neutral-100">
                {calendarEvents.map((ev, i) => (
                  <div key={i} className={`bg-white p-4 border-l-2 ${calTypeStyle[ev.type]} flex gap-3`}>
                    <span className="text-[11px] font-bold font-mono w-7 shrink-0 pt-0.5">{ev.month}</span>
                    <span className="text-xs text-navy-700 leading-snug">{ev.event}</span>
                  </div>
                ))}
              </div>
              <div className="mt-4 flex flex-wrap gap-3">
                {["exam","event","session","holiday"].map((type) => (
                  <span key={type} className={`text-[10px] font-bold uppercase tracking-[0.12em] px-2 py-1 border ${calTypeStyle[type]}`}>
                    {type}
                  </span>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}

// ─── Testimonials ────────────────────────────
const testimonials = [
  {
    quote:
      "My son joined in Class VIII. He went from average to topping his boards. The teachers here don't give up on a student.",
    name: "Rajinder Kaur",
    relation: "Parent",
  },
  {
    quote:
      "The science labs at Triple M are better than what I found at many bigger schools in Jalandhar. Real equipment, real experiments.",
    name: "Dr. Amit Verma",
    relation: "Parent",
  },
  {
    quote:
      "I studied here from 2015 to 2019. Prof. Kapoor's physics classes are something I still remember in engineering college.",
    name: "Priya Sharma",
    relation: "Alumna, Batch of 2019",
  },
];

function Testimonials() {
  return (
    <section className="section bg-cream">
      <div className="container-wide">
        <ScrollReveal>
          <SectionHeading
            label="What they say"
            title="From the people who know."
            align="center"
          />
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-neutral-200 max-w-5xl mx-auto">
          {testimonials.map((t, i) => (
            <ScrollReveal key={t.name} delay={i * 0.1}>
              <div className="bg-white p-8 md:p-10 h-full flex flex-col">
                <Star size={20} className="text-gold-400 mb-4" fill="currentColor" />
                <blockquote className="text-[15px] text-navy-700 leading-relaxed flex-1 italic">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
                <div className="mt-6 pt-4 border-t border-neutral-100">
                  <span className="font-serif text-sm text-navy-800 block">
                    {t.name}
                  </span>
                  <span className="text-xs text-navy-400">{t.relation}</span>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── CTA Section ─────────────────────────────
function CTA() {
  return (
    <section className="relative py-24 md:py-32 bg-navy-900 overflow-hidden">
      <div className="absolute inset-0">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{
            backgroundImage: "url('/images/campus/triple-m-building.png')",
          }}
        />
      </div>
      <div className="container-narrow relative text-center">
        <ScrollReveal>
          <span className="text-label text-gold-300 block mb-4">
            Admissions 2025–26
          </span>
          <h2 className="font-serif text-display text-white mb-6">
            The right school makes
            <br className="hidden md:block" />
            the difference. You know that.
          </h2>
          <p className="text-white/50 text-lg mb-10 max-w-lg mx-auto">
            Admissions are open for Classes VI through XII. Visit the campus
            or call us directly.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/admissions" className="btn-gold">
              Apply Now
              <ArrowRight size={16} className="ml-2" />
            </Link>
            <a
              href={`tel:${SCHOOL_INFO.phone}`}
              className="btn-outline border-white/30 text-white hover:bg-white/10 hover:border-white/50"
            >
              Call {SCHOOL_INFO.phone}
            </a>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

// ─── Map Section ─────────────────────────────
function MapSection() {
  return (
    <section className="h-[400px] w-full bg-neutral-200 relative">
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3405.5!2d75.911!3d31.532!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x391ad5313cce6d27%3A0x7e1dce513b5c9f22!2sTriple+M+Public+School!5e0!3m2!1sen!2sin!4v1"
        className="w-full h-full border-0"
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title="Triple M Public School Location"
      />
    </section>
  );
}

// ─── Page ────────────────────────────────────
export default function HomePage() {
  return (
    <>
      <Hero />
      <AdmissionsTicker />
      <NoticesSection />
      <Welcome />
      <FacilitiesGrid />
      <WhyChooseUs />
      <FacultyPreview />
      <BoardResults />
      <SchoolTimings />
      <Testimonials />
      <CTA />
      <MapSection />
    </>
  );
}
