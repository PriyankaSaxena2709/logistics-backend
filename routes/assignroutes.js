const express = require("express");
const {assign} = require("../controllers/assigncontroller");
const { verifyToken, authorizeRole } = require("../middleware/authmiddleware");
const router = express.Router();

router.post("/create", verifyToken, authorizeRole(['Admin','Base Commander']), assign);

module.exports = router;