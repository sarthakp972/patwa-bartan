import { useContext } from "react";
import ProductSearchContext from "./ProductSearchContext";


const useProductSearch = () => {
  const context = useContext(ProductSearchContext);
  if (!context) {
    throw new Error("useProducts must be used within a ProductProvider");
  }
  return context;
};

export default useProductSearch;
