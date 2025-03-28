import React, { useEffect, useState, useContext } from "react";
import { db } from "../FirebaseConfig";
import { collection, getDocs } from "firebase/firestore";
import { Table, Spinner, Alert } from "reactstrap";
import { AuthContext } from "../context/AuthContext"; // Import AuthContext

const ManageUsers = () => {
  const { isAdmin, loading: authLoading } = useContext(AuthContext); // Get admin status
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!isAdmin) return; // ✅ Prevent non-admins from fetching users

    const fetchUsers = async () => {
      try {
        const usersCollection = collection(db, "users");
        const usersSnapshot = await getDocs(usersCollection);
        const usersList = usersSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setUsers(usersList);
      } catch (err) {
        setError("Error fetching users. Please try again.");
        console.error("Error fetching users:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [isAdmin]);

  if (authLoading) {
    return (
      <div className="text-center mt-4">
        <Spinner color="primary" />
        <p>Checking admin permissions...</p>
      </div>
    );
  }

  if (!isAdmin) {
    return <Alert color="danger">❌ Access Denied! Only admins can view this page.</Alert>;
  }

  return (
    <div className="container mt-4 ">
      <h2 className="mb-3">👥 Manage Users</h2>

      {loading ? (
        <div className="text-center">
          <Spinner color="primary" />
          <p>Loading users...</p>
        </div>
      ) : error ? (
        <Alert color="danger">{error}</Alert>
      ) : users.length === 0 ? (
        <Alert color="warning">No users found.</Alert>
      ) : (
        <Table bordered hover responsive>
          <thead className="bg-primary text-white">
            <tr>
              <th>#</th>
              <th>User ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Address</th>
              <th>Pincode</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={user.id}>
                <td>{index + 1}</td>
                <td>{user.id}</td>
                <td>{user.name || "N/A"}</td>
                <td>{user.email || "N/A"}</td>
                <td>{user.mobile || "N/A"}</td>
                <td>{user.address || "N/A"}</td>
                <td>{user.Pincode || "N/A"}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </div>
  );
};

export default ManageUsers;
