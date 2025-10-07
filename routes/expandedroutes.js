const express = require("express");
const {expend, getExpended} = require("../controllers/expendcontroller");
const { verifyToken, authorizeRole } = require("../middleware/authmiddleware");
const router = express.Router();


//--creating new expenditure--
router.post("/create", verifyToken, authorizeRole(['Admin', 'Base Commander']), expend);
router.get("/expend", verifyToken, authorizeRole(['Admin', 'Base Commander']), getExpended);

module.exports = router;

