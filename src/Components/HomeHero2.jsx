import React, { useEffect, useState, useRef } from "react";
import { Container, Button } from "react-bootstrap";
import { ref, onValue } from "firebase/database";
import { realtimeDB } from "../FirebaseConfig";
import { Link } from "react-router-dom";
import useCart from "../context/useCart";
import { toast } from "react-toastify";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import "react-toastify/dist/ReactToastify.css";
import "../Css-page/HomeHero2.css";
import useLanguage from "../context/useLanguage";

const HomeHero2 = () => {
  const [products, setProducts] = useState([]);
  const { addToCart } = useCart();
  const scrollContainerRef = useRef(null);
  const { t } = useLanguage();

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

  const handleScroll = (direction) => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: direction === "left" ? -300 : 300,
        behavior: "smooth",
      });
    }
  };

  const handleAddToCart = (product) => {
    addToCart({ ...product, quantity: 1 });
    toast.success(`${product.Title} ${t("home_add_to_cart")}!`, {
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
    <Container className="home-hero2 my-5">
      <h2 className="section-title text-center">{t("home_loot_sale")}</h2>

      <div className="carousel-container">
        <button className="carousel-btn left-btn" onClick={() => handleScroll("left")}>
          <FaChevronLeft />
        </button>

        <div className="scroll-container" ref={scrollContainerRef}>
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
                <p className="product-price">
                  <span className="old-price">₹{product.Price}</span>
                  <span className="new-price">
                    ₹{(product.Price * (1 - parseFloat(product.discount) / 100)).toFixed(2)}
                  </span>
                  <span className="discount-badge ms-2">{t("home_discount")}: {product.discount}%</span>
                </p>
                <Button className="add-to-cart-btn" onClick={() => handleAddToCart(product)}>
                  {t("home_add_to_cart")}
                </Button>
              </div>
            ))
          ) : (
            <p className="text-center">{t("home_products_loading")}</p>
          )}
        </div>

        <button className="carousel-btn right-btn" onClick={() => handleScroll("right")}>
          <FaChevronRight />
        </button>
      </div>
    </Container>
  );
};

export default HomeHero2;
