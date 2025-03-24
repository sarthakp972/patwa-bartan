import { Navbar, Nav, Container, Form, FormControl, Button } from "react-bootstrap";
import { FaShoppingCart, FaUser, FaSignOutAlt } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import useCart from "../context/useCart";
import "bootstrap/dist/css/bootstrap.min.css";
import "../Css-page/PatwaNavbar.css";
import Logo from "./Logo";
import { useState, useRef } from "react";

const PatwaNavbar = () => {
  const { getCartCount } = useCart();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const navbarToggleRef = useRef(null);

  const handleAuthToggle = () => {
    setIsAuthenticated(!isAuthenticated);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search/${searchQuery}`);
    }
  };

  const handleNavLinkClick = () => {
    if (navbarToggleRef.current) {
      navbarToggleRef.current.click();
    }
  };

  return (
    <>
      {/* Mobile View */}
      <Navbar expand="lg" className="patwa-navbar d-lg-none">
        <Container fluid>
          <Navbar.Toggle aria-controls="basic-navbar-nav" className="order-0" ref={navbarToggleRef} />
          <Navbar.Brand className="mx-auto order-1 brand-text">
            <Link to="/" className="nav-logo"><Logo /></Link>
          </Navbar.Brand>
          <div className="d-flex align-items-center">
            <Button variant="link" className="cart-button order-2">
              <Link to="/cart" className="cart-link">
                <FaShoppingCart size={24} className="cart-icon" />
                <span className="cart-count">{getCartCount()}</span>
              </Link> 
            </Button>
            <Button variant="link" className="auth-button" onClick={handleAuthToggle}>
              {isAuthenticated ? <FaSignOutAlt size={24} /> : <FaUser size={24} />}
            </Button>
          </div>
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="w-100 text-center mt-2">
              {/* Navigation Links */}
              <Nav.Link as={Link} to="/" className="nav-link" onClick={handleNavLinkClick}>होम</Nav.Link>
              <Nav.Link as={Link} to="/all-products" className="nav-link" onClick={handleNavLinkClick}>सभी</Nav.Link>
              <Nav.Link as={Link} to="/contact" className="nav-link" onClick={handleNavLinkClick}>संपर्क</Nav.Link>
              <Nav.Link as={Link} to="/about" className="nav-link" onClick={handleNavLinkClick}>हमारे बारे में</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Desktop View */}
      <Navbar expand="lg" className="patwa-navbar d-none d-lg-flex">
        <Container fluid className="d-flex align-items-center justify-content-between">
          <Navbar.Brand className="brand-text">
            <Link to="/" className="nav-logo"><Logo /></Link>
          </Navbar.Brand>
          <Form className="d-flex search-bar" onSubmit={handleSearch}>
            <FormControl 
              type="search" 
              placeholder="खोजें..." 
              className="search-input" 
              value={searchQuery} 
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Button variant="outline-light" className="search-button" type="submit">खोजें</Button>
          </Form>
          <div className="d-flex align-items-center">
            <Nav>
              <Nav.Link as={Link} to="/" className="nav-link" onClick={handleNavLinkClick}>होम</Nav.Link>
              <Nav.Link as={Link} to="/all-products" className="nav-link" onClick={handleNavLinkClick}>सभी बर्तन</Nav.Link>
              <Nav.Link as={Link} to="/contact" className="nav-link" onClick={handleNavLinkClick}>संपर्क</Nav.Link>
              <Nav.Link as={Link} to="/about" className="nav-link" onClick={handleNavLinkClick}>हमारे बारे में</Nav.Link>
            </Nav>
            <Button variant="link" className="cart-button">
              <Link to="/cart" className="cart-container">
                <FaShoppingCart size={24} className="cart-icon" />
                <span className="cart-count">{getCartCount()}</span>
              </Link>
            </Button>
            <Button variant="link" className="auth-button" onClick={handleAuthToggle}>
              {isAuthenticated ? <FaSignOutAlt size={24} /> : <FaUser size={24} />}
            </Button>
          </div>
        </Container>
      </Navbar>
    </>
  );
};

export default PatwaNavbar;
