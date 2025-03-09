import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../Styles/Studentlogin1.css";

const StudentLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(""); // Reset previous errors
  
    try {
      const response = await axios.post("http://localhost:5000/api/students/login", 
        { email, password }, 
        { headers: { "Content-Type": "application/json" } }
      );
  
      console.log("✅ Login response:", response.data);
  
      if (response.data.success) {
        localStorage.setItem("studentToken", response.data.token);
        alert("Login successful! Redirecting to dashboard...");
        navigate("/student-dashboard");
      } else {
        setError(response.data.message || "Invalid credentials. Try again.");
      }
    } catch (error) {
      console.error("🚨 Login error:", error.response ? error.response.data : error.message);
      setError(error.response?.data?.message || "Something went wrong. Try again.");
    }
  };
  

  return (
    <div className="signup-container">
      <h2>Student Login</h2>
      {error && <p className="error-message">{error}</p>}

      <form onSubmit={handleLogin}>
        <label>Email:</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />

        <label>Password:</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />

        <button type="submit">Login</button>
      </form>

      <p>Don't have an account?</p>
      <button onClick={() => navigate("/student-signup-form")}>Signup</button>
    </div>
  );
};

export default StudentLogin;
