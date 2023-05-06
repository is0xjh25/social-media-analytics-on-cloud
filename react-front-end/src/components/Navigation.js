import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import '../style/Navigation.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLaughSquint } from '@fortawesome/free-regular-svg-icons';
import logo from '../image/behappy.jpeg';


function Navigation() {
  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Brand href="home"><img src={logo} alt="logo"  /></Navbar.Brand>
      <FontAwesomeIcon icon={faLaughSquint} style={{ color: "#6676ea" }} size = "xl" shake/>
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ml-auto">
          <Nav.Link href="home">Home</Nav.Link>
          <Nav.Link href="about">About Us</Nav.Link>
          <Nav.Link href="contact">Contact</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default Navigation;
