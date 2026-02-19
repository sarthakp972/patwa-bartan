import React, { useEffect, useState } from "react";
import { auth, db, googleProvider } from "../FirebaseConfig";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { signOut, signInWithPopup } from "firebase/auth";
import { Spinner, Form } from "react-bootstrap";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useAuth from "../context/useAuth";
import { FaUserEdit, FaSignOutAlt, FaPhoneAlt, FaMapMarkerAlt, FaEnvelope, FaGooglePlusG } from "react-icons/fa";
import { MdLocationPin } from "react-icons/md";
import "./Profile.css";

const Profile = () => {
  const { user, isAdmin, loading, setLoading } = useAuth();
  const [userData, setUserData] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({ name: "", mobile: "", address: "", Pincode: "" });

  useEffect(() => {
    if (user) fetchUserData(user.uid);
    else setUserData(null);
  }, [user]);

  const fetchUserData = async (uid) => {
    try {
      const userRef = doc(db, "users", uid);
      const userSnap = await getDoc(userRef);
      if (userSnap.exists()) {
        setUserData(userSnap.data());
        setFormData(userSnap.data());
      } else setUserData(null);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const handleSignOut = async () => {
    setLoading(true);
    try {
      await signOut(auth);
      toast.success("Signed out successfully!", { position: "top-right" });
    } catch (error) {
      toast.error("Sign Out Failed! Try again.", { position: "top-right" });
    }
    setLoading(false);
  };

  const handleGoogleSignIn = async () => {
    setLoading(true);
    try {
      await signInWithPopup(auth, googleProvider);
      toast.success("Signed in successfully!", { position: "top-right" });
    } catch (error) {
      toast.error("Sign In Failed! Try again.", { position: "top-right" });
    }
    setLoading(false);
  };

  const handleEdit = () => setEditMode(true);
  const handleCancel = () => { setEditMode(false); setFormData(userData); };

  const handleSave = async () => {
    if (!user) return;
    setLoading(true);
    try {
      const userRef = doc(db, "users", user.uid);
      await updateDoc(userRef, { ...userData, ...formData });
      setUserData(formData);
      setEditMode(false);
      toast.success("Profile updated successfully!", { position: "top-right" });
    } catch (error) {
      toast.error("Update failed! Try again.", { position: "top-right" });
    }
    setLoading(false);
  };

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  /* ── Not logged in ── */
  if (!user) {
    return (
      <div className="profile-page d-flex align-items-center justify-content-center">
        <div className="profile-login-card text-center">
          <div className="profile-lock-icon">🔒</div>
          <h3 className="profile-login-title">Login Required</h3>
          <p className="profile-login-sub">Sign in to view and manage your profile</p>
          <button className="profile-google-btn" onClick={handleGoogleSignIn} disabled={loading}>
            {loading ? <Spinner animation="border" size="sm" /> : <><FaGooglePlusG /> Sign in with Google</>}
          </button>
        </div>
      </div>
    );
  }

  /* ── Logged in ── */
  return (
    <div className="profile-page">
      <div className="profile-wrapper">

        {/* ── Header / Avatar ── */}
        <div className="profile-header">
          <div className="profile-avatar-ring">
            <img
              src={user.photoURL || "https://ui-avatars.com/api/?name=User&background=1565c0&color=fff&size=128"}
              alt="Avatar"
              className="profile-avatar"
            />
          </div>
          <h2 className="profile-name">{userData?.name || user.displayName || "User"}</h2>
          {isAdmin && <span className="profile-badge admin-badge">⚡ Admin</span>}
          <span className="profile-badge user-badge">👤 Customer</span>
        </div>

        {/* ── Info / Edit Card ── */}
        <div className="profile-card">
          {editMode ? (
            /* Edit form */
            <div className="profile-edit-form">
              <h5 className="profile-section-title">✏️ Edit Profile</h5>
              {[
                { label: "Full Name", name: "name", type: "text", icon: "👤" },
                { label: "Mobile", name: "mobile", type: "tel", icon: "📞" },
                { label: "Address", name: "address", type: "text", icon: "🏡" },
                { label: "Pincode", name: "Pincode", type: "text", icon: "📍" },
              ].map(({ label, name, type, icon }) => (
                <Form.Group key={name} className="profile-field-group">
                  <Form.Label className="profile-field-label">{icon} {label}</Form.Label>
                  <Form.Control
                    className="profile-field-input"
                    type={type}
                    name={name}
                    value={formData[name] || ""}
                    onChange={handleChange}
                    placeholder={`Enter ${label.toLowerCase()}`}
                  />
                </Form.Group>
              ))}
              <div className="profile-action-row">
                <button className="profile-btn save-btn" onClick={handleSave} disabled={loading}>
                  {loading ? <Spinner animation="border" size="sm" /> : "💾 Save Changes"}
                </button>
                <button className="profile-btn cancel-btn" onClick={handleCancel}>✕ Cancel</button>
              </div>
            </div>
          ) : (
            /* View mode */
            <>
              <h5 className="profile-section-title">📋 Profile Details</h5>
              <div className="profile-info-grid">
                <div className="profile-info-item">
                  <FaEnvelope className="info-icon" />
                  <div>
                    <span className="info-label">Email</span>
                    <span className="info-value">{userData?.email || user.email}</span>
                  </div>
                </div>
                <div className="profile-info-item">
                  <FaPhoneAlt className="info-icon" />
                  <div>
                    <span className="info-label">Mobile</span>
                    <span className="info-value">{userData?.mobile || "Not provided"}</span>
                  </div>
                </div>
                <div className="profile-info-item">
                  <FaMapMarkerAlt className="info-icon" />
                  <div>
                    <span className="info-label">Address</span>
                    <span className="info-value">{userData?.address || "Not provided"}</span>
                  </div>
                </div>
                <div className="profile-info-item">
                  <MdLocationPin className="info-icon" />
                  <div>
                    <span className="info-label">Pincode</span>
                    <span className="info-value">{userData?.Pincode || "Not provided"}</span>
                  </div>
                </div>
              </div>

              <div className="profile-action-row">
                <button className="profile-btn edit-btn" onClick={handleEdit}>
                  <FaUserEdit /> Edit Profile
                </button>
                <button className="profile-btn signout-btn" onClick={handleSignOut} disabled={loading}>
                  {loading ? <Spinner animation="border" size="sm" /> : <><FaSignOutAlt /> Sign Out</>}
                </button>
              </div>
            </>
          )}
        </div>

      </div>
    </div>
  );
};

export default Profile;