import React from "react";
import { useNavigate } from "react-router-dom";
import "../Styles/Home.css";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <h1 className="home-title">Welcome to College Attendance System</h1>
      <p className="home-description">
        Manage student attendance efficiently with our platform.
      </p>
      <div className="home-buttons">
        <button className="staff-btn" onClick={() => navigate("/staff-login")}>
          Staff Login
        </button>
        <button className="student-btn" onClick={() => navigate("/student-login")}>
          Student Signup
        </button>
      </div>
    </div>
  );
};

export default Home;
