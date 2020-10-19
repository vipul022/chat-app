const express = require("express");
const router = express.Router();
const {registerNew, registerCreate, logOut, loginNew, loginCreate} = require("../controllers/auth-controller")
const authRedirect = require("../middleware/auth-middleware")

router.get("/register", authRedirect, registerNew); //!sign up
router.post("/register", registerCreate)
router.get("/logout", logOut)
router.get("/login", authRedirect, loginNew)
router.post("/login", loginCreate)

module.exports = router