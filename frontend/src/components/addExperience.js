import { useNavigate, useParams } from "react-router-dom";
import React, { useState } from "react";

function AddExperience() {
    const {tripId} = useParams();
    const navigate = useNavigate();

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [location, setLocation] = useState("");
    const [image, setImage] = useState(null);
    const [dateTraveled, setDateTraveled] = useState("");
    const [keywords, setKeywords] = useState("");
    const [visibility, setVisibility] = useState("public");

    {/* HANDLE FORM SUBMISSION FOR ADDING AN EXPERIENCE */}
    const handleAddExperience = async (event) => {
        event.preventDefault();

        const user = JSON.parse(localStorage.getItem("user"));

        const newExperience = {
            trip_id: tripId,
            user_id: user._id,
            title: title,
            description: description,
            location: {name: location, coordinates: [0, 0]},    // placeholder coordinates
            images: image ? [image] : [],
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

            if (response.ok) {
                alert("Experience added!");
                navigate(`/trips/${tripId}`)
            } else {
                alert(data.message || `Error creating experience: ${response.status}`);
            }
        } catch (error) {
            console.error("Error adding experience", error);
        }
    };

    const handleImageURL = (e) => {
        setImage(e.target.value);
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
                    <label className="form-label">Image URL</label>
                    <input
                        type="text"
                        className="form-control"
                        onChange={handleImageURL}
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