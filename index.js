const express = require("express");

const app = express();

// ✅ middleware
app.use(express.json());

// ✅ test route
app.get("/", (req, res) => {
  res.send("🚀 KENYA045 MEDIA HUB SERVER IS LIVE");
});

// ✅ health check (important for Railway)
app.get("/health", (req, res) => {
  res.status(200).send("OK");
});

// ✅ booking route
app.post("/api/book", (req, res) => {
  console.log("📩 Booking received:", req.body);
  res.json({ success: true, message: "Booking received" });
});

// ❗ CRITICAL LINE (DO NOT CHANGE)
const PORT = process.env.PORT || 3000;

// ❗ CRITICAL: bind to 0.0.0.0
app.listen(PORT, "0.0.0.0", () => {
  console.log(`✅ Server running on port ${PORT}`);
});
