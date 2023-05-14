import React from "react";
import Sidebar from "./components/sideBar";
import Home from "./pages/Home";
import Histogram from "./pages/Histogram";
import LineD from "./pages/LineD";
import Geo from "./pages/Geo";
import Wordcloud from "./pages/Wordcloud";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import { useState, useEffect } from "react";
function App() {
  // usestate for setting a javascript
  // object for storing and using data
  const [data, setdata] = useState({
      name: "",
      age: 0,
      date: "",
      programming: "",
  });

  // Using useEffect for single rendering
  useEffect(() => {
      // Using fetch to fetch the api from 
      // flask server it will be redirected to proxy
      fetch("/").then((res) =>
          res.json().then((data) => {
              // Setting a data from api
              setdata({
                  name: data.Name,
                  age: data.Age,
                  date: data.Date,
                  programming: data.programming,
              });
          })
      );
  }, []);

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
        </Routes>
      </Router>
    </div>
  );
}


export default App;
