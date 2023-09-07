const express = require("express");

const app = express();

app.get("/", (req, res) => {
  res.send("Express on Vercel");
});

app.get("/home", (req, res) => {
  res.send("HOME!");
});

app.listen(5000, () => {
  console.log("Running on port 5000!");
});
