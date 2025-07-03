const express = require("express"); // Use require for Node.js CommonJS
const path = require("path");

const app = express(); // ✅ Define app before using it

// Serve static files from the current directory (which is 'public')
app.use(express.static(__dirname));

app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
