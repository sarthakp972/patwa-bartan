import { useState, useEffect } from "react";
import { Navbar, Nav, Container, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import useProducts from "../context/useProducts";
import useLanguage from "../context/useLanguage";
import "../Css-page/PatwaNavbar2.css";

const PatwaNavbar2 = () => {
  const { products, setSelectedCategory } = useProducts();
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [activeCategory, setActiveCategory] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (Object.keys(products).length > 0) {
      setLoading(false);
    }
  }, [products]);

  // Convert Firebase categories into menu items, using t() for translated names
  const categories = Object.keys(products).map((key) => ({
    name: t(`cat_${key}`) !== `cat_${key}` ? t(`cat_${key}`) : key,
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
        {/* ✅ Removed Navbar.Collapse — categories always visible */}
        <Nav className="mx-auto flex-wrap justify-content-center">
          {loading ? (
            <div className="loading-spinner d-flex align-items-center text-white">
              <Spinner animation="grow" variant="light" size="sm" />
              <span className="ms-2">{t("cat_loading")}</span>
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
      </Container>
    </Navbar>
  );
};

export default PatwaNavbar2;
