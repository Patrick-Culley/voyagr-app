const express = require("express");
const {
    getExperiences,
    getExperiencesByTrip,
    createExperience,
    searchExperiences,
    getExperience
} = require("../controllers/experienceController");

const router = express.Router();

router.route("/")
    .get(getExperiences)
    .post(createExperience);

router.route("/search").get(searchExperiences);

router.get("/trip/:tripId", getExperiencesByTrip);

router.route("/:id").get(getExperience);

module.exports = router;