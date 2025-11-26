const express = require("express");
const protect = require("../middleware/authMiddleware");

const { registerUser, loginUser, logoutUser } = require("../controllers/userController");

const router = express.Router();

router.post("/register", registerUser);

router.post("/login", loginUser);

router.post("/logout", protect, logoutUser);

module.exports = router; 