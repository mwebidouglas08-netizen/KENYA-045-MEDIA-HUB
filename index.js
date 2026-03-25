const express = require("express");
const path = require("path");

const app = express();

app.use(express.json());

// ✅ health check
app.get("/health", (req, res) => {
  res.send("OK");
});

// ✅ root test
app.get("/", (req, res) => {
  res.send("KENYA045 MEDIA HUB RUNNING");
});

// ✅ bookings
let bookings = [];

app.post("/api/book", (req, res) => {
  bookings.push(req.body);
  res.json({ success: true });
});

app.get("/api/bookings", (req, res) => {
  res.json(bookings);
});

// ✅ serve frontend
const clientPath = path.join(__dirname, "client/dist");

app.use(express.static(clientPath));

app.get("*", (req, res) => {
  res.sendFile(path.join(clientPath, "index.html"), (err) => {
    if (err) res.send("Frontend not built");
  });
});

// ✅ PORT FIX
const PORT = process.env.PORT || 3000;

app.listen(PORT, "0.0.0.0", () => {
  console.log("Server running on port " + PORT);
});
