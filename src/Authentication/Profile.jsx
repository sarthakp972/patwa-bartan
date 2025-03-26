import React, { useEffect, useState } from "react";
import { db, googleProvider } from "../FirebaseConfig";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { signOut, signInWithPopup } from "firebase/auth";
import { Button, Spinner, Card, Form, Container, Row, Col } from "react-bootstrap";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useAuth from "../context/useAuth"; // ✅ UseAuth imported correctly
import { FaUserEdit, FaSignOutAlt } from "react-icons/fa";

const Profile = () => {
  const { user, isAdmin, loading, setLoading } = useAuth(); // ✅ Get auth state from context
  const [userData, setUserData] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    address: "",
    Pincode: "",
  });

  const handleCancel = () => {
    setEditMode(false);
    setFormData(userData); // Reset form to original user data
  };

  useEffect(() => {
    if (user) {
      fetchUserData(user.uid);
    } else {
      setUserData(null);
    }
  }, [user]);

  const fetchUserData = async (uid) => {
    try {
      const userRef = doc(db, "users", uid);
      const userSnap = await getDoc(userRef);
      if (userSnap.exists()) {
        setUserData(userSnap.data());
        setFormData(userSnap.data()); // Prefill the form
      } else {
        setUserData(null);
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const handleSignOut = async () => {
    setLoading(true);
    try {
      await signOut();
      toast.success("Signed out successfully!", { position: "top-right" });
    } catch (error) {
      console.error(error);
      toast.error("Sign Out Failed! Try again.", { position: "top-right" });
    }
    setLoading(false);
  };

  const handleGoogleSignIn = async () => {
    setLoading(true);
    try {
      await signInWithPopup(googleProvider);
      toast.success("Signed in successfully!", { position: "top-right" });
    } catch (error) {
      console.error(error);
      toast.error("Sign In Failed! Try again.", { position: "top-right" });
    }
    setLoading(false);
  };

  const handleEdit = () => {
    setEditMode(true);
  };

  const handleSave = async () => {
    if (!user) return;
    setLoading(true);
    try {
      const userRef = doc(db, "users", user.uid);
      await updateDoc(userRef, { ...userData, ...formData }); // ✅ Merge previous data
      setUserData(formData);
      setEditMode(false);
      toast.success("Profile updated successfully!", { position: "top-right" });
    } catch (error) {
      console.error(error);
      toast.error("Update failed! Try again.", { position: "top-right" });
    }
    setLoading(false);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  if (!user) {
    return (
      <Container className="d-flex justify-content-center align-items-center min-vh-100">
        <Card style={{ width: "22rem" }} className="shadow-lg p-4 text-center border-0">
          <Card.Body>
            <Card.Title className="fw-bold fs-4">🔒 आपको लॉगिन करना होगा</Card.Title>
            <p className="text-muted">अपनी प्रोफ़ाइल देखने के लिए पहले लॉग इन करें</p>
            <Button variant="primary" className="mt-3" onClick={handleGoogleSignIn} disabled={loading}>
              {loading ? <Spinner animation="border" size="sm" /> : "Sign Up with Google"}
            </Button>
          </Card.Body>
        </Card>
      </Container>
    );
  }

  return (
    <Container className="d-flex justify-content-center ">
      <Card className="shadow-lg border-0 p-4" style={{ maxWidth: "450px", width: "100%" }}>
        <Card.Body className="text-center">
          <img
            src={user.photoURL || "https://via.placeholder.com/150"}
            alt="User Avatar"
            className="rounded-circle mb-3"
            style={{ width: "100px", height: "100px", objectFit: "cover", border: "4px solid #ddd" }}
          />
          {editMode ? (
             <>
             <Form.Group>
               <Form.Label>नाम</Form.Label>
               <Form.Control type="text" name="name" value={formData.name} onChange={handleChange} />
             </Form.Group>
             <Form.Group>
               <Form.Label>मोबाइल</Form.Label>
               <Form.Control type="text" name="mobile" value={formData.mobile} onChange={handleChange} />
             </Form.Group>
             <Form.Group>
               <Form.Label>पता</Form.Label>
               <Form.Control type="text" name="address" value={formData.address} onChange={handleChange} />
             </Form.Group>
             <Form.Group>
               <Form.Label>पिनकोड</Form.Label>
               <Form.Control type="text" name="Pincode" value={formData.Pincode} onChange={handleChange} />
             </Form.Group>
             <Row className="mt-3">
               <Col>
                 <Button variant="success" className="w-100" onClick={handleSave} disabled={loading}>
                   {loading ? <Spinner animation="border" size="sm" /> : "💾 Save"}
                 </Button>
               </Col>
               <Col>
                 <Button variant="secondary" className="w-100" onClick={handleCancel}>
                   ❌ Cancel
                 </Button>
               </Col>
             </Row>
           </>
          ) : (
            <>
              <h4 className="fw-bold">{userData?.name || "User"}</h4>
              <p className="text-muted">📧 {userData?.email || user.email}</p>
              <p>📞 {userData?.mobile || "Not provided"}</p>
              <p>🏡 {userData?.address || "Not provided"}</p>
              <p>📍 {userData?.Pincode || "Not provided"}</p>

              <Row className="mt-3">
                <Col>
                  <Button variant="outline-primary" className="w-100" onClick={handleEdit}>
                    <FaUserEdit /> Edit
                  </Button>
                </Col>
                <Col>
                  <Button variant="outline-danger" className="w-100" onClick={handleSignOut} disabled={loading}>
                    {loading ? <Spinner animation="border" size="sm" /> : <><FaSignOutAlt /> Sign Out</>}
                  </Button>
                </Col>
              </Row>
            </>
          )}
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Profile;
