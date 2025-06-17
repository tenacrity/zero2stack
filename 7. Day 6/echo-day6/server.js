import express from "express";
import bodyParser from "body-parser";

const app = express();
app.use(bodyParser.json());

app.post("/api/echo", (req, res) => {
  res.json({ you: req.body });
});

app.listen(3000, () => {
  console.log("Echo server running at http://localhost:3000");
});