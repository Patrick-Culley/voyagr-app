import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UserRegistration from "./components/userRegistration";
import NavigationBar from "./components/navigationBar";
import Trips from "./pages/myTrips"
import UserLogin from "./pages/userLogin";

function App() {
  return (
    <Router>
      {/* NAVIGATION BAR */}
      <NavigationBar/>

      {/* PAGES */}
      <Routes>
        {/* <Route path="/" element={<Home/>} /> */}
        <Route path="/register" element={<UserRegistration/>} />
        <Route path="/trips" element={<Trips/>} />
        <Route path="/login" element={<UserLogin/>} />
      </Routes>
    </Router>
  );
}

export default App;
