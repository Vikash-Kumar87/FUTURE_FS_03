import { useEffect, useState } from "react";
import PageShell from "../components/PageShell";
import { enqueueItem, getQueuedItems } from "../utils/offlineQueue";
import { createAppointment } from "../lib/api";

const initial = { name: "", service: "Personal Training", date: "" };
const APPOINTMENT_QUEUE_KEY = "offline.appointment.queue";

export default function AppointmentPage() {
  const [form, setForm] = useState(initial);
  const [status, setStatus] = useState("");
  const [queuedCount, setQueuedCount] = useState(0);

  useEffect(() => {
    setQueuedCount(getQueuedItems(APPOINTMENT_QUEUE_KEY).length);
  }, []);

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      await createAppointment(form);
      setStatus("Appointment request sent successfully.");
      setForm(initial);
    } catch {
      if (navigator.onLine) {
        setStatus("Could not send appointment to server. Please try again.");
        return;
      }

      const count = enqueueItem(APPOINTMENT_QUEUE_KEY, form);
      setQueuedCount(count);
      setStatus("Backend unavailable. Appointment request saved locally.");
      setForm(initial);
    }
  }

  return (
    <PageShell>
      <section className="section-wrap py-16">
        <h1 className="font-heading text-4xl font-extrabold">Book an Appointment</h1>
        {queuedCount > 0 ? (
          <div className="mt-4 rounded-xl border border-amber-300 bg-amber-50 p-3 text-sm text-amber-800 dark:border-amber-800 dark:bg-amber-950/40 dark:text-amber-200">
            {queuedCount} appointment request(s) saved in this browser.
          </div>
        ) : null}
        <form onSubmit={handleSubmit} className="glass mt-8 max-w-2xl space-y-4 p-6">
          <input className="w-full rounded-xl border bg-white/80 p-3 dark:bg-slate-900/70" placeholder="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
          <select className="w-full rounded-xl border bg-white/80 p-3 dark:bg-slate-900/70" value={form.service} onChange={(e) => setForm({ ...form, service: e.target.value })}>
            <option>Personal Training</option>
            <option>Group Functional Classes</option>
            <option>Nutrition Coaching</option>
          </select>
          <input className="w-full rounded-xl border bg-white/80 p-3 dark:bg-slate-900/70" type="date" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} required />
          <button className="rounded-xl bg-brand-600 px-5 py-3 text-sm font-semibold text-white hover:bg-brand-700">Submit Request</button>
          <p className="text-sm text-slate-600 dark:text-slate-300">{status}</p>
        </form>
      </section>
    </PageShell>
  );
}
