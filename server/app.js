const express = require("express");
const mongoose = require("mongoose");
const PORT = 5000;

const app = express();

app.listen(PORT, () => {
  console.log(`Listening at localhost:${PORT}`);
});
