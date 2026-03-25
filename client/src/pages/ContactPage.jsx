import { useEffect, useState } from "react";
import PageShell from "../components/PageShell";
import { enqueueItem, getQueuedItems } from "../utils/offlineQueue";
import { createContact } from "../lib/api";

const initial = { name: "", email: "", phone: "", message: "" };
const CONTACT_QUEUE_KEY = "offline.contact.queue";

export default function ContactPage() {
  const [form, setForm] = useState(initial);
  const [status, setStatus] = useState("");
  const [queuedCount, setQueuedCount] = useState(0);

  useEffect(() => {
    setQueuedCount(getQueuedItems(CONTACT_QUEUE_KEY).length);
  }, []);

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      await createContact(form);
      setStatus("Thanks! Your message has been sent.");
      setForm(initial);
    } catch (error) {
      if (navigator.onLine) {
        setStatus(error?.message || "Could not send message to server. Please try again.");
        return;
      }

      const count = enqueueItem(CONTACT_QUEUE_KEY, form);
      setQueuedCount(count);
      setStatus("Backend unavailable. Your message is saved locally.");
      setForm(initial);
    }
  }

  return (
    <PageShell>
      <section className="section-wrap py-16">
        <h1 className="font-heading text-4xl font-extrabold">Contact Us</h1>
        {queuedCount > 0 ? (
          <div className="mt-4 rounded-xl border border-amber-300 bg-amber-50 p-3 text-sm text-amber-800 dark:border-amber-800 dark:bg-amber-950/40 dark:text-amber-200">
            {queuedCount} message(s) saved in this browser.
          </div>
        ) : null}
        <form onSubmit={handleSubmit} className="glass mt-8 max-w-2xl space-y-4 p-6">
          <input className="w-full rounded-xl border bg-white/80 p-3 dark:bg-slate-900/70" placeholder="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
          <input className="w-full rounded-xl border bg-white/80 p-3 dark:bg-slate-900/70" placeholder="Email" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />
          <input className="w-full rounded-xl border bg-white/80 p-3 dark:bg-slate-900/70" placeholder="Phone" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} required />
          <textarea className="w-full rounded-xl border bg-white/80 p-3 dark:bg-slate-900/70" rows="5" placeholder="Message" value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} required />
          <button className="rounded-xl bg-brand-600 px-5 py-3 text-sm font-semibold text-white hover:bg-brand-700">Send Message</button>
          <p className="text-sm text-slate-600 dark:text-slate-300">{status}</p>
        </form>

        <div className="mt-10 overflow-hidden rounded-2xl shadow-soft">
          <iframe
            title="Business Location"
            src="https://www.google.com/maps?q=MG%20Road%20Bengaluru&output=embed"
            className="h-80 w-full"
            loading="lazy"
          />
        </div>
      </section>
    </PageShell>
  );
}
