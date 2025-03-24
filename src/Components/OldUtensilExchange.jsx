import React from "react";
import { Container } from "react-bootstrap";

const OldUtensilExchange = () => {
  return (
    <Container className="mt-4 p-4" style={{ backgroundColor: "#e3f2fd", borderRadius: "10px" }}>
      <h2 className="text-center fw-bold mb-3">पुराने बर्तन एक्सचेंज नीति</h2>
      <p className="fs-5">
        पटवा बर्तन भंडार में, हम आपके पुराने बर्तनों को उचित मूल्य पर खरीदते हैं और
        नए बर्तन लेने पर भी आपको उचित दर पर एक्सचेंज की सुविधा प्रदान करते हैं।
      </p>
      <h4 className="fw-bold">स्वीकृत धातुएं:</h4>
      <ul className="fs-5">
        <li>पीतल (Brass)</li>
        <li>तांबा (Copper)</li>
        <li>कांसा (Kansa)</li>
        <li>एल्यूमिनियम (Aluminium)</li>
      </ul>
      <p className="fs-5">
        यदि आपके पास उपरोक्त धातुओं के पुराने बर्तन हैं, तो तुरंत हमारी दुकान पर आकर
        उचित मूल्य पर एक्सचेंज करें। आप हमसे संपर्क भी कर सकते हैं।
      </p>
      <h4 className="fw-bold">संपर्क करें:</h4>
      <p className="fs-5">
        <strong>पटवा बर्तन भंडार</strong>
        <br /> पोस्ट ऑफिस के पास, हर्रई, जिला छिंदवाड़ा, मध्य प्रदेश - 480224
        <br /> <strong>मोबाइल:</strong> 9977454799, 9407003015, 9713671554
      </p>
    </Container>
  );
};

export default OldUtensilExchange;