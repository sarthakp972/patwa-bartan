import { BrowserRouter as Router, Route, Routes, Navigate, useLocation } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";

// 🔹 Components & Pages
import PatwaNavbar from "./Components/PatwaNavbar";
import PatwaNavbar2 from "./Components/PatwaNavbar2";
import RunningNav from "./Components/RunningNav";
import useLanguage from "./context/useLanguage";
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
import WelcomePopup from "./Components/WelcomePopup";
import FAQ from "./Components/FAQ";
import BrassCare from "./Components/BrassCare";
import PrivacyPolicy from "./Components/PrivacyPolicy";
import OldUtensilExchange from "./Components/OldUtensilExchange";
import SearchResults from "./Components/SearchResults";
import SignUp from "./Authentication/SignUp";
import Profile from "./Authentication/Profile";

// 🔒 Admin Components
import AdminCategory from "./Admin/AdminCategory";
import AddPage from "./Admin/AddPage";
import AdminRoute from "./Admin/AdminRoute";
// import PatwaAdmin from "./Admin/PatwaAdmin";
import Error from "./Components/Error";
import SplashLoader from "./Components/SplashLoader";
// import AdminNavbar from "./Admin/AdminNavbar";
import AdminHome from "./Admin/AdminHome";
import ProductManager from "./Admin/ProductManager";
import Dashboard from "./Admin/Dashboard";
import ManageUsers from "./Admin/ManageUsers";

function App() {
  const { user, isAdmin, loading } = useContext(AuthContext);

  if (loading) {
    return <SplashLoader />;
  }

  return (
    <Router>
      <AppContent user={user} isAdmin={isAdmin} />
    </Router>
  );
}

// 🔥 अब `useLocation()` को `Router` के अंदर इस्तेमाल कर रहे हैं
function AppContent({ user, isAdmin }) {
  const location = useLocation();
  const { t } = useLanguage();
  const isAdminRoute = location.pathname.startsWith("/admin");

  return (
    <>
      <ScrollToTop />
      <WelcomePopup />
      <ToastContainer position="top-right" autoClose={2000} />

      {/* 🔒 Admin Navbar केवल Admin के लिए */}
      {isAdminRoute ? (
        isAdmin ? (
          <AdminHome />
        ) : (
          <Navigate to="/not-authorized" replace />
        )
      ) : (
        <>
          <PatwaNavbar />
          <PatwaNavbar2 />
          <RunningNav textArray={[t("nav_marquee_text")]} />
        </>
      )}

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

        {/* 🔒 Protected Admin Routes */}
        <Route element={<AdminRoute />}>
          <Route path="/admin/admin_category/:categoryName" element={<AdminCategory />} />
          <Route path="/add-product/:categoryName" element={<AddPage />} />
          {/* <Route path="/admin" element={<PatwaAdmin />} /> */}
          
          <Route path="/admin/product-manage" element={<ProductManager/>} />
          <Route path="/dashboard" element={<Dashboard/>} />
          <Route path="/admin/manage-users" element={<ManageUsers/>} />
        </Route>

        {/* ❌ Unauthorized Page */}
        <Route path="/not-authorized" element={<Error />} />

            {/* 🔴 Handle Invalid Routes */}
            <Route path="*" element={<Error />} />

        {/* 🔐 Profile Page (Only for Logged-in Users) */}
        <Route path="/profile" element={user ? <Profile /> : <Navigate to="/signup" />} />
      </Routes>

      <BackToTopButton />
      <Footer />
    </>
  );
}

export default App;
