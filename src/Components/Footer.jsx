import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { FaFacebookF, FaInstagram, FaPinterestP, FaWhatsapp } from "react-icons/fa";
import { Link } from "react-router-dom";
import "../Css-page/Footer.css";
import Logo from "./Logo";

const Footer = () => {
  return (
    <footer className="custom-footer">
      <Container>
        <Row className="gy-4">
          {/* Logo & Company Info */}
          <Col lg={4} md={6} xs={12} className="text-center text-md-start">
            {/* <img
              src="https://res.cloudinary.com/dl5htbjf8/image/upload/t_Patwa%20bartan%20inventry%20logo/v1742655997/Dark_Green_Henna_Art_Business_Logo_20250124_080201_0000-removebg-preview_xocon0.png"
              alt="पटवा बर्तन लोगो"
              className="footer-logo"
            /> */}
            <Logo/>
            <p className="footer-info">स्वामित्व में</p>
            <p className="footer-info">
              पटवा बर्तन भंडार
              <br />
              पोस्ट ऑफिस के पास, हर्रई, जिला छिंदवाड़ा, मध्य प्रदेश - 480224
              <br />
              9977454799 , 9407003015 , 9713671554
            </p>
          </Col>

          {/* Know More Links */}
          <Col lg={2} md={3} xs={6}>
            <h6 className="footer-heading">और जानें</h6>
            <ul className="footer-list">
              <li><Link to="/about" className="footer-link">हमारे बारे में</Link></li>
              <li><Link to="/privacy-policy" className="footer-link">गोपनीयता नीति</Link></li>
              <li><Link to="/Term&Conditions" className="footer-link">नियम और शर्तें</Link></li>
              <li><Link to="/contact" className="footer-link">संपर्क करें</Link></li>
              <li><Link to="/faq" className="footer-link">अक्सर पूछे जाने वाले प्रश्न</Link></li>
            </ul>
          </Col>

          {/* Help Section */}
          <Col lg={2} md={3} xs={6}>
            <h6 className="footer-heading">सहायता</h6>
            <ul className="footer-list">
              <li><Link to="/pital-tamba-kansa-care" className="footer-link">पीतल की देखभाल</Link></li>
              <li><Link to="/pital-tamba-kansa-care" className="footer-link">कांसा की देखभाल</Link></li>
              <li><Link to="/pital-tamba-kansa-care" className="footer-link">तांबे की देखभाल</Link></li>
              <li><Link to="/old-utensil-exchange" className="footer-link">स्वीकृत पुराना बर्तन वापसी</Link></li>
            </ul>
          </Col>

          {/* WhatsApp Section */}
          <Col lg={4} xs={12}>
            <h6 className="footer-heading  ">हमसे व्हाट्सएप पर जुड़ें</h6>
            <p className="sarthak-footer">हमारी नवीनतम प्रोमोशन, नए उत्पादों, और अधिक के बारे में जानने के लिए हमारे व्हाट्सएप चैनल से जुड़ें।</p>

            {/* WhatsApp Chat Button */}
            <div className="footer-subscribe">
  <a 
    href="https://wa.me/9713671554?text=नमस्ते%2C%20मैंने%20आपकी%20वेबसाइट%20देखी%20है%20और%20मुझे%20और%20जानकारी%20चाहिए।" 
    className="footer-btn"
  >
    <FaWhatsapp size={20} className="footer-icon" style={{ marginRight: "8px", color: "#25D366" }} />
    व्हाट्सएप चैट करें
  </a>
</div>


            {/* WhatsApp Channel Button */}
            <p className="mt-2 sarthak-footer">हमारे व्हाट्सएप चैनल से जुड़ें:</p>
            <div className="footer-subscribe">
              <a href="https://whatsapp.com/channel/0029Vb64kuJJZg428uQAy60G" className="footer-btn">
                <FaWhatsapp size={20} className="footer-icon" style={{ marginRight: "8px", color: "#25D366" }} />
                व्हाट्सएप चैनल देखें 
              </a>
            </div>

            {/* Social Media Icons */}
            <div className="footer-social">
  <a href="https://www.facebook.com/share/1Br69UNZmq/" target="_blank" rel="noopener noreferrer">
    <FaFacebookF size={20} className="footer-icon" style={{ color: "#1877F2", marginRight: "10px" }} />
  </a>
  <a href="https://www.instagram.com/patwa_bartna_harrai?igsh=MWZjeng4aThwZGJpbA%3D%3D" target="_blank" rel="noopener noreferrer">
    <FaInstagram size={20} className="footer-icon" style={{ color: "#E4405F", marginRight: "10px" }} />
  </a>
 
</div>
          </Col>
        </Row>

        <hr className="footer-divider" />
        <p className="footer-text sarthak-footer">© {new Date().getFullYear()}, पटवा बर्तन भंडार। सर्वाधिकार सुरक्षित।</p>
      </Container>
    </footer>
  );
};

export default Footer;
