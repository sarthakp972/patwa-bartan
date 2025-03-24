// import { useState } from "react";
// import { auth, googleProvider } from "../FirebaseConfig"; // Ensure correct import
// import {
//   createUserWithEmailAndPassword,
//   sendEmailVerification,
//   signInWithPopup,
// } from "firebase/auth";
// import { useNavigate } from "react-router-dom";
// import "bootstrap/dist/css/bootstrap.min.css";

// const SignUp = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const [message, setMessage] = useState("");
//   const navigate = useNavigate();

//   // Sign Up with Email & Password and send verification email
//   const handleSignUp = async (e) => {
//     e.preventDefault();
//     setError("");
//     setMessage("");

//     try {
//       const userCredential = await createUserWithEmailAndPassword(auth, email, password);
//       const user = userCredential.user;

//       // Send verification email
//       await sendEmailVerification(user);
//       setMessage("Verification email sent. Please check your inbox!");

//       // Optionally, navigate to login page after a few seconds
//       setTimeout(() => navigate("/login"), 5000);
//     } catch (err) {
//       setError(err.message);
//     }
//   };

//   // Google Sign-In
//   const handleGoogleSignIn = async () => {
//     try {
//       await signInWithPopup(auth, googleProvider);
//       navigate("/");
//     } catch (err) {
//       setError("Google Sign-In failed");
//     }
//   };

//   return (
//     <div className="container mt-5" style={{ maxWidth: "400px" }}>
//          <div className="d-flex justify-content-center">
//       <button className="btn btn-danger w-100" onClick={handleGoogleSignIn} 
//     style={{ padding: "10px", border: "2px solid black" }}>
//     Sign Up with Google
//   </button>
// </div>
//       <h2 className="text-center">Sign Up</h2>
//       {error && <div className="alert alert-danger">{error}</div>}
//       {message && <div className="alert alert-success">{message}</div>}

//       <form onSubmit={handleSignUp}>
//         <div className="mb-3">
//           <label className="form-label">Email</label>
//           <input
//             type="email"
//             className="form-control"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             required
//           />
//         </div>
//         <div className="mb-3">
//           <label className="form-label">Password</label>
//           <input
//             type="password"
//             className="form-control"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             required
//           />
//         </div>
//         <button type="submit" className="btn btn-primary w-100">Sign Up</button>
//       </form>

//       <hr />
     

//       <div className="mt-3 text-center">
//         <p>Already have an account? <a href="/login">Login</a></p>
//       </div>
//     </div>
//   );
// };

// export default SignUp;
