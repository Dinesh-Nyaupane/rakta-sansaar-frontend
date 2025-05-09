import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Droplet, MapPin, Send, Eye } from 'lucide-react';

const defaultAvatar = 'https://static.vecteezy.com/system/resources/thumbnails/002/002/403/small/man-with-beard-avatar-character-isolated-icon-free-vector.jpg';

const DonorCard = ({ donor, userId }) => {
  const [requestSent, setRequestSent] = useState(false);

  const handleRequestDonation = async () => {
    try {
      const response = await fetch('http://localhost:5500/api/request-donation', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          donorId: donor._id,
          userId: userId,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setRequestSent(true);
        alert('Donation request has been sent!');
      } else {
        alert(data.message || 'Failed to send donation request.');
      }
    } catch (error) {
      console.error('Error sending donation request:', error);
      alert('An error occurred while sending the donation request.');
    }
  };

  return (
    <div className="bg-white shadow-md rounded-2xl overflow-hidden flex flex-col sm:flex-row my-5 transition transform hover:scale-[1.02] hover:shadow-xl">
      
      {/* Left: Image */}
      <div className="w-full sm:w-1/3 h-52 sm:h-auto">
        <img
          src={donor.profilePhoto || defaultAvatar}
          alt="Donor Avatar"
          className="w-full h-full object-cover rounded-t-2xl sm:rounded-l-2xl sm:rounded-tr-none"
        />
      </div>

      {/* Right: Info */}
      <div className="flex flex-col justify-between p-5 w-full sm:w-2/3 space-y-4">
        <div className="space-y-2">
          <h2 className="text-2xl font-bold text-red-600">{donor.name}</h2>
          <p className="flex items-center text-gray-700 gap-2 text-sm">
            <Droplet className="w-4 h-4 text-red-500" />
            Blood Group: <span className="font-semibold">{donor.bloodType}</span>
          </p>
          <p className="flex items-center text-gray-600 gap-2 text-sm">
            <MapPin className="w-4 h-4 text-blue-500" />
            {parseFloat((donor.distance) / 1000).toFixed(2)} km away
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          {/* Request Donation */}
          <button
            onClick={handleRequestDonation}
            disabled={requestSent}
            className={`flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium rounded-lg shadow-sm transition duration-300 
              ${requestSent ? 'bg-green-500 hover:bg-green-600' : 'bg-red-600 hover:bg-red-700'} text-white`}
          >
            <Send className="w-4 h-4" />
            {requestSent ? 'Request Sent' : 'Request Donation'}
          </button>

          {/* View Donor */}
          <Link
            to={`/donor/${donor._id}`}
            className="flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium bg-blue-500 hover:bg-blue-600 text-white rounded-lg shadow-sm transition duration-300"
          >
            <Eye className="w-4 h-4" />
            View Donor
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DonorCard;
