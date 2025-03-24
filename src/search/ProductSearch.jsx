import React, { useState } from 'react';
import useProductSearch from '../context/useProductSearch'; // Ensure your import path is correct
import { useNavigate } from 'react-router-dom';
// import { db } from '../FirebaseConfig';

const ProductSearch = () => {
  const [query, setQuery] = useState('');
  const { searchProducts } = useProductSearch();
  const navigate = useNavigate();
//   Product
  const handleSearch = (e) => {
    e.preventDefault();
    searchProducts(query); // Trigger search
    navigate(`/search/${query}`); // Navigate to the search results page
  };

  return (
    <form onSubmit={handleSearch}>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search for products..."
      />
      <button type="submit">Search</button>
    </form>
  );
};

export default ProductSearch;
