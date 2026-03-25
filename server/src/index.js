import "dotenv/config";
import cors from "cors";
import express from "express";
import { adminRoutes } from "./routes/adminRoutes.js";
import { publicRoutes } from "./routes/publicRoutes.js";

const app = express();
const port = Number(process.env.PORT || 4000);
const allowedOrigins = (process.env.CLIENT_ORIGIN || "http://localhost:5173")
  .split(",")
  .map((value) => value.trim())
  .filter(Boolean);

app.use(
  cors({
    origin(origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
        return;
      }
      callback(new Error(`CORS blocked for origin: ${origin}`));
    }
  })
);
app.use(express.json());

app.use("/api", publicRoutes);
app.use("/api/admin", adminRoutes);

app.use((err, _req, res, _next) => {
  console.error(err);
  res.status(500).json({ message: "Internal server error" });
});

app.listen(port, () => {
  console.log(`Backend running on http://localhost:${port}`);
});
