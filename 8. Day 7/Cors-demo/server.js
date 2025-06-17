import express from "express";
import cors from "cors";

const app = express();
const PORT = 4000;

// Enable CORS
app.use(cors());

// API endpoint
app.get("/api/time", (req, res) => {
  res.json({ now: new Date().toLocaleString() });
});

// Start the server
app.listen(PORT, () => {
  console.log(`API server running on     fetch("http://localhost:4000/api/time")
`);
});
