import React from 'react';
import '../style/Footer.css'; // Import the CSS file for styling
import divider from '../image/emoji2.png';
import { Link } from 'react-router-dom';

// const Footer = () => {
//   return (

//     <footer className="footer">

    
//       <div className="footer-content">
//         <p className="project-name">Happiness Mining</p>
//         <p className="project-details">@Unimelb 2023</p>
//         <p className="project-details">Something else to make it more vivid</p>
//       </div>

//     </footer>
//   );
// };


function Footer() {
    return (
      <footer className="footer">
        <hr className="divider" />
        <div className="footer-header">
        <p className="project-name">Happiness Mining</p>
        <p className="project-details">@Unimelb 2023</p>
        </div>
        <div className="footer-container">
          <div className="footer-column">
            <h3>Research</h3>
            <ul>
              <li><Link to="/Aboutus" className="link">About</Link></li>
              <li><Link to="/Scenario1" className="link">Happiness & Time</Link></li>

              <li><Link to="/Scenario2" className="link">Happiness & Location</Link></li>
              <li><Link to="/Scenario3" className="link">Reasons for Happiness</Link></li>
            </ul>
          </div>
          <div className="footer-column">
            <h3>Happiness & Time</h3>
            <ul>
            <li><Link to="/Scenario1#s1_1" className="link">Hour</Link></li>
            <li><Link to="/Scenario1#s1_2" className="link">Month</Link></li>
            <li><Link to="/Scenario1#s1_3" className="link">Day of Week</Link></li>
            
            </ul>
          </div>
          <div className="footer-column">
            <h3>Happiness & Location</h3>
            <ul>
            <li><Link to="/Scenario2#s2_1" className="link">Australia</Link></li>
            <li><Link to="/Scenario2#s2_2" className="link">States</Link></li>
            <li><Link to="/Scenario2#s2_3" className="link">Greater Capital Cites</Link></li>
            <li><Link to="/Scenario2#s2_4" className="link">Suburbs and Localities</Link></li>
            </ul>
          </div>
          <div className="footer-column">
            <h3>Reasons for Happiness</h3>

            <ul>
            <li><Link to="/Scenario3#s3_1" className="link">Social</Link></li>
            <li><Link to="/Scenario3#s3_2" className="link">Economic</Link></li>
            <li><Link to="/Scenario3#s3_3" className="link">Classify Reasons</Link></li>
            </ul>
          </div>
        </div>
        <div className="divider">
    < img src={divider} alt="divider"/>
    </div>

      </footer>
    );
  }

export default Footer;