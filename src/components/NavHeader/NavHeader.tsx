import { Link } from "gatsby";
import React from "react";

import { Container, Nav, Navbar } from "react-bootstrap";
import ThemeToggle from "../ThemeToggle/ThemeToggle";


const NavHeader = () => {

  return (
    <header className="bg-dark">
      <Container>
    <Navbar expand="md" variant="dark">
      <Navbar.Brand href="/">Home</Navbar.Brand>
      <Navbar.Toggle aria-controls="navbarResponsive"/>
      <Navbar.Collapse id="navbarResponsive">
        <Nav as="ul">
          <Nav.Item as="li">
            <Link to="/pages/about" className="nav-link" activeClassName="active">About</Link>
          </Nav.Item>
          <Nav.Item as="li">
            <Link to="/pages/contacts" className="nav-link" activeClassName="active">Contact</Link>
          </Nav.Item>
          <Nav.Item as="li">
            <Link to="/tags" className="nav-link" activeClassName="active">Tags</Link>
          </Nav.Item>
        </Nav>
      </Navbar.Collapse>
      <ThemeToggle/>
    </Navbar>
    </Container>
    </header>
    
  );
};

export default NavHeader;
