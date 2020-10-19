const router = require("express").Router();
const { socketFunc, renderChat } = require("../controllers/socketController");

router.get("/", socketFunc, renderChat);

module.exports = router;
