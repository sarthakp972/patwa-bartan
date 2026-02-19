import React from "react";
import { Container } from "react-bootstrap";
import useLanguage from "../context/useLanguage";

const PrivacyPolicy = () => {
  const { t } = useLanguage();
  return (
    <Container fluid className="py-5" style={{ backgroundColor: "#f0f8ff" }}>
      <Container className="my-5">
        <h2 className="text-center mb-4 text-primary">
          {t("privacy_title")}
        </h2>

        <p className="fs-5">{t("privacy_intro")}</p>

        <h3 className="mt-4 text-danger">{t("privacy_s1_heading")}</h3>
        <p className="fs-5">{t("privacy_s1_body")}</p>

        <h3 className="mt-4 text-danger">{t("privacy_s2_heading")}</h3>
        <p className="fs-5">{t("privacy_s2_body")}</p>

        <h3 className="mt-4 text-danger">{t("privacy_s3_heading")}</h3>
        <p className="fs-5">{t("privacy_s3_body")}</p>

        <h3 className="mt-4 text-danger">{t("privacy_s4_heading")}</h3>
        <p className="fs-5">{t("privacy_s4_body")}</p>

        <h3 className="mt-4 text-danger">{t("privacy_s5_heading")}</h3>
        <p className="fs-5">{t("privacy_s5_body")}</p>

        <h3 className="mt-4 text-danger">{t("privacy_s6_heading")}</h3>
        <p className="fs-5">{t("privacy_s6_body")}</p>

        <h3 className="mt-4 text-danger">{t("privacy_s7_heading")}</h3>
        <p className="fs-5">{t("privacy_s7_body")}</p>

        <h3 className="mt-4 text-danger">{t("privacy_s8_heading")}</h3>
        <p className="fs-5">{t("privacy_s8_body")}</p>

        <h3 className="mt-4 text-danger">{t("privacy_s9_heading")}</h3>
        <p className="fs-5">{t("privacy_s9_body")}</p>

        <h3 className="mt-4 text-danger">{t("privacy_s10_heading")}</h3>
        <p className="fs-5">
          {t("privacy_s10_body")}
          <strong className="text-primary">
            <br />पटवा बर्तन भंडार
            <br />पोस्ट ऑफिस के पास, हर्रई, जिला छिंदवाड़ा, मध्य प्रदेश - 480224
            <br />📞 9977454799, 9407003015, 9713671554
          </strong>
        </p>

        <p className="fs-5 text-center mt-4">{t("privacy_footer")}</p>
      </Container>
    </Container>
  );
};

export default PrivacyPolicy;
