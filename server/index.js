const express = require("express");
const path = require("path");

const app = express();

// ✅ MIDDLEWARE
app.use(express.json());

// ✅ HEALTH CHECK (Railway needs this)
app.get("/health", (req, res) => {
  res.status(200).send("OK");
});

// ✅ TEST ROOT (VERY IMPORTANT)
app.get("/", (req, res) => {
  res.send("KENYA045 MEDIA HUB API RUNNING");
});

// ✅ BOOKINGS
let bookings = [];

app.post("/api/book", (req, res) => {
  bookings.push(req.body);
  res.json({ success: true, message: "Booking received" });
});

app.get("/api/bookings", (req, res) => {
  res.json(bookings);
});

// ✅ SERVE FRONTEND SAFELY
const clientPath = path.resolve(__dirname, "../client/dist");

app.use(express.static(clientPath));

// ⚠️ ONLY serve frontend IF it exists
app.get("*", (req, res) => {
  const indexFile = path.join(clientPath, "index.html");

  res.sendFile(indexFile, (err) => {
    if (err) {
      res.send("Frontend not built yet");
    }
  });
});

// ✅ RAILWAY PORT FIX
const PORT = process.env.PORT || 3000;

// 🔥 IMPORTANT: bind to all interfaces
app.listen(PORT, "0.0.0.0", () => {
  console.log(`✅ Server running on port ${PORT}`);
});
