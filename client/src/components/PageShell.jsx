import { motion } from "framer-motion";

export default function PageShell({ children }) {
  return (
    <motion.main
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
      className="min-h-[70vh]"
    >
      {children}
    </motion.main>
  );
}
