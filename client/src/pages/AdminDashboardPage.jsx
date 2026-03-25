import { useEffect, useState } from "react";
import PageShell from "../components/PageShell";
import { useAuth } from "../context/AuthContext";
import { clearQueuedItems, getQueuedItems, removeQueuedItemAt } from "../utils/offlineQueue";
import {
  clearAdminData,
  deleteAdminAppointment,
  deleteAdminContact,
  getAdminAppointments,
  getAdminContacts
} from "../lib/api";

const CONTACT_QUEUE_KEY = "offline.contact.queue";
const APPOINTMENT_QUEUE_KEY = "offline.appointment.queue";

export default function AdminDashboardPage() {
  const { logout, user } = useAuth();
  const [contacts, setContacts] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [status, setStatus] = useState("Loading submissions...");

  useEffect(() => {
    async function loadDashboardData() {
      try {
        const [contactsResponse, appointmentsResponse] = await Promise.all([
          getAdminContacts(user?.email),
          getAdminAppointments(user?.email)
        ]);

        setContacts(contactsResponse.items || []);
        setAppointments(appointmentsResponse.items || []);
        setStatus("Showing backend data.");
      } catch {
        setContacts(getQueuedItems(CONTACT_QUEUE_KEY));
        setAppointments(getQueuedItems(APPOINTMENT_QUEUE_KEY));
        setStatus("Backend unavailable. Showing local browser data.");
      }
    }

    loadDashboardData();
  }, [user?.email]);

  async function handleDeleteContact(index, id) {
    if (id) {
      try {
        await deleteAdminContact(user?.email, id);
        setContacts((prev) => prev.filter((item) => item.id !== id));
        return;
      } catch {
        setStatus("Could not delete from backend.");
        return;
      }
    }

    removeQueuedItemAt(CONTACT_QUEUE_KEY, index);
    setContacts(getQueuedItems(CONTACT_QUEUE_KEY));
  }

  async function handleDeleteAppointment(index, id) {
    if (id) {
      try {
        await deleteAdminAppointment(user?.email, id);
        setAppointments((prev) => prev.filter((item) => item.id !== id));
        return;
      } catch {
        setStatus("Could not delete from backend.");
        return;
      }
    }

    removeQueuedItemAt(APPOINTMENT_QUEUE_KEY, index);
    setAppointments(getQueuedItems(APPOINTMENT_QUEUE_KEY));
  }

  async function handleClearAll() {
    try {
      await clearAdminData(user?.email);
      setContacts([]);
      setAppointments([]);
      setStatus("All backend records cleared.");
    } catch {
      clearQueuedItems(CONTACT_QUEUE_KEY);
      clearQueuedItems(APPOINTMENT_QUEUE_KEY);
      setContacts([]);
      setAppointments([]);
      setStatus("Backend unavailable. Local browser data cleared.");
    }
  }

  return (
    <PageShell>
      <section className="section-wrap py-16">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h1 className="font-heading text-4xl font-extrabold">Admin Dashboard</h1>
          <div className="flex items-center gap-2">
            <button onClick={handleClearAll} className="rounded-xl border border-rose-300 px-4 py-2 text-sm font-semibold text-rose-600">Clear Local Data</button>
            <button onClick={logout} className="rounded-xl border border-slate-300 px-4 py-2 text-sm font-semibold">Logout</button>
          </div>
        </div>
        <p className="mt-3 text-sm text-slate-600 dark:text-slate-300">{status}</p>

        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          <div className="glass p-6">
            <h2 className="font-heading text-2xl font-bold">Contact Messages</h2>
            <div className="mt-4 space-y-3">
              {contacts.map((item, index) => (
                <article key={item.id || `${item.queuedAt}-${index}`} className="rounded-xl border bg-white/70 p-4 dark:bg-slate-900/50">
                  <p className="font-semibold">{item.name} ({item.email})</p>
                  <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">Phone: {item.phone || "N/A"}</p>
                  <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">{item.message}</p>
                  <button onClick={() => handleDeleteContact(index, item.id)} className="mt-3 text-sm font-semibold text-rose-500">Delete</button>
                </article>
              ))}
              {!contacts.length && <p className="text-sm text-slate-600">No messages yet.</p>}
            </div>
          </div>

          <div className="glass p-6">
            <h2 className="font-heading text-2xl font-bold">Appointment Requests</h2>
            <div className="mt-4 space-y-3">
              {appointments.map((item, index) => (
                <article key={item.id || `${item.queuedAt}-${index}`} className="rounded-xl border bg-white/70 p-4 dark:bg-slate-900/50">
                  <p className="font-semibold">{item.name}</p>
                  <p className="text-sm text-slate-600 dark:text-slate-300">Service: {item.service}</p>
                  <p className="text-sm text-slate-600 dark:text-slate-300">Date: {item.date}</p>
                  <button onClick={() => handleDeleteAppointment(index, item.id)} className="mt-3 text-sm font-semibold text-rose-500">Delete</button>
                </article>
              ))}
              {!appointments.length && <p className="text-sm text-slate-600">No appointments yet.</p>}
            </div>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
