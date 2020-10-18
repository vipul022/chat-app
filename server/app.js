//! PACKAGES
const express = require("express");
const mongoose = require("mongoose");
const session = require('express-session')
const MongoStore = require("connect-mongo")(session); //!session here is mapped with the const session on line 8, both should be same
const exphbs = require("express-handlebars");
const passport = require("passport");

const path = require("path");
require("dotenv").config();

//! VARIABLES
const PORT = 5000;
const uri = "mongodb+srv://admin:admin@cluster0.iutgc.mongodb.net/chat-app-db?retryWrites=true&w=majority"

//! APP
const app = express();

//! MIDDLEWARE
app.use(express.static(path.join(__dirname, "../client")));

app.use(express.json());
app.use(express.urlencoded({
extended:true
}));


//!express session stores session id as a cookie and reads the cookie on server side and stores data on server side
app.use(
  session({
    secret: "secret key", // this should not be included in source code, must be hidden
    resave: false,
    saveUninitialized: false, //in canvas it is set as true but we need to set it as false in future projects
    cookie: { expires: 600000 }, //this is 10 minutes 10*60*1000
    store: new MongoStore({ mongooseConnection: mongoose.connection }),
  }) //!this is setting up session connection with database so that session is saved in db
);

//!connecting passport to app
require("./middleware/passport");
app.use(passport.initialize());
app.use(passport.session()); //!this keeps track of logged in user

//! Register `hbs.engine` with the Express app.

app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');


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
