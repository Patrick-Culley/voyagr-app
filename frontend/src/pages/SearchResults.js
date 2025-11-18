import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function SearchResults() {
  const [results, setResults] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const q = params.get("q");

    if (!q) return;

    fetch(`http://localhost:5555/api/trips/search?q=${q}`)
      .then(res => res.json())
      .then(data => setResults(data))
      .catch(err => console.error(err));
  }, [location.search]);

  return (
    <div className="container mt-4">
      <h2>Search Results</h2>

      {results.length === 0 && <p>No trips found.</p>}

      {results.map((trip) => (
        <div
          key={trip._id}
          className="card mb-3 p-3"
          style={{ cursor: "pointer" }}
          onClick={() => navigate(`/trips/${trip._id}`)}
        >
          <h5>{trip.trip_name}</h5>
          <p className="text-muted">{trip.trip_summary}</p>
        </div>
      ))}
    </div>
  );
}

export default SearchResults;
