import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import PatwaNavbar from "./Components/PatwaNavbar";
import PatwaNavbar2 from "./Components/PatwaNavbar2";
import Home from "./Pages/Home";
import Footer from "./Components/Footer";
import CategoryPage from "./Pages/CategoryPage";
import Cart from "./Pages/Cart"; // ✅ Import Cart page
import Details from "./Pages/Details"; // ✅ Import Product Details page
import AllProducts from "./Pages/AllProducts";
import About from "./Pages/About";
import Contact from "./Pages/Contact";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import BackToTopButton from "./Components/BackToTopButton";
import ScrollToTop from "./Components/ScrollToTop";
// import AddSeasonalBanner from "./FirebaseCheck/AddSeasonalBanner";
import TermsAndConditions from "./Components/TermsAndConditions";
import FAQ from "./Components/FAQ";
import BrassCare from "./Components/BrassCare";
import PrivacyPolicy from "./Components/PrivacyPolicy";
import OldUtensilExchange from "./Components/OldUtensilExchange";
import SearchResults from "./Components/SearchResults";
import ProductSearch from "./search/ProductSearch";
// import AddseasonalBanner2 from "./FirebaseCheck/AddSeasonalBanner";
// import RunningNav from "./Components/RunningNav";


// import SearchResults from "./Components/SearchResults";
// import AddMetal from "./FirebaseCheck/AddMetal";
// import AddUtility from "./FirebaseCheck/AddUtility";
// import AddCreators from "./FirebaseCheck/AddCreators";
// import AddPital from "./FirebaseCheck/AddPitalData";
// import HomeShopUtility from "./Components/HomeShopUtility";
// import RunningNav from "./Components/RunningNav";
// import SignUp from "./Authentication/Signup";
// import AddPital from "./FirebaseCheck/AddPitalData";

function App() {
  return (
    <Router>
       <ScrollToTop />
      {/* <AddPital/> */}
    {/* <HomeShopUtility/> */}
    {/* <AddMetal/> */}
    {/* <AddUtility/> */}
    {/* <AddCreators/> */}
    {/* <AddseasonalBanner2/> */}
{/* <RunningNav textArray={["पुराने पीतल, जर्मन, तांबा, और कांसे के बर्तन उचित दाम पर बदले और काटे जाते हैं। अभी संपर्क करें!"]}/> */}
      <PatwaNavbar />
      <PatwaNavbar2 />
     
      <ToastContainer position="top-right" autoClose={2000} />
      
      <Routes>
      <Route path="/search/:query" element={<SearchResults />} />


      <Route path="/all-products" element={<AllProducts />} />
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/category/:category" element={<CategoryPage />} /> {/* ✅ Dynamic category route */}
        <Route path="/product/:productId" element={<Details />} /> {/* ✅ Product Details route */}
        <Route path="/cart" element={<Cart />} /> {/* ✅ Add Cart Page route */}
        <Route path="/Term&Conditions" element={<TermsAndConditions />} />
        <Route path="/FAQ" element={<FAQ />} />
        <Route path="/pital-tamba-kansa-care" element={<BrassCare />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/old-utensil-exchange" element={<OldUtensilExchange />} />
        
      </Routes>
      <BackToTopButton />
      <Footer />
    
    </Router>
  );
}

export default App;