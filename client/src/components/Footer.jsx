import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { business } from "../data/siteData";

export default function Footer() {
  const footerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: footerRef,
    offset: ["start end", "end start"]
  });
  const glowY = useTransform(scrollYProgress, [0, 1], [-22, 22]);
  const glowScale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);

  return (
    <footer ref={footerRef} className="relative mt-16 overflow-hidden border-t border-slate-200/70 py-12 dark:border-slate-800/80">
      <motion.div className="footer-glow" style={{ y: glowY, scale: glowScale }} />
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: 0.5 }}
        className="section-wrap relative"
      >
        <div className="glass grid gap-6 p-6 md:grid-cols-3 md:p-8">
          <div>
            <h3 className="font-heading text-xl font-extrabold tracking-tight">{business.name}</h3>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">{business.tagline}</p>
            <p className="mt-4 text-xs uppercase tracking-[0.2em] text-brand-600">Built for consistent progress</p>
          </div>
          <div>
            <p className="text-sm font-semibold">Contact</p>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">{business.phone || "Add business phone in env"}</p>
            <p className="text-sm text-slate-600 dark:text-slate-300">{business.email || "Add business email in env"}</p>
          </div>
          <div>
            <p className="text-sm font-semibold">Address</p>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">{business.address || "Add business address in env"}</p>
          </div>
        </div>

        <div className="mt-5 flex flex-wrap items-center justify-between gap-2 px-1 text-xs text-slate-500 dark:text-slate-400">
          <span>{new Date().getFullYear()} {business.name}. All rights reserved.</span>
          <span className="rounded-full border border-slate-300/70 px-3 py-1 dark:border-slate-700/80">Modern local business experience</span>
        </div>
      </motion.div>
    </footer>
  );
}
