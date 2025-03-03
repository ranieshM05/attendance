import React from "react";

const AttendanceTable = ({ attendanceData }) => {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Attendance Records</h2>
      <table className="w-full border-collapse border">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">Date</th>
            <th className="border p-2">Student Name</th>
            <th className="border p-2">Roll No</th>
            <th className="border p-2">Status</th>
          </tr>
        </thead>
        <tbody>
          {attendanceData.map((record, index) => (
            <tr key={index} className="border">
              <td className="border p-2">{record.date}</td>
              <td className="border p-2">{record.name}</td>
              <td className="border p-2">{record.rollNo}</td>
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

export default AttendanceTable;
