const express = require("express");
const protect = require("../middleware/authMiddleware");
const router = express.Router();
const { 
    getTrips, 
    createTrip, 
    getTrip, 
    updateTrip, 
    deleteTrip,
    addExperienceToTrip, 
    searchTrips
 } = require("../controllers/tripController");

const {verifyToken} = require("../middleware/authHandler.js");
console.log("verifyToken:", verifyToken);

router.get("/search", searchTrips);

// Routes for CRUD functionality for Trips
router.route("/")
    .get(protect, getTrips)
    .post(protect, createTrip);

router.route("/:id")
    .get(protect, getTrip)
    .put(protect, updateTrip)
    .delete(protect, deleteTrip);

router.route("/:tripId/addExperience").post(protect, addExperienceToTrip);

module.exports = router;