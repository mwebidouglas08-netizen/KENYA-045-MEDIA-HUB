try {
  require("dotenv").config();
} catch (e) {
  console.log("dotenv not found, skipping...");
}

const express = require("express");
const path = require("path");

const app = express();

// IMPORTANT: allow Railway traffic
app.use(express.json());

// ✅ TEST ROUTE (VERY IMPORTANT)
app.get("/health", (req, res) => {
  res.send("OK");
});

// ✅ Booking endpoint
let bookings = [];

app.post("/api/book", (req, res) => {
  bookings.push(req.body);
  res.json({ success: true });
});

app.get("/api/bookings", (req, res) => {
  res.json(bookings);
});

// ✅ Serve frontend
const clientPath = path.join(__dirname, "../client/dist");

app.use(express.static(clientPath));

// FIX: catch-all route MUST be last
app.get("*", (req, res) => {
  res.sendFile(path.join(clientPath, "index.html"));
});

// ✅ CRITICAL FIX FOR RAILWAY
const PORT = process.env.PORT || 3000;

// VERY IMPORTANT: bind to 0.0.0.0
app.listen(PORT, "0.0.0.0", () => {
  console.log("Server running on port " + PORT);
});
