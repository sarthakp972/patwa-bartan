import React from "react";
import { FaWhatsapp, FaEnvelope, FaMapMarkerAlt, FaPhoneAlt, FaFacebook, FaInstagram } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";
import useLanguage from "../context/useLanguage";

const Note = () => {
  const { t } = useLanguage();
  return (
    <div className="note-section container p-4 mt-4 rounded shadow-lg animated-note">
      <h4 className="text-primary">{t("note_heading")}</h4>

      <p>🛍️ <strong>{t("note_info_bold")}</strong> <br />
        {t("note_info_body")}
      </p>

      <p>🛒 <strong>{t("note_shopping_heading")}</strong> <br />
        {t("note_shopping_body")}
      </p>

      <p>📍 <strong>{t("note_address_heading")}</strong> <br />
        <FaMapMarkerAlt className="text-danger" /> {t("note_address_body")}
      </p>

      <p>📞 <strong>{t("note_contact_heading")}</strong> <br />
        <FaPhoneAlt className="text-success" /> <a href="tel:9977454799" className="text-dark">9977454799</a> / <a href="tel:9713671554" className="text-dark">9713671554</a>
      </p>

      <p>💬 <strong>{t("note_whatsapp_heading")}</strong> <br />
        <FaWhatsapp className="text-success" /> <a href="https://wa.me/9713671554" className="text-dark">9713671554</a>
      </p>

      <p>📧 <strong>{t("note_email_heading")}</strong> <br />
        <FaEnvelope className="text-primary" /> <a href="mailto:Patwa.bartan.bhandar@gmail.com" className="text-dark">Patwa.bartan.bhandar@gmail.com</a>
      </p>

      <p>🔄 <strong>{t("note_exchange_bold")}</strong> <br />
        {t("note_exchange_body")}
      </p>

      <p>🌐 <strong>{t("note_social_heading")}</strong> <br />
        <FaFacebook className="text-primary" /> <a href="https://www.facebook.com/share/1Br69UNZmq/" className="text-dark">{t("note_facebook")}</a>
      </p>

      <p>
        <FaInstagram className="text-danger" /> <a href="https://www.instagram.com/patwa_bartna_harrai?igsh=MWZjeng4aThwZGJpbA%3D%3D" className="text-dark" target="_blank" rel="noopener noreferrer">{t("note_instagram")}</a>
      </p>
    </div>
  );
};

export default Note;
