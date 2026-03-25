try {
  require("dotenv").config();
} catch (e) {
  console.log("dotenv not found, skipping...");
}

const express = require("express");
const path = require("path");

const app = express();

app.use(express.json());

// ✅ HEALTH CHECK (VERY IMPORTANT FOR RAILWAY)
app.get("/health", (req, res) => {
  res.status(200).send("OK");
});

// ✅ Booking system
let bookings = [];

app.post("/api/book", (req, res) => {
  bookings.push(req.body);
  res.json({ success: true, message: "Booking received" });
});

app.get("/api/bookings", (req, res) => {
  res.json(bookings);
});

// ✅ Serve frontend (SAFE VERSION)
const clientPath = path.resolve(__dirname, "../client/dist");

app.use(express.static(clientPath));

// ✅ FIX: fallback route MUST be correct
app.get("*", (req, res) => {
  res.sendFile(path.join(clientPath, "index.html"), (err) => {
    if (err) {
      res.status(500).send("Frontend not built");
    }
  });
});

// ✅ CRITICAL: Railway binding fix
const PORT = process.env.PORT || 3000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});
