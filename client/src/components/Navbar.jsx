import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useScroll } from "framer-motion";
import { NavLink, useLocation } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";
import { business } from "../data/siteData";

const links = [
  ["/", "Home"],
  ["/services", "Services"],
  ["/about", "About"],
  ["/gallery", "Gallery"],
  ["/contact", "Contact"],
  ["/appointments", "Book"],
  ["/admin/login", "Admin"]
];

export default function Navbar({ dark, onToggleTheme }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [hoveredPath, setHoveredPath] = useState(null);
  const { scrollY } = useScroll();
  const location = useLocation();
  const lastYRef = useRef(0);

  useEffect(() => {
    const unsub = scrollY.on("change", (value) => {
      setScrolled(value > 14);

      const delta = value - lastYRef.current;
      if (value < 84) {
        setIsHidden(false);
      } else if (delta > 0) {
        setIsHidden(true);
        setMenuOpen(false);
      } else if (delta < 0) {
        setIsHidden(false);
      }

      lastYRef.current = value;
    });
    return () => unsub();
  }, [scrollY]);

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: isHidden ? -120 : 0, opacity: 1 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className={`sticky top-0 z-50 border-b backdrop-blur-xl transition-all duration-300 ${
        scrolled
          ? "border-brand-200/60 bg-white/80 shadow-soft dark:border-brand-700/40 dark:bg-slate-900/80"
          : "border-white/20 bg-white/60 dark:border-slate-800/60 dark:bg-slate-900/60"
      }`}
    >
      <div className="section-wrap flex items-center justify-between gap-2 py-3">
        <NavLink to="/" className="font-heading text-lg font-extrabold tracking-tight text-brand-700 dark:text-brand-50">
          {business.name}
        </NavLink>
        <nav className="hidden items-center gap-2 md:flex">
          {links.map(([to, label]) => (
            <motion.div
              key={to}
              onHoverStart={() => setHoveredPath(to)}
              onHoverEnd={() => setHoveredPath(null)}
              className="relative"
            >
              <NavLink
                to={to}
                state={to === "/admin/login" ? { fromAdminNav: true } : undefined}
                className={({ isActive }) =>
                  `rounded-full px-3 py-2 text-sm font-semibold transition ${
                    isActive
                      ? "bg-brand-500/15 text-brand-700 dark:bg-brand-400/20 dark:text-brand-50"
                      : "text-slate-600 hover:bg-white/70 hover:text-brand-600 dark:text-slate-200 dark:hover:bg-slate-800/60"
                  }`
                }
              >
                {label}
              </NavLink>
              {hoveredPath === to || location.pathname === to ? (
                <motion.span
                  layoutId="nav-underline-trail"
                  className="absolute -bottom-[2px] left-1/2 h-[3px] w-7 -translate-x-1/2 rounded-full bg-gradient-to-r from-brand-500 to-accent-500"
                  transition={{ type: "spring", stiffness: 420, damping: 36 }}
                />
              ) : null}
            </motion.div>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle dark={dark} onToggle={onToggleTheme} />
          <button
            type="button"
            onClick={() => setMenuOpen((prev) => !prev)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-300 bg-white/70 text-slate-700 md:hidden dark:border-slate-700 dark:bg-slate-900/70 dark:text-slate-200"
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
          >
            {menuOpen ? "X" : "="}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {menuOpen ? (
          <motion.nav
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="section-wrap overflow-hidden pb-4 md:hidden"
          >
            <div className="glass flex flex-col gap-1 p-2">
              {links.map(([to, label]) => (
                <NavLink
                  key={to}
                  to={to}
                  state={to === "/admin/login" ? { fromAdminNav: true } : undefined}
                  onClick={() => setMenuOpen(false)}
                  className={({ isActive }) =>
                    `rounded-xl px-3 py-2 text-sm font-semibold transition ${
                      isActive ? "bg-brand-500/15 text-brand-700 dark:text-brand-50" : "text-slate-700 dark:text-slate-200"
                    }`
                  }
                >
                  {label}
                </NavLink>
              ))}
            </div>
          </motion.nav>
        ) : null}
      </AnimatePresence>
    </motion.header>
  );
}
