const express = require("express");
const app = express();
app.get("/api/time", (_, res) => 
  res.json({ now: new Date().toISOString()
  }));
app.listen(3000, () => {
  console.log("Exercise A running at http://localhost:3000/api/time");
});