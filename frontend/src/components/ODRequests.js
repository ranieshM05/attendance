import React, { useState } from "react";

const ODRequestForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    rollNo: "",
    reason: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("OD Request Submitted:", formData);
  };

  return (
    <div className="p-6 max-w-md mx-auto bg-white shadow-lg rounded-lg">
      <h2 className="text-xl font-bold mb-4">Submit OD Request</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          className="w-full p-2 border rounded mb-3"
          required
        />
        <input
          type="text"
          name="rollNo"
          placeholder="Roll No"
          value={formData.rollNo}
          onChange={handleChange}
          className="w-full p-2 border rounded mb-3"
          required
        />
        <textarea
          name="reason"
          placeholder="Reason for OD"
          value={formData.reason}
          onChange={handleChange}
          className="w-full p-2 border rounded mb-3"
          required
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded w-full"
        >
          Submit Request
        </button>
      </form>
    </div>
  );
};

export default ODRequestForm;