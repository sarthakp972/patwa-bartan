import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { ref, get } from "firebase/database";
import { realtimeDB } from "../FirebaseConfig";
import "../Css-page/HomeHero1.css";
import useLanguage from "../context/useLanguage";

const HomeHero1 = () => {
  const [metals, setMetals] = useState([]);
  const navigate = useNavigate();
  const { t } = useLanguage();

  useEffect(() => {
    const fetchMetals = async () => {
      try {
        const dbRef = ref(realtimeDB, "metals");
        const snapshot = await get(dbRef);
        if (snapshot.exists()) {
          const metalData = Object.values(snapshot.val());
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

  const handleCategoryClick = (category) => {
    navigate(`/category/${category}`);
  };

  return (
    <Container className="shop-by-metals text-center my-5">
      <h2 className="section-title">{t("home_shop_by_metal")}</h2>
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
          <p>{t("home_loading")}</p>
        )}
      </Row>
    </Container>
  );
};

export default HomeHero1;
