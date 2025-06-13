const express = require("express");
const app = express();

// ✅ Root route
app.get("/", (req, res) => {
  res.send("Welcome! Try /api/time or /api/error");
});

// ✅ /api/time route: returns current ISO time
app.get("/api/time", (_, res) => {
  res.json({ now: new Date().toISOString() });
});

// ✅ /api/error route: simulates an error
app.get("/api/error", () => {
  throw new Error("Oops!");
});

// ✅ Error-handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack); // Optional: logs error to console
  res.status(500).json({ error: err.message });
});

// ✅ Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
