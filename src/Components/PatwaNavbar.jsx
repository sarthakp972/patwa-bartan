import { Navbar, Nav, Container, Form, FormControl, Button, Dropdown } from "react-bootstrap";
import { FaShoppingCart, FaUser, FaSignOutAlt, FaSearch, FaTools } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import useCart from "../context/useCart";
import "bootstrap/dist/css/bootstrap.min.css";
import "../Css-page/PatwaNavbar.css";
import Logo from "./Logo";
import { useState, useEffect, useRef } from "react";
import { auth, googleProvider } from "../FirebaseConfig";
import { signInWithPopup, signOut, onAuthStateChanged } from "firebase/auth";
import { toast } from "react-toastify";
import useAuth from "../context/useAuth";
import { FcGoogle } from "react-icons/fc";
const PatwaNavbar = () => {
  const { getCartCount } = useCart();
  const { user, isAdmin } = useAuth(); // Get user & isAdmin status
  const [searchQuery, setSearchQuery] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const navigate = useNavigate();
  const navbarToggleRef = useRef(null);
  const [greeting, setGreeting] = useState("Hello")
  const[user1,setUser1]=useState(null);
  // const handleAuthToggle = () => {
  //   setIsAuthenticated(!isAuthenticated);
  // };
  
  useEffect(() => {
    // Time-based Greeting
    const hour = new Date().getHours();
    if (hour < 12) setGreeting("Good Morning");
    else if (hour < 18) setGreeting("Good Afternoon");
    else setGreeting("Good Evening");
  }, []);
  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search/${searchQuery}`);
      setShowSearch(false); // Hide search bar after submission
    }
  };

  const handleNavLinkClick = () => {
    if (navbarToggleRef.current) {
      navbarToggleRef.current.click();
    }
  };



//signup
useEffect(() => {
  const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
    setUser1(currentUser);
    
  });
  return () => unsubscribe();
  
}, []);

// const [showSignUp, setShowSignUp] = useState(false);
const handleSignOut = async () => {
  try {
    await signOut(auth);
    setUser1(null);
    console.log(user1);
    toast.success("Signed out successfully!");
  } catch (error) {
    console.log(error);
    toast.error("Sign Out Failed! Please try again.");
  }
};

const handleGoogleSignIn = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    setUser1(result.user);
    console.log(result.user ,"sarthak natwaji");
    toast.success("Signed in successfully!");
  } catch (error) {
    console.log(error);
    toast.error("Sign In Failed! Please try again.");
    
  }
};


  return (
    <>
      {/* Mobile View */}
     {/* Mobile View */}
<Navbar expand="lg" className="patwa-navbar d-lg-none">
  <Container fluid>
    <Navbar.Toggle aria-controls="basic-navbar-nav" className="order-0" ref={navbarToggleRef} />
    <Navbar.Brand className="mx-auto order-1 brand-text">
      <Link to="/" className="nav-logo"><Logo /></Link>
    </Navbar.Brand>

    <div className="d-flex align-items-center">
      {/* Search Icon */}
      <Button variant="link" className="search-button-mobile" onClick={() => setShowSearch(!showSearch)}>
        <FaSearch size={22} />
      </Button>

      {/* Cart Icon */}
      <Button variant="link" className="cart-button order-2">
        <Link to="/cart" className="cart-link">
          <FaShoppingCart size={24} className="cart-icon" />
          <span className="cart-count">{getCartCount()}</span>
        </Link>
      </Button>

      {/* User Account Dropdown */}
      <Dropdown>
        <Dropdown.Toggle variant="link" className="profile-button">
          <FaUser size={24} />
        </Dropdown.Toggle>
        <Dropdown.Menu className="dropdown-menu-right " >
          {user ? (
            <>
              <Dropdown.Item disabled>{greeting}, {user.displayName}</Dropdown.Item>

              {/* Admin Panel (Only Visible to Admins) */}
              {isAdmin && (
                <Dropdown.Item as={Link} to="/admin">
                  <FaTools /> एडमिन पैनल
                </Dropdown.Item>
              )}

              <Dropdown.Item as={Link} to="/profile">प्रोफाइल</Dropdown.Item>
              <Dropdown.Item onClick={handleSignOut}>
                <FaSignOutAlt /> साइन आउट 
              </Dropdown.Item>
            </>
          ) : (
            <Dropdown.Item onClick={handleGoogleSignIn}>
              <FcGoogle size={24} />  <FaUser size={20} /> गूगल से साइन अप करें  
            </Dropdown.Item>
          )}
        </Dropdown.Menu>
      </Dropdown>
    </div>

    {/* Search Input Field */}
    {showSearch && (
      <Form className="search-form-mobile d-flex mt-2" onSubmit={handleSearch}>
        <FormControl
          type="search"
          placeholder="खोजें..."
          className="search-input-mobile"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <Button variant="outline-light" className="search-submit-mobile" type="submit">🔍</Button>
      </Form>
    )}

    <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="w-100 text-center mt-2">
        {/* Navigation Links */}
        <Nav.Link as={Link} to="/" className="nav-link" onClick={handleNavLinkClick}>होम</Nav.Link>
        <Nav.Link as={Link} to="/all-products" className="nav-link" onClick={handleNavLinkClick}>सभी बर्तन</Nav.Link>
        <Nav.Link as={Link} to="/contact" className="nav-link" onClick={handleNavLinkClick}>संपर्क</Nav.Link>
        <Nav.Link as={Link} to="/about" className="nav-link" onClick={handleNavLinkClick}>हमारे बारे में</Nav.Link>
      </Nav>
    </Navbar.Collapse>

  </Container>
</Navbar>


      {/* Desktop View */}
         {/* Desktop View */}
      <Navbar expand="lg" className="patwa-navbar d-none d-lg-flex">
        <Container fluid className="d-flex align-items-center justify-content-between">
          <Navbar.Brand className="brand-text">
            <Link to="/" className="nav-logo"><Logo /></Link>
          </Navbar.Brand>

          {/* 🔎 Search Bar */}
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
            {/* 🔗 Navigation Links */}
            <Nav>
              <Nav.Link as={Link} to="/" className="nav-link">होम</Nav.Link>
              <Nav.Link as={Link} to="/all-products" className="nav-link">सभी बर्तन</Nav.Link>
              <Nav.Link as={Link} to="/contact" className="nav-link">संपर्क</Nav.Link>
              <Nav.Link as={Link} to="/about" className="nav-link">हमारे बारे में</Nav.Link>
            </Nav>

            {/* 🛒 Cart Button */}
            <Button variant="link" className="cart-button">
              <Link to="/cart" className="cart-container">
                <FaShoppingCart size={24} className="cart-icon" />
                <span className="cart-count">{getCartCount()}</span>
              </Link>
            </Button>

            {/* 👤 User Account Dropdown */}
            <Dropdown>
              <Dropdown.Toggle variant="link" className="profile-button">
                <FaUser size={24} />
              </Dropdown.Toggle>
              <Dropdown.Menu className="dropdown-menu-end" >
                {user ? (
                  <>
                    <Dropdown.Item disabled>{greeting}, {user.displayName}</Dropdown.Item>
                    
                    {/* Admin Panel (Only Visible to Admins) */}
                    {isAdmin && (
                      <Dropdown.Item as={Link} to="/admin">
                        <FaTools /> एडमिन पैनल
                      </Dropdown.Item>
                    )}

                    <Dropdown.Item as={Link} to="/profile">प्रोफाइल</Dropdown.Item>
                    <Dropdown.Item onClick={handleSignOut}>
                      <FaSignOutAlt /> साइन आउट
                    </Dropdown.Item>
                  </>
                ) : (
                  <Dropdown.Item onClick={handleGoogleSignIn}>
                     <FcGoogle size={24} />  <FaUser size={20} />   गूगल से साइन अप करें
                  </Dropdown.Item>
                )}
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </Container>
      </Navbar>
    </>
  );
};

export default PatwaNavbar;
