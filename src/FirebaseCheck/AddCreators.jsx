import React from "react";
import { ref, set } from "firebase/database";
import { realtimeDB } from "../FirebaseConfig";

const addCreators = async () => {
  const creatorsData = {
    kriti: {
      name: "कृति गोयल (COO)",
      img: "/images/kriti.jpg",
      desc: "फैशन डिजाइन ग्रेजुएट, जो कंपनी के डिजाइन और फ्रंट-एंड संचालन को मैनेज करती हैं।",
      insta: "https://instagram.com/",
      fb: "https://facebook.com/",
    },
    aditya: {
      name: "आदित्य अग्रवाल (CEO)",
      img: "/images/aditya.jpg",
      desc: "आर्थिक सम्मान में स्नातक, जो ब्रांड मार्केटिंग और बिजनेस ग्रोथ में विशेषज्ञ हैं।",
      insta: "https://instagram.com/",
      fb: "https://facebook.com/",
    },
    gaurav: {
      name: "गौरव गर्ग (CPO)",
      img: "/images/gaurav.jpg",
      desc: "सिविल इंजीनियरिंग स्नातक, जो आर्टिसन्स के साथ समन्वय और उत्पादन संचालन संभालते हैं।",
      insta: "https://instagram.com/",
      fb: "https://facebook.com/",
    },
    avinash: {
      name: "अविनाश वर्मा (CTO)",
      img: "/images/avinash.jpg",
      desc: "प्रौद्योगिकी विशेषज्ञ, जो डिजिटल इनोवेशन और वेबसाइट के विकास की देखरेख करते हैं।",
      insta: "https://instagram.com/",
      fb: "https://facebook.com/",
    },
    saurabh: {
      name: "सौरभ शर्मा (CFO)",
      img: "/images/saurabh.jpg",
      desc: "वित्तीय विश्लेषक, जो वित्तीय योजना और बजट का प्रबंधन करते हैं।",
      insta: "https://instagram.com/",
      fb: "https://facebook.com/",
    },
  };

  try {
    await set(ref(realtimeDB, "creators"), creatorsData);
    console.log("Creators added successfully!");
  } catch (error) {
    console.error("Error adding creators:", error);
  }
};

const AddCreators = () => {
  return (
    <div>
      <h2>Add Creators Data to Firebase</h2>
      <button onClick={addCreators}>Add Creators</button>
    </div>
  );
};

export default AddCreators;
