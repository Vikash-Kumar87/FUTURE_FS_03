import express from "express";
import crypto from "node:crypto";
import { readDb, writeDb } from "../store.js";

export const publicRoutes = express.Router();

publicRoutes.get("/health", (_req, res) => {
  res.json({ ok: true });
});

publicRoutes.post("/contact", async (req, res) => {
  const { name, email, phone, message } = req.body ?? {};

  if (!name || !email || !phone || !message) {
    return res.status(400).json({ message: "name, email, phone and message are required." });
  }

  const db = await readDb();
  const newItem = {
    id: crypto.randomUUID(),
    name: String(name).trim(),
    email: String(email).trim(),
    phone: String(phone).trim(),
    message: String(message).trim(),
    createdAt: new Date().toISOString()
  };

  db.contacts.unshift(newItem);
  await writeDb(db);

  return res.status(201).json({ success: true, item: newItem });
});

publicRoutes.post("/appointments", async (req, res) => {
  const { name, service, date } = req.body ?? {};

  if (!name || !service || !date) {
    return res.status(400).json({ message: "name, service and date are required." });
  }

  const db = await readDb();
  const newItem = {
    id: crypto.randomUUID(),
    name: String(name).trim(),
    service: String(service).trim(),
    date: String(date).trim(),
    createdAt: new Date().toISOString()
  };

  db.appointments.unshift(newItem);
  await writeDb(db);

  return res.status(201).json({ success: true, item: newItem });
});
