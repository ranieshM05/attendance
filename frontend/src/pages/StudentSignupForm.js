import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../Styles/StudentSignup.css";

const StudentSignupForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/api/students/signup", { name, email, password });

      if (response.data.success) {
        localStorage.setItem("studentToken", response.data.token);
        navigate("/student-dashboard"); // ✅ Redirect to Student Dashboard
      } else {
        setError(response.data.message);
      }
    } catch (error) {
      console.error("Signup error:", error);
      setError("Error signing up. Please try again.");
    }
  };

  return (
    <div className="signup-container">
      <h2>Student Signup</h2>
      {error && <p className="error-message">{error}</p>}

      <form onSubmit={handleSignup}>
        <label>Name:</label>
        <input 
          type="text" 
          value={name} 
          onChange={(e) => setName(e.target.value)} 
          required 
          placeholder="Enter your name"
        />

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

        <button type="submit">Signup</button>
      </form>

      <p>Already have an account?</p>
      <button onClick={() => navigate("/student-signup")}>Login</button>
    </div>
  );
};

export default StudentSignupForm;
