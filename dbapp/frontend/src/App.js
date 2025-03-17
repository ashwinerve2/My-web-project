import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  // State for add user form
  const [name, setName] = useState("");
  const [classVal, setClassVal] = useState(""); // using classVal to avoid reserved keyword "class"
  const [seat, setSeat] = useState("");

  // State for viewing and deleting users
  const [users, setUsers] = useState([]);
  const [deleteId, setDeleteId] = useState("");

  // Function to handle adding a new user
  const handleAddUser = (e) => {
    e.preventDefault();
    fetch("http://localhost:5000/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, class: classVal, seat }),
    })
      .then((response) => response.json())
      .then((data) => {
        alert("User added successfully!");
        console.log(data);
        // Reset the form fields
        setName("");
        setClassVal("");
        setSeat("");
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  // Function to fetch and view users
  const handleViewUsers = () => {
    fetch("http://localhost:5000/users")
      .then((response) => response.json())
      .then((data) => {
        setUsers(data.users);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  // Function to delete a user by ID
  const handleDeleteUser = () => {
    fetch(`http://localhost:5000/users/${deleteId}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((data) => {
        alert("User deleted successfully!");
        console.log(data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <div className="container mt-4">
      <h1 className="text-center mb-4">Operations with Database</h1>

      {/* Add User Section */}
      <div className="card p-4 mb-4">
        <h2 className="mb-3">Add New User</h2>
        <form id="addUserForm" onSubmit={handleAddUser}>
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Class"
              value={classVal}
              onChange={(e) => setClassVal(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Seat"
              value={seat}
              onChange={(e) => setSeat(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Add User
          </button>
        </form>
      </div>

      {/* View Users Section */}
      <div className="card p-4 mb-4">
        <h2 className="mb-3">View Users</h2>
        <button className="btn btn-info mb-3" onClick={handleViewUsers}>
          View Users
        </button>
        <ul className="list-group">
          {users.map((user) => (
            <li key={user.id} className="list-group-item">
              <strong>ID:</strong> {user.id}, <strong>Name:</strong> {user.name},{" "}
              <strong>Class:</strong> {user.class},{" "}
              <strong>Seat:</strong> {user.seat}
            </li>
          ))}
        </ul>
      </div>

      {/* Delete User Section */}
      <div className="card p-4 mb-4">
        <h2 className="mb-3">Delete User</h2>
        <div className="mb-3">
          <input
            type="number"
            className="form-control"
            placeholder="Enter User ID to Delete"
            value={deleteId}
            onChange={(e) => setDeleteId(e.target.value)}
            required
          />
        </div>
        <button className="btn btn-danger" onClick={handleDeleteUser}>
          Delete User
        </button>
      </div>
    </div>
  );
}

export default App;
