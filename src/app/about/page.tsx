"use client";

import { ScrollReveal, SectionHeading, PageHero } from "@/components/shared";
import {
  Target,
  Eye,
  Shield,
  Lightbulb,
  BookOpen,
  Users,
} from "lucide-react";
import Link from "next/link";

const coreValues = [
  {
    icon: Shield,
    title: "Discipline",
    desc: "Structure is not restriction — it is the foundation of growth. Students here learn to be accountable.",
  },
  {
    icon: BookOpen,
    title: "Academic Rigour",
    desc: "No shortcuts. We teach the full syllabus properly, with labs, assignments, and regular testing.",
  },
  {
    icon: Lightbulb,
    title: "Practical Learning",
    desc: "Science labs, online tests, smart classrooms — students learn by doing, not just memorising.",
  },
  {
    icon: Users,
    title: "Experienced Faculty",
    desc: "Our teachers are not fresh graduates. They are seasoned educators who have produced results.",
  },
];

const milestones = [
  { year: "2012", title: "School Founded", desc: "Triple M Public School opens its doors in Hoshiarpur with a mission to deliver quality education." },
  { year: "2014", title: "Secondary Wing Added", desc: "Expanded to offer full Secondary education (Classes VI–X) with state board affiliation." },
  { year: "2016", title: "Higher Secondary Begins", desc: "Launched Science (Medical & Non-Medical), Arts, and Commerce streams for Classes XI–XII." },
  { year: "2018", title: "Transport Network Expanded", desc: "Grew to 16 bus routes covering Talwara, Mukerian, Dasuya, Tanda, Phagwara, and more." },
  { year: "2020", title: "Smart Classrooms Installed", desc: "Upgraded all classrooms with digital boards, projectors, and AV equipment." },
  { year: "2024", title: "1000+ Alumni Strong", desc: "Over a thousand students have now passed through Triple M and moved on to colleges and careers." },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        title="About"
        subtitle="Not a franchise. Not a coaching centre. A proper school."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "About" },
        ]}
      />

      {/* History / Story */}
      <section className="section bg-white">
        <div className="container-wide">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <ScrollReveal>
              <div>
                <SectionHeading
                  label="Our Story"
                  title="Built from scratch, with purpose."
                />
                <div className="space-y-4 text-navy-600 text-[15px] leading-relaxed">
                  <p>
                    Triple M Public School was established in 2012 on Fatehgarh Road, Hoshiarpur.
                    The school was not built to capitalise on a brand name or to be the fifth
                    branch of a chain — it was built because Hoshiarpur needed another option.
                    A real one.
                  </p>
                  <p>
                    The founders gathered faculty with proven track records — teachers who had
                    been producing board toppers for years — and gave them the infrastructure
                    to do their work: labs, a library, smart classrooms, and the freedom to
                    teach properly.
                  </p>
                  <p>
                    Within a few years, the school earned its reputation the old-fashioned way.
                    Through results. Word of mouth. Parents who saw what was happening in the
                    classroom and chose to move their children here.
                  </p>
                  <p>
                    Today, Triple M offers Secondary and Higher Secondary education across
                    five streams, runs 16 bus routes, and has sent over a thousand students
                    to colleges and universities. The school continues to grow — carefully.
                  </p>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <div className="relative">
                <div className="aspect-[4/5] overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=800&q=80"
                    alt="School building"
                    className="img-editorial"
                  />
                </div>
                <div className="absolute -bottom-6 -right-6 w-40 h-40 bg-gold-300 -z-10 hidden md:block" />
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="section bg-cream">
        <div className="container-narrow">
          <ScrollReveal>
            <SectionHeading
              label="Milestones"
              title="The story in years."
              align="center"
            />
          </ScrollReveal>

          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-navy-200 hidden md:block" />
            <div className="absolute left-4 top-0 bottom-0 w-px bg-navy-200 md:hidden" />

            <div className="space-y-8 md:space-y-0">
              {milestones.map((m, i) => (
                <ScrollReveal key={m.year} delay={i * 0.08}>
                  <div
                    className={`relative flex items-start gap-6 md:gap-0 pl-12 md:pl-0 py-4 md:py-8 ${
                      i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                    }`}
                  >
                    {/* Dot */}
                    <div className="absolute left-[11px] md:left-1/2 md:-translate-x-1/2 w-[10px] h-[10px] bg-gold-400 border-2 border-white z-10 top-6 md:top-10" />

                    <div className={`md:w-1/2 ${i % 2 === 0 ? "md:pr-16 md:text-right" : "md:pl-16"}`}>
                      <span className="text-label text-gold-500 block mb-1">{m.year}</span>
                      <h3 className="font-serif text-xl text-navy-800 mb-2">{m.title}</h3>
                      <p className="text-sm text-navy-500 leading-relaxed">{m.desc}</p>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="section bg-navy-800">
        <div className="container-wide">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-white/10">
            <ScrollReveal>
              <div className="bg-navy-800 p-10 md:p-16">
                <Target size={28} className="text-gold-400 mb-6" strokeWidth={1.5} />
                <h3 className="font-serif text-heading text-white mb-4">Our Mission</h3>
                <p className="text-white/60 leading-relaxed">
                  To provide accessible, rigorous education to families in and around Hoshiarpur.
                  To maintain a campus where discipline is expected, faculty are qualified, and
                  resources are used — not displayed. To send students to their next stage of
                  life prepared, not just passed.
                </p>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <div className="bg-navy-800 p-10 md:p-16">
                <Eye size={28} className="text-gold-400 mb-6" strokeWidth={1.5} />
                <h3 className="font-serif text-heading text-white mb-4">Our Vision</h3>
                <p className="text-white/60 leading-relaxed">
                  To be the school in Hoshiarpur that families choose first — not because of
                  marketing, but because of outcomes. To build a reputation that lasts fifty
                  years by doing the work every single year.
                </p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Principal's Message */}
      <section className="section bg-white">
        <div className="container-wide">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-center">
            <ScrollReveal className="lg:col-span-2">
              <div className="aspect-[3/4] overflow-hidden max-w-sm">
                <img
                  src="https://images.unsplash.com/photo-1560250097-0b93528c311a?w=600&q=80"
                  alt="Principal"
                  className="img-editorial"
                />
              </div>
            </ScrollReveal>
            <ScrollReveal delay={0.15} className="lg:col-span-3">
              <div>
                <SectionHeading
                  label="From the Principal"
                  title="A message to parents."
                />
                <div className="border-l-2 border-gold-400 pl-6 space-y-4 text-navy-600 text-[15px] leading-relaxed">
                  <p>
                    When a parent walks into our campus, I tell them the same thing I have been
                    telling parents since 2012: look at the classrooms, not the brochure.
                    Talk to the teachers, not the admissions officer. Ask about results,
                    not about promises.
                  </p>
                  <p>
                    Triple M was built to be a school that earns trust through consistency.
                    Every year, the same discipline. The same rigour. The same respect for
                    the student&apos;s time.
                  </p>
                  <p>
                    We welcome you to visit, to ask difficult questions, and to make a decision
                    based on what you see — not what you are told.
                  </p>
                </div>
                <div className="mt-6">
                  <span className="font-serif text-lg text-navy-800 block">The Principal</span>
                  <span className="text-xs text-navy-400 uppercase tracking-widest">
                    Triple M Public School
                  </span>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="section bg-cream">
        <div className="container-wide">
          <ScrollReveal>
            <SectionHeading
              label="Values"
              title="What we actually stand by."
              align="center"
            />
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-neutral-200 max-w-5xl mx-auto">
            {coreValues.map((v, i) => (
              <ScrollReveal key={v.title} delay={i * 0.08}>
                <div className="bg-white p-8 h-full text-center">
                  <v.icon size={28} className="text-gold-400 mx-auto mb-4" strokeWidth={1.5} />
                  <h4 className="font-serif text-lg text-navy-800 mb-2">{v.title}</h4>
                  <p className="text-sm text-navy-500 leading-relaxed">{v.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-navy-900 py-16 md:py-20">
        <div className="container-wide text-center">
          <ScrollReveal>
            <h2 className="font-serif text-heading-lg text-white mb-6">
              Come see for yourself.
            </h2>
            <p className="text-white/50 mb-8 max-w-md mx-auto">
              The campus is open for visits. Call ahead or just walk in.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/contact" className="btn-gold">
                Get in Touch
              </Link>
              <Link href="/admissions" className="btn-outline border-white/30 text-white hover:bg-white/10 hover:border-white/50">
                View Admissions
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
