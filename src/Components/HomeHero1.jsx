import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { ref, get } from "firebase/database"; // ✅ Import from Firebase Realtime DB
import { realtimeDB } from "../FirebaseConfig"; // ✅ Import your database instance
import "../Css-page/HomeHero1.css";

const HomeHero1 = () => {
  const [metals, setMetals] = useState([]); // ✅ State to store fetched data
  const navigate = useNavigate();

  // Fetch metal categories from Firebase Realtime Database
  useEffect(() => {
    const fetchMetals = async () => {
      try {
        const dbRef = ref(realtimeDB, "metals"); // ✅ Reference to "metals" node
        const snapshot = await get(dbRef); // ✅ Fetch data

        if (snapshot.exists()) {
          const metalData = Object.values(snapshot.val()); // ✅ Convert object to array
          setMetals(metalData);
        } else {
          console.log("No data found");
        }
      } catch (error) {
        console.error("Error fetching metal categories:", error);
      }
    };

    fetchMetals();
  }, []);

  // Handle category click
  const handleCategoryClick = (category) => {
    navigate(`/category/${category}`);
  };

  return (
    <Container className="shop-by-metals text-center my-5">
      <h2 className="section-title">मेटल के अनुसार खरीदें</h2>
      <Row className="mt-4">
        {metals.length > 0 ? (
          metals.map((metal, index) => (
            <Col key={index} md={4} sm={12} className="metal-item">
              <div
                className="metal-card"
                onClick={() => handleCategoryClick(metal.category)}
                style={{ cursor: "pointer" }}
              >
                <img src={metal.image} alt={metal.name} className="metal-image" />
                <h4 className="metal-name">{metal.name}</h4>
                <p className="metal-description">{metal.description}</p>
              </div>
            </Col>
          ))
        ) : (
          <p>लोड हो रहा है...</p>
        )}
      </Row>
    </Container>
  );
};

export default HomeHero1;
