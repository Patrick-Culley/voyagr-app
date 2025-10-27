const mongoose = require("mongoose");

const experienceSchema = new mongoose.Schema(
    {
        user_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },

        title: {
            type: String,
            required: true,
            maxlength: 50,
        },

        location: {
            required: true,
            type: String,
            trim: true,
        },

        images: {

        },

        keywords: {
            type: String,
            index: true,
        },

        visibility: {
            type: String,
            enum: ["public", "private", "unlisted"],
            required: true,
            default: "public",
            index: true,
        }
    },
    {
        collecttion: "Experiences",
        timestamps: {
            createdAt: "created_at",
            updatedAt: "updated_at"
        }
    }
)