const express = require("express");
const { 
    getExperiences, 
    createExperience, 
    searchExperiences,
    getExperience,
} = require("../controllers/experienceController");

const router = express.Router();

router.route("/")
    .get(getExperiences)
    .post(createExperience);

router.route("/search").get(searchExperiences);

router.route("/:id").get(getExperience);

module.exports = router;