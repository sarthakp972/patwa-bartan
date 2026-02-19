import React from "react";
import "../Css-page/SplashLoader.css";

const SplashLoader = () => {
  return (
    <div className="splash-overlay">
      <div className="splash-content">
        <div className="splash-logo-wrap">
          <img
            src="https://res.cloudinary.com/dl5htbjf8/image/upload/t_Pateabartan%20logo/v1742657508/Dark_Green_Henna_Art_Business_Logo_20250322_210000_0000-removebg-preview_jesujo.png"
            alt="Patwa Bartan Bhandar"
            className="splash-logo"
          />
        </div>

        <h2 className="splash-brand">पटवा बर्तन भंडार</h2>

        <p className="splash-tagline">
          <span className="tagline-word">आपका</span>{" "}
          <span className="tagline-highlight">विश्वास</span>{" "}
          <span className="tagline-word">हमारी</span>{" "}
          <span className="tagline-highlight">पहचान</span>
        </p>

        {/* Animated dots loader */}
        <div className="splash-dots">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    </div>
  );
};

export default SplashLoader;
