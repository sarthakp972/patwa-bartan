import React, { useState, useEffect } from "react";
import { Card, Button, Container, Row, Col, Spinner } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { ref, get } from "firebase/database";
import { realtimeDB } from "../FirebaseConfig";
import useCart from "../context/useCart";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../Css-page/HomeViewAll.css";

const HomeViewAll = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { addToCart } = useCart();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const dbRef = ref(realtimeDB, "home_vishesh_product");
                const snapshot = await get(dbRef);

                if (snapshot.exists()) {
                    const data = snapshot.val();
                    const productsArray = Object.entries(data).map(([id, product]) => ({
                        id,
                        ...product,
                    }));
                    setProducts(productsArray);
                } else {
                    console.log("No data available");
                }
            } catch (err) {
                console.error("Error fetching data:", err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    const handleCardClick = (event, product) => {
        if (!event.target.closest(".add-cart-button")) {
            navigate(`/product/${product.id}`, { state: { product } });
        }
    };

    // 🛒 Function to handle Add to Cart + Toast Notification
    const handleAddToCart = (e, product) => {
        e.stopPropagation();
        addToCart({ 
            ...product, 
            quantity: 1, 
            description: product.description && product.description.length > 50 
                ? `${product.description.substring(0, 50)}...` 
                : product.description 
        });

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
        <Container className="home-view-all">
            <h2 className="section-title">विशेष उत्पाद</h2>
            {loading && (
                <div className="text-center my-5">
                    <Spinner animation="border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </Spinner>
                </div>
            )}
            {error && <p style={{ color: "red" }}>Error: {error}</p>}
            
            {/* Responsive Grid System */}
            <Row className="justify-content-center">
                {products.map((product) => (
                    <Col key={product.id} xs={6} sm={4} md={3} lg={3} className="d-flex justify-content-center product-row">
                        <Card className="product-card" onClick={(e) => handleCardClick(e, product)}>
                            <div className="product-content">
                                <div className="product-image-container">
                                    {product.discount && <div className="sale-badge">छूट: {product.discount}%</div>}
                                    <img src={product.images?.main || "default-image.jpg"} alt={product.Title} className="product-img" />
                                </div>
                                <div className="product-details">
                                    <Card.Title className="product-title">{product.Title}</Card.Title>
                                    <Card.Text className="product-description">
                                        {product.description && product.description.length > 50
                                            ? `${product.description.substring(0, 50)}...`
                                            : product.description}
                                    </Card.Text>
                                    <div className="price-section">
                                        {product.discount ? (
                                            <>
                                                <span className="discount-price">₹{(product.Price * (1 - product.discount / 100)).toFixed(2)}</span>
                                                <span className="original-price">₹{product.Price}</span>
                                            </>
                                        ) : (
                                            <span className="discount-price">₹{product.Price}</span>
                                        )}
                                    </div>
                                    <Button
                                        variant="primary"
                                        className="add-cart-button"
                                        onClick={(e) => handleAddToCart(e, product)}
                                    >
                                        कार्ट में जोड़ें
                                    </Button>
                                </div>
                            </div>
                        </Card>
                    </Col>
                ))}
            </Row>

            <div className="view-all-container text-center">
                <Link to="/all-products" className="view-all-link">
                    सभी उत्पाद देखें (click)
                </Link>
            </div>
        </Container>
    );
};

export default HomeViewAll;
