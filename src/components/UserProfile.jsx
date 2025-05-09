import React from 'react';
import { useState, useEffect } from 'react';
import { FaPen, FaPhoneAlt, FaCheckCircle, FaMapMarkerAlt } from 'react-icons/fa';

const UserProfile = () => {
  const [user, setUser] = useState(null);

  // Simulate fetching user data (you would replace this with an API call)
  useEffect(() => {
    // Replace with actual API call to fetch user data
    const userData = {
      name: 'John Doe',
      email: 'johndoe@example.com',
      phoneNo: '9876543210',
      bloodType: 'A+',
      dob: '1990-05-01',
      gender: 'Male',
      lastDonationDate: '2023-10-10',
      profilePhoto: 'https://via.placeholder.com/150',
      healthConditions: ['Diabetes'],
      isVerified: true,
      location: { coordinates: [85.3240, 27.7172] } // Longitude, Latitude
    };

    setUser(userData);
  }, []);

  if (!user) {
    return <div>Loading...</div>;
  }

  const age = new Date().getFullYear() - new Date(user.dob).getFullYear();
  const formattedLocation = `Lat: ${user.location.coordinates[1]}, Lng: ${user.location.coordinates[0]}`;

  return (
    <div className="container mx-auto p-6">
      <div className="flex items-center space-x-6">
        {/* Profile Image */}
        <img 
          src={user.profilePhoto || 'https://via.placeholder.com/150'} 
          alt="Profile" 
          className="w-32 h-32 rounded-full border-4 border-gray-300"
        />

        <div>
          <h1 className="text-2xl font-bold text-gray-800">{user.name}</h1>
          <p className="text-sm text-gray-500">{user.email}</p>
          <p className="text-sm text-gray-500 flex items-center"><FaPhoneAlt className="mr-2" /> {user.phoneNo}</p>
          <p className="text-sm text-gray-500 flex items-center">
            <FaMapMarkerAlt className="mr-2" />
            {formattedLocation}
          </p>
        </div>
      </div>

      <div className="mt-8 space-y-6">
        {/* Blood Type, Age */}
        <div className="flex justify-between">
          <p className="text-lg font-semibold">Blood Type:</p>
          <p className="text-lg text-gray-600">{user.bloodType}</p>
        </div>
        <div className="flex justify-between">
          <p className="text-lg font-semibold">Age:</p>
          <p className="text-lg text-gray-600">{age} years</p>
        </div>

        {/* Health Conditions */}
        {user.healthConditions && user.healthConditions.length > 0 && (
          <div className="flex justify-between">
            <p className="text-lg font-semibold">Health Conditions:</p>
            <ul className="text-lg text-gray-600">
              {user.healthConditions.map((condition, index) => (
                <li key={index}>{condition}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Last Donation */}
        <div className="flex justify-between">
          <p className="text-lg font-semibold">Last Donation:</p>
          <p className="text-lg text-gray-600">{user.lastDonationDate}</p>
        </div>

        {/* Verified Status */}
        <div className="flex justify-between items-center">
          <p className="text-lg font-semibold">Verified:</p>
          <div className="flex items-center">
            {user.isVerified ? (
              <FaCheckCircle className="text-green-500 mr-2" />
            ) : (
              <FaPen className="text-red-500 mr-2" />
            )}
            <p className="text-lg text-gray-600">{user.isVerified ? 'Verified' : 'Not Verified'}</p>
          </div>
        </div>
      </div>

      <div className="mt-8">
        <button className="bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700">
          Edit Profile
        </button>
      </div>
    </div>
  );
};

export default UserProfile;
