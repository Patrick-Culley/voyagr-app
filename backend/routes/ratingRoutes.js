const express = require("express");
const protect = require("../middleware/authMiddleware");

const { addRating } = require("../controllers/ratingController");
const router = express.Router();

// Routes
router.route("/:experienceId").post(protect, addRating);

module.exports = router;