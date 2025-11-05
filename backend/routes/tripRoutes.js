const express = require("express");
const router = express.Router();
const { 
    getTrips, 
    createTrip, 
    getTrip, 
    updateTrip, 
    deleteTrip } = require("../controllers/tripController");

// Routes for CRUD functionality for Trips
router.route("/")
    .get(getTrips)
    .post(createTrip);


router.route("/:id")
    .get(getTrip)
    .put(updateTrip)
    .delete(deleteTrip);

module.exports = router;