const asyncHandler = require("express-async-handler");
const Trip = require("../models/Trip");

// Create a trip
// @route POST api/trips
// @access private 
const createTrip = asyncHandler (async (req, res) => {
    const { user_id, trip_name, trip_summary } = req.body;
    if (!trip_name) {
        res.status(400);
        throw new Error("Title is mandatory");
    }

    const newTrip = await Trip.create({
 feature/gcp-image-config
        user_id,     
=======
        
 main
        trip_name,
        trip_summary
    });
    console.log("Trip is successfully created: ", newTrip);
    res.status(201).json(newTrip);
});

// Get all trips
// @route GET api/trips
// access private
const getTrips = asyncHandler(async (req, res) => {
    const trips = await Trip.find({});
    res.status(200).json(trips);
});

// Get a trip
// @route GET api/trips/:id
// private access
const getTrip = asyncHandler (async (req, res) => {
    const { id } = req.params;

    const trip = await Trip.findById(id).populate({
        path: "experiences",
        select: "title description location images averageRating keywords"
    });

    if(!trip) {
        res.status(404);
        throw new Error("Trip not found");
    };
    res.status(200).json(trip);
});

// Update a trip
// @route PUT api/trips/:id
// private access
const updateTrip = asyncHandler (async (req, res) => {
    // find the trip to update
    const trip = await Trip.findById(req.params.id);
    if (!trip) {
        res.status(400);
        throw new Error("Trip no found");
    };

    // if (User.user_id.toString() !== req.user_id) {
    //     res.status(400);
    //     throw new Error("You don't have permission to edit other trips");
    // };

    const updatedTrip = await Trip.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
    );
    res.status(200).json(updatedTrip);
    console.log("The trip was updated to: ", updatedTrip);
});

// Delete a trip
// @route DELETE api/trips/:id
// private access
const deleteTrip = asyncHandler (async (req, res) => {
    // find the trip to delete
    const trip = await Trip.findById(req.params.id);
    if (!trip) {
        res.status(400);
        throw new Error("Trip no found");
    };

    // if (User.user_id.toString() !== req.user_id) {
    //     res.status(400);
    //     throw new Error("You don't have permission to delete other trips");
    // };

    const deletedTrip = await Trip.deleteOne({ _id: req.params.id });
    res.status(200).json(deletedTrip);
    console.log("The trip was deleted");
});

// add experience to a trip
// @route api/trips/:tripId/addExperience
// private access
const addExperienceToTrip = asyncHandler (async (req, res) => {
    const { tripId } = req.params;
    const { experience_id } = req.body;
    if (!experience_id) {
        return res.status(400).json({ message: "Experience ID is required!"});
    };

    const trip = await Trip.findById(tripId);
    if (!trip) {
        return res.status(404).json({ message: "Trip not found"});
    };

    // Check if the experience was already added
    if (!trip.experiences.includes(result => result.toString() === experience_id)) {
        trip.experiences.push(experience_id);
        await trip.save();
    }
    console.log("Experience was added to trip.");
    const updatedTrip = await Trip.findById(tripId).populate("experiences");

    res.status(200).json({ message: "Experience added to the Trip.", trip: updatedTrip });
});

module.exports = {
    createTrip,
    getTrips,
    getTrip,
    updateTrip,
    deleteTrip,
    addExperienceToTrip
};