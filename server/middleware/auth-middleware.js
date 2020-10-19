const authRedirect = (req, res, next) => {
// console.log("inside authRedirect", req.user)

if (req.user) {
  return res.redirect("/");
}else {
return next();
}

}
module.exports = authRedirect