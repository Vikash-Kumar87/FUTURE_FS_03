import express from "express";
import { adminAuth } from "../middleware/adminAuth.js";
import { readDb, writeDb } from "../store.js";

export const adminRoutes = express.Router();

adminRoutes.use(adminAuth);

adminRoutes.get("/contacts", async (_req, res) => {
  const db = await readDb();
  res.json({ items: db.contacts });
});

adminRoutes.get("/appointments", async (_req, res) => {
  const db = await readDb();
  res.json({ items: db.appointments });
});

adminRoutes.delete("/contacts/:id", async (req, res) => {
  const db = await readDb();
  const before = db.contacts.length;
  db.contacts = db.contacts.filter((item) => item.id !== req.params.id);

  if (db.contacts.length === before) {
    return res.status(404).json({ message: "Contact item not found." });
  }

  await writeDb(db);
  return res.json({ success: true });
});

adminRoutes.delete("/appointments/:id", async (req, res) => {
  const db = await readDb();
  const before = db.appointments.length;
  db.appointments = db.appointments.filter((item) => item.id !== req.params.id);

  if (db.appointments.length === before) {
    return res.status(404).json({ message: "Appointment item not found." });
  }

  await writeDb(db);
  return res.json({ success: true });
});

adminRoutes.delete("/all", async (_req, res) => {
  await writeDb({ contacts: [], appointments: [] });
  return res.json({ success: true });
});
