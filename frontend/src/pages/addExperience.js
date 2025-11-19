import { useNavigate, useParams } from "react-router-dom";
import React, { useState } from "react";

function AddExperience() {
    const {tripId} = useParams();
    const navigate = useNavigate();

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [location, setLocation] = useState("");
    const [imageFile, setImageFile] = useState(null);
    const [dateTraveled, setDateTraveled] = useState("");
    const [keywords, setKeywords] = useState("");
    const [visibility, setVisibility] = useState("public");

    {/* HANDLE FORM SUBMISSION FOR ADDING AN EXPERIENCE */}
    const handleAddExperience = async (event) => {
        event.preventDefault();

        const user = JSON.parse(localStorage.getItem("user"));
        if (!user) {
            console.error("No user found in localStorage.");
            alert("You must be logged in to add an experience.");
            return;
        }

        const newExperience = {
            user_id: user._id,
            title: title,
            description: description,
            location: {name: location, coordinates: [0, 0]},    // placeholder coordinates
            date_traveled: dateTraveled,
            keywords: keywords ? keywords.split(",").map(k => k.trim()) : [],
            visibility: visibility,
        };

        try {
            const response = await fetch("http://localhost:5555/api/experiences", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newExperience),
            });

            const data = await response.json();

            if (!response.ok) {
                console.error("Error creating experience:", data);
                alert(data.message || `Error creating experience: ${response.status}`);
                return;
            }

            const experienceId = data.newExperience._id;

            if (!experienceId) {
                console.error("No experience ID returned from backend!");
                alert("Experience created but something went wrong with ID.");
                return;
            }

            if (response.ok) {
                if (imageFile) {
                    console.log("Uploading image for experience:", experienceId);
                    const formData = new FormData();
                    formData.append("image", imageFile);
                    formData.append("user_id", user._id);

                    const imageRes = await fetch (`http://localhost:5555/api/upload/${experienceId}`, {
                        method: "POST",
                        body: formData,
                    });

                    const imageData = await imageRes.json();
                    console.log("Image upload response:", imageData);

                    if (!imageRes.ok) {
                        console.error("Image upload failed:", imageData);
                        alert("Experience created, but image upload failed.");
                    }
                }
                alert("Experience added!");
                navigate(`/experiences`, {state: {refresh:true}});
            } else {
                alert(data.message || `Error creating experience: ${response.status}`);
            }
        } catch (error) {
            console.error("Error adding experience", error);
        }
    };

    {/* FORM FOR ADDING AN EXPERIENCE */}
    return (
        <div className="container mt-4">
            <h2>Add an experience</h2>
            <form onSubmit={handleAddExperience} className="card p-3 shadow">
                <div className="mb-3">
                    <label className="form-label">Name</label>
                    <input
                        type="text"
                        className="form-control"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Description</label>
                    <textarea
                        placeholder="How did it go?"
                        rows="3"
                        className="form-control"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Location</label>
                    <input
                        type="text"
                        className="form-control"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Date Traveled</label>
                    <input
                        type="date"
                        className="form-control"
                        value={dateTraveled}
                        onChange={(e) => setDateTraveled(e.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Keywords</label>
                    <input
                        placeholder="Optional"
                        type="text"
                        className="form-control"
                        value={keywords}
                        onChange={(e) => setKeywords(e.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Image</label>
                    <input
                        type="file"
                        className="form-control"
                        accept="image/*"
                        onChange={(e) => setImageFile(e.target.files[0])}
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Visibility</label>
                    <select
                        className="form-select"
                        value={visibility}
                        onChange={(e) => setVisibility(e.target.value)}
                        >
                            <option value="public">Public</option>
                            <option value="private">Private</option>
                    </select>
                </div>
                <button type="submit" className="btn btn-primary">Let's go!</button>
            </form>
        </div>
    )
}

export default AddExperience;