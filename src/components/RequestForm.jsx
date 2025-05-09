import React, { useState } from 'react';

const bloodTypes = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

const RequestForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    bloodType: '',
    contact: '',
    location: '',
    message: '',
    units: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSubmit) onSubmit(formData);
    // optionally reset form
    setFormData({
      fullName: '',
      bloodType: '',
      contact: '',
      location: '',
      message: '',
      units: '',
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white shadow-md rounded-lg p-6 max-w-xl mx-auto"
    >
      <h2 className="text-xl font-semibold mb-4 text-red-600">Request Blood Donation</h2>

      <div className="mb-4">
        <label className="block mb-1">Full Name</label>
        <input
          type="text"
          name="fullName"
          value={formData.fullName}
          onChange={handleChange}
          required
          className="w-full border border-gray-300 rounded px-4 py-2"
        />
      </div>

      <div className="mb-4">
        <label className="block mb-1">Blood Type</label>
        <select
          name="bloodType"
          value={formData.bloodType}
          onChange={handleChange}
          required
          className="w-full border border-gray-300 rounded px-4 py-2"
        >
          <option value="">Select</option>
          {bloodTypes.map((type) => (
            <option key={type} value={type}>{type}</option>
          ))}
        </select>
      </div>

      <div className="mb-4">
        <label className="block mb-1">Contact Number</label>
        <input
          type="tel"
          name="contact"
          value={formData.contact}
          onChange={handleChange}
          required
          className="w-full border border-gray-300 rounded px-4 py-2"
        />
      </div>

      <div className="mb-4">
        <label className="block mb-1">Location / Address</label>
        <input
          type="text"
          name="location"
          value={formData.location}
          onChange={handleChange}
          required
          className="w-full border border-gray-300 rounded px-4 py-2"
        />
      </div>

      <div className="mb-4">
        <label className="block mb-1">Units Required (optional)</label>
        <input
          type="number"
          name="units"
          value={formData.units}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded px-4 py-2"
        />
      </div>

      <div className="mb-4">
        <label className="block mb-1">Additional Message (optional)</label>
        <textarea
          name="message"
          rows={3}
          value={formData.message}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded px-4 py-2"
        ></textarea>
      </div>

      <button
        type="submit"
        className="w-full bg-red-600 text-white py-2 rounded hover:bg-red-700 transition"
      >
        Submit Request
      </button>
    </form>
  );
};

export default RequestForm;
