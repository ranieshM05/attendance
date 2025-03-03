import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../Styles/SL.css";

const StaffLogin = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [file, setFile] = useState(null);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const { data } = await axios.post("http://localhost:5000/api/staff-login", formData);
      alert("Login Successful!");
      localStorage.setItem("token", data.token);
      navigate("/staff-dashboard");
    } catch (err) {
      setError("Invalid email or password. Please try again.");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    alert("Logged out successfully!");
    navigate("/staff-login");
  };

  const handleFileChange = (e) => setFile(e.target.files[0]);

  const handleFileUpload = async () => {
    if (!file) {
      alert("Please select an Excel file to upload.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      await axios.post("http://localhost:5000/api/students/upload", formData, {
        headers: { "Content-Type": "multipart/form-data", Authorization: `Bearer ${token}` },
      });
      alert("Excel file uploaded successfully!");
      setFile(null);
      navigate("/staff-dashboard"); // Redirect after upload
    } catch (error) {
      alert(`Failed to upload file: ${error.response?.data?.message || error.message}`);
    }
  };

  return (
    <div className="login-container">
      <h2>Staff Login</h2>
      {error && <p className="error-message">{error}</p>}

      {!token ? (
        <form onSubmit={handleSubmit}>
          <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
          <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required />
          <button type="submit" className="login-btn">Login</button>
        </form>
      ) : (
        <>
          <div className="file-upload">
            <input type="file" accept=".xlsx, .xls" onChange={handleFileChange} />
            <button onClick={handleFileUpload} className="upload-btn">Upload Excel</button>
          </div>
          <button className="logout-btn" onClick={handleLogout}>Logout</button>
        </>
      )}
    </div>
  );
};

export default StaffLogin;
