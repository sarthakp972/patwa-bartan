import { useContext } from "react";
import { AuthContext } from "./AuthContext";


// ✅ Custom Hook to Access Auth Context
const useAuth = () => {
  return useContext(AuthContext);
};

export default useAuth;
