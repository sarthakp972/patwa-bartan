import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { ref, get } from "firebase/database";
import { realtimeDB } from "../FirebaseConfig";
import { Container, Navbar, Nav, Spinner, Alert } from "react-bootstrap";

// Selected categories to display in the navbar
const selectedCategories = [
  "Pital",
  "copper",
  "steel",
  "pooja_saman",
  "gift",
  "electronic",
  "aluminium",
  "cookware",
  "kanch_chhini",
  "kansa",
  "lakdi",
  "plastic",
  "nonstick",
  "home_discount_product",
  "home_vishesh_product",
];

const AdminCategoryNav = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const dbRef = ref(realtimeDB);
        const snapshot = await get(dbRef);
        if (snapshot.exists()) {
          const fetchedCategories = Object.keys(snapshot.val()); // Get all categories from Firebase
          const filteredCategories = fetchedCategories.filter((cat) =>
            selectedCategories.includes(cat)
          );
          setCategories(filteredCategories);
        } else {
          setError("⚠ No categories found in Firebase.");
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
        setError("❌ Failed to fetch categories. Please try again.");
      }
      setLoading(false);
    };

    fetchCategories();
  }, []);

  return (
    <Navbar bg="dark" variant="dark" expand="lg" className="sticky-top py-2 shadow">
      <Container fluid>
        <Navbar.Brand as={NavLink} to="/admin" className="fw-bold text-light">
          Produc Manage
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="admin-navbar-nav" />
        <Navbar.Collapse id="admin-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link
              as={NavLink}
              to="/admin"
              className={({ isActive }) =>
                `text-light fw-semibold ${isActive ? "active text-warning" : ""}`
              }
            >
              All Products
            </Nav.Link>
            {loading ? (
              <Spinner animation="border" variant="light" className="ms-3" />
            ) : error ? (
              <Alert variant="danger" className="ms-3 mb-0 p-2">{error}</Alert>
            ) : categories.length > 0 ? (
              categories.map((category) => (
                <Nav.Link
                  key={category}
                  as={NavLink}
                  to={`/admin/admin_category/${category}`}
                  className={({ isActive }) =>
                    `text-light fw-semibold ${isActive ? "active text-warning" : ""}`
                  }
                >
                  {category.replace(/_/g, " ")}
                </Nav.Link>
              ))
            ) : (
              <Nav.Link disabled className="text-light fw-semibold">
                No Categories Found
              </Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default AdminCategoryNav;
