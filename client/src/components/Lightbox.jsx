import { AnimatePresence, motion } from "framer-motion";

export default function Lightbox({ image, onClose }) {
  return (
    <AnimatePresence>
      {image ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 p-4"
        >
          <motion.img
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.25 }}
            src={image.imageUrl}
            alt={image.title}
            className="max-h-[85vh] max-w-4xl rounded-2xl"
          />
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
