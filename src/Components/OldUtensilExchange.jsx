import React from "react";
import { Container } from "react-bootstrap";
import useLanguage from "../context/useLanguage";

const OldUtensilExchange = () => {
  const { t } = useLanguage();
  return (
    <Container className="mt-4 p-4" style={{ backgroundColor: "#e3f2fd", borderRadius: "10px" }}>
      <h2 className="text-center fw-bold mb-3">{t("exchange_title")}</h2>
      <p className="fs-5">{t("exchange_intro")}</p>
      <h4 className="fw-bold">{t("exchange_accepted_title")}</h4>
      <ul className="fs-5">
        <li>{t("exchange_metal1")}</li>
        <li>{t("exchange_metal2")}</li>
        <li>{t("exchange_metal3")}</li>
        <li>{t("exchange_metal4")}</li>
      </ul>
      <p className="fs-5">{t("exchange_cta")}</p>
      <h4 className="fw-bold">{t("exchange_contact_title")}</h4>
      <p className="fs-5">
        <strong>पटवा बर्तन भंडार</strong>
        <br /> {t("exchange_address")}
        <br /> <strong>{t("exchange_mobile_label")}</strong> 9977454799, 9407003015, 9713671554
      </p>
    </Container>
  );
};

export default OldUtensilExchange;