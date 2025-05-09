import React, { useState } from 'react';

const FindDonors = ({ onSearch, isLocationReady }) => {
  const [formData, setFormData] = useState({
    bloodType: '',
    maxDistance: 50,
    count: 5,
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSearch) {
      onSearch(formData);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
      <div>
        <label className="block mb-1 font-medium">Blood Type</label>
        <select
          name="bloodType"
          value={formData.bloodType}
          onChange={handleChange}
          className="w-full border border-gray-300 p-2 rounded"
          required
        >
          <option value="">Select</option>
          <option value="A+">A+</option>
          <option value="A-">A-</option>
          <option value="B+">B+</option>
          <option value="B-">B-</option>
          <option value="AB+">AB+</option>
          <option value="AB-">AB-</option>
          <option value="O+">O+</option>
          <option value="O-">O-</option>
        </select>
      </div>

      <div>
        <label className="block mb-1 font-medium">Max Distance (km)</label>
        <input
          type="number"
          name="maxDistance"
          value={formData.maxDistance}
          onChange={handleChange}
          className="w-full border border-gray-300 p-2 rounded"
          min="1"
          required
        />
      </div>

      {/* <div>
        <label className="block mb-1 font-medium">Number of Donors</label>
        <input
          type="number"
          name="count"
          value={formData.count}
          onChange={handleChange}
          className="w-full border border-gray-300 p-2 rounded"
          min="1"
          required
        />
      </div> */}

      <div className="col-span-full mt-4">
        <button
          type="submit"
          disabled={!isLocationReady}
          className={`w-full bg-red-600 text-white font-semibold py-2 rounded hover:bg-red-700 transition duration-200 ${
            !isLocationReady ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          {isLocationReady ? 'Search Donors' : 'Fetching Location...'}
        </button>
      </div>

      {!isLocationReady && (
        <p className="text-sm text-gray-500 mt-1">
          Please wait while we determine your location...
        </p>
      )}
    </form>
  );
};

export default FindDonors;