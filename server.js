import express from "express";
import cors from "cors";

const app = express();
const PORT = 4000;

app.use(cors()); // Enable CORS
app.use(express.static("public")); // Serve static files

app.get("/api/time", (req, res) => {
  res.json({ now: new Date().toISOString() });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
