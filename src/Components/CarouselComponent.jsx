import React, { useState, useEffect } from "react";
import { Carousel } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "../Css-page/CarouselComponent.css";
import { ref, get } from "firebase/database";
import { realtimeDB } from "../FirebaseConfig";

const CarouselComponent = () => {
  const [carouselImages, setCarouselImages] = useState([]);

  useEffect(() => {
    const fetchCarouselImages = async () => {
      try {
        const imagesRef = ref(realtimeDB, "HomeCarouselImages"); // Fetch images from Firebase
        const snapshot = await get(imagesRef);
        
        if (snapshot.exists()) {
          const data = snapshot.val();
          const imagesArray = Object.values(data); // Convert object to array
          setCarouselImages(imagesArray);
        } else {
          console.warn("No carousel images found in Firebase.");
        }
      } catch (error) {
        console.error("Error fetching carousel images:", error);
      }
    };

    fetchCarouselImages();
  }, []);

  return (
    <Carousel className="custom-carousel" fade interval={2000} controls={true} indicators={true}>
      {carouselImages.length > 0 ? (
        carouselImages.map((imageUrl, index) => (
          <Carousel.Item key={index}>
            <img className="d-block w-100" src={imageUrl} alt={`Slide ${index + 1}`} />
          </Carousel.Item>
        ))
      ) : (
        <p>Loading...</p> // Show loading while fetching data
      )}
    </Carousel>
  );
};

export default CarouselComponent;
