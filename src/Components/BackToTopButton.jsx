import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import { FaArrowUp } from "react-icons/fa";
import "../Css-page/BackToTop.css";

const BackToTopButton = () => {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const toggleVisibility = () => {
            setVisible(window.scrollY > 200);
        };

        window.addEventListener("scroll", toggleVisibility);
        return () => window.removeEventListener("scroll", toggleVisibility);
    }, []);

    // 🚀 **INSTANT SCROLL** (1ms में ऊपर पहुँचाए)
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "instant" }); // 🔥 1ms में टॉप
    };

    return (
        <Button
            className={`back-to-top ${visible ? "show" : ""}`}
            onClick={scrollToTop}
        >
            <FaArrowUp />
        </Button>
    );
};

export default BackToTopButton;
