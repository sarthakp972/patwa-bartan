




import React from "react";
import { Link, useParams } from "react-router-dom";
import useProducts from "../context/useProducts";
import useCart from "../context/useCart";
import { Card, Button, Row, Col, Container, Spinner } from "react-bootstrap";
import { FaShoppingCart } from "react-icons/fa";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../Css-page/CategoryPage.css";

const categoryNames = {
  Pital: "पीतल",
  aluminium: "एल्यूमिनियम",
  cookware: "कुकवेयर",
  copper: "तांबा",
  electronic: "इलेक्ट्रॉनिक",
  gift: "उपहार",
  kanch_chhini: "कांच और चीनी मिट्टी",
  kansa: "कांसा",
  lakdhi: "लकड़ी का सामान",
  steel: "स्टील",
  plastic: "प्लास्टिक",
  pooja_saman: "पूजा का सामान",
  nonstick: "नॉन-स्टिक",
};

const CategoryPage = () => {
  const { selectedCategory, products } = useProducts();
  const { addToCart } = useCart();
  const { category } = useParams();

  const categoryKey = category || selectedCategory;
  const categoryProducts = products[categoryKey] || [];
  const categoryTitle = categoryNames[categoryKey] || categoryKey;

  // Function to handle Add to Cart with Toast Notification
  const handleAddToCart = (product) => {
    addToCart({ ...product, quantity: 1 });
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
    <Container className="mt-4 category-page">
      <h6 className="text-center mb-4 py-2 px-3 bg-dark text-warning rounded shadow-lg">
        {categoryTitle} के प्रोडक्ट्स
      </h6>
      <Row>
        {categoryProducts.length > 0 ? (
          categoryProducts.map((product, index) => (
            <Col key={index} lg={3} md={4} sm={6} xs={12} className="mb-4">
              <Card className="product-card">
                {product.discount > 0 && (
                  <div className="sale-badge">-{product.discount}%</div>
                )}
                <Link
                  to={`/product/${product.id}`}
                  className="text-decoration-none text-dark"
                >
                  <Card.Img
                    src={product.images?.main || "https://via.placeholder.com/150"}
                    alt={product.Title}
                    className="product-image"
                  />
                </Link>
                <Card.Body className="product-details">
                  <Link
                    to={`/product/${product.id}`}
                    className="text-decoration-none text-dark"
                  >
                    <Card.Title className="product-title">
                      {product.Title}
                    </Card.Title>
                  </Link>
                  <div className="price-section">
                    {product.discount ? (
                      <>
                        <span className="discount-price">
                          ₹{(product.Price * (1 - product.discount / 100)).toFixed(2)}
                        </span>
                        <span className="original-price">₹{product.Price}</span>
                      </>
                    ) : (
                      <span className="price">₹{product.Price}</span>
                    )}
                  </div>
                  <Button
                    variant="primary"
                    className="add-cart-button"
                    onClick={() => handleAddToCart(product)}
                  >
                    <FaShoppingCart /> Add to Cart
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))
        ) : (
          <div className="text-center">
            <Spinner animation="border" variant="primary" />
            <p>{categoryTitle} में उत्पाद विवरण लोड हो रहा है...।</p>
          </div>
        )}
      </Row>
    </Container>
  );
};

export default CategoryPage;
