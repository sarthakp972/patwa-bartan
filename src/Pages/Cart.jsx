import React from "react";
import { Card, Button } from "react-bootstrap";
import { FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";
import useCart from "../context/useCart";
import useLanguage from "../context/useLanguage";
import "../Css-page/Cart.css";
import RunningNav from "../Components/RunningNav";

const Cart = () => {
  const { cart, removeFromCart, updateQuantity, getCartCount } = useCart();
  const { t } = useLanguage();

  const calculateTotal = () => {
    return cart.reduce((acc, product) => {
      const discountedPrice = product.discount
        ? product.Price * (1 - product.discount / 100)
        : product.Price;
      return acc + discountedPrice * product.quantity;
    }, 0).toFixed(2);
  };

  const formatCartMessage = () => {
    const cartItems = cart.map(product => {
      const discountedPrice = product.discount
        ? product.Price * (1 - product.discount / 100)
        : product.Price;
      return `${product.Title} - Quantity: ${product.quantity}, Price: ₹${(discountedPrice * product.quantity).toFixed(2)}`;
    });
    const totalAmount = calculateTotal();
    const message = `Hello Admin,\n\nHere is my order:\n\n${cartItems.join("\n")}\n\nTotal Amount: ₹${totalAmount}\n\nThank you!`;
    return encodeURIComponent(message);
  };

  const truncateDescription = (description) => {
    if (!description) return "No description available";
    return description.length > 70 ? description.substring(0, 70) + "…" : description;
  };

  const handleCheckout = () => {
    const message = formatCartMessage();
    const phoneNumber = "9713671554";
    const url = `https://wa.me/${phoneNumber}?text=${message}`;
    window.open(url, "_blank");
  };

  return (
    <div className="container mt-4 cart-page">
      <RunningNav textArray={[t("cart_running_text")]} />
      <h2 className="text-center mb-4">
        {t("cart_title")} ({getCartCount()} items)
      </h2>

      {cart.length > 0 ? (
        <div className="row">
          {cart.map((product, index) => (
            <div key={index} className="col-lg-6 col-md-12 mb-4">
              <Card className="cart-card">
                <div className="cart-card-body">
                  <Link to={`/product/${product.id}`} className="cart-product-link" style={{ textDecoration: "none", color: "inherit" }}>
                    <Card.Img variant="top" src={product.images?.main || "https://via.placeholder.com/150"} alt={product.Title} className="cart-product-image" />
                    <div className="cart-product-details">
                      <Card.Title className="cart-product-title">{product.Title}</Card.Title>
                      <Card.Text className="cart-product-description">
                        {truncateDescription(product.description)}
                      </Card.Text>
                      <div className="price-section">
                        {product.discount ? (
                          <>
                            <span className="discount-price">₹{(product.Price * (1 - product.discount / 100)).toFixed(2)}</span>
                            <span className="original-price">₹{product.Price}</span>
                            <span className="discount-label">-{product.discount}% OFF</span>
                          </>
                        ) : (
                          <span className="price">₹{product.Price}</span>
                        )}
                      </div>
                    </div>
                  </Link>

                  <div className="cart-quantity">
                    <Button variant="outline-secondary" onClick={() => updateQuantity(product.id, product.quantity - 1)}>-</Button>
                    <span className="cart-quantity-value">{product.quantity}</span>
                    <Button variant="outline-secondary" onClick={() => updateQuantity(product.id, product.quantity + 1)}>+</Button>
                  </div>

                  <Button variant="danger" className="remove-button" onClick={() => removeFromCart(product.id)}>
                    <FaTrash /> {t("cart_remove")}
                  </Button>
                </div>
              </Card>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center">{t("cart_empty")}</p>
      )}

      {cart.length > 0 && (
        <div className="total-section text-right mt-3">
          <h4>{t("cart_total")} ₹{calculateTotal()}</h4>
          <Button variant="success" className="checkout-button" onClick={handleCheckout}>
            {t("cart_checkout")}
          </Button>
        </div>
      )}

      <hr />
      <div className="info-section mt-4 text-center">
        <p>{t("cart_info")}</p>
      </div>
      <hr />

      <div className="exchange-policy-section mt-4 text-center">
        <h3 className="text-primary">{t("cart_exchange_title")}</h3>
        <p>{t("cart_exchange_body")}</p>
        <h4>{t("cart_accepted_metals")}</h4>
        <ul className="list-unstyled">
          <li style={{ color: "goldenrod" }}>{t("exchange_metal1")}</li>
          <li style={{ color: "brown" }}>{t("exchange_metal2")}</li>
          <li style={{ color: "darkolivegreen" }}>{t("exchange_metal3")}</li>
          <li style={{ color: "silver" }}>{t("exchange_metal4")}</li>
        </ul>
        <p>{t("cart_exchange_cta")}</p>
      </div>
      <hr />
    </div>
  );
};

export default Cart;
