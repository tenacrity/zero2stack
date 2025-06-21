import express from "express";
const app = express();
// Define a GET route
app.get("/api/hello", (req, res) => {
  res.json({ msg: "Hello from Express!" });
});
// Start the server
app.listen(3000, () => {
  console.log("Listening on http://localhost:3000/api/hello");
});