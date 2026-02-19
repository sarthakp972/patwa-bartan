import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { FaFacebookF, FaInstagram, FaWhatsapp } from "react-icons/fa";
import { Link } from "react-router-dom";
import "../Css-page/Footer.css";
import Logo from "./Logo";
import useLanguage from "../context/useLanguage";

const Footer = () => {
  const { t } = useLanguage();
  return (
    <footer className="custom-footer">
      <Container>
        <Row className="gy-4">
          {/* Logo & Company Info */}
          <Col lg={4} md={6} xs={12} className="text-center text-md-start">
            <Logo />
            <p className="footer-info">{t("footer_owned_by")}</p>
            <p className="footer-info">
              {t("footer_store_name")}
              <br />
              {t("footer_address")}
              <br />
              9977454799 , 9713671554
            </p>
          </Col>

          {/* Know More Links */}
          <Col lg={2} md={3} xs={6}>
            <h6 className="footer-heading">{t("footer_know_more")}</h6>
            <ul className="footer-list">
              <li><Link to="/about" className="footer-link">{t("footer_about")}</Link></li>
              <li><Link to="/privacy-policy" className="footer-link">{t("footer_privacy")}</Link></li>
              <li><Link to="/Term&Conditions" className="footer-link">{t("footer_terms")}</Link></li>
              <li><Link to="/contact" className="footer-link">{t("footer_contact")}</Link></li>
              <li><Link to="/faq" className="footer-link">{t("footer_faq")}</Link></li>
            </ul>
          </Col>

          {/* Help Section */}
          <Col lg={2} md={3} xs={6}>
            <h6 className="footer-heading">{t("footer_help")}</h6>
            <ul className="footer-list">
              <li><Link to="/pital-tamba-kansa-care" className="footer-link">{t("footer_brass_care")}</Link></li>
              <li><Link to="/pital-tamba-kansa-care" className="footer-link">{t("footer_kansa_care")}</Link></li>
              <li><Link to="/pital-tamba-kansa-care" className="footer-link">{t("footer_copper_care")}</Link></li>
              <li><Link to="/old-utensil-exchange" className="footer-link">{t("footer_old_utensil")}</Link></li>
            </ul>
          </Col>

          {/* WhatsApp Section */}
          <Col lg={4} xs={12}>
            <h6 className="footer-heading">{t("footer_whatsapp_heading")}</h6>
            <p className="sarthak-footer">{t("footer_whatsapp_desc")}</p>

            {/* WhatsApp Chat Button */}
            <div className="footer-subscribe">
              <a
                href="https://wa.me/9713671554?text=नमस्ते%2C%20मैंने%20आपकी%20वेबसाइट%20देखी%20है%20और%20मुझे%20और%20जानकारी%20चाहिए।"
                className="footer-btn"
              >
                <FaWhatsapp size={20} className="footer-icon" style={{ marginRight: "8px", color: "#25D366" }} />
                {t("footer_whatsapp_chat")}
              </a>
            </div>

            {/* WhatsApp Channel Button */}
            <p className="mt-2 sarthak-footer">{t("footer_whatsapp_channel_desc")}</p>
            <div className="footer-subscribe">
              <a href="https://whatsapp.com/channel/0029Vb64kuJJZg428uQAy60G" className="footer-btn">
                <FaWhatsapp size={20} className="footer-icon" style={{ marginRight: "8px", color: "#25D366" }} />
                {t("footer_whatsapp_channel_btn")}
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
        <p className="footer-text sarthak-footer">© {new Date().getFullYear()}, {t("footer_copyright")}</p>
      </Container>
    </footer>
  );
};

export default Footer;
