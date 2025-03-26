import React, { useEffect, useState } from "react";
import { auth, db, googleProvider } from "../FirebaseConfig";
import { signInWithPopup, signOut, onAuthStateChanged } from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { Button, Spinner } from "react-bootstrap";
import { FcGoogle } from "react-icons/fc";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom"; // <-- Import useNavigate
import "react-toastify/dist/ReactToastify.css";

const SignUp = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); // <-- Initialize useNavigate

  // Track authentication state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        console.log("User Logged In:", currentUser);
        await checkAndCreateUser(currentUser);
        navigate("/profile"); // <-- Redirect to /profile when user is logged in
      } else {
        console.log("No user logged in.");
      }
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, [navigate]);

  // Function to check and create user in Firestore
  const checkAndCreateUser = async (user) => {
    try {
      const userRef = doc(db, "users", user.uid);
      const userSnap = await getDoc(userRef);

      if (!userSnap.exists()) {
        console.log("Creating new user in Firestore...");
        await setDoc(userRef, {
          name: user.displayName || "",
          email: user.email,
          mobile: "",
          address: "",
          Pincode: "",
          createdAt: new Date(),
        });
        console.log("User added to Firestore ✅");
      } else {
        console.log("User already exists in Firestore ✅");
      }
    } catch (error) {
      console.error("Error checking Firestore:", error);
    }
  };

  // Sign In with Google
  const handleGoogleSignIn = async () => {
    setLoading(true);
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      console.log("Google Sign In Successful:", user);

      // Ensure Firestore document is created
      await checkAndCreateUser(user);

      toast.success("Signed in successfully!", { position: "top-right" });

      navigate("/profile"); // <-- Redirect to /profile after login
    } catch (error) {
      console.error("Error signing in with Google:", error);
      toast.error("Sign In Failed! Please try again.", { position: "top-right" });
    }
    setLoading(false);
  };

  // Sign Out Function
  const handleSignOut = async () => {
    setLoading(true);
    try {
      await signOut(auth);
      toast.success("Signed out successfully!", { position: "top-right" });
      navigate("/"); // <-- Redirect to home after sign out
    } catch (error) {
      console.error("Error signing out:", error);
      toast.error("Sign Out Failed! Please try again.", { position: "top-right" });
    }
    setLoading(false);
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      {user ? (
        <Button
          onClick={handleSignOut}
          className="d-flex align-items-center gap-2 btn-danger p-3 rounded-lg shadow"
          disabled={loading}
        >
          {loading ? <Spinner animation="border" size="sm" /> : "Sign Out"}
        </Button>
      ) : (
        <Button
          onClick={handleGoogleSignIn}
          className="d-flex align-items-center gap-2 btn-light p-3 rounded-lg shadow"
          disabled={loading}
        >
          {loading ? <Spinner animation="border" size="sm" /> : <FcGoogle size={24} />}
          {loading ? "Signing In..." : "Sign Up with Google"}
        </Button>
      )}
    </div>
  );
};

export default SignUp;
