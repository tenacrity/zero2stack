 import express from "express";
 const app = express();
  app.use(express.static("public"));
 app.get("/api/hello", (req,res) => res.json({ msg: "Hello from Express!" 
}));
 app.listen(3000, () => console.log("Listening on 3000"));