import React from "react";
import { Container } from "react-bootstrap";
import useLanguage from "../context/useLanguage";

const BrassCare = () => {
  const { t } = useLanguage();
  return (
    <Container fluid className="py-5" style={{ backgroundColor: "#e0f7fa" }}>
      <Container className="my-5">
        <h1 className="text-center mb-4 text-primary fw-bold">
          {t("brass_title")}
        </h1>

        <p className="fs-5 text-center">{t("brass_intro")}</p>

        <h2 className="text-success mt-5">{t("brass_solutions_title")}</h2>
        <ul className="fs-5">
          <li>{t("brass_sol1")}</li>
          <li>{t("brass_sol2")}</li>
          <li>{t("brass_sol3")}</li>
          <li>{t("brass_sol4")}</li>
        </ul>

        <h2 className="text-danger mt-5">{t("brass_why_title")}</h2>
        <p className="fs-5">{t("brass_why_body")}</p>

        <h3 className="text-center text-dark mt-4">{t("brass_visit")}</h3>
      </Container>
    </Container>
  );
};

export default BrassCare;