import { useParams, useNavigate } from "react-router-dom";
import React, { useEffect, useState, } from "react";

function TripDetails() {
    const { tripId } = useParams();
    const [trip, setTrip] = useState(null);
    const navigate = useNavigate();

    {/* FETCH TRIP DATA FROM BACKEND */}
    useEffect(() => {
        const fetchTrips = async() => {
            try {
                const response = await fetch(`http://localhost:5555/api/trips/${tripId}`);
                const data = await response.json();
                setTrip(data);
            } catch (error) {
                console.error("Error fetching trip details:", error);
            }
        };
        fetchTrips();
    }, [tripId]);

    return (
        <div className="container mt-4">
            {/* DISPLAY TRIP NAME AND SUMMARY */}
            {trip ? (
                <div className="card p-4 shadow" style={{minHeight: "600px"}}>
                    <div style={{flexGrow: 1}}>
                        <h2>{trip.trip_name}</h2>
                        <p>{trip.trip_summary}</p>
                    </div>
                    <button className="btn btn-secondary mt-3 align-self-start" onClick={() => navigate(-1)}>
                        <i className="bi bi-arrow-left"></i>
                    </button>
                </div>
            ) : (
                <p>Loading trip details...</p>
            )}
        </div>
    )
}

export default TripDetails;