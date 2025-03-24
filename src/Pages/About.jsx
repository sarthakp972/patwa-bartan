import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import "../Css-page/About.css";
// import MeetCreators from "../Components/MeetCreators";
const owners = [
  { name: "श्री जयप्रकाश पटवा", mobile: "+91 9977454799" },
  { name: "श्री चन्द्रप्रकाश पटवा", mobile: "+91 9407003015" },
];

const About = () => {
  return (
    <>
   
    <Container className="about-page">
      {/* Header Section */}
      <section className="about-header text-center">
        <h1 className="heading">हमारे बारे में</h1>
        <p className="sub-heading">
          30 साल से लोगों के विश्वास के साथ – हमारी यात्रा और मिशन।
        </p>
      </section>

      {/* Our Legacy Section */}
      <section className="about-legacy text-center">
        <p>
          हम 30 वर्षों से बाजार में टिके हुए हैं, और यह केवल हमारे ग्राहकों के प्यार और विश्वास के कारण संभव हुआ है।  
          हमारे उत्पादों की गुणवत्ता और प्रामाणिकता ने हमें हर घर का भरोसेमंद नाम बना दिया है।
        </p>
      </section>

      {/* Our Mission Section */}
      <section className="about-mission text-center">
        <h2>हमारा मिशन</h2>
        <p>
          सदियों पुरानी परंपराओं को आधुनिक दुनिया में पुनर्जीवित करना और यह सुनिश्चित करना कि लोग सही विकल्प चुनें।  
          हमें आसान विकल्पों के झांसे में नहीं आना चाहिए, बल्कि गुणवत्तापूर्ण जीवनशैली अपनानी चाहिए।
        </p>
        <h4 className="tagline">"Don’t fall for the easy one. Make the right choice!"</h4>
      </section>

      {/* Why Our Products Section */}
      <Row className="why-us-section">
        <Col lg={4} md={6}>
          <Card className="about-card">
            <Card.Body>
              <h3>🌿 आयुर्वेदिक</h3>
              <p>
                पारंपरिक धातु जैसे **कांसा, तांबा और पीतल** न केवल **टॉक्सिन-फ्री** हैं,  
                बल्कि **रोग प्रतिरोधक क्षमता बढ़ाते हैं, पाचन सुधारते हैं, और उम्र बढ़ाने में सहायक होते हैं।**
              </p>
            </Card.Body>
          </Card>
        </Col>

        <Col lg={4} md={6}>
          <Card className="about-card">
            <Card.Body>
              <h3>🛡 प्रामाणिकता</h3>
              <p>
                हमारे सभी बर्तन **100% शुद्ध धातु** से बने हैं और **ISO 9001:2005 प्रमाणित** हैं,  
                जिससे यह सुनिश्चित किया जाता है कि आप सबसे बेहतरीन गुणवत्ता प्राप्त करें।
              </p>
            </Card.Body>
          </Card>
        </Col>

        <Col lg={4} md={12}>
          <Card className="about-card">
            <Card.Body>
              <h3>♻️ सस्टेनेबिलिटी</h3>
              <p>
                हमारे बर्तन **लाइफटाइम टिकाऊ** होते हैं, **प्लास्टिक के उपयोग को कम** करते हैं,  
                और **गैस की बचत** कर पर्यावरण संरक्षण में मदद करते हैं।
              </p>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Achievements Section */}
      <section className="about-achievements text-center">
        <h2>हमारी प्रमुख उपलब्धियाँ</h2>
        <Row>
          <Col md={4}><p>✅ **67%** स्वास्थ्य व्यय में कमी</p></Col>
          <Col md={4}><p>✅ **880 KG** प्लास्टिक के उपयोग को रोका</p></Col>
          <Col md={4}><p>✅ **30+ वर्षों** से लोगों का भरोसा</p></Col>
        </Row>
      </section>

      {/* Customer Trust Section */}
      <section className="about-trust text-center">
        <h2>आपका विश्वास, हमारी मेहनत</h2>
        <p>
          हमारे ग्राहक ही हमारी असली ताकत हैं। हम आपके विश्वास को बनाए रखने के लिए हर दिन  
          **बेहतर उत्पाद और सेवाएँ** प्रदान करने में मेहनत कर रहे हैं।
        </p>
      </section>
  {/* <MeetCreators/> */}
  <div className="container mt-5">
      {/* Title with Underline Effect */}
      <h2 className="text-center fw-bold text-danger">पटवा बर्तन भंडार</h2>
      <div className="text-center mb-4">
        <hr className="w-25 mx-auto border-3 border-danger" />
      </div>

      <div className="row justify-content-center">
        {owners.map((owner, index) => (
          <div className="col-md-4" key={index}>
            <div className="card text-center border-0 shadow-lg p-3">
              <div className="card-body">
                <h4 className="card-title text-primary fw-bold">{owner.name}</h4>
                <p className="card-text text-dark fs-5">
                  <strong>मोबाइल:</strong> {owner.mobile}
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
