const express = require("express");

const app = express();

// ✅ VERY IMPORTANT: respond immediately
app.get("/", (req, res) => {
  res.send("✅ KENYA045 MEDIA HUB LIVE");
});

// ✅ health check (Railway uses this internally sometimes)
app.get("/health", (req, res) => {
  res.send("OK");
});

// ✅ bookings (basic working API)
let bookings = [];

app.use(express.json());

app.post("/api/book", (req, res) => {
  bookings.push(req.body);
  res.json({ success: true });
});

app.get("/api/bookings", (req, res) => {
  res.json(bookings);
});

// ✅ FORCE PORT (CRITICAL FIX)
const PORT = process.env.PORT;

// ❗ HARD FAIL if port missing (debugging)
if (!PORT) {
  console.error("❌ PORT not provided by Railway");
  process.exit(1);
}

// ✅ BIND CORRECTLY
app.listen(PORT, "0.0.0.0", () => {
  console.log("🚀 Server running on port", PORT);
});
