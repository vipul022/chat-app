const router = require("express").Router();
const { renderChat } = require("../controllers/socketController");

router.get("/", renderChat);

module.exports = router;
