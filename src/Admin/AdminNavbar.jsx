import React from "react";
import { Link } from "react-router-dom";
import { Navbar, Nav, Container } from "react-bootstrap";

const AdminNavbar = () => {
  return (
    <Navbar expand="lg" bg="dark" variant="dark" sticky="top" className="shadow">
      <Container>
        {/* Logo / Branding */}
        <Navbar.Brand as={Link} to="/admin" className="fw-bold">
          🛒 Admin Panel
        </Navbar.Brand>

        {/* Responsive Toggle Button */}
        <Navbar.Toggle aria-controls="admin-navbar-nav" />

        {/* Navbar Links */}
        <Navbar.Collapse id="admin-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link as={Link} to="/dashboard" className="text-white">
              Dashboard
            </Nav.Link>
            <Nav.Link as={Link} to="/admin/product-manage" className="text-white">
              Manage Products
            </Nav.Link>
            <Nav.Link as={Link} to="/admin/orders" className="text-white">
              Manage Orders
            </Nav.Link>
            <Nav.Link as={Link} to="/admin/manage-users" className="text-white">
              Manage Users
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default AdminNavbar;
