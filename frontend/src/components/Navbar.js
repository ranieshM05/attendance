import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "../Styles/Navbar.css";  

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <h1 className="navbar-title">Attendance System</h1>
        <div className="navbar-links">
          <Link to="/">Home</Link>
          <Link to="/staff-dashboard">Staff</Link>
          <Link to="/student-dashboard">Student</Link>
          <Link to="/od-requests">OD Requests</Link>
          <button className="signup-btn" onClick={() => navigate("/signup")}>
            Signup
          </button>
        </div>
      </div>
      <button className="logout-btn" onClick={() => {
  localStorage.removeItem("token");
  localStorage.removeItem("role");
  navigate("/login");
}}>
  Logout
</button>

    </nav>
  );
};

export default Navbar;
