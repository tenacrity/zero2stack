const express = require("express");
const app = express();
app.get("/api/error", () => { throw new Error("Oops!"); });
app.use((err, req, res, next) => {
  res.status(500).json({ error: err.message });
});
app.listen(3001, () => {
  console.log("Exercise B running at http://localhost:3001/api/error");
});
