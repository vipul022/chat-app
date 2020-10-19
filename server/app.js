//! PACKAGES
const express = require("express");
const mongoose = require("mongoose");
// const path = require("path");
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
const server = require("http").createServer(app);
const io = require("socket.io")(server);
io.on("connection", (socket) => {
  console.log("User Connected");

  socket.on("message", (msg) => {
    io.emit("message", msg);
  });

  socket.on("disconnect", () => {
    console.log("User Disconnected!");
  });
});

//! ROUTERS
app.get("/", (req, res) => {
  res.render("dashboard")
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
server.listen(PORT, () => {
  console.log(`Listening at localhost:${PORT}`);
});
