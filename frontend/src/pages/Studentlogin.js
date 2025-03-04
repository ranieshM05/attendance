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
    try {
      const response = await axios.post("http://localhost:5000/api/students/login", { email, password });

      if (response.data.success) {
        localStorage.setItem("studentToken", response.data.token);
        navigate("/student-dashboard"); // ✅ Redirect to Student Dashboard
      } else {
        setError("User not found. Redirecting to signup...");
        setTimeout(() => navigate("/student-signup"), 2000); // ✅ Redirect to Signup
      }
    } catch (error) {
      console.error("Login error:", error);
      setError("Invalid email or password. Redirecting to signup...");
      setTimeout(() => navigate("/student-signup"), 2000);
    }
  };

  return (
    <div className="signup-container">
      <h2>Student Login</h2>
      {error && <p className="error-message">{error}</p>}

      <form onSubmit={handleLogin}>
        <label>Email:</label>
        <input 
          type="email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          required 
          placeholder="Enter your email"
        />

        <label>Password:</label>
        <input 
          type="password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          required 
          placeholder="Enter your password"
        />

        <button type="submit">Login</button>
      </form>

      <p>Don't have an account?</p>
      <button onClick={() => navigate("/student-signup-form")}>Signup</button>
    </div>
  );
};

export default StudentLogin;
