import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const StudentSignupForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState(""); // ✅ Ensure password is handled
  const [rollNumber, setRollNumber] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    const studentData = {
      name,
      email,
      password,
      rollNumber,
    };
  
    try {
      const response = await axios.post("http://localhost:5000/api/students/signup", studentData, {
        headers: { "Content-Type": "application/json" }, 
      });
  
      if (response.data.success) {
        alert("Signup successful! Redirecting to login...");
        navigate("/student-login");
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
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />

        <label>Roll Number:</label>
        <input type="text" value={rollNumber} onChange={(e) => setRollNumber(e.target.value)} required />

        <label>Email:</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />

        <label>Password:</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />

        <button type="submit">Signup</button>
      </form>

      <p>Already have an account?</p>
      <button onClick={() => navigate("/student-login")}>Login</button>
    </div>
  );
};

export default StudentSignupForm;
