const express = require("express");
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
    .get(getTrips)
    .post(verifyToken, createTrip);

router.route("/:id")
    .get(getTrip)
    .put(verifyToken, updateTrip)
    .delete(verifyToken, deleteTrip);

router.route("/:tripId/addExperience")
    .post(verifyToken, addExperienceToTrip);

module.exports = router;