import { Container, Row, Col, Card } from "react-bootstrap";
import "../Css-page/About.css";
import useLanguage from "../context/useLanguage";

const owners = [
  { nameHi: "श्री जयप्रकाश पटवा", nameEn: "Mr. Jayprakash Patwa", mobile: "+91 9977454799" },
];

const About = () => {
  const { t, language } = useLanguage();
  return (
    <>
      <Container className="about-page">
        {/* Header Section */}
        <section className="about-header text-center">
          <h1 className="heading">{t("about_title")}</h1>
          <p className="sub-heading">{t("about_subtitle")}</p>
        </section>

        {/* Our Legacy Section */}
        <section className="about-legacy text-center">
          <p>{t("about_legacy")}</p>
        </section>

        {/* Our Mission Section */}
        <section className="about-mission text-center">
          <h2>{t("about_mission_title")}</h2>
          <p>{t("about_mission_body")}</p>
          <h4 className="tagline">"Don't fall for the easy one. Make the right choice!"</h4>
        </section>

        {/* Why Our Products Section */}
        <Row className="why-us-section">
          <Col lg={4} md={6}>
            <Card className="about-card">
              <Card.Body>
                <h3>{t("about_ayurvedic_title")}</h3>
                <p>{t("about_ayurvedic_body")}</p>
              </Card.Body>
            </Card>
          </Col>

          <Col lg={4} md={6}>
            <Card className="about-card">
              <Card.Body>
                <h3>{t("about_authenticity_title")}</h3>
                <p>{t("about_authenticity_body")}</p>
              </Card.Body>
            </Card>
          </Col>

          <Col lg={4} md={12}>
            <Card className="about-card">
              <Card.Body>
                <h3>{t("about_sustainability_title")}</h3>
                <p>{t("about_sustainability_body")}</p>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Achievements Section */}
        <section className="about-achievements text-center">
          <h2>{t("about_achievements_title")}</h2>
          <Row>
            <Col md={4}><p>{t("about_ach1")}</p></Col>
            <Col md={4}><p>{t("about_ach2")}</p></Col>
            <Col md={4}><p>{t("about_ach3")}</p></Col>
          </Row>
        </section>

        {/* Customer Trust Section */}
        <section className="about-trust text-center">
          <h2>{t("about_trust_title")}</h2>
          <p>{t("about_trust_body")}</p>
        </section>

        <div className="container mt-5">
          <h2 className="text-center fw-bold text-danger">{t("about_store_title")}</h2>
          <div className="text-center mb-4">
            <hr className="w-25 mx-auto border-3 border-danger" />
          </div>
          <div className="row justify-content-center">
            {owners.map((owner, index) => (
              <div className="col-md-4" key={index}>
                <div className="card text-center border-0 shadow-lg p-3">
                  <div className="card-body">
                    <h4 className="card-title text-primary fw-bold">{language === "en" ? owner.nameEn : owner.nameHi}</h4>
                    <p className="card-text text-dark fs-5">
                      <strong>{t("about_mobile_label")}</strong> {owner.mobile}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </>
  );
};

export default About;
