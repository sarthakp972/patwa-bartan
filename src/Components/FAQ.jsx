import React from "react";
import { Container, Accordion } from "react-bootstrap";

const FAQ = () => {
  return (
    <Container className="my-5">
      <h2 className="text-center mb-4">📢 अक्सर पूछे जाने वाले प्रश्न (FAQ)</h2>
      <Accordion defaultActiveKey="0">
        
        {/* Question 1 */}
        <Accordion.Item eventKey="0">
          <Accordion.Header>
            <strong className="fs-5">1. पटवा बर्तन भंडार क्या है?</strong>
          </Accordion.Header>
          <Accordion.Body>
            पटवा बर्तन भंडार एक भरोसेमंद दुकान है जहां आपको पीतल, कांसा, तांबा, स्टील, एल्यूमीनियम और अन्य धातुओं के बर्तन मिलते हैं। आप हमारी दुकान पर आकर खरीद सकते हैं या व्हाट्सएप के जरिए ऑर्डर कर सकते हैं।
          </Accordion.Body>
        </Accordion.Item>

        {/* Question 2 */}
        <Accordion.Item eventKey="1">
          <Accordion.Header>
            <strong className="fs-5">2. क्या मैं ऑनलाइन ऑर्डर कर सकता हूँ?</strong>
          </Accordion.Header>
          <Accordion.Body>
            अभी के लिए, हम ऑनलाइन भुगतान सुविधा प्रदान नहीं करते हैं। आप व्हाट्सएप पर हमसे संपर्क कर सकते हैं और ऑर्डर की पुष्टि कर सकते हैं।
          </Accordion.Body>
        </Accordion.Item>

        {/* Question 3 */}
        <Accordion.Item eventKey="2">
          <Accordion.Header>
            <strong className="fs-5">3. क्या आप होम डिलीवरी देते हैं?</strong>
          </Accordion.Header>
          <Accordion.Body>
            फिलहाल हम केवल स्थानीय स्तर पर डिलीवरी उपलब्ध कराते हैं। अन्य शहरों के लिए, ग्राहक को खुद पिकअप करना होगा या कूरियर की व्यवस्था करनी होगी।
          </Accordion.Body>
        </Accordion.Item>

        {/* Question 4 */}
        <Accordion.Item eventKey="3">
          <Accordion.Header>
            <strong className="fs-5">4. क्या मुझे प्रोडक्ट देखने के बाद खरीदना होगा?</strong>
          </Accordion.Header>
          <Accordion.Body>
            हां, हम ग्राहकों को पहले उत्पाद देखने और संतुष्ट होने के बाद ही खरीदारी करने की सलाह देते हैं ताकि किसी भी गलती या असमंजस से बचा जा सके।
          </Accordion.Body>
        </Accordion.Item>

        {/* Question 5 */}
        <Accordion.Item eventKey="4">
          <Accordion.Header>
            <strong className="fs-5">5. अगर प्रोडक्ट में कोई दिक्कत आती है तो क्या मैं इसे बदल सकता हूँ?</strong>
          </Accordion.Header>
          <Accordion.Body>
            हां, यदि आपने गलत प्रोडक्ट प्राप्त किया है या कोई डिफेक्ट है, तो आप **24 घंटे के अंदर** हमसे संपर्क कर सकते हैं। उपयोग किए गए या क्षतिग्रस्त प्रोडक्ट वापस नहीं लिए जाएंगे।
          </Accordion.Body>
        </Accordion.Item>

        {/* Question 6 */}
        <Accordion.Item eventKey="5">
          <Accordion.Header>
            <strong className="fs-5">6. भुगतान के लिए कौन-कौन से ऑप्शन उपलब्ध हैं?</strong>
          </Accordion.Header>
          <Accordion.Body>
            आप **कैश पेमेंट, बैंक ट्रांसफर या UPI (Google Pay, PhonePe, Paytm)** से भुगतान कर सकते हैं।
          </Accordion.Body>
        </Accordion.Item>

        {/* Question 7 */}
        <Accordion.Item eventKey="6">
          <Accordion.Header>
            <strong className="fs-5">7. आपकी दुकान कहां स्थित है?</strong>
          </Accordion.Header>
          <Accordion.Body>
            📍 **पटवा बर्तन भंडार**  
            पोस्ट ऑफिस के पास, हर्रई, जिला छिंदवाड़ा, मध्य प्रदेश - 480224  
            📞 **9977454799 , 9407003015 , 9713671554**  
          </Accordion.Body>
        </Accordion.Item>

        {/* Question 8 */}
        <Accordion.Item eventKey="7">
          <Accordion.Header>
            <strong className="fs-5">8. क्या आप थोक (Bulk) ऑर्डर लेते हैं?</strong>
          </Accordion.Header>
          <Accordion.Body>
            हां, हम थोक ऑर्डर भी लेते हैं। यदि आप बड़ी मात्रा में बर्तन खरीदना चाहते हैं, तो कृपया हमसे **व्हाट्सएप या फोन पर संपर्क करें**।
          </Accordion.Body>
        </Accordion.Item>

        {/* Question 9 */}
        <Accordion.Item eventKey="8">
          <Accordion.Header>
            <strong className="fs-5">9. क्या बर्तनों की देखभाल के लिए कोई खास तरीका है?</strong>
          </Accordion.Header>
          <Accordion.Body>
            हां, हर धातु के बर्तन को अलग तरीके से मेंटेन करना पड़ता है। हमारी वेबसाइट पर **Brass Care और Copper Care** सेक्शन देखें या हमसे सलाह लें।
          </Accordion.Body>
        </Accordion.Item>

        {/* Question 10 */}
        <Accordion.Item eventKey="9">
          <Accordion.Header>
            <strong className="fs-5">10. मैं आपसे संपर्क कैसे कर सकता हूँ?</strong>
          </Accordion.Header>
          <Accordion.Body>
            आप हमें सीधे कॉल कर सकते हैं या **व्हाट्सएप पर मैसेज भेज सकते हैं**। हमारे सोशल मीडिया पेज (Facebook, Instagram) से भी संपर्क किया जा सकता है।
          </Accordion.Body>
        </Accordion.Item>

      </Accordion>
    </Container>
  );
};

export default FAQ;
