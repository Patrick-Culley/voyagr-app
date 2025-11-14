const express = require("express");
const router = express.Router();
const { 
    getTrips, 
    createTrip, 
    getTrip, 
    updateTrip, 
    deleteTrip,
    addExperienceToTrip
 } = require("../controllers/tripController");

// Routes for CRUD functionality for Trips
router.route("/")
    .get(getTrips)
    .post(createTrip);

router.route("/:id")
    .get(getTrip)
    .put(updateTrip)
    .delete(deleteTrip);

router.route("/:tripId/addExperience").post(addExperienceToTrip);

module.exports = router;