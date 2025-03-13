import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import "../Styles/StaffDashboard2.css";

const StaffDashboard = () => {
  const [students, setStudents] = useState([]); // Keep it if needed
  const token = localStorage.getItem("token");

  const fetchStudents = useCallback(async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/students", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setStudents(response.data);
      console.log(students); // Debugging
    } catch (error) {
      console.error("Error fetching students:", error);
    }
  }, [token]); // Add token as a dependency

  useEffect(() => {
    fetchStudents();
  }, [fetchStudents]);

  return (
    <div className="staff-dashboard">
      <h2>Welcome to Staff Dashboard</h2>
      {/* Other UI elements */}
    </div>
  );
};

export default StaffDashboard;
