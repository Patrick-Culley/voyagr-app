const express = require("express");
const { addRating } = require("../controllers/ratingController");
const router = express.Router();

// Routes
router.route("/").post(addRating);

module.exports = router;