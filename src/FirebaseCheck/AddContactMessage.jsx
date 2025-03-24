import { ref, push } from "firebase/database";
import { realtimeDB } from "../FirebaseConfig";

const AddContactMessage = async () => {
  const contactData = {
    name: "राम कुमार",
    email: "ramkumar@example.com",
    message: "नमस्ते! मुझे आपके स्टोर के बारे में अधिक जानकारी चाहिए।",
    timestamp: new Date().toISOString(),
  };

  try {
    await push(ref(realtimeDB, "contact_messages"), contactData);
    console.log("Contact message added successfully!");
    alert("✅ संदेश सफलतापूर्वक सहेजा गया!");
  } catch (error) {
    console.error("Error adding contact message:", error);
    alert("❌ कुछ गलत हुआ, कृपया पुनः प्रयास करें।");
  }
};

// Export the function so it can be used in other components
export default AddContactMessage;
