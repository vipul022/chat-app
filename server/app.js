const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const PORT = 5000;

const app = express();

app.use(express.static(path.join(__dirname, "../client")));

app.get("/", (req, res) => {
  console.log("on root route");
});

app.listen(PORT, () => {
  console.log(`Listening at localhost:${PORT}`);
});
