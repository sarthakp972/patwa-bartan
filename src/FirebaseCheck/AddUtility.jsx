import React from "react";
import { ref, set } from "firebase/database";
import { realtimeDB } from "../FirebaseConfig";

const addUtilities = async () => {
  const utilityData = {
    cookware: {
      name: "Cookware & Kitchenware",
      image: "https://ptal.in/cdn/shop/files/DSC_2769-3-2-2.jpg?v=1707588974&width=1080",
      description: "उत्कृष्ट गुणवत्ता वाले बर्तन और किचन उपयोगी सामान।",
      categoryKey: "cookware",
    },
    copper: {
      name: "Drinkware",
      image: "https://ptal.in/cdn/shop/files/DSC_2771-3-2-2.jpg?v=1707588719&width=1080",
      description: "तांबे के गिलास, जग और स्वास्थ्यवर्धक ड्रिंकवेयर।",
      categoryKey: "copper",
    },
    steel: {
      name: "Tableware & Dinnerware",
      image: "https://ptal.in/cdn/shop/files/DSC_1382-2.jpg?v=1707484591&width=1080",
      description: "स्टील और कांसे के टेबलवेयर और डिनर सेट।",
      categoryKey: "steel",
    },
    gift: {
      name: "Gifting & Sets",
      image: "https://ptal.in/cdn/shop/files/SET_OF_TWO_COPPER_DIYAS.jpg?v=1707654444&width=1080",
      description: "विशेष उपहार सेट और पूजा संबंधित वस्तुएं।",
      categoryKey: "gift",
    },
  };

  try {
    await set(ref(realtimeDB, "utilities"), utilityData);
    console.log("Utilities added successfully!");
  } catch (error) {
    console.error("Error adding utilities:", error);
  }
};

const AddUtility = () => {
  return (
    <div>
      <h2>Add Utility Categories to Firebase</h2>
      <button onClick={addUtilities}>Add Utilities</button>
    </div>
  );
};

export default AddUtility;
