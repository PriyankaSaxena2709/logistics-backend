const express = require("express");
const router = express.Router();
const {login} = require("../controllers/authcontroller");

//---login route---
router.post("/login", login);

module.exports = router;