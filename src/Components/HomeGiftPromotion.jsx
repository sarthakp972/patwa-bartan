import "../Css-page/HomeGiftPromotion.css";
import React from "react";
import { Container, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom"; // ✅ Import useNavigate

const GiftPromotion = () => {
  const navigate = useNavigate(); // ✅ Hook for navigation

  const handleExploreClick = () => {
    navigate("/category/gift"); // ✅ Redirect to the Gift category page
  };

  return (
    <Container className="gift-promotion my-5 text-center">
      <div className="gift-content">
        <div className="gift-text">
          <h3 className="gift-heading">स्वास्थ्य का उपहार, समृद्धि का उपहार</h3>
          <p className="gift-description">
            अपने प्रियजनों को हमारे सुंदर और पारंपरिक धातु उपहारों से खुश करें।
            स्टील, तांबा, कांसा और अन्य उच्च गुणवत्ता वाले बर्तन उपहार में दें,
            जो न केवल दिखने में आकर्षक हैं बल्कि स्वास्थ्यवर्धक भी हैं।
          </p>
          <Button className="explore-btn" onClick={handleExploreClick}>
            उपहार देखें
          </Button>
        </div>
        <div className="gift-image">
          <img src="https://ptal.in/cdn/shop/files/Rectangle_5929.jpg?v=1696852778" alt="Gift Set" />
        </div>
      </div>
    </Container>
  );
};

export default GiftPromotion;
