const express = require("express");
const router = express.Router();
const {registerNew, registerCreate, logOut, loginNew, loginCreate} = require("../controllers/auth-controller")


router.get("/register", registerNew); //!sign up
router.post("/register", registerCreate)
router.get("/logout", logOut)
router.get("/login", loginNew)
router.post("/login", loginCreate)

module.exports = router