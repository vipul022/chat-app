const express = require("express");
const router = express.Router();
const {registerNew, registerCreate, logOut} = require("../controllers/auth-controller")


router.get("/register", registerNew); //!sign up
router.post("/register", registerCreate)
router.get("/logout", logOut)

module.exports = router