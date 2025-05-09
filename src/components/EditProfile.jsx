import React, { useState, useEffect } from 'react';
import { FaSave, FaUserCircle, FaUpload } from 'react-icons/fa';

const EditProfile = () => {
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    phoneNo: '',
    bloodType: '',
    dob: '',
    gender: '',
    healthConditions: [],
    profilePhoto: '',
    location: { coordinates: [0, 0] }, // [longitude, latitude]
  });

  const [newProfilePhoto, setNewProfilePhoto] = useState(null);

  // Simulate fetching user data (replace with an API call to get user data)
  useEffect(() => {
    const fetchedData = {
      name: 'John Doe',
      email: 'johndoe@example.com',
      phoneNo: '9876543210',
      bloodType: 'A+',
      dob: '1990-05-01',
      gender: 'Male',
      healthConditions: ['Diabetes'],
      profilePhoto: 'https://via.placeholder.com/150',
      location: { coordinates: [85.3240, 27.7172] },
    };
    setUserData(fetchedData);
  }, []);

  // Handle form field change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Handle health conditions change
  const handleHealthConditionsChange = (e) => {
    const { value } = e.target;
    setUserData((prevState) => ({
      ...prevState,
      healthConditions: value.split(',').map((condition) => condition.trim()),
    }));
  };

  // Handle photo upload
  const handleProfilePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewProfilePhoto(URL.createObjectURL(file));
    }
  };

  // Handle form submission (update profile)
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Updated User Data:', userData);
    // You can send the updated data to the backend API for updating
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Edit Profile</h1>

      {/* Profile Picture and Upload */}
      <div className="flex justify-center items-center mb-6">
        <div className="relative">
          <img
            src={newProfilePhoto || userData.profilePhoto}
            alt="Profile"
            className="w-32 h-32 rounded-full border-4 border-gray-300"
          />
          <label htmlFor="profilePhoto" className="absolute bottom-0 right-0 bg-red-600 text-white p-1 rounded-full cursor-pointer">
            <FaUpload />
          </label>
          <input
            type="file"
            id="profilePhoto"
            name="profilePhoto"
            className="hidden"
            accept="image/*"
            onChange={handleProfilePhotoChange}
          />
        </div>
      </div>

      {/* Form to Edit Profile */}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Name */}
          <div className="flex flex-col">
            <label htmlFor="name" className="text-lg font-semibold mb-2">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={userData.name}
              onChange={handleInputChange}
              className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>

          {/* Email */}
          <div className="flex flex-col">
            <label htmlFor="email" className="text-lg font-semibold mb-2">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={userData.email}
              onChange={handleInputChange}
              className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
              readOnly
            />
          </div>

          {/* Phone Number */}
          <div className="flex flex-col">
            <label htmlFor="phoneNo" className="text-lg font-semibold mb-2">Phone Number</label>
            <input
              type="text"
              id="phoneNo"
              name="phoneNo"
              value={userData.phoneNo}
              onChange={handleInputChange}
              className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>

          {/* Blood Type */}
          <div className="flex flex-col">
            <label htmlFor="bloodType" className="text-lg font-semibold mb-2">Blood Type</label>
            <select
              id="bloodType"
              name="bloodType"
              value={userData.bloodType}
              onChange={handleInputChange}
              className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
            >
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

          {/* Date of Birth */}
          <div className="flex flex-col">
            <label htmlFor="dob" className="text-lg font-semibold mb-2">Date of Birth</label>
            <input
              type="date"
              id="dob"
              name="dob"
              value={userData.dob}
              onChange={handleInputChange}
              className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>

          {/* Gender */}
          <div className="flex flex-col">
            <label htmlFor="gender" className="text-lg font-semibold mb-2">Gender</label>
            <select
              id="gender"
              name="gender"
              value={userData.gender}
              onChange={handleInputChange}
              className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
            >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>

          {/* Health Conditions */}
          <div className="flex flex-col">
            <label htmlFor="healthConditions" className="text-lg font-semibold mb-2">Health Conditions (comma separated)</label>
            <input
              type="text"
              id="healthConditions"
              name="healthConditions"
              value={userData.healthConditions.join(', ')}
              onChange={handleHealthConditionsChange}
              className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end mt-6">
          <button
            type="submit"
            className="bg-red-600 text-white py-2 px-6 rounded-md flex items-center space-x-2 hover:bg-red-700"
          >
            <FaSave />
            <span>Save Changes</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditProfile;
