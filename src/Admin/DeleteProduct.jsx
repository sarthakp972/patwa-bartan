import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ref, get, remove } from "firebase/database";
import { realtimeDB } from "../FirebaseConfig";
import { Container, Button, Alert, Spinner } from "react-bootstrap";

const DeleteProduct = () => {
  const { categoryName, id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [productKey, setProductKey] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const categoryRef = ref(realtimeDB, `/${categoryName}`);
        const snapshot = await get(categoryRef);

        if (snapshot.exists()) {
          const data = snapshot.val();
          console.log("Fetched Data:", data);

          const matchedProduct = Object.entries(data).find(
            ([, value]) => String(value.id) === String(id)
          );

          if (matchedProduct) {
            setProduct(matchedProduct[1]);
            setProductKey(matchedProduct[0]);
          } else {
            setError("⚠️ Product not found in this category.");
          }
        } else {
          setError("⚠️ Category not found in the database.");
        }
      } catch (err) {
        console.error("Error:", err);
        setError("❌ Failed to load product. Please try again.");
      }
      setLoading(false);
    };

    fetchProduct();
  }, [categoryName, id]);

  const handleDelete = async () => {
    if (!productKey) {
      setError("⚠️ Cannot delete this product.");
      return;
    }

    const confirmDelete = window.confirm(
      `Are you sure you want to delete "${product?.Title}"? This action cannot be undone.`
    );

    if (!confirmDelete) return;

    try {
      const productRef = ref(realtimeDB, `/${categoryName}/${productKey}`);
      await remove(productRef);
      alert("✅ Product deleted successfully!");
      navigate(`/category/${categoryName}`);
    } catch (err) {
      console.error("Error:", err);
      setError("❌ An error occurred. Please try again.");
    }
  };

  if (loading) return <Spinner animation="border" className="d-block mx-auto mt-5" />;
  if (error) return <Alert variant="danger">{error}</Alert>;
  if (!product) return null;

  return (
    <Container>
      <h2 className="my-3 text-danger">Delete Product</h2>
      <Alert variant="warning">
        <strong>⚠️ Warning:</strong> You are about to delete the following product permanently.
      </Alert>
      <h4>📌 Product: {product.Title}</h4>
      <p><strong>ID:</strong> {product.id}</p>
      <p><strong>Brand:</strong> {product.Brand}</p>
      <p><strong>Price:</strong> ₹{product.Price}</p>
      <p><strong>Stock:</strong> {product.stock}</p>
      <img src={product.images?.main || ""} alt="Product" width="200" className="mb-3" />

      <Button variant="danger" onClick={handleDelete}>🗑 Delete Product</Button>
      <Button variant="secondary" className="ms-3" onClick={() => navigate(-1)}>⬅ Cancel</Button>
    </Container>
  );
};

export default DeleteProduct;
