import React, { createContext, useState, useEffect } from "react";
import { ref, get } from "firebase/database";
import { realtimeDB } from "../FirebaseConfig";

const ProductSearchContext = createContext();

export const ProductSearchProvider = ({ children }) => {
const [products, setProducts] = useState({});
const [searchResults, setSearchResults] = useState([]);
const [loading, setLoading] = useState(true); // Loading state

useEffect(() => {
const requiredCategories = [
"Pital", "copper", "aluminium", "cookware", "electronic",
"gift", "Kanch_Chhini", "kansa", "lakdhi", "nonstick",
"plastic", "pooja_saman", "steel"
];

const fetchProducts = async () => {
try {
let productData = {};

for (const category of requiredCategories) {
const categoryRef = ref(realtimeDB, category);
const snapshot = await get(categoryRef);

if (snapshot.exists()) {
const data = snapshot.val(); // Get the data
console.log(`Data for category ${category}:`, data); // Console log for debugging

// Ensure data is an object and convert it to an array
productData[category] = Object.values(data).map(product => ({
id: product.id || "", // Ensure 'id' is present
title: product.Title || "", // Assuming 'title' is a property in your products
metal: product.Metal || "", // Assuming 'metal' is a property
brand: product.Brand || "" // Assuming 'brand' is a property
}));
} else {
console.warn(`No data found for category: ${category}`);
}
}

console.log("Fetched Product Data:", productData); // Debugging Log
setProducts(productData); // Set products in state
} catch (error) {
console.error("Error fetching products:", error);
} finally {
setLoading(false); // Set loading to false after fetching
}
};

fetchProducts();
}, []);

const searchProducts = (query) => {
const normalizedQuery = query.toLowerCase();

// Filter products based on title, metal or brand containing the query
const results = Object.values(products).flat().filter(product => 
product.title.toLowerCase().includes(normalizedQuery) ||
(product.metal && product.metal.toLowerCase().includes(normalizedQuery)) ||
(product.brand && product.brand.toLowerCase().includes(normalizedQuery))
);

setSearchResults(results);
};

return (
<ProductSearchContext.Provider value={{
products,
searchResults,
loading,
searchProducts
}}>
{children}
</ProductSearchContext.Provider>
);
};

export default ProductSearchContext;
