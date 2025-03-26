// src/Admin/Sidebar.jsx
import React from "react";
import { Link } from "react-router-dom";
import { FaTachometerAlt, FaBox, FaShoppingCart, FaUsers, FaSignOutAlt } from "react-icons/fa";
// import "./AdminStyles.css"; // Custom CSS for styling

const Sidebar = ({ isOpen }) => {
  return (
    <div className={`admin-sidebar ${isOpen ? "open" : ""}`}>
      <h2 className="sidebar-logo">Admin Panel</h2>
      <ul>
        <li>
          <Link to="/admin/dashboard">
            <FaTachometerAlt /> Dashboard
          </Link>
        </li>
        <li>
          <Link to="/admin/products">
            <FaBox /> Manage Products
          </Link>
        </li>
        <li>
          <Link to="/admin/orders">
            <FaShoppingCart /> Manage Orders
          </Link>
        </li>
        <li>
          <Link to="/admin/users">
            <FaUsers /> Manage Users
          </Link>
        </li>
        <li>
          <Link to="/logout">
            <FaSignOutAlt /> Logout
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
