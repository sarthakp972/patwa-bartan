import React from "react";
import { Card, Button } from "react-bootstrap";
import { FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";
import useCart from "../context/useCart";
import "../Css-page/Cart.css";
import RunningNav from "../Components/RunningNav";

const Cart = () => {
  const { cart, removeFromCart, updateQuantity, getCartCount } = useCart();

  // Function to calculate total price
  const calculateTotal = () => {
    return cart.reduce((acc, product) => {
      const discountedPrice = product.discount
        ? product.Price * (1 - product.discount / 100)
        : product.Price;
      return acc + discountedPrice * product.quantity;
    }, 0).toFixed(2); // Returns total amount with two decimal places
  };

  // Function to format the cart details for WhatsApp
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

  // Function to truncate descriptions
  const truncateDescription = (description) => {
    if (!description) return "No description available";
    return description.length > 70 ? description.substring(0, 70) + "…" : description;
  };

  const handleCheckout = () => {
    const message = formatCartMessage();
    const phoneNumber = "9713671554"; // Admin's WhatsApp number
    const url = `https://wa.me/${phoneNumber}?text=${message}`;
    window.open(url, "_blank");
  };

  return (
    <div className="container mt-4 cart-page">
      <RunningNav textArray={["पुराने पीतल, जर्मन, तांबा, और कांसे के बर्तन उचित दाम पर बदले और काटे जाते हैं। अभी संपर्क करें!"]} />
      <h2 className="text-center mb-4">
        🛒 Shopping Cart ({getCartCount()} items)
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
                    <FaTrash /> Remove
                  </Button>
                </div>
              </Card>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center">Your cart is empty.</p>
      )}

      {cart.length > 0 && (
        <div className="total-section text-right mt-3">
          <h4>Total: ₹{calculateTotal()}</h4>
          <Button variant="success" className="checkout-button" onClick={handleCheckout}>
            व्हाट्सएप पर खरीदें
          </Button>
        </div>
      )}
<hr/>
      {/* New Information Section for WhatsApp Booking */}
      <div className="info-section mt-4 text-center">
        <p>आप हमारे व्हाट्सएप पर बर्तन बुक कर सकते हैं और उचित दाम में दुकान पर आकर ले सकते हैं। यदि आप सीधे दुकान से खरीदारी करते हैं, तो आपको बेहतर कीमत मिल सकती है। साथ ही, आपको सीजनल डिस्काउंट का लाभ भी मिल सकता है। यहाँ आपको वो डिस्काउंट मिलेगा, जो कहीं और नहीं मिल सकता, चाहे वह कोई अन्य बर्तन ई-कॉमर्स साइट हो या फिर कोई दूसरी दुकान। कृपया अधिक जानकारी के लिए संपर्क करें।</p>
      </div>
      <hr/>
      {/* New Section for Exchange Policy */}
      <div className="exchange-policy-section mt-4 text-center">
        <h3 className="text-primary">पुराने बर्तन एक्सचेंज नीति</h3>
        <p>
          पटवा बर्तन भंडार में, हम आपके पुराने बर्तनों को उचित मूल्य पर खरीदते हैं और नए बर्तन लेने पर भी आपको उचित दर पर एक्सचेंज की सुविधा प्रदान करते हैं।
        </p>
        <h4>स्वीकृत धातुएं:</h4>
        <ul className="list-unstyled">
        <li style={{ color: "goldenrod" }}>पीतल (Brass)</li>
  <li style={{ color: "brown" }}>तांबा (Copper)</li>
  <li style={{ color: "darkolivegreen" }}>कांसा (Kansa)</li>
  <li style={{ color: "silver" }}>एल्यूमिनियम (Aluminium)</li>
        </ul>
        <p>
          यदि आपके पास उपरोक्त धातुओं के पुराने बर्तन हैं, तो तुरंत हमारी दुकान पर आकर उचित मूल्य पर एक्सचेंज करें। आप हमसे संपर्क भी कर सकते हैं।
        </p>
      </div>
      <hr/>
    </div>
  );
};

export default Cart;
