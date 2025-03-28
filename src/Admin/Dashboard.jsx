import React, { useEffect, useState } from "react";
import { Card, CardBody, CardTitle } from "reactstrap";
import { FaBox, FaUsers, FaShoppingCart, FaChartLine } from "react-icons/fa";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../FirebaseConfig"; // Ensure this is correctly set up
import "bootstrap/dist/css/bootstrap.min.css";
import AdminNavbar from "./AdminNavbar";

const Dashboard = () => {
  const [userCount, setUserCount] = useState(0);

  useEffect(() => {
    const fetchUserCount = async () => {
      try {
        const usersSnapshot = await getDocs(collection(db, "users"));
        setUserCount(usersSnapshot.size);
      } catch (error) {
        console.error("Error fetching user count:", error);
      }
    };

    fetchUserCount();
  }, []);

  return (
    <>
      <AdminNavbar />
      <div className="container-fluid py-4">
        {/* Navbar */}
        <nav className="navbar navbar-light bg-white shadow-sm rounded p-3 mb-4">
          <span className="navbar-brand fs-4 fw-bold">📊 Admin Dashboard</span>
        </nav>

        {/* Dashboard Cards */}
        <div className="row g-4">
          <DashboardCard icon={<FaBox size={40} className="text-primary" />} title="Products" count="120" />
          <DashboardCard icon={<FaUsers size={40} className="text-success" />} title="Users" count={userCount} />
          <DashboardCard icon={<FaShoppingCart size={40} className="text-danger" />} title="Orders" count="75" />
          <DashboardCard icon={<FaChartLine size={40} className="text-warning" />} title="Sales" count="$5,000" />
        </div>
      </div>
    </>
  );
};

// ✅ Reusable Dashboard Card Component (Responsive & Clean)
const DashboardCard = ({ icon, title, count }) => (
  <div className="col-xl-3 col-lg-4 col-md-6 col-sm-12">
    <Card className="shadow-sm text-center p-3 border-0 rounded-3">
      <CardBody>
        <div className="mb-2">{icon}</div>
        <CardTitle tag="h5" className="fw-semibold">{title}</CardTitle>
        <p className="fw-bold fs-4 mb-0">{count}</p>
      </CardBody>
    </Card>
  </div>
);

export default Dashboard;
