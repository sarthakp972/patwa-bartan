import { useState, useEffect } from "react";
import { Navbar, Nav, Container, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import useProducts from "../context/useProducts";
import "../Css-page/PatwaNavbar2.css";

// Mapping Firebase category keys to Hindi names
const categoryNames = {
  Pital: "पीतल",
  cookware: "कुकवेयर",
  copper: "तांबा",
  electronic: "इलेक्ट्रॉनिक",
  gift: "उपहार",
  kanch_chhini: "कांच और चीनी मिट्टी",
  kansa: "कांसा",
  lakdhi: "लकड़ी का सामान",
  steel: "स्टील",
  plastic: "प्लास्टिक",
  pooja_saman: "पूजा का सामान",
  nonstick: "नॉन-स्टिक",
  aluminium: "एल्युमिनियम",
};

const PatwaNavbar2 = () => {
  const { products, setSelectedCategory } = useProducts();
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState(""); 
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    if (Object.keys(products).length > 0) {
      setLoading(false); // Stop loading when categories are fetched
    }
  }, [products]);

  // Convert Firebase categories into menu items
  const categories = Object.keys(products).map((key) => ({
    name: categoryNames[key] || key,
    key: key,
  }));

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    setActiveCategory(category);
    navigate(`/category/${category}`);
  };

  return (
    <Navbar className="patwa-navbar-compact" variant="dark">
      <Container fluid>
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mx-auto">
            {loading ? (
              <div className="loading-spinner d-flex align-items-center text-white">
                <Spinner animation="grow" variant="light" size="sm" />
                <span className="ms-2">लोड हो रहा है...</span>
              </div>
            ) : (
              categories.map((category) => (
                <Nav.Link 
                  key={category.key} 
                  className={`text-white ${activeCategory === category.key ? "active-category" : ""}`}
                  onClick={() => handleCategoryClick(category.key)}
                  style={{ cursor: "pointer" }}
                >
                  {category.name}
                </Nav.Link>
              ))
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default PatwaNavbar2;
