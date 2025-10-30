import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Trips() {

    const navigate = useNavigate();

    // Mock data until schema gets merged into main repository
    const [trips, setTrips] = useState([
        { user_id: 1, trip_name: "Bali, Thailand", trip_summary: "Tropical paradise!"},
        { user_id: 2, trip_name: "Big Sur, California", trip_summary: "Mountainous adventure!"}
        ]);

        const [showTripForm, setTripForm] = useState(false);            // Track pop-up is visible
        const [addTripName, setAddTripName] = useState("");             // Store and update trip name in input field
        const [addTripSummary, setAddTripSummary] = useState("");       // Store and update trip summary in input field

        const handleAddTrip = (event) => {
            event.preventDefault();
            const newTrip = {
                user_id: trips.length + 1,
                trip_name: addTripName,
                trip_summary: addTripSummary
            };
            setTrips([...trips, newTrip]);
            setTripForm(false);
            setAddTripName("");
            setAddTripSummary("");
        }

    return (
        <div className="container mt-4">
            {/* CARD FOR TRIP NAME */}
            <div className="row">
                {trips.map((trip) => (
                    <div className="col-md-4 mb-4" key={trip.user_id}>
                        <div className="card h-100 shadow-sm"
                            style={{ cursor: "pointer" }}
                            onClick={() => navigate(`/trips/${trip.user_id}`)}>
                            <div className="card-body">
                                <h5 className="card-title" class="text-center">{trip.trip_name}</h5>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* ADD TRIP BUTTON */}
            <div className="text-center mt-4">
                <div id="addTrips" className="form-text mb-2">More adventures?</div>
                <button className="btn btn-primary" onClick={() => setTripForm(true)}>Add a trip!</button>
            </div>

            {/* ADD TRIP POP-UP FORM */}
            {showTripForm && (
                <div className="modal d-block" tabIndex="-1" style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Add a trip:</h5>
                            <button type="button" className="btn-close" onClick={() => setTripForm(false)}></button>
                        </div>
                        <form onSubmit={handleAddTrip}>
                            <div className="modal-body">
                                <div className="mb-3">
                                    <label className="form-label">Where did you go?</label>
                                    <input
                                    type="text"
                                    className="form-control"
                                    value={addTripName}
                                    onChange={(e) => setAddTripName(e.target.value)} required/>
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Tell us about it!</label>
                                    <input
                                    type="text"
                                    className="form-control"
                                    value={addTripSummary}
                                    onChange={(e) => setAddTripSummary(e.target.value)} required/>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={() => setTripForm(false)}>Close</button>
                                <button type="button" className="btn btn-primary">Save changes</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            )}
        </div>
    );
}

export default Trips;