import React, {useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function NavigationBar() {

    const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
    const [query, setQuery] = useState("");
    const navigate = useNavigate();

    {/* ALLOWS APP TO REACT TO CHANGES IN localStorage WHEN "user" ITEM IS ADDED/REMOVED */}
    useEffect(() => {
        const handleStorageChange = () => {
            setUser(JSON.parse(localStorage.getItem("user")));
        };

        window.addEventListener("storage", handleStorageChange);

        return () => window.removeEventListener("storage", handleStorageChange);
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("user");
        setUser(null);
        navigate("/");
    }

    // SEARCH SUBMIT HANDLER
    const handleSearch = (e) => {
        e.preventDefault();

        // navigate to search results page
        if (query.trim() !== "") {
            navigate(`/search?search=${query}`);
        }

        setQuery(""); // clear search bar after submitting
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light px-3 position-relative">
        <div className="container">
            <Link className="navbar-brand" to="/">Voyagr</Link>
            <div className="navbar-nav me-auto">
                {/* LINKS TO PAGES IN NAVIGATION BAR */}
                <li className="nav-item">
                    <Link className="nav-link" to="/">Home</Link>
                </li>
                {/* MY TRIPS LINK ONLY DISPLAYS WHEN USER IS LOGGED IN */}
                {user && (
                    <li className="nav-item">
                        <Link className="nav-link" to="/trips">My Trips</Link>
                    </li>
                )}
                <li className="nav-item">
                    <Link className="nav-link" to="/experiences">Experiences</Link>
                </li>
            </div>
            {/* SEARCH BAR */}
            <form className="d-flex position-absolute top-30 start-50 translate-middle-x" role="search" onSubmit={handleSearch}>
                <input className="form-control me-2"
                    type="search"
                    placeholder="Bon Voyage!"
                    aria-label="Search"
                    style={{ width: "400px "}}
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                />
                <button className="btn btn-outline-success" type="submit">Search</button>
            </form>
        </div>
        {!user && (
            <div className="navbar-nav ms-auto">
            {/* LINKS TO REGISTER AND LOGIN. ONLY DISPLAYS IF USER IS NOT LOGGED IN. */}
            <li className="nav-item">
                <Link className="nav-link" to="/register">Register</Link>
            </li>
            <li className="nav-item" to="/login">
                <Link className="nav-link" to="/login">Login</Link>
            </li>
        </div>
        )}
        {user && (
            <div className="navbar-nav ms-auto">
            {/* LOGOUT */}
            <li className="nav-item">
                <button className="nav-link"
                onClick={handleLogout}>Logout</button>
            </li>
        </div>
        )}
        </nav>
    );
}

export default NavigationBar;