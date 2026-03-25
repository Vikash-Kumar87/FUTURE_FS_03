import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import PageShell from "../components/PageShell";
import { business } from "../data/siteData";
import { galleryImages, services, testimonials } from "../data/frontendContent";

export default function HomePage() {
  const homeServices = services.slice(0, 3);
  const homeGallery = galleryImages.slice(0, 4);

  return (
    <PageShell>
      <section className="section-wrap py-16 md:py-24">
        <div className="glass p-8 md:p-12">
          <p className="text-sm font-bold uppercase tracking-widest text-brand-600">Local Fitness Studio</p>
          <h1 className="mt-4 font-heading text-4xl font-extrabold leading-tight md:text-6xl">
            Build a healthier you at {business.name}
          </h1>
          <p className="mt-5 max-w-2xl text-slate-600 dark:text-slate-300">
            Professional coaching, modern equipment, and personalized plans to help you become stronger and more confident.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/appointments" className="rounded-xl bg-brand-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-brand-700">
              Book Free Consultation
            </Link>
            <Link to="/services" className="rounded-xl border border-slate-300 px-5 py-3 text-sm font-semibold">
              Explore Services
            </Link>
          </div>
        </div>
      </section>

      <section className="section-wrap pb-16">
        <h2 className="font-heading text-2xl font-bold">Services</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {homeServices.map((service) => (
            <motion.article key={service._id} whileHover={{ y: -6 }} transition={{ duration: 0.25 }} className="glass p-6">
              <h3 className="font-heading text-xl font-bold">{service.title}</h3>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">{service.description}</p>
              <p className="mt-4 text-sm font-bold text-brand-600">{service.price}</p>
            </motion.article>
          ))}
        </div>
      </section>

      <section className="section-wrap pb-16">
        <h2 className="font-heading text-2xl font-bold">Testimonials</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {testimonials.map((item) => (
            <div key={item.name} className="glass p-6">
              <p className="text-sm text-slate-600 dark:text-slate-300">"{item.quote}"</p>
              <p className="mt-4 font-semibold">- {item.name}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="section-wrap pb-16">
        <div className="flex items-center justify-between gap-4">
          <h2 className="font-heading text-2xl font-bold">Gallery Preview</h2>
          <Link to="/gallery" className="text-sm font-semibold text-brand-600">
            View All
          </Link>
        </div>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 md:grid-cols-4">
          {homeGallery.map((img) => (
            <img key={img._id} src={img.imageUrl} alt={img.title} className="h-44 w-full rounded-2xl object-cover shadow-soft" />
          ))}
        </div>
      </section>

      <section className="section-wrap pb-20">
        <div className="glass grid gap-6 p-8 md:grid-cols-2 md:p-10">
          <div>
            <h2 className="font-heading text-2xl font-bold">Ready to start your fitness journey?</h2>
            <p className="mt-3 text-sm text-slate-600 dark:text-slate-300">Get in touch with us and schedule your first session today.</p>
          </div>
          <div className="flex items-center gap-3 md:justify-end">
            <Link to="/contact" className="rounded-xl bg-accent-500 px-5 py-3 text-sm font-semibold text-slate-900 hover:bg-accent-600">
              Contact Us
            </Link>
            <Link to="/appointments" className="rounded-xl border border-slate-300 px-5 py-3 text-sm font-semibold">
              Book Appointment
            </Link>
          </div>
        </div>
      </section>

      <section className="section-wrap pb-20">
        <div className="glass p-8 md:p-10">
          <h2 className="font-heading text-2xl font-bold">Contact Preview</h2>
          <p className="mt-3 text-sm text-slate-600 dark:text-slate-300">
            Visit us at MG Road, Bengaluru or call our team for membership guidance and schedule options.
          </p>
          <Link to="/contact" className="mt-5 inline-block rounded-xl border border-slate-300 px-4 py-2 text-sm font-semibold">
            Open Contact Page
          </Link>
        </div>
      </section>
    </PageShell>
  );
}
