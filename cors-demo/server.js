import express from "express";
import cors from "cors";

const app = express();
app.use(cors());

app.get("/", (req, res) => {
  res.send("Server is running!");
});
app.get("/api/time", (req, res) => {
  res.json({ now: new Date().toISOString() });
});

app.listen(4000, () => {
  console.log("Server is listening on port 4000");
});