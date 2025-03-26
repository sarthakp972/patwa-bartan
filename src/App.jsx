import { BrowserRouter as Router, Route, Routes ,Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { auth } from "./FirebaseConfig";
import { onAuthStateChanged } from "firebase/auth";
import PatwaNavbar from "./Components/PatwaNavbar";
import PatwaNavbar2 from "./Components/PatwaNavbar2";
import Home from "./Pages/Home";
import Footer from "./Components/Footer";
import CategoryPage from "./Pages/CategoryPage";
import Cart from "./Pages/Cart";
import Details from "./Pages/Details";
import AllProducts from "./Pages/AllProducts";
import About from "./Pages/About";
import Contact from "./Pages/Contact";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import BackToTopButton from "./Components/BackToTopButton";
import ScrollToTop from "./Components/ScrollToTop";
import TermsAndConditions from "./Components/TermsAndConditions";
import FAQ from "./Components/FAQ";
import BrassCare from "./Components/BrassCare";
import PrivacyPolicy from "./Components/PrivacyPolicy";
import OldUtensilExchange from "./Components/OldUtensilExchange";
import SearchResults from "./Components/SearchResults";
import SignUp from "./Authentication/SignUp";
import Profile from "./Authentication/Profile";
// import { Spinner } from "react-bootstrap";
// Admin 
// import AdminCategoryNav from "./Admin/AdminCategoryNav";
import AdminCategory from "./Admin/AdminCategory";
// import AdminTableUI from "./Admin/AdminTableUI";
import AddPage from "./Admin/AddPage";
import AdminRoute from "./Admin/AdminRoute";
import PatwaAdmin from "./Admin/PatwaAdmin";
import Error from "./Components/Error";
// import LoginModal from "./Components/LoginModal";
// import UpdateProduct from "./Admin/UpdateProduct";

function App() {
  const [user, setUser] = useState(null);
  // const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      console.log("App.jsx sarthak",currentUser.uid);
      // setLoading(false); // 🔹 Loading खत्म करें
    });

    return () => unsubscribe();
  }, []);

  // 🔹 जब तक Auth लोड हो रहा है, तब तक Spinner दिखाएं
  // if (loading) {
  //   return (
  //     <div className="d-flex justify-content-center align-items-center vh-100">
  //       <Spinner animation="border" variant="primary" />
  //     </div>
  //   );
  // }

  return (
    <Router>
            {/* <LoginModal/> */}
      <ScrollToTop />
      <PatwaNavbar />
      <PatwaNavbar2 />
      <ToastContainer position="top-right" autoClose={2000} />
      
      <Routes>
        <Route path="/search/:query" element={<SearchResults />} />
        <Route path="/all-products" element={<AllProducts />} />
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/category/:category" element={<CategoryPage />} />
        <Route path="/product/:productId" element={<Details />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/Term&Conditions" element={<TermsAndConditions />} />
        <Route path="/FAQ" element={<FAQ />} />
        <Route path="/pital-tamba-kansa-care" element={<BrassCare />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/old-utensil-exchange" element={<OldUtensilExchange />} />
        <Route path="/signup" element={<SignUp />} />
        {/* Admin pannels */}

         {/* 🔒 Protected Admin Routes */}
         <Route element={<AdminRoute />}>
         <Route path="/admin/admin_category/:categoryName" element={<AdminCategory />} />
         <Route path="/add-product/:categoryName" element={<AddPage />} />
         <Route path="/admin" element={<PatwaAdmin/>} />
         </Route>
           {/* Admin pannels End */}
     
           {/* not-authorized */}
           <Route path="/not-authorized" element={<Error/>} />
           
             
        <Route
      path="/profile"
      element={user ? <Profile /> : <Navigate to="/signup" />} 
      />

      </Routes>
      
      <BackToTopButton />

      <Footer />
      
      

      
     
     
    </Router>
  );
}

export default App;
