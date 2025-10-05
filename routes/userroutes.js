const express = require("express");
const router = express.Router();
const {user} = require("../controllers/usercontroller");
const {getUsers} = require("../controllers/usercontroller");
const {deleteUser} = require("../controllers/usercontroller");
const { verifyToken, authorizeRole } = require("../middleware/authmiddleware");

router.post("/users",verifyToken, authorizeRole(['Admin']), user);
router.get("/",verifyToken, authorizeRole(['Admin']), getUsers);
router.delete("/:id", verifyToken, authorizeRole(['Admin']),deleteUser);



module.exports = router;