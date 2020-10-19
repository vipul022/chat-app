const express = require("express");
const router = express.Router();
const {registerNew, registerCreate} = require("../controllers/auth-controller")


router.get("/register", registerNew); //!sign up
router.post("/register", registerCreate)
module.exports = router