import { motion } from "framer-motion";
import PageShell from "../components/PageShell";
import { services } from "../data/frontendContent";

export default function ServicesPage() {
  return (
    <PageShell>
      <section className="section-wrap py-16">
        <h1 className="font-heading text-4xl font-extrabold">Our Services & Plans</h1>
        <p className="mt-3 max-w-2xl text-slate-600 dark:text-slate-300">Flexible training options designed for beginners and advanced members.</p>
        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {services.map((service) => (
            <motion.article
              key={service._id}
              whileHover={{ y: -8, scale: 1.01 }}
              transition={{ duration: 0.25 }}
              className="glass p-6"
            >
              <h2 className="font-heading text-xl font-bold">{service.title}</h2>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">{service.description}</p>
              <p className="mt-5 inline-block rounded-full bg-brand-50 px-3 py-1 text-sm font-bold text-brand-700 dark:bg-brand-700/20 dark:text-brand-50">
                {service.price}
              </p>
            </motion.article>
          ))}
        </div>
      </section>
    </PageShell>
  );
}
