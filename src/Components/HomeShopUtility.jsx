import React, { useEffect, useState } from "react";
import { ref, get } from "firebase/database";
import { useNavigate } from "react-router-dom";
import { realtimeDB } from "../FirebaseConfig";
import "bootstrap/dist/css/bootstrap.min.css";
import "../Css-page/HomeShopUtility.css"; // Ensure CSS file exists

function HomeShopUtility() {
  const navigate = useNavigate();
  const [utilities, setUtilities] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUtilities = async () => {
      try {
        const utilitiesRef = ref(realtimeDB, "utilities"); // Reference to database path
        const snapshot = await get(utilitiesRef);

        if (snapshot.exists()) {
          setUtilities(snapshot.val());
        } else {
          console.log("No utility data found.");
        }
      } catch (err) {
        setError("Error fetching utility data.");
        console.error("Error fetching utilities:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUtilities();
  }, []);

  return (
    <section className="py-5 bg-light">
      <div className="text-center mb-4">
        <p className="text-danger fw-semibold">आपकी सभी जरूरतों के लिए उत्कृष्ट रूप से निर्मित!!</p>
        <h2 className="fw-bold text-dark">उपयोगिता के अनुसार खरीदारी करें</h2>
      </div>

      <div className="container">
        {loading ? (
          <p className="text-center">Loading...</p>
        ) : error ? (
          <p className="text-center text-danger">{error}</p>
        ) : (
          <div className="row g-4 justify-content-center">
            {Object.keys(utilities).map((key) => (
              <div
                key={key}
                className="col-6 col-md-4 col-lg-2 text-center"
                onClick={() => navigate(`/category/${utilities[key].categoryKey}`)}
                style={{ cursor: "pointer" }}
              >
                <div className="utility-item">
                  <img
                    src={utilities[key].image}
                    alt={utilities[key].name}
                    className="img-fluid rounded-circle border border-secondary utility-img"
                  />
                  <p className="mt-2 text-dark fw-medium small">{utilities[key].name}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default HomeShopUtility;
