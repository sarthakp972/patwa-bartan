import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { auth, db } from "../FirebaseConfig";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

const LoginModal = ({ show, onClose }) => {
  const [mobile, setMobile] = useState("");
  const [address, setAddress] = useState("");
  const [pincode, setPincode] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async () => {
    const user = auth.currentUser;

    if (user) {
      const userRef = doc(db, "users", user.uid);
      await setDoc(userRef, {
        name: user.displayName || "",
        email: user.email,
        mobile,
        address,
        Pincode: pincode,
        createdAt: new Date(),
      });

      console.log("User Data Saved Successfully!");
      onClose(); // 👈 Close Modal
      navigate("/profile"); // 👈 Redirect to Profile
    }
  };

  return (
    <Modal show={show} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Sign Up Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group>
            <Form.Label>Mobile Number</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Mobile Number"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Address</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Pincode</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Pincode"
              value={pincode}
              onChange={(e) => setPincode(e.target.value)}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          Save & Continue
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default LoginModal;
