//! PACKAGES
const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const exphbs = require("express-handlebars");
require("dotenv").config();

//! FILES
const socketRouter = require("./routes/socketRoutes");

//! VARIABLES
const PORT = 5000;
const uri = process.env.MONGODB_URI;

//! APP
const app = express();

//! HANDLEBARS
app.engine("handlebars", exphbs());
app.set("view engine", "handlebars");

//! MIDDLEWARE

//! SOCKET.IO
// const server = require("http").createServer(app);
const io = require('socket.io')(app)

//! ROUTERS
app.get("/", (req, res) => {
  console.log("on root route");
});

app.use("/chat", socketRouter);

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
