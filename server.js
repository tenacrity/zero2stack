// server.js

import express from "express";

const app = express();

// Route: GET /api/hello
app.get("/api/hello", (req, res) => {
  res.json({ msg: "Hello from Express!" });
});

app.use(express.static("public"));
// Start the server
app.listen(3000, () => {
  console.log("Listening on port 3000");
});
