import React, { useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { FaFacebookF, FaInstagram, FaWhatsapp, FaEnvelope, FaMapMarkerAlt, FaPhone } from "react-icons/fa";
import { ref, push } from "firebase/database";
import { realtimeDB } from "../FirebaseConfig";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "../Css-page/Contact.css";
import useLanguage from "../context/useLanguage";

const Contact = () => {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.message) {
      toast.error(t("contact_error_fields"));
      return;
    }

    try {
      await push(ref(realtimeDB, "contact_messages"), formData);
      toast.success(t("contact_success"));
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      console.error("Firebase Error:", error);
      toast.error(t("contact_error_send"));
    }
  };

  return (
    <Container className="contact-container">
      <h2 className="section-title">{t("contact_title")}</h2>
      <Row className="contact-info">
        {/* Address & Contact */}
        <Col md={6} className="info-box">
          <h4><FaMapMarkerAlt /> {t("contact_address_label")}</h4>
          <p>{t("contact_address")}</p>

          <h4><FaPhone /> {t("contact_phone_label")}</h4>
          <p>9977454799 , 9713671554</p>

          <h4><FaEnvelope /> {t("contact_email_label")}</h4>
          <p>Patwa.bartan.bhandar@gmail.com</p>

          <h4>{t("contact_map_label")}</h4>
          <iframe
            title="Google Map"
            className="google-map"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3073.7904631390593!2d79.21869477435486!3d22.624159431080496!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x397ff318e7146379%3A0x7a64d36e4834be1c!2sPatwa%20bartan%20bhander%20harrai!5e1!3m2!1sen!2sin!4v1742540696189!5m2!1sen!2sin"
            width="100%"
            height="350"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </Col>

        {/* Contact Form */}
        <Col md={6} className="form-box">
          <h4>{t("contact_message_label")}</h4>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>{t("contact_name")}</Form.Label>
              <Form.Control type="text" name="name" value={formData.name} onChange={handleChange} placeholder={t("contact_name_placeholder")} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>{t("contact_email")}</Form.Label>
              <Form.Control type="email" name="email" value={formData.email} onChange={handleChange} placeholder={t("contact_email_placeholder")} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>{t("contact_message")}</Form.Label>
              <Form.Control as="textarea" name="message" rows={4} value={formData.message} onChange={handleChange} placeholder={t("contact_message_placeholder")} />
            </Form.Group>
            <Button variant="primary" type="submit" className="submit-button">
              {t("contact_submit")}
            </Button>
          </Form>
        </Col>
      </Row>

      {/* Social Media Links */}
      <Row className="social-section">
        <h4>{t("contact_social")}</h4>
        <div className="social-icons">
          <a href="https://www.facebook.com/share/1Br69UNZmq/" target="_blank" rel="noopener noreferrer">
            <FaFacebookF className="social-icon fb" style={{ color: "#1877F2", marginRight: "10px" }} />
          </a>
          <a href="https://www.instagram.com/patwa_bartna_harrai?igsh=MWZjeng4aThwZGJpbA%3D%3D" target="_blank" rel="noopener noreferrer">
            <FaInstagram className="social-icon insta" style={{ color: "#E4405F", marginRight: "10px" }} />
          </a>
          <a href="https://wa.me/9713671554?text=नमस्ते%2C%20मैंने%20आपकी%20वेबसाइट%20देखी%20है%20और%20मुझे%20और%20जानकारी%20चाहिए।" target="_blank" rel="noopener noreferrer">
            <FaWhatsapp className="social-icon wa" style={{ color: "#25D366", marginRight: "10px" }} />
          </a>
          <a href="mailto:patwa.bartan.bhandar@gmail.com">
            <FaEnvelope className="social-icon email" style={{ color: "#D44638" }} />
          </a>
        </div>
      </Row>

      {/* Business Hours */}
      <Row className="business-hours">
        <h4>{t("contact_hours_label")}</h4>
        <p>{t("contact_hours")}</p>
      </Row>
    </Container>
  );
};

export default Contact;
