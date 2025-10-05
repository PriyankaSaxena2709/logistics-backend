const express = require("express");
const router = express.Router();
const {purchase} = require("../controllers/purchasecontroller");
const {getAllPurchases} = require("../controllers/purchasecontroller");
const { verifyToken, authorizeRole } = require("../middleware/authmiddleware");

//---creating new purchase---
router.post("/create", verifyToken, authorizeRole(['Admin', 'Base Commander','Logistic Officer']), purchase);

//---Get all purchases--
router.get("/purchases", verifyToken, authorizeRole(['Admin', 'Base Commander', 'Logistic Officer']), getAllPurchases);
//---update a purchase---
//---Delete a purchase---
module.exports = router;