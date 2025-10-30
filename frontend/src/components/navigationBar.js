import React from "react";
import { Link } from "react-router-dom";

function NavigationBar() {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light px-3">
        <div className="container">
            <Link className="navbar-brand" to="/">Voyagr</Link>
            <div className="navbar-nav me-auto">
                {/* LINKS TO PAGES IN NAVIGATION BAR */}
                <li className="nav-item">
                    <Link className="nav-link" to="/">Home</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/register">Register</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/trips">My Trips</Link>
                </li>
            </div>
        </div>

        {/* SEARCH BAR */}
        <form class="d-flex" role="search">
            <input class="form-control me-2" type="search" placeholder="Bon Voyage!" aria-label="Search"/>
            <button class="btn btn-outline-success" type="submit">Search</button>
        </form>
        </nav>
    );
}

export default NavigationBar;