import React from "react";
import { ref, set } from "firebase/database";
import { realtimeDB } from "../FirebaseConfig";

const addMetals = async () => {
  const metalsData = {
    steel: {
      name: "स्टील के बर्तन",
      image: "https://ptal.in/cdn/shop/files/DSC_2771-4-2-2.jpg?v=1707729661&width=540",
      description: "मजबूत और टिकाऊ स्टील के बर्तन, रोजमर्रा के उपयोग के लिए आदर्श।",
      category: "steel",
    },
    copper: {
      name: "तांबे के बर्तन",
      image: "https://ptal.in/cdn/shop/files/KANSA_THAALI_SET_11-3-2-2.jpg?v=1707730028&width=540",
      description: "स्वास्थ्यवर्धक तांबे के बर्तन, आयुर्वेदिक गुणों से भरपूर।",
      category: "copper",
    },
    kansa: {
      name: "कांसे के बर्तन",
      image: "https://ptal.in/cdn/shop/files/BRASS_KADHAI_SET_ROUND_3L_FLAT_3L_ROUND_1L_-3-2-2.jpg?v=1707729273&width=540",
      description: "शुद्ध कांसे के बर्तन, पारंपरिक और प्राचीन महत्व के साथ।",
      category: "kansa",
    },
  };

  try {
    await set(ref(realtimeDB, "metals"), metalsData);
    console.log("Metals added successfully!");
  } catch (error) {
    console.error("Error adding metals:", error);
  }
};

const AddMetal = () => {
  return (
    <div>
      <h2>Add Metals to Firebase</h2>
      <button onClick={addMetals}>Add Metals</button>
    </div>
  );
};

export default AddMetal;
