import express from "express";
import bodyParser from "body-parser";

const app = express();
const PORT = 3000;

// Middleware to parse JSON body
app.use(bodyParser.json());

// POST /api/echo route
app.post("/api/echo", (req, res) => {
  res.json({ you: req.body });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
