//! PACKAGES
const express = require("express");
const mongoose = require("mongoose");
const expressSession = require('express-session')

const path = require("path");
require("dotenv").config();

//! VARIABLES
const PORT = 5000;
const uri = process.env.MONGODB_URI

//! APP
const app = express();

//! MIDDLEWARE
app.use(express.static(path.join(__dirname, "../client")));

//! ROUTERS
app.get("/", (req, res) => {
  console.log("on root route");
});

//! DATABASE
mongoose.connect(
  uri,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => {
    console.log("Connected to db");
  }
);

//! APP LISTEN
app.listen(PORT, () => {
  console.log(`Listening at localhost:${PORT}`);
});
