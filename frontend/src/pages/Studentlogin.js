import React, { useEffect, useState } from "react";
import axios from "axios";
import "../Styles/Studentlogin.css";

const StudentDashboard = () => {
  const [attendance, setAttendance] = useState([]);
  const [presentCount, setPresentCount] = useState(0);
  const [absentCount, setAbsentCount] = useState(0);
  const studentId = "12345"; // Replace this with the actual logged-in student ID

  useEffect(() => {
    const fetchAttendance = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/attendance/${studentId}`);
        setAttendance(response.data);

        // Count Present & Absent days
        const presentDays = response.data.filter((record) => record.status === "Present").length;
        const absentDays = response.data.filter((record) => record.status === "Absent").length;

        setPresentCount(presentDays);
        setAbsentCount(absentDays);
      } catch (error) {
        console.error("Error fetching attendance:", error);
      }
    };

    fetchAttendance();
  }, [studentId]);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Student Dashboard</h2>

      {/* Attendance Summary */}
      <div className="mb-6 p-4 border rounded-lg shadow-md bg-white">
        <h3 className="text-lg font-semibold mb-2">Attendance Summary</h3>
        <p className="text-green-600 font-bold">Total Present Days: {presentCount}</p>
        <p className="text-red-600 font-bold">Total Absent Days: {absentCount}</p>
      </div>

      {/* Detailed Attendance Table */}
      <table className="w-full border-collapse border">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">Date</th>
            <th className="border p-2">Status</th>
          </tr>
        </thead>
        <tbody>
          {attendance.map((record, index) => (
            <tr key={index} className="border">
              <td className="border p-2">{record.date}</td>
              <td
                className={`border p-2 font-semibold ${
                  record.status === "Present" ? "text-green-600" : "text-red-600"
                }`}
              >
                {record.status}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StudentDashboard;
