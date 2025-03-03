import React, { useState } from "react";

const ODRequestsPage = () => {
  const [requests, setRequests] = useState([
    { id: 1, name: "John Doe", rollNo: "101", reason: "Medical", status: "Pending" },
    { id: 2, name: "Jane Smith", rollNo: "102", reason: "Sports Event", status: "Approved" },
  ]);

  const updateStatus = (id, newStatus) => {
    setRequests((prevRequests) =>
      prevRequests.map((req) =>
        req.id === id ? { ...req, status: newStatus } : req
      )
    );
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">OD Requests</h2>
      <table className="w-full border-collapse border">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">Name</th>
            <th className="border p-2">Roll No</th>
            <th className="border p-2">Reason</th>
            <th className="border p-2">Status</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {requests.map((req) => (
            <tr key={req.id} className="border">
              <td className="border p-2">{req.name}</td>
              <td className="border p-2">{req.rollNo}</td>
              <td className="border p-2">{req.reason}</td>
              <td className={`border p-2 font-semibold ${
                req.status === "Approved" ? "text-green-600" : req.status === "Rejected" ? "text-red-600" : "text-yellow-600"
              }`}>
                {req.status}
              </td>
              <td className="border p-2">
                <button
                  className="bg-green-500 text-white px-3 py-1 rounded mr-2"
                  onClick={() => updateStatus(req.id, "Approved")}
                >
                  Approve
                </button>
                <button
                  className="bg-red-500 text-white px-3 py-1 rounded"
                  onClick={() => updateStatus(req.id, "Rejected")}
                >
                  Reject
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ODRequestsPage;