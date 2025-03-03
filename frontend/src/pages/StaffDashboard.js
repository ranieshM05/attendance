import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import * as XLSX from "xlsx";
import "../Styles/StaffDashboard2.css";

const StaffDashboard = () => {
  const navigate = useNavigate();
  const [students, setStudents] = useState([]);
  const [attendanceUpdates, setAttendanceUpdates] = useState({});
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/students", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setStudents(response.data);
    } catch (error) {
      console.error("Error fetching students:", error);
    }
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file || !file.name.endsWith(".xlsx")) {
      alert("Please upload a valid Excel file!");
      return;
    }

    const reader = new FileReader();
    reader.readAsBinaryString(file);
    reader.onload = async (event) => {
      const data = event.target.result;
      const workbook = XLSX.read(data, { type: "binary" });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const parsedData = XLSX.utils.sheet_to_json(sheet);

      const studentsWithAttendance = parsedData.map((student) => ({
        name: student.Name || "N/A",
        email: student.Email || "N/A",
        rollNumber: student.RollNumber || "N/A",
        attendance: "Absent",
      }));

      try {
        await axios.post("http://localhost:5000/api/students/upload", { students: studentsWithAttendance });
        alert("Student data uploaded successfully!");
        fetchStudents();
      } catch (error) {
        console.error("Error uploading student data:", error);
        alert("Failed to upload student data.");
      }
    };
  };

  const handleAttendanceChange = (id, status) => {
    setAttendanceUpdates((prev) => ({ ...prev, [id]: status }));
  };

  const handleSaveAttendance = async (id) => {
    if (!attendanceUpdates[id]) {
      alert("No changes made for this student.");
      return;
    }

    try {
      await axios.put("http://localhost:5000/api/students/update-attendance", {
        id,
        attendance: attendanceUpdates[id],
      });

      setStudents((prev) =>
        prev.map((student) =>
          student._id === id ? { ...student, attendance: attendanceUpdates[id] } : student
        )
      );

      alert("Attendance updated successfully!");
      setAttendanceUpdates((prev) => ({ ...prev, [id]: undefined }));
    } catch (error) {
      console.error("Error updating attendance:", error);
      alert("Failed to update attendance.");
    }
  };

  return (
    <div className="staff-dashboard">
      <h2>Welcome to Staff Dashboard</h2>
      <input type="file" accept=".xlsx" onChange={handleFileUpload} />

      {students.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Roll Number</th>
              <th>Present</th>
              <th>Absent</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
          {students.map((student) => (
  <tr key={student._id}>
    <td>{student.name}</td>
    <td>{student.email}</td>
    <td>{student.rollNumber}</td>
    <td>
      <input
        type="radio"
        name={`attendance-${student._id}`}
        checked={attendanceUpdates[student._id] === "Present" || (!attendanceUpdates[student._id] && student.attendance === "Present")}
        onChange={() => handleAttendanceChange(student._id, "Present")}
      />
    </td>
    <td>
      <input
        type="radio"
        name={`attendance-${student._id}`}
        checked={attendanceUpdates[student._id] === "Absent" || (!attendanceUpdates[student._id] && student.attendance === "Absent")}
        onChange={() => handleAttendanceChange(student._id, "Absent")}
      />
    </td>
    <td>
      <button onClick={() => handleSaveAttendance(student._id)} className="save-btn">
        Save
      </button>
    </td>
  </tr>
))}

          </tbody>
        </table>
      ) : (
        <p>No student records found.</p>
      )}

      <button onClick={() => { localStorage.removeItem("token"); navigate("/login"); }}>Logout</button>
    </div>
  );
};

export default StaffDashboard;
