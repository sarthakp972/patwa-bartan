import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'; // To access the URL params
import useProductSearch from '../context/useProductSearch'; // Adjust path as needed
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS

function SearchResults() {
  const { query } = useParams(); // Get the query from the URL
  const { products, loading } = useProductSearch(); // Access products from context
  const [results, setResults] = useState([]); // State for search results

  useEffect(() => {
    const normalizedQuery = query.toLowerCase();
    console.log("Products fetched from context:", products);

    // Split the query into individual words
    const queryWords = normalizedQuery.split(" ");

    // Initialize result array
    let filteredResults = [];

    // Loop through each category in the products
    Object.keys(products).forEach(category => {
      const categoryProducts = products[category] || []; // Get products from the matched category

      // Filter based on title and metal matches
      categoryProducts.forEach(product => {
        const productTitle = product.title.toLowerCase();
        const productMetal = product.metal ? product.metal.toLowerCase() : '';

        // Check if any word from the query is found in the product's title or metal
        const isTitleMatch = queryWords.some(word => productTitle.includes(word));
        const isMetalMatch = queryWords.some(word => productMetal.includes(word));

        // If either the title or metal matches, add to results
        if (isTitleMatch || isMetalMatch) {
          filteredResults.push(product);
        }
      });
    });

    // Set results
    setResults(filteredResults); // Update results state
  }, [query, products]); // Rerun the effect if query or products change

  if (loading) {
    return <div className="text-center mt-5"><span className="spinner-border text-primary"></span> Loading...</div>; // Show loading spinner
  }

  return (
    <div className="container mt-4">
      <h1 className="text-center text-primary">Search Results for: "{query}"</h1>
      {results.length > 0 ? (
        <div className="row">
          {results.map(product => (
            <div key={product.id} className="col-md-4 col-sm-6 mb-4">
              <div className="card shadow-sm">
                <div className="card-body">
                  <h5 className="card-title">{product.title}</h5>
                  <p className="card-text"><strong>Material:</strong> {product.metal}</p>
                  <p className="card-text"><strong>Brand:</strong> {product.brand}</p>
                  <a href={`/product/${product.id}`} className="btn btn-primary">View Details</a>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-muted mt-4">No results found. Please try a different search query.</p>
      )}
    </div>
  );
}

export default SearchResults;
