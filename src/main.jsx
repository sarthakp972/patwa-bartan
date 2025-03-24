import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { ProductProvider } from './context/ProductContext'; // ✅ Import ProductProvider
import { CartProvider } from "./context/CartContext";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { ProductSearchProvider } from './context/ProductSearchContext.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ProductSearchProvider>
   <ProductProvider>
    <CartProvider>
      <App />
    </CartProvider>
  </ProductProvider>
  </ProductSearchProvider>
  </StrictMode>
);
