import React, { useEffect, useState } from "react";
import { Container, Button } from "react-bootstrap";
import { ref, onValue } from "firebase/database";
import { realtimeDB } from "../FirebaseConfig";
import { Link } from "react-router-dom";
import useCart from "../context/useCart";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../Css-page/HomeHero2.css";

const HomeHero2 = () => {
  const [products, setProducts] = useState([]);
  const { addToCart } = useCart();

  useEffect(() => {
    const homeDiscountRef = ref(realtimeDB, "home_discount_product");

    const unsubscribe = onValue(homeDiscountRef, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        const productList = Object.keys(data).map((key) => ({ id: key, ...data[key] }));
        setProducts(productList);
      }
    });

    return () => unsubscribe();
  }, []);

  // 🛒 Function to handle Add to Cart + Toast Notification
  const handleAddToCart = (product) => {
    addToCart({ ...product, quantity: 1 });

    // ✅ Show toast notification
    toast.success(`${product.Title} को कार्ट में जोड़ा गया!`, {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: "colored",
    });
  };

  return (
    <Container className="loot-sale-container my-5">
      <h2 className="section-title text-center">💥 लूट सेल - भारी छूट पर उत्पाद! 💥</h2>
      <div className="loot-sale-wrapper">
        {products.length > 0 ? (
          products.map((product) => (
            <div key={product.id} className="loot-sale-card">
              <Link to={`/product/${product.id}`} state={{ product }}>
                <img
                  src={product.images?.main || "https://via.placeholder.com/400"}
                  alt={product.Title}
                  className="product-image"
                />
              </Link>
              <h4 className="product-name mt-2">{product.Title}</h4>
              <p className="product-description">{product.description}</p>
              <p className="product-price">
                <span className="old-price">₹{product.Price}</span>
                <span className="new-price">
                  ₹{(product.Price * (1 - parseFloat(product.discount) / 100)).toFixed(2)}
                </span>
                <span className="discount-badge ms-2"> छूट: {product.discount}%</span>
              </p>
              <Button className="add-to-cart-btn" onClick={() => handleAddToCart(product)}>
                कार्ट में जोड़ें
              </Button>
            </div>
          ))
        ) : (
          <p className="text-center">⏳ उत्पाद लोड हो रहे हैं...</p>
        )}
      </div>
    </Container>
  );
};

export default HomeHero2;
