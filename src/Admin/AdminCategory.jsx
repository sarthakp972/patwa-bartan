import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ref, get, remove } from "firebase/database";
import { realtimeDB } from "../FirebaseConfig";
import { Container, Table, Image, Button, Accordion, Spinner, Alert, Form } from "react-bootstrap";

const AdminCategory = () => {
  const { categoryName } = useParams();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [visibleFields, setVisibleFields] = useState({
    description: true,
    AboutThisItem: true,
    Brand: true,
    Metal: true,
    OtherAdditionalDetails: true,
    Price: true,
    discount: true,
    size: true,
    weight: true,
    otherOffer: true,
    images: true,
    stock: true,
    packof: true,
  });

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const categoryRef = ref(realtimeDB, `/${categoryName}`);
        const snapshot = await get(categoryRef);

        if (snapshot.exists()) {
          const data = snapshot.val();
          setProducts(Object.entries(data).map(([key, value]) => ({ id: key, ...value })));
        } else {
          setError(`⚠️ No products found in ${categoryName} category.`);
        }
      } catch (err) {
        console.error("Error fetching products:", err);
        setError("❌ Failed to load products. Please try again.");
      }
      setLoading(false);
    };

    fetchProducts();
  }, [categoryName]);

  const handleDelete = async (productId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this product?");
    if (!confirmDelete) return;

    try {
      await remove(ref(realtimeDB, `/${categoryName}/${productId}`));
      alert("✅ Product deleted successfully!");
      setProducts(products.filter((product) => product.id !== productId));
    } catch (err) {
      console.error("Error deleting product:", err);
      setError("❌ Failed to delete product. Please try again.");
    }
  };

  if (loading) return <Spinner animation="border" className="d-block mx-auto mt-5" />;
  if (error) return <Alert variant="danger">{error}</Alert>;

  return (
    <Container>
    <div className="sticky-header">
    <div className="d-flex justify-content-between align-items-center ">
        <h2>{categoryName.toUpperCase()} Products ({products.length})</h2>
        <Button variant="success" onClick={() => navigate(`/add-product/${categoryName}`)}>+ Add Product</Button>
    </div>
</div>


      <Form className="mb-3">
        <h5>Toggle Fields:</h5>
        {Object.keys(visibleFields).map((field) => (
          <Form.Check
            key={field}
            type="checkbox"
            label={field}
            checked={visibleFields[field]}
            onChange={() => setVisibleFields({ ...visibleFields, [field]: !visibleFields[field] })}
            inline
          />
        ))}
      </Form>

      {/* Scrollable Table Container */}
      <div className="table-responsive-custom">
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>ID</th>
              <th>Title</th>
              {visibleFields.description && <th>Description</th>}
              {visibleFields.AboutThisItem && <th>About This Item</th>}
              {visibleFields.Brand && <th>Brand</th>}
              {visibleFields.Metal && <th>Metal</th>}
              {visibleFields.OtherAdditionalDetails && <th>Additional Details</th>}
              {visibleFields.Price && <th>Price</th>}
              {visibleFields.discount && <th>Discount</th>}
              <th>Final Price</th>
              {visibleFields.size && <th>Size</th>}
              {visibleFields.weight && <th>Weight</th>}
              {visibleFields.otherOffer && <th>Offer</th>}
              {visibleFields.images && <th>Main Image</th>}
              {visibleFields.images && <th>Sub Images</th>}
              {visibleFields.stock && <th>Stock</th>}
              {visibleFields.packof && <th>Pack Of</th>}
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map(({ id, Title, description, AboutThisItem, Brand, Metal, OtherAdditionalDetails, Price, discount, size, weight, otherOffer, images, stock, packof }) => (
              <tr key={id}>
                <td>{id}</td>
                <td>{Title || "N/A"}</td>
                {visibleFields.description && (
                  <td>
                    <Accordion>
                      <Accordion.Item eventKey={`desc-${id}`}>
                        <Accordion.Header>Description</Accordion.Header>
                        <Accordion.Body>{description || "No Description Available"}</Accordion.Body>
                      </Accordion.Item>
                    </Accordion>
                  </td>
                )}
                {visibleFields.AboutThisItem && (
                  <td>
                    <Accordion>
                      <Accordion.Item eventKey={`about-${id}`}>
                        <Accordion.Header>About This Item</Accordion.Header>
                        <Accordion.Body>{AboutThisItem || "No Details Available"}</Accordion.Body>
                      </Accordion.Item>
                    </Accordion>
                  </td>
                )}
                {visibleFields.Brand && <td>{Brand || "N/A"}</td>}
                {visibleFields.Metal && <td>{Metal || "N/A"}</td>}
                {visibleFields.OtherAdditionalDetails && <td>{OtherAdditionalDetails || "N/A"}</td>}
                {visibleFields.Price && <td>₹{Price || "0"}</td>}
                {visibleFields.discount && <td>{discount ? `${discount}%` : "0%"}</td>}
                <td>₹{Price ? (Price - (Price * (discount || 0)) / 100).toFixed(2) : "0.00"}</td>
                {visibleFields.size && <td>{size || "N/A"}</td>}
                {visibleFields.weight && <td>{weight || "N/A"}</td>}
                {visibleFields.otherOffer && <td>{otherOffer || "N/A"}</td>}
                {visibleFields.images && (
                  <td>
                    {images?.main ? <Image src={images.main} alt={Title} width="80" height="80" /> : "No Image"}
                  </td>
                )}
                {visibleFields.images && (
                  <td>
                    {Array.isArray(images?.sub) && images.sub.length > 0 ? (
                      images.sub.map((imgUrl, index) => (
                        <Image key={index} src={imgUrl} alt={`${Title} Sub ${index + 1}`} width="50" height="50" className="mx-1" />
                      ))
                    ) : (
                      "No Sub Images"
                    )}
                  </td>
                )}
                {visibleFields.stock && <td>{stock ? "Available" : "Not Available"}</td>}
                {visibleFields.packof && <td>{packof || "N/A"}</td>}
                <td>
                  <Button variant="warning" className="me-2" onClick={() => navigate(`/update/${categoryName}/${id}`)}>✏ Update</Button>
                  <Button variant="danger" onClick={() => handleDelete(id)}>🗑 Delete</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </Container>
  );
};

export default AdminCategory;
