const passport = require("passport");
const LocalStrategy = require("passport-local");
const UserModel = require("../models/user");

passport.serializeUser((user, done) => {
  done(null, user._id);
});
//! serializeUser() method stores information inside of our session related to the passport user.

passport.deserializeUser((userId, done) => {
  UserModel.findById(userId)
    .then((user) => done(null, user))
    .catch(done);
});
//!when a reqs are received, is is used to find a user, which is then stored as req.user 
const canLogin = (user, password) => {
  if (user) {
    return user.verifyPasswordSync(password); //! this is a  mongoose-bcrypt function
  } else {
    return false;
  }
}

const verifyCallback = (username, password,done) => {
UserModel.findOne({username})
.then((user) => {
 if (canLogin(user, password)){
    return done(null, user)
}else {
    return done(null, false)
}
})
.catch(done) //! handle the errors
}




passport.use(new LocalStrategy(verifyCallback));

// .then((user) => {
//       if (canLogin(user, password)) {
//         return done(null, user);
//       } else {
//         return done(null, false);
//       }
//     })
//     .catch(done); //error handlingc