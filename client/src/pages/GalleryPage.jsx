import { useState } from "react";
import PageShell from "../components/PageShell";
import Lightbox from "../components/Lightbox";
import { galleryImages } from "../data/frontendContent";

export default function GalleryPage() {
  const [active, setActive] = useState(null);

  return (
    <PageShell>
      <section className="section-wrap py-16">
        <h1 className="font-heading text-4xl font-extrabold">Gallery</h1>
        <p className="mt-3 text-slate-600 dark:text-slate-300">Take a quick look at our space, classes, and member journey moments.</p>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {galleryImages.map((img) => (
            <button key={img._id} onClick={() => setActive(img)} className="overflow-hidden rounded-2xl text-left shadow-soft">
              <img src={img.imageUrl} alt={img.title} className="h-64 w-full object-cover transition hover:scale-105" />
            </button>
          ))}
        </div>
        <Lightbox image={active} onClose={() => setActive(null)} />
      </section>
    </PageShell>
  );
}
