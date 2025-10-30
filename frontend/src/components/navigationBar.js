import React from "react";
import { Link } from "react-router-dom";

function NavigationBar() {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light px-3 position-relative">
        <div className="container">
            <Link className="navbar-brand" to="/">Voyagr</Link>
            <div className="navbar-nav me-auto">
                {/* LINKS TO PAGES IN NAVIGATION BAR */}
                <li className="nav-item">
                    <Link className="nav-link" to="/">Home</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/trips">My Trips</Link>
                </li>
            </div>
            {/* SEARCH BAR */}
            <form className="d-flex position-absolute top-30 start-50 translate-middle-x" role="search">
                <input class="form-control me-2"
                type="search"
                placeholder="Bon Voyage!"
                aria-label="Search"
                style={{ width: "400px "}}/>
                <button class="btn btn-outline-success" type="submit">Search</button>
            </form>
        </div>
        <div className="navbar-nav ms-auto">
            {/* LINKS TO REGISTER AND LOGIN */}
            <li className="nav-item">
                <Link className="nav-link" to="/register">Register</Link>
            </li>
            <li className="nav-item" to="/login">
                <Link className="nav-link" to="/login">Login</Link>
            </li>
        </div>
        </nav>
    );
}

export default NavigationBar;