import React from "react";
import { Container } from "react-bootstrap";
import useLanguage from "../context/useLanguage";

const TermsAndConditions = () => {
  const { t } = useLanguage();
  return (
    <Container className="py-4">
      <h2 className="text-center mb-4">{t("terms_title")}</h2>

      <p><strong>{t("terms_s1_heading")}</strong></p>
      <p>{t("terms_s1_body")}</p>

      <p><strong>{t("terms_s2_heading")}</strong></p>
      <p>{t("terms_s2_body")}</p>

      <p><strong>{t("terms_s3_heading")}</strong></p>
      <p>{t("terms_s3_body")}</p>

      <p><strong>{t("terms_s4_heading")}</strong></p>
      <p>{t("terms_s4_body")}</p>

      <p><strong>{t("terms_s5_heading")}</strong></p>
      <p>
        पटवा बर्तन भंडार<br />
        पोस्ट ऑफिस के पास, हर्रई, जिला छिंदवाड़ा, मध्य प्रदेश - 480224<br />
        📞 9977454799, 9407003015, 9713671554
      </p>
    </Container>
  );
};

export default TermsAndConditions;
