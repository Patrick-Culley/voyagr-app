const asyncHandler = require("express-async-handler");
const mongoose = require("mongoose");
const Rating = require("../models/Rating");
const Experience = require("../models/Experience");

// Add Rating
// @route POST api/ratings
// private access
const addRating = asyncHandler (async (req, res) => {
    const { experience_id, user_id, score, review } = req.body;
    if (!score) {
        return res.status(400).json({message: "Please add a score"});
    };

    const newRating = new Rating({
        experience_id,
        user_id : "69120ab03cd24d3d39f9b154", // hardcoded for now
        score,
        review
    });

    await newRating.save();

    // Do the average Rating calculations
    const totalAvg = await Rating.aggregate([
        {$match: {
            experience_id: new mongoose.Types.ObjectId(experience_id)
        }},
        { $group: {
            _id: "$experience_id", averageRating: {$avg: "$score" }
        }},
    ]);

    // Check if there is no rating yet
    const average = totalAvg.length > 0 ? totalAvg[0].averageRating : 0;

    // Update average score for that experience
    await Experience.findByIdAndUpdate(experience_id, {averageRating: average});
    res.status(201).json({ message: "Rating is added", rating: newRating, averageRating: average});
});

module.exports = { addRating };