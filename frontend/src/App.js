import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UserRegistration from "./components/userRegistration";
import NavigationBar from "./components/navigationBar";
import Trips from "./pages/myTrips"

function App() {
  return (
    <Router>
      {/* Navigation Bar */}
      <NavigationBar/>

      {/* Pages */}
      <Routes>
        {/* <Route path="/" element={<Home/>} /> */}
        <Route path="/register" element={<UserRegistration/>} />
        <Route path="/trips" element={<Trips/>} />
      </Routes>
    </Router>
  );
}

export default App;
