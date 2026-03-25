export default function ThemeToggle({ dark, onToggle }) {
  return (
    <button
      onClick={onToggle}
      className="rounded-full border border-slate-300 bg-white/70 px-3 py-2 text-xs font-semibold text-slate-700 shadow-soft transition hover:scale-105 dark:border-slate-700 dark:bg-slate-900/70 dark:text-slate-200"
      aria-label="Toggle dark mode"
    >
      {dark ? "Light" : "Dark"}
    </button>
  );
}
