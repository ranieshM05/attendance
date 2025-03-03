import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../Styles/Login.css"; // Ensure you have this CSS file

const LoginPage = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:5000/api/auth/login", formData);

      if (response.status === 200) {
        alert("Login Successful!");

        // ✅ Save authentication data
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("role", response.data.user.role);

        // ✅ Redirect based on role
        if (response.data.user.role === "staff") {
          navigate("/staff-dashboard"); // Redirect to Staff Dashboard
        } else {
          setError("Unauthorized access! Only staff can log in.");
          localStorage.removeItem("token"); // Remove token if not staff
        }
      }
    } catch (err) {
      // Properly handle error messages
      if (err.response && err.response.status === 400) {
        setError("Invalid email or password. Please try again.");
      } else {
        setError("Server error! Please try again later.");
      }
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      {error && <p className="error-message">{error}</p>}
      
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginPage;
