import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ref, push } from "firebase/database";
import { realtimeDB } from "../FirebaseConfig";
import { Container, Form, Button } from "react-bootstrap";

const AddPage = () => {
  const { categoryName } = useParams();
  const navigate = useNavigate();
  
  const [product, setProduct] = useState({
    id: "",
    Title: "",
    description: "",
    AboutThisItem: "",
    Brand: false,
    Metal: false,
    OtherAdditionalDetails: false,
    Price: "",
    discount: "",
    size: false,
    weight: false,
    otherOffer: false,
    images: { main: "", sub: false },
    stock: true, // Default stock to true (Available)
    packof: false, // Default packof to false (N/A)
  });

  // Handle text inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  // Handle checkboxes
  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setProduct({ ...product, [name]: checked ? "" : false });
  };

  // Handle main image
  const handleMainImageChange = (e) => {
    setProduct({ ...product, images: { ...product.images, main: e.target.value } });
  };

  // Handle sub images (comma-separated URLs)
  const handleSubImageChange = (e) => {
    setProduct({
      ...product,
      images: { ...product.images, sub: e.target.value.split(",").map((url) => url.trim()) },
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const categoryRef = ref(realtimeDB, `/${categoryName}`);
    await push(categoryRef, {
      ...product,
      packof: product.packof === false ? "N/A" : product.packof, // Convert false to "N/A"
    });
    alert("Product added successfully!");
    navigate(`/category/${categoryName}`);
  };

  const handleCancel = () => {
    navigate(`/category/${categoryName}`); // Navigate back to the category page
  };

  return (
    <Container>
      <h2 className="my-3">Add New Product to {categoryName.toUpperCase()}</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>ID</Form.Label>
          <Form.Control type="text" name="id" value={product.id} onChange={handleChange} required />
        </Form.Group>
        
        <Form.Group>
          <Form.Label>Title</Form.Label>
          <Form.Control type="text" name="Title" value={product.Title} onChange={handleChange} required />
        </Form.Group>

        <Form.Group>
          <Form.Label>Description</Form.Label>
          <Form.Control as="textarea" name="description" value={product.description} onChange={handleChange} />
        </Form.Group>

        <Form.Group>
          <Form.Label>About This Item</Form.Label>
          <Form.Control as="textarea" name="AboutThisItem" value={product.AboutThisItem} onChange={handleChange} />
        </Form.Group>

        {/* Brand Checkbox + Input */}
        <Form.Group>
          <Form.Check type="checkbox" label="Add Brand?" name="Brand" checked={product.Brand !== false} onChange={handleCheckboxChange} />
          {product.Brand !== false && <Form.Control type="text" name="Brand" value={product.Brand} onChange={handleChange} />}
        </Form.Group>

        {/* Metal Checkbox + Input */}
        <Form.Group>
          <Form.Check type="checkbox" label="Add Metal?" name="Metal" checked={product.Metal !== false} onChange={handleCheckboxChange} />
          {product.Metal !== false && <Form.Control type="text" name="Metal" value={product.Metal} onChange={handleChange} />}
        </Form.Group>

        {/* Additional Details Checkbox + Input */}
        <Form.Group>
          <Form.Check type="checkbox" label="Add Other Additional Details?" name="OtherAdditionalDetails" checked={product.OtherAdditionalDetails !== false} onChange={handleCheckboxChange} />
          {product.OtherAdditionalDetails !== false && <Form.Control type="text" name="OtherAdditionalDetails" value={product.OtherAdditionalDetails} onChange={handleChange} />}
        </Form.Group>

        <Form.Group>
          <Form.Label>Price</Form.Label>
          <Form.Control type="number" name="Price" value={product.Price} onChange={handleChange} required />
        </Form.Group>

        <Form.Group>
          <Form.Label>Discount (%)</Form.Label>
          <Form.Control type="number" name="discount" value={product.discount} onChange={handleChange} />
        </Form.Group>

        {/* Size Checkbox + Input */}
        <Form.Group>
          <Form.Check type="checkbox" label="Add Size?" name="size" checked={product.size !== false} onChange={handleCheckboxChange} />
          {product.size !== false && <Form.Control type="text" name="size" value={product.size} onChange={handleChange} />}
        </Form.Group>

        {/* Weight Checkbox + Input */}
        <Form.Group>
          <Form.Check type="checkbox" label="Add Weight?" name="weight" checked={product.weight !== false} onChange={handleCheckboxChange} />
          {product.weight !== false && <Form.Control type="text" name="weight" value={product.weight} onChange={handleChange} />}
        </Form.Group>

        {/* Other Offer Checkbox + Input */}
        <Form.Group>
          <Form.Check type="checkbox" label="Add Other Offer?" name="otherOffer" checked={product.otherOffer !== false} onChange={handleCheckboxChange} />
          {product.otherOffer !== false && <Form.Control type="text" name="otherOffer" value={product.otherOffer} onChange={handleChange} />}
        </Form.Group>

        <Form.Group>
          <Form.Label>Main Image URL</Form.Label>
          <Form.Control type="text" value={product.images.main} onChange={handleMainImageChange} required />
        </Form.Group>

        {/* Sub Images Checkbox + Input */}
        <Form.Group>
          <Form.Check type="checkbox" label="Add Sub Images URLs?" name="images.sub" checked={product.images.sub !== false} onChange={(e) => {
            setProduct({
              ...product,
              images: { ...product.images, sub: e.target.checked ? "" : false },
            });
          }} />
          {product.images.sub !== false && (
            <Form.Control
              placeholder="Ex- https://example.com/image1.jpg, https://example.com/image2.jpg"
              type="text"
              value={Array.isArray(product.images.sub) ? product.images.sub.join(",") : ""}
              onChange={handleSubImageChange}
            />
          )}
        </Form.Group>

        {/* Stock Field */}
        <Form.Group>
          <Form.Check
            type="checkbox"
            label="In Stock?"
            name="stock"
            checked={product.stock}
            onChange={(e) => setProduct({ ...product, stock: e.target.checked })}
          />
        </Form.Group>

        {/* Pack of Field */}
        <Form.Group>
          <Form.Check
            type="checkbox"
            label="Add Pack Of?"
            name="packof"
            checked={product.packof !== false}
            onChange={(e) => setProduct({ ...product, packof: e.target.checked ? "" : false })}
          />
          {product.packof !== false && (
            <Form.Control type="number" name="packof" value={product.packof} onChange={handleChange} />
          )}
        </Form.Group>

        <Button variant="primary" type="submit" className="mt-3">Add Product</Button>
        <Button variant="secondary" onClick={handleCancel} className="mt-3 ms-2">Cancel</Button>
      </Form>
    </Container>
  );
};

export default AddPage;
