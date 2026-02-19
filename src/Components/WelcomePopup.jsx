import React, { useState, useEffect } from "react";
import useLanguage from "../context/useLanguage";
import "../Css-page/WelcomePopup.css";
import Logo from "./Logo";

const WelcomePopup = () => {
  const [show, setShow] = useState(false);
  const { t, language, toggleLanguage } = useLanguage();

  useEffect(() => {
    const timer = setTimeout(() => setShow(true), 800);
    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setShow(false);
  };

  if (!show) return null;

  return (
    <div className="welcome-overlay" onClick={handleClose}>
      <div className="welcome-modal" onClick={(e) => e.stopPropagation()}>

        {/* ── Header ── */}
        <div className="welcome-header">
          {/* Language Toggle inside popup */}
          <button
            className="popup-lang-toggle"
            onClick={toggleLanguage}
            title="Toggle Language"
          >
            {language === "hi" ? "🌐 EN" : "🇮🇳 HI"}
          </button>

          <div className="welcome-logo-wrap">
            <Logo />
          </div>
          <h2 className="welcome-brand">पटवा बर्तन भंडार</h2>
          <p className="welcome-tagline">{t("popup_tagline")}</p>
        </div>

        {/* ── Steps ── */}
        <div className="welcome-body">
          <div className="welcome-step">
            <div className="step-num">1</div>
            <div>
              <strong>{t("popup_step1_title")}</strong>
              <p>{t("popup_step1_body")}</p>
            </div>
          </div>

          <div className="step-arrow">↓</div>

          <div className="welcome-step">
            <div className="step-num">2</div>
            <div>
              <strong>{t("popup_step2_title")}</strong>
              <p>{t("popup_step2_body")}</p>
            </div>
          </div>

          <div className="step-arrow">↓</div>

          <div className="welcome-step highlight-step">
            <div className="step-num gold">3</div>
            <div>
              <strong>{t("popup_step3_title")}</strong>
              <p>{t("popup_step3_body")}</p>
            </div>
          </div>

          {/* CTA text */}
          <p className="popup-cta-text">{t("popup_cta")}</p>

          {/* Not listed banner */}
          <a
            href="https://wa.me/9713671554"
            target="_blank"
            rel="noopener noreferrer"
            className="popup-not-listed"
            onClick={handleClose}
          >
            {t("popup_not_listed")}
          </a>
        </div>

        {/* ── Buttons ── */}
        <div className="welcome-footer">
          <a
            href="https://wa.me/9713671554"
            target="_blank"
            rel="noopener noreferrer"
            className="welcome-btn whatsapp-btn"
            onClick={handleClose}
          >
            {t("popup_whatsapp_btn")}
          </a>
          <button className="welcome-btn explore-btn" onClick={handleClose}>
            {t("popup_explore_btn")}
          </button>
        </div>

        <button className="welcome-close" onClick={handleClose} aria-label="Close">✕</button>
      </div>
    </div>
  );
};

export default WelcomePopup;
