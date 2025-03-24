import React, { useState } from "react";
import { ref, set } from "firebase/database";
import { realtimeDB } from "../FirebaseConfig";

const AddseasonalBanner2 = () => {
  const [imageUrl, setImageUrl] = useState("");

  const saveBannerImage = async () => {
    if (!imageUrl) {
      alert("Please enter an image URL");
      return;
    }

    try {
      await set(ref(realtimeDB, "seasonalBanner2"), { imageUrl });
      alert("Seasonal banner updated successfully!");
      setImageUrl(""); // Clear input after saving
    } catch (error) {
      console.error("Error saving banner image:", error);
    }
  };

  return (
    <div>
      <h2>Upload Seasonal Banner</h2>
      <input
        type="text"
        placeholder="Enter Image URL"
        value={imageUrl}
        onChange={(e) => setImageUrl(e.target.value)}
      />
      <button onClick={saveBannerImage}>Save Banner</button>
    </div>
  );
};

export default AddseasonalBanner2;
// https://res.cloudinary.com/dl5htbjf8/image/upload/v1742655137/Colourful_Navratri_Festival_Garba_Dance_Video_20250322_201917_0000_fpcqz7.png