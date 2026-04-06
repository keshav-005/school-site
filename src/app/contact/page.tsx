"use client";

import { useState } from "react";
import { ScrollReveal, SectionHeading, PageHero } from "@/components/shared";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  CheckCircle2,
  AlertCircle,
  Send,
} from "lucide-react";
import { SCHOOL_INFO } from "@/lib/utils";

export default function ContactPage() {
  const [formState, setFormState] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [formError, setFormError] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setFormState("submitting");
    setFormError("");

    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form));

    try {
      const res = await fetch("/api/contact", {
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
      setFormError(err instanceof Error ? err.message : "Failed to send message. Please try again.");
    }
  }

  return (
    <>
      <PageHero
        title="Contact"
        subtitle="Visit the campus, call us, or send a message."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Contact" },
        ]}
      />

      <section className="section bg-white">
        <div className="container-wide">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
            {/* Contact Info */}
            <div className="lg:col-span-1 space-y-0">
              <ScrollReveal>
                <SectionHeading label="Reach Us" title="Get in touch." />
              </ScrollReveal>

              <div className="space-y-px bg-neutral-200 border border-neutral-200">
                <ScrollReveal delay={0.05}>
                  <a
                    href={`tel:${SCHOOL_INFO.phone}`}
                    className="flex items-start gap-4 p-6 bg-white hover:bg-navy-50 transition-colors group"
                  >
                    <Phone size={20} className="text-gold-400 mt-0.5 shrink-0" />
                    <div>
                      <span className="block text-xs font-sans font-semibold uppercase tracking-[0.15em] text-navy-400 mb-1">
                        Phone
                      </span>
                      <span className="block text-navy-800 font-medium group-hover:text-navy-600">
                        {SCHOOL_INFO.phone}
                      </span>
                      <span className="block text-sm text-navy-500">
                        {SCHOOL_INFO.phoneAlt}
                      </span>
                    </div>
                  </a>
                </ScrollReveal>

                <ScrollReveal delay={0.1}>
                  <a
                    href={`mailto:${SCHOOL_INFO.email}`}
                    className="flex items-start gap-4 p-6 bg-white hover:bg-navy-50 transition-colors group"
                  >
                    <Mail size={20} className="text-gold-400 mt-0.5 shrink-0" />
                    <div>
                      <span className="block text-xs font-sans font-semibold uppercase tracking-[0.15em] text-navy-400 mb-1">
                        Email
                      </span>
                      <span className="block text-navy-800 font-medium group-hover:text-navy-600">
                        {SCHOOL_INFO.email}
                      </span>
                    </div>
                  </a>
                </ScrollReveal>

                <ScrollReveal delay={0.15}>
                  <div className="flex items-start gap-4 p-6 bg-white">
                    <MapPin size={20} className="text-gold-400 mt-0.5 shrink-0" />
                    <div>
                      <span className="block text-xs font-sans font-semibold uppercase tracking-[0.15em] text-navy-400 mb-1">
                        Address
                      </span>
                      <span className="block text-navy-800 text-sm leading-relaxed">
                        {SCHOOL_INFO.address}
                      </span>
                    </div>
                  </div>
                </ScrollReveal>

                <ScrollReveal delay={0.2}>
                  <div className="flex items-start gap-4 p-6 bg-white">
                    <Clock size={20} className="text-gold-400 mt-0.5 shrink-0" />
                    <div>
                      <span className="block text-xs font-sans font-semibold uppercase tracking-[0.15em] text-navy-400 mb-1">
                        Office Hours
                      </span>
                      <span className="block text-navy-800 text-sm">
                        Monday – Saturday
                      </span>
                      <span className="block text-navy-500 text-sm">
                        8:00 AM – 3:00 PM
                      </span>
                    </div>
                  </div>
                </ScrollReveal>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <ScrollReveal>
                <SectionHeading
                  label="Send a Message"
                  title="We will respond within 24 hours."
                />
              </ScrollReveal>

              {formState === "success" ? (
                <ScrollReveal>
                  <div className="bg-emerald-50 border border-emerald-200 p-8 text-center">
                    <CheckCircle2 size={40} className="text-emerald-500 mx-auto mb-4" />
                    <h3 className="font-serif text-xl text-navy-800 mb-2">
                      Message sent.
                    </h3>
                    <p className="text-sm text-navy-500">
                      Thank you for reaching out. We will get back to you shortly.
                    </p>
                    <button
                      onClick={() => setFormState("idle")}
                      className="mt-6 text-sm font-semibold text-navy-800 uppercase tracking-[0.1em] underline"
                    >
                      Send another message
                    </button>
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
                        Name *
                      </label>
                      <input
                        name="name"
                        required
                        className="w-full px-4 py-3 bg-white border border-neutral-200 text-sm text-navy-800 focus:outline-none focus:border-navy-400 transition-colors"
                        placeholder="Your full name"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-sans font-semibold uppercase tracking-[0.15em] text-navy-600 mb-2">
                        Email *
                      </label>
                      <input
                        name="email"
                        type="email"
                        required
                        className="w-full px-4 py-3 bg-white border border-neutral-200 text-sm text-navy-800 focus:outline-none focus:border-navy-400 transition-colors"
                        placeholder="your@email.com"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-sans font-semibold uppercase tracking-[0.15em] text-navy-600 mb-2">
                        Phone (optional)
                      </label>
                      <input
                        name="phone"
                        type="tel"
                        className="w-full px-4 py-3 bg-white border border-neutral-200 text-sm text-navy-800 focus:outline-none focus:border-navy-400 transition-colors"
                        placeholder="10 digit mobile number"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-sans font-semibold uppercase tracking-[0.15em] text-navy-600 mb-2">
                        Subject *
                      </label>
                      <input
                        name="subject"
                        required
                        className="w-full px-4 py-3 bg-white border border-neutral-200 text-sm text-navy-800 focus:outline-none focus:border-navy-400 transition-colors"
                        placeholder="What is this about?"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-sans font-semibold uppercase tracking-[0.15em] text-navy-600 mb-2">
                      Message *
                    </label>
                    <textarea
                      name="message"
                      required
                      rows={6}
                      className="w-full px-4 py-3 bg-white border border-neutral-200 text-sm text-navy-800 focus:outline-none focus:border-navy-400 transition-colors resize-none"
                      placeholder="Your message..."
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={formState === "submitting"}
                    className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {formState === "submitting" ? "Sending..." : "Send Message"}
                    {formState !== "submitting" && <Send size={16} className="ml-2" />}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Map */}
      <section className="h-[450px] w-full bg-neutral-200">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3405.5!2d75.911!3d31.532!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x391ad5313cce6d27%3A0x7e1dce513b5c9f22!2sTriple+M+Public+School!5e0!3m2!1sen!2sin!4v1"
          className="w-full h-full border-0"
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Triple M Public School Location"
        />
      </section>
    </>
  );
}
