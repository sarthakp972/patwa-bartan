import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const AdminRoute = () => {
  const { user, isAdmin, loading } = useContext(AuthContext);

  if (loading) return <p>Loading...</p>; // Jab tak authentication check ho raha hai, tab tak loading dikhao

  return user && isAdmin ? <Outlet /> : <Navigate to="/not-authorized" />;
};

export default AdminRoute;
