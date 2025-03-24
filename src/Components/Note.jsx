import React from "react";
import { FaWhatsapp, FaEnvelope, FaMapMarkerAlt, FaPhoneAlt, FaFacebook, FaInstagram } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";
// import "./Note.css"; // Add styles for animation and layout

const Note = () => {
  return (
    <div className="note-section container p-4 mt-4 rounded shadow-lg animated-note">
      <h4 className="text-primary">🔹 विशेष जानकारी:</h4>
      
      <p>🛍️ <strong>यह वेबसाइट फिलहाल केवल उत्पादों की विविधता दिखाने के लिए बनाई गई है।</strong> <br />
        बहुत जल्द हम <strong>होम डिलीवरी का विकल्प</strong> भी लाने वाले हैं। लेकिन आप इस वेबसाइट के माध्यम से <strong>सही दामों में अपना पसंदीदा उत्पाद बुक कर सकते हैं।</strong>
      </p>
      
      <p>🛒 <strong>खरीदारी के विकल्प:</strong> <br />
        ग्राहक <strong>दुकान पर आकर खरीद सकते हैं</strong> या <strong>व्हाट्सएप के माध्यम से ऑर्डर कर सकते हैं।</strong> <br />
        हालांकि, हम सिफारिश करते हैं कि ग्राहक <strong>दुकान पर आकर ही खरीदें</strong>, ताकि वे उत्पाद को अच्छी तरह से देख सकें और अपनी संतुष्टि के अनुसार खरीदारी कर सकें।
      </p>
      
      <p>📍 <strong>दुकान का पता:</strong> <br />
        <FaMapMarkerAlt className="text-danger" /> वार्ड नं. 08, पोस्ट ऑफिस के सामने, हर्रई, जिला छिंदवाड़ा, मध्य प्रदेश
      </p>
      
      <p>📞 <strong>संपर्क करें:</strong> <br />
        <FaPhoneAlt className="text-success" /> <a href="tel:9977454799" className="text-dark">9977454799</a> / <a href="tel:9713671554" className="text-dark">9713671554</a>
      </p>
      
      <p>💬 <strong>व्हाट्सएप से संपर्क करें:</strong> <br />
        <FaWhatsapp className="text-success" /> <a href="https://wa.me/9713671554" className="text-dark">9713671554</a>
      </p>
      
      <p>📧 <strong>ईमेल:</strong> <br />
        <FaEnvelope className="text-primary" /> <a href="mailto:Patwa.bartan.bhandar@gmail.com" className="text-dark">Patwa.bartan.bhandar@gmail.com</a>
      </p>
      
      <p>🔄 <strong>पुराने बने बर्तन (पीतल, जर्मन, तांबा, कांसा) वापस बदले जाते हैं और काटे जाते हैं।</strong> <br />
        अधिक जानकारी के लिए संपर्क करें।
      </p>
      
      <p>🌐 <strong>हमसे जुड़ें:</strong> <br />
        <FaFacebook className="text-primary" /> <a href="https://www.facebook.com/share/1Br69UNZmq/" className="text-dark"> Facebook पर देखें</a>

      
 
      </p>
    <p>
       
    <FaInstagram className="text-danger"  /> <a href="https://www.instagram.com/patwa_bartna_harrai?igsh=MWZjeng4aThwZGJpbA%3D%3D" className="text-dark" target="_blank" rel="noopener noreferrer">  Instagram पर देखें 
  </a>
    </p>
    </div>
  );
};

export default Note;
