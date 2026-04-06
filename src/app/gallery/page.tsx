"use client";

import { useState, useEffect } from "react";
import { ScrollReveal, PageHero } from "@/components/shared";
import { X, ZoomIn, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const categories = ["All", "Campus", "Events", "Sports", "Academics"];

export default function GalleryPage() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [lightbox, setLightbox] = useState<number | null>(null);
  const [images, setImages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadGallery() {
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
    loadGallery();
  }, []);

  const filtered =
    activeFilter === "All"
      ? images
      : images.filter((img: any) => img.category === activeFilter);

  const openLightbox = (i: number) => setLightbox(i);
  const closeLightbox = () => setLightbox(null);

  return (
    <>
      <PageHero
        title="Gallery"
        subtitle="A look inside the campus, the classrooms, and the events."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Gallery" },
        ]}
      />

      <section className="section bg-white">
        <div className="container-wide">
          {/* Filter */}
          <ScrollReveal>
            <div className="flex flex-wrap gap-2 mb-12">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveFilter(cat)}
                  className={`px-5 py-2.5 text-xs font-sans font-semibold uppercase tracking-[0.15em] transition-all duration-200 ${
                    activeFilter === cat
                      ? "bg-navy-800 text-white"
                      : "bg-neutral-100 text-navy-500 hover:bg-neutral-200"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </ScrollReveal>

          {/* Loading */}
          {loading ? (
            <div className="flex justify-center py-20">
              <Loader2 size={32} className="text-navy-300 animate-spin" />
            </div>
          ) : (
            <>
              {/* Grid — editorial masonry-style with varying sizes */}
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-px bg-neutral-200">
                {filtered.map((img: any, i: number) => {
                  // Alternate between regular and tall items for visual interest
                  const isTall = i % 5 === 0 || i % 7 === 0;
                  return (
                    <ScrollReveal
                      key={img._id || img.url + i}
                      delay={i * 0.04}
                      className={isTall ? "row-span-2" : ""}
                    >
                      <div
                        className="relative bg-neutral-100 overflow-hidden group cursor-pointer h-full"
                        onClick={() => openLightbox(i)}
                      >
                        <img
                          src={img.url}
                          alt={img.caption}
                          className="img-editorial h-full min-h-[200px] group-hover:scale-105 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-navy-950/0 group-hover:bg-navy-950/50 transition-colors duration-300 flex items-end">
                          <div className="p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                            <p className="text-white text-sm font-medium">{img.caption}</p>
                            <p className="text-white/50 text-xs mt-0.5">{img.category}</p>
                          </div>
                          <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <ZoomIn size={20} className="text-white" />
                          </div>
                        </div>
                      </div>
                    </ScrollReveal>
                  );
                })}
              </div>

              {filtered.length === 0 && (
                <div className="text-center py-20">
                  <p className="text-navy-400">No images in this category yet.</p>
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-navy-950/95 flex items-center justify-center p-4"
            onClick={closeLightbox}
          >
            <button
              onClick={closeLightbox}
              className="absolute top-6 right-6 text-white/60 hover:text-white p-2 z-10"
              aria-label="Close lightbox"
            >
              <X size={28} />
            </button>
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="max-w-5xl max-h-[85vh] w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={filtered[lightbox]?.url}
                alt={filtered[lightbox]?.caption}
                className="w-full h-full object-contain"
              />
              <div className="mt-4 text-center">
                <p className="text-white text-sm">{filtered[lightbox]?.caption}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
