import React, { useState, useEffect } from "react";
import { ref, onValue } from "firebase/database";
import { realtimeDB } from "../FirebaseConfig";
import { Container, Spinner } from "react-bootstrap";

const HomeSeasonalBanner2 = () => {
  const [bannerImage, setBannerImage] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const bannerRef = ref(realtimeDB, "seasonalBanner2");

    onValue(bannerRef, (snapshot) => {
      const data = snapshot.val();
      if (data && data.imageUrl && data.showBanner !== false) {
        setBannerImage(data.imageUrl);
      } else {
        setBannerImage(null); // Hide banner if false or no image
      }
      setLoading(false); // Stop loading after fetching data
    });
  }, []);

  return (
    <Container style={{ maxWidth: "100%", textAlign: "center", margin: "20px 0" }}>
      {loading ? ( // Show spinner while loading
        <Spinner animation="border" variant="primary" />
      ) : bannerImage ? ( // Show banner if available
        <img
          src={bannerImage}
          alt="Seasonal Banner"
          style={{
            width: "100%",
            height: "auto",
            borderRadius: "15px",
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
          }}
        />
      ) : null} {/* Hide if no banner */}
    </Container>
  );
};

export default HomeSeasonalBanner2;
