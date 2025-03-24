// import React, { useEffect, useState } from "react";
// import { Card, Button, Container, Row, Col } from "react-bootstrap";
// import { FaShoppingCart, FaWhatsapp, FaTrash } from "react-icons/fa";

// const CartPage = () => {
//   const [cart, setCart] = useState([]);

//   useEffect(() => {
//     const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
//     setCart(storedCart);
//   }, []);

//   const removeFromCart = (index) => {
//     const updatedCart = cart.filter((_, i) => i !== index);
//     setCart(updatedCart);
//     localStorage.setItem("cart", JSON.stringify(updatedCart));
//   };

//   const sendToWhatsApp = (product) => {
//     const message = `I want to buy this product: 
// 🛍 *${product.Title}*
// 📸 *Image:* ${product.images.main}
// 💰 *Price:* ₹${product.Price} (${product.discount} OFF)
// ⚖️ *Weight:* ${product.weight}
// 📏 *Size:* ${product.size}
// 🔹 *Metal:* ${product.Metal}
// 🏷 *Brand:* ${product.Brand}
// 📌 *About:* ${product.AboutThisItem}

// Please let me know more details!`;
    
//     const whatsappURL = `https://wa.me/91XXXXXXXXXX?text=${encodeURIComponent(message)}`;
//     window.open(whatsappURL, "_blank");
//   };

//   return (
//     <Container className="mt-4">
//       <h2 className="text-center mb-4">🛒 Your Cart</h2>
//       {cart.length > 0 ? (
//         <Row>
//           {cart.map((product, index) => (
//             <Col key={index} lg={4} md={6} sm={12} className="mb-4">
//               <Card className="cart-card">
//                 <Card.Img variant="top" src={product.images.main} alt={product.Title} className="cart-image"/>
//                 <Card.Body>
//                   <Card.Title className="cart-title">{product.Title}</Card.Title>
//                   <Card.Text><strong>Price:</strong> ₹{product.Price} <span className="discount">{product.discount}</span></Card.Text>
//                   <Card.Text><strong>Size:</strong> {product.size}</Card.Text>
//                   <Card.Text><strong>Weight:</strong> {product.weight}</Card.Text>
//                   <Card.Text><strong>Metal:</strong> {product.Metal}</Card.Text>
//                   <Card.Text><strong>Brand:</strong> {product.Brand}</Card.Text>
//                   <Card.Text><strong>About:</strong> {product.AboutThisItem}</Card.Text>

//                   <div className="cart-buttons">
//                     <Button variant="success" className="whatsapp-button" onClick={() => sendToWhatsApp(product)}>
//                       <FaWhatsapp /> Buy on WhatsApp
//                     </Button>
//                     <Button variant="danger" className="remove-button" onClick={() => removeFromCart(index)}>
//                       <FaTrash /> Remove
//                     </Button>
//                   </div>
//                 </Card.Body>
//               </Card>
//             </Col>
//           ))}
//         </Row>
//       ) : (
//         <h5 className="text-center">Your cart is empty 🛒</h5>
//       )}
//     </Container>
//   );
// };

// export default CartPage;
