import { business } from "../data/siteData";

export default function WhatsAppButton() {
  const href = `https://wa.me/${business.whatsappNumber}?text=Hi%2C%20I%20want%20to%20know%20more%20about%20your%20services.`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="fixed bottom-5 right-5 z-40 rounded-full bg-emerald-500 px-4 py-3 text-sm font-semibold text-white shadow-xl transition hover:scale-105"
    >
      WhatsApp
    </a>
  );
}
