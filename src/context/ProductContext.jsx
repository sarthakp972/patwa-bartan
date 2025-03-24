import React, { createContext, useState, useEffect } from "react";
import { ref, get } from "firebase/database";
import { realtimeDB } from "../FirebaseConfig";

const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState({});
  const [selectedCategory, setSelectedCategory] = useState(""); // Default category

  useEffect(() => {
    const requiredCategories = [ // ✅ Moved inside useEffect
      "Pital", "copper", "aluminium", "cookware", "electronic",
      "gift", "kanch_chhini", "kansa", "lakdhi", "nonstick",
      "plastic", "pooja_saman", "steel"
    ];

    const fetchSelectedProducts = async () => {
      try {
        let productData = {};

        for (const category of requiredCategories) {
          const categoryRef = ref(realtimeDB, category);
          const snapshot = await get(categoryRef);

          if (snapshot.exists()) {
            productData[category] = Object.values(snapshot.val() || {});
          } else {
            console.warn(`No data found for category: ${category}`);
          }
        }

        console.log("Fetched Categories:", Object.keys(productData)); // Debugging Log
        setProducts(productData);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchSelectedProducts();
  }, []); // ✅ No need to add requiredCategories in dependencies

  return (
    <ProductContext.Provider value={{ products, selectedCategory, setSelectedCategory }}>
      {children}
    </ProductContext.Provider>
  );
};

export default ProductContext;
