import React from "react";
import { Container, Accordion } from "react-bootstrap";
import useLanguage from "../context/useLanguage";

const FAQ = () => {
  const { t } = useLanguage();
  return (
    <Container className="my-5">
      <h2 className="text-center mb-4">{t("faq_title")}</h2>
      <Accordion defaultActiveKey="0">

        <Accordion.Item eventKey="0">
          <Accordion.Header><strong className="fs-5">{t("faq_q1")}</strong></Accordion.Header>
          <Accordion.Body>{t("faq_a1")}</Accordion.Body>
        </Accordion.Item>

        <Accordion.Item eventKey="1">
          <Accordion.Header><strong className="fs-5">{t("faq_q2")}</strong></Accordion.Header>
          <Accordion.Body>{t("faq_a2")}</Accordion.Body>
        </Accordion.Item>

        <Accordion.Item eventKey="2">
          <Accordion.Header><strong className="fs-5">{t("faq_q3")}</strong></Accordion.Header>
          <Accordion.Body>{t("faq_a3")}</Accordion.Body>
        </Accordion.Item>

        <Accordion.Item eventKey="3">
          <Accordion.Header><strong className="fs-5">{t("faq_q4")}</strong></Accordion.Header>
          <Accordion.Body>{t("faq_a4")}</Accordion.Body>
        </Accordion.Item>

        <Accordion.Item eventKey="4">
          <Accordion.Header><strong className="fs-5">{t("faq_q5")}</strong></Accordion.Header>
          <Accordion.Body>{t("faq_a5")}</Accordion.Body>
        </Accordion.Item>

        <Accordion.Item eventKey="5">
          <Accordion.Header><strong className="fs-5">{t("faq_q6")}</strong></Accordion.Header>
          <Accordion.Body>{t("faq_a6")}</Accordion.Body>
        </Accordion.Item>

        <Accordion.Item eventKey="6">
          <Accordion.Header><strong className="fs-5">{t("faq_q7")}</strong></Accordion.Header>
          <Accordion.Body>{t("faq_a7")}</Accordion.Body>
        </Accordion.Item>

        <Accordion.Item eventKey="7">
          <Accordion.Header><strong className="fs-5">{t("faq_q8")}</strong></Accordion.Header>
          <Accordion.Body>{t("faq_a8")}</Accordion.Body>
        </Accordion.Item>

        <Accordion.Item eventKey="8">
          <Accordion.Header><strong className="fs-5">{t("faq_q9")}</strong></Accordion.Header>
          <Accordion.Body>{t("faq_a9")}</Accordion.Body>
        </Accordion.Item>

        <Accordion.Item eventKey="9">
          <Accordion.Header><strong className="fs-5">{t("faq_q10")}</strong></Accordion.Header>
          <Accordion.Body>{t("faq_a10")}</Accordion.Body>
        </Accordion.Item>

      </Accordion>
    </Container>
  );
};

export default FAQ;
