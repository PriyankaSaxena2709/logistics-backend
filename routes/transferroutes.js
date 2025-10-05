const express = require("express");
const {transfer} = require("../controllers/transfercontroller");
const {getTransfers} = require("../controllers/transfercontroller");
const { verifyToken, authorizeRole } = require("../middleware/authmiddleware");
const router = express.Router();

router.post("/create", verifyToken, authorizeRole(['Admin', 'Base Commander', 'Logistic Officer']), transfer);

router.get("/purchase", verifyToken, authorizeRole(['Admin', 'Base Commander', 'Logistic Officer']),getTransfers);


module.exports = router;