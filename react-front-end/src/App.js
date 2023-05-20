import React from "react";
import Sidebar from "./components/sideBar";
import Home from "./pages/Home";
import Scenario1 from "./pages/Scenario1"
import Scenario2 from "./pages/Scenario2"
import Scenario3 from "./pages/Scenario3"
import Histogram from "./pages/Histogram"
import AboutUs from "./pages/Aboutus"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import MyMap from "./components/MyMap"

function App() {
  return (

    <div style={{ display: "flex" }}>
      <Router>
        <Sidebar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/histogram" element={<histogram />} />
          <Route path="/Scenario1" element={<Scenario1 />} />
          <Route path="/Scenario2" element={<Scenario2 />} />
          <Route path="/Scenario3" element={<Scenario3 />} />
          <Route path="/AboutUs" element={<AboutUs />} />
          <Route path="/mymap" element={<MyMap />} />

        </Routes>
      </Router>
      
    </div>
  );
}

export default App;