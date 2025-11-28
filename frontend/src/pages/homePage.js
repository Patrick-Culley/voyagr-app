import React from "react";

function HomePage() {
    return (
        <div className="container mt-5 d-flex justify-content-center">
            <div className="card p-3 shadow-sm" style={{width: "55rem"}}>
                <div className="d-flex align-items-center mb-3">
                    <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" fill="currentColor" class="bi bi-compass" viewBox="0 0 16 16">
                        <path d="M8 16.016a7.5 7.5 0 0 0 1.962-14.74A1 1 0 0 0 9 0H7a1 1 0 0 0-.962 1.276A7.5 7.5 0 0 0 8 16.016m6.5-7.5a6.5 6.5 0 1 1-13 0 6.5 6.5 0 0 1 13 0"/>
                        <path d="m6.94 7.44 4.95-2.83-2.83 4.95-4.949 2.83 2.828-4.95z"/>
                    </svg>
                    <div className="card-body">
                        <h5 className="card-title">Welcome to Voyagr</h5>
                        <p className="card-text">Explore experiences from travelers around the world. Adventure awaits! </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default HomePage;