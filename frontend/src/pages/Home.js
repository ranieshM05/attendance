import React from "react";
import { Link } from "react-router-dom";
import "../Styles/Home.css";  

const Home = () => {
  return (
    <div className="home-container">
      <h1 className="home-title">Welcome to College Attendance System</h1>
      <p className="home-description">
        Manage student attendance efficiently with our platform.
      </p>
      <div className="home-buttons">
        <Link to="/staff-login" className="staff-btn">Staff Login</Link>
        <Link to="/student-signup" className="student-btn">Student Signup</Link>
      </div>
    </div>
  );
};

export default Home;
