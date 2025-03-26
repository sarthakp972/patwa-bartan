import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ref, get, update } from "firebase/database";
import { realtimeDB } from "../FirebaseConfig";
import { Container, Form, Button, Spinner, Alert } from "react-bootstrap";

const UpdateProduct = () => {
  const { categoryName, id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [productKey, setProductKey] = useState(null);
  const [fieldVisibility, setFieldVisibility] = useState({});

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const categoryRef = ref(realtimeDB, `/${categoryName}`);
        const snapshot = await get(categoryRef);

        if (snapshot.exists()) {
          const data = snapshot.val();
          const matchedProduct = Object.entries(data).find(
            ([, value]) => String(value.id) === String(id)
          );

          if (matchedProduct) {
            setProduct(matchedProduct[1]);
            setProductKey(matchedProduct[0]);
            setFieldVisibility(
              Object.keys(matchedProduct[1]).reduce((acc, key) => {
                acc[key] = true;
                return acc;
              }, {})
            );
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

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setProduct((prevState) => ({
      ...prevState,
      [name]: type === "number" ? Number(value) || 0 : value,
    }));
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setFieldVisibility((prev) => ({ ...prev, [name]: checked }));

    if (!checked) {
      setProduct((prevState) => ({
        ...prevState,
        [name]: "", // Clear value if unchecked
      }));
    }
  };

  const handleStockChange = (e) => {
    const { checked } = e.target;
    setProduct((prevState) => ({
      ...prevState,
      stock: checked,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!product || !productKey) return;

    try {
      const updatedProduct = {
        id: product.id,
        Title: product.Title || "",
        description: product.description || "",
        Price: Number(product.Price) || 0,
        discount: Number(product.discount) || 0,
        Brand: product.Brand || "",
        Metal: product.Metal || "",
        AboutThisItem: product.AboutThisItem || "",
        OtherAdditionalDetails: product.OtherAdditionalDetails || "",
        size: product.size || "",
        stock: product.stock || false, // Boolean value
        weight: Number(product.weight) || 0,
        packof: Number(product.packof) || 0,
        images: {
          main: product.images?.main || "",
          sub: Array.isArray(product.images?.sub) ? product.images.sub : [],
        },
      };

      const productRef = ref(realtimeDB, `/${categoryName}/${productKey}`);
      await update(productRef, updatedProduct);
      alert("✅ Product updated successfully!");
      navigate(`/category/${categoryName}`);
    } catch (err) {
      console.error("Error:", err);
      setError("❌ An error occurred. Please try again.");
    }
  };

  const handleCancel = () => {
    navigate(`/category/${categoryName}`);
  };

  if (loading) return <Spinner animation="border" className="d-block mx-auto mt-5" />;
  if (error) return <Alert variant="danger">{error}</Alert>;
  if (!product) return null;

  return (
    <Container>
      <h2 className="my-3">Update Product</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>ID</Form.Label>
          <Form.Control type="text" name="id" value={product.id || ""} readOnly />
        </Form.Group>

        {[
          { label: "Title", name: "Title" },
          { label: "Description", name: "description" },
          { label: "Price", name: "Price", type: "number" },
          { label: "Discount (%)", name: "discount", type: "number" },
          { label: "Brand", name: "Brand" },
          { label: "Metal", name: "Metal" },
          { label: "About This Item", name: "AboutThisItem" },
          { label: "Other Additional Details", name: "OtherAdditionalDetails" },
          { label: "Size", name: "size" },
          { label: "Weight (Kg)", name: "weight", type: "number" },
          { label: "Pack Of", name: "packof", type: "number" },
        ].map(({ label, name, type = "text" }) => (
          <Form.Group className="mb-3" key={name}>
            <Form.Check
              type="checkbox"
              label={`Enable ${label}`}
              name={name}
              checked={fieldVisibility[name] || false}
              onChange={handleCheckboxChange}
            />
            {fieldVisibility[name] && (
              <>
                <Form.Label>{label}</Form.Label>
                <Form.Control type={type} name={name} value={product[name] || ""} onChange={handleChange} />
              </>
            )}
          </Form.Group>
        ))}

        <Form.Group className="mb-3">
          <Form.Check
            type="checkbox"
            label="In Stock"
            name="stock"
            checked={product.stock || false}
            onChange={handleStockChange}
          />
        </Form.Group>

        {/* Main Image URL Section */}
        <Form.Group className="mb-3">
          <Form.Check
            type="checkbox"
            label="Enable Main Image URL"
            name="mainImage"
            checked={fieldVisibility["mainImage"] || false}
            onChange={handleCheckboxChange}
          />
          {fieldVisibility["mainImage"] && (
            <>
              <Form.Label>Main Image URL</Form.Label>
              <Form.Control
                type="text"
                name="mainImage"
                value={product.images?.main || ""}
                onChange={(e) => {
                  setProduct(prevState => ({
                    ...prevState,
                    images: { 
                      ...prevState.images, 
                      main: e.target.value 
                    }
                  }))
                }}
              />
            </>
          )}
        </Form.Group>

        {/* Sub Images Section */}
        <Form.Group className="mb-3">
          <Form.Check
            type="checkbox"
            label="Enable Sub Images"
            name="subImages"
            checked={fieldVisibility["subImages"] || false}
            onChange={handleCheckboxChange}
          />
          {fieldVisibility["subImages"] && (
            <>
              <Form.Label>Sub Images (Comma Separated URLs)</Form.Label>
              <Form.Control
                type="text"
                name="subImages"
                value={product.images?.sub ? product.images.sub.join(", ") : ""}
                onChange={(e) =>
                  setProduct({ ...product, images: { ...product.images, sub: e.target.value.split(",") } })
                }
              />
            </>
          )}
        </Form.Group>

        <Button variant="primary" type="submit">Update Product</Button>
        <Button variant="secondary" onClick={handleCancel} className="ms-2">Cancel</Button>
      </Form>
    </Container>
  );
};

export default UpdateProduct;
