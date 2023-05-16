import React from "react";
import Sidebar from "./components/sideBar";
import Home from "./pages/Home";
import Histogram from "./pages/Histogram";
import LineD from "./pages/LineD";
import Geo from "./pages/Geo";
import Wordcloud from "./pages/Wordcloud";
import Scenario1 from "./pages/Scenario1"
import Scenario2 from "./pages/Scenario2"
import Scenario3 from "./pages/Scenario3"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    // <div style={{ display: 'flex' }}>
    //   <Sidebar />
    //   <Home />
    // </div>
    <div style={{ display: "flex" }}>
      <Router>
        <Sidebar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/histogram" element={<Histogram />} />
          <Route path="/lined" element={<LineD />} />
          <Route path="/geo" element={<Geo />} />
          <Route path="/wordcloud" element={<Wordcloud />} />
          <Route path="/Scenario1" element={<Scenario1 />} />
          <Route path="/Scenario2" element={<Scenario2 />} />
          <Route path="/Scenario3" element={<Scenario3 />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;