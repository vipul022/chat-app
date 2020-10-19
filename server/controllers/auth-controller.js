const UserModel = require("../models/user");
const passport = require("passport");

const registerNew = (req, res) => {
  // console.log("registerNew=>", req.body);
  res.render("auth/register");
};

const registerCreate = (req, res, next) => {
  console.log("registerCreate=>", req.body);
  const newUserHandler = (user) => {
    //! req.login provided by passport
    req.login(user, (err) => {
      if (err) {
        next(err);
      } else {
        res.redirect("/");
      }
    });
  };
  const { username, password } = req.body;

  UserModel.create({ username, password }).then((user) => newUserHandler(user));
  // .catch(next(err))
  // .then((user) => console.log("user=>", user));
};

module.exports = { registerNew, registerCreate };
