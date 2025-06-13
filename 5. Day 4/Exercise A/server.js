// server.js
import express from "express";
const app = express();

app.get("/api/hello", (req, res) => {
  res.json({ msg: "Hello from Express!" });
});

app.listen(3000, () => {
  console.log("Listening on http://localhost:3000");
});
