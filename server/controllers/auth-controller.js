const UserModel = require("../models/user")
const passport = require("passport")

const registerNew = (req, res)=> {
// console.log("registerNew=>", req.body);
res.render("auth/register")

};



const registerCreate = (req, res, next) => {
// console.log("registerCreate=>", req.body);
const newUserHandler = (user) => {
//! req.login provided by passport
// console.log("newUserHandler=>", user);
req.login(user, (err) => {
if (err) {
// console.log("if=>");
next(err);
} else {
// console.log("else=>");
res.redirect("/");
}
});
};
const { username, password } = req.body;

UserModel.create({ username, password })
.then((user) => newUserHandler(user))
// .catch(next(err))
// .then((user) => console.log("user=>", user));
};

const logOut = (req, res) => {
// console.log("req.session=>", req.session);
  req.logout();
  //! req.logout is provided by passport
  res.redirect("/");
}


module.exports = {registerNew, registerCreate, logOut}