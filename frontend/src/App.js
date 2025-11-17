import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UserRegistration from "./components/userRegistration";
import NavigationBar from "./components/navigationBar";
import Trips from "./pages/myTrips"
import UserLogin from "./pages/userLogin";
import TripDetails from "./pages/tripDetails";
import AddExperience from "./components/addExperience";

function App() {
  return (
    <Router>
      {/* NAVIGATION BAR */}
      <NavigationBar/>

      {/* PAGES */}
      <Routes>
        {/* <Route path="/" element={<Home/>} /> */}
        <Route path="/register" element={<UserRegistration/>} />
        <Route path="/login" element={<UserLogin/>} />
        <Route path="/trips" element={<Trips/>} />
        <Route path="/trips/:tripId" element={<TripDetails/>} />
        <Route path="/trips/:tripId/add-experience" element={<AddExperience/>} />
      </Routes>
    </Router>
  );
}

export default App;
