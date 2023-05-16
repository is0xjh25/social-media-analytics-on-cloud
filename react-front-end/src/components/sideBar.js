// Sidebar.js

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import "../style/SideBar.css";
import logo from '../image/logo.png';

const Sidebar = () => {

  const handleLinkClick = (targetId) => {
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const [showHomeSubbuttons, setShowHomeSubbuttons] = useState(false);
  const [showScenario1Subbuttons, setShowScenario1Subbuttons] = useState(false);
  const [showScenario2Subbuttons, setShowScenario2Subbuttons] = useState(false);
  const [showScenario3Subbuttons, setShowScenario3Subbuttons] = useState(false);
  const [showScenario4Subbuttons, setShowScenario4Subbuttons] = useState(false);

  const [homeArrowDown, setHomeArrowDown] = useState(false);
  const [scenario1ArrowDown, setScenario1ArrowDown] = useState(false);
  const [scenario2ArrowDown, setScenario2ArrowDown] = useState(false);
  const [scenario3ArrowDown, setScenario3ArrowDown] = useState(false);
  const [scenario4ArrowDown, setScenario4ArrowDown] = useState(false);

  const toggleHomeSubbuttons = () => {
    setShowHomeSubbuttons(!showHomeSubbuttons);
    setHomeArrowDown(!homeArrowDown);
  };

  const toggleScenario1Subbuttons = () => {
    setShowScenario1Subbuttons(!showScenario1Subbuttons);
    setScenario1ArrowDown(!scenario1ArrowDown);
  };

  const toggleScenario2Subbuttons = () => {
    setShowScenario2Subbuttons(!showScenario2Subbuttons);
    setScenario2ArrowDown(!scenario2ArrowDown);
  };

  const toggleScenario3Subbuttons = () => {
    setShowScenario3Subbuttons(!showScenario3Subbuttons);
    setScenario3ArrowDown(!scenario3ArrowDown);
  };

  const toggleScenario4Subbuttons = () => {
    setShowScenario4Subbuttons(!showScenario4Subbuttons);
    setScenario4ArrowDown(!scenario4ArrowDown);
  };

  return (
    <div className="sidebar">
        <Link to="/" className="logo">
        < img src={logo} alt="Logo"/>
        </Link>
      <hr />
      <button className={`btn btn-link ${showHomeSubbuttons ? 'active' : ''}`} onClick={toggleHomeSubbuttons}>
        <span className={`rotate-arrow ${homeArrowDown ? 'down' : ''}`}>▶</span> Home
      </button>
      {showHomeSubbuttons && (
        <div>
          <button className="sub-buttons">Overview</button>
          <button className="sub-buttons">Report</button>
          <Link to="/Scenario1">
          <button className="sub-buttons" >S1. Happiness & Time</button>
          </Link>
          <Link to="/Scenario2">
          <button className="sub-buttons">S2. Happiness & Location</button>
          </Link>
          <Link to="/Scenario3">
          <button className="sub-buttons">S3. Discover Influential Factors</button>
          </Link>
          <Link to="/Scenario4">
          <button className="sub-buttons">S4. Comparative Analysis</button>
          </Link>
        </div>
      )}

      <button className={`btn btn-link ${showScenario1Subbuttons ? 'active' : ''}`} onClick={toggleScenario1Subbuttons}>
        <span className={`rotate-arrow ${scenario1ArrowDown ? 'down' : ''}`}>▶</span> Scenario 1
      </button>
      {showScenario1Subbuttons && (
      <div>
        <Link to="/Scenario1#s1.1">
        <button className="sub-buttons" onClick={() => handleLinkClick('s1.1')}>Scenario 1.1</button>
        </Link>
        <Link to="/Scenario1#s1.2">
        <button className="sub-buttons" onClick={() => handleLinkClick('s1.2')}>Scenario 1.2</button>
        </Link>
        <Link to="/Scenario1#s1.3">
        <button className="sub-buttons" onClick={() => handleLinkClick('s1.3')}>Scenario 1.3</button>
        </Link>
        <Link to="/Scenario1#s1.4">
        <button className="sub-buttons" onClick={() => handleLinkClick('s1.4')}>Scenario 1.4</button>
        </Link>
      </div>
      )}

      <button className={`btn btn-link ${showScenario2Subbuttons ? 'active' : ''}`} onClick={toggleScenario2Subbuttons}>
        <span className={`rotate-arrow ${scenario2ArrowDown ? 'down' : ''}`}>▶</span> Scenario 2
      </button>
      {showScenario2Subbuttons && (
      <div>
        <Link to="/Scenario2#s2.1">
      <button className="sub-buttons" onClick={() => handleLinkClick('s2.1')}>Scenario 2.1</button>
      </Link>
      <Link to="/Scenario2#s2.2">
      <button className="sub-buttons" onClick={() => handleLinkClick('s2.2')}>Scenario 2.2</button>
      </Link>
      <Link to="/Scenario2#s2.3">
      <button className="sub-buttons" onClick={() => handleLinkClick('s2.3')}>Scenario 2.3</button>
      </Link>
      <Link to="/Scenario2#s2.4">
      <button className="sub-buttons" onClick={() => handleLinkClick('s2.4')}>Scenario 2.4</button>
      </Link>
    </div>
      )}

      <button className={`btn btn-link ${showScenario3Subbuttons ? 'active' : ''}`} onClick={toggleScenario3Subbuttons}>
        <span className={`rotate-arrow ${scenario3ArrowDown ? 'down' : ''}`}>▶</span> Scenario 3
      </button>
      {showScenario3Subbuttons && (
      <div>
      <Link to="/Scenario3#s3.1">
      <button className="sub-buttons" onClick={() => handleLinkClick('s3.1')}>Scenario 3.1</button>
      </Link>
      <Link to="/Scenario3#s3.2">
      <button className="sub-buttons" onClick={() => handleLinkClick('s3.2')}>Scenario 3.2</button>
      </Link>
      <Link to="/Scenario3#s3.3">
      <button className="sub-buttons" onClick={() => handleLinkClick('s3.3')}>Scenario 3.3</button>
      </Link>
      <Link to="/Scenario3#s3.4">
      <button className="sub-buttons" onClick={() => handleLinkClick('s3.4')}>Scenario 3.4</button>
      </Link>
    </div>
      )}

      <button className={`btn btn-link ${showScenario4Subbuttons ? 'active' : ''}`} onClick={toggleScenario4Subbuttons}>
        <span className={`rotate-arrow ${scenario4ArrowDown ? 'down' : ''}`}>▶</span> Scenario 4
      </button>
      {showScenario4Subbuttons && (
      <div>
      <Link to="/Scenario4#s4.1">
      <button className="sub-buttons" onClick={() => handleLinkClick('s4.1')}>Scenario 4.1</button>
      </Link>
      <Link to="/Scenario4#s4.2">
      <button className="sub-buttons" onClick={() => handleLinkClick('s4.2')}>Scenario 4.2</button>
      </Link>
      <Link to="/Scenario4#s4.3">
      <button className="sub-buttons" onClick={() => handleLinkClick('s4.3')}>Scenario 4.3</button>
      </Link>
      {/* <button className="sub-buttons" onClick={() => handleLinkClick('s4.4')}>Scenario 4.4</button> */}
    </div>
      )}
    </div>
  );
};

export default Sidebar;