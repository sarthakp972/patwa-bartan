import React, { useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import useProducts from "../context/useProducts";
import useCart from "../context/useCart";
import { Button, Modal, Carousel ,Spinner} from "react-bootstrap";
import { FaWhatsapp, FaShoppingCart, FaEnvelope } from "react-icons/fa";
import "../Css-page/Details.css";
import Note from "../Components/Note";
import RunningNav from "../Components/RunningNav";

const Details = () => {
  const { products } = useProducts();
  const { addToCart } = useCart();
  const { productId } = useParams();
  const location = useLocation();

  const [showModal, setShowModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  let product = location.state?.product || null;

  if (!product) {
    for (const category of Object.values(products)) {
      const foundProduct = category.find((p) => String(p.id) === String(productId));
      if (foundProduct) {
        product = foundProduct;
        break;
      }
    }
  }

  if (!product) return <h2 className="text-center mt-4">  <Spinner animation="border" variant="primary" />
        <p>उत्पाद विवरण लोड हो रहा है...</p></h2>;

  const whatsappMessage = `नमस्ते, मैं इस उत्पाद को खरीदने में रुचि रखता हूँ:\n\n- उत्पाद: ${product.Title}\n- मूल्य: ₹${product.Price}\n- छूट: ${product.discount ? `${product.discount}% की छूट` : "कोई छूट नहीं"}\n- आकार: ${product.size || "N/A"}\n- वज़न: ${product.weight || "N/A"}\n- स्टॉक: ${product.stock ? "उपलब्ध" : "⛔ स्टॉक समाप्त"}\n- पैक ऑफ: ${product.packof || "N/A"}\n\nकृपया अधिक जानकारी दें.`;

  const whatsappLink = `https://wa.me/9713671554?text=${encodeURIComponent(whatsappMessage)}`;
  const emailSubject = `उत्पाद जानकारी - ${product.Title}`;
  const emailBody = `प्रिय पटवा बर्तन भंडार,\n\nमुझे आपके इस उत्पाद में रुचि है:\n\nउत्पाद: ${product.Title}\nमूल्य: ₹${product.Price}\nआकार: ${product.size || "N/A"}\nवज़न: ${product.weight || "N/A"}\nपैक ऑफ: ${product.packof || "N/A"}\n\nकृपया अधिक जानकारी साझा करें।\n\nधन्यवाद।`;
  const emailLink = `mailto:patwa.bartan.bhandar@gmail.com?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;

  const handleImageClick = (img) => {
    setSelectedImage(img);
    setShowModal(true);
  };

  return (
    <>
      <div className="container mt-4 details-page">
        <div className="row">
          <div className="col-md-6">
            <img 
              src={product.images?.main || "https://via.placeholder.com/400"}
              alt={product.Title}
              className="img-fluid main-image"
              onClick={() => handleImageClick(product.images?.main)} // Enable zoom on main image
            />

            {product.images?.sub?.length > 0 && (
              <>
                <div className="d-none d-md-flex sub-images mt-3">
                  {product.images.sub.map((img, index) => (
                    <img
                      key={index}
                      src={img}
                      alt={`sub-${index}`}
                      className="sub-image"
                      onClick={() => handleImageClick(img)} // Enable zoom on sub images
                    />
                  ))}
                </div>
                <div className="d-md-none mt-3">
                  <Carousel className="carousel-background">
                    {[product.images.main, ...product.images.sub].map((img, index) => (
                      <Carousel.Item key={index}>
                        <img className="d-block w-100" src={img} alt={`slide-${index}`} onClick={() => handleImageClick(img)} /> // Enable zoom on carousel images
                      </Carousel.Item>
                    ))}
                  </Carousel>
                </div>
              </>
            )}
          </div>

          <div className="col-md-6">
            <div className="details-card">
              <h2 className="product-title">{product.Title}</h2>
                    <hr/>
              <div className="price-section">
                {product.discount ? (
                  <>
                    <span className="discount-price">
                      ₹{(product.Price * (1 - product.discount / 100)).toFixed(2)}
                    </span>
                    <span className="original-price">₹{product.Price}</span>
                    <span className="discount-label">-{product.discount}% की छूट</span>
                  
                  </>
                ) : (
                  <span className="price">₹{product.Price}</span>
                )}
              </div>
            
              <Button variant="primary" className="mt-3" onClick={() => addToCart({ ...product, quantity: 1 })}>
                <FaShoppingCart /> कार्ट में जोड़ें
              </Button>
              <Button variant="success" className="mt-3 mx-2" href={whatsappLink} target="_blank">
                <FaWhatsapp /> व्हाट्सएप पर खरीदें
              </Button>
              <hr/>
              {product.Metal && <p className="detail-common-p"><strong className="detail-common-heading">धातु:</strong> {product.Metal}</p>}
              {product.size && <p className="detail-common-p"><strong className="detail-common-heading">आकार:</strong> {product.size}</p>}
              {product.weight && <p className="detail-common-p"><strong className="detail-common-heading">वज़न:</strong> {product.weight}</p>}
              <p className="detail-common-p"><strong className="detail-common-heading">स्टॉक:</strong> {product.stock ? "✅ उपलब्ध" : "⛔ समाप्त"}</p>

              {product.packof && (
                <div className="pack-box">
                <p className="detail-common-p">  <strong className="detail-common-heading">पैक ऑफ:</strong> {product.packof}</p>
                </div>
              )}

              {product.description && <p className="detail-common-p"><strong className="detail-common-heading">विवरण:</strong> {product.description}</p>}
              {product.AboutThisItem && <p  className="detail-common-p"><strong  className="detail-common-heading">उत्पाद के बारे में:</strong> {product.AboutThisItem}</p>}
              <Button variant="dark" className="mt-3" href={emailLink}>
                <FaEnvelope /> ईमेल भेजें
              </Button>
            </div>
          </div>
        </div>
      </div>

      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Body className="text-center">
          {selectedImage && <img src={selectedImage} alt="Enlarged" className="img-fluid" />}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>बंद करें</Button>
        </Modal.Footer>
      </Modal>

      <div className="mt-4">
        <RunningNav textArray={["पुराने पीतल, जर्मन, तांबा, और कांसे के बर्तन उचित दाम पर बदले और काटे जाते हैं। अभी संपर्क करें!"]}/>
      </div>
      <div className="mb-4">
      <hr/>
        <Note />
      </div>
    </>
  );
};

export default Details;
