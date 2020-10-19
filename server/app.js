//! PACKAGES
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const session = require("express-session");
const MongoStore = require("connect-mongo")(session); //!session here is mapped with the const session on line 8, both should be same
const exphbs = require("express-handlebars");
const passport = require("passport");

const path = require("path");
require("dotenv").config();

//! FILES
const socketRouter = require("./routes/socketRoutes");

//! VARIABLES
const PORT = 5000;
const uri = process.env.MONGODB_URI || "mongodb://localhost/chat-app-db";
const authRouter = require("./router/auth-routes");

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
app.use(cors());
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

//!express session stores session id as a cookie and reads the cookie on server side and stores data on server side
app.use(
  session({
    secret: "secret key",
    resave: false,
    saveUninitialized: false, //!in canvas it is set as true but we need to set it as false in future projects
    cookie: { expires: 600000 }, //!this is 10 minutes 10*60*1000
    store: new MongoStore({ mongooseConnection: mongoose.connection }),
  }) //!this is setting up session connection with database so that session is saved in db
);

//!connecting passport to app
require("./middleware/passport");
app.use(passport.initialize());
app.use(passport.session()); //!this keeps track of logged in user

//! Register `hbs.engine` with the Express app.

app.engine("handlebars", exphbs());
app.set("view engine", "handlebars");

//! ROUTERS
app.get("/", (req, res) => {
  res.render("dashboard");
});

app.use("/chat", socketRouter);
app.use("/user", authRouter);

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
