import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import useProducts from "../context/useProducts";
import useCart from "../context/useCart";
import { Card, Button, Spinner, Container, Row, Col } from "react-bootstrap";
import { FaShoppingCart, FaPlus } from "react-icons/fa";
import "../Css-page/AllProducts.css";

const ITEMS_PER_LOAD = 12;

const AllProducts = () => {
  const { products } = useProducts();
  const { addToCart } = useCart();
  const [allProducts, setAllProducts] = useState([]);
  const [visibleProducts, setVisibleProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(ITEMS_PER_LOAD);

  useEffect(() => {
    const allProductList = Object.values(products || {}).flat();
    setAllProducts(allProductList);
    setVisibleProducts(allProductList.slice(0, ITEMS_PER_LOAD));
  }, [products]);

  useEffect(() => {
    setVisibleProducts([...allProducts.slice(0, currentIndex)]);
  }, [allProducts, currentIndex]);

  const loadMoreProducts = () => {
    if (loading) return;

    setLoading(true);
    setTimeout(() => {
      setVisibleProducts((prev) => [
        ...prev,
        ...allProducts.slice(currentIndex, currentIndex + ITEMS_PER_LOAD),
      ]);
      setCurrentIndex((prev) => prev + ITEMS_PER_LOAD);
      setLoading(false);
    }, 1000);
  };

  return (
    <Container className="mt-4 all-products-page">
      <h2 className="text-center mb-4">सभी उत्पाद</h2>
      <Row>
        {visibleProducts.length > 0 ? (
          visibleProducts.map((product, index) => (
            <Col key={index} lg={6} md={6} sm={12} className="mb-4">
              <Card className="product-card d-flex flex-row align-items-start">
             {/* <Link to={`/product/${product.id}`} className="text-decoration-none text-dark d-flex w-100"> */}
             <div className="text-decoration-none text-dark d-flex w-100">
             <Link to={`/product/${product.id}`}>
                  <div className="product-image-container">
                    <Card.Img
                      src={product.images?.main || "https://via.placeholder.com/150"}
                      alt={product.Title}
                      className="product-image"
                    />
                    {product.discount && (
                      <div className="discount-badge">
                        -{product.discount}% OFF
                      </div>
                    )}
                  </div>
                  </Link>
                  <Card.Body className="product-info">

                  <Link to={`/product/${product.id}`} className="sarthak-all">

                    <Card.Title className="product-title">{product.Title}</Card.Title>
                    <Card.Text className="product-description">
                      {product.description
                        ? product.description.length > 50
                          ? `${product.description.substring(0, 50)}...`
                          : product.description
                        : "No description available"}
                    </Card.Text>
                    <div className="price-section">
                      {product.discount ? (
                        <>
                          <span className="discount-price">
                            ₹{(product.Price * (1 - product.discount / 100)).toFixed(2)}
                          </span>
                          <span className="original-price">₹{product.Price}</span>
                          {/* <span className="discount-label">-{product.discount}% OFF</span> */}
                        </>
                      ) : (
                        <span className="price">₹{product.Price}</span>
                      )}
                    </div>
                    </Link>
                    <Button
                      variant="primary"
                      className="add-cart-button"
                      onClick={() => addToCart({ ...product, quantity: 1 })}
                    >
                      <FaShoppingCart /> Add to Cart
                    </Button>
                  </Card.Body>
                  </div>
              </Card>
            </Col>
          ))
        ) : (
          <p className="text-center">कोई उत्पाद उपलब्ध नहीं है।</p>
        )}
      </Row>
      {currentIndex < allProducts.length && (
        <div className="text-center my-4">
          <Button className="load-more-btn" onClick={loadMoreProducts} disabled={loading}>
            {loading ? <Spinner animation="border" size="sm" /> : <><FaPlus /> Load More</>}
          </Button>
        </div>
      )}
    </Container>
  );
};

export default AllProducts;
