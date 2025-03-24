import "../Css-page/RunningNav.css";
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const RunningNav = ({ textArray }) => {
  return (
    <div className="running-nav py-2 overflow-hidden">
      <div className="position-relative">
        <div className="d-flex marquee-container">
          {/* Loop through the passed textArray */}
          {textArray?.map((text, index) => (
            <span key={index} className="text-theme-gold text-uppercase mx-3 fw-medium marquee-text">
              {text}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RunningNav;
